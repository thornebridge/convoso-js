import { ConvosoApiError, ConvosoHttpError } from './errors.js';

export interface HttpClientOptions {
  authToken: string;
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
}

export class HttpClient {
  private readonly authToken: string;
  private readonly baseUrl: string;
  private readonly fetch: typeof globalThis.fetch;

  constructor(options: HttpClientOptions) {
    this.authToken = options.authToken;
    this.baseUrl = options.baseUrl ?? 'https://api.convoso.com/v1';
    this.fetch = options.fetch ?? globalThis.fetch;
  }

  async post<T>(path: string, params: object = {}): Promise<T> {
    const body = new URLSearchParams();
    body.set('auth_token', this.authToken);

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      body.set(key, String(value));
    }

    const response = await this.fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ConvosoHttpError(response.status, response.statusText, text);
    }

    const data = await response.json() as Record<string, unknown>;

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
}
