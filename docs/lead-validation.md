---
title: Lead Validation API
---

# Lead Validation API

Validate leads against criteria without full insertion.

## Endpoints

### Lead Validation API

Validate if a lead meets criteria without full insert operation.

**Endpoint:** `POST /lead-validation/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| criteria_key | string | Yes | Criteria key for validation |
| phone_number | string | Yes | Phone number to validate |
| state | string | No | State code for validation |
| postal_code | string | No | Postal code for validation |

#### Request Examples

```
POST https://api.convoso.com/v1/lead-validation/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&criteria_key=sales_leads&phone_number=5551234567
```

```
POST https://api.convoso.com/v1/lead-validation/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&criteria_key=us_only&phone_number=5551234567&state=CA&postal_code=90210
```

#### Response Example - Accepted

```json
{
  "success": true,
  "result": "Accepted"
}
```

#### Response Example - Denied

```json
{
  "success": true,
  "result": "Denied"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Operation completed (doesn't mean lead is accepted) |
| result | string | "Accepted" or "Denied" |

#### Result Values

| Result | Meaning |
|--------|---------|
| Accepted | Lead meets all criteria requirements |
| Denied | Lead does not meet criteria requirements |

#### Criteria Keys

Criteria keys are pre-configured validation rules. Available keys depend on your account configuration:

- `sales_leads` - Sales campaign requirements
- `support_leads` - Support inquiry requirements
- `survey_leads` - Survey participant requirements
- `retention_leads` - Customer retention requirements
- `us_only` - United States only
- `premium_leads` - High-value lead requirements

Contact your account manager for complete list and specifications.

#### Common Validation Rules

Criteria may validate against:

1. **Geography:** State, country, postal code ranges
2. **Demographics:** Age, gender, income range
3. **Phone Type:** Wireless, landline, VoIP, carrier
4. **Data Quality:** Phone format, do-not-call list
5. **Custom Rules:** Business-specific criteria

#### Use Cases

1. **Pre-validation:** Check if lead qualifies before expensive enrichment
2. **Filtering:** Identify valid leads from raw data
3. **Quality Gate:** Ensure data meets standards before processing
4. **API Testing:** Verify criteria configuration
5. **Integration:** Check compatibility before submitting to campaign
6. **Compliance:** Verify leads meet regulatory requirements
7. **Cost Optimization:** Avoid processing invalid leads

#### Validation Flow Example

**Scenario: Bulk lead source validation**

```
1. Receive leads from external source
2. FOR EACH lead:
   a. Call /lead-validation/search
   b. Check if result = "Accepted"
   c. If accepted: Send to /lead-post-validation/insert or /leads/insert
   d. If denied: Log rejection, skip lead
3. Report acceptance rate to source
```

#### Comparison with Lead Post API

| Aspect | Lead Validation | Lead Post |
|--------|-----------------|-----------|
| Purpose | Check only | Check and insert |
| Insertion | No lead created | Lead created if accepted |
| Return value | Accepted/Denied | Accepted/Denied with lead_id |
| Use when | Pre-checking data | Ready to create leads |
| Performance | Faster (no insert) | Slower (includes insert) |

#### Validation Example

**Scenario: Geography-based criteria**

```
Criteria Key: "california_leads"
Rules: Must be California resident (state=CA)

Request 1:
- phone: 5551234567
- state: CA
→ Result: Accepted ✓

Request 2:
- phone: 5559876543
- state: TX
→ Result: Denied ✗

Request 3:
- phone: 5551111111
- state: CA
→ Result: Accepted ✓
```

#### Optional Parameters

Use optional parameters for more specific validation:

```
Criteria Key: "location_income"
Rules: CA/TX/FL + household income $50k+

Request without postal/state:
POST /lead-validation/search
auth_token=abc123&criteria_key=location_income&phone_number=5551234567
→ Result: Accepted (if phone passes general criteria)

Request with postal code:
POST /lead-validation/search
auth_token=abc123&criteria_key=location_income&phone_number=5551234567&postal_code=90210
→ Result: Accepted (if postal code in allowed zip ranges)

Request with state:
POST /lead-validation/search
auth_token=abc123&criteria_key=location_income&phone_number=5551234567&state=CA
→ Result: Accepted (if state matches criteria)
```

#### Batch Validation Pattern

```python
import requests
import csv

# Read lead file
with open('leads.csv') as f:
    reader = csv.DictReader(f)
    leads = list(reader)

# Validate each lead
valid_leads = []
invalid_leads = []

for lead in leads:
    response = requests.post(
        'https://api.convoso.com/v1/lead-validation/search',
        data={
            'auth_token': token,
            'criteria_key': 'sales_leads',
            'phone_number': lead['phone'],
            'state': lead.get('state'),
            'postal_code': lead.get('zip')
        }
    ).json()

    if response['result'] == 'Accepted':
        valid_leads.append(lead)
    else:
        invalid_leads.append(lead)

# Report results
print(f"Valid: {len(valid_leads)}, Invalid: {len(invalid_leads)}")
print(f"Acceptance Rate: {len(valid_leads) / len(leads) * 100:.1f}%")

# Optional: Insert valid leads
for lead in valid_leads:
    requests.post(
        'https://api.convoso.com/v1/leads/insert',
        data={
            'auth_token': token,
            'list_id': '333',
            'phone_number': lead['phone'],
            'first_name': lead.get('first_name'),
            'last_name': lead.get('last_name'),
            'state': lead.get('state')
        }
    )
```

#### Key Differences from Lead Post

**Lead Validation:**
- Read-only operation
- No side effects
- Lightweight check
- Return: Accepted/Denied
- Use: Pre-screening

**Lead Post:**
- Creates lead if accepted
- Has side effect (inserts)
- Heavier operation
- Return: Accepted with lead_id or Denied with reason
- Use: When ready to import

#### Performance Notes

- Validation is fast (50-200ms typical)
- Can batch multiple validation requests
- No rate limiting concerns for validation calls
- Results cached per criteria_key
- Consider local caching of results if repeated checks

#### Error Handling

| Code | Issue | Response |
|------|-------|----------|
| 6004 | Invalid phone number format | `{"success": false, "error_code": 6004, "error": "Invalid phone number format"}` |
| 6090 | Invalid criteria key | `{"success": false, "error_code": 6090, "error": "Invalid criteria key"}` |
| - | Invalid auth_token | `{"success": false, "error": "Invalid authentication token"}` |
| - | Missing phone_number | `{"success": false, "error": "phone_number required"}` |
| - | Invalid state code | State ignored (optional parameter) |

#### Typical Results

Most validation will return one of:

1. **Accepted:** Lead meets all criteria
2. **Denied:** Lead fails one or more criteria

Contact Convoso support if you're unsure why a lead is accepted/denied.

#### Troubleshooting

| Scenario | Solution |
|----------|----------|
| All leads denied | Verify criteria_key is correct for your campaign |
| Unexpected denials | Check optional parameters (state, postal_code) |
| Need to know why denied | Use Lead Post API which returns error description |
| Performance slow | Validate in batches, consider caching results |

#### Notes

- Validation does NOT check DNC list (use DNC search separately)
- Validation does NOT create duplicate checking
- Result is immediate (no async processing)
- Different criteria_key will have different rules
- State/postal_code are optional enhancements

---

## Related Endpoints

- [Lead Post API](./lead-post.md) - Validate and insert leads
- [Leads API](./leads.md) - Direct lead insertion
- [DNC API](./dnc.md) - Check do-not-call status

---

**Last Updated:** 2026-03-03
