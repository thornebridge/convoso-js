# convoso-js

Unofficial TypeScript SDK for the Convoso API. Zero runtime dependencies, native fetch (Node 18+).

## Build & Test

```bash
npm run typecheck    # tsc --noEmit
npm run build        # tsup → dist/ (ESM + CJS + .d.ts)
npm test             # vitest run
npm run docs:dev     # VitePress dev server
npm run docs:build   # Build docs site
```

## Architecture

- `src/client.ts` — `Convoso` class composes all 16 resources
- `src/http.ts` — `HttpClient` wraps fetch, injects auth_token, retry + backoff, hooks
- `src/errors.ts` — `ConvosoError` → `ConvosoApiError` / `ConvosoHttpError`
- `src/error-codes.ts` — 44 known Convoso error codes with descriptions
- `src/resources/base.ts` — `BaseResource` holds HttpClient ref
- `src/resources/*.ts` — 16 resource classes, one per API section
- `src/types/*.ts` — Per-resource param/response types with JSDoc
- `docs/` — 17 API reference markdown files (source of truth)
- `docs-site/` — VitePress documentation site (built from docs/ + guide pages)

## Conventions

- All API endpoints are POST with `application/x-www-form-urlencoded` bodies
- `auth_token` is injected by HttpClient — never in resource method params
- `undefined`/`null` params are stripped before encoding
- Response shapes match the raw API exactly (no normalization)
- Resources with pagination have `*All()` async generator methods
- Every type field has JSDoc documentation

## Quick Reference — All Resources & Methods

```
client.leads            search() searchAll() insert() update() delete() getRecordings() getRecordingsAll()
client.lists            search() insert() update() delete()
client.dnc              search() searchAll() insert() update() delete()
client.callbacks        search() searchAll() insert() update() delete()
client.callLogs         retrieve() retrieveAll() update()
client.campaigns        search() status()
client.agentMonitor     search() logout()
client.agentPerformance search()
client.agentProductivity search()
client.status           search() insert() update()
client.revenue          update()
client.users            search() recordings()
client.userActivity     search()
client.leadPost         insert()
client.leadValidation   search()
client.smsOptOut        search() searchAll() insert() update()
```

## Paginated Resources

These have `*All()` methods returning `AsyncGenerator<T>`:

| Method | Yields | API Path |
|--------|--------|----------|
| `leads.searchAll()` | `LeadRecord` | `/leads/search` |
| `leads.getRecordingsAll()` | Recording entry | `/leads/get-recordings` |
| `callbacks.searchAll()` | `CallbackRecord` | `/callbacks/search` |
| `callLogs.retrieveAll()` | `CallLogRecord` | `/log/retrieve` |
| `dnc.searchAll()` | `DncRecord` | `/dnc/search` |
| `smsOptOut.searchAll()` | `SmsOptOutRecord` | `/sms-opt-out/search` |

## Error Handling Pattern

```typescript
import { ConvosoApiError, ConvosoHttpError } from 'convoso-js';

try {
  await client.leads.insert({ list_id: '333', phone_number: '5551234567' });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    // success: false — use err.code, err.message, err.description, err.body
  } else if (err instanceof ConvosoHttpError) {
    // Non-2xx — use err.status, err.statusText, err.body
  }
}
```

## Adding a New Resource

1. Create `src/types/new-resource.ts` with param/response interfaces
2. Export from `src/types/index.ts`
3. Create `src/resources/new-resource.ts` extending `BaseResource`
4. Add to `Convoso` class in `src/client.ts`
5. Add API reference docs in `docs/new-resource.md` with YAML frontmatter
6. Add to sidebar in `docs-site/.vitepress/config.ts`
