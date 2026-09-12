/**
 * MSW Server Setup — Test HTTP Interception
 * 
 * Phase: Frontend Tests
 * 
 * Sets up Mock Service Worker to intercept fetch/axios requests
 * and return mock responses from our handlers.
 * 
 * This runs before all tests and resets handlers between each test.
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);