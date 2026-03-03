---
title: API Reference Overview
description: Complete reference for all 37 Convoso API endpoints — authentication, request format, response shapes, and error handling.
---

# API Reference

Complete reference for all 37 Convoso API endpoints covered by convoso-js.

## Base URL

All requests go to:

```
https://api.convoso.com/v1
```

Override with the `baseUrl` option when constructing the client:

```typescript
const client = new Convoso({
  authToken: '...',
  baseUrl: 'https://api.convoso.com/v1', // default
});
```

## Authentication

Every request requires an `auth_token`. The SDK injects it automatically — you never pass it in method parameters. See [Authentication](./authentication) for details on obtaining tokens and security best practices.

```typescript
const client = new Convoso({ authToken: process.env.CONVOSO_TOKEN! });
// auth_token is added to every request body automatically
```

## Request Format

All Convoso API endpoints use **POST** with `application/x-www-form-urlencoded` bodies. The SDK handles this transparently — you pass plain objects, and `undefined`/`null` values are stripped before encoding.

## Endpoint Quick Reference

### Agent APIs

| Endpoint | SDK Method | Description |
|---|---|---|
| `/agent-monitor/search` | `client.agentMonitor.search()` | Real-time agent status and queue metrics |
| `/agent-monitor/logout` | `client.agentMonitor.logout()` | Force-logout an agent |
| `/agent-performance/search` | `client.agentPerformance.search()` | Agent performance metrics (calls, talk time) |
| `/agent-productivity/search` | `client.agentProductivity.search()` | Agent productivity tracking |

### Lead Management

| Endpoint | SDK Method | Description |
|---|---|---|
| `/leads/search` | `client.leads.search()` | Search leads with filters |
| `/leads/search` | `client.leads.searchAll()` | Auto-paginated lead search |
| `/leads/insert` | `client.leads.insert()` | Insert a new lead |
| `/leads/update` | `client.leads.update()` | Update lead fields |
| `/leads/delete` | `client.leads.delete()` | Delete a lead |
| `/leads/get-recordings` | `client.leads.getRecordings()` | Get call recordings for a lead |
| `/leads/get-recordings` | `client.leads.getRecordingsAll()` | Auto-paginated recordings |
| `/lead-post-validation/insert` | `client.leadPost.insert()` | Post-validation lead insert |
| `/lead-validation/search` | `client.leadValidation.search()` | Validate leads before insertion |
| `/lists/search` | `client.lists.search()` | Search lead lists |
| `/lists/insert` | `client.lists.insert()` | Create a new list |
| `/lists/update` | `client.lists.update()` | Update list settings |
| `/lists/delete` | `client.lists.delete()` | Delete a list |

### Call Operations

| Endpoint | SDK Method | Description |
|---|---|---|
| `/callbacks/search` | `client.callbacks.search()` | Search callbacks |
| `/callbacks/search` | `client.callbacks.searchAll()` | Auto-paginated callback search |
| `/callbacks/insert` | `client.callbacks.insert()` | Schedule a callback |
| `/callbacks/update` | `client.callbacks.update()` | Update a callback |
| `/callbacks/delete` | `client.callbacks.delete()` | Delete a callback |
| `/log/retrieve` | `client.callLogs.retrieve()` | Retrieve call logs |
| `/log/retrieve` | `client.callLogs.retrieveAll()` | Auto-paginated call log retrieval |
| `/log/update` | `client.callLogs.update()` | Update call log fields |
| `/campaigns/search` | `client.campaigns.search()` | Search campaigns |
| `/campaigns/status` | `client.campaigns.status()` | Activate/deactivate campaigns |

### Compliance

| Endpoint | SDK Method | Description |
|---|---|---|
| `/dnc/search` | `client.dnc.search()` | Search DNC entries |
| `/dnc/search` | `client.dnc.searchAll()` | Auto-paginated DNC search |
| `/dnc/insert` | `client.dnc.insert()` | Add phone to DNC list |
| `/dnc/update` | `client.dnc.update()` | Update DNC entry |
| `/dnc/delete` | `client.dnc.delete()` | Remove from DNC list |
| `/sms-opt-out/search` | `client.smsOptOut.search()` | Search SMS opt-outs |
| `/sms-opt-out/search` | `client.smsOptOut.searchAll()` | Auto-paginated opt-out search |
| `/sms-opt-out/insert` | `client.smsOptOut.insert()` | Add SMS opt-out |
| `/sms-opt-out/update` | `client.smsOptOut.update()` | Update SMS opt-out |

### Other

| Endpoint | SDK Method | Description |
|---|---|---|
| `/status/search` | `client.status.search()` | Search lead statuses |
| `/status/insert` | `client.status.insert()` | Create a custom status |
| `/status/update` | `client.status.update()` | Update a status |
| `/revenue/update` | `client.revenue.update()` | Update call revenue/return |
| `/users/search` | `client.users.search()` | Search users |
| `/users/recordings` | `client.users.recordings()` | Get user recordings |
| `/user-activity/search` | `client.userActivity.search()` | Search user activity logs |

## Response Format

The Convoso API does **not** use a consistent response wrapper. Different endpoints return data in different shapes:

- `results` array (leads, callbacks, DNC, lists, etc.)
- `entries` array (call logs, recordings)
- `data` object (agent monitor)
- Raw arrays (agent performance/productivity)
- Flat objects (insert/update confirmations)

The SDK preserves these shapes exactly — no normalization is applied.

## Error Handling

API errors come in two forms:

- **`ConvosoApiError`** — The API returned HTTP 200 but `success: false` with an error code
- **`ConvosoHttpError`** — The server returned a non-2xx HTTP status

See the [Error Handling guide](/guide/error-handling) for the full error code table and handling patterns.
