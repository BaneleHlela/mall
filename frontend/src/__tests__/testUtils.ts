/**
 * Test Utilities — Redux Store & Router Wrappers
 * 
 * Phase: Frontend Tests
 * 
 * Provides reusable render helpers that wrap components with:
 *   - Redux Provider (with preloaded state)
 *   - React Router (MemoryRouter for testing)
 *   - Theme context (if needed)
 * 
 * Usage:
 *   import { renderWithProviders } from '../__tests__/testUtils';
 *   renderWithProviders(<LoginPage />, { preloadedState: { user: { ... } } });
 */

import { createElement, type ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';

export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      user: userReducer,
      theme: themeReducer,
    },
    preloadedState: {
      user: {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
        error: null,
        message: null,
        ...preloadedState.user,
      },
      theme: {
        isDarkMode: false,
        ...preloadedState.theme,
      },
    },
  });
};

type TestStore = ReturnType<typeof createTestStore>;

interface RenderWithProvidersOptions extends RenderOptions {
  preloadedState?: Partial<{
    user: ReturnType<typeof userReducer>;
    theme: ReturnType<typeof themeReducer>;
  }>;
  routerProps?: MemoryRouterProps;
  store?: TestStore;
}

/**
 * Render a component with Redux Provider and MemoryRouter
 * 
 * @param ui - The component to render
 * @param options - Options for preloaded state and router config
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    routerProps = { initialEntries: ['/'] },
    store = createTestStore(preloadedState),
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(
      Provider,
      { store },
      createElement(MemoryRouter, routerProps, children)
    );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Create a pre-authenticated store for testing protected components
 */
export function createAuthenticatedStore(userOverrides = {}) {
  const mockUser = {
    _id: 'test-user-123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    username: 'testuser',
    isVerified: true,
    avatar: 'default-avatar-url.jpg',
    ...userOverrides,
  };

  return createTestStore({
    user: {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      isCheckingAuth: false,
      error: null,
      message: null,
    },
  });
}

/**
 * Simulate user login by dispatching login thunk
 * (Requires MSW handlers to be set up for /api/user/login)
 */
export async function loginUser(store: TestStore, email: string, password: string) {
  const { login } = await import('../features/user/userSlice');
  return store.dispatch(login({ email, password })).unwrap();
}

/**
 * Simulate user signup
 */
export async function signupUser(store: TestStore, data: { email: string; password: string; firstName: string; lastName: string }) {
  const { signup } = await import('../features/user/userSlice');
  return store.dispatch(signup(data)).unwrap();
}

// Re-export commonly used utilities
export { screen, fireEvent, waitFor, act } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';