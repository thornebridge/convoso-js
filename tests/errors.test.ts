import { describe, expect, it } from 'vitest';
import { ConvosoError, ConvosoApiError, ConvosoHttpError } from '../src/errors.js';

describe('ConvosoError', () => {
  it('is an instance of Error', () => {
    const err = new ConvosoError('test');
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('ConvosoError');
    expect(err.message).toBe('test');
  });
});

describe('ConvosoApiError', () => {
  it('captures code and body', () => {
    const body = { success: false, code: 6001, message: 'Not found' };
    const err = new ConvosoApiError('Not found', 6001, body);
    expect(err).toBeInstanceOf(ConvosoError);
    expect(err.name).toBe('ConvosoApiError');
    expect(err.code).toBe(6001);
    expect(err.body).toEqual(body);
  });
});

describe('ConvosoHttpError', () => {
  it('captures status and body text', () => {
    const err = new ConvosoHttpError(500, 'Internal Server Error', 'something broke');
    expect(err).toBeInstanceOf(ConvosoError);
    expect(err.name).toBe('ConvosoHttpError');
    expect(err.status).toBe(500);
    expect(err.statusText).toBe('Internal Server Error');
    expect(err.body).toBe('something broke');
    expect(err.message).toBe('HTTP 500: Internal Server Error');
  });
});
