---
title: Agent Productivity API
description: Convoso Agent Productivity API reference — detailed productivity metrics and event tracking for agents.
---

# Agent Productivity API

Retrieve detailed productivity metrics and event tracking for agents.

## Endpoints

### Agent Productivity Search API

Retrieves granular productivity metrics for agents, tracking state changes and availability events.

**Endpoint:** `POST /agent-productivity/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| date_start | string | No | Start date in YYYY-MM-DD format |
| date_end | string | No | End date in YYYY-MM-DD format |
| campaign_id | string | No | Filter by specific campaign ID |
| agent_emails | string | No | Filter by agent emails (comma-separated) |
| offset | integer | No | Pagination offset (default 0) |
| limit | integer | No | Results per page (default/max 1000) |

#### Request Examples

```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123"
}
```

```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "date_start": "2026-03-01",
  "date_end": "2026-03-03"
}
```

```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "campaign_id": "111",
  "limit": 500,
  "offset": 0
}
```

```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "agent_emails": "jane@company.com,john@company.com"
}
```

#### Response Example

```json
{
  "entries": [
    {
      "id": "event_001",
      "user_id": "12345",
      "state": "LOGIN",
      "availability_code": "AVAILABLE",
      "campaign_id": "111",
      "event_epoch": 1709462400,
      "event_sec": 28800,
      "created_at": "2026-03-01 08:00:00",
      "browser": "Chrome 120.0",
      "ip_address": "192.168.1.100",
      "user_name": "Jane Smith",
      "campaign_name": "Sales Campaign",
      "campaign_type": "Outbound"
    },
    {
      "id": "event_002",
      "user_id": "12345",
      "state": "Ready",
      "availability_code": "READY_CALLS",
      "campaign_id": "111",
      "event_epoch": 1709462400,
      "event_sec": 28800,
      "created_at": "2026-03-01 08:00:30",
      "browser": "Chrome 120.0",
      "ip_address": "192.168.1.100",
      "user_name": "Jane Smith",
      "campaign_name": "Sales Campaign",
      "campaign_type": "Outbound"
    },
    {
      "id": "event_003",
      "user_id": "12345",
      "state": "NotReady",
      "availability_code": "BREAK",
      "campaign_id": "111",
      "event_epoch": 1709465400,
      "event_sec": 30600,
      "created_at": "2026-03-01 09:00:00",
      "browser": "Chrome 120.0",
      "ip_address": "192.168.1.100",
      "user_name": "Jane Smith",
      "campaign_name": "Sales Campaign",
      "campaign_type": "Outbound"
    },
    {
      "id": "event_004",
      "user_id": "12345",
      "state": "LogOut",
      "availability_code": "LOGGED_OUT",
      "campaign_id": "111",
      "event_epoch": 1709481600,
      "event_sec": 39600,
      "created_at": "2026-03-01 16:00:00",
      "browser": "Chrome 120.0",
      "ip_address": "192.168.1.100",
      "user_name": "Jane Smith",
      "campaign_name": "Sales Campaign",
      "campaign_type": "Outbound"
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique event ID |
| user_id | string | Agent's user ID |
| state | string | Current state (LOGIN, Ready, NotReady, LogOut) |
| availability_code | string | Availability status code |
| campaign_id | string | Associated campaign ID |
| event_epoch | integer | Unix timestamp of event |
| event_sec | integer | Seconds elapsed in day for this event |
| created_at | string | Event timestamp in YYYY-MM-DD HH:MM:SS format |
| browser | string | Browser/client information used by agent |
| ip_address | string | IP address of agent's connection |
| user_name | string | Agent's full name |
| campaign_name | string | Campaign name |
| campaign_type | string | Campaign type (Inbound, Outbound, Blended, etc.) |

#### State Values

| State | Description |
|-------|-------------|
| LOGIN | Agent logged in |
| Ready | Agent is ready to take calls/messages |
| NotReady | Agent is not ready (on pause, break, training, etc.) |
| LogOut | Agent logged out |

#### Availability Codes

Common availability codes:

| Code | Description |
|------|-------------|
| AVAILABLE | Agent is available for work |
| READY_CALLS | Ready to take calls |
| BREAK | Agent is on break |
| LUNCH | Agent is on lunch break |
| TRAINING | Agent is in training |
| MEETING | Agent is in a meeting |
| WRAP | Agent is wrapping up call |
| LOGGED_OUT | Agent has logged out |

#### Date Range Parameters

- **date_start:** Beginning of period to query (default: current day start)
- **date_end:** End of period to query (default: current time)
- Both parameters use YYYY-MM-DD format
- If only date_start provided: queries to current time
- If only date_end provided: queries from start of available data

#### Pagination

- **offset:** Zero-based index of first record (default 0, max 50000)
- **limit:** Number of records per page (default 1000, max 1000)
- Use offset and limit together to page through large result sets

**Example pagination:**
```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "offset": 0,
  "limit": 500
}
```

```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "offset": 500,
  "limit": 500
}
```

```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "offset": 1000,
  "limit": 500
}
```

#### Use Cases

1. **Attendance Tracking:** Track login/logout times and daily presence
2. **Availability Analysis:** Analyze agent availability patterns throughout day
3. **Break/Lunch Monitoring:** Track pause code usage and duration
4. **Compliance Reports:** Generate audit trails of agent activities
5. **Trend Analysis:** Identify productivity patterns across dates
6. **Team Utilization:** Analyze ready vs. not-ready ratios
7. **Client Access Logging:** Track which agents accessed system and from where

#### Filtering Examples

**All productivity events today:**
```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123"
}
```

**Specific date range:**
```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "date_start": "2026-03-01",
  "date_end": "2026-03-03"
}
```

**Specific agent:**
```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "agent_emails": "jane@company.com"
}
```

**Campaign-specific:**
```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "campaign_id": "111",
  "date_start": "2026-03-01"
}
```

**Multiple agents, paginated:**
```
POST https://api.convoso.com/v1/agent-productivity/search
{
  "auth_token": "abc123",
  "agent_emails": "jane@company.com,john@company.com",
  "limit": 500,
  "offset": 0
}
```

#### Calculating Work Metrics

From productivity events, you can calculate:

**Daily Login Hours:**
```
Duration = LogOut timestamp - LOGIN timestamp
```

**Ready Time:**
```
Ready Time = SUM(Ready state duration between Ready and NotReady/LogOut events)
```

**Break Time:**
```
Break Time = SUM(NotReady state duration with BREAK availability code)
```

**Average Ready Percentage:**
```
Ready % = (Total Ready Time / Total Logged In Time) * 100
```

#### Time Zone Considerations

- Event timestamps are in server time
- Convert to agent's local time zone using GMT offset if needed
- Timestamps include timezone information for display
- Consider DST changes when analyzing date ranges crossing DST transitions

#### IP Address and Browser Tracking

The response includes:
- **ip_address:** Source IP of agent's connection (useful for security auditing)
- **browser:** Browser/client version (helps identify softphone vs. web client usage)

This data helps with:
- Security monitoring
- Remote work verification
- Device usage tracking
- Support issue troubleshooting

#### Notes

- Events are recorded chronologically within each date range
- State transitions are logged as discrete events
- Large date ranges may return large result sets (use pagination)
- Event data is typically retained for 1-2 years (check account settings)
- Timezone handling follows server configuration

## Error Handling

| Issue | Error Code | Response |
|-------|-----------|----------|
| Invalid auth_token | 4001 | `{"success": false, "error": "Invalid authentication token"}` |
| Invalid date format | 6031 | `{"success": false, "error": "Invalid date format. Use YYYY-MM-DD"}` |
| date_start > date_end | 6032 | `{"success": false, "error": "Start date must be before end date"}` |
| Campaign not found | 6033 | `{"success": false, "error": "Campaign not found"}` |
| No data for period | N/A | `{"success": true, "entries": []}` |
| Limit exceeds max | 6034 | `{"success": false, "error": "Limit cannot exceed 1000"}` |
| General search error | 7231 | `{"success": false, "error": "An error occurred while processing your search"}` |

## Related Endpoints

- [Agent Performance API](./agent-performance.md) - Aggregated performance metrics
- [Agent Monitor API](./agent-monitor.md) - Real-time agent status
- [Users API](./users.md) - User profile information

---

**Last Updated:** 2026-03-03
