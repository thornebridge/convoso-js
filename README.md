<p align="center">
  <img src="docs-site/public/convoso-logo.svg" alt="Convoso" width="200" />
</p>

<h1 align="center">convoso-js</h1>

<p align="center">
  <strong>The unofficial TypeScript SDK for the Convoso API</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/convoso-js"><img src="https://img.shields.io/npm/v/convoso-js?color=7856ff&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/convoso-js"><img src="https://img.shields.io/npm/dm/convoso-js?color=7856ff&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/thornebridge/convoso-js/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/thornebridge/convoso-js/ci.yml?color=7856ff&label=CI" alt="CI" /></a>
  <a href="https://github.com/thornebridge/convoso-js/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/convoso-js?color=7856ff" alt="License" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-strict-7856ff" alt="TypeScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18%2B-7856ff" alt="Node.js" /></a>
  <a href="https://pkg-size.dev/convoso-js"><img src="https://img.shields.io/badge/bundle-~3kB_gzip-7856ff" alt="Bundle size" /></a>
</p>

<p align="center">
  <a href="https://thornebridge.github.io/convoso-js/">Documentation</a> &nbsp;&bull;&nbsp;
  <a href="https://thornebridge.github.io/convoso-js/guide/getting-started">Getting Started</a> &nbsp;&bull;&nbsp;
  <a href="https://thornebridge.github.io/convoso-js/api-reference/">API Reference</a> &nbsp;&bull;&nbsp;
  <a href="https://github.com/thornebridge/convoso-js/releases">Changelog</a>
</p>

<br />

> **Community project** — not affiliated with or endorsed by [Convoso](https://www.convoso.com/).

<br />

## Highlights

<table>
<tr>
<td width="50%">

**Zero dependencies**
Uses native `fetch` — no bloated dependency tree. ~3 kB gzipped.

</td>
<td width="50%">

**Fully typed**
Every parameter and response has TypeScript types with JSDoc. Autocomplete everywhere.

</td>
</tr>
<tr>
<td width="50%">

**Auto-pagination**
Async generators iterate through all results. No manual offset management.

</td>
<td width="50%">

**Automatic retry**
Exponential backoff with jitter for 429/5xx. Respects `Retry-After` headers.

</td>
</tr>
<tr>
<td width="50%">

**Request & response hooks**
Plug in logging, metrics, or middleware with `onRequest` / `onResponse`.

</td>
<td width="50%">

**37 endpoints, 16 resources**
Complete API coverage — agents, leads, DNC, campaigns, call logs, and more.

</td>
</tr>
</table>

<br />

## Install

```bash
npm install convoso-js
```

> Requires **Node.js 18+** (native `fetch`). Works with Bun and Deno out of the box.

## Quick Start

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
});

// Search leads
const { results } = await client.leads.search({ list_id: '333', limit: 100 });

// Insert a lead
await client.leads.insert({
  list_id: '333',
  phone_number: '5551234567',
  first_name: 'John',
  last_name: 'Doe',
});

// Iterate all DNC entries with auto-pagination
for await (const entry of client.dnc.searchAll({ campaign_id: '500' })) {
  console.log(entry.phone_number);
}

// Monitor agents in real time
const monitor = await client.agentMonitor.search({ campaign_id: '111' });
console.log(`${monitor.agents_ready} agents ready`);
```

## Configuration

```typescript
const client = new Convoso({
  authToken: 'your-api-token',       // Required — injected into every request
  baseUrl: 'https://...',            // Default: https://api.convoso.com/v1
  fetch: customFetch,                // Custom fetch implementation (proxies, testing)
  maxRetries: 3,                     // Retry 429/5xx with exponential backoff + jitter
  onRequest(path, params) {          // Hook before each request (path: string, params: URLSearchParams)
    console.log(`→ ${path}`);
  },
  onResponse(path, response, data) { // Hook after each response (path: string, response: Response, data: unknown)
    console.log(`← ${path} ${response.status}`);
  },
});
```

## Resources

All 37 Convoso API endpoints, organized into 16 typed resources:

#### Agent APIs

| Resource | Methods | Paginated |
|---|---|:---:|
| `client.agentMonitor` | `search()` `logout()` | |
| `client.agentPerformance` | `search()` | |
| `client.agentProductivity` | `search()` | |

#### Lead Management

| Resource | Methods | Paginated |
|---|---|:---:|
| `client.leads` | `search()` `insert()` `update()` `delete()` `getRecordings()` | `searchAll()` `getRecordingsAll()` |
| `client.leadPost` | `insert()` | |
| `client.leadValidation` | `search()` | |
| `client.lists` | `search()` `insert()` `update()` `delete()` | |

#### Call Operations

| Resource | Methods | Paginated |
|---|---|:---:|
| `client.callbacks` | `search()` `insert()` `update()` `delete()` | `searchAll()` |
| `client.callLogs` | `retrieve()` `update()` | `retrieveAll()` |
| `client.campaigns` | `search()` `status()` | |

#### Compliance

| Resource | Methods | Paginated |
|---|---|:---:|
| `client.dnc` | `search()` `insert()` `update()` `delete()` | `searchAll()` |
| `client.smsOptOut` | `search()` `insert()` `update()` | `searchAll()` |

#### Other

| Resource | Methods | Paginated |
|---|---|:---:|
| `client.status` | `search()` `insert()` `update()` | |
| `client.revenue` | `update()` | |
| `client.users` | `search()` `recordings()` | |
| `client.userActivity` | `search()` | |

## Auto-Pagination

Resources with paginated endpoints expose `*All()` async generators:

```typescript
// Iterate through every lead — pagination handled automatically
for await (const lead of client.leads.searchAll({ list_id: '333', pageSize: 200 })) {
  console.log(lead.first_name, lead.phone_number);
}

