---
title: DNC (Do Not Call) API
description: Convoso DNC API reference — search, insert, update, and delete Do-Not-Call list entries with campaign-level and global scope.
---

# DNC (Do Not Call) API

Do-not-call list management and queries.

## Overview

The DNC API allows you to manage Do-Not-Call lists. These are lists of phone numbers that should not be contacted. DNC lists can be campaign-specific (limiting restrictions to a single campaign) or global (restricting all campaigns from contacting).

## Endpoints

### Update DNC—API

Update a DNC record.

**Endpoint:** `POST /dnc/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| id | string | Yes | DNC ID to update |
| phone_number | string | No | Phone number |
| phone_code | string | No | Country/region phone code |
| campaign_id | string | No | Campaign ID (0 for global) |
| reason | string | No | Reason for DNC listing (leave blank to clear) |
| purpose | string | No | Purpose of DNC entry |

#### Request Example

```
POST https://api.convoso.com/v1/dnc/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&id=5083&phone_number=5551234567&reason=Customer%20Request
```

#### Response Example

```json
{
  "success": true,
  "id": 5083
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status of update |
| id | integer | Updated DNC ID |

#### Error Codes

| Code | Description |
|------|-------------|
| 6004 | Invalid phone number format |
| 6008 | Phone number already in DNC |
| 6026 | Invalid campaign ID |
| 6056 | DNC ID not found |
| 6057 | Invalid reason code |
| 6058 | Invalid purpose value |
| 6059 | Update operation failed |

---

### Insert DNC—API

Insert phone number into DNC list.

**Endpoint:** `POST /dnc/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| phone_number | string | Yes | Phone number to add to DNC |
| phone_code | string | Yes | Country/region phone code |
| campaign_id | string | Yes | Campaign ID (0 for global) |
| reason | string | No | Reason for DNC listing |
| purpose | string | No | Purpose of DNC entry |

#### Phone Code Reference

| Country | Code |
|---------|------|
| USA/Canada | 1 |
| UK | 44 |
| Australia | 61 |
| Germany | 49 |
| France | 33 |
| Spain | 34 |
| India | 91 |
| China | 86 |
| Mexico | 52 |
| Brazil | 55 |

#### Request Examples

```
POST https://api.convoso.com/v1/dnc/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&phone_code=1&campaign_id=0&reason=Customer%20Request
```

```
POST https://api.convoso.com/v1/dnc/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&phone_code=1&campaign_id=111
```

#### Response Example

```json
{
  "success": true,
  "id": 1
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| id | integer | ID of newly created DNC entry |

#### Error Codes

| Code | Description |
|------|-------------|
| 6006 | Invalid phone number |
| 6007 | Duplicate entry |
| 6008 | Phone already in DNC |
| 6026 | Invalid campaign ID |
| 6056 | Insert operation failed |
| 6057 | Invalid reason |
| 6058 | Invalid purpose |

#### Campaign ID Values

| Value | Meaning |
|-------|---------|
| -1 | Purpose type DNC |
| 0 | Global DNC (all campaigns) |
| Specific ID | Campaign-specific DNC |

#### Use Cases

1. **Global DNC:** Prevent contact across all campaigns
2. **Campaign-Specific:** Block within single campaign
3. **Regulatory Compliance:** Add opt-out requests
4. **Customer Requests:** Honor do-not-call requests
5. **Dead Numbers:** Prevent dialing invalid numbers

---

### Search DNC—API

Search DNC list.

**Endpoint:** `POST /dnc/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| id | string | No | Filter by DNC ID |
| campaign_id | string | No | Filter by campaign ID |
| phone_number | string | No | Filter by phone number |
| phone_code | string | No | Filter by phone code |
| insert_date | string | No | Filter by insert date (YYYY-MM-DD hh:mm:ss) |
| offset | integer | No | Pagination offset (default 0, max 100000) |
| limit | integer | No | Results per page (default 100, max 1000) |
| reason | string | No | Filter by reason: -BLANK- or -NOTBLANK- |
| purpose | string | No | Filter by purpose |

#### Request Examples

```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123
```

```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567
```

```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&limit=500
```

```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&insert_date=2026-03-03 10:30:00&offset=0&limit=100
```

#### Response Example

```json
{
  "data": {
    "offset": 0,
    "limit": 100,
    "total": 350,
    "entries": [
      {
        "id": "5083",
        "phone_number": "5551234567",
        "campaign_id": "0",
        "insert_date": "2026-03-03",
        "phone_code": "1",
        "campaign_uid": "0",
        "campaign_name": "Global DNC"
      },
      {
        "id": "5084",
        "phone_number": "5551234568",
        "campaign_id": "111",
        "insert_date": "2026-03-03",
        "phone_code": "1",
        "campaign_uid": "111",
        "campaign_name": "Sales Campaign"
      }
    ]
  }
}
```

#### Response Fields

**Root Level:**

| Field | Type | Description |
|-------|------|-------------|
| data | object | Data wrapper object |

**Data Object:**

| Field | Type | Description |
|-------|------|-------------|
| offset | integer | Pagination offset |
| limit | integer | Results per page |
| total | integer | Total matching entries |
| entries | array | Array of DNC records |

**DNC Entry:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | DNC entry ID |
| phone_number | string | Phone number on DNC list |
| campaign_id | string | Campaign ID (0 for global) |
| insert_date | string | Date added to DNC |
| phone_code | string | Phone code |
| campaign_uid | string | Campaign unique ID |
| campaign_name | string | Campaign name |

#### Filtering Examples

**Find specific number:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567
```

**Campaign-specific DNC:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111
```

**Global DNC only:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=0
```

**Purpose type DNC:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=-1
```

**Entries without reason:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&reason=-BLANK-
```

**Entries with reason:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&reason=-NOTBLANK-
```

**Entries added on specific date:**
```
POST https://api.convoso.com/v1/dnc/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&insert_date=2026-03-03 14:30:00
```

#### Error Codes

| Code | Description |
|------|-------------|
| 6006 | Invalid phone format |
| 6008 | Invalid parameter |
| 6026 | Invalid campaign ID |
| 6057 | Invalid reason filter |
| 6058 | Invalid purpose filter |

---

### DNC Delete—API

Remove entries from DNC lists.

**Endpoint:** `POST /dnc/delete`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| phone_number | string | Yes | Phone number to remove from DNC |
| phone_code | string | Yes | Country/region phone code |
| campaign_id | string | Yes | Campaign ID (0 for global) |
| update_lead_status | boolean | No | Update associated lead status |
| lead_status | string | No | Status to set on associated leads |

#### Request Examples

```
POST https://api.convoso.com/v1/dnc/delete
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&phone_code=1&campaign_id=0
```

```
POST https://api.convoso.com/v1/dnc/delete
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&phone_code=1&campaign_id=111&update_lead_status=true&lead_status=ACTIVE
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

#### Error Codes

| Code | Description |
|------|-------------|
| 6000 | Invalid phone number |
| 6001 | Phone not found in DNC |
| 6002 | Invalid campaign ID |
| 6003 | Invalid phone code |
| 6004 | Delete operation failed |
| 6005 | Invalid lead status |

#### Update Lead Status Option

When `update_lead_status=true`, you can optionally set all associated leads' status:
- Useful when removing from DNC to restore leads to callable state
- Leave blank to not change lead statuses
- Use valid status codes from your system

---

## Common DNC Workflows

### Adding a Global DNC Entry

```
POST /dnc/insert
- phone_number: 5551234567
- phone_code: 1
- campaign_id: 0
- reason: Customer Request
```

Result: Number blocked across all campaigns

### Adding Campaign-Specific DNC

```
POST /dnc/insert
- phone_number: 5551234567
- phone_code: 1
- campaign_id: 111
```

Result: Number blocked only for campaign 111

### Checking if Number is DNC

```
POST /dnc/search
- phone_number: 5551234567
```

Result: Returns all DNC entries for that number

### Removing from DNC

```
POST /dnc/delete
- phone_number: 5551234567
- phone_code: 1
- campaign_id: 0
```

Result: Number can be dialed again

### Batch DNC Addition (Python)

```python
dnc_numbers = [
    ('5551234567', '1', '0'),  # phone, code, campaign
    ('5551234568', '1', '0'),
    ('5551234569', '1', '0'),
]

for phone, code, campaign in dnc_numbers:
    requests.post(
        'https://api.convoso.com/v1/dnc/insert',
        data={
            'auth_token': token,
            'phone_number': phone,
            'phone_code': code,
            'campaign_id': campaign,
            'reason': 'Batch Import'
        }
    )
```

---

## Best Practices

1. **Use campaign_id=0** for most opt-outs (global scope)
2. **Always include phone_code** for international numbers
3. **Document reasons** for audit trail
4. **Verify before deleting** to avoid unwanted dialing
5. **Batch import** large DNC files outside peak hours
6. **Regular audits** of DNC list for accuracy
7. **Coordinate with compliance** for regulatory DNC lists

---

## Regulatory Considerations

Different jurisdictions have DNC regulations:

- **USA:** FTC Do-Not-Call Registry compliance required
- **UK:** ICO Privacy Shield requirements
- **GDPR:** EU right to be forgotten
- **CCPA:** California consumer privacy rights

Consult legal team for your jurisdiction's requirements.

---

## Related Endpoints

- [Leads API](./leads.md) - Manage leads affected by DNC
- [SMS Opt-Out API](./sms-opt-out.md) - SMS-specific opt-out list
- [Campaigns API](./campaigns.md) - Campaign-specific DNC settings

---

**Last Updated:** 2026-03-03
