---
title: Callbacks API
---

# Callbacks API

Scheduling and management of callback requests.

## Endpoints

### Callbacks—Update API

Update details of a scheduled callback.

**Endpoint:** `POST /callbacks/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| callback_id | string | Yes | ID of callback to update |
| user_id | string | No | Reassign callback to different user |
| recipient | string | No | Recipient type: system or personal |
| comments | string | No | Callback comments/notes |
| callback_time_zone | number | No | Timezone offset (e.g., -7.00 for MST) |
| callback_time | string | No | Callback time in YYYY-MM-DD hh:mm AM/PM format |
| callback_status | string | No | Status: dismissed (or leave unchanged) |

#### Request Example

```
POST https://api.convoso.com/v1/callbacks/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&callback_id=9999&callback_time=2026-03-05%2002:30%20PM&callback_time_zone=-7.00&comments=Customer%20requested%20callback
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "callback_id": "9999"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status of update |
| data | object | Response data object |
| data.callback_id | string | Updated callback ID |

---

### Callbacks—Search API

Search for scheduled system or personal callbacks.

**Endpoint:** `POST /callbacks/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| start_date | string | No | Start date in YYYY-MM-DD format |
| end_date | string | No | End date in YYYY-MM-DD format |
| offset | integer | No | Pagination offset (default 0, max 50000) |
| limit | integer | No | Results per page (default 20, max 5000) |
| campaign_id | string | No | Filter by campaign ID |
| id | string | No | Filter by callback ID |
| lead_id | string | No | Filter by lead ID |
| list_id | string | No | Filter by list ID |
| recipient | string | No | Filter by recipient: System or Personal |
| user_id | string | No | Filter by user ID |
| stage | string | No | Filter by stage: COMPLETED, PAST_DUE, PENDING, DISMISSED |

#### Request Examples

```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123
```

```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&start_date=2026-03-01&end_date=2026-03-05&stage=PENDING
```

```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&recipient=System&limit=50
```

#### Response Example

```json
{
  "offset": 0,
  "limit": 20,
  "total": 150,
  "results": [
    {
      "id": "657",
      "lead_id": "12345",
      "list_id": "333",
      "campaign_id": "111",
      "status": "ACTIVE",
      "created_at": "2026-03-03 10:00:00",
      "callback_time": "2026-03-05 02:30 PM",
      "modified_at": "2026-03-03 14:30:00",
      "user": "Jane Smith",
      "recipient": "system",
      "comments": "Customer requested callback",
      "stage": "PENDING",
      "user_name": "jane.smith@company.com",
      "campaign_name": "Sales Campaign"
    },
    {
      "id": "658",
      "lead_id": "12346",
      "list_id": "333",
      "campaign_id": "111",
      "status": "ACTIVE",
      "created_at": "2026-03-02 11:00:00",
      "callback_time": "2026-03-04 10:00 AM",
      "modified_at": "2026-03-03 12:00:00",
      "user": "John Doe",
      "recipient": "personal",
      "comments": "Follow-up on previous call",
      "stage": "COMPLETED",
      "user_name": "john.doe@company.com",
      "campaign_name": "Sales Campaign"
    }
  ]
}
```

#### Response Fields

**Root Level:**

| Field | Type | Description |
|-------|------|-------------|
| offset | integer | Pagination offset |
| limit | integer | Results per page |
| total | integer | Total matching callbacks |
| results | array | Array of callback objects |

**Callback Object:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Callback ID |
| lead_id | string | Associated lead ID |
| list_id | string | Associated list ID |
| campaign_id | string | Associated campaign ID |
| status | string | Current status (ACTIVE, etc.) |
| created_at | string | When callback was created |
| callback_time | string | Scheduled callback time |
| modified_at | string | Last modification timestamp |
| user | string | Assigned agent name |
| recipient | string | Callback recipient (system/personal) |
| comments | string | Callback notes/comments |
| stage | string | Current stage (see stage values below) |
| user_name | string | Agent email/username |
| campaign_name | string | Campaign name |

#### Callback Stages

| Stage | Description |
|-------|-------------|
| COMPLETED | Callback was successfully completed |
| PAST_DUE | Callback time has passed without action |
| PENDING | Callback is scheduled and waiting |
| DISMISSED | Callback was manually dismissed |

#### Callback Recipients

| Recipient | Description |
|-----------|-------------|
| System | Callback managed by system (auto-dial) |
| Personal | Callback assigned to specific agent |

#### Filtering Examples

**All pending callbacks:**
```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&stage=PENDING
```

**System callbacks for campaign:**
```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&recipient=System
```

**Personal callbacks for agent:**
```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user_id=12345&recipient=Personal
```

**Callbacks in date range:**
```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&start_date=2026-03-01&end_date=2026-03-05
```

**Specific lead callbacks:**
```
POST https://api.convoso.com/v1/callbacks/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345
```

---

### Callbacks—Delete API

Delete a callback entry.

**Endpoint:** `POST /callbacks/delete`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| callback_id | string | Yes | ID of callback to delete |

#### Request Example

```
POST https://api.convoso.com/v1/callbacks/delete
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&callback_id=657
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
| success | boolean | Success status of deletion |

