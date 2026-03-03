<p align="center">
  <img src="docs-site/public/convoso-logo.svg" alt="Convoso" width="220" />
</p>

<h1 align="center">convoso-js</h1>

<p align="center">
  <strong>The most complete TypeScript SDK for the Convoso API.</strong><br />
  <sub>Every endpoint. Every webhook. Zero dependencies. Obsessively typed.</sub>
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
  <a href="https://thornebridge.github.io/convoso-js/connect/overview">Convoso Connect</a> &nbsp;&middot;&nbsp;
  <a href="https://github.com/thornebridge/convoso-js/releases">Changelog</a>
</p>

<br />

> **Community project** — not affiliated with or endorsed by [Convoso](https://www.convoso.com/).

<br />

---

<br />

## The Convoso API shouldn't be the hard part.

If you've built on the Convoso API, you know the drill: every endpoint is POST with URL-encoded bodies. Pagination is manual offsets. Error codes are numbers with no descriptions. There's no official SDK in any language.

**convoso-js** exists so you never think about any of that again.

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({ authToken: process.env.CONVOSO_TOKEN! });

// Search leads with full autocomplete — every param and response field is typed
const { results } = await client.leads.search({ list_id: '333' });

// Insert a lead — errors are caught, typed, and described for you
await client.leads.insert({
  list_id: '333',
  phone_number: '5551234567',
  first_name: 'Jane',
});

// Paginate through thousands of records with a single for-loop
for await (const entry of client.dnc.searchAll({ campaign_id: '500' })) {
  console.log(entry.phone_number);
}
```

That's it. No form encoding. No offset math. No guessing what error code `6002` means.

<br />

---

<br />

## What you get

<table>
<tr>
<td width="50%" valign="top">

### Complete API Coverage
**37 endpoints** across **16 resources** — leads, lists, DNC, callbacks, call logs, campaigns, agents, SMS opt-out, revenue, and more. If Convoso exposes it, we cover it.

</td>
<td width="50%" valign="top">

### Convoso Connect Webhooks
First-class support for Convoso Connect. Typed interfaces for **76+ webhook fields**, a `parseConnectPayload()` utility, and constants for all 11 workflow events and 12 actions.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Zero Dependencies
Built on native `fetch`. No Axios. No node-fetch. No bloated dependency tree. Ships at **~3 kB gzipped**. Nothing to audit, nothing to conflict, nothing to break.

</td>
<td width="50%" valign="top">

### Obsessively Typed
Every parameter, every response field, every error code — strict TypeScript with JSDoc on everything. Your editor knows more about the Convoso API than Convoso's own docs.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Auto-Pagination
Six endpoints return async generators that handle offset management, page fetching, and termination. Iterate thousands of records with `for await`.

</td>
<td width="50%" valign="top">

### Batch Operations
Built-in `batch()` helper with concurrency-controlled worker pools. Import 10,000 leads without melting your rate limit. Per-item error tracking included.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Smart Retry
Exponential backoff with jitter for `429` and `5xx`. Respects `Retry-After` headers. Configurable max retries. Non-retryable errors throw immediately.

</td>
<td width="50%" valign="top">

### 44 Error Codes Mapped
Built-in lookup table for every known Convoso error code with human-readable descriptions. `getErrorDescription(6002)` returns `"No such list"`. No more guessing.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Request & Response Hooks
Plug in logging, metrics, or middleware with `onRequest` / `onResponse` callbacks. Async hooks fully supported. Observe every API call without touching resource code.

</td>
<td width="50%" valign="top">

### Rate Limit Awareness
`parseRateLimitHeaders()` extracts `X-RateLimit-Limit`, `Remaining`, and `Reset` from any response. Pair with hooks to build backpressure into your pipeline.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Ships Everywhere
Dual ESM + CJS with full `.d.ts` declarations and source maps. Works out of the box with Node.js, Bun, and Deno.

</td>
<td width="50%" valign="top">

### Battle-Tested
**111 tests. 99% coverage.** CI runs on Node 18, 20, and 22. Every resource, every edge case, every retry path — tested.

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

---

<br />

## Quick Start

### Search, insert, update, delete

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
  maxRetries: 3,
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

// Update a lead
await client.leads.update({ lead_id: '12345', first_name: 'Jane' });

// Delete a lead
await client.leads.delete({ lead_id: '12345' });
```

### Auto-paginate through everything

```typescript
// Iterate all DNC entries — no manual offset management
for await (const entry of client.dnc.searchAll({ campaign_id: '500' })) {
  console.log(entry.phone_number);
}

// Early termination — stops fetching the moment you break
let count = 0;
for await (const lead of client.leads.searchAll({ list_id: '333' })) {
  if (++count >= 50) break;
}
```

### Bulk insert with batch()

```typescript
import { Convoso, batch } from 'convoso-js';

const client = new Convoso({ authToken: process.env.CONVOSO_TOKEN!, maxRetries: 2 });

const leads = [
  { list_id: '100', phone_number: '5551234567', first_name: 'Alice' },
  { list_id: '100', phone_number: '5559876543', first_name: 'Bob' },
  // ... thousands more
];

const result = await batch(leads, (lead) => client.leads.insert(lead), {
  concurrency: 5,
});

console.log(`${result.successCount} inserted, ${result.errorCount} failed`);

// Inspect individual failures
for (const item of result.results) {
  if (item.status === 'rejected') {
    console.error(`Index ${item.index}: ${item.reason.message}`);
  }
}
```

### Monitor agents in real time

```typescript
const monitor = await client.agentMonitor.search({ campaign_id: '111' });
const performance = await client.agentPerformance.search();

console.log(`Agents ready: ${monitor.agents_ready}`);
console.log(`Agents on call: ${monitor.agents_on_call}`);
```

<br />

---

<br />

## Convoso Connect — Webhook Support

Convoso Connect is the platform's webhook engine. It fires HTTP requests when call events occur — dispositions, status changes, callbacks, you name it.

**convoso-js** gives you typed interfaces and a parse utility so you can build webhook receivers in minutes, not hours.

```typescript
import { parseConnectPayload } from 'convoso-js';
import type { ConnectPayload } from 'convoso-js';

// Express
app.post('/webhook', (req, res) => {
  const payload = parseConnectPayload(req.body);

  // Full autocomplete on 76+ fields — lead data, call log, agent info, custom fields
  console.log(payload.phone_number);    // Lead's primary phone
  console.log(payload.status);          // Disposition code
  console.log(payload.call_log_id);     // Call event ID
  console.log(payload.length_in_sec);   // Talk time
  console.log(payload.agent_full_name); // Handling agent
  console.log(payload.recording_url);   // Call recording

  res.json({ success: true });
});

// Hono
app.post('/webhook', async (c) => {
  const payload = parseConnectPayload(await c.req.json());
  console.log(payload.first_name, payload.campaign_name);
  return c.text('ok');
});
```

### What's included

| Export | What it does |
|--------|-------------|
| `ConnectPayload` | Complete webhook payload type — 76+ fields with JSDoc |
| `ConnectLeadFields` | 43 lead-level fields (name, phone, address, custom data) |
| `ConnectCallLogFields` | 24 call-level fields (duration, disposition, recording URL) |
| `ConnectExtraFields` | 12 extra fields (agent info + 10 custom fields) |
| `parseConnectPayload()` | Type-narrow `unknown` to `ConnectPayload` with validation |
| `CONNECT_WORKFLOW_EVENTS` | 11 workflow trigger types with descriptions |
| `CONNECT_WORKFLOW_ACTIONS` | 12 workflow action types with descriptions |

> Full Convoso Connect documentation: **[thornebridge.github.io/convoso-js/connect/overview](https://thornebridge.github.io/convoso-js/connect/overview)**

<br />

---

<br />

## Error Handling That Actually Helps

Two typed error classes for distinct failure modes, plus a built-in lookup for all **44 known Convoso error codes**:

```typescript
import { ConvosoApiError, ConvosoHttpError, getErrorDescription } from 'convoso-js';

try {
  await client.leads.insert({ list_id: '999', phone_number: '5551234567' });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    // Convoso returned { success: false } — you get the code, message, AND description
    console.error(`Code ${err.code}: ${err.description}`);
    //=> "Code 6002: No such list"
  } else if (err instanceof ConvosoHttpError) {
    // Non-2xx HTTP status
    console.error(`HTTP ${err.status}: ${err.statusText}`);
  }
}

// Standalone lookup — great for dashboards and alerting
getErrorDescription(6002); //=> "No such list"
```

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

## Configuration

Every option is optional except `authToken`:

```typescript
const client = new Convoso({
  authToken: 'your-api-token',

  // Override the base URL (default: https://api.convoso.com/v1)
  baseUrl: 'https://api.convoso.com/v1',

  // Provide a custom fetch (useful for proxies, testing, or polyfills)
  fetch: customFetch,

  // Retry 429/5xx with exponential backoff + jitter (default: 0)
  maxRetries: 3,

  // Request timeout in milliseconds — each retry gets its own timeout
  timeout: 30_000,

  // Hook before every request — logging, metrics, whatever you need
  onRequest(path, params) {
    console.log(`→ POST ${path}`);
  },

  // Hook after every response — inspect status, parse rate limits, trigger alerts
  async onResponse(path, response, data) {
    const limits = parseRateLimitHeaders(response);
    if (limits.remaining !== undefined && limits.remaining < 10) {
      console.warn('Rate limit nearly exhausted');
    }
  },
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `authToken` | `string` | — | **Required.** API token injected into every request |
| `baseUrl` | `string` | `https://api.convoso.com/v1` | API base URL |
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |
| `maxRetries` | `number` | `0` | Max retry attempts for 429/5xx responses |
| `timeout` | `number` | — | Request timeout in milliseconds |
| `onRequest` | `RequestHook` | — | Callback before each request |
| `onResponse` | `ResponseHook` | — | Callback after each response |

<br />

---

<br />

## Full API Coverage

All **37** Convoso API endpoints, organized into **16** typed resource classes:

### Lead Management

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.leads` | `search()` `insert()` `update()` `delete()` `getRecordings()` | `searchAll()` `getRecordingsAll()` |
| `client.leadPost` | `insert()` | |
| `client.leadValidation` | `search()` | |
| `client.lists` | `search()` `insert()` `update()` `delete()` | |

### Agent APIs

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.agentMonitor` | `search()` `logout()` | |
| `client.agentPerformance` | `search()` | |
| `client.agentProductivity` | `search()` | |

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

### Users & System

| Resource | Methods | Paginated |
|----------|---------|:---------:|
| `client.status` | `search()` `insert()` `update()` | |
| `client.revenue` | `update()` | |
| `client.users` | `search()` `recordings()` | |
| `client.userActivity` | `search()` | |

<br />

---

<br />

## Quality You Can Verify

This isn't a weekend project with a README and a prayer. It's built to production standards:

- **111 tests, 99% code coverage** — every resource, every retry path, every edge case
- **CI on Node 18, 20, and 22** — lint, format, typecheck, build, test on every push
- **Automated releases** — tag `v*` triggers full CI, npm publish with provenance, and GitHub Release
- **28 test suites** — HTTP client, retry logic, pagination, hooks, error codes, Connect, batch, timeout, and all 16 resources

```bash
npm test               # Run all tests
npm run coverage       # v8 coverage report
npm run typecheck      # tsc --noEmit — strict mode
npm run lint           # ESLint
npm run format:check   # Prettier
```

<br />

---

<br />

## Documentation

Full docs at **[thornebridge.github.io/convoso-js](https://thornebridge.github.io/convoso-js/)**:

| Guide | What you'll learn |
|-------|-------------------|
| [Getting Started](https://thornebridge.github.io/convoso-js/guide/getting-started) | Install, first API call, resource overview |
| [Configuration](https://thornebridge.github.io/convoso-js/guide/configuration) | Every client option explained |
| [Error Handling](https://thornebridge.github.io/convoso-js/guide/error-handling) | Error classes + full 44-code reference table |
| [Retry & Hooks](https://thornebridge.github.io/convoso-js/guide/retry-and-hooks) | Backoff strategy, Retry-After, middleware patterns |
| [Auto-Pagination](https://thornebridge.github.io/convoso-js/guide/pagination) | Async generators for bulk data operations |
| [Examples](https://thornebridge.github.io/convoso-js/guide/examples) | Lead import, agent dashboard, DNC sync |
| [Convoso Connect](https://thornebridge.github.io/convoso-js/connect/overview) | Webhook engine — adaptors, workflows, integrations (7 pages) |
| [API Reference](https://thornebridge.github.io/convoso-js/api-reference/) | Complete endpoint documentation (17 pages) |

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
npm test                # vitest (111 tests)
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
