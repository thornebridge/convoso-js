---
title: Adaptors
description: Convoso Connect field mapping layer — how Adaptors translate internal fields to destination API parameters, with complete field references.
---

# Adaptors

**Location:** Apps → Adaptors

Adaptors sit between Convoso's internal data model and the parameter structure your destination API expects. They are configured separately from Convoso Connect endpoints and then linked via the Adaptor Id dropdown. A single Adaptor can be reused across multiple endpoints.

## How Field Mapping Works

Every field row in an Adaptor has four columns:

| Column | Description |
|---|---|
| **Label** | Human-readable name of the Convoso field (e.g. "First Name"). Date fields show a clickable "(set date format)" link. |
| **Field** | Convoso's internal system field name (e.g. `first_name`). Read-only. |
| **Mapped To** | The destination parameter name your API expects. This becomes the key in the outbound payload. Only fields with a Mapped To value are included — blank rows are excluded. |
| **Default Value** | Fallback value sent when the Convoso field is empty for a given lead. Greyed-out rows are system-managed and cannot have defaults. |

### Multi-Destination Mapping

A single Convoso field can be sent to multiple destination keys by **comma-separating** names in the Mapped To column. For example, entering `phone_1,phone_2` sends the same phone number value to both parameters.

### Generated Data Preview

At the bottom of every Adaptor page, the **Generated Data** section displays a live JSON preview of the exact payload that would be transmitted, populated with real data from a recent lead. The keys shown are the Mapped To values — this is precisely what your API will receive.

::: tip
The preview updates as you edit mappings, making it the fastest way to validate field configuration before going live.
:::

## Lead Fields

Record-level data drawn from the lead's profile at the time of the call event. These describe the contact, not the call.

| Label | Internal Field | Notes |
|---|---|---|
| Id | `id` | Convoso's internal lead ID |
| Remote id | `remote_id` | ID from the originating system |
| User id | `user_id` | Assigned agent/user ID |
| Source id | `source_id` | Lead source identifier |
| Status | `status` | Current disposition/status code |
| Called count | `called_count` | Total outbound call attempts |
| Called count inbound | `called_count_inbound` | Total inbound calls |
| Last called | `last_called` | Most recent call timestamp |
| Last viewed | `last_viewed` | Last agent view timestamp |
| Last reached at | `last_reached_at` | Last reached timestamp |
| Final reached at | `final_reached_at` | Final reached timestamp |
| Created at | `created_at` | Lead creation timestamp |
| Modified at | `modified_at` | Last modification timestamp |
| Locale gmt | `locale_gmt` | Lead's timezone GMT offset |
| Carrier name | `carrier_name` | Phone carrier (e.g. T-Mobile) |
| Title | `title` | Job title or salutation |
| Consumer Number | `std_consumer_number` | Standard consumer ID |
| Company Name | `std_company_name` | Standard company name |
| Account Number | `std_account_number` | Standard account number |
| State | `state` | US state abbreviation |
| Start Date | `start_date` | Business start date |
| Province | `province` | Province (non-US) |
| Postal Code | `postal_code` | ZIP / postal code |
| Primary Phone | `phone_number` | Lead's primary phone |
| Country Code | `phone_code` | International dialing code |
| Lead Owner | `owner_id` | Assigned agent/user ID |
| Notes | `notes` | Free-text notes |
| Monthly Revenue | `monthly_revenue` | Currency field |
| List | `list_id` | Convoso list ID |
| Last Name | `last_name` | Lead's last name |
| Last Modified By | `last_modified_by` | User who last modified |
| Industry | `industry` | Industry / business type |
| Gender | `gender` | Lead's gender |
| First Name | `first_name` | Lead's first name |
| Email | `email` | Email address |
| DBA | `dba` | Doing Business As |
| Date Of Birth | `date_of_birth` | DOB |
| Created By | `created_by` | User who created the lead |
| Country | `country` | Country |
| City | `city` | City |
| Business Name | `business_name` | Business name |
| Annual Revenue | `annual_revenue` | Currency field |
| Work Phone | `alt_phone_2` | Alt phone 2 |
| Cell Phone | `alt_phone_1` | Alt phone 1 |
| Address 2 | `address2` | Address line 2 |
| Address 1 | `address1` | Address line 1 |

## Call Log Info Fields

Metadata from the specific call event that triggered the Convoso Connect fire. These are **call-level** values, not lead profile values — they describe what happened on this particular call.

