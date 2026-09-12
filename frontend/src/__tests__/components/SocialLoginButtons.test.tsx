/**
 * Component Tests: SocialLoginButtons
 * 
 * Phase: Frontend Tests — Component Tests
 * 
 * Tests the social login buttons (Google, Facebook) that redirect
 * to the backend OAuth endpoints.
 * 
 * Test file: SocialLoginButtons.test.tsx
 * Component: frontend/src/components/the_mall/authentication/components/SocialLoginButtons.tsx
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import SocialLoginButtons from '@/components/the_mall/authentication/components/SocialLoginButtons';
import { renderWithProviders } from '../testUtils';

describe('SocialLoginButtons', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location for redirect tests
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: '' },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('[TC-SOC-001] renders Google and Facebook buttons', () => {
    renderWithProviders(<SocialLoginButtons />);
    
    expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /facebook/i })).toBeInTheDocument();
  });

  it('[TC-SOC-002] shows Google icon', () => {
    renderWithProviders(<SocialLoginButtons />);
    
    const googleBtn = screen.getByRole('button', { name: /Google/i });
    const img = googleBtn.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg');
  });

  it('[TC-SOC-003] shows Facebook icon', () => {
    renderWithProviders(<SocialLoginButtons />);
    
    const fbBtn = screen.getByRole('button', { name: /facebook/i });
    const icon = fbBtn.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('[TC-SOC-004] redirects to Google OAuth on click', () => {
    // API_URL is imported from features/context - it's the backend URL
    renderWithProviders(<SocialLoginButtons />);
    
    fireEvent.click(screen.getByRole('button', { name: /Google/i }));
    
    expect(window.location.href).toContain('/api/auth/google');
  });

  it('[TC-SOC-005] redirects to Facebook OAuth on click', () => {
    renderWithProviders(<SocialLoginButtons />);
    
    fireEvent.click(screen.getByRole('button', { name: /facebook/i }));
    
    expect(window.location.href).toContain('/api/auth/facebook');
  });

  it('[TC-SOC-006] buttons have correct styling classes', () => {
    renderWithProviders(<SocialLoginButtons />);
    
    const googleBtn = screen.getByRole('button', { name: /Google/i });
    const fbBtn = screen.getByRole('button', { name: /facebook/i });
    
    expect(googleBtn).toHaveClass('py-[1vh]');
    expect(googleBtn).toHaveClass('w-[40%]');
    expect(fbBtn).toHaveClass('bg-[#e8f0fe]');
  });
});