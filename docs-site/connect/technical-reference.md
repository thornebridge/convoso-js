---
title: Technical Reference
description: Rate limits, guardrails, technical gotchas, and setup checklist for Convoso Connect integrations.
---

# Technical Reference

## Rate Limits & Guardrails

| Guardrail | Behavior |
|---|---|
| **Workflow Rate Limit** | Hard limit: 9 triggers per lead within any rolling 3-minute window. Subsequent triggers are suppressed. |
| **Loop Protection** | Workflow auto-disables after 100 iterations if a save-triggered workflow causes recursive saves. Conflict notification sent. |
| **Skip If Live Call** | Per-action toggle. Suppresses the action entirely if the agent is on an active call at fire time. Prevents mid-call data conflicts. |
| **Skip If Pending Actions** | Per-workflow toggle. Skips firing if the lead already has unexecuted pending actions from the same workflow. |
| **Perform Action On (A/B)** | 0–100% traffic control. Set to 10% during rollout, ramp to 100% once confirmed healthy. |
| **Action Active Toggle** | Each individual action has its own Active toggle for pausing without deleting. |
| **Schedule Windows** | 7 built-in time windows (24hr, 9–9, 9–5, 12–5, 12–9, 5–9, 8–9). Actions triggered outside hours queue and fire when the window opens. |

## Technical Gotchas

### 1. IP Whitelist Required

Convoso sends from `66.85.240.0/21`. Whitelist this range or API calls will be **silently blocked** — no error is returned on the Convoso side.

### 2. Adaptor Required for POST, Not GET

When the method is GET (CRM pushing in), an Adaptor is optional. For POST (Convoso pushing out), an Adaptor is **required**.

### 3. Field Name Is the API Reference

The Field Name (not Label) is what Adaptors and API calls use. **Changing it after setup breaks all existing integrations.**

### 4. Custom Field Cap: 40

Text, Textarea, API Lookup, API Processing, and State fields share a pool of 40 field numbers. Plan carefully.

### 5. Null in Connect Logs = Failure

If the test returns `null`, the systems failed to communicate. Check URL, auth, response type, and IP whitelist.

### 6. Disposition Codes Are Abbreviations

Workflow → Convoso Connect sends the disposition **abbreviation** (e.g. `"HU"`) not the full name (`"Hang Up"`). Your receiving system must map these.

### 7. Convoso Connect Action Label

In the Workflow Action Type dropdown, the Convoso Connect action is labeled **"Integration"**, not "Convoso Connect."

### 8. Drips Are Nightly Only

Cannot be triggered manually. Use Workflow Automation for immediate routing.

### 9. RND Lookup: 1,000 Leads Per Run

Factor this into compliance planning for large lists.

### 10. SSO Email Matching

SSO only works if the provider's email matches an existing Convoso user exactly. No auto-provisioning.

### 11. POST Test Shows Payload

In the Connect Logs, click **View** to see the exact post string sent. Use this to verify Adaptor mappings.

### 12. Built-In Integrators Are Limited

Only **HubSpot** and **Blue Ink Digital** have built-in integrators. All other CRMs use generic Convoso Connect or Zapier middleware.

### 13. Lead Post Criteria Key Required

Must be passed in the lead insert API call or non-asset options won't apply.

### 14. Voso.ai API Nodes Require CSM Activation

Cannot be self-provisioned. Contact your Convoso CSM.

## Setup Checklist

To configure a new outbound Convoso Connect integration from scratch:

### 1. Create the Adaptor

Apps → Adaptors → + Add Adaptor. Name it, activate it.

### 2. Map the Fields

Fill in the **Mapped To** column for every field the destination API expects. Set Default Values. Configure date formats on date fields.

### 3. Verify the Preview

Check the **Generated Data** section at the bottom of the Adaptor. Confirm the JSON keys and values match what your API expects. Save.

### 4. Create the Endpoint

Apps → Convoso Connect → + Add. Enter Name, API URL, authentication, set POST method.

### 5. Configure the Request

Choose Post Data Type (RAW or JSON), Response Data Type, and link the Adaptor.

### 6. Whitelist the IP Range

Ensure `66.85.240.0/21` is allowed on the receiving endpoint **before testing**.

### 7. Test the Connection

Use the Test panel with a real Lead ID. Check the Logs tab and click **View** to inspect the full payload.

### 8. Diagnose Null Results

If the test returns `null`: verify URL, auth, response data type, and IP whitelist. See [Endpoint Configuration](./endpoints) for details.

### 9. Create the Workflow

CRM → Workflow Automation → + Add. Set the Relation (Campaign), add Event triggers, add the Convoso Connect action selecting your endpoint.

### 10. Go Live

Set the Convoso Connect to **Active**, set the Workflow to **Active**. Monitor the logs for the first production fires.

::: tip
During rollout, set the Workflow's **Perform Action On** to 10% to test with a small subset of leads before ramping to 100%.
:::

## SDK Utilities for Webhook Receivers

If you're building the receiving endpoint for Convoso Connect webhooks, the `convoso-js` SDK provides typed payload interfaces and a parse utility:

```typescript
import { parseConnectPayload, CONNECT_WORKFLOW_EVENTS, CONNECT_WORKFLOW_ACTIONS } from 'convoso-js';
import type { ConnectPayload } from 'convoso-js';

// Parse incoming webhook
app.post('/convoso-webhook', (req, res) => {
  const payload: ConnectPayload = parseConnectPayload(req.body);

  // All fields are fully typed with autocomplete
  console.log(payload.phone_number);  // Lead's primary phone
  console.log(payload.call_log_id);   // Call event ID
  console.log(payload.status);        // Disposition abbreviation
  console.log(payload.length_in_sec); // Talk time in seconds

  res.json({ success: true });
});
```

See the [SDK documentation](/guide/getting-started) for installation and setup.
