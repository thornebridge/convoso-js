import type { RateLimitInfo } from './types/common.js';

/**
 * Extract rate limit information from a Response's headers.
 *
 * Checks for standard `X-RateLimit-*` headers. Returns an object where
 * each field is `undefined` if the corresponding header is absent.
 *
 * Designed for use inside an `onResponse` hook:
 *
 * ```typescript
 * import { Convoso, parseRateLimitHeaders } from 'convoso-js';
 *
 * const client = new Convoso({
 *   authToken: 'token',
 *   onResponse: (_path, response) => {
 *     const info = parseRateLimitHeaders(response);
 *     if (info.remaining !== undefined && info.remaining < 10) {
 *       console.warn('Rate limit nearly exhausted:', info);
 *     }
 *   },
 * });
 * ```
 */
export function parseRateLimitHeaders(response: Response): RateLimitInfo {
  const parse = (name: string): number | undefined => {
    const value = response.headers.get(name);
    if (value === null || value === '') return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  };

  return {
    limit: parse('x-ratelimit-limit'),
    remaining: parse('x-ratelimit-remaining'),
    reset: parse('x-ratelimit-reset'),
  };
}
