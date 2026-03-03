# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2025-06-01

### Added

- `Convoso` client class composing all 16 resources
- `HttpClient` with automatic `auth_token` injection
- Exponential backoff retry with jitter for 429/5xx responses
- `Retry-After` header support
- Request/response hooks (`onRequest`, `onResponse`)
- 37 typed API methods across 16 resources:
  - Leads, Lists, DNC, Callbacks, Call Logs, Campaigns
  - Agent Monitor, Agent Performance, Agent Productivity
  - Status, Revenue, Users, User Activity
  - Lead Post, Lead Validation, SMS Opt-Out
- Async generator `*All()` methods for paginated endpoints
- `ConvosoApiError` and `ConvosoHttpError` typed error classes
- 44 known Convoso error codes with `getErrorDescription()`
- Full TypeScript types with JSDoc on every field
- ESM + CJS dual-format distribution with `.d.ts` declarations
- VitePress documentation site with API reference and guides
- CI workflow (Node 18, 20, 22)
- Automated npm publishing with OIDC trusted publisher and provenance
- GitHub Pages docs deployment

[0.1.0]: https://github.com/thornebridge/convoso-js/releases/tag/v0.1.0
