---
title: SDK Resource Map
description: Full mapping of convoso-js client resources to SDK methods, API endpoints, and pagination support.
---

# SDK Resource Map

Every Convoso API endpoint is exposed through a typed resource on the client. This page maps each resource accessor to its methods, pagination support, and corresponding API reference docs.

## Resource Overview

```typescript
import { Convoso } from 'convoso-js';

const client = new Convoso({ authToken: '...' });

client.leads            // LeadsResource
client.lists            // ListsResource
client.dnc              // DncResource
client.callbacks        // CallbacksResource
client.callLogs         // CallLogsResource
client.campaigns        // CampaignsResource
client.agentMonitor     // AgentMonitorResource
client.agentPerformance // AgentPerformanceResource
client.agentProductivity // AgentProductivityResource
client.status           // StatusResource
client.revenue          // RevenueResource
client.users            // UsersResource
client.userActivity     // UserActivityResource
client.leadPost         // LeadPostResource
client.leadValidation   // LeadValidationResource
client.smsOptOut        // SmsOptOutResource
```

## Full Method Reference

| Accessor | Method | API Endpoint | Paginated | API Docs |
|---|---|---|---|---|
| `client.leads` | `search()` | `POST /leads/search` | | [Leads](/api-reference/leads) |
| `client.leads` | `searchAll()` | `POST /leads/search` | Yes | [Leads](/api-reference/leads) |
| `client.leads` | `insert()` | `POST /leads/insert` | | [Leads](/api-reference/leads) |
| `client.leads` | `update()` | `POST /leads/update` | | [Leads](/api-reference/leads) |
| `client.leads` | `delete()` | `POST /leads/delete` | | [Leads](/api-reference/leads) |
| `client.leads` | `getRecordings()` | `POST /leads/get-recordings` | | [Leads](/api-reference/leads) |
| `client.leads` | `getRecordingsAll()` | `POST /leads/get-recordings` | Yes | [Leads](/api-reference/leads) |
| `client.lists` | `search()` | `POST /lists/search` | | [Lists](/api-reference/lists) |
| `client.lists` | `insert()` | `POST /lists/insert` | | [Lists](/api-reference/lists) |
| `client.lists` | `update()` | `POST /lists/update` | | [Lists](/api-reference/lists) |
| `client.lists` | `delete()` | `POST /lists/delete` | | [Lists](/api-reference/lists) |
| `client.dnc` | `search()` | `POST /dnc/search` | | [DNC](/api-reference/dnc) |
| `client.dnc` | `searchAll()` | `POST /dnc/search` | Yes | [DNC](/api-reference/dnc) |
| `client.dnc` | `insert()` | `POST /dnc/insert` | | [DNC](/api-reference/dnc) |
| `client.dnc` | `update()` | `POST /dnc/update` | | [DNC](/api-reference/dnc) |
| `client.dnc` | `delete()` | `POST /dnc/delete` | | [DNC](/api-reference/dnc) |
| `client.callbacks` | `search()` | `POST /callbacks/search` | | [Callbacks](/api-reference/callbacks) |
| `client.callbacks` | `searchAll()` | `POST /callbacks/search` | Yes | [Callbacks](/api-reference/callbacks) |
| `client.callbacks` | `insert()` | `POST /callbacks/insert` | | [Callbacks](/api-reference/callbacks) |
| `client.callbacks` | `update()` | `POST /callbacks/update` | | [Callbacks](/api-reference/callbacks) |
| `client.callbacks` | `delete()` | `POST /callbacks/delete` | | [Callbacks](/api-reference/callbacks) |
| `client.callLogs` | `retrieve()` | `POST /log/retrieve` | | [Call Logs](/api-reference/call-logs) |
| `client.callLogs` | `retrieveAll()` | `POST /log/retrieve` | Yes | [Call Logs](/api-reference/call-logs) |
| `client.callLogs` | `update()` | `POST /log/update` | | [Call Logs](/api-reference/call-logs) |
| `client.campaigns` | `search()` | `POST /campaigns/search` | | [Campaigns](/api-reference/campaigns) |
| `client.campaigns` | `status()` | `POST /campaigns/status` | | [Campaigns](/api-reference/campaigns) |
| `client.agentMonitor` | `search()` | `POST /agent-monitor/search` | | [Agent Monitor](/api-reference/agent-monitor) |
| `client.agentMonitor` | `logout()` | `POST /agent-monitor/logout` | | [Agent Monitor](/api-reference/agent-monitor) |
| `client.agentPerformance` | `search()` | `POST /agent-performance/search` | | [Agent Performance](/api-reference/agent-performance) |
| `client.agentProductivity` | `search()` | `POST /agent-productivity/search` | | [Agent Productivity](/api-reference/agent-productivity) |
| `client.status` | `search()` | `POST /status/search` | | [Status](/api-reference/status) |
| `client.status` | `insert()` | `POST /status/insert` | | [Status](/api-reference/status) |
| `client.status` | `update()` | `POST /status/update` | | [Status](/api-reference/status) |
| `client.revenue` | `update()` | `POST /revenue/update` | | [Revenue](/api-reference/revenue) |
| `client.users` | `search()` | `POST /users/search` | | [Users](/api-reference/users) |
| `client.users` | `recordings()` | `POST /users/recordings` | | [Users](/api-reference/users) |
| `client.userActivity` | `search()` | `POST /user-activity/search` | | [User Activity](/api-reference/user-activity) |
| `client.leadPost` | `insert()` | `POST /lead-post-validation/insert` | | [Lead Post](/api-reference/lead-post) |
| `client.leadValidation` | `search()` | `POST /lead-validation/search` | | [Lead Validation](/api-reference/lead-validation) |
| `client.smsOptOut` | `search()` | `POST /sms-opt-out/search` | | [SMS Opt-Out](/api-reference/sms-opt-out) |
| `client.smsOptOut` | `searchAll()` | `POST /sms-opt-out/search` | Yes | [SMS Opt-Out](/api-reference/sms-opt-out) |
| `client.smsOptOut` | `insert()` | `POST /sms-opt-out/insert` | | [SMS Opt-Out](/api-reference/sms-opt-out) |
| `client.smsOptOut` | `update()` | `POST /sms-opt-out/update` | | [SMS Opt-Out](/api-reference/sms-opt-out) |

## Paginated Resources Summary

These resources support auto-pagination via `*All()` async generator methods:

| Resource | Paginated Method | Default Page Size |
|---|---|---|
| `client.leads` | `searchAll()` | 100 |
| `client.leads` | `getRecordingsAll()` | 100 |
| `client.callbacks` | `searchAll()` | 100 |
| `client.callLogs` | `retrieveAll()` | 100 |
| `client.dnc` | `searchAll()` | 100 |
| `client.smsOptOut` | `searchAll()` | 100 |

See [Auto-Pagination](/guide/pagination) for usage details.
