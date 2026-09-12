/**
 * Unit Test Setup — Lightweight (No Database)
 * 
 * Phase: 1 — Backend Unit Tests
 * 
 * Used ONLY by unit tests (files in tests/unit/).
 * This setup:
 *   1. Sets environment variables
 *   2. Mocks external services (GCS, Puppeteer, bcrypt)
 *   3. Does NOT start MongoDB — unit tests test pure functions
 *
 * The testSetup.js file is for integration tests only and includes
 * the MongoDB lifecycle.
 */

// ── 1. Environment Variables ─────────────────────────────────────────
process.env.ACCESS_TOKEN_SECRET = 'test-access-token-secret-123';
process.env.REFRESH_TOKEN_SECRET = 'test-refresh-token-secret-456';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.NODE_ENV = 'test';
process.env.CLIENT_URL = 'http://localhost:5173';
process.env.REDIS_URL = '';

// ── 2. Module Mocks ──────────────────────────────────────────────────
// These mocks prevent real external connections when helperFunctions.js
// (which imports gcsClient.js and puppeteerConfig.js) is loaded.

// Google Cloud Storage — mock to prevent real GCS connection on import
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

// Puppeteer screenshot capture — mock to avoid browser launch
jest.mock('../../config/puppeteerConfig.js', () => ({
  captureScreenshot: jest.fn(() =>
    Promise.resolve(Buffer.from('fake-screenshot'))
  ),
}));

// bcryptjs — mock so User model's pre-save hook doesn't do real hashing
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

// ── 3. Cleanup ───────────────────────────────────────────────────────
afterEach(() => {
  jest.clearAllMocks();
});
