---
title: Authentication
description: Convoso API authentication — obtaining auth tokens, security best practices, and request examples in multiple languages.
---

# Authentication

All Convoso API endpoints require authentication via an `auth_token` parameter.

## Overview

The Convoso API uses token-based authentication. Every request must include a valid `auth_token` query parameter that identifies and authenticates the request.

## Obtaining an Auth Token

Auth tokens are generated through your Convoso account dashboard:

1. Log in to your Convoso account
2. Navigate to Settings > API Tokens or Authorization Tokens section
3. Create a new token with an appropriate name and permissions
4. Copy the token (you will only see it once)
5. Store it securely

## Using Auth Tokens

Include the `auth_token` in every API request as a query parameter:

### Request Example

```
POST https://api.convoso.com/v1/campaigns/search
Content-Type: application/x-www-form-urlencoded

auth_token=your_token_here
```

### Request with Body Example

```
POST https://api.convoso.com/v1/leads/insert
Content-Type: application/x-www-form-urlencoded

auth_token=your_token_here&list_id=123&phone_number=5551234567&first_name=John
```

## Token Security Best Practices

1. **Keep tokens private** - Never commit tokens to version control
2. **Use environment variables** - Store tokens in environment variables or secure configuration
3. **Rotate regularly** - Periodically generate new tokens and retire old ones
4. **Restrict permissions** - Create tokens with minimal necessary permissions
5. **Monitor usage** - Review token usage and access logs regularly
6. **Regenerate if compromised** - Immediately regenerate tokens if you suspect compromise

## Token Management

### Creating Multiple Tokens

You can create multiple tokens for different purposes:
- **Production token** - For live application integration
- **Development token** - For testing and development
- **Integration token** - For third-party service integrations
- **Reporting token** - For read-only reporting access

### Revoking Tokens

To revoke a token:
1. Log in to your Convoso account
2. Navigate to Settings > API Tokens
3. Click the delete/revoke button next to the token
4. Confirm revocation

Revoked tokens will immediately stop working for new requests.

## Token Scope and Permissions

Tokens inherit permissions based on the user account that created them. Ensure your account has the necessary permissions for the operations you need to perform via the API.

**Permission categories:**
- Lead management (create, read, update, delete)
- Campaign access (view, modify)
- Call log access (view, modify)
- Agent monitoring (view)
- Reporting (generate, download)

## Error Handling

### Missing Auth Token

If you forget to include the auth_token:

**Response:**
```json
{
  "success": false,
  "error": "Missing authentication token"
}
```

### Invalid Auth Token

If your token is invalid or expired:

**Response:**
```json
{
  "success": false,
  "error": "Invalid or expired authentication token"
}
```

### Insufficient Permissions

If your token doesn't have permission for an operation:

**Response:**
```json
{
  "success": false,
  "error": "Insufficient permissions for this operation"
}
```

## Token Expiration

- Default expiration: Per your account settings
- Regenerate before expiration to avoid service disruption
- Check the token's expiration date in the dashboard

## API Key vs Auth Token

Convoso uses auth tokens (not API keys). Each token:
- Is unique to your account
- Can be regenerated independently
- Inherits account permissions
- Can be revoked immediately
- Should be treated as sensitive credentials

## Examples

### cURL Example

```bash
curl -X POST "https://api.convoso.com/v1/campaigns/search" \
  -d "auth_token=YOUR_TOKEN_HERE"
```

### Python Example

```python
import requests

auth_token = "YOUR_TOKEN_HERE"
url = "https://api.convoso.com/v1/campaigns/search"
data = {"auth_token": auth_token}

response = requests.post(url, data=data)
result = response.json()
```

### JavaScript Example

```javascript
const authToken = "YOUR_TOKEN_HERE";
const url = "https://api.convoso.com/v1/campaigns/search";

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: `auth_token=${authToken}`
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### PHP Example

```php
<?php
$auth_token = "YOUR_TOKEN_HERE";
$url = "https://api.convoso.com/v1/campaigns/search";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(['auth_token' => $auth_token]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
?>
```

## Environment Variables

### Recommended Setup

Store your auth token in an environment variable:

**Bash/Linux/Mac:**
```bash
export CONVOSO_AUTH_TOKEN="your_token_here"
```

**Windows (PowerShell):**
```powershell
$env:CONVOSO_AUTH_TOKEN = "your_token_here"
```

**Python:**
```python
import os
auth_token = os.getenv("CONVOSO_AUTH_TOKEN")
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Token not working | Verify token is correct, hasn't expired, and has proper permissions |
| "Invalid authentication token" | Regenerate token, check for typos |
| "Insufficient permissions" | Verify user account has required permissions; use account with higher privileges |
| Token expired | Generate new token from dashboard |
| All requests returning 401 | Check token immediately; may be revoked or expired |

## Rate Limiting and Quotas

Your Convoso account may have rate limits. Refer to your account settings for:
- Requests per minute
- Requests per day
- Concurrent request limits
- Specific endpoint quotas

Contact Convoso support for quota increases if needed.

## Support

For authentication-related issues or to reset your auth token:
1. Log in to your Convoso account
2. Contact support through the dashboard
3. Verify your identity
4. Request token reset if necessary

---

**Note:** All API endpoints require authentication. See individual endpoint documentation for specific parameter requirements and usage examples.
