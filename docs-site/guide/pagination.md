---
title: Auto-Pagination
description: Use async generator methods to automatically paginate through all Convoso API results without managing offsets.
---

# Auto-Pagination

Several resources expose `*All()` methods that return async generators, automatically handling offset-based pagination so you don't have to manage it manually.

## Basic Usage

```typescript
// Manual pagination (you manage offset + limit)
const page1 = await client.leads.search({ list_id: '333', offset: 0, limit: 100 });
const page2 = await client.leads.search({ list_id: '333', offset: 100, limit: 100 });

// Auto-pagination (SDK handles it for you)
for await (const lead of client.leads.searchAll({ list_id: '333' })) {
  console.log(lead.first_name, lead.last_name);
}
```

## How It Works

`*All()` methods are [async generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) that:

1. Make an initial request with `offset: 0` and `limit: pageSize`
2. Yield each record from the response individually
3. Increment the offset by `pageSize`
4. Repeat until a page returns fewer results than `pageSize` (indicating the last page)

## PageOptions

All `*All()` methods accept a `PageOptions` object to control page size:

```typescript
interface PageOptions {
  /** Number of records per page (default: 100) */
  pageSize?: number;
}
```

```typescript
// Fetch 200 records per API call instead of the default 100
for await (const lead of client.leads.searchAll({
  list_id: '333',
  pageSize: 200,
})) {
  // ...
}
```

::: tip
The `offset` and `limit` parameters are managed by the generator — they are omitted from the `*All()` method signature to prevent conflicts.
:::

## Resources with Auto-Pagination

| Resource | Method | Yields |
|---|---|---|
| `client.leads` | `searchAll()` | `LeadRecord` |
| `client.leads` | `getRecordingsAll()` | Recording entries |
| `client.callbacks` | `searchAll()` | `CallbackRecord` |
| `client.callLogs` | `retrieveAll()` | `CallLogRecord` |
| `client.dnc` | `searchAll()` | `DncRecord` |
| `client.smsOptOut` | `searchAll()` | `SmsOptOutRecord` |

## Early Termination

Since `*All()` methods are async generators, you can `break` out at any time. The generator stops requesting additional pages:

```typescript
let count = 0;
for await (const lead of client.leads.searchAll({ list_id: '333' })) {
  console.log(lead.phone_number);
  if (++count >= 50) break; // Stop after 50 records
}
```

## Collecting All Results

To collect all paginated results into an array:

```typescript
const allLeads: LeadRecord[] = [];
for await (const lead of client.leads.searchAll({ list_id: '333' })) {
  allLeads.push(lead);
}
console.log(`Total: ${allLeads.length} leads`);
```

## Combining with Filters

`*All()` methods accept the same filter parameters as their non-paginated counterparts (minus `offset` and `limit`):

```typescript
// Paginate through DNC entries for a specific campaign
for await (const entry of client.dnc.searchAll({
  campaign_id: '500',
  pageSize: 200,
})) {
  console.log(entry.phone_number);
}

// Paginate through callbacks with date filter
for await (const cb of client.callbacks.searchAll({
  start_date: '2024-01-01',
  end_date: '2024-12-31',
})) {
  console.log(cb.lead_id, cb.callback_time);
}
```

## Error Handling

Errors during pagination are thrown from the `for await` loop and can be caught normally:

```typescript
try {
  for await (const lead of client.leads.searchAll({ list_id: '333' })) {
    console.log(lead.first_name);
  }
} catch (err) {
  if (err instanceof ConvosoApiError) {
    console.error(`Pagination failed at some page: ${err.message}`);
  }
}
```
