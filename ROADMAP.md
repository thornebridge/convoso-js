# Roadmap

This document outlines the planned direction for convoso-js. Priorities may shift based on community feedback.

## v0.2.0

- [x] **Rate limit awareness** — `parseRateLimitHeaders()` for use in `onResponse` hooks
- [x] **Request timeout** — configurable `timeout` option with `AbortController`
- [ ] **Debug mode** — opt-in verbose logging for troubleshooting
- [x] **Batch helpers** — `batch()` function with concurrency control

## v0.3.0

- [x] **Webhook types** — `ConnectPayload`, `ConnectLeadFields`, `ConnectCallLogFields`, `ConnectExtraFields` interfaces + `parseConnectPayload()` utility + `CONNECT_WORKFLOW_EVENTS` / `CONNECT_WORKFLOW_ACTIONS` const maps
- [ ] **Event emitter** — optional event-based interface alongside hooks
- [ ] **Response caching** — opt-in caching layer for idempotent reads

## Future

- [ ] **Additional API coverage** — new Convoso endpoints as they become available
- [ ] **Deno / Bun first-class testing** — CI matrix expansion
- [ ] **OpenAPI spec generation** — auto-generate types from API schema if Convoso publishes one

## Contributing

Have a feature request? [Open an issue](https://github.com/thornebridge/convoso-js/issues) to discuss it. PRs are welcome for any roadmap item.
