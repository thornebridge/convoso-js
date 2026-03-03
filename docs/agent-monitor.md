# Agent Monitor API

Real-time monitoring of agent activity, campaigns, and queues.

## Endpoints

### Agent Monitor—Logout

Logout agents from the system.

**Endpoint:** `POST /agent-monitor/logout`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| user_id | string | Yes | User ID for the agent to be logged out |

#### Request Example

```
POST https://api.convoso.com/v1/agent-monitor/logout?auth_token=abc123
Content-Type: application/x-www-form-urlencoded

user_id=12345
```

#### Response Example

```json
{
  "success": true
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status of the logout operation |

#### Error Codes

| Code | Description |
|------|-------------|
| 6006 | Missing or invalid user |
| 6012 | User is not logged in |

---

### Agent Monitor Search API

Provides real-time monitoring data about agents, campaigns, and queues.

**Endpoint:** `POST /agent-monitor/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| campaign_id | string | No | Filter by specific campaign ID |
| queue_id | string | No | Filter by specific queue ID |
| user_id | string | No | Filter by specific user/agent ID |
| filter_by_skill_options | string | No | Filter by skill options (comma-separated values) |

#### Request Example

```
POST https://api.convoso.com/v1/agent-monitor/search?auth_token=abc123
Content-Type: application/x-www-form-urlencoded

campaign_id=111&queue_id=222
```

#### Response Example

```json
{
  "agents": [
    {
      "user_id": "12345",
      "user_full_name": "Jane Smith",
      "campaign_id": "111",
      "campaign_name": "Sales Campaign",
      "queue_id": "222",
      "queue_name": "Main Queue",
      "queue_assignment": "2023-03-01 09:00:00",
      "list_id": "333",
      "extension": "1001",
      "channel_type": "phone",
      "call_type": "outbound",
      "lead_id": "54321",
      "call_log_id": "789",
      "calls_today": 42,
      "total_calls": 150,
      "status": "READY",
      "status_label": "Ready for calls",
      "status_time_sec": 300,
      "status_time_mmss": "05:00",
      "connection_type": "softphone",
      "skill_options": "english,sales"
    }
  ],
  "call_data": {
    "total_calls": 500,
    "answered": 450,
    "dropped": 20
  },
  "queue_dialable_leads": 1200,
  "queue_calls_today": 500,
  "queue_dropped": 20,
  "queue_answered": 450,
  "agent_total": 25,
  "agent_incall": 15,
  "agent_ready": 8,
  "agent_paused": 2
}
```

#### Response Fields

##### Root Level

| Field | Type | Description |
|-------|------|-------------|
| agents | array | Array of agent objects with real-time status and metrics |
| call_data | object | Aggregated call statistics for the selected scope |
| queue_dialable_leads | integer | Number of dialable leads available in queue |
| queue_calls_today | integer | Total calls processed by queue today |
| queue_dropped | integer | Number of dropped calls in queue |
| queue_answered | integer | Number of answered calls in queue |
| agent_total | integer | Total number of agents |
| agent_incall | integer | Number of agents currently in a call |
| agent_ready | integer | Number of agents ready to take calls |
| agent_paused | integer | Number of agents currently paused |

##### Agent Object Fields

| Field | Type | Description |
|-------|------|-------------|
| user_id | string | Unique agent identifier |
| user_full_name | string | Full name of the agent |
| campaign_id | string | ID of current campaign |
| campaign_name | string | Name of current campaign |
| queue_id | string | ID of current queue |
| queue_name | string | Name of current queue |
| queue_assignment | string | Date/time assigned to queue |
| list_id | string | ID of current list being called |
| extension | string | Agent phone extension |
| channel_type | string | Communication channel (phone, email, chat, etc.) |
| call_type | string | Type of call (inbound, outbound) |
| lead_id | string | Current lead being worked |
| call_log_id | string | Current call log entry ID |
| calls_today | integer | Number of calls this agent made today |
| total_calls | integer | Total calls for current session |
| status | string | Current status code (READY, INCALL, PAUSED, etc.) |
| status_label | string | Human-readable status label |
| status_time_sec | integer | Seconds in current status |
| status_time_mmss | string | Time in MM:SS format |
| connection_type | string | Connection type (softphone, VoIP, desk phone, etc.) |
| skill_options | string | Comma-separated list of agent skills |

#### Error Codes

| Code | Description |
|------|-------------|
| 6006 | Missing or invalid user |
| 6026 | Invalid campaign ID |
| 6041 | Invalid queue ID |

#### Use Cases

1. **Real-time Dashboard:** Display current agent status and availability
2. **Queue Management:** Monitor queue depth and active agents
3. **Performance Tracking:** Track calls and activity in real-time
4. **Workload Distribution:** Identify underutilized or overloaded agents
5. **Campaign Monitoring:** Monitor campaign progress and agent allocation

#### Filtering Examples

**By Campaign:**
```
POST https://api.convoso.com/v1/agent-monitor/search?auth_token=abc123
Content-Type: application/x-www-form-urlencoded

campaign_id=111
```

**By Queue:**
```
POST https://api.convoso.com/v1/agent-monitor/search?auth_token=abc123
Content-Type: application/x-www-form-urlencoded

queue_id=222
```

**By Specific Agent:**
```
POST https://api.convoso.com/v1/agent-monitor/search?auth_token=abc123
Content-Type: application/x-www-form-urlencoded

user_id=12345
```

**By Skills:**
```
POST https://api.convoso.com/v1/agent-monitor/search?auth_token=abc123
Content-Type: application/x-www-form-urlencoded

filter_by_skill_options=english,spanish,sales
```

#### Notes

- Response includes current snapshot of agent statuses
- Data updates in real-time as agents change status
- Use campaign_id or queue_id to filter large agent populations
- Skill filters are comma-separated and match agent skill assignments
- Status codes vary by configuration but typically include: READY, INCALL, PAUSED, LOGGED_OUT, etc.
- Per the Admin API reference, ALL Convoso API endpoints use POST method

---

## Common Status Codes

| Status Code | Description |
|-------------|-------------|
| READY | Agent is ready to take calls |
| INCALL | Agent is currently on a call |
| PAUSED | Agent is on pause (break, lunch, etc.) |
| LOGGED_OUT | Agent has logged out |
| WRAP | Agent is in wrap-up mode after call |
| RINGING | Call is ringing to agent |
| TRANSFER | Call is being transferred |

## Error Handling

Both endpoints may return errors for invalid parameters or authentication failures. Common error scenarios:

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| User not found | `{"success": false, "error": "User not found"}` |
| Campaign not found | `{"success": false, "error": "Campaign not found"}` |
| Queue not found | `{"success": false, "error": "Queue not found"}` |

## Related Endpoints

- [User Activity API](./user-activity.md) - Agent availability summary
- [Agent Performance API](./agent-performance.md) - Historical performance metrics
- [Agent Productivity API](./agent-productivity.md) - Detailed productivity tracking

---

**Last Updated:** 2026-03-03
