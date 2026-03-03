---
title: Workflow Automation
description: Convoso Connect's event-driven rule engine — event triggers, actions, scheduling, logs, rate limits, and loop protection.
---

# Workflow Automation

**Location:** CRM → Workflow Automation

Workflow Automation is the event-driven rule engine that decides **when** Convoso Connect fires. Each workflow is a self-contained set of conditions (events) and consequences (actions). Multiple events create AND logic — all must match for the workflow to trigger.

## Workflow Settings

| Setting | Description |
|---|---|
| **Relation** | Scopes the workflow: Campaign, List, Queue, Inbound Number, or Email Template |
| **Stop Workflow If** | Cancels pending scheduled actions when: Never / Reached Status / Final Status / Advanced Lead Filter matched |
| **Skip if pending actions** | Skips if the lead already has unexecuted pending actions from this workflow |
| **Enable Schedule** | Restricts the workflow to fire only within a configured time window |
| **Perform Action On** | A/B testing: fires actions on 0–100% of qualifying leads (default 100%) |
| **All Campaigns** | If Yes, applies to all campaigns regardless of the campaigns list |
| **Rate Limit** | System-enforced: skipped if triggered more than 9 times in 3 minutes per lead |

## Event Triggers

Events define what must happen for the workflow to fire. Multiple events can be added — all must match simultaneously (**AND logic**). For OR logic, create separate workflows.

| Event Type | Description |
|---|---|
| **Disposition** | Agent sets a specific call disposition. Select one or more values. |
| **Call Count** | Lead has been called a specific number of times (or within a range). |
| **Call Type** | Call was inbound, outbound, manual, etc. |
| **Callback** | A callback was scheduled for the lead. |
| **Hopper Expired** | Lead's hopper slot expired without being called. |
| **Lead Action** | A specific action was taken on the lead record. |
| **Lead Fields & Call Data** | Lead field values match specified criteria. Rich operators: Is equal to, Is not equal to, Greater/Less than, Within, Starts With, Contains, Is Blank/Empty, Is Numeric, Between Two Strings. |
| **Lead Status** | Lead's status changes to or from a specific value. |
| **Redisposition** | Lead is re-dispositioned after initial setting. |
| **Submitted By** | Filters by who submitted or created the lead. |
| **Term Reason** | Call ended with a specific termination reason. |

::: tip SDK Type Reference
These event types are available as TypeScript constants:
```typescript
import { CONNECT_WORKFLOW_EVENTS } from 'convoso-js';

console.log(CONNECT_WORKFLOW_EVENTS.DISPOSITION);
// "Agent sets a specific call disposition"
```
:::

## Actions

Actions define what Convoso does when events fire. Multiple actions can exist in a single Action Set, and multiple Action Sets can be created with different timing.

| Action Type | Internal Label | Description |
|---|---|---|
| **Convoso Connect** | `INTEGRATION` | Fires an HTTP request to an external endpoint. **The primary CRM integration action.** |
| **Email** | `EMAIL` | Sends a templated email to the lead. |
| **Move** | `MOVE` | Moves the lead to a different list. |
| **Status Change** | `STATUS` | Changes the lead's status/disposition code. |
| **SMS** | `SMS` | Sends an SMS message (requires WA Advanced Mode). |
| **Voice Broadcast** | `VB` | Triggers a voice broadcast to the lead. |
| **Field** | `FIELD` | Updates a lead field value. Supports replace-with-another-field, math on numeric fields, timestamp stamping. |
| **System Callback** | `CALLBACK` | Schedules a system-generated callback X seconds after trigger. |
| **Update Callback** | `CALLBACK_UPDATE` | Modifies or removes an existing scheduled callback. |
| **Place Call** | `HOPPER` | Places the lead back in the dialer hopper. |
| **Add to DNC** | `DNC` | Adds the lead's phone number(s) to the Do Not Call list. |
| **Add to Revenue** | `REVENUE` | Logs a revenue dollar amount to the call log. |

::: warning
The Convoso Connect action is labeled as **"Integration"** in the Action Type dropdown in the UI, **not** "Convoso Connect." This is easy to miss.
:::

## Action Scheduling

Every action has a **Schedule** tab. Actions can be delayed by:

- A **fixed offset** (days / hours / minutes)
- **Relative to the lead's last called time**
- **Relative to a date/datetime field** value on the lead

This enables time-delayed follow-up sequences. Actions triggered outside of configured schedule hours queue and fire when the schedule window reopens.

### Schedule Windows

| Window | Hours |
|---|---|
| 24hr | Always |
| 9–9 | 9:00 AM – 9:00 PM |
| 9–5 | 9:00 AM – 5:00 PM |
| 12–5 | 12:00 PM – 5:00 PM |
| 12–9 | 12:00 PM – 9:00 PM |
| 5–9 | 5:00 PM – 9:00 PM |
| 8–9 | 8:00 AM – 9:00 PM |

## Workflow Logs

Each workflow has its own **Logs** tab showing all action executions. Logs can be filtered by:

- Date range
- Lead ID
- List
- Action Type (API / Convoso Connect / Email / Move)

Individual pending actions can be flushed manually. Lead-level workflow logs also appear on the Edit Lead page.

## Rate Limits & Loop Protection

### Rate Limit

Hard limit: **9 triggers per lead within any rolling 3-minute window**. Subsequent triggers for the same lead are suppressed.

### Loop Protection

If a workflow triggers on Lead Save and the action updates a field (causing another auto-save), it creates a loop. The system:

1. Automatically **disables the workflow** after 100 iterations
2. Sends a **conflict notification** to the account

The 9-triggers-per-3-minutes rate limit also serves as a circuit breaker for runaway workflows.

### Per-Action Safeguards

| Safeguard | Description |
|---|---|
| **Skip If Live Call** | Per-action toggle. Suppresses the action entirely if the agent is on an active call. Prevents mid-call data conflicts. |
| **Skip If Pending Actions** | Per-workflow toggle. Skips if the lead already has unexecuted pending actions from the same workflow. |
| **Perform Action On** | 0–100% traffic control. Set to 10% during rollout, ramp to 100% once confirmed healthy. |
| **Action Active Toggle** | Each individual action has its own Active toggle for pausing without deleting. |
