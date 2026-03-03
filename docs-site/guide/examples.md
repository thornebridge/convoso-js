---
title: Examples
---

# Examples

Annotated walkthroughs of the example scripts in the [`examples/`](https://github.com/thornebridge/convoso-js/tree/main/examples) directory.

## Lead Import Pipeline

**File:** `examples/lead-import.ts` — Bulk lead insertion with retry, error handling, and verification via auto-pagination.

### Setup

```typescript
import { Convoso, ConvosoApiError } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_AUTH_TOKEN!,
  maxRetries: 3, // Retry on 429/5xx errors
  onRequest: (path) => console.log(`-> POST ${path}`),
  onResponse: (path, _res, data) =>
    console.log(`<- ${path}`, JSON.stringify(data).slice(0, 100)),
});
```

Hooks are configured to log every request/response — useful for debugging bulk operations.

### Inserting Leads

```typescript
const leads = [
  { list_id: '1001', phone_number: '5551234567', first_name: 'Jane', last_name: 'Doe' },
  { list_id: '1001', phone_number: '5559876543', first_name: 'John', last_name: 'Smith' },
  { list_id: '1001', phone_number: '5555551234', first_name: 'Alice', last_name: 'Brown' },
];

const results = { success: 0, failed: 0, errors: [] as string[] };

for (const lead of leads) {
  try {
    const response = await client.leads.insert({
      ...lead,
      check_dup: 1,     // Check for duplicates
      check_dnc: true,  // Check against DNC list
    });
    console.log(`Inserted lead ${response.id} (${lead.first_name} ${lead.last_name})`);
    results.success++;
  } catch (err) {
    if (err instanceof ConvosoApiError) {
      const desc = err.description ?? err.message;
      console.error(`Failed: ${lead.phone_number} — ${desc} (code ${err.code})`);
      results.errors.push(`${lead.phone_number}: ${desc}`);
    } else {
      throw err; // Re-throw non-API errors
    }
    results.failed++;
  }
}
```

Key patterns:
- **`err.description`** provides human-readable error descriptions from the SDK's built-in code table
- **`check_dup`** and **`check_dnc`** are optional insert parameters that trigger server-side validation
- Non-API errors are re-thrown — only business logic errors are caught and logged

### Verification with Auto-Pagination

```typescript
let count = 0;
for await (const lead of client.leads.searchAll({ list_id: '1001', pageSize: 50 })) {
  count++;
}
console.log(`Total leads in list 1001: ${count}`);
```

Uses `searchAll()` to iterate through all leads in the list without managing pagination manually.

---

## DNC List Sync

**File:** `examples/dnc-sync.ts` — Sync a local Do-Not-Call list with the Convoso API.

### Fetching Existing Entries

```typescript
import { Convoso, ConvosoApiError, CONVOSO_ERROR_CODES } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_AUTH_TOKEN!,
  maxRetries: 2,
});

// Build a Set of all existing DNC phone numbers
const existing = new Set<string>();
for await (const entry of client.dnc.searchAll({
  campaign_id: '500',
  pageSize: 200,
})) {
  existing.add(entry.phone_number);
}
console.log(`Found ${existing.size} existing DNC entries`);
```

Using `searchAll()` with a `Set` is the most efficient way to check for existing records when you need to compare against a local list.

### Inserting Missing Numbers

```typescript
const numbersToBlock = ['5551112222', '5553334444', '5555556666', '5557778888'];
const toAdd = numbersToBlock.filter((num) => !existing.has(num));

for (const phone of toAdd) {
  try {
    const result = await client.dnc.insert({
      phone_number: phone,
      phone_code: '1',
      campaign_id: '500',
      reason: 'External DNC list sync',
    });
    console.log(`Added ${phone} (DNC ID: ${result.id})`);
  } catch (err) {
    if (err instanceof ConvosoApiError) {
      console.warn(`Skipped ${phone}: ${err.description ?? err.message}`);
    } else {
      throw err;
    }
  }
}
```

The pattern of fetch-all → diff → insert-missing ensures idempotent syncs that can be run repeatedly.

---

## Agent Monitoring Dashboard

**File:** `examples/agent-dashboard.ts` — Real-time agent status polling with formatted output.

### Polling Loop

```typescript
const client = new Convoso({
  authToken: process.env.CONVOSO_AUTH_TOKEN!,
  maxRetries: 2,
  onResponse: (_path, _res, data) => {
    const d = data as Record<string, unknown>;
    if (d.success === false) {
      console.warn('API returned unsuccessful response');
    }
  },
});

const POLL_INTERVAL_MS = 10_000; // 10 seconds

while (true) {
  const monitor = await client.agentMonitor.search();

  console.log(`Total agents: ${monitor.total_agents}`);
  console.log(`In call:      ${monitor.agents_in_call}`);
  console.log(`Ready:        ${monitor.agents_ready}`);
  console.log(`Paused:       ${monitor.agents_paused}`);

  for (const agent of monitor.agents) {
    const name = agent.full_name.padEnd(22);
    const status = (agent.status_label ?? agent.status).padEnd(15);
    const campaign = (agent.campaign_name ?? '—').padEnd(15);
    const duration = agent.status_time_mmss ?? '—';
    console.log(`${name} ${status} ${campaign} ${duration}`);
  }

  await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
}
```

Key patterns:
- **Response hook** catches unsuccessful responses for alerting
- **`agentPerformance.search()`** is called alongside `agentMonitor` for a combined dashboard
- The polling interval should respect Convoso's rate limits — 10 seconds is a safe default

---

## Running the Examples

All examples use `npx tsx` for direct TypeScript execution:

```bash
# Set your auth token
export CONVOSO_AUTH_TOKEN=your_token_here

# Run an example
npx tsx examples/lead-import.ts
npx tsx examples/dnc-sync.ts
npx tsx examples/agent-dashboard.ts
```
