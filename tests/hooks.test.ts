import { describe, expect, it, vi } from 'vitest';
import { Convoso } from '../src/client.js';

describe('Request Hooks', () => {
  it('calls onRequest before fetch', async () => {
    const paths: string[] = [];
    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    };

    const client = new Convoso({
      authToken: 'test-token',
      fetch: mockFetch,
      onRequest: (path, params) => {
        paths.push(path);
        expect(params.get('auth_token')).toBe('test-token');
      },
    });

    await client.campaigns.search();
    expect(paths).toEqual(['/campaigns/search']);
  });

  it('calls onResponse after successful parse', async () => {
    const responses: unknown[] = [];
    const mockFetch: typeof globalThis.fetch = async () => {
      return new Response(JSON.stringify({ data: [{ id: '1', name: 'Test' }] }), { status: 200 });
    };

    const client = new Convoso({
      authToken: 'test-token',
      fetch: mockFetch,
      onResponse: (_path, _response, data) => {
        responses.push(data);
      },
    });

    await client.campaigns.search();
    expect(responses).toHaveLength(1);
    expect(responses[0]).toEqual({ data: [{ id: '1', name: 'Test' }] });
  });

  it('supports async hooks', async () => {
    const order: string[] = [];
    const mockFetch: typeof globalThis.fetch = async () => {
      order.push('fetch');
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const client = new Convoso({
      authToken: 'test-token',
      fetch: mockFetch,
      onRequest: async () => {
        order.push('onRequest');
      },
      onResponse: async () => {
        order.push('onResponse');
      },
    });

    await client.campaigns.search();
    expect(order).toEqual(['onRequest', 'fetch', 'onResponse']);
  });
});
