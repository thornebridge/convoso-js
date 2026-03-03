---
title: Call Logs API
---

# Call Logs API

Record retrieval and management of call history.

## Endpoints

### Call Log—Update API

Update extra field values for specific call log entries.

**Endpoint:** `POST /log/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| call_log_id | string | Yes | ID of the call log to update |
| extra_field_01 | string | No | Custom extra field 01 value |
| extra_field_02 | string | No | Custom extra field 02 value |

#### Request Example

```
POST https://api.convoso.com/v1/log/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&call_log_id=789&extra_field_01=note_data&extra_field_02=custom_value
```

#### Response Example

```json
{
  "success": true,
  "id": "789",
  "lead_id": "12345",
  "list_id": "333",
  "campaign_id": "111",
  "user": "Jane Smith",
  "user_id": "12345",
  "phone_number": "5551234567",
  "status": "COMPLETED",
  "call_length": 300,
  "call_date": "2026-03-03 14:30:00",
  "recording": [
    {
      "src": "https://convoso.com/recording/rec123",
      "type": "mp3",
      "recording_id": "rec123",
      "filename": "call_123.mp3",
      "public_url": "https://convoso.com/public/rec123"
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status of update |
| id | string | Call log ID |
| lead_id | string | Associated lead ID |
| list_id | string | Associated list ID |
| campaign_id | string | Associated campaign ID |
| user | string | Agent name |
| user_id | string | Agent user ID |
| phone_number | string | Phone number that was called |
| status | string | Call status code |
| call_length | integer | Call duration in seconds |
| call_date | string | Date and time of call |
| recording | array | Array of recording objects |

#### Extra Fields

Custom extra fields are user-defined fields. The number and purpose depend on your account configuration.

---

### Call Log—Retrieve/Search API

Retrieves call log records with extensive filtering options.

**Endpoint:** `POST /log/retrieve`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| id | string | No | Specific call log ID |
| lead_id | string | No | Filter by lead ID |
| campaign_id | string | No | Filter by campaign ID |
| queue_id | string | No | Filter by queue ID |
| list_id | string | No | Filter by list ID |
| user_id | string | No | Filter by agent user ID |
| status | string | No | Filter by call status |
| phone_number | string | No | Filter by phone number called |
| number_dialed | string | No | Filter by number dialed |
| first_name | string | No | Filter by lead first name |
| last_name | string | No | Filter by lead last name |
| start_time | string | No | Start time in YYYY-MM-DD HH:MM:SS format |
| end_time | string | No | End time in YYYY-MM-DD HH:MM:SS format |
| limit | integer | No | Results per page (default 10, range 1-500) |
| offset | integer | No | Pagination offset (default 0, max 40000). For larger datasets, use start_time/end_time filters |
| call_type | string | No | Filter by call type (OUTBOUND, INBOUND, MANUAL, 3WAY) |
| order | string | No | Sort order: asc or desc |
| called_count | integer | No | Filter by number of times called |
| include_recordings | integer | No | Include recordings: 0 or 1 |

#### Request Examples

```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345
```

```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&start_time=2026-03-01%2008:00:00&end_time=2026-03-03%2017:00:00&limit=100
```

```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user_id=12345&status=COMPLETED&include_recordings=1
```

#### Response Example

```json
{
  "offset": 0,
  "limit": 10,
  "total_found": 150,
  "results": [
    {
      "id": "789",
      "lead_id": "12345",
      "list_id": "333",
      "campaign_id": "111",
      "user_id": "22222",
      "phone_number": "5551234567",
      "status": "COMPLETED",
      "call_length": 300,
      "call_date": "2026-03-03 14:30:00",
      "number_dialed": "18001234567",
      "call_type": "outbound",
      "recording": [
        {
          "src": "https://convoso.com/recording/rec123",
          "type": "mp3",
          "recording_id": "rec123",
          "filename": "call_123.mp3",
          "public_url": "https://convoso.com/public/rec123"
        }
      ]
    },
    {
      "id": "790",
      "lead_id": "12346",
      "list_id": "333",
      "campaign_id": "111",
      "user_id": "22222",
      "phone_number": "5551234568",
      "status": "NO_ANSWER",
      "call_length": 0,
      "call_date": "2026-03-03 14:35:00",
      "number_dialed": "18001234568",
      "call_type": "outbound",
      "recording": []
    }
  ]
}
```

#### Response Fields

**Root Level:**

| Field | Type | Description |
|-------|------|-------------|
| offset | integer | Pagination offset used in request |
| limit | integer | Results per page |
| total_found | integer | Total matching records available |
| results | array | Array of call log objects |

**Call Log Object:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique call log ID |
| lead_id | string | Associated lead ID |
| list_id | string | Associated list ID |
| campaign_id | string | Associated campaign ID |
| user_id | string | Agent user ID |
| phone_number | string | Contact phone number |
| status | string | Call status code |
| call_length | integer | Duration in seconds |
| call_date | string | Call timestamp |
| number_dialed | string | The number dialed out to |
| call_type | string | Type (inbound/outbound) |
| recording | array | Recording objects if available |

**Recording Object:**

| Field | Type | Description |
|-------|------|-------------|
| src | string | Internal recording source URL |
| type | string | Recording format (mp3, wav, etc.) |
| recording_id | string | Unique recording ID |
| filename | string | Original filename |
| public_url | string | Publicly accessible URL for recording |

#### Common Status Codes

| Status | Description |
|--------|-------------|
| COMPLETED | Call completed successfully |
| NO_ANSWER | Contact didn't answer |
| BUSY | Number was busy |
| INVALID | Invalid phone number |
| DISCONNECTED | Call disconnected abnormally |
| FAILED | Call failed to connect |
| ANSWERING_MACHINE | Voicemail/answering machine reached |
| CALL_BLOCKED | Call blocked by system |
| WRONG_PARTY | Wrong party reached |

#### Filtering Examples

**Single lead all calls:**
```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&lead_id=12345
```

**Campaign calls with date range:**
```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&start_time=2026-03-01%2008:00:00&end_time=2026-03-03%2017:00:00
```

**Specific agent with recordings:**
```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user_id=12345&include_recordings=1&limit=50
```

**Completed calls only:**
```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=COMPLETED&limit=100
```

**Calls with pagination:**
```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&limit=50&offset=0
```

```
POST https://api.convoso.com/v1/log/retrieve
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&campaign_id=111&limit=50&offset=50
```

#### URL Encoding

Special characters in parameters should be URL-encoded:
- Space → `%20`
- Colon → `%3A`
- Slash → `%2F`

#### Sorting

Use the `order` parameter to control sort direction:
- `order=asc` - Ascending (earliest first)
- `order=desc` - Descending (latest first)

#### Recording Access

If `include_recordings=1`:
- Recording URLs are included in response
- Use `public_url` for external sharing
- Recording format specified in `type` field

#### Use Cases

1. **Call History:** Look up all calls for a specific lead
2. **Agent Auditing:** Review calls made by specific agent
3. **Compliance:** Extract calls from date range for regulatory review
4. **Quality Assurance:** Pull calls for QA review with recordings
5. **Performance Analysis:** Analyze call metrics by status
6. **Customer Service:** Retrieve call history for customer inquiry

#### Pagination Strategy

For large result sets:
```
1. Get total_found from first request
2. Calculate pages: pages = ceil(total_found / limit)
3. Loop through pages incrementing offset by limit
```

Example in Python:
```python
offset = 0
limit = 100
has_more = True

while has_more:
    params = {
        'auth_token': token,
        'campaign_id': '111',
        'offset': offset,
        'limit': limit
    }
    response = requests.get(url, params=params).json()

    # Process response['results']

    offset += limit
    has_more = offset < response['total_found']
```

#### Notes

- Call length is in seconds (divide by 60 for minutes)
- Call date includes timezone info in response
- Recordings may be deleted after retention period
- Status codes vary by configuration
- Large date ranges may take longer to process
- Maximum limit per query is 500 (use offset/start_time/end_time for pagination)

## Error Handling

### Call Log Retrieve/Search Error Codes

| Error Code | Description |
|------------|-------------|
| 6026 | Invalid campaign ID |
| 6041 | Invalid queue ID |
| 6042 | Invalid list ID |
| 6006 | Invalid user ID |
| 6031 | Invalid date format |
| 6050 | Invalid status |

### Call Log Update Error Codes

| Error Code | Description |
|------------|-------------|
| 6060 | Invalid call_log_id |
| 6061 | Call log not found |
| 6062 | Extra field validation error |

### General Error Responses

| Issue | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| Invalid date format | `{"success": false, "error": "Invalid date format"}` |
| Limit too high | `{"success": false, "error": "Limit cannot exceed 500"}` |
| Call log not found | `{"success": true, "results": []}` |
| Invalid date range | `{"success": false, "error": "Invalid date range"}` |

## Related Endpoints

- [Leads API](./leads.md) - Lead information for call context
- [Agent Performance API](./agent-performance.md) - Aggregated call metrics
- [Campaigns API](./campaigns.md) - Campaign information

---

**Last Updated:** 2026-03-03
