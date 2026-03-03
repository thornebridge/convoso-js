import { describe, expect, it } from 'vitest';
import { parseRateLimitHeaders } from '../src/rate-limit.js';
import { Convoso } from '../src/client.js';

describe('parseRateLimitHeaders', () => {
  it('parses all three headers when present', () => {
    const response = new Response('', {
      headers: {
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '42',
        'X-RateLimit-Reset': '1700000000',
      },
    });

    const info = parseRateLimitHeaders(response);
    expect(info).toEqual({ limit: 100, remaining: 42, reset: 1700000000 });
  });

  it('returns undefined for missing headers', () => {
    const response = new Response('');
    const info = parseRateLimitHeaders(response);
    expect(info).toEqual({ limit: undefined, remaining: undefined, reset: undefined });
  });

  it('returns undefined for non-numeric values', () => {
    const response = new Response('', {
      headers: {
        'X-RateLimit-Limit': 'abc',
        'X-RateLimit-Remaining': '',
        'X-RateLimit-Reset': 'not-a-number',
      },
    });

    const info = parseRateLimitHeaders(response);
    expect(info.limit).toBeUndefined();
    expect(info.remaining).toBeUndefined();
    expect(info.reset).toBeUndefined();
  });

  it('handles partial headers', () => {
    const response = new Response('', {
      headers: { 'X-RateLimit-Remaining': '7' },
    });

    const info = parseRateLimitHeaders(response);
    expect(info).toEqual({ limit: undefined, remaining: 7, reset: undefined });
  });

  it('is case-insensitive for header names', () => {
    const response = new Response('', {
      headers: { 'x-ratelimit-limit': '50' },
    });

    const info = parseRateLimitHeaders(response);
    expect(info.limit).toBe(50);
  });

  it('works inside an onResponse hook', async () => {
    let capturedInfo: ReturnType<typeof parseRateLimitHeaders> | undefined;

    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ data: 'ok' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': '1000',
          'X-RateLimit-Remaining': '999',
          'X-RateLimit-Reset': '1700001000',
        },
      });
    };

    const client = new Convoso({
      authToken: 'test-token',
      fetch: mockFetch,
      onResponse: (_path, response) => {
        capturedInfo = parseRateLimitHeaders(response);
      },
    });

    await client.leads.search({ list_id: '1' });

    expect(capturedInfo).toEqual({ limit: 1000, remaining: 999, reset: 1700001000 });
  });
});
