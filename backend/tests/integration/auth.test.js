/**
 * Integration Tests: Authentication Endpoints
 * 
 * Phase: 2 — Backend Integration Tests
 * 
 * Tests the full Express request/response cycle for auth endpoints:
 *   POST /api/user/signup       — Register new user
 *   POST /api/user/login        — Login with email+password
 *   POST /api/user/logout       — Clear cookies
 *   POST /api/user/verify-email — Verify email with code
 *   POST /api/user/forgot-password
 *   POST /api/user/reset-password/:token
 *   GET  /api/user/check-auth    — Protected, requires valid access token
 *   POST /api/user/refresh-token — Exchange refresh token for access token
 *   POST /api/user/block-user/:id
 *   POST /api/user/unblock-user/:id
 * 
 * Prerequisites: In-memory MongoDB via mongodb-memory-server.
 *   Redis, email, GCS, and bcrypt hashing are mocked.
 * 
 * Run with: npm run test:integration
 */

import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Import AFTER testSetup.js has set up mocks and connected to in-memory MongoDB
import User from '../../models/UserModel.js';

// Helper: create a fresh Express app with just the user routes
// We build it here instead of importing server.js because server.js
// calls app.listen() at import time, which would conflict with tests.
function createTestApp() {
  const express = require('express');
  const cookieParser = require('cookie-parser');
  const userRoutes = require('../../routes/userRoutes.js').default;
  const { errorHandler, notFound } = require('../../middlewares/errorHandling.js');

  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use('/api/user', userRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

describe('Auth — POST /api/user/signup', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-001] should create a new user and return 201 with user data', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({
        email: 'newuser@example.com',
        password: 'Str0ngP@ss!',
        firstName: 'New',
        lastName: 'User',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/successfully/i);
    expect(res.body.user.email).toBe('newuser@example.com');
    expect(res.body.user.firstName).toBe('New');
    expect(res.body.user.lastName).toBe('User');
    // Password should NEVER be returned
    expect(res.body.user.password).toBeUndefined();

    // Cookies should be set
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies.some((c) => c.includes('accessToken'))).toBe(true);
    expect(cookies.some((c) => c.includes('refreshToken'))).toBe(true);
  });

  it('[TC-AUTH-002] should hash password before storing in DB', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'hash@example.com', password: 'Str0ngP@ss!', firstName: 'Hash', lastName: 'Test' });

    const dbUser = await User.findOne({ email: 'hash@example.com' });
    expect(dbUser).toBeTruthy();
    expect(dbUser.password).toMatch(/^hashed-/);
    expect(dbUser.password).not.toBe('Str0ngP@ss!');
  });

  it('[TC-AUTH-003] should return 400 if user already exists', async () => {
    // Create user first
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'duplicate@example.com', password: 'Str0ngP@ss!', firstName: 'Dup', lastName: 'Test' });

    // Try again with same email
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: 'duplicate@example.com', password: 'Str0ngP@ss!', firstName: 'Dup', lastName: 'Test' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it('[TC-AUTH-004] should return 400 for missing required fields', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: 'missing@example.com' }); // missing password, firstName, lastName

    expect(res.status).toBe(400);
  });

  it('[TC-AUTH-005] should generate unique username from firstName + lastName', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({ email: 'unique@example.com', password: 'Str0ngP@ss!', firstName: 'John', lastName: 'Doe' });

    expect(res.status).toBe(201);
    expect(res.body.user.username).toMatch(/johndoe/);
  });
});

describe('Auth — POST /api/user/login', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-006] should login with valid credentials and set cookies', async () => {
    // First signup
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'login@example.com', password: 'Str0ngP@ss!', firstName: 'Login', lastName: 'Test' });

    // Then login
    const res = await request(app)
      .post('/api/user/login')
      .send({ email: 'login@example.com', password: 'Str0ngP@ss!' });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe('login@example.com');
    expect(res.body.user.password).toBeUndefined();

    const cookies = res.headers['set-cookie'];
    expect(cookies.some((c) => c.includes('accessToken'))).toBe(true);
    expect(cookies.some((c) => c.includes('refreshToken'))).toBe(true);
  });

  it('[TC-AUTH-007] should return 400 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/user/login')
      .send({ email: 'nope@example.com', password: 'wrong' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Invalid email or password/i);
  });

  it('[TC-AUTH-008] should return 403 if user is blocked (checkBlocked middleware)', async () => {
    // Create user
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'blocked@example.com', password: 'Str0ngP@ss!', firstName: 'Blocked', lastName: 'User' });

    // Manually block the user in DB
    const user = await User.findOne({ email: 'blocked@example.com' });
    user.isBlocked = true;
    await user.save();

    const res = await request(app)
      .post('/api/user/login')
      .send({ email: 'blocked@example.com', password: 'Str0ngP@ss!' });

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/blocked/i);
  });

  it('[TC-AUTH-009] should update lastLogin on successful login', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'lastlogin@example.com', password: 'Str0ngP@ss!', firstName: 'Last', lastName: 'Login' });

    const beforeLogin = await User.findOne({ email: 'lastlogin@example.com' });
    const oldLastLogin = beforeLogin.lastLogin;

    await new Promise((r) => setTimeout(r, 10)); // ensure time passes

    await request(app)
      .post('/api/user/login')
      .send({ email: 'lastlogin@example.com', password: 'Str0ngP@ss!' });

    const afterLogin = await User.findOne({ email: 'lastlogin@example.com' });
    expect(afterLogin.lastLogin.getTime()).toBeGreaterThan(oldLastLogin.getTime());
  });
});

