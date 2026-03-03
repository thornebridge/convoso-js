# Contributing to convoso-js

Thanks for your interest in contributing to the unofficial Convoso TypeScript SDK.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
git clone https://github.com/thornebridge/convoso-js.git
cd convoso-js
npm install
```

## Development

```bash
npm run typecheck    # tsc --noEmit
npm run build        # tsup → dist/
npm test             # vitest run
npm run test:watch   # vitest (watch mode)
npm run coverage     # vitest with coverage report
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier (write)
npm run format:check # Prettier (check only)
```

## Architecture

```
src/
├── client.ts           # Convoso class — composes all resources
├── http.ts             # HttpClient — fetch wrapper with auth, retry, hooks
├── errors.ts           # ConvosoError → ConvosoApiError / ConvosoHttpError
├── error-codes.ts      # CONVOSO_ERROR_CODES map + getErrorDescription
├── resources/
│   ├── base.ts         # BaseResource — holds HttpClient ref
│   └── *.ts            # One resource class per API section (16 total)
└── types/
    ├── common.ts       # Shared types (Recording, PaginatedParams, PageOptions)
    └── *.ts            # Per-resource param/response types
```

## Conventions

- All API endpoints are POST with `application/x-www-form-urlencoded` bodies
- `auth_token` is injected by HttpClient — never appears in resource method params
- `undefined`/`null` params are stripped before encoding
- Response shapes match the raw API exactly (no normalization)
- Zero runtime dependencies — uses native fetch (Node 18+)
- Paginated resources expose `*All()` async generator methods
- Every type field has a JSDoc comment

## Adding a new resource

1. Create `src/types/my-resource.ts` with param/response interfaces (JSDoc every field)
2. Create `src/resources/my-resource.ts` extending `BaseResource`
3. Add the resource to `src/client.ts`
4. Export types from `src/types/index.ts`
5. Add tests in `tests/resources/my-resource.test.ts`
6. If the endpoint is paginated, add a `*All()` method

## Pull requests

1. Fork the repo and create a feature branch
2. Make your changes
3. Ensure all checks pass:
   ```bash
   npm run lint
   npm run format:check
   npm run typecheck
   npm run build
   npm test
   ```
4. Submit a PR against `main`
