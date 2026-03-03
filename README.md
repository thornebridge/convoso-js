# Convoso API Documentation

Welcome to the comprehensive Convoso API documentation hub. This documentation covers all 62 API endpoints across 17 categories.

## Quick Reference

**Base URL:** `https://api.convoso.com/v1`

**Authentication:** All endpoints require `auth_token` as a query parameter.

## Navigation

- [Authentication](#authentication)
- [API Endpoints Quick Reference](#api-endpoints-quick-reference)
- [Documentation by Category](#documentation-by-category)
- [Machine-Readable Index](#machine-readable-index)

---

## Authentication

All requests to the Convoso API require authentication via an `auth_token` query parameter. See [Authentication Documentation](./docs/authentication.md) for details on obtaining and managing tokens.

**Example Request:**
```
POST https://api.convoso.com/v1/campaigns/search
Content-Type: application/x-www-form-urlencoded

auth_token=YOUR_TOKEN_HERE
```

---

## API Endpoints Quick Reference

| Method | Path | Description | Category |
|--------|------|-------------|----------|
| POST | `/agent-monitor/logout` | Logout agents from the system | Agent Monitor API |
| POST | `/agent-monitor/search` | Real-time monitoring data about agents, campaigns, and queues | Agent Monitor API |
| POST | `/agent-performance/search` | Performance metrics for agents over a date range | Agent Performance |
| POST | `/agent-productivity/search` | Detailed productivity metrics for agents | Agent Productivity |
| POST | `/log/update` | Update extra field values for call logs | Call Logs |
| POST | `/log/retrieve` | Retrieve call log records | Call Logs |
| POST | `/callbacks/update` | Update scheduled callback details | Callbacks |
| POST | `/callbacks/search` | Search scheduled callbacks | Callbacks |
| POST | `/callbacks/delete` | Delete a callback entry | Callbacks |
| POST | `/callbacks/insert` | Insert new callback | Callbacks |
| POST | `/campaigns/search` | Get list of all campaigns | Campaigns |
| POST | `/campaigns/status` | Activate or deactivate a campaign | Campaigns |
| POST | `/dnc/update` | Update DNC record | DNC |
| POST | `/dnc/insert` | Insert phone into DNC list | DNC |
| POST | `/dnc/search` | Search DNC list | DNC |
| POST | `/dnc/delete` | Remove entries from DNC lists | DNC |
| POST | `/leads/search` | Retrieve leads with extensive filters | Leads |
| POST | `/leads/get-recordings` | Get all recordings for a lead | Leads |
| POST | `/leads/delete` | Delete a lead | Leads |
| POST | `/leads/insert` | Insert new lead or update existing | Leads |
| POST | `/leads/update` | Update specific lead | Leads |
| POST | `/lead-post-validation/insert` | Insert lead with criteria validation | Lead Post |
| POST | `/lead-validation/search` | Validate if lead meets criteria without insert | Lead Validation |
| POST | `/lists/insert` | Create new list | List |
| POST | `/lists/update` | Update existing list | List |
| POST | `/lists/search` | Search lists | List |
| POST | `/lists/delete` | Delete a list | List |
| POST | `/revenue/update` | Update revenue for call log entry | Revenue |
| POST | `/sms-opt-out/search` | Search SMS opt-out records | SMS Opt-Out API |
| POST | `/sms-opt-out/update` | Update SMS opt-out record | SMS Opt-Out API |
| POST | `/sms-opt-out/insert` | Insert SMS opt-out record | SMS Opt-Out API |
| POST | `/status/search` | Query lead status codes | Status |
| POST | `/status/update` | Update existing lead status | Status |
| POST | `/status/insert` | Create new lead status | Status |
| POST | `/user-activity/search` | Real-time agent availability data | User Activity |
| POST | `/users/search` | Retrieve user profiles | Users |
| POST | `/users/recordings` | Get recordings for a user | Users |

---

## Documentation by Category

### [Agent Monitor API](./docs/agent-monitor.md)
Real-time monitoring of agent activity, campaigns, and queues.
- Agent Monitor—Logout
- Agent Monitor Search API

### [Agent Performance](./docs/agent-performance.md)
Retrieve performance metrics for agents over time periods.
- Agent Performance Search API

### [Agent Productivity](./docs/agent-productivity.md)
Detailed productivity data and event tracking for agents.
- Agent Productivity Search API

### [Authentication](./docs/authentication.md)
Authorization tokens and authentication mechanisms.

### [Call Logs](./docs/call-logs.md)
Record retrieval and management of call history.
- Call Log—Update API
- Call Log—Retrieve/Search API

### [Callbacks](./docs/callbacks.md)
Scheduling and management of callback requests.
- Callbacks—Update API
- Callbacks—Search API
- Callbacks—Delete API
- Callbacks—Insert API

### [Campaigns](./docs/campaigns.md)
Campaign management and status control.
- Campaign—Search API
- Campaign—Status API

### [DNC (Do Not Call)](./docs/dnc.md)
Do-not-call list management and queries.
- Update DNC—API
- Insert DNC—API
- Search DNC—API
- DNC Delete—API

### [Leads](./docs/leads.md)
Lead data management, search, and retrieval.
- Lead Search API
- Lead—Get Recordings API
- Lead Delete API
- Lead Insert API
- Lead Update API

### [Lead Post](./docs/lead-post.md)
Insert leads with criteria-based validation.
- Lead Post API

### [Lead Validation](./docs/lead-validation.md)
Validate leads against criteria without insertion.
- Lead Validation API

### [Lists](./docs/lists.md)
List creation and management.
- Lists—Update
- Lists—Search API
- Lists—Delete
- Lists—Insert

### [Revenue](./docs/revenue.md)
Revenue tracking and updates for call logs.
- Revenue API

### [SMS Opt-Out API](./docs/sms-opt-out.md)
SMS opt-out list management.
- Search SMS Opt-Out—API
- Update SMS Opt-Out—API
- Insert SMS Opt-Out—API

### [Status](./docs/status.md)
Lead status code management.
- Status—Search
- Status—Update
- Status—Insert

### [User Activity](./docs/user-activity.md)
Real-time agent availability and activity tracking.
- User Activity API

### [Users](./docs/users.md)
User profile and recording management.
- Users Search—API
- Users—Recordings

---

## Machine-Readable Index

For programmatic access to the API specification, refer to:

**[api-index.json](./api-index.json)**

This JSON file contains a complete machine-readable index of all endpoints, including:
- Full endpoint details (method, path, description)
- All parameters with type and requirement information
- Response field definitions
- Example requests and responses
- Error codes where applicable

This index is designed to be traversed by AI systems and automated tools for documentation generation, testing, and integration.

---

## API Usage Patterns

### Request Format

All requests use the POST HTTP method with parameters passed as JSON body or form data.

**Example POST request:**
```
POST https://api.convoso.com/v1/leads/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=456&phone_number=5551234567&first_name=John
```

**Example POST request with search:**
```
POST https://api.convoso.com/v1/leads/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&list_id=456&limit=10
```

### Response Format

All responses are JSON-formatted and follow a consistent structure:

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "12345",
    "name": "Example"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid parameters"
}
```

---

## Common Parameters

### Pagination

Many endpoints support pagination:

| Parameter | Type | Default | Max |
|-----------|------|---------|-----|
| offset | integer | 0 | - |
| limit | integer | Varies | Varies |

### Date Formats

- **Date only:** `YYYY-MM-DD` (e.g., `2026-03-03`)
- **DateTime:** `YYYY-MM-DD HH:MM:SS` (e.g., `2026-03-03 14:30:00`)
- **Time with AM/PM:** `YYYY-MM-DD hh:mm AM/PM` (e.g., `2026-03-03 02:30 PM`)

### Phone Numbers

Phone numbers are typically submitted with:
- `phone_number`: The actual phone number (digits only or formatted)
- `phone_code`: Country/region code (e.g., `1` for US/Canada)

---

## Common Response Fields

### Lead Object

```json
{
  "id": "12345",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "5551234567",
  "email": "john@example.com",
  "status": "ACTIVE",
  "list_id": "456",
  "created_at": "2026-03-01 10:00:00",
  "modified_at": "2026-03-03 14:30:00",
  "address1": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "postal_code": "90210",
  "country": "US"
}
```

### Call Log Object

```json
{
  "id": "789",
  "lead_id": "12345",
  "campaign_id": "111",
  "user_id": "222",
  "phone_number": "5551234567",
  "status": "COMPLETED",
  "call_length": 300,
  "call_date": "2026-03-03 14:30:00",
  "recording": [
    {
      "src": "https://...",
      "type": "mp3",
      "recording_id": "rec123",
      "filename": "call_123.mp3",
      "public_url": "https://..."
    }
  ]
}
```

### Agent Object

```json
{
  "user_id": "222",
  "user_full_name": "Jane Smith",
  "campaign_id": "111",
  "campaign_name": "Sales Campaign",
  "queue_id": "333",
  "queue_name": "Main Queue",
  "extension": "1001",
  "channel_type": "phone",
  "calls_today": 42,
  "total_calls": 150,
  "status": "READY",
  "status_label": "Ready for calls",
  "status_time_sec": 300,
  "status_time_mmss": "05:00"
}
```

---

## Error Codes

Various endpoints return specific error codes. Refer to individual endpoint documentation for error code meanings. Common error code ranges:

- **6000-6059:** DNC and data validation errors
- **4001-4002:** SMS opt-out errors
- **7231:** SMS opt-out search errors

---

## Rate Limiting

Refer to your Convoso account settings for rate limiting policies. Contact Convoso support for information on API rate limits.

---

## Support

For issues, questions, or feature requests related to the Convoso API, contact Convoso support through your account dashboard.

---

**Last Updated:** 2026-03-03
**API Version:** 1.0
