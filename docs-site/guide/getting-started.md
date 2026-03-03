---
title: Getting Started
description: Install convoso-js, configure your auth token, and make your first Convoso API call in under a minute.
---

# Getting Started

Install convoso-js and make your first API call in under a minute.

## Prerequisites

- Node.js 18 or later (for native `fetch`)
- A Convoso API auth token (see [Authentication](/api-reference/authentication))

## Installation

::: code-group

```bash [npm]
npm install convoso-js
```

```bash [pnpm]
pnpm add convoso-js
```

```bash [yarn]
yarn add convoso-js
```

:::

## Quick Start

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
});

// Search for leads in a list
const response = await client.leads.search({
  list_id: '333',
  limit: 10,
});

console.log(response.results);
```

## Environment Setup

Store your auth token in an environment variable — never hardcode it:

```bash
# .env
CONVOSO_TOKEN=your_api_token_here
```

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
});
```

::: warning
The `auth_token` grants full access to your Convoso account. Treat it like a password — never commit it to source control.
:::

## Your First API Call

Here's a complete example that searches for leads and handles errors:

```typescript
import { Convoso, ConvosoApiError } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
});

try {
  const response = await client.leads.search({
    list_id: '333',
    limit: 5,
  });

  for (const lead of response.results) {
    console.log(`${lead.first_name} ${lead.last_name} — ${lead.phone_number}`);
  }
} catch (err) {
  if (err instanceof ConvosoApiError) {
    console.error(`API error ${err.code}: ${err.message}`);
  } else {
    throw err;
  }
}
```

## Resource Overview

The SDK organizes 37 endpoints into 16 resources, accessed as properties on the client:

```typescript
client.leads           // Lead CRUD + recordings
client.lists           // List management
client.dnc             // Do-Not-Call lists
client.callbacks       // Callback scheduling
client.callLogs        // Call log retrieval/updates
client.campaigns       // Campaign search + status control
client.agentMonitor    // Real-time agent monitoring
client.agentPerformance // Performance metrics
client.agentProductivity // Productivity tracking
client.status          // Lead status management
client.revenue         // Revenue tracking
client.users           // User search + recordings
client.userActivity    // Activity logs
client.leadPost        // Post-validation inserts
client.leadValidation  // Lead validation
client.smsOptOut       // SMS opt-out management
```

See the full [Resource Map](/resources/) for all methods and pagination support.

## Next Steps

- [Configuration](/guide/configuration) — Custom base URLs, fetch implementations, and more
- [Error Handling](/guide/error-handling) — Error classes and the full error code table
- [Auto-Pagination](/guide/pagination) — Iterate through all results with async generators
- [API Reference](/api-reference/) — Complete endpoint documentation
