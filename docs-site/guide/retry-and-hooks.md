---
title: Retry & Hooks
description: Automatic retry with exponential backoff, Retry-After support, and onRequest/onResponse hooks for logging and middleware.
---

# Retry & Hooks

The SDK includes built-in retry logic with exponential backoff and request/response hooks for logging and middleware.

## Automatic Retry

Enable retries by setting `maxRetries` in the constructor:

```typescript
const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
  maxRetries: 3, // Retry up to 3 times (4 total attempts)
});
```

### Retryable Status Codes

Only specific HTTP status codes trigger a retry:

| Status | Meaning |
|---|---|
| `429` | Too Many Requests (rate limited) |
| `500` | Internal Server Error |
| `502` | Bad Gateway |
| `503` | Service Unavailable |
| `504` | Gateway Timeout |

All other errors (including `ConvosoApiError` from `success: false` responses) are thrown immediately without retry.

### Backoff Formula

Retries use exponential backoff with random jitter:

```
delay = min(1000ms * 2^(attempt-1), 30000ms) + random(0-1000ms)
```

| Attempt | Base Delay | With Jitter |
|---|---|---|
| 1st retry | 1,000 ms | 1,000 – 2,000 ms |
| 2nd retry | 2,000 ms | 2,000 – 3,000 ms |
| 3rd retry | 4,000 ms | 4,000 – 5,000 ms |
| 4th retry | 8,000 ms | 8,000 – 9,000 ms |
| ... | ... | max 30,000 ms + jitter |

### Retry-After Header

For `429` responses, the SDK checks the `Retry-After` header. If present with a valid number of seconds, that value is used instead of the calculated backoff:

```
429 with Retry-After: 5  →  waits 5,000 ms (ignores backoff formula)
429 without Retry-After  →  uses exponential backoff
```

## Request Hooks

The `onRequest` hook is called before each request is sent. It receives the API path and the `URLSearchParams` body (including the injected `auth_token`).

```typescript
type RequestHook = (path: string, params: URLSearchParams) => void | Promise<void>;
```

### Logging Example

```typescript
const client = new Convoso({
  authToken: '...',
  onRequest: (path, params) => {
    console.log(`-> POST ${path}`);
  },
});
```

### Metrics Example

```typescript
const requestCounts = new Map<string, number>();

const client = new Convoso({
  authToken: '...',
  onRequest: (path) => {
    requestCounts.set(path, (requestCounts.get(path) ?? 0) + 1);
  },
});
```

::: warning
The `params` object contains the `auth_token`. Be careful not to log it in production.
:::

## Response Hooks

The `onResponse` hook is called after a successful response is received and parsed. It receives the path, the raw `Response` object, and the parsed JSON data.

```typescript
type ResponseHook = (
  path: string,
  response: Response,
  data: unknown,
) => void | Promise<void>;
```

### Logging Example

```typescript
const client = new Convoso({
  authToken: '...',
  onResponse: (path, _res, data) => {
    console.log(`<- ${path}`, JSON.stringify(data).slice(0, 120));
  },
});
```

### Timing Example

```typescript
const requestTimings: Record<string, number> = {};

const client = new Convoso({
  authToken: '...',
  onRequest: (path) => {
    requestTimings[path] = Date.now();
  },
  onResponse: (path) => {
    const start = requestTimings[path];
    if (start) {
      console.log(`${path}: ${Date.now() - start}ms`);
      delete requestTimings[path];
    }
  },
});
```

## Combining Retry and Hooks

Hooks fire on every attempt, including retries. This makes them useful for observability:

```typescript
const client = new Convoso({
  authToken: '...',
  maxRetries: 3,
  onRequest: (path) => {
    console.log(`-> POST ${path}`);
  },
  onResponse: (path, _res, data) => {
    const d = data as Record<string, unknown>;
    if (d.success === false) {
      console.warn(`API error on ${path}: ${d.message}`);
    }
  },
});
```

::: info
The `onResponse` hook fires before the SDK checks for `success: false`. This means your hook sees all parsed responses — even ones that will throw a `ConvosoApiError`.
:::
