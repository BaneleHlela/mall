/**
 * Frontend Test Setup — Vitest Configuration & Global Mocks
 * 
 * Phase: Frontend Tests
 * 
 * This file runs once before every test file. It:
 *   1. Sets up @testing-library/jest-dom custom matchers
 *   2. Starts/stops the MSW server for API mocking
 *   3. Configures global test utilities
 * 
 * Run with: npm run test
 */

import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './mocks/server';
import { resetTestUsers } from './mocks/handlers';

// ── MSW Server Lifecycle ─────────────────────────────────────────────
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

// Reset handlers and test state between each test
afterEach(() => {
  server.resetHandlers();
  resetTestUsers();
  vi.clearAllMocks();
});

// Close server after all tests
afterAll(() => server.close());

// ── Global Test Utilities ────────────────────────────────────────────
// Mock ResizeObserver (used by some UI libraries)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia (used by responsive components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (used by lazy loading, infinite scroll)
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.scrollTo (used by animations, modals)
window.scrollTo = vi.fn();

// Mock localStorage (used by some auth state persistence)
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });

// Suppress console.error for known test warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes?.('Warning: ReactDOM.render is no longer supported') ||
      args[0]?.includes?.('act(...)') ||
      args[0]?.includes?.('useLayoutEffect does nothing on the server')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// ── Redux Test Utilities ────────────────────────────────────────────
// Re-export for use in tests
export { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';