import { describe, expect, it } from 'vitest';
import { HttpClient } from '../src/http.js';
import { ConvosoApiError, ConvosoHttpError } from '../src/errors.js';

describe('HttpClient', () => {
  it('injects auth_token into every request', async () => {
    const mockFetch: typeof globalThis.fetch = async (_input, init) => {
      const body = new URLSearchParams(init?.body as string);
      expect(body.get('auth_token')).toBe('my-secret-token');
      return new Response(JSON.stringify({ data: 'ok' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'my-secret-token', fetch: mockFetch });
    await client.post('/test');
  });

  it('strips undefined and null params', async () => {
    const mockFetch: typeof globalThis.fetch = async (_input, init) => {
      const body = new URLSearchParams(init?.body as string);
      expect(body.has('list_id')).toBe(true);
      expect(body.has('first_name')).toBe(false);
      expect(body.has('last_name')).toBe(false);
      return new Response(JSON.stringify({ data: 'ok' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });
    await client.post('/test', { list_id: '333', first_name: undefined, last_name: null });
  });

  it('sends POST with form-urlencoded content type', async () => {
    const mockFetch: typeof globalThis.fetch = async (_input, init) => {
      expect(init?.method).toBe('POST');
      const headers = init?.headers as Record<string, string>;
      expect(headers['Content-Type']).toBe('application/x-www-form-urlencoded');
      return new Response(JSON.stringify({ data: 'ok' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });
    await client.post('/test');
  });

  it('throws ConvosoHttpError on non-2xx response', async () => {
    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });
    await expect(client.post('/test')).rejects.toThrow(ConvosoHttpError);

    try {
      await client.post('/test');
    } catch (err) {
      const httpErr = err as ConvosoHttpError;
      expect(httpErr.status).toBe(500);
      expect(httpErr.body).toBe('Internal Server Error');
    }
  });

  it('throws ConvosoApiError when success is false', async () => {
    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ success: false, code: 6001, message: 'Lead not found' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });

    try {
      await client.post('/test');
      expect.fail('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ConvosoApiError);
      const apiErr = err as ConvosoApiError;
      expect(apiErr.code).toBe(6001);
      expect(apiErr.message).toBe('Lead not found');
    }
  });

  it('uses error field when message is absent', async () => {
    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ success: false, code: 9999, error: 'Something broke' }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', fetch: mockFetch });

    try {
      await client.post('/test');
      expect.fail('should have thrown');
    } catch (err) {
      expect((err as ConvosoApiError).message).toBe('Something broke');
    }
  });

  it('supports custom base URL', async () => {
    const mockFetch: typeof globalThis.fetch = async (input) => {
      const url = typeof input === 'string' ? input : (input as Request).url;
      expect(url).toBe('https://custom.example.com/v2/test');
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const client = new HttpClient({ authToken: 'token', baseUrl: 'https://custom.example.com/v2', fetch: mockFetch });
    await client.post('/test');
  });
});
