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
