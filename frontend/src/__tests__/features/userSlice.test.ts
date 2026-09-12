/**
 * Redux Tests: userSlice
 * 
 * Phase: Frontend Tests — Redux Slice Tests
 * 
 * Tests the user slice reducers and async thunks in isolation.
 * Uses MSW to mock API responses.
 * 
 * Test file: userSlice.test.ts
 * Slice: frontend/src/features/user/userSlice.ts
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { 
  signup, 
  login, 
  logout, 
  verifyEmail, 
  checkAuth, 
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
  userLoginStatus,
  getProfile,
  updateAvatar,
  toggleLike,
} from '@/features/user/userSlice';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

// Create a test store with the user slice
const createTestStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

describe('userSlice', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('[TC-SLICE-001] has correct initial state', () => {
      const state = store.getState().user;
      
      expect(state).toEqual({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
        error: null,
        message: null,
      });
    });
  });

  describe('clearError & clearMessage', () => {
    it('[TC-SLICE-002] clears error', () => {
      // Set error first by dispatching a rejected action
      // We test the reducer directly
      const action = { type: 'user/clearError' };
      const state = userReducer({ error: 'Some error' }, action);
      expect(state.error).toBeNull();
    });

    it('[TC-SLICE-003] clears message', () => {
      const action = { type: 'user/clearMessage' };
      const state = userReducer({ message: 'Some message' }, action);
      expect(state.message).toBeNull();
    });
  });

  describe('setUser & clearUser', () => {
    it('[TC-SLICE-004] sets user and authenticated state', () => {
      const mockUser = { _id: '123', email: 'test@example.com', firstName: 'Test', lastName: 'User' };
      const action = { type: 'user/setUser', payload: mockUser };
      const state = userReducer(
        { user: null, isAuthenticated: false, isLoading: false, isCheckingAuth: false, error: null, message: null },
        action
      );
      
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('[TC-SLICE-005] clears user and authenticated state', () => {
      const action = { type: 'user/clearUser' };
      const state = userReducer(
        { 
          user: { _id: '123', email: 'test@example.com' }, 
          isAuthenticated: true, 
          isLoading: false, 
          isCheckingAuth: false, 
          error: null, 
          message: null 
        },
        action
      );
      
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('signup async thunk', () => {
    it('[TC-SLICE-006] handles signup.pending', () => {
      const action = { type: 'user/signup/pending' };
      const state = userReducer(store.getState().user, action);
      
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('[TC-SLICE-007] handles signup.fulfilled', async () => {
      // Dispatch the thunk (MSW handles the API call)
      await store.dispatch(signup({ 
        email: 'new@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'New', 
        lastName: 'User' 
      })).unwrap();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toMatchObject({
        email: 'new@example.com',
        firstName: 'New',
        lastName: 'User',
        username: 'newuser',
        isVerified: true,
      });
      expect(state.user?.avatar).toBe('default-avatar-url.jpg');
      expect(state.user?.favourites).toBeDefined();
    });

    it('[TC-SLICE-008] handles signup.rejected', async () => {
      // Override MSW to return error
      server.use(
        http.post('*/api/user/signup', () => {
          return HttpResponse.json({ message: 'User already exists' }, { status: 400 });
        })
      );
      
      await expect(
        store.dispatch(signup({ 
          email: 'existing@example.com', 
          password: 'Str0ngP@ss!', 
          firstName: 'New', 
          lastName: 'User' 
        })).unwrap()
      ).rejects.toBeDefined();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('User already exists');
    });
  });

  describe('login async thunk', () => {
    it('[TC-SLICE-009] handles login.pending', () => {
      const action = { type: 'user/login/pending' };
      const state = userReducer(store.getState().user, action);
      
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('[TC-SLICE-010] handles login.fulfilled', async () => {
      // First create a user via signup
      await store.dispatch(signup({ 
        email: 'login@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Login', 
        lastName: 'Test' 
      })).unwrap();
      
      // Now login
      await store.dispatch(login({ 
        email: 'login@example.com', 
        password: 'Str0ngP@ss!' 
      })).unwrap();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.email).toBe('login@example.com');
    });

    it('[TC-SLICE-011] handles login.rejected for invalid credentials', async () => {
      server.use(
        http.post('*/api/user/login', () => {
          return HttpResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        })
      );
      
      await expect(
        store.dispatch(login({ 
          email: 'wrong@example.com', 
          password: 'wrong' 
        })).unwrap()
      ).rejects.toBeDefined();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid email or password');
    });
  });

  describe('logout async thunk', () => {
    it('[TC-SLICE-012] handles logout.fulfilled', async () => {
      // First login
      await store.dispatch(signup({ 
        email: 'logout@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Logout', 
        lastName: 'Test' 
      })).unwrap();
      
      // Then logout
      await store.dispatch(logout()).unwrap();
      
      const state = store.getState().user;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('verifyEmail async thunk', () => {
    it('[TC-SLICE-013] handles verifyEmail.fulfilled', async () => {
      // First signup
      await store.dispatch(signup({ 
        email: 'verify@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Verify', 
        lastName: 'Test' 
      })).unwrap();
      
      // Get verification code from the mock user
      // In our MSW mock, the user gets a verificationToken
      // We need to simulate the flow - signup creates user with token
      
      // Verify with the code
      await store.dispatch(verifyEmail('123456')).unwrap();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });

    it('[TC-SLICE-014] handles verifyEmail.rejected', async () => {
      server.use(
        http.post('*/api/user/verify-email', () => {
          return HttpResponse.json({ message: 'Invalid or expired verification code' }, { status: 400 });
        })
      );
      
      await expect(
        store.dispatch(verifyEmail('000000')).unwrap()
      ).rejects.toBeDefined();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid or expired verification code');
    });
  });

  describe('checkAuth async thunk', () => {
    it('[TC-SLICE-015] handles checkAuth.fulfilled', async () => {
      // First login to get cookies
      await store.dispatch(signup({ 
        email: 'check@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Check', 
        lastName: 'Auth' 
      })).unwrap();
      
      // Now check auth
      await store.dispatch(checkAuth()).unwrap();
      
      const state = store.getState().user;
      expect(state.isCheckingAuth).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user?.email).toBe('check@example.com');
    });

    it('[TC-SLICE-016] handles checkAuth.rejected (no token)', async () => {
      // No login - should fail
      await store.dispatch(checkAuth());
      
      const state = store.getState().user;
      expect(state.isCheckingAuth).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('refreshAccessToken async thunk', () => {
    it('[TC-SLICE-016] handles refreshAccessToken.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'refresh@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Refresh', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(refreshAccessToken()).unwrap();
      
      const state = store.getState().user;
      expect(state.message).toBe('Token refreshed successfully');
    });
  });

  describe('forgotPassword async thunk', () => {
    it('[TC-SLICE-017] handles forgotPassword.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'forgot@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Forgot', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(forgotPassword('forgot@example.com')).unwrap();
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.message).toBe('Password reset link sent to your email');
    });

    it('[TC-SLICE-018] handles forgotPassword.rejected', async () => {
      server.use(
        http.post('*/api/user/forgot-password', () => {
          return HttpResponse.json({ message: 'User not found' }, { status: 400 });
        })
      );
      
      await expect(
        store.dispatch(forgotPassword('nonexistent@example.com')).unwrap()
      ).rejects.toBeDefined();
      
      const state = store.getState().user;
      expect(state.error).toBe('User not found');
    });
  });

  describe('resetPassword async thunk', () => {
    it('[TC-SLICE-019] handles resetPassword.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'reset@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Reset', 
        lastName: 'Test' 
      })).unwrap();
      
      // Trigger forgot password to get token
      await store.dispatch(forgotPassword('reset@example.com')).unwrap();
      
      // In our MSW mock, the reset token is returned in the response
      // For this test, we'll use a mock token
      await store.dispatch(resetPassword({ 
        token: 'mock-reset-token', 
        password: 'NewStr0ngP@ss!' 
      })).unwrap();
      
      const state = store.getState().user;
      expect(state.message).toBe('Password reset successful');
    });
  });

  describe('updateUser async thunk', () => {
    it('[TC-SLICE-020] handles updateUser.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'update@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Update', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(updateUser({ firstName: 'Updated' })).unwrap();
      
      const state = store.getState().user;
      expect(state.user?.firstName).toBe('Updated');
    });
  });

  describe('deleteUser async thunk', () => {
    it('[TC-SLICE-021] handles deleteUser.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'delete@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Delete', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(deleteUser()).unwrap();
      
      const state = store.getState().user;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('userLoginStatus async thunk', () => {
    it('[TC-SLICE-022] handles userLoginStatus.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'status@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Status', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(userLoginStatus()).unwrap();
      
      const state = store.getState().user;
      expect(state.isAuthenticated).toBe(true);
    });

    it('[TC-SLICE-023] handles userLoginStatus.rejected', async () => {
      server.use(
        http.get('*/api/user/login-status', () => {
          return HttpResponse.json(false, { status: 401 });
        })
      );
      
      await store.dispatch(userLoginStatus());
      
      const state = store.getState().user;
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('getProfile async thunk', () => {
    it('[TC-SLICE-024] handles getProfile.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'profile@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Profile', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(getProfile()).unwrap();
      
      const state = store.getState().user;
      expect(state.user).toBeTruthy();
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('updateAvatar async thunk', () => {
    it('[TC-SLICE-025] handles updateAvatar.fulfilled', async () => {
      await store.dispatch(signup({ 
        email: 'avatar@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Avatar', 
        lastName: 'Test' 
      })).unwrap();
      
      const mockFile = new File(['test'], 'avatar.jpg', { type: 'image/jpeg' });
      await store.dispatch(updateAvatar({ file: mockFile })).unwrap();
      
      const state = store.getState().user;
      expect(state.user?.avatar).toBe('http://test.url/avatar.jpg');
    });

    it('[TC-SLICE-026] handles updateAvatar for remove', async () => {
      await store.dispatch(signup({ 
        email: 'avatar2@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Avatar', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(updateAvatar({ remove: true })).unwrap();
      
      const state = store.getState().user;
      expect(state.user?.avatar).toBe('default-avatar-url.jpg');
    });
  });

  describe('toggleLike async thunk', () => {
    it('[TC-SLICE-027] handles toggleLike for Store', async () => {
      await store.dispatch(signup({ 
        email: 'like@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Like', 
        lastName: 'Test' 
      })).unwrap();
      
      await store.dispatch(toggleLike({ targetType: 'Store', targetId: 'store-123' })).unwrap();
      
      const state = store.getState().user;
      expect(state.user?.favourites?.stores).toContain('store-123');
    });

    it('[TC-SLICE-028] handles toggleLike to remove from favorites', async () => {
      await store.dispatch(signup({ 
        email: 'like2@example.com', 
        password: 'Str0ngP@ss!', 
        firstName: 'Like', 
        lastName: 'Test' 
      })).unwrap();
      
      // First like
      await store.dispatch(toggleLike({ targetType: 'Store', targetId: 'store-456' })).unwrap();
      
      // Then unlike
      await store.dispatch(toggleLike({ targetType: 'Store', targetId: 'store-456' })).unwrap();
      
      const state = store.getState().user;
      expect(state.user?.favourites?.stores).not.toContain('store-456');
    });
  });
});