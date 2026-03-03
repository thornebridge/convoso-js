---
title: Lists API
description: Convoso Lists API reference — create, search, update, and delete lead lists with full parameter documentation.
---

# Lists API

List creation and management.

## Endpoints

### Lists—Insert (Create)

Create a new list.

**Endpoint:** `POST /lists/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| name | string | Yes | List name (minimum 10 characters) |
| campaign_id | string | Yes | Associated campaign ID |
| description | string | No | List description (0-255 characters) |
| status | integer | No | Status: 1 (active) or 0 (inactive, default 1) |

#### Creating New List

```
POST https://api.convoso.com/v1/lists/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&name=Sales%20List%20March&campaign_id=111&description=March%202026%20leads
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "list_id": "333"
  },
  "id": "333"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| data | object | Response data |
| data.list_id | string | List ID (new or updated) |
| id | string | List ID (duplicate field) |

#### Name Requirements

- Minimum 10 characters
- Use descriptive names: "Sales List March 2026"
- Avoid generic names: "List1", "Test"
- Include timeframe or purpose
- Example: "March_2026_East_Coast_Leads"

#### Description Guidelines

- 0-255 characters
- Optional but recommended
- Include source, date range, purpose
- Example: "Leads imported from third-party vendor, March 2026"

#### Status Values

| Value | Meaning |
|-------|---------|
| 1 | Active (default) |
| 0 | Inactive |

#### Error Codes (Lists Insert)

| Code | Description |
|------|-------------|
| 6003 | The List requires a name |
| 6004 | Unknown Campaign ID |
| 6046 | The List name should be at least 10 characters long |
| 6081 | The list name should be unique |

---

### Lists—Update

Update an existing list.

**Endpoint:** `POST /lists/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| list_id | integer | Yes | ID of list to update |
| name | string | No | List name (10-30 characters) |
| campaign_id | string | No | Associated campaign ID |
| status | boolean | No | Status: 1 (active) or 0 (inactive) |

#### Request Example

```
POST https://api.convoso.com/v1/lists/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=333&name=Updated%20Sales%20List&status=1
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "list_id": "333"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| data | object | Response data |
| data.list_id | string | List ID (updated) |

#### Error Codes (Lists Update)

| Code | Description |
|------|-------------|
| 6002 | No such List |
| 6004 | Unknown Campaign ID |
| 6046 | The List name should be at least 10 characters long |
| 6081 | The list name should be unique |

---

### Lists—Search API

Search lists with filtering.

