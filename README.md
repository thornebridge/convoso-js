<p align="center">
  <img src="docs-site/public/convoso-logo.svg" alt="Convoso" width="220" />
</p>

<h1 align="center">convoso-js</h1>

<p align="center">
  <strong>The unofficial TypeScript SDK for the Convoso API</strong><br />
  <sub>Zero dependencies &middot; Fully typed &middot; Built for Node.js 18+</sub>
</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/convoso-js"><img src="https://img.shields.io/npm/v/convoso-js?style=flat-square&color=7856ff&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/convoso-js"><img src="https://img.shields.io/npm/dm/convoso-js?style=flat-square&color=7856ff&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/thornebridge/convoso-js/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/thornebridge/convoso-js/ci.yml?style=flat-square&color=7856ff&label=CI" alt="CI" /></a>
  <a href="https://github.com/thornebridge/convoso-js/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/convoso-js?style=flat-square&color=7856ff" alt="License" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-strict-7856ff?style=flat-square" alt="TypeScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18%2B-7856ff?style=flat-square" alt="Node.js" /></a>
  <a href="https://pkg-size.dev/convoso-js"><img src="https://img.shields.io/badge/bundle-~3kB_gzip-7856ff?style=flat-square" alt="Bundle size" /></a>
  <a href="https://github.com/thornebridge/convoso-js/actions/workflows/ci.yml"><img src="https://img.shields.io/badge/coverage-99%25-7856ff?style=flat-square" alt="Coverage" /></a>
</p>

<p align="center">
  <a href="https://thornebridge.github.io/convoso-js/">Documentation</a> &nbsp;&middot;&nbsp;
  <a href="https://thornebridge.github.io/convoso-js/guide/getting-started">Getting Started</a> &nbsp;&middot;&nbsp;
  <a href="https://thornebridge.github.io/convoso-js/api-reference/">API Reference</a> &nbsp;&middot;&nbsp;
  <a href="https://github.com/thornebridge/convoso-js/releases">Changelog</a>
</p>

<br />

