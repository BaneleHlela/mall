/**
 * Component Tests: SignUpPage
 * 
 * Phase: Frontend Tests — Component Tests
 * 
 * Tests the signup page including form validation, password strength,
 * Redux integration, and navigation on success.
 * 
 * Test file: SignUpPage.test.tsx
 * Component: frontend/src/pages/auth/SignUpPage.tsx
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation } from 'react-router-dom';
import SignUpPage from '@/pages/auth/SignUpPage';
import { renderWithProviders, createTestStore } from '../testUtils';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('SignUpPage', () => {
  let store: ReturnType<typeof createTestStore>;

  const LocationProbe = () => {
    const location = useLocation();
    return <span data-testid="current-path">{location.pathname}</span>;
  };

  beforeEach(() => {
    store = createTestStore();
  });

  describe('Rendering', () => {
    it('[TC-SIGN-001] renders all form fields', () => {
      renderWithProviders(<SignUpPage />, { store });
      
      expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    it('[TC-SIGN-002] renders SocialLoginButtons', () => {
      renderWithProviders(<SignUpPage />, { store });
      
      expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /facebook/i })).toBeInTheDocument();
    });

    it('[TC-SIGN-003] renders login link', () => {
      renderWithProviders(<SignUpPage />, { store });
      
      expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login');
    });
  });

  describe('Password Strength', () => {
    it('[TC-SIGN-004] shows password strength meter when typing', async () => {
      renderWithProviders(<SignUpPage />, { store });
      
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
      
      // PasswordStrengthMeter should appear
      await waitFor(() => {
        expect(screen.getByText(/strength/i)).toBeInTheDocument();
      });
    });

    it('[TC-SIGN-005] disables submit for weak password', async () => {
      renderWithProviders(<SignUpPage />, { store });
      
      const submitBtn = screen.getByRole('button', { name: /Sign Up/i });
      
      // Initially disabled (empty password)
      expect(submitBtn).toBeDisabled();
      
      // Weak password - still disabled
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      await waitFor(() => {
        expect(submitBtn).toBeDisabled();
      });
    });

    it('[TC-SIGN-006] enables submit for strong password', async () => {
      renderWithProviders(<SignUpPage />, { store });
      
      const submitBtn = screen.getByRole('button', { name: /Sign Up/i });
      
      // Strong password (uppercase, lowercase, number, special char, 8+ chars)
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
      
      // Fill required fields
      fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: 'john@example.com' } });
      
      await waitFor(() => {
        expect(submitBtn).not.toBeDisabled();
      });
    });
  });

  describe('Form Validation', () => {
    it('[TC-SIGN-007] shows error on empty submit', async () => {
      renderWithProviders(<SignUpPage />, { store });
      
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
      const submitBtn = screen.getByRole('button', { name: /Sign Up/i });
      fireEvent.click(submitBtn);
      
      await waitFor(() => {
        expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
      });
    });
  });

  describe('Successful Signup', () => {
    it('[TC-SIGN-008] creates user and redirects to verify-email', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <>
          <SignUpPage />
          <LocationProbe />
        </>,
        {
          store,
          routerProps: { initialEntries: ['/signup'] },
        }
      );
      
      await user.type(screen.getByPlaceholderText(/First Name/i), 'John');
      await user.type(screen.getByPlaceholderText(/Last Name/i), 'Doe');
      await user.type(screen.getByPlaceholderText(/Email Address/i), 'john@example.com');
      await user.type(screen.getByPlaceholderText(/Password/i), 'StrongP@ss1');
      await user.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      await waitFor(() => {
        const state = store.getState();
        expect(state.user.isAuthenticated).toBe(true);
        expect(state.user.user?.email).toBe('john@example.com');
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('current-path')).toHaveTextContent('/verify-email');
      });
    });
  });

  describe('Failed Signup', () => {
    it('[TC-SIGN-009] shows error for duplicate email', async () => {
      // Override MSW handler for duplicate email
      server.use(
        http.post('*/api/user/signup', () => {
          return HttpResponse.json({ message: 'User already exists. Please login instead.' }, { status: 400 });
        })
      );
      
      const user = userEvent.setup();
      renderWithProviders(<SignUpPage />, { store });
      
      await user.type(screen.getByPlaceholderText(/First Name/i), 'John');
      await user.type(screen.getByPlaceholderText(/Last Name/i), 'Doe');
      await user.type(screen.getByPlaceholderText(/Email Address/i), 'existing@example.com');
      await user.type(screen.getByPlaceholderText(/Password/i), 'StrongP@ss1');
      await user.click(screen.getByRole('button', { name: /Sign Up/i }));
      
      await waitFor(() => {
        expect(screen.getByText(/User already exists/i)).toBeInTheDocument();
      });
      
      server.resetHandlers();
    });
  });

  describe('Accessibility', () => {
    it('[TC-SIGN-010] has proper label associations', () => {
      renderWithProviders(<SignUpPage />, { store });
      
      expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it('[TC-SIGN-011] password field is type password', () => {
      renderWithProviders(<SignUpPage />, { store });
      
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });
});