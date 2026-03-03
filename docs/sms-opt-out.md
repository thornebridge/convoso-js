# SMS Opt-Out API

SMS opt-out list management.

## Overview

The SMS Opt-Out API manages SMS (text message) opt-out lists, similar to Do-Not-Call lists but specifically for SMS communications.

## Endpoints

### Search SMS Opt-Out—API

Search SMS opt-out records.

**Endpoint:** `POST /sms-opt-out/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| id | string | No | Filter by SMS opt-out record ID |
| campaign_id | string | No | Filter by campaign ID (0 for global) |
| phone_number | string | No | Filter by phone number |
| phone_code | string | No | Filter by phone code |
| reason | string | No | Filter by reason: -BLANK- or -NOTBLANK- |
| purpose | string | No | Filter by purpose |
| insert_date | string | No | Filter by insert date (YYYY-MM-DD) |
| offset | integer | No | Pagination offset (default 0, max 100000) |
| limit | integer | No | Results per page (default 1000, max 1000) |

#### Request Examples

```
POST https://api.convoso.com/v1/sms-opt-out/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123
```

```
POST https://api.convoso.com/v1/sms-opt-out/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567
```

```
POST https://api.convoso.com/v1/sms-opt-out/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=0&limit=500&offset=0
```

#### Response Example

```json
{
  "success": true,
  "offset": 0,
  "limit": 100,
  "total": 1250,
  "records": [
    {
      "id": "12345",
      "phone_number": "5551234567",
      "phone_code": "1",
      "reason": "User Request",
      "purpose": "Marketing",
      "insert_date": "2026-03-03",
      "campaign_id": "0",
      "campaign_name": "Global SMS Opt-Out"
    },
    {
      "id": "12346",
      "phone_number": "5551234568",
      "phone_code": "1",
      "reason": "Complaint",
      "purpose": "Promotional",
      "insert_date": "2026-03-03",
      "campaign_id": "111",
      "campaign_name": "Sales Campaign"
    }
  ]
}
```

#### Response Fields

**Root Level:**

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Operation success |
| offset | integer | Pagination offset |
| limit | integer | Results per page |
| total | integer | Total matching records |
| records | array | Array of opt-out records |

**Record Object:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Opt-out record ID |
| phone_number | string | Phone number opted out |
| phone_code | string | Country/region code |
| reason | string | Reason for opt-out |
| purpose | string | Purpose of SMS |
| insert_date | string | Date opted out |
| campaign_id | string | Campaign ID (0 for global) |
| campaign_name | string | Campaign name |

#### Filtering Examples

**Find specific number:**
```
POST /sms-opt-out/search
- phone_number: 5551234567
```

**Global opt-outs only:**
```
POST /sms-opt-out/search
- campaign_id: 0
```

**Campaign-specific opt-outs:**
```
POST /sms-opt-out/search
- campaign_id: 111
```

**Purpose type opt-outs:**
```
POST /sms-opt-out/search
- campaign_id: -1
```

**Entries without reason:**
```
POST /sms-opt-out/search
- reason: -BLANK-
```

**Entries with reason:**
```
POST /sms-opt-out/search
- reason: -NOTBLANK-
```

#### Error Codes

| Code | Description |
|------|-------------|
| 6006 | Invalid Campaign ID |
| 7231 | Invalid offset value |
| 6008 | The phone number already exists |
| 6026 | Missing or Invalid Country Code |
| 6057 | Invalid Purpose Provided |
| 6058 | Invalid Reason Provided |

---

### Update SMS Opt-Out—API

Update SMS opt-out record.

**Endpoint:** `POST /sms-opt-out/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| id | string | Yes | SMS opt-out record ID |
| phone_code | string | No | Phone code |
| phone_number | string | No | Phone number |
| campaign_id | integer | No | Campaign Id (0 for Global) |
| reason | string | No | Reason (use -BLANK- to clear) |
| purpose | string | No | Purpose (use -BLANK- to clear) |

#### Request Example

```
POST https://api.convoso.com/v1/sms-opt-out/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&id=12345&reason=Updated%20Reason&purpose=-BLANK-
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "id": "12345"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| data | object | Response data |
| data.id | string | Updated record ID |

#### Error Codes

| Code | Description |
|------|-------------|
| 6004 | Unknown Campaign ID |
| 6008 | The phone number is invalid |
| 6026 | Missing or Invalid Country Code |
| 6056 | Missing or Invalid value for ID |
| 6057 | Invalid Purpose Provided |
| 6058 | Invalid Reason Provided |
| 6059 | This combination already exists |
| 4001 | Missing required field: phone_number / phone_code / campaign_id |
| 4002 | phone_number / phone_code / campaign_id must be numeric |
| 6080 | The purpose field is mandatory for campaigns of type 'Purpose' |

---

### Insert SMS Opt-Out—API

Insert SMS opt-out record.

**Endpoint:** `POST /sms-opt-out/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| phone_number | string | Yes | Phone number to opt-out |
| phone_code | string | Yes | Country/region phone code |
| campaign_id | string | Yes | Campaign ID (0 for global) |
| reason | string | No | Reason for opt-out |
| purpose | string | No | Purpose of SMS |

