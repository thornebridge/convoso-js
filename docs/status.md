---
title: Status API
description: Convoso Status API reference — search, create, and update lead status codes for disposition tracking.
---

# Status API

Lead status code management.

## Overview

The Status API manages lead status codes - the classifications applied to leads after contact attempts (e.g., COMPLETED, NO_ANSWER, BUSY, etc.).

## Endpoints

### Status—Search

Query lead status codes.

**Endpoint:** `POST /status/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| query | string | Yes | Search by abbreviation or description |

#### Request Examples

```
POST https://api.convoso.com/v1/status/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&query=COMPLETED
```

```
POST https://api.convoso.com/v1/status/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&query=NO_ANSWER
```

```
POST https://api.convoso.com/v1/status/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&query=completed
```

#### Response Example

```json
{
  "data": [
    {
      "status": "COMP",
      "name": "Completed",
      "final": "Y",
      "reached": "Y",
      "success": "Y",
      "dnc": "N",
      "callback": "N",
      "contact": "Y",
      "voicemail": "N",
      "workflow_disposition_event_option": "sale",
      "custom_status": false,
      "hex_color": "#00AA00"
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| status | string | Status code (abbreviation) |
| name | string | Full status name |
| final | string | Is final status: Y or N |
| reached | string | Contact reached: Y or N |
| success | string | Successful outcome: Y or N |
| dnc | string | Add to DNC: Y or N |
| callback | string | Allow callbacks: Y or N |
| contact | string | Contact type: Y or N |
| voicemail | string | Is voicemail: Y or N |
| workflow_disposition_event_option | string | Workflow disposition type |
| custom_status | boolean | Is custom-created status |
| hex_color | string | Display color in hex format |

#### Field Definitions

**final:** Cannot be changed after assignment (final disposition)

**reached:** Contact actually spoke with someone

**success:** Positive outcome (sale, qualified, interested)

**dnc:** Automatically add to Do-Not-Call list

**callback:** Can create callback from this status

**contact:** Was contact established

**voicemail:** Message left on voicemail

#### Search Examples

**Find status by code:**
```
POST /status/search
- query: COMP
→ Returns Completed status
```

**Find status by name:**
```
POST /status/search
- query: No Answer
→ Returns NO_ANSWER status
```

**Case-insensitive search:**
```
POST /status/search
- query: completed
→ Returns COMP status
```

---

### Status—Update

Update existing lead status.

**Endpoint:** `POST /status/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| status | string | Yes | Status code to update |
| name | string | No | Status name |
| hex_color | string | No | Display color in hex format (do not include #, e.g. 6711d1) |
| final | string | No | Is final status: Y or N |
| reached | string | No | Contact reached: Y or N |
| success | string | No | Successful outcome: Y or N |
| dnc | string | No | Add to DNC: Y or N |
| callback | string | No | Allow callbacks: Y or N |
| contact | string | No | Contact type: Y or N |
| voicemail | string | No | Is voicemail: Y or N |

**Note:** Only custom statuses can be modified

#### Request Examples

```
POST https://api.convoso.com/v1/status/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=COMP&name=Completed%20Sale&hex_color=%2300AA00
```

```
POST https://api.convoso.com/v1/status/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=NA&final=Y&reached=N&dnc=N&callback=Y
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "status": "COMP"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| data | object | Response data |
| data.status | string | Updated status code |

#### Color Format

Hex color format for display:
- Format: #RRGGBB
- Example: #00AA00 (green), #FF0000 (red), #0000FF (blue)
- Common status colors:
  - Green (#00AA00): Success
  - Red (#FF0000): Failed/Error
  - Yellow (#FFAA00): Pending
  - Blue (#0000FF): Action needed

#### Boolean Field Values

| Value | Meaning |
|-------|---------|
| Y | Yes/True/Enabled |
| N | No/False/Disabled |

#### Status Update Error Codes

| Code | Error |
|------|-------|
| 6069 | Missing or Invalid Status Abbreviation. Only custom statuses can be modified |
| 6071 | Final option cannot be set to empty |
| 6072 | Reached option cannot be set to empty |
| 6073 | Success option cannot be set to empty |
| 6074 | DNC option cannot be set to empty |
| 6075 | Callback option cannot be set to empty |
| 6076 | Contact option cannot be set to empty |
| 6077 | Voicemail option cannot be set to empty |
| 6078 | HEX color defined is invalid |

---

### Status—Insert

Create new lead status.

**Endpoint:** `POST /status/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| status | string | Yes | Status code (2-6 characters) |
| name | string | Yes | Status name |
| hex_color | string | No | Display color in hex format (do not include #, e.g. 6711d1) |
| final | string | Yes | Is final status: Y or N |
| reached | string | Yes | Contact reached: Y or N |
| success | string | Yes | Successful outcome: Y or N |
| dnc | string | Yes | Add to DNC: Y or N |
| callback | string | Yes | Allow callbacks: Y or N |
| contact | string | Yes | Contact type: Y or N |
| voicemail | string | Yes | Is voicemail: Y or N |

#### Request Example

```
POST https://api.convoso.com/v1/status/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&status=SALE&name=Sale%20Made&hex_color=%2300AA00&final=Y&reached=Y&success=Y&dnc=N&callback=N&contact=Y&voicemail=N
```

#### Response Example

```json
{
  "success": true,
  "code": 200,
  "data": {
    "new": "1",
    "status": "SALE"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status |
| code | integer | Response code (200 for success) |
| data | object | Response data |
| data.new | string | "1" if new status created |
| data.status | string | Status code of new status |

#### Status Insert Error Codes

| Code | Error |
|------|-------|
| 6060 | Missing Status Description |
| 6061 | Missing or Invalid Status Abbreviation (alphanumeric, 2-6 chars) |
| 6062 | Missing or Invalid Final option |
| 6063 | Missing or Invalid Reached option |
| 6064 | Missing or Invalid Success option |
| 6065 | Missing or Invalid DNC option |
| 6066 | Missing or Invalid Callback option |
| 6067 | Missing or Invalid Contact option |
| 6068 | Missing or Invalid Voicemail option |
| 6078 | HEX color defined is invalid (do not include #) |

#### Status Code Requirements

- **Length:** 2-6 characters
- **Format:** Alphanumeric (letters, numbers)
- **Case:** Typically uppercase
- **Unique:** Must be unique within system
- **Examples:** COMP, NA, BUSY, SALE, DNC_REQ

#### Creating Custom Status Example

**New Status: Premium Lead**
```
POST /status/insert
- status: PREMIUM
- name: Premium Qualified Lead
- final: N
- reached: Y
- success: Y
- dnc: N
- callback: Y
- contact: Y
- voicemail: N
- hex_color: #0000FF
```

Creates new status that:
- Marks lead as reached/qualified
- Considers it successful
- Allows future callbacks
- Doesn't auto-DNC
- Displays in blue

---

## Standard Status Examples

### Successful Contact

**Status: COMP (Completed/Sale)**
- final: Y
- reached: Y
- success: Y
- dnc: N
- callback: N
- contact: Y
- voicemail: N

### No Answer

**Status: NA (No Answer)**
- final: N
- reached: N
- success: N
- dnc: N
- callback: Y
- contact: N
- voicemail: N

### Answering Machine

**Status: AM (Answering Machine)**
- final: N
- reached: N
- success: N
- dnc: N
- callback: Y
- contact: N
- voicemail: Y

### Do Not Call Request

**Status: DNC (Do Not Call)**
- final: Y
- reached: Y
- success: N
- dnc: Y
- callback: N
- contact: Y
- voicemail: N

### Busy/Invalid

**Status: BUSY (Busy Signal)**
- final: N
- reached: N
- success: N
- dnc: N
- callback: Y
- contact: N
- voicemail: N

---

## Status Workflow Example

### Lead Journey Through Statuses

```
Lead Created
    ↓ (Initial attempt)
NO_ANSWER
    ↓ (2nd attempt)
ANSWERING_MACHINE
    ↓ (3rd attempt)
COMPLETED (reaches person)
    ↓ (After conversation)
INTERESTED (wants callback)
    ↓ (Create callback)
COMPLETED_CALLBACK (callback occurs)
    ↓ (Result)
SALE (deal made)
```

---

## Status Best Practices

1. **Clear Naming:** Use descriptive, unambiguous names
2. **Consistent Codes:** Keep codes consistent across campaigns
3. **Document Purpose:** Include description in name
4. **Color Coding:** Use distinct colors for different outcomes
5. **DNC Settings:** Carefully configure auto-DNC settings
6. **Callback Settings:** Only allow callbacks for appropriate statuses
7. **Testing:** Test custom statuses before campaign launch

---

## Common Status Codes

| Code | Name | Final | Reached | Success |
|------|------|-------|---------|---------|
| COMP | Completed | Y | Y | Y |
| SALE | Sale | Y | Y | Y |
| NA | No Answer | N | N | N |
| BUSY | Busy | N | N | N |
| AM | Answering Machine | N | N | N |
| DNC | Do Not Call | Y | Y | N |
| WN | Wrong Number | Y | N | N |
| INVALID | Invalid | Y | N | N |
| INTERESTED | Interested | N | Y | Y |
| NOTINT | Not Interested | Y | Y | N |

---

## Error Handling

All status operations return errors in the following format:

```json
{
  "success": false,
  "code": <error_code>,
  "error": "<error_message>"
}
```

### Status Insert Errors

| Code | Error |
|------|-------|
| 6060 | Missing Status Description |
| 6061 | Missing or Invalid Status Abbreviation (alphanumeric, 2-6 chars) |
| 6062 | Missing or Invalid Final option |
| 6063 | Missing or Invalid Reached option |
| 6064 | Missing or Invalid Success option |
| 6065 | Missing or Invalid DNC option |
| 6066 | Missing or Invalid Callback option |
| 6067 | Missing or Invalid Contact option |
| 6068 | Missing or Invalid Voicemail option |
| 6078 | HEX color defined is invalid (do not include #) |

### Status Update Errors

| Code | Error |
|------|-------|
| 6069 | Missing or Invalid Status Abbreviation. Only custom statuses can be modified |
| 6071 | Final option cannot be set to empty |
| 6072 | Reached option cannot be set to empty |
| 6073 | Success option cannot be set to empty |
| 6074 | DNC option cannot be set to empty |
| 6075 | Callback option cannot be set to empty |
| 6076 | Contact option cannot be set to empty |
| 6077 | Voicemail option cannot be set to empty |
| 6078 | HEX color defined is invalid |

### General Errors

| Error | Response |
|-------|----------|
| Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| Status not found | `{"success": false, "error": "Status not found"}` |
| Duplicate status code | `{"success": false, "error": "Status code already exists"}` |

---

## Integration with Leads

When updating leads:

```
POST /leads/update
- lead_id: 12345
- status: COMP
```

Lead assigned to COMP status with all configured properties

---

## Related Endpoints

- [Leads API](./leads.md) - Assign status to leads
- [Call Logs API](./call-logs.md) - Status on call logs
- [Callbacks API](./callbacks.md) - Status-based callback creation

---

**Last Updated:** 2026-03-03
