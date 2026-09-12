/**
 * Unit Tests: Username & Slug Generation Utilities
 * 
 * Phase: 1 — Backend Unit Tests (no DB, no network)
 * 
 * These tests cover pure string-transformation functions from
 * backend/utils/helperFunctions.js that do not require a database.
 * 
 * Covered functions:
 *   - generateSlug(name)            — Converts store names to URL slugs
 *   - addMinutes(date, min)         — Offset date by N minutes
 *   - formatTime(date)              — Format UTC time as HH:mm
 *   - timeStringToDate(date, str)   — Merge date with time string
 */

import {
  generateSlug,
  addMinutes,
  formatTime,
  timeStringToDate,
} from '../../utils/helperFunctions.js';

// ── generateSlug ──────────────────────────────────────────────
describe('generateSlug', () => {
  it('should convert a simple string to a slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('should handle multiple spaces and hyphens', () => {
    expect(generateSlug('Hello   ---  World')).toBe('hello-world');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(generateSlug('---Hello---')).toBe('hello');
  });

  it('should remove special characters', () => {
    expect(generateSlug('Hello! @#$World%')).toBe('hello-world');
  });

  it('should lowercase everything', () => {
    expect(generateSlug('STORE NAME')).toBe('store-name');
  });

  it('should return empty string for empty input', () => {
    expect(generateSlug('')).toBe('');
  });

  it('should handle underscores as separators', () => {
    expect(generateSlug('hello_world')).toBe('hello-world');
  });
});

// ── addMinutes ──────────────────────────────────────────────
describe('addMinutes', () => {
  it('should add minutes to a date', () => {
    const date = new Date('2026-01-01T12:00:00Z');
    const result = addMinutes(date, 30);
    expect(result.getTime()).toBe(new Date('2026-01-01T12:30:00Z').getTime());
  });

  it('should handle zero minutes (no change)', () => {
    const date = new Date('2026-01-01T12:00:00Z');
    const result = addMinutes(date, 0);
    expect(result.getTime()).toBe(date.getTime());
  });

  it('should handle negative minutes (subtract)', () => {
    const date = new Date('2026-01-01T12:00:00Z');
    const result = addMinutes(date, -15);
    expect(result.getTime()).toBe(new Date('2026-01-01T11:45:00Z').getTime());
  });
});

// ── formatTime ──────────────────────────────────────────────
describe('formatTime', () => {
  it('should format UTC time as HH:mm', () => {
    const date = new Date('2026-01-01T14:30:00Z');
    expect(formatTime(date)).toBe('14:30');
  });

  it('should zero-pad single-digit hours', () => {
    const date = new Date('2026-01-01T09:05:00Z');
    expect(formatTime(date)).toBe('09:05');
  });

  it('should format midnight as 00:00', () => {
    const date = new Date('2026-01-01T00:00:00Z');
    expect(formatTime(date)).toBe('00:00');
  });
});

// ── timeStringToDate ────────────────────────────────────────
describe('timeStringToDate', () => {
  it('should combine a base date with a time string', () => {
    const base = new Date('2026-01-01T10:00:00Z');
    const result = timeStringToDate(base, '15:45');
    expect(result.getUTCHours()).toBe(15);
    expect(result.getUTCMinutes()).toBe(45);
    expect(result.getUTCFullYear()).toBe(2026);
  });

  it('should preserve the original date parts', () => {
    const base = new Date('2026-06-15T08:00:00Z');
    const result = timeStringToDate(base, '09:30');
    expect(result.getUTCMonth()).toBe(5); // June is month 5 (0-indexed)
    expect(result.getUTCDate()).toBe(15);
  });

  it('should not mutate the original date', () => {
    const base = new Date('2026-01-01T10:00:00Z');
    const originalTime = base.getTime();
    timeStringToDate(base, '15:45');
    expect(base.getTime()).toBe(originalTime);
  });
});