#### Request Examples

```
POST https://api.convoso.com/v1/sms-opt-out/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&phone_code=1&campaign_id=0&reason=User%20Request
```

```
POST https://api.convoso.com/v1/sms-opt-out/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&phone_code=1&campaign_id=111
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
| success | boolean | Success status |

#### Campaign ID Values

| Value | Meaning |
|-------|---------|
| 0 | Global SMS opt-out |
| -1 | Purpose type |
| Specific ID | Campaign-specific opt-out |

#### Reason Examples

- User Request
- Complaint
- Unsubscribe
- Invalid Number
- STOP Reply
- Regulatory

#### Purpose Examples

- Marketing
- Promotional
- Transactional
- Reminder
- Survey
- Notification

#### Error Codes

| Code | Description |
|------|-------------|
| 6006 | Invalid Campaign ID |
| 6007 | Invalid Phone Number |
| 6008 | The phone number already exists |
| 6080 | The purpose field is mandatory for campaigns of type 'Purpose' |
| 6026 | Missing or Invalid Country Code |
| 6057 | Invalid Purpose Provided |
| 6058 | Invalid Reason Provided |

---

## SMS Opt-Out Workflows

### Adding Global SMS Opt-Out

```
POST /sms-opt-out/insert
- phone_number: 5551234567
- phone_code: 1
- campaign_id: 0
- reason: User Request
```

Result: Number blocked from all SMS campaigns

### Adding Campaign-Specific Opt-Out

```
POST /sms-opt-out/insert
- phone_number: 5551234567
- phone_code: 1
- campaign_id: 111
```

Result: Number blocked only for campaign 111

### Checking SMS Opt-Out Status

```
POST /sms-opt-out/search
- phone_number: 5551234567
```

Result: Returns all SMS opt-out entries for number

### Updating Opt-Out Record

```
POST /sms-opt-out/update
- id: 12345
- reason: Complaint
```

Result: Record updated with new reason

---

## SMS Compliance

Different jurisdictions regulate SMS:

**USA Requirements:**
- TCPA compliance required
- Opt-in before sending
- Honor opt-out immediately
- Maintain opt-out list
- Include opt-out instructions in messages

**GDPR (EU):**
- Prior consent required
- Easy unsubscribe mechanism
- Maintain audit trail
- Respect opt-out within 30 days

**SMS Best Practices:**
1. Honor opt-outs immediately
2. Log all opt-out requests
3. Maintain comprehensive opt-out lists
4. Test opt-out mechanisms
5. Regular compliance audits
6. Train staff on regulations

---

## Batch SMS Opt-Out Import (Python)

```python
import requests
import csv

# Read opt-out file
with open('sms_optouts.csv') as f:
    reader = csv.DictReader(f)
    optouts = list(reader)

# Process each opt-out
for optout in optouts:
    response = requests.post(
        'https://api.convoso.com/v1/sms-opt-out/insert',
        data={
            'auth_token': token,
            'phone_number': optout['phone'],
            'phone_code': optout['code'],
            'campaign_id': optout.get('campaign_id', '0'),
            'reason': optout.get('reason', 'Batch Import'),
            'purpose': optout.get('purpose', '')
        }
    )

    if response.json()['success']:
        print(f"Opted out: {optout['phone']}")
    else:
        print(f"Failed: {optout['phone']}")
```

---

## Integration Points

**Inbound SMS Handler:**
```
Receive SMS "STOP"
    ↓
Extract phone number
    ↓
POST /sms-opt-out/insert
    ↓
Phone added to opt-out list
    ↓
Outbound SMS blocked for number
```

**Campaign Launch:**
```
Launch SMS campaign
    ↓
POST /sms-opt-out/search (campaign_id)
    ↓
Remove opted-out numbers from send list
    ↓
Send SMS to remaining contacts
```

---

## Error Handling

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| Phone already opted-out | `{"success": false, "error": "Phone already in SMS opt-out"}` |
| Invalid phone format | `{"success": false, "error": "Invalid phone number"}` |
| Invalid campaign | `{"success": false, "error": "Campaign not found"}` |
| Record not found | `{"success": false, "error": "Record not found"}` |

---

## Related Endpoints

- [DNC API](./dnc.md) - Do-not-call list (phone calls)
- [Leads API](./leads.md) - Lead management
- [Campaigns API](./campaigns.md) - Campaign management

---

**Last Updated:** 2026-03-03
