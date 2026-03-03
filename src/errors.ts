import { getErrorDescription } from './error-codes.js';

export class ConvosoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConvosoError';
  }
}

export class ConvosoApiError extends ConvosoError {
  readonly code: number;
  readonly body: unknown;

  constructor(message: string, code: number, body: unknown) {
    super(message);
    this.name = 'ConvosoApiError';
    this.code = code;
    this.body = body;
  }

  /** Look up a human-readable description for this error code from the known Convoso error code map. */
  get description(): string | undefined {
    return getErrorDescription(this.code);
  }
}

export class ConvosoTimeoutError extends ConvosoError {
  readonly timeout: number;

  constructor(timeout: number) {
    super(`Request timed out after ${timeout}ms`);
    this.name = 'ConvosoTimeoutError';
    this.timeout = timeout;
  }
}

export class ConvosoHttpError extends ConvosoError {
  readonly status: number;
  readonly statusText: string;
  readonly body: string;

  constructor(status: number, statusText: string, body: string) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'ConvosoHttpError';
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}
