---
title: Revenue API
---

# Revenue API

Revenue tracking and updates for call logs.

## Endpoints

### Revenue API

Update revenue for a call log entry.

**Endpoint:** `POST /revenue/update`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| call_log_id | string | Yes | ID of the call log to update |
| revenue | number | No | Revenue amount (double/decimal) |
| return | integer | No | Return updated data: 1 for yes, 0 for no |

#### Request Example

```
POST https://api.convoso.com/v1/revenue/update
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&call_log_id=100125&revenue=150.50&return=1
```

#### Response Example

```json
{
  "success": true,
  "data": {
    "call_log_id": "100125"
  }
}
```

#### Response Example (with return=1)

```json
{
  "success": true,
  "data": {
    "call_log_id": "100125",
    "revenue": 150.50,
    "lead_id": "12345",
    "campaign_id": "111",
    "call_date": "2026-03-03 14:30:00",
    "status": "COMPLETED"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Success status of update |
| data | object | Response data |
| data.call_log_id | string | Updated call log ID |
| data.revenue | number | Revenue amount (if return=1) |
| data.lead_id | string | Associated lead ID (if return=1) |
| data.campaign_id | string | Associated campaign ID (if return=1) |
| data.call_date | string | Call timestamp (if return=1) |
| data.status | string | Call status (if return=1) |

#### Revenue Field

- **Type:** Decimal/double
- **Precision:** Typically 2 decimal places (cents)
- **Examples:** 100.00, 150.50, 1250.99
- **Optional:** Can be omitted to clear revenue

#### Return Parameter

| Value | Behavior |
|-------|----------|
| 1 | Return full updated call log with revenue |
| 0 or omitted | Return only success status |

#### Use Cases

1. **Commission Tracking:** Record commission per call
2. **Revenue Attribution:** Track revenue by call/lead
3. **Performance Metrics:** Calculate ROI per agent/campaign
4. **Reporting:** Generate revenue reports
5. **Integration:** Update revenue from third-party systems
6. **Reconciliation:** Sync revenue from backend billing

#### Revenue Examples

**Sales call with commission:**
```
call_log_id: 100125
revenue: 500.00  (sale amount)
→ Agent gets commission based on revenue
```

**Lead generation:**
```
call_log_id: 100126
revenue: 25.00   (lead value)
→ Track value of each generated lead
```

**Service call:**
```
call_log_id: 100127
revenue: 75.50   (service charge)
→ Record service fees collected
```

**No sale:**
```
call_log_id: 100128
revenue: 0.00    (no revenue)
→ Track calls without revenue
```

#### Revenue Reporting

Common revenue metrics from updated logs:

**By Agent:**
```
SELECT agent, SUM(revenue) as total_revenue, COUNT(*) as calls
FROM call_logs
WHERE revenue > 0
GROUP BY agent
```

**By Campaign:**
```
SELECT campaign, SUM(revenue) as total, AVG(revenue) as avg_per_call
FROM call_logs
WHERE campaign_id = '111'
```

**Revenue Per Hour:**
```
SELECT DATE(call_date), SUM(revenue), COUNT(*)
FROM call_logs
GROUP BY DATE(call_date)
ORDER BY DATE(call_date)
```

#### Workflow Example

**Sales call processing:**

1. Agent completes call
   ```
   call_log_id: 100125
   status: COMPLETED
   ```

2. System creates call log (auto-created by system)

3. Sales system confirms sale amount: $500
   ```
   POST /revenue/update
   - call_log_id: 100125
   - revenue: 500.00
   ```

4. Revenue now tracked on call log
   - Agent commission calculated
   - Campaign ROI updated
   - Revenue reports generated

#### Batch Revenue Update (Python)

```python
import requests
import csv

# Read sales data
with open('sales_reconciliation.csv') as f:
    reader = csv.DictReader(f)
    sales = list(reader)

# Update revenue for each call
for sale in sales:
    response = requests.post(
        'https://api.convoso.com/v1/revenue/update',
        data={
            'auth_token': token,
            'call_log_id': sale['call_log_id'],
            'revenue': float(sale['amount']),
            'return': 1  # Get confirmation back
        }
    )

    if response.json()['success']:
        print(f"Updated call {sale['call_log_id']}: ${sale['amount']}")
    else:
        print(f"Failed to update call {sale['call_log_id']}")
```

#### Revenue Integration Pattern

```
Third-party system (CRM, billing, sales system)
    ↓
Event: Sale confirmed
    ↓
Extract: call_log_id, revenue_amount
    ↓
POST /revenue/update
    ↓
Call log updated with revenue
    ↓
Reports reflect new revenue
```

#### Clear Revenue

To clear/remove revenue from a call:

```
POST /revenue/update
- call_log_id: 100125
- (omit revenue parameter)
→ Revenue cleared from log
```

#### Time Considerations

- Revenue can be updated anytime after call
- No time limit on when revenue can be set
- Updates override previous revenue
- Historical records maintained (updates tracked)
- Useful for delayed billing/commission reconciliation

#### Accuracy Requirements

- Ensure call_log_id is correct before updating
- Verify revenue amount matches source
- Consider rounding rules (nearest cent)
- Test with sample calls first
- Implement audit trail for changes

#### Related Calculations

**Agent Commission:**
```
Commission = Revenue * Commission_Rate
Example: $500 * 20% = $100
```

**Campaign ROI:**
```
ROI = (Total_Revenue - Campaign_Cost) / Campaign_Cost * 100
Example: ($5000 - $2000) / $2000 * 100 = 150%
```

**Cost Per Sale:**
```
CPS = Total_Campaign_Cost / Number_of_Sales
Example: $2000 / 20 sales = $100 per sale
```

**Average Revenue Per Call:**
```
ARPC = Total_Revenue / Total_Calls
Example: $5000 / 100 calls = $50 per call
```

#### Error Handling

| Error Code | Issue |
|-----------|-------|
| 6032 | Missing Call Log ID |
| 6033 | No such Call Log |
| 6036 | Either Revenue or Return need to have value |

#### Notes

- Revenue field is optional (can be null/empty)
- Updates are immediate and permanent
- No approval workflow required
- Can update revenue multiple times (last value wins)
- Revenue used in reporting and analytics
- Consider storing original and updated values separately if audit trail needed

---

## Related Endpoints

- [Call Logs API](./call-logs.md) - View call log details
- [Agent Performance API](./agent-performance.md) - Performance metrics
- [Campaigns API](./campaigns.md) - Campaign revenue totals

---

**Last Updated:** 2026-03-03
