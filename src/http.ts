import { ConvosoApiError, ConvosoHttpError } from './errors.js';

export type RequestHook = (path: string, params: URLSearchParams) => void | Promise<void>;
export type ResponseHook = (path: string, response: Response, data: unknown) => void | Promise<void>;

export interface HttpClientOptions {
  authToken: string;
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
  maxRetries?: number;
  onRequest?: RequestHook;
  onResponse?: ResponseHook;
}

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
const MAX_BACKOFF_MS = 30_000;
const JITTER_MAX_MS = 1_000;

export class HttpClient {
  private readonly authToken: string;
  private readonly baseUrl: string;
  private readonly fetch: typeof globalThis.fetch;
  private readonly maxRetries: number;
  private readonly onRequest?: RequestHook;
  private readonly onResponse?: ResponseHook;

  constructor(options: HttpClientOptions) {
    this.authToken = options.authToken;
    this.baseUrl = options.baseUrl ?? 'https://api.convoso.com/v1';
    this.fetch = options.fetch ?? globalThis.fetch;
    this.maxRetries = options.maxRetries ?? 0;
    this.onRequest = options.onRequest;
    this.onResponse = options.onResponse;
  }

  async post<T>(path: string, params: object = {}): Promise<T> {
    const body = new URLSearchParams();
    body.set('auth_token', this.authToken);

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      body.set(key, String(value));
    }

    if (this.onRequest) {
      await this.onRequest(path, body);
    }

    let lastError: unknown;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      if (attempt > 0) {
        await this.sleep(this.getBackoffMs(attempt, lastError));
      }

      const response = await this.fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        if (attempt < this.maxRetries && RETRYABLE_STATUS_CODES.has(response.status)) {
          lastError = response;
          continue;
        }
        const text = await response.text();
        throw new ConvosoHttpError(response.status, response.statusText, text);
      }

      const data = await response.json() as Record<string, unknown>;

      if (this.onResponse) {
        await this.onResponse(path, response, data);
      }

      if (data.success === false) {
        const code = typeof data.code === 'number' ? data.code : 0;
        const message = typeof data.message === 'string'
          ? data.message
          : typeof data.error === 'string'
            ? data.error
            : 'API request failed';
        throw new ConvosoApiError(message, code, data);
      }

      return data as T;
    }

    // Should never reach here, but TypeScript needs it
    throw lastError;
  }

  private getBackoffMs(attempt: number, lastError: unknown): number {
    // Check for Retry-After header on 429 responses
    if (lastError instanceof Response) {
      const retryAfter = lastError.headers.get('retry-after');
      if (retryAfter) {
        const seconds = Number(retryAfter);
        if (!Number.isNaN(seconds) && seconds > 0) {
          return seconds * 1000;
        }
      }
    }

    const exponential = Math.min(1000 * Math.pow(2, attempt - 1), MAX_BACKOFF_MS);
    const jitter = Math.random() * JITTER_MAX_MS;
    return exponential + jitter;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
