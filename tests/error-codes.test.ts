import { describe, expect, it } from 'vitest';
import { CONVOSO_ERROR_CODES, getErrorDescription } from '../src/error-codes.js';
import { ConvosoApiError } from '../src/errors.js';

describe('Error Codes', () => {
  it('getErrorDescription returns description for known code', () => {
    expect(getErrorDescription(6001)).toBe('Record not found');
    expect(getErrorDescription(6008)).toBe('Invalid or duplicate phone number');
    expect(getErrorDescription(7231)).toBe('Invalid offset value');
  });

  it('getErrorDescription returns undefined for unknown code', () => {
    expect(getErrorDescription(9999)).toBeUndefined();
  });

  it('CONVOSO_ERROR_CODES contains all documented codes', () => {
    const codes = Object.keys(CONVOSO_ERROR_CODES).map(Number);
    expect(codes.length).toBeGreaterThan(40);
    expect(codes).toContain(4001);
    expect(codes).toContain(6001);
    expect(codes).toContain(7258);
  });

  it('ConvosoApiError.description returns code description', () => {
    const err = new ConvosoApiError('Lead not found', 6001, { success: false });
    expect(err.description).toBe('Record not found');
  });

  it('ConvosoApiError.description returns undefined for unknown code', () => {
    const err = new ConvosoApiError('Unknown error', 9999, { success: false });
    expect(err.description).toBeUndefined();
  });
});
