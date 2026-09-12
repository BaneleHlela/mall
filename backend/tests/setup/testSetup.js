/**
 * Backend Test Setup — Global Configuration & Mocks
 * 
 * Phase: 2 — Backend Integration Tests
 * 
 * This file runs once before every backend test file.
 * It handles:
 *   1. Environment variables (JWT secrets, DB, etc.)
 *   2. Mocking external services (Redis, email, GCS, Puppeteer, bcrypt)
 *   3. Connecting to / disconnecting from an in-memory MongoDB instance
 *   4. Cleaning up the database and resetting mocks between tests
 *
 * NOTE: This file uses CommonJS require() syntax instead of ESM import
 * because Jest loads setupFilesAfterEnv BEFORE applying babel transforms.
 * Using require() here avoids the ESM/CJS conflict.
 */

// ── 1. Environment Variables ─────────────────────────────────────────
// Must be set before any application code is imported, because modules
// like redis.js and passportConfig.js read process.env at import time.
process.env.ACCESS_TOKEN_SECRET = 'test-access-token-secret-123';
process.env.REFRESH_TOKEN_SECRET = 'test-refresh-token-secret-456';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.NODE_ENV = 'test';
process.env.CLIENT_URL = 'http://localhost:5173';
process.env.REDIS_URL = '';

jest.setTimeout(60000);

// ── 2. Module Mocks ──────────────────────────────────────────────────

// Redis — The app uses Redis to store refresh tokens.
// In tests we don't have a Redis server, so we mock the entire module.
const mockRefreshTokens = new Map();

jest.mock('../../config/redis.js', () => ({
  redis: {
    get: jest.fn((key) => Promise.resolve(mockRefreshTokens.get(key) || null)),
    set: jest.fn((key, value) => {
      mockRefreshTokens.set(key, value);
      return Promise.resolve('OK');
    }),
    del: jest.fn((key) => {
      mockRefreshTokens.delete(key);
      return Promise.resolve(1);
    }),
    on: jest.fn(),
  },
}));

// Email sending — Tests must never send real emails.
jest.mock('../../emails/email.js', () => ({
  sendVerificationEmail: jest.fn(() => Promise.resolve()),
  sendWelcomeEmail: jest.fn(() => Promise.resolve()),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  sendResetSuccessEmail: jest.fn(() => Promise.resolve()),
}));

// Google Cloud Storage — No real GCS calls in tests.
jest.mock('../../config/gcsClient.js', () => ({
  uploadToUploads: jest.fn(() =>
    Promise.resolve({ publicUrl: 'http://test.url/avatar.jpg' })
  ),
  uploadsBucket: {
    file: jest.fn(() => ({
      delete: jest.fn(() => Promise.resolve()),
      save: jest.fn(() => Promise.resolve()),
    })),
  },
}));

// Puppeteer screenshot capture — No real browser in tests.
jest.mock('../../config/puppeteerConfig.js', () => ({
  captureScreenshot: jest.fn(() =>
    Promise.resolve(Buffer.from('fake-screenshot'))
  ),
}));

// bcryptjs — Mock password hashing so tests are fast and deterministic.
// The mock stores passwords as "hashed-<plaintext>" so we can verify
// password logic without real bcrypt computation.
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(() => Promise.resolve('mock-salt')),
  hash: jest.fn((password) => Promise.resolve(`hashed-${password}`)),
  compare: jest.fn((input, storedHash) => {
    const originalPassword = storedHash.startsWith('hashed-')
      ? storedHash.substring(7)
      : storedHash;
    return Promise.resolve(input === originalPassword);
  }),
}));

// ── 3. In-Memory MongoDB ─────────────────────────────────────────────
// mongodb-memory-server spins up a real MongoDB instance in memory.
// This lets us test Mongoose models without a running MongoDB server.
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create({
    binary: {
      systemBinary: 'C:\\Users\\banel\\Desktop\\8.0\\bin\\mongod.exe',
    },
  });
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
});

// ── 4. Cleanup Between Tests ────────────────────────────────────────
afterEach(async () => {
  // Drop all data from every collection to ensure test isolation
  const db = mongoose.connection.db;
  if (db) {
    const collections = await db.collections();
    for (const col of collections) {
      await col.deleteMany({});
    }
  }
  // Reset mock call history but preserve implementations
  mockRefreshTokens.clear();
  jest.clearAllMocks();
});