describe('Auth — POST /api/user/logout', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-010] should clear cookies and return success message', async () => {
    // Signup and login to get cookies
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'logout@example.com', password: 'Str0ngP@ss!', firstName: 'Logout', lastName: 'Test' });

    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email: 'logout@example.com', password: 'Str0ngP@ss!' });

    const cookies = loginRes.headers['set-cookie'];

    // Now logout with those cookies
    const res = await request(app)
      .post('/api/user/logout')
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/logged out successfully/i);

    // Cookies should be cleared (expired)
    const clearCookies = res.headers['set-cookie'];
    expect(clearCookies.some((c) => c.includes('accessToken=;'))).toBe(true);
    expect(clearCookies.some((c) => c.includes('refreshToken=;'))).toBe(true);
  });

  it('[TC-AUTH-011] should handle logout without refresh token gracefully', async () => {
    const res = await request(app).post('/api/user/logout');

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/logged out successfully/i);
  });
});

describe('Auth — POST /api/user/verify-email', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-012] should verify email with valid code', async () => {
    // Signup creates a user with a verification token
    const signupRes = await request(app)
      .post('/api/user/signup')
      .send({ email: 'verify@example.com', password: 'Str0ngP@ss!', firstName: 'Verify', lastName: 'Test' });

    // Get the verification token from DB (mocked email doesn't send it)
    const user = await User.findOne({ email: 'verify@example.com' });
    const code = user.verificationToken;

    // Verify with the code
    const res = await request(app)
      .post('/api/user/verify-email')
      .send({ code });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/verified successfully/i);

    // User should now be verified
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.isVerified).toBe(true);
    expect(updatedUser.verificationToken).toBeUndefined();
  });

  it('[TC-AUTH-013] should return 400 for invalid/expired code', async () => {
    const res = await request(app)
      .post('/api/user/verify-email')
      .send({ code: '000000' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Invalid or expired verification code/i);
  });
});

describe('Auth — POST /api/user/forgot-password', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-014] should send reset link for existing user', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'forgot@example.com', password: 'Str0ngP@ss!', firstName: 'Forgot', lastName: 'Test' });

    const res = await request(app)
      .post('/api/user/forgot-password')
      .send({ email: 'forgot@example.com' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/reset link sent/i);

    // User should have reset token in DB
    const user = await User.findOne({ email: 'forgot@example.com' });
    expect(user.resetPasswordToken).toBeDefined();
    expect(user.resetPasswordExpiresAt).toBeDefined();
  });

  it('[TC-AUTH-015] should return 400 for non-existent user', async () => {
    const res = await request(app)
      .post('/api/user/forgot-password')
      .send({ email: 'nonexistent@example.com' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/User not found/i);
  });
});

describe('Auth — POST /api/user/reset-password/:token', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-016] should reset password with valid token', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'reset@example.com', password: 'Str0ngP@ss!', firstName: 'Reset', lastName: 'Test' });

    // Trigger forgot-password to generate token
    await request(app)
      .post('/api/user/forgot-password')
      .send({ email: 'reset@example.com' });

    const user = await User.findOne({ email: 'reset@example.com' });
    const token = user.resetPasswordToken;

    // Reset password
    const res = await request(app)
      .post(`/api/user/reset-password/${token}`)
      .send({ password: 'NewStr0ngP@ss!' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/reset successful/i);

    // Should be able to login with new password
    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email: 'reset@example.com', password: 'NewStr0ngP@ss!' });

    expect(loginRes.status).toBe(200);
  });

  it('[TC-AUTH-017] should return 400 for invalid/expired token', async () => {
    const res = await request(app)
      .post('/api/user/reset-password/invalid-token')
      .send({ password: 'NewStr0ngP@ss!' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Invalid or expired reset token/i);
  });
});

