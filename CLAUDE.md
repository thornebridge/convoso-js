# convoso-js

Unofficial TypeScript SDK for the Convoso API.

## Build & Test

```bash
npm run typecheck    # tsc --noEmit
npm run build        # tsup → dist/
npm test             # vitest run
```

## Architecture

- `src/http.ts` — HttpClient wraps fetch, injects auth_token, detects errors
- `src/errors.ts` — ConvosoError → ConvosoApiError / ConvosoHttpError
- `src/resources/base.ts` — BaseResource holds HttpClient ref
- `src/resources/*.ts` — 16 resource classes, one per API section
- `src/client.ts` — Convoso class composes all resources
- `src/types/*.ts` — Per-resource param/response types, no normalization

## Conventions

- All API endpoints are POST with `application/x-www-form-urlencoded` bodies
- `auth_token` is injected by HttpClient, never appears in resource method params
- `undefined`/`null` params are stripped before encoding
- Response shapes match the raw API exactly (no normalization)
- Zero runtime dependencies — uses native fetch (Node 18+)