> **Community project** — not affiliated with or endorsed by [Convoso](https://www.convoso.com/).

<br />

---

<br />

## Why convoso-js?

Building on the Convoso API means wrestling with URL-encoded POST endpoints, manual pagination offsets, and undocumented error codes. **convoso-js** wraps all of that into a clean, typed interface so you can focus on your integration — not the plumbing.

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({ authToken: process.env.CONVOSO_TOKEN! });

// That's it. Start making calls.
const { results } = await client.leads.search({ list_id: '333' });
```

<br />

## Feature Overview

<table>
<tr>
<td width="50%" valign="top">

### Zero Dependencies
Uses native `fetch` — no bloated dependency tree. Ships at **~3 kB gzipped**. Nothing to audit, nothing to conflict.

</td>
<td width="50%" valign="top">

### Fully Typed
Every parameter and response has strict TypeScript types with JSDoc documentation. Full autocomplete in any editor.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Auto-Pagination
Async generators iterate through all results across pages. No manual offset/limit management.

</td>
<td width="50%" valign="top">

### Smart Retry
Exponential backoff with jitter for `429` and `5xx` errors. Respects `Retry-After` headers automatically.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Request & Response Hooks
Plug in logging, metrics, or middleware with `onRequest` / `onResponse` callbacks. Async hooks are fully supported.

</td>
<td width="50%" valign="top">

### Complete Coverage
**37 endpoints** across **16 resources** — agents, leads, DNC, campaigns, call logs, SMS opt-out, and more.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Dual Format
Ships ESM + CJS with full `.d.ts` declarations and source maps. Works everywhere — Node.js, Bun, and Deno.

</td>
<td width="50%" valign="top">

### 44 Error Codes
Built-in lookup table for all known Convoso error codes with human-readable descriptions. No more guessing.

</td>
</tr>
</table>

<br />

---

<br />

## Install

```bash
npm install convoso-js
```

<details>
<summary><strong>Other package managers</strong></summary>

```bash
yarn add convoso-js
pnpm add convoso-js
bun add convoso-js
```

</details>

> Requires **Node.js 18+** (native `fetch`). Works with Bun and Deno out of the box.

<br />

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

<br />

---

<br />

## Configuration

Every option is optional except `authToken`:

```typescript
const client = new Convoso({
  // Required — your Convoso API token (injected into every request automatically)
  authToken: 'your-api-token',

  // Override the base URL (default: https://api.convoso.com/v1)
  baseUrl: 'https://api.convoso.com/v1',

  // Provide a custom fetch implementation (useful for proxies, testing, or polyfills)
  fetch: customFetch,

  // Retry 429/5xx responses with exponential backoff + jitter (default: 0 — no retries)
  maxRetries: 3,

  // Hook called before every request — great for logging or metrics
  onRequest(path, params) {
    console.log(`→ POST ${path}`);
  },

  // Hook called after every response — inspect status, body, or inject side effects
  onResponse(path, response, data) {
    console.log(`← ${path} ${response.status}`);
  },
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `authToken` | `string` | — | **Required.** API token injected into every request |
| `baseUrl` | `string` | `https://api.convoso.com/v1` | API base URL |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |
| `maxRetries` | `number` | `0` | Max retry attempts for 429/5xx responses |
| `onRequest` | `RequestHook` | — | Callback before each request |
| `onResponse` | `ResponseHook` | — | Callback after each response |

<br />

---

<br />

## Resources

All **37** Convoso API endpoints, organized into **16** typed resource classes:

### Agent APIs

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.agentMonitor` | `search()` `logout()` | |
| `client.agentPerformance` | `search()` | |
| `client.agentProductivity` | `search()` | |

### Lead Management

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.leads` | `search()` `insert()` `update()` `delete()` `getRecordings()` | `searchAll()` `getRecordingsAll()` |
| `client.leadPost` | `insert()` | |
| `client.leadValidation` | `search()` | |
| `client.lists` | `search()` `insert()` `update()` `delete()` | |

### Call Operations

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.callbacks` | `search()` `insert()` `update()` `delete()` | `searchAll()` |
| `client.callLogs` | `retrieve()` `update()` | `retrieveAll()` |
| `client.campaigns` | `search()` `status()` | |

### Compliance

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.dnc` | `search()` `insert()` `update()` `delete()` | `searchAll()` |
| `client.smsOptOut` | `search()` `insert()` `update()` | `searchAll()` |

### Other

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.status` | `search()` `insert()` `update()` | |
| `client.revenue` | `update()` | |
| `client.users` | `search()` `recordings()` | |
| `client.userActivity` | `search()` | |

<br />

---

<br />

## Auto-Pagination

Six endpoints support automatic pagination through async generators. Just iterate — the SDK handles offset management, page fetching, and termination for you.

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

// Collect into an array
const allCallbacks: CallbackRecord[] = [];
for await (const cb of client.callbacks.searchAll()) {
  allCallbacks.push(cb);
}
```

| Method | Yields | API Path |
|--------|--------|----------|
| `leads.searchAll()` | `LeadRecord` | `/leads/search` |
| `leads.getRecordingsAll()` | Recording entry | `/leads/get-recordings` |
| `callbacks.searchAll()` | `CallbackRecord` | `/callbacks/search` |
| `callLogs.retrieveAll()` | `CallLogRecord` | `/log/retrieve` |
| `dnc.searchAll()` | `DncRecord` | `/dnc/search` |
| `smsOptOut.searchAll()` | `SmsOptOutRecord` | `/sms-opt-out/search` |

<br />

---

<br />

## Retry Logic

Enable automatic retries for transient failures with exponential backoff and jitter:

```typescript
const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
  maxRetries: 3,
});
```

**How it works:**

- Retries on status codes: `429`, `500`, `502`, `503`, `504`
- Backoff formula: `min(1000ms × 2^attempt, 30s) + random jitter (0–1s)`
- Respects `Retry-After` headers from `429` responses (overrides exponential delay)
- Non-retryable errors (4xx) are thrown immediately

<br />

---

<br />

## Request & Response Hooks

Hooks let you observe or log every API call without modifying resource code. Both sync and async hooks are supported.

```typescript
const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,

  // Log every outbound request
  onRequest(path, params) {
    console.log(`→ POST ${path}`, Object.fromEntries(params));
  },

  // Track response times and status codes
  async onResponse(path, response, data) {
    await metrics.record({
      endpoint: path,
      status: response.status,
      timestamp: Date.now(),
    });
  },
});
```

<br />

---

<br />

## Error Handling

Two typed error classes for distinct failure modes, plus a built-in lookup for **44 Convoso error codes**:

```typescript
import { ConvosoApiError, ConvosoHttpError, getErrorDescription } from 'convoso-js';

try {
  await client.leads.insert({ list_id: '999', phone_number: '5551234567' });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    // Convoso returned { success: false } with an error code
    console.error(`Code ${err.code}: ${err.description}`);
    //=> "Code 6002: No such list"
  } else if (err instanceof ConvosoHttpError) {
    // Non-2xx HTTP status (server error, network issue, etc.)
    console.error(`HTTP ${err.status}: ${err.statusText}`);
  }
}

// Standalone error code lookup
getErrorDescription(6002); //=> "No such list"
```

### Error Class Hierarchy

```
ConvosoError (base)
├── ConvosoApiError    — API returned success: false
│   ├── .code          — Numeric error code (e.g. 6002)
│   ├── .message       — Error message from API
│   ├── .description   — Human-readable description from built-in lookup
│   └── .body          — Full raw response body
└── ConvosoHttpError   — Non-2xx HTTP response
    ├── .status        — HTTP status code (e.g. 500)
    ├── .statusText    — HTTP status text
    └── .body          — Raw response body
```

<br />

---

<br />

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

// Request/response types (every resource has full type coverage)
import type { LeadSearchParams, LeadSearchResponse, LeadRecord } from 'convoso-js';
import type { DncInsertParams, CallbackSearchParams, CallLogRetrieveParams } from 'convoso-js';
// ... and every other resource type
```

<br />

---

<br />

## Architecture

```
convoso-js/
├── src/
│   ├── client.ts              Convoso class — composes all 16 resources
│   ├── http.ts                HttpClient — fetch wrapper, auth injection, retry, hooks
│   ├── errors.ts              ConvosoError → ConvosoApiError / ConvosoHttpError
│   ├── error-codes.ts         44 known Convoso error codes with descriptions
│   ├── index.ts               Public API barrel export
│   ├── resources/
│   │   ├── base.ts            BaseResource — holds HttpClient reference
│   │   ├── leads.ts           LeadsResource (search, insert, update, delete, recordings)
│   │   ├── lists.ts           ListsResource (search, insert, update, delete)
│   │   ├── dnc.ts             DncResource (search, insert, update, delete)
│   │   ├── callbacks.ts       CallbacksResource (search, insert, update, delete)
│   │   ├── call-logs.ts       CallLogsResource (retrieve, update)
│   │   ├── campaigns.ts       CampaignsResource (search, status)
│   │   ├── agent-monitor.ts   AgentMonitorResource (search, logout)
│   │   ├── agent-*.ts         AgentPerformance, AgentProductivity
│   │   ├── status.ts          StatusResource (search, insert, update)
│   │   ├── revenue.ts         RevenueResource (update)
│   │   ├── users.ts           UsersResource (search, recordings)
│   │   ├── user-activity.ts   UserActivityResource (search)
│   │   ├── lead-post.ts       LeadPostResource (insert)
│   │   ├── lead-validation.ts LeadValidationResource (search)
│   │   └── sms-opt-out.ts     SmsOptOutResource (search, insert, update)
│   └── types/                 Per-resource param/response interfaces with JSDoc
├── tests/                     69 tests, 99% coverage (vitest + v8)
├── examples/                  3 runnable integration examples
├── docs/                      17 API reference markdown files (source of truth)
└── docs-site/                 VitePress documentation site
```

### Design Decisions

- **No response normalization** — responses are returned exactly as Convoso sends them
- **`auth_token` injected automatically** — never appears in method parameters
- **Null/undefined stripping** — cleaned from params before URL encoding
- **Dual format** — ESM + CJS with full `.d.ts` type declarations and source maps
- **All POST** — every Convoso endpoint uses POST with `application/x-www-form-urlencoded`

<br />

---

<br />

## Documentation

Full documentation at **[thornebridge.github.io/convoso-js](https://thornebridge.github.io/convoso-js/)**:

| Guide | Description |
|-------|-------------|
| [Getting Started](https://thornebridge.github.io/convoso-js/guide/getting-started) | Install, first API call, resource overview |
| [Configuration](https://thornebridge.github.io/convoso-js/guide/configuration) | All client options explained |
| [Error Handling](https://thornebridge.github.io/convoso-js/guide/error-handling) | Error classes + full 44-code reference table |
| [Retry & Hooks](https://thornebridge.github.io/convoso-js/guide/retry-and-hooks) | Backoff strategy, Retry-After, middleware patterns |
| [Auto-Pagination](https://thornebridge.github.io/convoso-js/guide/pagination) | Async generators for bulk data operations |
| [Examples](https://thornebridge.github.io/convoso-js/guide/examples) | Lead import, agent dashboard, DNC sync |
| [API Reference](https://thornebridge.github.io/convoso-js/api-reference/) | Complete endpoint documentation (17 pages) |

<br />

---

<br />

## Examples

The [`examples/`](examples/) directory includes three runnable integration patterns:

### Lead Import — Bulk insertion with error handling
```typescript
import { Convoso, ConvosoApiError } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
  maxRetries: 3,
});

const leads = [
  { list_id: '333', phone_number: '5551234567', first_name: 'Alice' },
  { list_id: '333', phone_number: '5559876543', first_name: 'Bob' },
];

for (const lead of leads) {
  try {
    await client.leads.insert(lead);
  } catch (err) {
    if (err instanceof ConvosoApiError) {
      console.error(`Failed: ${lead.phone_number} — ${err.description}`);
    }
  }
}
```

### Agent Dashboard — Real-time monitoring
```typescript
const monitor = await client.agentMonitor.search({ campaign_id: '111' });
const performance = await client.agentPerformance.search();

console.log(`Agents ready: ${monitor.agents_ready}`);
console.log(`Agents on call: ${monitor.agents_on_call}`);
```

### DNC Sync — Auto-paginated compliance
```typescript
const dncNumbers: string[] = [];
for await (const entry of client.dnc.searchAll({ campaign_id: '500' })) {
  dncNumbers.push(entry.phone_number);
}
console.log(`Synced ${dncNumbers.length} DNC entries`);
```

<br />

---

<br />

## Testing

69 tests with **99% code coverage**, tested across Node.js 18, 20, and 22:

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run coverage        # Generate v8 coverage report
```

Test suite covers:
- HTTP client behavior (auth injection, parameter encoding, error detection)
- Retry logic (exponential backoff, jitter, Retry-After headers)
- Auto-pagination (all 6 async generators)
- Request/response hooks (sync and async)
- Error classes and 44 error code lookups
- All 16 resource classes

<br />

---

<br />

## CI/CD

Automated workflows via GitHub Actions:

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| **CI** | Push / PR to `main` | Lint, format check, typecheck, build, and test on Node 18, 20, 22 |
| **Docs** | Push to `main` | Builds VitePress site and deploys to GitHub Pages |
| **Release** | Tag `v*` | Full CI suite → publish to npm with provenance → create GitHub Release |

<br />

---

<br />

## Contributing

```bash
git clone https://github.com/thornebridge/convoso-js.git
cd convoso-js
npm install
```

```bash
npm run typecheck       # tsc --noEmit
npm run build           # tsup → ESM + CJS + .d.ts
npm test                # vitest (69 tests)
npm run lint            # ESLint
npm run format          # Prettier
npm run docs:dev        # VitePress dev server
```

Contributions welcome — please open an issue first to discuss larger changes. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

<br />

---

<br />

## Thornebridge Open Source Policy

Thornebridge does not publish open source projects with the intention of maintaining them indefinitely. Our primary focus is building software for our clients and our own products.

**However** — if a project we've released is still being used by the community, we will continue to keep it updated. As our team makes additions, improvements, or updates internally, those changes will be reflected in the open source release. We believe that if people depend on our work, they deserve a working, up-to-date package.

In short: we don't promise long-term maintenance roadmaps, but we don't abandon working software either.

<br />

---

<br />

## License

[MIT](LICENSE)

<br />

<p align="center">
  Built by <a href="https://github.com/thornebridge"><strong>Thornebridge</strong></a>
</p>
