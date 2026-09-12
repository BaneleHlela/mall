/**
 * MSW Request Handlers — API Mocking for Frontend Tests (MSW v2)
 * 
 * Phase: Frontend Tests
 * 
 * These handlers intercept fetch/axios requests at the network level
 * and return realistic mock responses. This allows us to test the
 * frontend auth flow without a running backend.
 * 
 * The handlers mirror the actual backend endpoints:
 *   POST /api/user/signup
 *   POST /api/user/login
 *   POST /api/user/logout
 *   POST /api/user/verify-email
 *   GET  /api/user/check-auth
 *   POST /api/user/refresh-token
 *   POST /api/user/forgot-password
 *   POST /api/user/reset-password/:token
 */

import { http, HttpResponse } from 'msw';

// In-memory store for test users (simulates database)
const testUsers = new Map();
let activeUserId = null;

function createTestUser(data, overrides = {}) {
  const user = {
    _id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    username: `${data.firstName || 'user'}${data.lastName || ''}`.toLowerCase().replace(/[^a-z0-9]/g, ''),
    isVerified: true,
    isBlocked: false,
    verificationToken: '123456',
    verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000,
    favourites: {
      stores: [],
      products: [],
      services: [],
      rentals: [],
      packages: [],
      donations: [],
    },
    role: 'user',
    avatar: 'default-avatar-url.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
  testUsers.set(user.email, user);
  return user;
}

function getUserByEmail(email) {
  return testUsers.get(email);
}

function getUserById(id) {
  for (const user of testUsers.values()) {
    if (user._id === id) return user;
  }
  return null;
}

function generateTokens(userId) {
  return {
    accessToken: `access-${userId}-${Date.now()}`,
    refreshToken: `refresh-${userId}-${Date.now()}`,
  };
}

// Handlers for auth endpoints
export const handlers = [
  // ── POST /api/user/signup ─────────────────────────────────────
  http.post('*/api/user/signup', async ({ request }) => {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return HttpResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (getUserByEmail(email)) {
      return HttpResponse.json({ message: 'User already exists. Please login instead.' }, { status: 400 });
    }

    const user = createTestUser({ email, password, firstName, lastName });
    activeUserId = user._id;
    const { accessToken, refreshToken } = generateTokens(user._id);

    return HttpResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        isVerified: user.isVerified,
        avatar: user.avatar,
        favourites: user.favourites,
      },
      accessToken,
      refreshToken,
    }, { status: 201 });
  }),

  // ── POST /api/user/login ──────────────────────────────────────
  http.post('*/api/user/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (!email || !password) {
      return HttpResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = getUserByEmail(email);

    if (!user) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    if (user.isBlocked) {
      return HttpResponse.json({ message: 'Your account is blocked.' }, { status: 403 });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    activeUserId = user._id;
    user.lastLogin = new Date();

    return HttpResponse.json({
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        isVerified: user.isVerified,
        avatar: user.avatar,
        favourites: user.favourites,
      },
      accessToken,
      refreshToken,
    }, { status: 200 });
  }),

  // ── POST /api/user/logout ─────────────────────────────────────
  http.post('*/api/user/logout', async () => {
    activeUserId = null;
    return HttpResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  }),

  // ── POST /api/user/verify-email ──────────────────────────────
  http.post('*/api/user/verify-email', async ({ request }) => {
    const { code } = await request.json();

    let foundUser = null;
    for (const user of testUsers.values()) {
      if (user.verificationToken === code && user.verificationTokenExpiresAt > Date.now()) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return HttpResponse.json({ message: 'Invalid or expired verification code' }, { status: 400 });
    }

    foundUser.isVerified = true;
    foundUser.verificationToken = undefined;
    foundUser.verificationTokenExpiresAt = undefined;
    activeUserId = foundUser._id;

    const { accessToken, refreshToken } = generateTokens(foundUser._id);

    return HttpResponse.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        _id: foundUser._id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        username: foundUser.username,
        isVerified: foundUser.isVerified,
        avatar: foundUser.avatar,
      },
      accessToken,
      refreshToken,
    }, { status: 200 });
  }),

  // ── GET /api/user/check-auth ──────────────────────────────────
  http.get('*/api/user/check-auth', async ({ request }) => {
    const cookieHeader = request.headers.get('cookie') || '';
    const accessTokenMatch = cookieHeader.match(/accessToken=([^;]+)/);
    
    if (!accessTokenMatch && !activeUserId) {
      return HttpResponse.json({ success: false, message: 'Unauthorized - no token provided' }, { status: 401 });
    }

    const accessToken = accessTokenMatch?.[1] || `access-${activeUserId}-1`;
    const userIdMatch = accessToken.match(/^access-(.+)-\d+$/);
    
    if (!userIdMatch) {
      return HttpResponse.json({ success: false, message: 'Unauthorized - invalid token' }, { status: 401 });
    }

    const user = getUserById(userIdMatch[1]) || getUserById(activeUserId || '');
    
    if (!user) {
      return HttpResponse.json({ success: false, message: 'User not found' }, { status: 401 });
    }

    return HttpResponse.json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        isVerified: user.isVerified,
        avatar: user.avatar,
        favourites: user.favourites,
      },
    }, { status: 200 });
  }),

  // ── POST /api/user/refresh-token ──────────────────────────────
  http.post('*/api/user/refresh-token', async ({ request }) => {
    const cookieHeader = request.headers.get('cookie') || '';
    const refreshTokenMatch = cookieHeader.match(/refreshToken=([^;]+)/);

    if (!refreshTokenMatch && !activeUserId) {
      return HttpResponse.json({ message: 'No refresh token provided' }, { status: 401 });
    }

    const refreshToken = refreshTokenMatch?.[1] || `refresh-${activeUserId}-1`;
    const userIdMatch = refreshToken.match(/^refresh-(.+)-\d+$/);

    if (!userIdMatch) {
      return HttpResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    const user = getUserById(userIdMatch[1]) || getUserById(activeUserId || '');

    if (!user) {
      return HttpResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    return HttpResponse.json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }, { status: 200 });
  }),

  // ── POST /api/user/forgot-password ────────────────────────────
  http.post('*/api/user/forgot-password', async ({ request }) => {
    const { email } = await request.json();

    const user = getUserByEmail(email);
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 400 });
    }

    user.resetPasswordToken = `reset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000;

    return HttpResponse.json({
      success: true,
      message: 'Password reset link sent to your email',
      resetToken: user.resetPasswordToken,
    }, { status: 200 });
  }),

  // ── POST /api/user/reset-password/:token ──────────────────────
  http.post('*/api/user/reset-password/:token', async ({ request, params }) => {
    const { token } = params;
    const { password } = await request.json();

    let foundUser = null;
    for (const user of testUsers.values()) {
      if (user.resetPasswordToken === token || token === 'mock-reset-token' && user.resetPasswordExpiresAt > Date.now()) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      return HttpResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    foundUser.password = password;
    foundUser.resetPasswordToken = undefined;
    foundUser.resetPasswordExpiresAt = undefined;

    return HttpResponse.json({
      success: true,
      message: 'Password reset successful',
    }, { status: 200 });
  }),

  http.get('*/api/user/profile', async () => {
    const user = getUserById(activeUserId || '');
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 401 });
    }

    return HttpResponse.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isVerified: user.isVerified,
      avatar: user.avatar,
      favourites: user.favourites,
    }, { status: 200 });
  }),

  // ── PUT /api/user/edit-user ─────────────────────────────────────
  http.put('*/api/user/edit-user', async ({ request }) => {
    const user = getUserById(activeUserId || '');
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const updates = await request.json();
    Object.assign(user, updates);

    return HttpResponse.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isVerified: user.isVerified,
      avatar: user.avatar,
      favourites: user.favourites,
    }, { status: 200 });
  }),

  // ── DELETE /api/user/delete ───────────────────────────────────
  http.delete('*/api/user/delete', async () => {
    if (activeUserId) {
      const user = getUserById(activeUserId);
      if (user) testUsers.delete(user.email);
    }
    activeUserId = null;
    return HttpResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  }),

  // ── PUT /api/user/avatar ──────────────────────────────────────
  http.put('*/api/user/avatar', async ({ request }) => {
    const user = getUserById(activeUserId || '');
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const body = await request.text();
    const remove = body.includes('name="remove"') && body.includes('\r\n\r\ntrue');
    user.avatar = remove
      ? 'default-avatar-url.jpg'
      : 'http://test.url/avatar.jpg';

    return HttpResponse.json({ avatar: user.avatar }, { status: 200 });
  }),

  // ── POST /api/user/toggle-like ────────────────────────────────
  http.post('*/api/user/toggle-like', async ({ request }) => {
    const user = getUserById(activeUserId || '');
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const { targetType, targetId } = await request.json();
    const key = {
      Store: 'stores',
      Product: 'products',
      Service: 'services',
      Rental: 'rentals',
      Package: 'packages',
      Donation: 'donations',
    }[targetType];

    if (key) {
      const favourites = user.favourites[key];
      const index = favourites.indexOf(targetId);
      if (index === -1) favourites.push(targetId);
      else favourites.splice(index, 1);
    }

    return HttpResponse.json({ favourites: user.favourites }, { status: 200 });
  }),

  // ── GET /api/user/login-status ────────────────────────────────
  http.get('*/api/user/login-status', async () => {
    return HttpResponse.json(Boolean(activeUserId), { status: activeUserId ? 200 : 401 });
  }),
];

// Helper to reset test state between tests
export function resetTestUsers() {
  testUsers.clear();
  activeUserId = null;
}