**Endpoint:** `POST /lists/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| status | integer | Yes | Status: 0 (Inactive) or 1 (Active) |
| id | string | No | Filter by list ID |
| campaign_id | string | No | Filter by campaign ID |

#### Request Examples

```
POST https://api.convoso.com/v1/lists/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=1
```

```
POST https://api.convoso.com/v1/lists/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=1&campaign_id=111
```

#### Response Example

```json
{
  "data": [
    {
      "id": "333",
      "name": "Sales List March 2026",
      "status": "Y",
      "last_called_at": "2026-03-03 17:30:00"
    },
    {
      "id": "334",
      "name": "Retention List Q1",
      "status": "Y",
      "last_called_at": "2026-03-02 15:45:00"
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| data | array | Array of list objects |

**List Object:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | List ID |
| name | string | List name |
| status | string | Status: Y (active) or N (inactive) |
| last_called_at | string | Timestamp of last activity |

#### Filtering Examples

**All active lists:**
```
POST /lists/search
- status: 1
```

**Inactive lists:**
```
POST /lists/search
- status: 0
```

**Active lists for specific campaign:**
```
POST /lists/search
- status: 1
- campaign_id: 111
```

**Specific list by ID:**
```
POST /lists/search
- status: 1
- id: 333
```

#### Error Codes (Lists Search)

| Code | Description |
|------|-------------|
| 6002 | No such List |

---

### Lists—Delete

Delete a list.

**Endpoint:** `POST /lists/delete`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| list_id | string | Yes | ID of list to delete |

#### Request Example

```
POST https://api.convoso.com/v1/lists/delete
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=333
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

#### Important Notes

- Deletion is permanent
- All leads in list are affected
- Historical call logs are retained
- Archive data may still exist
- Consider deactivating instead of deleting

#### Error Codes (Lists Delete)

| Code | Description |
|------|-------------|
| 6002 | No such List |

#### Response Codes

| Code | Description |
|------|-------------|
| 102 | List deletion in progress (for large lists) |

---

## List Lifecycle

### Create List

```
POST /lists/insert
- name: "March Sales Leads"
- campaign_id: "111"
- status: 1
→ Returns: list_id = 333
```

### Add Leads to List

```
POST /leads/insert
- list_id: "333"
- phone_number: "5551234567"
→ Lead added to the list
```

### Monitor List Activity

```
POST /leads/search
- list_id: "333"
→ View all leads in list

POST /lists/search
- id: "333"
→ View list metadata
```

### Update List

```
POST /lists/update
- list_id: "333"
- name: "Updated March Sales Leads"
- status: 1
→ List updated
```

### Deactivate List

```
POST /lists/update
- list_id: "333"
- status: 0
→ List becomes inactive
```

### Delete List

```
POST /lists/delete
- list_id: "333"
→ List permanently deleted
```

---

## List Management Patterns

### Create New Campaign List

```python
import requests

response = requests.post(
    'https://api.convoso.com/v1/lists/insert',
    data={
        'auth_token': token,
        'name': 'Q1 2026 Leads - East Coast',
        'campaign_id': '111',
        'description': 'First quarter leads from eastern region',
        'status': 1
    }
)

new_list_id = response.json()['data']['list_id']
```

### Get All Active Lists for Campaign

```python
response = requests.post(
    'https://api.convoso.com/v1/lists/search',
    data={
        'auth_token': token,
        'campaign_id': '111',
        'status': 1
    }
)

lists = response.json()['data']
for list_obj in lists:
    print(f"List: {list_obj['name']} (ID: {list_obj['id']})")
```

### Disable Inactive Lists

```python
response = requests.post(
    'https://api.convoso.com/v1/lists/search',
    data={
        'auth_token': token,
        'status': 1  # Get active lists
    }
)

for list_obj in response.json()['data']:
    if 'old' in list_obj['name'].lower():
        # Deactivate old lists
        requests.post(
            'https://api.convoso.com/v1/lists/update',
            data={
                'auth_token': token,
                'list_id': list_obj['id'],
                'status': 0
            }
        )
```

### Create New Campaign List (PHP)

```php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.convoso.com/v1/lists/insert');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
    'auth_token'  => 'YOUR_API_TOKEN',
    'name'        => 'List Name Here',
    'campaign_id' => '80',
    'description' => 'List Description',
    'status'      => 1,
)));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);
curl_close($ch);
```

---

## Best Practices

1. **Descriptive Names:** Use clear, timestamped names
2. **Documentation:** Include source and purpose in description
3. **Status Management:** Deactivate rather than delete immediately
4. **Cleanup:** Regularly archive completed lists
5. **Naming Convention:** "Campaign_Date_Region_Type"
   - Example: "Sales_Mar2026_East_NewLeads"
6. **Testing:** Use test lists before production
7. **Backups:** Plan for list retention/archival

---

## Common List Types

| Type | Purpose | Naming |
|------|---------|--------|
| Import List | Newly imported leads | "Import_MMYY_Source" |
| Campaign List | Active campaign | "Campaign_Name_Date" |
| Segment List | Filtered subset | "Segment_Criteria_Date" |
| Test List | Testing/QA | "Test_Campaign_Dev" |
| Archive List | Historical reference | "Archive_YYYY_Campaign" |

---

## Error Handling

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| List name too short | `{"success": false, "error": "Name must be at least 10 characters"}` |
| Duplicate name | `{"success": false, "error": "List name already exists"}` |
| Campaign not found | `{"success": false, "error": "Campaign not found"}` |
| List not found | `{"success": false, "error": "List not found"}` |
| Invalid status | `{"success": false, "error": "Status must be 0 or 1"}` |

---

## Related Endpoints

- [Leads API](./leads.md) - Add/manage leads in lists
- [Campaigns API](./campaigns.md) - Campaign management
- [Call Logs API](./call-logs.md) - View list activity

---

**Last Updated:** 2026-03-03
