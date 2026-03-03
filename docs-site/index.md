---
layout: home
hero:
  name: convoso-js
  text: TypeScript SDK for the Convoso API
  tagline: Zero dependencies. Fully typed. Auto-pagination, retry logic, and hooks built in.
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
    details: Every parameter and response is typed with JSDoc — autocomplete and type safety out of the box.
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

## Quick Start

```bash
npm install convoso-js
```

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({ authToken: process.env.CONVOSO_TOKEN! });

// Search leads with auto-pagination
for await (const lead of client.leads.searchAll({ list_id: '333' })) {
  console.log(lead.first_name, lead.last_name);
}
```

::: tip Community Project
This is an unofficial SDK built and maintained by [Thornebridge](https://github.com/thornebridge). It is not affiliated with or endorsed by Convoso.
:::
