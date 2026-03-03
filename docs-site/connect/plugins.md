---
title: Plugins & Campaign Integration
description: Agent-triggered Convoso Connect calls via Plugins, and campaign-level integration points for embedding CRM data in the agent UI.
---

# Plugins & Campaign Integration

## Plugins

**Location:** Apps → Plugins

Plugins create buttons inside the agent's dialer UI that agents click to trigger actions on demand. They are distinct from Workflow Automation in one critical way:

- **Plugins** are **agent-initiated** (manual)
- **Workflows** are **system-initiated** (event-driven)

### Plugin Types

| Type | Description |
|---|---|
| **API Transfer** | Fires a Convoso Connect call to a third-party system. Evaluates the response against a defined success value. If successful, initiates a call transfer (3-way auto, 3-way manual, or blind). Supports weighted transfer routing across multiple numbers by percentage. |
| **Boberdoo** | Specifically for Boberdoo lead distribution / ping-post. Action: Transfer (post + transfer call) or Lookup (post only). Same transfer options as API Transfer. |
| **TrustedForm** | Fetches a TrustedForm certificate during a live call. Stores the certificate URL in a custom field. Provides VideoReplay of the consumer's original web form submission. |
| **Google Map** | Embeds a live Google Map in the agent's script showing the lead's address. Configured with Address, City, State, Postal Code, Country Code field mappings. |

### Plugin Configuration

| Setting | Options |
|---|---|
| **Plugin Type** | Button (clickable in agent UI) or Embedded (iFrame in agent UI) |
| **Action** | Transfer (3-way / blind) or Lookup (data lookup only) |
| **Convoso Connect** | Links to any configured endpoint |
| **Response Element / Success Value** | Evaluates the API response to determine success or failure |
| **Run on Background** | Yes / No — silent background execution |
| **Delay Seconds** | Wait time before firing after trigger |

### Deploying Plugins

Plugins are attached to agent call scripts. In the script editor:

1. Right-click any element
2. Select **Edit**
3. Choose the plugin from the **Available Plugins** dropdown
4. Click **Insert**

### When to Use Plugins vs. Workflows

| Scenario | Use |
|---|---|
| Automatic CRM updates on call events (dispositions, status changes) | **Workflow** |
| Agent needs a manual "push to CRM" button | **Plugin** |
| Sync mid-call data before ending the call | **Plugin** |
| Confirm a CRM record exists before ending the call | **Plugin** |
| Trigger a lookup from a third-party system | **Plugin** |
| Time-delayed follow-up sequences | **Workflow** |
| A/B testing of CRM update frequency | **Workflow** |

## Campaign Integration Points

**Location:** Call Center → Campaigns → [Campaign] → Advanced Configurations

Beyond the Convoso Connect → Adaptor → Workflow pipeline, each campaign has additional URL-based integration touch points that pass lead and call data to external systems.

### Web Form URL

A URL that Convoso opens in the agent's browser when a call connects. Typically used to open the CRM lead record pre-populated with lead data.

| Setting | Description |
|---|---|
| **Web Form URL** | Base URL of your CRM's lead record or form. Supports token substitution (e.g. `/%phone_number%`). |
| **Auto Call Launch** | Opens URL automatically when an outbound call connects. |
| **Auto View Launch** | Opens URL automatically when an agent views a lead. |
| **Append Data To Webform URL** | Empty (no data), System Default (standard fields), or CRM Adaptor (uses the same field mapping as Convoso Connect). |

### Embedded Web Form

Renders your CRM URL in an **iframe** directly inside the Convoso agent UI — agents never leave the dialer.

- Supports the same token substitution and Append Data options as the Web Form URL
- Configurable frame height
- "Hide by Default" toggle

### Embedded Website

A second, separate embedded iframe for supplementary reference content (knowledge base, lookup tool).

::: tip
Unlike the Embedded Web Form, the Embedded Website does **not** have an "Append Data" option — it loads a static URL.
:::