describe('Auth — GET /api/user/check-auth', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-018] should return user when access token is valid', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'check@example.com', password: 'Str0ngP@ss!', firstName: 'Check', lastName: 'Auth' });

    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email: 'check@example.com', password: 'Str0ngP@ss!' });

    const cookies = loginRes.headers['set-cookie'];

    const res = await request(app)
      .get('/api/user/check-auth')
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('check@example.com');
    expect(res.body.user.password).toBeUndefined();
  });

  it('[TC-AUTH-019] should return 401 when no access token provided', async () => {
    const res = await request(app).get('/api/user/check-auth');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/no token provided/i);
  });

  it('[TC-AUTH-020] should return 401 for invalid/expired token', async () => {
    const fakeToken = jwt.sign({ userId: 'fake' }, 'wrong-secret', { expiresIn: '1h' });
    const res = await request(app)
      .get('/api/user/check-auth')
      .set('Cookie', [`accessToken=${fakeToken}`]);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

describe('Auth — POST /api/user/refresh-token', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-021] should return new access token when refresh token is valid', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'refresh@example.com', password: 'Str0ngP@ss!', firstName: 'Refresh', lastName: 'Test' });

    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email: 'refresh@example.com', password: 'Str0ngP@ss!' });

    const cookies = loginRes.headers['set-cookie'];

    const res = await request(app)
      .post('/api/user/refresh-token')
      .set('Cookie', cookies);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/refreshed successfully/i);

    // Should have new accessToken cookie
    const newCookies = res.headers['set-cookie'];
    expect(newCookies.some((c) => c.includes('accessToken='))).toBe(true);
  });

  it('[TC-AUTH-022] should return 401 when no refresh token provided', async () => {
    const res = await request(app).post('/api/user/refresh-token');
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/No refresh token provided/i);
  });

  it('[TC-AUTH-023] should return 401 for invalid refresh token', async () => {
    const fakeRefresh = jwt.sign({ userId: 'fake' }, 'wrong-secret', { expiresIn: '7d' });
    const res = await request(app)
      .post('/api/user/refresh-token')
      .set('Cookie', [`refreshToken=${fakeRefresh}`]);

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Invalid refresh token/i);
  });
});

describe('Auth — Admin endpoints', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
  });

  it('[TC-AUTH-024] should block user (admin only)', async () => {
    // Create regular user
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'target@example.com', password: 'Str0ngP@ss!', firstName: 'Target', lastName: 'User' });

    // Create admin user
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'admin@example.com', password: 'Str0ngP@ss!', firstName: 'Admin', lastName: 'User' });

    const admin = await User.findOne({ email: 'admin@example.com' });
    admin.role = 'admin';
    await admin.save();

    const adminLogin = await request(app)
      .post('/api/user/login')
      .send({ email: 'admin@example.com', password: 'Str0ngP@ss!' });
    const adminCookies = adminLogin.headers['set-cookie'];

    const target = await User.findOne({ email: 'target@example.com' });

    const res = await request(app)
      .put(`/api/user/block-user/${target._id}`)
      .set('Cookie', adminCookies);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/blocked successfully/i);

    const blockedUser = await User.findById(target._id);
    expect(blockedUser.isBlocked).toBe(true);
  });

  it('[TC-AUTH-025] should unblock user (admin only)', async () => {
    // Create user and block them
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'unblock@example.com', password: 'Str0ngP@ss!', firstName: 'Unblock', lastName: 'User' });

    const target = await User.findOne({ email: 'unblock@example.com' });
    target.isBlocked = true;
    await target.save();

    // Create admin
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'admin2@example.com', password: 'Str0ngP@ss!', firstName: 'Admin2', lastName: 'User' });

    const admin = await User.findOne({ email: 'admin2@example.com' });
    admin.role = 'admin';
    await admin.save();

    const adminLogin = await request(app)
      .post('/api/user/login')
      .send({ email: 'admin2@example.com', password: 'Str0ngP@ss!' });
    const adminCookies = adminLogin.headers['set-cookie'];

    const res = await request(app)
      .put(`/api/user/unblock-user/${target._id}`)
      .set('Cookie', adminCookies);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/unblocked successfully/i);

    const unblocked = await User.findById(target._id);
    expect(unblocked.isBlocked).toBe(false);
  });

  it('[TC-AUTH-026] should forbid non-admin from blocking users', async () => {
    // Create two regular users
    await request(app)
      .post('/api/user/signup')
      .send({ email: 'victim@example.com', password: 'Str0ngP@ss!', firstName: 'Victim', lastName: 'User' });

    await request(app)
      .post('/api/user/signup')
      .send({ email: 'attacker@example.com', password: 'Str0ngP@ss!', firstName: 'Attacker', lastName: 'User' });

    const attackerLogin = await request(app)
      .post('/api/user/login')
      .send({ email: 'attacker@example.com', password: 'Str0ngP@ss!' });
    const attackerCookies = attackerLogin.headers['set-cookie'];

    const victim = await User.findOne({ email: 'victim@example.com' });

    const res = await request(app)
      .put(`/api/user/block-user/${victim._id}`)
      .set('Cookie', attackerCookies);

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/Access denied. Admins only./i);
  });
});