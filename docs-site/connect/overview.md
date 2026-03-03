---
title: Convoso Connect Overview
description: Understanding Convoso Connect — the platform's webhook engine for event-driven integrations with CRMs, lead distribution platforms, and external systems.
---

# Convoso Connect

Convoso Connect is the platform's native API integration layer. It acts as a configurable HTTP bridge between Convoso and any external system — CRMs, lead distribution platforms, call guidance tools, consent verification services, or anything with a REST endpoint.

At its core, Convoso Connect is a **webhook engine**. When a defined event occurs inside Convoso (an agent dispositions a call, a lead status changes, a callback is scheduled), the system fires an HTTP request to an external URL carrying a payload of lead and call data.

## The Three Components

Every outbound Convoso Connect integration requires three pieces working together:

| Component | Purpose | Location |
|---|---|---|
| **[Adaptor](./adaptors)** | Defines *what* gets sent — maps Convoso field names to destination parameter names | Apps → Adaptors |
| **[Endpoint](./endpoints)** | Defines *where* it goes — destination URL, HTTP method, auth, data format | Apps → Convoso Connect |
| **[Workflow](./workflows)** | Defines *when* it fires — event triggers, conditions, campaign scope | CRM → Workflow Automation |

> The Adaptor translates what gets sent. The Endpoint defines where it goes. The Workflow defines when it fires.

## Two Modes of Operation

- **GET** (inbound) — An external system posts lead data *into* Convoso
- **POST** (outbound) — Convoso pushes data *to* the external system

For outbound POST connections, an Adaptor is **required**. For inbound GET connections, an Adaptor is optional.

## Architecture

### Outbound Flow (Convoso → CRM)

The complete chain from call event to CRM update:

1. **Call event occurs** — disposition, status change, term reason, etc.
2. **Workflow Automation evaluates** event triggers (all must match — AND logic)
3. **Workflow fires** the Convoso Connect action
4. **Endpoint consults** the linked Adaptor for field mapping
5. **Adaptor builds** the payload: mapped lead fields + call log info + extra fields
6. Empty fields use Default Values if configured; unmapped fields are excluded
7. Date fields are formatted per their individual date format settings
8. **HTTP POST fires** to the API URL with auth headers/parameters
9. **Response is captured** and stored in Convoso Connect Logs

### Inbound Flow (CRM → Convoso)

The complete chain from external lead post to dial-ready lead:

1. External system sends lead data to the **Lead Post API** (with Criteria Key)
2. **Lead Post Criteria** runs: duplicate check, DNC check, wireless check, carrier type filter
3. **Global API Settings** run: global duplicate rejection, carrier type rejection
4. **API Duplicate Lead Check** queries your CRM via Convoso Connect (if enabled)
5. **Lead Validation Criteria** applies: age, list, state, zip filters
6. Lead is inserted into the target **List**
7. Campaign picks up the lead for dialing
8. On call completion: **Workflow Automation** fires → Convoso Connect POSTs back to CRM

## All Connection Points

Every place in Convoso where external system connectivity is configured:

| Component | Location | Direction | Purpose |
|---|---|---|---|
| Convoso Connect | Apps → Convoso Connect | Outbound | Webhook engine — pushes data to external APIs |
| Adaptor | Apps → Adaptors | N/A | Field mapping layer for outbound payloads |
| Workflow Automation | CRM → Workflow Automation | Trigger | Event-driven rules that fire Convoso Connect |
| Plugins | Apps → Plugins | Outbound | Agent-triggered manual API calls + transfers |
| API Processing Field | CRM → Lead Layouts | Outbound | Button-triggered mid-call API call, stores response |
| API Lookup Field | CRM → Lead Layouts | Inbound | Dynamic dropdown populated from CRM API |
| Web Form URL | Campaign → Advanced Config | Outbound | Opens CRM URL with lead data in agent browser |
| Embedded Web Form | Campaign → Advanced Config | Outbound | CRM URL in iframe inside agent UI |
| Lead Post API | API | Inbound | Accepts leads from external systems |
| Lead Post Criteria | Apps → Lead Post Criteria | Inbound | Validation rules for API-inserted leads |
| Global API Settings | Account → Global Settings | Inbound | Account-wide duplicate/carrier rejection |
| API Dup Lead Check | Account → Global Settings | Both | Queries CRM before accepting inbound leads |
| FTP Push | Apps → FTP Push | Outbound | Batch file export to FTP/SFTP |
| DNC Lookup | Apps → DNC Lookup | Outbound | Third-party DNC database scrubbing |

## Network Whitelisting

Convoso sends API requests from multiple servers. If your receiving endpoint enforces IP whitelisting, add this CIDR range to your allowlist:

```
66.85.240.0/21
```

::: warning
Without this allowlisting, API calls will be **silently blocked** — Convoso Connect logs will show `null` results with no error detail on the Convoso side.
:::

## SDK Support

The `convoso-js` SDK provides TypeScript types for Convoso Connect webhook payloads, making it easy to build typed webhook receivers:

```typescript
import { parseConnectPayload } from 'convoso-js';
import type { ConnectPayload } from 'convoso-js';

// Parse and type-narrow an incoming webhook
app.post('/webhook', (req, res) => {
  const payload = parseConnectPayload(req.body);
  console.log(payload.phone_number, payload.status);
  console.log(payload.call_log_id, payload.length_in_sec);
  res.sendStatus(200);
});
```

See the [Adaptors](./adaptors) page for the complete field reference.