// Early termination — stops fetching after you break
let count = 0;
for await (const entry of client.dnc.searchAll({ campaign_id: '500' })) {
  if (++count >= 50) break;
}
```

Six paginated methods available: `leads.searchAll()`, `leads.getRecordingsAll()`, `callbacks.searchAll()`, `callLogs.retrieveAll()`, `dnc.searchAll()`, `smsOptOut.searchAll()`.

## Error Handling

Two typed error classes for distinct failure modes, plus a built-in lookup for 44 Convoso error codes:

```typescript
import { ConvosoApiError, ConvosoHttpError, getErrorDescription } from 'convoso-js';

try {
  await client.leads.insert({ list_id: '999', phone_number: '5551234567' });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    // API returned { success: false } with a Convoso error code
    console.error(`Code ${err.code}: ${err.description}`);
    //=> "Code 6002: No such list"
  } else if (err instanceof ConvosoHttpError) {
    // Non-2xx HTTP status (server error, rate limit, etc.)
    console.error(`HTTP ${err.status}: ${err.statusText}`);
  }
}

// Standalone error code lookup
getErrorDescription(6002); //=> "No such list"
```

## Exports

Everything you need is exported from the top-level package:

```typescript
// Client
import { Convoso } from 'convoso-js';
import type { ConvosoOptions } from 'convoso-js';

// Errors
import { ConvosoError, ConvosoApiError, ConvosoHttpError } from 'convoso-js';
import { CONVOSO_ERROR_CODES, getErrorDescription } from 'convoso-js';
import type { ConvosoErrorCode } from 'convoso-js';

// Request/response types (every resource has its own)
import type { LeadSearchParams, LeadSearchResponse, LeadRecord } from 'convoso-js';
import type { DncInsertParams, CallLogRetrieveParams } from 'convoso-js';
// ... and all other resource types
```

## Documentation

Full documentation at **[thornebridge.github.io/convoso-js](https://thornebridge.github.io/convoso-js/)**:

- [Getting Started](https://thornebridge.github.io/convoso-js/guide/getting-started) — Install, first API call, resource overview
- [Configuration](https://thornebridge.github.io/convoso-js/guide/configuration) — All client options explained
- [Error Handling](https://thornebridge.github.io/convoso-js/guide/error-handling) — Error classes + full error code table
- [Retry & Hooks](https://thornebridge.github.io/convoso-js/guide/retry-and-hooks) — Backoff, Retry-After, middleware
- [Auto-Pagination](https://thornebridge.github.io/convoso-js/guide/pagination) — Async generators for bulk operations
- [API Reference](https://thornebridge.github.io/convoso-js/api-reference/) — Complete endpoint documentation

## Design Decisions

- **No response normalization** — API responses are returned exactly as Convoso sends them
- **`auth_token` injected automatically** — never appears in method parameters
- **Null/undefined stripping** — cleaned from params before URL encoding
- **Dual format** — ships ESM + CJS with full `.d.ts` type declarations

## Contributing

```bash
git clone https://github.com/thornebridge/convoso-js.git
cd convoso-js
npm install
npm run typecheck       # tsc --noEmit
npm run build           # tsup → ESM + CJS + .d.ts
npm test                # vitest (69 tests)
npm run docs:dev        # VitePress dev server
```

Contributions welcome — please open an issue first to discuss larger changes.

## License

[MIT](LICENSE)

<br />

<p align="center">
  Built by <a href="https://github.com/thornebridge">Thornebridge</a>
</p>
