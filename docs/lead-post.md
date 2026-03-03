---
title: Lead Post API
description: Convoso Lead Post API reference — insert leads with criteria-based validation for quality control.
---

# Lead Post API

Insert leads with criteria-based validation.

## Endpoints

### Lead Post API

Insert lead with criteria validation using criteria_key.

**Endpoint:** `POST /lead-post-validation/insert`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| criteria_key | string | Yes | Criteria key for validation |
| phone_number | string | Yes | Phone number to validate and insert |
| phone_code | string | No | Country phone code |
| status | string | No | Lead status code |
| created_by | string | No | Creator identifier |
| email | string | No | Email address |
| last_modified_by | string | No | Last modifier identifier |
| owner_id | string | No | Owner user ID |
| first_name | string | No | First name |
| last_name | string | No | Last name |
| alt_phone_1 | string | No | Alternate phone 1 |
| alt_phone_2 | string | No | Alternate phone 2 |
| address1 | string | No | Street address |
| address2 | string | No | Address line 2 |
| city | string | No | City |
| state | string | No | State/Province |
| province | string | No | Province |
| postal_code | string | No | Postal code |
| country | string | No | Country code |
| gender | string | No | Gender |
| date_of_birth | string | No | Date of birth (YYYY-MM-DD) |
| std_company_name | string | No | Standard company name |
| std_consumer_number | string | No | Standard consumer number |
| std_account_number | string | No | Standard account number |
| notes | string | No | Lead notes |
| monthly_revenue | string | No | Monthly revenue amount |
| annual_revenue | string | No | Annual revenue amount |
| title | string | No | Contact title |
| business_name | string | No | Business name |
| dba | string | No | Doing Business As name |
| industry | string | No | Industry classification |
| start_date | string | No | Start date |
| [custom_fields] | string | No | Customer-defined fields as per criteria |

#### Request Example

```
POST https://api.convoso.com/v1/lead-post-validation/insert
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&criteria_key=sales_leads&phone_number=5551234567&first_name=John&last_name=Doe&email=john@example.com
```

#### Response Example - Accepted

```json
{
  "result": true,
  "lead_id": "12345"
}
```

#### Response Example - Rejected

```json
{
  "result": false,
  "error_description": "Lead does not meet age criteria"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| result | boolean | true if lead accepted, false if rejected |
| lead_id | string | ID of created lead (if accepted) |
| error_description | string | Reason for rejection (if rejected) |

#### Criteria Keys

Criteria keys are pre-configured validation rules set up in your Convoso account. Common examples:

| Key | Purpose | Common Rules |
|-----|---------|--------------|
| sales_leads | Sales campaign validation | Age, location, income |
| support_leads | Support inquiry validation | Contact info, issue type |
| survey_leads | Survey participant validation | Demographics, availability |
| retention_leads | Customer retention validation | Account status, tenure |

Contact your Convoso account manager for available criteria keys.

#### Validation Rules

When you POST a lead, the system:

1. **Validates** the phone number format and DNC status
2. **Checks criteria** against the criteria_key rules
3. **Accepts or rejects** based on criteria match
4. **Creates lead** only if accepted
5. **Returns result** with lead_id or error reason

#### Acceptance Criteria Examples

**Example 1: Geography Filter**
- Criteria Key: "us_only"
- Rules: State must be CA, TX, FL, or NY
- Result:
  - ✓ Phone from CA → Accepted
  - ✗ Phone from WA → Rejected

**Example 2: Age and Income**
- Criteria Key: "premium_leads"
- Rules: Age 25-65, Income $50k+, Not in DNC
- Result:
  - ✓ 45 years old, $75k income → Accepted
  - ✗ 18 years old, $30k income → Rejected

**Example 3: Telecom Type**
- Criteria Key: "wireless_only"
- Rules: Must be wireless carrier
- Result:
  - ✓ Verizon wireless number → Accepted
  - ✗ Landline number → Rejected

#### Common Rejection Reasons

| Reason | Description |
|--------|-------------|
| Invalid phone number | Phone format invalid or empty |
| Number in DNC | Phone is on Do-Not-Call list |
| State not allowed | State outside allowed criteria |
| Age requirement not met | Age outside required range |
| Income requirement not met | Income below minimum threshold |
| Incomplete information | Required fields missing |
| Geographic restriction | Country/region not allowed |
| Carrier restriction | Phone carrier doesn't meet criteria |
| Duplicate lead | Lead already exists in system |

#### Custom Fields

The criteria_key may require custom fields. For example:

```
POST /lead-post-validation/insert
- criteria_key: extended_profile
- phone_number: 5551234567
- first_name: John
- last_name: Doe
- annual_income: 75000
- home_value: 350000
- credit_score: 750
```

Custom field names and requirements vary by criteria_key. Contact your account manager for specifications.

#### Use Cases

1. **Lead Validation:** Ensure leads meet campaign requirements before insertion
2. **Quality Control:** Filter leads client-side before bulk import
3. **Compliance:** Enforce regulatory requirements per criteria
4. **Cost Optimization:** Avoid importing non-matching leads
5. **Real-time Ingestion:** Validate and insert leads from external sources
6. **Third-party Integration:** Accept leads from partners with validation

#### Workflow Example

**API-based lead acquisition flow:**

```
1. Third-party source submits lead
2. POST /lead-post-validation/insert with criteria_key
3. System validates against criteria
4. If accepted: Lead added to campaign queue
5. If rejected: Return rejection reason to source
6. Source can resubmit or retry with different data
```

#### Batch Processing Pattern

```python
import requests

