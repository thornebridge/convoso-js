# convoso-js

Unofficial TypeScript SDK for the [Convoso](https://www.convoso.com/) API. Zero dependencies, fully typed, works with Node.js 18+.

> **Disclaimer**: This is a community project and is not affiliated with or endorsed by Convoso.

## Install

```bash
npm install convoso-js
```

## Quick Start

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({ authToken: process.env.CONVOSO_TOKEN! });

// Search leads
const leads = await client.leads.search({ list_id: '333', limit: 100 });

// Insert a lead
await client.leads.insert({
  list_id: '333',
  phone_number: '5551234567',
  first_name: 'John',
  last_name: 'Doe',
});

// Add to DNC
await client.dnc.insert({
  phone_number: '5551234567',
  phone_code: '1',
  campaign_id: '0',
});

// Monitor agents
const monitor = await client.agentMonitor.search({ campaign_id: '111' });
console.log(`${monitor.agent_ready} agents ready`);
```

## Configuration

```typescript
const client = new Convoso({
  authToken: 'your-api-token',   // Required
  baseUrl: 'https://...',        // Optional (default: https://api.convoso.com/v1)
  fetch: customFetch,            // Optional (custom fetch for proxies/testing)
});
```

## Resources

All 37 Convoso API endpoints are covered across 16 resources:

| Resource | Methods | API Path |
|---|---|---|
| `client.agentMonitor` | `logout()`, `search()` | `/agent-monitor/*` |
| `client.agentPerformance` | `search()` | `/agent-performance/search` |
| `client.agentProductivity` | `search()` | `/agent-productivity/search` |
| `client.callLogs` | `update()`, `retrieve()` | `/log/*` |
| `client.callbacks` | `search()`, `insert()`, `update()`, `delete()` | `/callbacks/*` |
| `client.campaigns` | `search()`, `status()` | `/campaigns/*` |
| `client.dnc` | `search()`, `insert()`, `update()`, `delete()` | `/dnc/*` |
| `client.leads` | `search()`, `insert()`, `update()`, `delete()`, `getRecordings()` | `/leads/*` |
| `client.leadPost` | `insert()` | `/lead-post-validation/insert` |
| `client.leadValidation` | `search()` | `/lead-validation/search` |
| `client.lists` | `search()`, `insert()`, `update()`, `delete()` | `/lists/*` |
| `client.revenue` | `update()` | `/revenue/update` |
| `client.smsOptOut` | `search()`, `insert()`, `update()` | `/sms-opt-out/*` |
| `client.status` | `search()`, `insert()`, `update()` | `/status/*` |
| `client.userActivity` | `search()` | `/user-activity/search` |
| `client.users` | `search()`, `recordings()` | `/users/*` |

## Error Handling

```typescript
import { ConvosoApiError, ConvosoHttpError } from 'convoso-js';

try {
  await client.leads.search({ lead_id: '999' });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    // API returned success: false
    console.error(`API Error ${err.code}: ${err.message}`);
    console.error('Response body:', err.body);
  } else if (err instanceof ConvosoHttpError) {
    // Non-2xx HTTP response
    console.error(`HTTP ${err.status}: ${err.statusText}`);
  }
}
```

## Types

All request parameters and response shapes are fully typed and exported:

```typescript
import type { LeadSearchParams, LeadRecord, DncInsertParams } from 'convoso-js';
```

## Design Notes

- **No response normalization** — API responses are returned exactly as the Convoso API sends them. Different endpoints use different shapes (`results`, `entries`, `data`, raw arrays).
- **auth_token injected automatically** — Never appears in method parameters.
- **Null/undefined stripping** — `undefined` and `null` values are automatically removed from params before sending.
- **Zero runtime dependencies** — Uses native `fetch` (Node.js 18+).

## Development

```bash
npm run typecheck    # tsc --noEmit
npm run build        # tsup → ESM + CJS + .d.ts
npm test             # vitest
```

## License

MIT