---

### Callbacks—Insert API

Insert a new callback.

**Endpoint:** `POST /callbacks/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| lead_id | string | Yes | ID of lead for callback |
| user_id | string | No | Assign to specific user/agent |
| recipient | string | Yes | Recipient type: system or personal |
| comments | string | No | Callback comments |
| callback_time_zone | number | Yes | Timezone offset (e.g., -7.00, -5.00) |
| callback_time | string | Yes | Callback time in YYYY-MM-DD hh:mm AM/PM format |

#### Timezone Reference

| Timezone | Offset |
|----------|--------|
| PST | -8.00 |
| MST | -7.00 |
| CST | -6.00 |
| EST | -5.00 |
| GMT | 0.00 |
| BST | +1.00 |
| CET | +1.00 |
| IST | +5.30 |

#### Request Example

```
POST https://api.convoso.com/v1/callbacks/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345&recipient=system&callback_time_zone=-7.00&callback_time=2026-03-05%2002:30%20PM&comments=Customer%20requested%20callback
```

```
POST https://api.convoso.com/v1/callbacks/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345&user_id=22222&recipient=personal&callback_time_zone=-6.00&callback_time=2026-03-06%2010:00%20AM
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "callback_id": "657"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| data | object | Response data |
| data.callback_id | string | ID of newly created callback |

#### Time Format Notes

- Use 12-hour format with AM/PM
- Example: `2026-03-05 02:30 PM` for March 5, 2026 at 2:30 PM
- Timezone offset determines call time relative to system
- Consider agent's local timezone for personal callbacks

#### Use Cases

1. **System Callbacks:** Auto-dial callback to lead
2. **Personal Callbacks:** Reminder for agent to call lead
3. **Appointment Reminders:** Schedule reminder calls
4. **Follow-up Scheduling:** Plan future contact
5. **Customer Service:** Honor customer call-back requests

---

## Workflow Examples

### Creating a System Callback

```
POST /callbacks/insert
- lead_id: 12345
- recipient: system
- callback_time: 2026-03-05 02:30 PM
- callback_time_zone: -7.00
```

Results in: System automatically dials the lead at scheduled time

### Creating a Personal Callback

```
POST /callbacks/insert
- lead_id: 12345
- user_id: 22222
- recipient: personal
- callback_time: 2026-03-05 02:30 PM
- callback_time_zone: -7.00
```

Results in: Agent sees reminder to call lead at scheduled time

### Updating a Callback

```
POST /callbacks/update
- callback_id: 657
- callback_time: 2026-03-06 03:00 PM
- callback_time_zone: -7.00
```

Results in: Callback time rescheduled to new time

### Finding Pending Callbacks

```
POST /callbacks/search
- stage: PENDING
- start_date: 2026-03-03
- end_date: 2026-03-05
```

Results in: List of all pending callbacks in date range

---

## Pagination

For large result sets, use offset and limit:

```
POST /callbacks/search
auth_token=abc123&limit=20&offset=0

POST /callbacks/search
auth_token=abc123&limit=20&offset=20

POST /callbacks/search
auth_token=abc123&limit=20&offset=40
```

---

## Error Handling

### Search Error Codes

| Code | Description |
|------|-------------|
| 6026 | Invalid campaign ID |
| 6042 | Invalid list ID |
| 6006 | Invalid user ID |
| 6031 | Invalid date format |

### Insert Error Codes

| Code | Description |
|------|-------------|
| 6070 | Invalid lead ID |
| 6071 | Invalid callback time format |
| 6072 | Invalid timezone |

### Update Error Codes

| Code | Description |
|------|-------------|
| 6073 | Invalid callback ID |
| 6074 | Callback not found |

### Delete Error Codes

| Code | Description |
|------|-------------|
| 6073 | Invalid callback ID |
| 6074 | Callback not found |

### General Error Responses

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| Callback not found | `{"success": false, "error": "Callback not found"}` |
| Lead not found | `{"success": false, "error": "Lead not found"}` |
| Invalid time format | `{"success": false, "error": "Invalid callback time format"}` |
| Invalid timezone | `{"success": false, "error": "Invalid timezone offset"}` |
| Invalid stage | `{"success": false, "error": "Invalid callback stage"}` |

## Related Endpoints

- [Leads API](./leads.md) - Lead information
- [Campaigns API](./campaigns.md) - Campaign details
- [Users API](./users.md) - Agent information

---

**Last Updated:** 2026-03-03
