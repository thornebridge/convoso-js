---
title: convoso-js — TypeScript SDK for the Convoso API
description: Zero-dependency TypeScript SDK for the Convoso API with auto-pagination, retry logic, request hooks, and 37 fully typed endpoints.
layout: home
hero:
  name: convoso-js
  text: TypeScript SDK for the Convoso API
  tagline: Zero dependencies. Fully typed. Auto-pagination, retry, and hooks built in.
  image:
    src: /convoso-js/convoso-logo.svg
    alt: Convoso
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api-reference/
    - theme: alt
      text: GitHub
      link: https://github.com/thornebridge/convoso-js
features:
  - title: Fully Typed
    details: Every parameter and response has TypeScript types with JSDoc. Autocomplete and type safety out of the box.
    icon: "{ }"
  - title: Zero Dependencies
    details: Uses native fetch (Node.js 18+). No bloated dependency trees to audit or update.
    icon: "\u2205"
  - title: Auto-Pagination
    details: Async generators iterate through all results automatically. No manual offset management.
    icon: "\u221E"
  - title: Automatic Retry
    details: Exponential backoff with jitter for 429/5xx errors. Respects Retry-After headers.
    icon: "\u21BB"
  - title: Request & Response Hooks
    details: Plug in logging, metrics, or custom middleware with onRequest and onResponse hooks.
    icon: "\u2693"
  - title: 37 Endpoints, 16 Resources
    details: Complete coverage of the Convoso API — agents, leads, DNC, campaigns, call logs, and more.
    icon: "\u2611"
---

<br />

<div style="text-align: center; margin-bottom: 1.5rem;">
  <span style="display: inline-block; padding: 3px 14px; border-radius: 14px; background: rgba(120, 86, 255, 0.1); color: #7856ff; font-size: 0.85em; font-weight: 500; border: 1px solid rgba(120, 86, 255, 0.25);">Community project — not affiliated with Convoso</span>
</div>

## Quick Start

```bash
npm install convoso-js
```

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_TOKEN!,
  maxRetries: 3,
});

// Search leads
const { results } = await client.leads.search({ list_id: '333', limit: 100 });

// Auto-paginate through all DNC entries
for await (const entry of client.dnc.searchAll({ campaign_id: '500' })) {
  console.log(entry.phone_number);
}

// Monitor agents in real time
const monitor = await client.agentMonitor.search();
console.log(`${monitor.agents_ready} agents ready`);
```

## Why convoso-js?

The Convoso API uses POST requests with URL-encoded bodies, returns inconsistent response shapes across endpoints, and has undocumented error codes. This SDK handles all of that:

- **Auth injection** — `auth_token` added to every request automatically
- **Error code lookup** — 44 known error codes with human-readable descriptions
- **Null/undefined stripping** — cleaned from params before encoding
- **Response types** — every endpoint response is fully typed, matching the API exactly
- **Dual format** — ships ESM + CJS with `.d.ts` declarations
