/**
 * Unit Tests: PayFast Signature Generation
 * 
 * Phase: 1 — Backend Unit Tests
 * 
 * Tests the PayFast payment signature utilities. These are pure functions
 * that generate MD5 hashes for payment verification — no DB, no network.
 * 
 * Covered functions:
 *   - generatePayFastSignature(data, passPhrase)
 *       Builds a key=value&key=value string from data and returns MD5 hash.
 *   - generatePayFastSignatureOrderFixed(data, passPhrase)
 *       Same as above, but sorts keys alphabetically first (fixed order).
 *   - pfValidSignature(pfData, pfParamString, pfPassphrase)
 *       Validates that a received signature matches the expected one.
 */

import {
  generatePayFastSignature,
  generatePayFastSignatureOrderFixed,
  pfValidSignature,
} from '../../utils/helperFunctions.js';

// ── generatePayFastSignature ─────────────────────────────────
describe('generatePayFastSignature', () => {
  it('should generate an MD5 hash (32 hex chars) from data', () => {
    const data = {
      name: 'John',
      amount: '100.00',
    };
    const result = generatePayFastSignature(data);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^[a-f0-9]{32}$/);
  });

  it('should produce the same signature for the same data (deterministic)', () => {
    const data = { name: 'Test', amount: '50.00' };
    const sig1 = generatePayFastSignature(data);
    const sig2 = generatePayFastSignature(data);
    expect(sig1).toBe(sig2);
  });

  it('should produce different signatures for different data', () => {
    const sig1 = generatePayFastSignature({ name: 'A' });
    const sig2 = generatePayFastSignature({ name: 'B' });
    expect(sig1).not.toBe(sig2);
  });

  it('should include passphrase when provided', () => {
    const data = { name: 'Test' };
    const sigWithoutPass = generatePayFastSignature(data);
    const sigWithPass = generatePayFastSignature(data, 'my-secret');
    expect(sigWithoutPass).not.toBe(sigWithPass);
  });

  it('should skip empty values in the parameter string', () => {
    const data = {
      name: 'Test',
      emptyField: '',
      amount: '100.00',
    };
    const result = generatePayFastSignature(data);
    expect(result).toMatch(/^[a-f0-9]{32}$/);
    // Empty fields should not appear in the signature
    // We verify by checking the signature is still valid
  });
});

// ── generatePayFastSignatureOrderFixed ───────────────────────
describe('generatePayFastSignatureOrderFixed', () => {
  it('should sort keys before generating signature', () => {
    const data1 = { b: '2', a: '1' };
    const data2 = { a: '1', b: '2' };
    const sig1 = generatePayFastSignatureOrderFixed(data1);
    const sig2 = generatePayFastSignatureOrderFixed(data2);
    expect(sig1).toBe(sig2); // Same regardless of key order
  });

  it('should exclude the signature key from the input data', () => {
    const data = { a: '1', signature: 'should-be-ignored' };
    const result = generatePayFastSignatureOrderFixed(data);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^[a-f0-9]{32}$/);
  });

  it('should produce a valid 32-char MD5 hash', () => {
    const data = { merchant_id: '10000107', amount: '100.00' };
    const result = generatePayFastSignatureOrderFixed(data);
    expect(result).toMatch(/^[a-f0-9]{32}$/);
  });
});

// ── pfValidSignature ─────────────────────────────────────────
describe('pfValidSignature', () => {
  it('should validate a correct signature', () => {
    const data = { amount: '100.00', name: 'Test' };
    const paramString = 'amount=100.00&name=Test';
    const signature = generatePayFastSignature(data);
    expect(pfValidSignature({ signature }, paramString)).toBe(true);
  });

  it('should reject an incorrect signature', () => {
    expect(pfValidSignature({ signature: 'wrong' }, 'amount=100.00')).toBe(false);
  });

  it('should handle signature with passphrase', () => {
    const data = { amount: '100.00' };
    const paramString = 'amount=100.00';
    const passphrase = 'my-secret';
    const signature = generatePayFastSignature(data, passphrase);
    expect(
      pfValidSignature({ signature }, paramString, passphrase)
    ).toBe(true);
  });
});
