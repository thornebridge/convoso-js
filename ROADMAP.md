# Roadmap

This document outlines the planned direction for convoso-js. Priorities may shift based on community feedback.

## v0.2.0

- [ ] **Rate limit awareness** — expose rate limit headers via hooks or metadata
- [ ] **Request timeout** — configurable per-request and global timeout with `AbortController`
- [ ] **Debug mode** — opt-in verbose logging for troubleshooting
- [ ] **Batch helpers** — utilities for bulk lead import with concurrency control

## v0.3.0

- [ ] **Webhook types** — TypeScript types for Convoso webhook payloads
- [ ] **Event emitter** — optional event-based interface alongside hooks
- [ ] **Response caching** — opt-in caching layer for idempotent reads

## Future

- [ ] **Additional API coverage** — new Convoso endpoints as they become available
- [ ] **Deno / Bun first-class testing** — CI matrix expansion
- [ ] **OpenAPI spec generation** — auto-generate types from API schema if Convoso publishes one

## Contributing

Have a feature request? [Open an issue](https://github.com/thornebridge/convoso-js/issues) to discuss it. PRs are welcome for any roadmap item.