| Label | Internal Field | Notes |
|---|---|---|
| Call Log ID | `call_log_id` | Unique ID for this call event |
| Lead ID | `lead_id` | Convoso internal lead ID |
| Lead First Name | `first_name` | First name at call time |
| Lead Last Name | `last_name` | Last name at call time |
| List ID | `list_id` | List during the call |
| List Name | `list_name` | Human-readable list name |
| User ID | `user_id` | Agent who handled the call |
| Originating Agent ID | `originating_agent_id` | Agent who originated (may differ in transfers) |
| Campaign ID | `campaign_id` | Campaign the call ran under |
| Campaign Name | `campaign_name` | Human-readable campaign name |
| Queue ID | `queue_id` | Inbound queue ID |
| Queue Name | `queue_name` | Human-readable queue name |
| Queue Wait Time | `queue_seconds` | Seconds caller waited in queue |
| Queue Position | `queue_position` | Position when answered |
| Phone Number | `phone_number` | Number dialed/received |
| Status (Disposition) | `status` | Disposition code (abbreviation, not full name) |
| Talk Time | `length_in_sec` | Duration in seconds |
| Call Date | `call_date` | Timestamp of the call |
| Agent Comment | `agent_comment` | Agent wrap-up notes |
| Call Type | `call_type` | Inbound / Outbound / Manual / etc. |
| Term Reason | `term_reason` | How the call ended |
| Recording | `recording` | URL to the call recording MP3 |
| Caller ID Displayed | `caller_id` | Caller ID shown to lead |
| Inbound Number | `inbound_number` | DID that was called |

::: warning
Disposition codes are **abbreviations** (e.g. `"HU"` for Hang Up), not full names. Your receiving system must map these abbreviations to meaningful labels.
:::

## Extra Fields

Agent identity fields and up to ten account-level custom lead fields.

| Label | Internal Field | Notes |
|---|---|---|
| Agent Full Name | `agent_full_name` | Full name of the handling agent |
| Agent Email | `agent_email` | Agent's email address |
| Custom Field 1 | `custom_field_1` | Account-specific custom field |
| Custom Field 2 | `custom_field_2` | Account-specific custom field |
| Custom Field 3 | `custom_field_3` | Account-specific custom field |
| Custom Field 4 | `custom_field_4` | Account-specific custom field |
| Custom Field 5 | `custom_field_5` | Account-specific custom field |
| Custom Field 6 | `custom_field_6` | Account-specific custom field |
| Custom Field 7 | `custom_field_7` | Account-specific custom field |
| Custom Field 8 | `custom_field_8` | Account-specific custom field |
| Custom Field 9 | `custom_field_9` | Account-specific custom field |
| Custom Field 10 | `custom_field_10` | Account-specific custom field |

::: tip
Custom Fields 1–10 correspond to the account's configured custom lead fields. Check **CRM → Lead Layouts & Fields** for the authoritative mapping.
:::

## Date Format Options

Any date/time field in the Adaptor can have its format individually configured. Click the "(set date format)" link to choose:

| Display | Pattern | Example |
|---|---|---|
| System Default | — | Account-level default |
| Standard | `Y-m-d H:i:s` | `2024-03-15 14:30:00` |
| Date only | `Y-m-d` | `2024-03-15` |
| US format | `m/d/Y` | `03/15/2024` |
| Full verbose | `D M j G:i:s T Y` | `Fri Mar 15 14:30:00 MST 2024` |
| Short European | `j-m-y` | `15-03-24` |
| Compact numeric | `Ymd` | `20240315` |
| Dotted short | `m.d.y` | `03.15.24` |
| US with time (12h) | `m/d/y g:i a` | `03/15/24 2:30 pm` |
| US short | `m/d/y` | `03/15/24` |
| Full month name | `F j, Y, g:i a` | `March 15, 2024, 2:30 pm` |
| Comma-separated | `j, n, Y` | `15, 3, 2024` |
| ISO 8601 | `Y-m-d\TH:i:s` | `2024-03-15T14:30:00` |
| Unix timestamp | `timestamp` | `1710520200` |
| Current Age | `age` | Calculates age from DOB |
| Compact UTC | `Ymd\THis\Z` | `20240315T143000Z` |
| US with time (24h) | `m/d/Y H:i:s` | `03/15/2024 14:30:00` |

## Integration-Relevant Field Types

Several lead field types in **CRM → Lead Layouts & Fields** have direct integration relevance:

| Field Type | Integration Relevance |
|---|---|
| **Text** | Standard field. The Field Name is the API reference used in Adaptors. Changing it after setup **breaks all existing Adaptor mappings**. |
| **API Processing** | Button-triggered Convoso Connect call during a live call. Stores the response value in the field. Auto-disables after success. Alternative to Plugins. |
| **API Lookup** | Dropdown that populates options dynamically from a Convoso Connect API call. Use for pulling live data from your CRM as a dropdown during a call. |
| **Date / DateTime** | Can be used as a Workflow Action schedule trigger. |
| **Number / Currency** | Math operations available in Workflow Field actions. |

::: warning Field Name vs. Field Label
The **Field Name** is the internal API reference used in Adaptors and all API calls. The **Field Label** is only the display name. Changing a Field Name after integration setup will break all existing Adaptor mappings, Convoso Connect configurations, and third-party API calls that reference it.
:::

### Custom Field Limit

Text, Textarea, API Lookup, API Processing, and State fields share a pool of **40 field numbers** (1–40). This is a hard ceiling — plan field usage carefully when designing field-heavy integrations.
