import type { ConnectPayload } from './types/connect.js';

/**
 * Parse and type-narrow a raw Convoso Connect webhook payload.
 *
 * Accepts the parsed body from an incoming webhook request and returns
 * it typed as {@link ConnectPayload}. Performs basic structural validation
 * (the input must be a non-null object).
 *
 * This function provides **type narrowing**, not full schema validation.
 * Field presence depends entirely on the Adaptor configuration in Convoso —
 * only mapped fields appear in the payload.
 *
 * @param body - The parsed request body (e.g. `req.body`).
 * @returns The payload typed as {@link ConnectPayload}.
 * @throws {TypeError} If `body` is not a non-null object.
 *
 * @example
 * ```typescript
 * import { parseConnectPayload } from 'convoso-js';
 *
 * // Express
 * app.post('/webhook', (req, res) => {
 *   const payload = parseConnectPayload(req.body);
 *   console.log(payload.phone_number, payload.status);
 *   res.sendStatus(200);
 * });
 *
 * // Hono
 * app.post('/webhook', async (c) => {
 *   const payload = parseConnectPayload(await c.req.json());
 *   console.log(payload.first_name, payload.call_log_id);
 *   return c.text('ok');
 * });
 * ```
 */
export function parseConnectPayload(body: unknown): ConnectPayload {
  if (body === null || body === undefined || typeof body !== 'object' || Array.isArray(body)) {
    throw new TypeError(
      `Expected a non-null object for Connect payload, got ${body === null ? 'null' : typeof body}`,
    );
  }
  return body as ConnectPayload;
}
