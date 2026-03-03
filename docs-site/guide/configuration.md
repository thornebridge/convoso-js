---
title: Configuration
description: Configure the convoso-js client — auth tokens, custom base URLs, fetch implementations, retry, and request hooks.
---

# Configuration

All configuration is passed to the `Convoso` constructor via a single options object.

## ConvosoOptions

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: 'your-api-token',    // Required
  baseUrl: 'https://...',         // Optional
  fetch: customFetch,             // Optional
  maxRetries: 3,                  // Optional
  onRequest: (path, params) => {}, // Optional
  onResponse: (path, res, data) => {}, // Optional
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| `authToken` | `string` | — | **Required.** Your Convoso API auth token. |
| `baseUrl` | `string` | `https://api.convoso.com/v1` | Base URL for all API requests. |
| `fetch` | `typeof globalThis.fetch` | `globalThis.fetch` | Custom fetch implementation. |
| `maxRetries` | `number` | `0` | Max retry attempts for retryable errors. |
| `onRequest` | `RequestHook` | — | Hook called before each request. |
| `onResponse` | `ResponseHook` | — | Hook called after each successful response. |

## Auth Token

The only required option. The SDK injects `auth_token` into every request body automatically — it never appears in method parameters.

```typescript
const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
});
```

## Custom Base URL

Override the default API base URL. Useful for proxies, staging environments, or mocking:

```typescript
const client = new Convoso({
  authToken: '...',
  baseUrl: 'https://my-proxy.example.com/convoso/v1',
});
```

## Custom Fetch

Inject a custom `fetch` implementation for proxying, testing, or environments without native fetch:

```typescript
import { Convoso } from 'convoso-js';

// Use undici for custom agent/proxy support
import { fetch } from 'undici';

const client = new Convoso({
  authToken: '...',
  fetch: fetch as typeof globalThis.fetch,
});
```

For testing, you can inject a mock fetch:

```typescript
const mockFetch = async (url: string, init?: RequestInit) => {
  return new Response(JSON.stringify({ success: true, results: [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

const client = new Convoso({
  authToken: 'test-token',
  fetch: mockFetch as typeof globalThis.fetch,
});
```

## Retry & Hooks

See [Retry & Hooks](/guide/retry-and-hooks) for detailed documentation on `maxRetries`, `onRequest`, and `onResponse`.
