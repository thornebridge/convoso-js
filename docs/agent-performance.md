# Agent Performance API

Retrieve performance metrics for agents over a date range.

## Endpoints

### Agent Performance Search API

Retrieves performance metrics for agents over a specified date range.

**Endpoint:** `POST /agent-performance/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| date_start | string | No | Start date in YYYY-MM-DD format |
| date_end | string | No | End date in YYYY-MM-DD format |
| campaign_ids | string | No | Filter by campaign IDs (comma-separated, format as "1,2,3" with no spaces) |
| list_ids | string | No | Filter by list IDs (comma-separated, format as "1,2,3" with no spaces) |
| queue_ids | string | No | Filter by queue IDs (comma-separated, format as "1,2,3" with no spaces) |
| user_ids | string | No | Filter by user IDs (comma-separated, format as "1,2,3" with no spaces) |
| status_ids | string | No | Filter by status IDs (comma-separated, format as "1,2,3" with no spaces) |

#### Request Examples

```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123"
}
```

```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123",
  "date_start": "2026-03-01",
  "date_end": "2026-03-03",
  "campaign_ids": "111,222"
}
```

```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123",
  "user_ids": "12345,12346"
}
```

#### Response Example

```json
[
  {
    "user_id": "12345",
    "name": "Jane Smith",
    "calls": 45,
    "human_answered": 38,
    "talk_sec_pt": 65.5,
    "wait_sec_pt": 12.3,
    "pause_sec_pt": 15.2,
    "wrap_sec_pt": 7.0,
    "talk_sec": "09:45:30",
    "wait_sec": "01:52:15",
    "pause_sec": "02:17:45",
    "wrap_sec": "01:05:20",
    "total_time": "15:00:50",
    "am": 0,
    "others": 7,
    "am_pt": 0.0,
    "others_pt": 15.6,
    "call_type": "outbound"
  },
  {
    "user_id": "12346",
    "name": "John Doe",
    "calls": 52,
    "human_answered": 47,
    "talk_sec_pt": 72.1,
    "wait_sec_pt": 10.5,
    "pause_sec_pt": 12.3,
    "wrap_sec_pt": 5.1,
    "talk_sec": "11:25:40",
    "wait_sec": "01:39:30",
    "pause_sec": "01:56:25",
    "wrap_sec": "00:48:10",
    "total_time": "15:50:05",
    "am": 3,
    "others": 2,
    "am_pt": 5.8,
    "others_pt": 3.8,
    "call_type": "outbound"
  }
]
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| user_id | string | Unique agent identifier |
| name | string | Agent's full name |
| calls | integer | Total number of calls made during period |
| human_answered | integer | Number of calls answered by a human (not voicemail/machine) |
| talk_sec_pt | number | Percentage of time spent talking with contacts |
| wait_sec_pt | number | Percentage of time spent waiting between calls |
| pause_sec_pt | number | Percentage of time agent was on pause |
| wrap_sec_pt | number | Percentage of time spent on call wrap-up |
| talk_sec | string | Total talk time in HH:MM:SS format |
| wait_sec | string | Total wait time in HH:MM:SS format |
| pause_sec | string | Total pause time in HH:MM:SS format |
| wrap_sec | string | Total wrap-up time in HH:MM:SS format |
| total_time | string | Total logged-in time in HH:MM:SS format |
| am | integer | Number of answering machine connections |
| others | integer | Number of other outcomes (no answer, busy, etc.) |
| am_pt | number | Percentage of calls connecting to answering machine |
| others_pt | number | Percentage of other outcomes |
| call_type | string | Type of calls (inbound, outbound, blended) |

#### Key Metrics Explained

**Talk Time (talk_sec_pt):** Percentage and total duration of time agent spent actively talking with contacts.

**Wait Time (wait_sec_pt):** Percentage and total duration between calls, including system time and agent wrap-up before next call.

**Pause Time (pause_sec_pt):** Percentage and total duration agent was in pause state (breaks, lunch, training, etc.).

**Wrap-up Time (wrap_sec_pt):** Percentage and total duration agent spent completing call-related tasks after disconnect (CRM updates, notes, etc.).

**Human Answered:** Calls where a real person answered (not voicemail or automated system).

**Answering Machine (am):** Calls that connected to automated systems or voicemail.

**Others:** Calls with other outcomes (no answer, busy signal, disconnected, etc.).

#### Date Range Behavior

- If no date range specified: Returns data for current day
- If date_start only: Returns from that date to current date
- If date_end only: Returns from start of available data to that date
- If both specified: Returns only the specified range

#### Use Cases

1. **Agent Productivity Reports:** Track call volume and time allocation
2. **Quality Monitoring:** Identify agents with high wrap-up times or low answer rates
3. **Trend Analysis:** Compare performance across weeks or months
4. **Team Benchmarking:** Compare agent performance within team
5. **Compliance Reporting:** Document agent activities for regulatory requirements

#### Filtering Examples

**All agents, current day:**
```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123"
}
```

**Specific agent, date range:**
```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123",
  "user_ids": "12345",
  "date_start": "2026-03-01",
  "date_end": "2026-03-03"
}
```

**Campaign-specific performance:**
```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123",
  "campaign_ids": "111,222"
}
```

**Multiple users:**
```
POST https://api.convoso.com/v1/agent-performance/search
Content-Type: application/json

{
  "auth_token": "abc123",
  "user_ids": "12345,12346,12347"
}
```

#### Time Calculation Example

If an agent has:
- Total time: 15:00:00
- Talk time: 10:00:00
- Wait time: 2:00:00
- Pause time: 2:00:00
- Wrap time: 1:00:00

The percentages would be:
- Talk %: 66.7%
- Wait %: 13.3%
- Pause %: 13.3%
- Wrap %: 6.7%

#### Performance Thresholds (Reference)

Typical performance benchmarks (may vary by organization):

| Metric | Benchmark |
|--------|-----------|
| Talk Time % | 50-70% |
| Human Answered Rate | 60-80% |
| Calls per Hour | 6-12 |
| Average Talk Time | 3-8 minutes |
| Wrap-up Time % | 5-15% |

#### Notes

- Performance data updates throughout the day in real-time
- Historical data retention depends on account settings
- Percentages are calculated from total_time
- Talk time includes all communication (calls, messages, chat)
- Pause time includes all pause codes configured in your system
- Results return array of agent performance objects

## Error Handling

Common error scenarios and error codes:

| Issue | Error Code | Response |
|-------|-----------|----------|
| Invalid auth_token | — | `{"success": false, "error": "Invalid authentication token"}` |
| Invalid date format | — | `{"success": false, "error": "Invalid date format. Use YYYY-MM-DD"}` |
| Invalid campaign ID | 6026 | `{"success": false, "error_code": 6026, "error": "Invalid campaign ID"}` |
| Invalid queue ID | 6041 | `{"success": false, "error_code": 6041, "error": "Invalid queue ID"}` |
| Invalid list ID | 6042 | `{"success": false, "error_code": 6042, "error": "Invalid list ID"}` |
| Invalid user ID | 6006 | `{"success": false, "error_code": 6006, "error": "Invalid user ID"}` |
| Invalid status ID | 6050 | `{"success": false, "error_code": 6050, "error": "Invalid status ID"}` |
| No data for period | — | `{"success": true, "data": []}` |

## Related Endpoints

- [Agent Productivity API](./agent-productivity.md) - Detailed event-level tracking
- [Agent Monitor API](./agent-monitor.md) - Real-time agent status
- [Call Logs API](./call-logs.md) - Individual call details

---

**Last Updated:** 2026-03-03
