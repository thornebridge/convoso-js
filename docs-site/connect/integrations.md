---
title: Integrations & Inbound Flow
description: Third-party integration patterns (HubSpot, Zapier, Balto), inbound lead flow via Lead Post API, and supporting systems.
---

# Integrations & Inbound Flow

## Inbound Lead Flow

When leads flow from your CRM into Convoso via the [Lead Post API](/api-reference/lead-post), they pass through a series of validation and filtering stages.

### Lead Post Criteria

**Location:** Apps → Lead Post Criteria

Pre-defined parameters that govern how leads can be inserted via API. A **Criteria Key** is generated per configuration and must be passed in the lead insert API call.

| Parameter | Description |
|---|---|
| **Check for Duplicate Leads** | Check before inserting |
| **Check_Dup_Archive** | Check archived leads for duplicate phone numbers (account-wide) |
| **Duplicate Lead Age** | Minimum days before a duplicate is allowed |
| **Check_DNC** | Check against Do Not Call list |
| **Check_Wireless** | Check against wireless/mobile number list |
| **Hopper** | Insert into the hopper immediately |
| **Hopper_Priority** | 0–99 (default 99) |
| **Hopper_Expires_In** | Seconds before hopper entry expires (max 300) |
| **Reject_By_Carrier_Type** | Reject MOBILE, VOIP, LANDLINE (comma-separated) |
| **Filter_Phone_Code** | Strips country code, moves to `phone_code` field |
| **Update_If_Found** | Update existing lead if phone/lead ID matches instead of creating a duplicate |
| **Search_Campaign_ID / Search_List_ID** | Scope the duplicate search |

### Global API Settings

**Location:** Account → Global Settings → API Settings

| Setting | Description |
|---|---|
| **Reject Duplicates** | When ON, all API lead inserts reject duplicates globally, regardless of `check_dup` parameter. |
| **Reject Selected Carrier Types** | Rejects leads by carrier type (VoIP, Mobile, Landline) at insert time, globally. Max two types. |
| **API Duplicate Lead Check** | Before accepting a new lead, calls your CRM via Convoso Connect to check if the lead already exists. Configures response handling. |

### Inbound Flow Sequence

The full sequence when a lead is posted into Convoso via API:

1. **Lead Post API** receives the request (with Criteria Key)
2. **Lead Post Criteria** checks run: duplicates, DNC, wireless, carrier type
3. **Global API Settings** checks run: global duplicate rejection, carrier type rejection
4. **API Duplicate Lead Check** queries your CRM if enabled
5. **Lead Validation Criteria** applies: age, list, state, zip filters
6. Lead is inserted into the target **List**
7. **Drips** run nightly: re-sort, re-status based on rules
8. Campaign **dials the lead**
9. **Workflow Automation** fires on call events
10. **Convoso Connect** POSTs the result back to your CRM

## Third-Party Integration Patterns

### HubSpot (Built-In Integrator)

HubSpot has a native integrator — select **"HubSpot v1"** or **"HubSpot v3"** from the API Integrator dropdown in Convoso Connect.

Setup:
1. Create an Adaptor mapping HubSpot field IDs to Convoso field names
2. Create a Convoso Connect endpoint with the HubSpot API URL and OAuth Authorization Header
3. Select HubSpot as the API Integrator

No custom coding needed.

### Zapier (Any CRM Without a Direct API)

For CRMs that don't have a direct REST API or a built-in Convoso integrator (Salesforce, Zoho, etc.), use Zapier as middleware:

1. Create a Convoso Connect endpoint with a placeholder API URL
2. Create an Adaptor mapping Convoso fields to the CRM's field names
3. In Zapier, create a Zap with **"Webhooks by Zapier → Catch Hook"** as the trigger
4. Copy the Zapier webhook URL back into the Convoso Connect's API URL field
5. Set Request Method to POST, select the Adaptor, and test
6. In Zapier, configure the Action Step to create/update records in the destination CRM

::: tip
This effectively gives unlimited CRM integration options via Zapier as a relay.
:::

### The Reusable Integration Pattern (Balto Example)

The Balto integration is the best documented example of a complete production integration. It demonstrates a **three-layer pattern** reusable for any real-time call event notification:

**Step 1: Adaptors** — Create separate field-mapping Adaptors for each event type.

For Balto:
- "Start and Stop" Adaptor → maps `call_log_id`, `lead_id`, `campaign_name`, `agent_email`
- "Disposition" Adaptor → maps `call_log_id`, `status`

**Step 2: Endpoints** — Create separate Convoso Connect endpoints for each event type.

For Balto:
- Start endpoint → Balto Start API URL + Start Adaptor
- Stop endpoint → Balto Stop API URL + Stop Adaptor
- Disposition endpoint → Balto Disposition API URL + Disposition Adaptor

**Step 3: Workflows** — Create separate workflows for each trigger.

For Balto:
- "Start" fires when Lead Status = "Lead in Call"
- "Stop" fires on Term Reason
- "Disposition" fires on any disposition set

::: tip Pattern Summary
**Adaptor per event → Endpoint per event → Workflow per trigger.** This pattern can be replicated for any real-time call event notification to any third-party system.
:::

## Supporting Systems

### DNC Lookup

**Location:** Apps → DNC Lookup

Connects Convoso to a third-party Do Not Call database provider.

- **Single mode** — for manual/preview dial
- **Bulk mode** — for predictive/power dial
- Supports carrier type filtering (VoIP, Mobile, Landline)
- Configurable timeout and fallback action (Skip Calls or Place Calls) if no response

### RND Lookup (Reassigned Numbers)

**Location:** Apps → RND Lookup

Scrubs lead lists against the FCC's Reassigned Numbers Database. Up to 15% of numbers may be reassigned at any time — calling a reassigned number is a **TCPA violation**.

- Runs automatically on the 19th of every month
- Checks only **1,000 leads per run** — factor this into compliance planning for large lists
- Per-lead charge applies

### Drips

**Location:** Apps → Drips

Nightly automated lead management. Runs after midnight and **cannot be triggered manually**.

Use cases:
- Auto-moving stale leads
- Quarantining disconnected numbers
- Geography-based segmentation
- Rotating leads between campaigns

Moves leads between lists or changes status based on rules (lead age, list, state, zip, call count, idle days, custom fields).

::: warning
If you need immediate lead routing, use **Workflow Automation** instead of Drips. Drips are nightly only.
:::

### FTP Push

**Location:** Apps → FTP Push

Automated file export to FTP/SFTP. Four export types:

| Type | Content |
|---|---|
| **Recordings** | MP3s with customizable naming |
| **Call Logs** | CSV export |
| **Reports** | Any saved report |
| **Voicemail** | Voicemail recordings |

Supports FTP, SFTP, SSL, Active/Passive mode, RSA key auth, and email confirmation on completion. Use for data warehousing, BI tools, QA platforms, and compliance storage.

### Jornaya & TrustedForm

TCPA compliance tools that store consent evidence on the lead record:

- **Jornaya** — Verifies consumer consent from the original web form
- **TrustedForm** — Provides a certificate with VideoReplay, visit metadata, and an HTML snapshot of the original form

### LeadsPedia

Integration with the LeadsPedia lead distribution platform. Posts leads to LeadsPedia buyers during live calls, receives buyer phone numbers, and initiates 3-way conference transfers. Five offer scenarios supported, from single-buyer auto-transfer to multi-advertiser agent selection.
