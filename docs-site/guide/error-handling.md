---
title: Error Handling
---

# Error Handling

The SDK provides two typed error classes for distinct failure modes, plus a built-in error code lookup table covering all known Convoso API error codes.

## Error Class Hierarchy

```
Error
└── ConvosoError
    ├── ConvosoApiError    — API returned success: false
    └── ConvosoHttpError   — Non-2xx HTTP status
```

All error classes are exported from the package:

```typescript
import { ConvosoError, ConvosoApiError, ConvosoHttpError } from 'convoso-js';
```

## ConvosoApiError

Thrown when the API returns HTTP 200 but the response body contains `success: false`. This is how Convoso signals business logic errors (invalid IDs, missing fields, duplicates, etc.).

| Property | Type | Description |
|---|---|---|
| `message` | `string` | Error message from the API |
| `code` | `number` | Numeric error code |
| `body` | `unknown` | Full response body |
| `description` | `string \| undefined` | Human-readable description from the error code table |

```typescript
import { ConvosoApiError } from 'convoso-js';

try {
  await client.leads.insert({
    list_id: '999',
    phone_number: '5551234567',
  });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    console.error(`Code: ${err.code}`);           // e.g. 6002
    console.error(`Message: ${err.message}`);      // e.g. "No such list"
    console.error(`Description: ${err.description}`); // e.g. "No such list"
    console.error(`Body:`, err.body);              // Full API response
  }
}
```

### The `.description` Getter

`ConvosoApiError` includes a `.description` getter that looks up the error code in the SDK's built-in table. This is useful because API error messages can sometimes be cryptic or inconsistent:

```typescript
catch (err) {
  if (err instanceof ConvosoApiError) {
    // .description returns undefined for unknown codes
    const msg = err.description ?? err.message;
    console.error(`Failed: ${msg} (code ${err.code})`);
  }
}
```

## ConvosoHttpError

Thrown when the server returns a non-2xx HTTP status code (network errors, server outages, etc.).

| Property | Type | Description |
|---|---|---|
| `message` | `string` | `"HTTP {status}: {statusText}"` |
| `status` | `number` | HTTP status code |
| `statusText` | `string` | HTTP status text |
| `body` | `string` | Raw response body text |

```typescript
import { ConvosoHttpError } from 'convoso-js';

try {
  await client.leads.search({ list_id: '333' });
} catch (err) {
  if (err instanceof ConvosoHttpError) {
    console.error(`HTTP ${err.status}: ${err.statusText}`);
    console.error(`Response: ${err.body}`);
  }
}
```

## Catching Both Error Types

Use `instanceof` checks to handle each error type differently:

```typescript
import { ConvosoApiError, ConvosoHttpError } from 'convoso-js';

try {
  await client.leads.insert({ list_id: '333', phone_number: '5551234567' });
} catch (err) {
  if (err instanceof ConvosoApiError) {
    // Business logic error (bad input, not found, duplicate, etc.)
    console.error(`API Error ${err.code}: ${err.description ?? err.message}`);
  } else if (err instanceof ConvosoHttpError) {
    // Infrastructure error (server down, rate limited, etc.)
    console.error(`HTTP ${err.status}: ${err.statusText}`);
  } else {
    // Network error, DNS failure, etc.
    throw err;
  }
}
```

## Error Code Table

All known Convoso API error codes with their descriptions. The SDK includes these as `CONVOSO_ERROR_CODES` and uses them to power `ConvosoApiError.description`.

```typescript
import { CONVOSO_ERROR_CODES } from 'convoso-js';
```

| Code | Description |
|---|---|
| `4001` | Missing required field |
| `4002` | Field must be numeric |
| `6000` | Invalid phone number |
| `6001` | Record not found |
| `6002` | No such list |
| `6003` | Missing required name |
| `6004` | Unknown or invalid ID |
| `6005` | Missing required user(s) |
| `6006` | Invalid user or phone |
| `6007` | Missing required field or duplicate entry |
| `6008` | Invalid or duplicate phone number |
| `6009` | Phone number already exists |
| `6012` | User is not logged in |
| `6023` | Required fields are missing |
| `6026` | Invalid campaign ID or country code |
| `6031` | Invalid date format |
| `6032` | Missing call log ID |
| `6033` | No such call log |
| `6036` | Either revenue or return must have a value |
| `6041` | Invalid queue ID |
| `6042` | Invalid list ID |
| `6046` | List name too short (min 10 characters) |
| `6050` | Invalid status |
| `6056` | Missing or invalid ID value |
| `6057` | Invalid reason provided |
| `6058` | Invalid purpose provided |
| `6059` | Combination already exists or update failed |
| `6060` | Invalid or missing call log / status ID |
| `6061` | Not found or invalid abbreviation |
| `6062` | Invalid final option or extra field validation error |
| `6063` | Missing or invalid reached option |
| `6064` | Missing or invalid success option |
| `6065` | Missing or invalid DNC option |
| `6066` | Missing or invalid callback option |
| `6067` | Missing or invalid contact option |
| `6068` | Missing or invalid voicemail option |
| `6069` | Only custom statuses can be modified |
| `6070` | Invalid lead or callback ID |
| `6071` | Record not found or option cannot be empty |
| `6072` | Invalid timezone or option cannot be empty |
| `6073` | Invalid callback ID or option cannot be empty |
| `6074` | Callback not found or option cannot be empty |
| `6075` | Callback option cannot be empty |
| `6076` | Contact option cannot be empty |
| `6077` | Voicemail option cannot be empty |
| `6078` | Invalid HEX color (do not include #) |
| `6079` | Invalid email address |
| `6080` | Invalid status value or missing purpose field |
| `6081` | List name must be unique |
| `6090` | Invalid criteria key |
| `7231` | Invalid offset value |
| `7258` | Invalid limit value |

::: tip
Some error codes are context-dependent. For example, `6004` may mean "Unknown Campaign ID" or "Invalid phone number format" depending on the endpoint. The descriptions above reflect the most common interpretation.
:::
