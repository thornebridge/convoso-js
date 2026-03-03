---
title: Endpoint Configuration
description: Configuring Convoso Connect endpoints — destination URLs, authentication, data formats, testing, and log analysis.
---

# Endpoint Configuration

**Location:** Apps → Convoso Connect

The Convoso Connect list shows all configured integrations. Each row displays the Name (clickable), API URL, Type, Status (toggle-able directly), and an Action gear dropdown with Settings and Delete.

## Configuration Fields

| Field | Description | Options / Notes |
|---|---|---|
| **Name** | Internal label for the connection | Free text (e.g. "Data Transfer to CRM") |
| **API URL** | Full destination endpoint URL | Must include protocol (`https://`) |
| **API Authentication** | Query string credentials appended to the request | e.g. `api_key=XXX&credential=YYY` |
| **Authorization Header** | HTTP headers sent with the request | Pipe-delimited. e.g. `Content-type: application/json\|Authorization: OAuth TOKEN` |
| **Request Method** | Data direction | `GET` (inbound) or `POST` (outbound) |
| **Post Data Type** | How the POST body is encoded (POST only) | `RAW` (URL-encoded form) or `JSON` |
| **Response Data Type** | How Convoso parses the response | `JSON`, `XML`, or `TEXT` |
| **API Integrator** | Pre-built platform templates | None, HubSpot v1, HubSpot v3, Blue Ink Digital |
| **Delimiter** | Separator for multi-value fields | Character or string |
| **Response Key** | Key within the response to read/act upon | e.g. `"success"` from `{"success": true}` |
| **Adaptor Id** | Links to a saved Adaptor for field mapping | **Required for POST.** Dropdown of all active Adaptors. |
| **Active** | Master on/off toggle | Yes / No |

::: warning
An Adaptor is **required** for POST (outbound) endpoints. For GET (inbound) endpoints, an Adaptor is optional.
:::

## Testing a Connection

Below the settings form is a **Test Convoso Connect** panel. Enter a Lead ID (it pre-populates with a recent account lead) and click Test to fire a live API request using that lead's data through the linked Adaptor.

The response is captured in the Logs tab.

### Diagnosing Null Results

A `null` result means the systems failed to communicate. Check these in order:

1. **Endpoint URL** — verify the full URL including protocol
2. **Authentication credentials** — API key, OAuth token, etc.
3. **IP whitelisting** — ensure `66.85.240.0/21` is allowed on the receiving endpoint
4. **Response Data Type** — must match what the API actually returns (JSON, XML, or TEXT)
5. **Adaptor field mappings** — verify fields are correctly mapped

## Convoso Connect Logs

Every outbound API call is logged. Access logs from the **Convoso Connect Logs** tab on any endpoint, or from Workflow Automation logs for workflow-triggered fires.

| Column | Description |
|---|---|
| **Id** | Unique numeric log entry ID |
| **Date** | PST timestamp of the API call |
| **Primary Phone** | Phone number of the lead involved |
| **Result** | API response (`null` = failure, or a success token / error) |
| **Action** | View button — opens the Input Data modal |

### Input Data Modal

Clicking the **View** button opens the Input Data modal showing the complete URL and parameter string sent for that call. This is the primary debugging tool for diagnosing failed or unexpected API responses.

::: tip
The Input Data modal shows the exact POST string transmitted — use it to verify that Adaptor field mappings are producing the expected parameter names and values.
:::

### Log Features

- Date-range filtering
- Search by phone number or result
- Export to CSV
- Pagination: 20 / 50 / 100 / 200 / 500 / 1000 per page
