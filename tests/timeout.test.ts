import { describe, expect, it, vi } from 'vitest';
import { HttpClient } from '../src/http.js';
import { ConvosoTimeoutError, ConvosoError } from '../src/errors.js';

/** Mock fetch that respects AbortSignal — hangs until aborted. */
function hangingFetch(): typeof globalThis.fetch {
  return (_input, init) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => {
        reject(new DOMException('The operation was aborted.', 'AbortError'));
      });
    });
}

describe('Request Timeout', () => {
  it('throws ConvosoTimeoutError when request exceeds timeout', async () => {
    const client = new HttpClient({ authToken: 'token', fetch: hangingFetch(), timeout: 100 });
    vi.useFakeTimers();
    const promise = client.post('/test');
    const caught = promise.catch((err) => err);
    await vi.advanceTimersByTimeAsync(100);
    const error = await caught;
    vi.useRealTimers();

    expect(error).toBeInstanceOf(ConvosoTimeoutError);
    expect((error as ConvosoTimeoutError).timeout).toBe(100);
  });

  it('succeeds when request completes within timeout', async () => {
    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ data: 'ok' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, timeout: 5000 });
    const result = await client.post('/test');
    expect(result).toEqual({ data: 'ok' });
  });

  it('retries after timeout when retries are configured', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = (input, init) => {
      attempt++;
      if (attempt === 1) {
        return hangingFetch()(input, init); // first attempt hangs
      }
      return Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    };

    const client = new HttpClient({
      authToken: 'token',
      fetch: mockFetch,
      timeout: 100,
      maxRetries: 1,
    });
    vi.useFakeTimers();
    const promise = client.post('/test');
    await vi.runAllTimersAsync();
    const result = await promise;
    vi.useRealTimers();

    expect(result).toEqual({ ok: true });
    expect(attempt).toBe(2);
  });

  it('throws after all retry attempts timeout', async () => {
    let attempt = 0;
    const mockFetch: typeof globalThis.fetch = (input, init) => {
      attempt++;
      return hangingFetch()(input, init);
    };

    const client = new HttpClient({
      authToken: 'token',
      fetch: mockFetch,
      timeout: 100,
      maxRetries: 1,
    });
    vi.useFakeTimers();
    const promise = client.post('/test');
    const caught = promise.catch((err) => err);
    await vi.runAllTimersAsync();
    const error = await caught;
    vi.useRealTimers();

    expect(error).toBeInstanceOf(ConvosoTimeoutError);
    expect(attempt).toBe(2);
  });

  it('does not use AbortController when no timeout is set', async () => {
    const mockFetch: typeof globalThis.fetch = async (_input, init) => {
      expect(init?.signal).toBeUndefined();
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });
    const result = await client.post('/test');
    expect(result).toEqual({ ok: true });
  });

  it('has correct error properties', () => {
    const error = new ConvosoTimeoutError(5000);
    expect(error.name).toBe('ConvosoTimeoutError');
    expect(error.timeout).toBe(5000);
    expect(error.message).toBe('Request timed out after 5000ms');
    expect(error).toBeInstanceOf(ConvosoError);
  });

  it('cleans up timer on successful response', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch, timeout: 5000 });
    await client.post('/test');

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
