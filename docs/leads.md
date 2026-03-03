# Leads API

Lead data management, search, and retrieval.

## Overview

The Leads API provides comprehensive lead management capabilities including search, insert, update, delete, and recording retrieval.

## Endpoints

### Lead Search API

Retrieve leads with extensive filtering options.

**Endpoint:** `POST /leads/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| lead_id | string | No | Filter by lead ID |
| list_id | string | No | Filter by list ID |
| user_id | string | No | Filter by assigned user ID |
| owner_id | string | No | Filter by lead owner ID |
| status | string | No | Filter by lead status code |
| offset | integer | No | Pagination offset (default 0) |
| limit | integer | No | Results per page (default 10, max 2000) |
| created_by | string | No | Filter by creator |
| email | string | No | Filter by email |
| last_modified_by | string | No | Filter by last modifier |
| first_name | string | No | Filter by first name |
| last_name | string | No | Filter by last name |
| phone_number | string | No | Filter by phone number |
| alt_phone_1 | string | No | Filter by alternate phone 1 |
| alt_phone_2 | string | No | Filter by alternate phone 2 |
| address1 | string | No | Filter by street address |
| address2 | string | No | Filter by address line 2 |
| city | string | No | Filter by city |
| state | string | No | Filter by state/province |
| province | string | No | Filter by province |
| postal_code | string | No | Filter by postal code |
| country | string | No | Filter by country |
| gender | string | No | Filter by gender |
| date_of_birth | string | No | Filter by date of birth (YYYY-MM-DD) |
| created_at_start_date | string | No | Filter by creation start date |
| created_at_end_date | string | No | Filter by creation end date |
| updated_at_start_date | string | No | Filter by modification start date |
| updated_at_end_date | string | No | Filter by modification end date |
| std_company_name | string | No | Filter by company name |
| std_consumer_number | string | No | Filter by consumer number |
| std_account_number | string | No | Filter by account number |
| changed_at_start_date | string | No | Filter by change start date |
| changed_at_end_date | string | No | Filter by change end date |
| deleted_at_start | string | No | Filter by deletion start date |
| deleted_at_end | string | No | Filter by deletion end date |
| archived_at_start | string | No | Filter by archive start date |
| archived_at_end | string | No | Filter by archive end date |
| last_call_start_date | string | No | Filter by last call start date |
| last_call_end_date | string | No | Filter by last call end date |

#### Request Examples

```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=333
```

```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567&limit=10
```

```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=ACTIVE&offset=0&limit=100
```

#### Response Example

```json
{
  "results": [
    {
      "id": "12345",
      "created_at": "2026-03-01 10:00:00",
      "modified_at": "2026-03-03 14:30:00",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "status": "ACTIVE",
      "owner_id": "22222",
      "source_id": "1",
      "list_id": "333",
      "phone_number": "5551234567",
      "alt_phone_1": "5559876543",
      "address1": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "postal_code": "90210",
      "country": "US",
      "carrier_name": "Verizon",
      "carrier_type": "wireless"
    }
  ],
  "offset": 0,
  "limit": 100
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| results | array | Array of lead objects |
| offset | integer | Pagination offset |
| limit | integer | Results per page |

**Lead Object:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique lead ID |
| created_at | string | Creation timestamp |
| modified_at | string | Last modification timestamp |
| first_name | string | Contact first name |
| last_name | string | Contact last name |
| email | string | Email address |
| status | string | Lead status code |
| owner_id | string | Owner user ID |
| source_id | string | Source ID |
| list_id | string | Associated list ID |
| phone_number | string | Primary phone number |
| alt_phone_1 | string | Alternate phone 1 |
| alt_phone_2 | string | Alternate phone 2 |
| address1 | string | Street address |
| address2 | string | Address line 2 |
| city | string | City |
| state | string | State/Province |
| postal_code | string | Postal code |
| country | string | Country code |
| gender | string | Gender (M/F/Other) |
| date_of_birth | string | Date of birth (YYYY-MM-DD) |
| carrier_name | string | Phone carrier name |
| carrier_type | string | Carrier type (wireless/landline/voip) |

#### Filtering Examples

**All leads in list:**
```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=333
```

**Specific lead by phone:**
```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&phone_number=5551234567
```

**Active leads only:**
```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=ACTIVE
```

**Leads by name:**
```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&first_name=John&last_name=Doe
```

**Leads by location:**
```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&city=Anytown&state=CA
```

#### Pagination

```
Get first page:
POST /leads/search
auth_token=abc123&list_id=333&limit=100&offset=0

Get next page:
POST /leads/search
auth_token=abc123&list_id=333&limit=100&offset=100

Get third page:
POST /leads/search
auth_token=abc123&list_id=333&limit=100&offset=200
```

#### Error Codes

| Code | Description |
|------|-------------|
| 7258 | Invalid limit value |
| 7231 | Invalid offset value |

---

### Lead—Get Recordings API

Get all recordings for a lead.

**Endpoint:** `POST /leads/get-recordings`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| lead_id | string | Yes | ID of the lead |
| start_time | string | No | Start time (YYYY-MM-DD HH:MM:SS) |
| end_time | string | No | End time (YYYY-MM-DD HH:MM:SS) |
| offset | integer | No | Pagination offset (default 0) |
| limit | integer | No | Results per page (default 10, max 100) |

#### Request Examples

```
POST https://api.convoso.com/v1/leads/get-recordings
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345
```

```
POST https://api.convoso.com/v1/leads/get-recordings
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345&start_time=2026-03-01%2008:00:00&end_time=2026-03-03%2017:00:00
```

#### Response Example

```json
{
  "entries": [
    {
      "recording_id": "rec123",
      "lead_id": "12345",
      "start_time": "2026-03-03 14:30:00",
      "end_time": "2026-03-03 14:35:00",
      "seconds": 300,
      "url": "https://convoso.com/recording/rec123.mp3"
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| entries | array | Array of recording objects |

**Recording Object:**

| Field | Type | Description |
|-------|------|-------------|
| recording_id | string | Unique recording ID |
| lead_id | string | Associated lead ID |
| start_time | string | Recording start time |
| end_time | string | Recording end time |
| seconds | integer | Duration in seconds |
| url | string | Recording download/playback URL |

#### Error Codes

| Code | Description |
|------|-------------|
| 6005 | Missing users |
| 7231 | Invalid offset value |

---

### Lead Delete API

Delete a lead.

**Endpoint:** `POST /leads/delete`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| lead_id | string | Yes | ID of lead to delete |

#### Request Example

```
POST https://api.convoso.com/v1/leads/delete
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345
```

#### Response Example

```json
{
  "success": true
}
```

#### Error Codes

| Code | Description |
|------|-------------|
| 6001 | No such Lead |

---

### Lead Insert API

Insert a new lead or update existing.

**Endpoint:** `POST /leads/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| list_id | string | Yes | List ID to add lead to |
| phone_number | string | Yes | Primary phone number |
| phone_code | string | No | Country phone code |
| status | string | No | Lead status code |
| created_by | string | No | Creator identifier |
| last_modified_by | string | No | Last modifier identifier |
| owner_id | string | No | Owner user ID |
| first_name | string | No | First name |
| last_name | string | No | Last name |
| alt_phone_1 | string | No | Alternate phone 1 |
| alt_phone_2 | string | No | Alternate phone 2 |
| email | string | No | Email address |
| address1 | string | No | Street address |
| address2 | string | No | Address line 2 |
| city | string | No | City |
| state | string | No | State/Province |
| province | string | No | Province |
| postal_code | string | No | Postal code |
| country | string | No | Country code |
| gender | string | No | Gender |
| date_of_birth | string | No | Date of birth (YYYY-MM-DD) |
| hopper | boolean | No | Add to queue hopper |
| hopper_priority | integer | No | Hopper priority (0-99) |
| hopper_expires_in | integer | No | Expiration in minutes (max 300) |
| update_if_found | boolean | No | Update if lead exists |
| check_dup | integer | No | Duplicate check level (0-4) |
| check_dup_list | boolean | No | Check list duplicates |
| check_dup_archive | boolean | No | Check archived duplicates |
| check_dnc | boolean | No | Check DNC list |
| check_wireless | boolean | No | Check wireless carriers |
| filter_phone_code | boolean | No | Filter by phone code |
| std_company_name | text | No | Company Name |
| std_consumer_number | text | No | Consumer Number |
| std_account_number | text | No | Account Number |
| notes | textarea_long | No | Notes |
| monthly_revenue | number | No | Monthly Revenue |
| annual_revenue | number | No | Annual Revenue |
| title | text | No | Title |
| business_name | text | No | Business Name |
| dba | text | No | DBA |
| industry | text | No | Industry |
| start_date | date | No | Start Date |

#### Non-Asset Options

| Name | Type | Required | Description |
|------|------|----------|-------------|
| blueinkdigital_token | string | No | Token to fetch lead's phone from Blue Ink Digital |
| reject_by_carrier_type | enum | No | Reject based on carrier type: MOBILE, VOIP, LANDLINE (comma-separated) |

#### Insert Update Options

| Name | Type | Required | Description |
|------|------|----------|-------------|
| search_campaign_id | integer | No | Campaign ID to search within when update_if_found is true |
| search_list_id | integer | No | List ID to search within when update_if_found is true (takes priority over search_campaign_id) |
| update_order_by_last_called_time | string | No | If duplicate found, find by Last Called Time ASC or DESC |
| lead_id | integer | No | Lead ID |

#### Request Example

```
POST https://api.convoso.com/v1/leads/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=333&phone_number=5551234567&first_name=John&last_name=Doe&email=john@example.com&status=ACTIVE
```

#### PHP Example

```php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.convoso.com/v1/leads/insert');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
    'auth_token'   => 'YOUR_API_TOKEN',
    'list_id'      => 17257,
    'phone_number' => '8181234560',
    'first_name'   => 'John',
    'last_name'    => 'Test',
)));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);
curl_close($ch);
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "lead_id": "12345"
  },
  "id": "12345"
}
```

#### Error Codes

| Code | Description |
|------|-------------|
| 6002 | No such List |
| 6006 | No such User |
| 6007 | The Lead requires a phone number and list id |
| 6008 | The phone number is invalid |
| 6009 | The phone number already exists |
| 6023 | Required fields are missed |
| 6079 | Invalid Email(s) |

#### Duplicate Check Levels

| Level | Description |
|-------|-------------|
| 0 | No duplicate check |
| 1 | Check current list only |
| 2 | Check all lists |
| 3 | Check all lists and archive |
| 4 | Complete duplicate check |

#### Hopper Options

- **hopper:** true to add to queue for immediate dialing
- **hopper_priority:** 0=lowest, 99=highest
- **hopper_expires_in:** How long before lead expires from queue

---

### Lead Update API

Update specific lead.

**Endpoint:** `POST /leads/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| lead_id | string | Yes | ID of lead to update |
| list_id | string | No | Move to different list |
| phone_number | string | No | Update phone number |
| phone_code | string | No | Update phone code |
| status | string | No | Update status |
| first_name | string | No | Update first name |
| last_name | string | No | Update last name |
| email | string | No | Update email |
| address1 | string | No | Update street address |
| address2 | string | No | Update address line 2 |
| city | string | No | Update city |
| state | string | No | Update state |
| postal_code | string | No | Update postal code |
| country | string | No | Update country |
| alt_phone_1 | string | No | Update alternate phone 1 |
| alt_phone_2 | string | No | Update alternate phone 2 |
| std_company_name | text | No | Company Name |
| std_consumer_number | text | No | Consumer Number |
| std_account_number | text | No | Account Number |
| notes | textarea_long | No | Notes |
| monthly_revenue | number | No | Monthly Revenue |
| annual_revenue | number | No | Annual Revenue |
| title | text | No | Title |
| business_name | text | No | Business Name |
| dba | text | No | DBA |
| industry | text | No | Industry |
| start_date | date | No | Start Date |

#### Request Example

```
POST https://api.convoso.com/v1/leads/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345&status=COMPLETED&email=newemail@example.com
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "lead_id": "12345"
  }
}
```

#### Error Codes

| Code | Description |
|------|-------------|
| 6070 | Invalid lead ID |
| 6071 | Lead not found |

---

## Common Workflows

### Create Lead

```
POST /leads/insert
- list_id: 333
- phone_number: 5551234567
- first_name: John
- last_name: Doe
```

### Find Lead by Phone

```
POST /leads/search
- phone_number: 5551234567
```

### Update Lead Status

```
POST /leads/update
- lead_id: 12345
- status: COMPLETED
```

### Get Lead Recordings

```
POST /leads/get-recordings
- lead_id: 12345
```

### Batch Insert Leads

```python
leads = [
    ('333', '5551234567', 'John', 'Doe'),
    ('333', '5551234568', 'Jane', 'Smith'),
]

for list_id, phone, first, last in leads:
    requests.post(
        'https://api.convoso.com/v1/leads/insert',
        data={
            'auth_token': token,
            'list_id': list_id,
            'phone_number': phone,
            'first_name': first,
            'last_name': last
        }
    )
```

---

## Error Handling

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| Lead not found | `{"success": true, "results": []}` |
| List not found | `{"success": false, "error": "List not found"}` |
| Duplicate lead | `{"success": false, "error": "Lead already exists"}` |
| Invalid phone | `{"success": false, "error": "Invalid phone number"}` |

## Related Endpoints

- [Lists API](./lists.md) - Lead list management
- [Call Logs API](./call-logs.md) - Lead call history
- [Lead Post API](./lead-post.md) - Criteria-based lead insertion

---

**Last Updated:** 2026-03-03
