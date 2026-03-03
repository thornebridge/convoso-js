---
title: Campaigns API
description: Convoso Campaigns API reference — search campaigns and control campaign status (activate/deactivate).
---

# Campaigns API

Campaign management and status control.

## Endpoints

### Campaign—Search API

Get list of all campaigns.

**Endpoint:** `POST /campaigns/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |

#### Request Example

```
POST https://api.convoso.com/v1/campaigns/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123
```

#### Response Example

```json
{
  "data": [
    {
      "id": "111",
      "name": "Sales Campaign",
      "status": "Y",
      "last_call_date": {
        "date": "2026-03-03",
        "timezone_type": 3,
        "timezone": "America/Denver"
      }
    },
    {
      "id": "222",
      "name": "Customer Service",
      "status": "N",
      "last_call_date": {
        "date": "2026-03-02",
        "timezone_type": 3,
        "timezone": "America/Denver"
      }
    },
    {
      "id": "333",
      "name": "Retention Campaign",
      "status": "Y",
      "last_call_date": {
        "date": "2026-03-03",
        "timezone_type": 3,
        "timezone": "America/Denver"
      }
    }
  ]
}
```

#### Response Fields

**Root Level:**

| Field | Type | Description |
|-------|------|-------------|
| data | array | Array of campaign objects |

**Campaign Object:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique campaign ID |
| name | string | Campaign name |
| status | string | Campaign status: Y (active) or N (inactive) |
| last_call_date | object | Object containing last call date and timezone |
| last_call_date.date | string | Last call date in YYYY-MM-DD format |
| last_call_date.timezone_type | integer | Timezone type identifier |
| last_call_date.timezone | string | Timezone name (e.g., America/Denver) |

#### Use Cases

1. **Campaign Listing:** Get all available campaigns
2. **Campaign Status Check:** Verify which campaigns are active
3. **Activity Monitoring:** See last call date per campaign
4. **Integration:** Get campaign list for dropdown menus
5. **Reporting:** Generate campaign inventory

#### Error Codes

| Code | Description |
|------|-------------|
| 6026 | Invalid campaign ID |

#### Notes

- All active and inactive campaigns are returned
- Use campaign IDs for filtering in other API endpoints
- last_call_date shows most recent activity
- Campaigns may be filtered by status in other endpoints

---

### Campaign—Status API

Activate or deactivate a campaign.

**Endpoint:** `POST /campaigns/status`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| campaign_id | string | Yes | ID of campaign to update |
| status | boolean | Yes | Status: true (active) or false (inactive) |

#### Request Examples

```
POST https://api.convoso.com/v1/campaigns/status
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&status=true
```

```
POST https://api.convoso.com/v1/campaigns/status
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=222&status=false
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
| success | boolean | Success status of status update |

#### Status Values

| Value | Meaning |
|-------|---------|
| true | Activate campaign (set to status: Y) |
| false | Deactivate campaign (set to status: N) |

#### Error Codes

| Code | Description |
|------|-------------|
| 6026 | Invalid campaign ID |
| 6080 | Invalid status value |

#### Effects of Status Change

**Activating a Campaign (true):**
- Agents can be assigned to campaign
- Leads in campaign can be dialed
- Campaign appears in active lists
- Calls can be recorded against campaign

**Deactivating a Campaign (false):**
- No new dials for campaign
- Existing assignments may be completed
- Campaign appears in inactive lists
- Historical data is retained

#### Use Cases

1. **Campaign Management:** Enable/disable campaigns as needed
2. **Seasonal Campaigns:** Turn off campaigns during off-season
3. **Testing:** Deactivate test campaigns before go-live
4. **Maintenance:** Disable campaigns during maintenance
5. **Automation:** Control campaigns based on business logic

#### Common Patterns

**Activate for business hours:**
```
POST /campaigns/status?auth_token=abc123&campaign_id=111&status=true
```

**Deactivate for evening:**
```
POST /campaigns/status?auth_token=abc123&campaign_id=111&status=false
```

**Batch activation example (Python):**
```python
campaign_ids = ['111', '222', '333']

for campaign_id in campaign_ids:
    requests.post(
        'https://api.convoso.com/v1/campaigns/status',
        data={
            'auth_token': token,
            'campaign_id': campaign_id,
            'status': True
        }
    )
```

#### Permissions

- Requires campaign management permissions
- Admin-level access typically required
- Verify user has necessary permissions before attempting status change

#### Error Handling

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| Campaign not found | `{"success": false, "error": "Campaign not found"}` |
| Invalid status value | `{"success": false, "error": "Status must be true or false"}` |
| Insufficient permissions | `{"success": false, "error": "Insufficient permissions"}` |

#### Workflow Example

**Daily Campaign Schedule:**

1. **Morning (8 AM):** Activate sales campaign
   ```
   POST /campaigns/status?campaign_id=111&status=true
   ```

2. **Afternoon (2 PM):** Activate retention campaign
   ```
   POST /campaigns/status?campaign_id=222&status=true
   ```

3. **Evening (5 PM):** Deactivate campaigns
   ```
   POST /campaigns/status?campaign_id=111&status=false
   POST /campaigns/status?campaign_id=222&status=false
   ```

---

## Typical Campaign Workflow

### Setup Phase
1. Create campaign through UI
2. Configure queues and rules
3. Add agents to campaign
4. Import leads into lists

### Activation Phase
1. Call `/campaigns/search` to get campaign ID
2. Call `/campaigns/status` with status=true
3. Verify campaign appears in agent dashboards
4. Monitor initial activity

### Monitoring Phase
1. Use `/agent-monitor/search` to watch agents
2. Track calls via `/log/retrieve`
3. Monitor performance via `/agent-performance/search`

### Deactivation Phase
1. Call `/campaigns/status` with status=false
2. Complete remaining assigned leads
3. Generate final reports
4. Archive campaign data

---

## Related Endpoints

- [Lists API](./lists.md) - Manage campaign lists
- [Leads API](./leads.md) - Manage campaign leads
- [Agent Monitor API](./agent-monitor.md) - Monitor campaign activity
- [Call Logs API](./call-logs.md) - Review campaign calls

---

## Best Practices

1. **Always verify campaign exists** before attempting status change
2. **Check agent assignments** before deactivating campaigns
3. **Monitor pending callbacks** when deactivating campaigns
4. **Coordinate timing** to avoid disrupting agents mid-call
5. **Log all status changes** for audit trail
6. **Test in staging** before automating campaign changes

---

**Last Updated:** 2026-03-03
