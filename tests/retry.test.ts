import { describe, expect, it, vi } from 'vitest';
import { HttpClient } from '../src/http.js';
import { ConvosoHttpError } from '../src/errors.js';

describe('Retry with Exponential Backoff', () => {
  it('retries on 429 and succeeds', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = async () => {
      attempt++;
      if (attempt <= 2) {
        return new Response('Rate limited', { status: 429, statusText: 'Too Many Requests' });
      }
      return new Response(JSON.stringify({ data: 'ok' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, maxRetries: 3 });
    // Mock setTimeout to avoid actual delays
    vi.useFakeTimers();
    const promise = client.post('/test');
    // Advance timers through retries
    await vi.runAllTimersAsync();
    const result = await promise;
    vi.useRealTimers();

    expect(result).toEqual({ data: 'ok' });
    expect(attempt).toBe(3);
  });

  it('retries on 500 and succeeds', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = async () => {
      attempt++;
      if (attempt === 1) {
        return new Response('Server Error', { status: 500, statusText: 'Internal Server Error' });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, maxRetries: 2 });
    vi.useFakeTimers();
    const promise = client.post('/test');
    await vi.runAllTimersAsync();
    const result = await promise;
    vi.useRealTimers();

    expect(result).toEqual({ ok: true });
    expect(attempt).toBe(2);
  });

  it('does not retry on 400', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = async () => {
      attempt++;
      return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, maxRetries: 3 });
    await expect(client.post('/test')).rejects.toThrow(ConvosoHttpError);
    expect(attempt).toBe(1);
  });

  it('throws after exhausting all retries', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = async () => {
      attempt++;
      return new Response('Server Error', { status: 502, statusText: 'Bad Gateway' });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, maxRetries: 2 });
    vi.useFakeTimers();
    const promise = client.post('/test');
    // Attach catch handler before advancing timers to prevent unhandled rejection
    const caught = promise.catch((err) => err);
    await vi.runAllTimersAsync();
    const error = await caught;
    vi.useRealTimers();

    expect(error).toBeInstanceOf(ConvosoHttpError);
    expect((error as ConvosoHttpError).status).toBe(502);
    expect(attempt).toBe(3);
  });

  it('does not retry when maxRetries is 0 (default)', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = async () => {
      attempt++;
      return new Response('Server Error', { status: 500, statusText: 'Internal Server Error' });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });
    await expect(client.post('/test')).rejects.toThrow(ConvosoHttpError);
    expect(attempt).toBe(1);
  });

  it('respects Retry-After header on 429', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = async () => {
      attempt++;
      if (attempt === 1) {
        return new Response('Rate limited', {
          status: 429,
          statusText: 'Too Many Requests',
          headers: { 'Retry-After': '2' },
        });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, maxRetries: 1 });
    vi.useFakeTimers();
    const promise = client.post('/test');
    // The sleep should be 2000ms (from Retry-After: 2)
    await vi.advanceTimersByTimeAsync(2000);
    const result = await promise;
    vi.useRealTimers();

    expect(result).toEqual({ ok: true });
    expect(attempt).toBe(2);
  });
});