leads = [
    {'phone': '5551234567', 'first_name': 'John', 'last_name': 'Doe'},
    {'phone': '5551234568', 'first_name': 'Jane', 'last_name': 'Smith'},
    {'phone': '5551234569', 'first_name': 'Bob', 'last_name': 'Jones'},
]

accepted = []
rejected = []

for lead in leads:
    response = requests.post(
        'https://api.convoso.com/v1/lead-post-validation/insert',
        data={
            'auth_token': token,
            'criteria_key': 'sales_leads',
            'phone_number': lead['phone'],
            'first_name': lead['first_name'],
            'last_name': lead['last_name']
        }
    ).json()

    if response['result']:
        accepted.append(response['lead_id'])
    else:
        rejected.append({
            'phone': lead['phone'],
            'reason': response['error_description']
        })

print(f"Accepted: {len(accepted)}, Rejected: {len(rejected)}")
```

#### Comparison with Standard Lead Insert

| Feature | Post API | Insert API |
|---------|----------|-----------|
| Validation | Required (via criteria_key) | Optional |
| Return accepted/rejected | Yes | No |
| Error description | Detailed | Limited |
| Best for | Selective insertion | Bulk import |
| Processing | Slower (validation) | Faster (direct) |

#### Performance Considerations

- Each request validates against criteria rules
- Validation adds latency (100-500ms typical)
- Batch multiple leads sequentially (not parallel initially)
- Consider rate limits when bulk importing
- Test with small batches first

#### Error Handling

| Issue | Response |
|-------|----------|
| Invalid criteria_key | `{"result": false, "error_description": "Invalid criteria key"}` |
| Invalid phone format | `{"result": false, "error_description": "Invalid phone number"}` |
| Missing required field | `{"result": false, "error_description": "Missing required field: [field]"}` |
| Phone in DNC | `{"result": false, "error_description": "Number in DNC list"}` |
| Criteria not met | `{"result": false, "error_description": "Lead does not meet criteria"}` |

#### Notes

- Criteria keys must be configured in your account first
- Contact Convoso support to set up custom criteria
- Accepted leads are inserted into configured destination
- Validation rules enforced by criteria_key
- Results returned immediately (no async processing)
- Each criteria_key has specific required/optional fields

---

## Related Endpoints

- [Lead Validation API](./lead-validation.md) - Validate without inserting
- [Leads API](./leads.md) - Standard lead insertion
- [Lead Search API](./leads.md) - Search existing leads

---

**Last Updated:** 2026-03-03
