# User Activity API

Real-time agent availability and activity tracking.

## Endpoints

### User Activity API

Get real-time agent availability data.

**Endpoint:** `POST /user-activity/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| campaign_id | string | No | Filter by campaign ID |
| queue_id | string | No | Filter by queue ID |
| user_id | string | No | Filter by specific user ID |
| filter_by_skill_options | string | No | Filter by skills (comma-separated) |

#### Request Examples

```
POST https://api.convoso.com/v1/user-activity/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123
```

```
POST https://api.convoso.com/v1/user-activity/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111
```

```
POST https://api.convoso.com/v1/user-activity/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&queue_id=222&filter_by_skill_options=english,sales
```

```
POST https://api.convoso.com/v1/user-activity/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user_id=12345
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "available_agents": 36,
    "logged_in_agents": 125
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Operation success |
| data | object | Availability data |
| data.available_agents | integer | Number of agents ready to take work |
| data.logged_in_agents | integer | Total number of logged-in agents |

#### Available Agents

Agents counted as "available":
- Currently logged in
- In "Ready" status (not on pause, break, call, etc.)
- Not in "Not Ready" state
- Properly assigned to queues/campaigns

#### Logged In Agents

Agents counted as "logged in":
- Have completed login
- Session is active
- May be in any status (Ready, In Call, Pause, etc.)

#### Filtering Examples

**All availability:**
```
POST /user-activity/search?auth_token=abc123
→ Returns system-wide availability
```

**Campaign-specific:**
```
POST /user-activity/search?auth_token=abc123&campaign_id=111
→ Returns availability for campaign 111 only
```

**Queue-specific:**
```
POST /user-activity/search?auth_token=abc123&queue_id=222
→ Returns availability for queue 222 only
```

**By skills:**
```
POST /user-activity/search?auth_token=abc123&filter_by_skill_options=spanish,english
→ Returns agents with Spanish or English skills
```

**Specific agent:**
```
POST /user-activity/search?auth_token=abc123&user_id=12345
→ Returns data for agent 12345 only
```

#### Use Cases

1. **Real-time Dashboard:** Display available agent count
2. **Capacity Management:** Monitor system capacity
3. **Load Balancing:** Check availability before routing
4. **Staffing Alerts:** Alert when availability drops below threshold
5. **SLA Monitoring:** Track availability against SLAs
6. **Historical Trends:** Track availability over time
7. **Campaign Launch:** Verify adequate staffing before launch

#### Availability Calculation Example

```python
import requests

response = requests.post(
    'https://api.convoso.com/v1/user-activity/search',
    data={
        'auth_token': token,
        'campaign_id': '111'
    }
).json()

available = response['data']['available_agents']
logged_in = response['data']['logged_in_agents']
utilization = (logged_in - available) / logged_in * 100

print(f"Available: {available}")
print(f"Logged In: {logged_in}")
print(f"Utilization: {utilization:.1f}%")
```

#### Real-Time Monitoring Pattern

```python
import requests
import time

def check_availability():
    while True:
        response = requests.post(
            'https://api.convoso.com/v1/user-activity/search',
            data={'auth_token': token, 'campaign_id': '111'}
        ).json()

        available = response['data']['available_agents']

        if available < 5:
            alert("Critical: Low availability!")
        elif available < 10:
            alert("Warning: Low availability")

        time.sleep(60)  # Check every minute

check_availability()
```

#### Integration with Routing

```
Incoming Lead
    ↓
POST /user-activity/search
    ↓
Check available_agents > 0
    ↓
If Yes:
  - Route to campaign
Else:
  - Queue for callback
  - Alert supervisor
```

#### Response Interpretation

| Available | Logged In | Meaning |
|-----------|-----------|---------|
| 25 | 100 | 25% ready, 75% busy/on-pause |
| 0 | 50 | All agents busy, none ready |
| 50 | 50 | All logged-in agents ready |
| 5 | 100 | Critical capacity (5% ready) |
| 40 | 40 | No agents logged in |

#### Threshold Recommendations

Set alerts based on your capacity needs:

| Threshold | Action |
|-----------|--------|
| > 20% available | Healthy capacity |
| 10-20% available | Monitor closely |
| 5-10% available | Warning state |
| < 5% available | Critical state |
| 0 available | Service unavailable |

#### Real-World Example

**Contact Center Dashboard:**
```
Current Time: 2:45 PM
Campaign: Sales

Available Agents: 12
Logged In Agents: 48
Utilization: 75%

Dial Rate: 45 dials/min
Answer Rate: 68%
Avg Handle Time: 4:30

Status: HEALTHY ✓
```

#### Performance Optimization

- Lightweight query (returns only counts)
- Fast response (typically <100ms)
- Can be called frequently (every few seconds)
- Minimal server impact
- No pagination needed

#### Comparative Analysis

```
Peak Hour (11 AM):
- Available: 5
- Logged In: 50
- Utilization: 90%

Off-Peak (2 AM):
- Available: 12
- Logged In: 15
- Utilization: 20%
```

#### Limitations

- Only counts agents currently online
- Doesn't show skill-specific breakdown
- No historical data (point-in-time only)
- Doesn't show queue depths
- For detailed metrics, use Agent Monitor API

#### Notes

- Response includes only active/logged-in agents
- Availability updates in real-time
- Multiple filters are AND-ed together
- No caching, always returns current state
- Response is immediate (no async processing)

## Error Handling

| Code | Issue | Response |
|------|-------|----------|
| 6026 | Invalid campaign ID | `{"success": false, "code": 6026, "error": "Invalid campaign ID"}` |
| 6041 | Invalid queue ID | `{"success": false, "code": 6041, "error": "Invalid queue ID"}` |
| 6006 | Invalid user ID | `{"success": false, "code": 6006, "error": "Invalid user ID"}` |
| - | Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| - | Campaign not found | `{"success": true, "data": {"available_agents": 0, "logged_in_agents": 0}}` |
| - | Queue not found | `{"success": true, "data": {"available_agents": 0, "logged_in_agents": 0}}` |
| - | User not found | `{"success": true, "data": {"available_agents": 0, "logged_in_agents": 0}}` |

---

## Related Endpoints

- [Agent Monitor API](./agent-monitor.md) - Detailed agent information
- [Agent Performance API](./agent-performance.md) - Historical metrics
- [Campaigns API](./campaigns.md) - Campaign information

---

**Last Updated:** 2026-03-03
