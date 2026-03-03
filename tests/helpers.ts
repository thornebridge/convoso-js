import { Convoso } from '../src/client.js';

type MockHandler = (path: string, params: URLSearchParams) => unknown;

export function createMockClient(handler: MockHandler): Convoso {
  const mockFetch: typeof globalThis.fetch = async (input, init) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : (input as Request).url;
    const path = url.replace('https://api.convoso.com/v1', '');
    const body = typeof init?.body === 'string' ? init.body : '';
    const params = new URLSearchParams(body);

    const result = handler(path, params);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return new Convoso({ authToken: 'test-token', fetch: mockFetch });
}

export function createErrorClient(status: number, body: string): Convoso {
  const mockFetch: typeof globalThis.fetch = async () => {
    return new Response(body, { status, statusText: 'Error' });
  };

  return new Convoso({ authToken: 'test-token', fetch: mockFetch });
}

export function createApiErrorClient(responseBody: Record<string, unknown>): Convoso {
  const mockFetch: typeof globalThis.fetch = async () => {
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return new Convoso({ authToken: 'test-token', fetch: mockFetch });
}
