// ---------------------------------------------------------------------------
// Convoso Connect — Webhook Payload Types
// ---------------------------------------------------------------------------
// These interfaces describe the fields that can appear in outbound webhook
// payloads fired by Convoso Connect. Which fields are present in any given
// payload depends on the Adaptor configuration — all fields are optional.
// ---------------------------------------------------------------------------

/**
 * Lead-level fields drawn from the lead's profile at the time of the call
 * event. These describe the contact, not the call.
 *
 * Corresponds to the "Lead Fields" section of a Convoso Connect Adaptor.
 */
export interface ConnectLeadFields {
  /** Convoso's internal lead ID. */
  id?: string;
  /** ID from the originating external system. */
  remote_id?: string;
  /** Assigned agent / user ID. */
  user_id?: string;
  /** Lead source identifier. */
  source_id?: string;
  /** Current disposition / status code. */
  status?: string;
  /** Total outbound call attempts. */
  called_count?: number;
  /** Total inbound calls received. */
  called_count_inbound?: number;
  /** Most recent outbound call timestamp. */
  last_called?: string;
  /** Last time an agent viewed the lead. */
  last_viewed?: string;
  /** Last time the lead was reached. */
  last_reached_at?: string;
  /** Final reached timestamp. */
  final_reached_at?: string;
  /** Lead creation timestamp. */
  created_at?: string;
  /** Last modification timestamp. */
  modified_at?: string;
  /** Lead's timezone as a GMT offset (e.g. `-7`). */
  locale_gmt?: string;
  /** Phone carrier name (e.g. `"T-Mobile"`). */
  carrier_name?: string;
  /** Job title or salutation. */
  title?: string;
  /** Standard consumer ID. */
  std_consumer_number?: string;
  /** Standard company name. */
  std_company_name?: string;
  /** Standard account number. */
  std_account_number?: string;
  /** US state abbreviation. */
  state?: string;
  /** Business start date. */
  start_date?: string;
  /** Province (non-US). */
  province?: string;
  /** ZIP / postal code. */
  postal_code?: string;
  /** Lead's primary phone number. */
  phone_number?: string;
  /** International dialing code (e.g. `"1"`). */
  phone_code?: string;
  /** Assigned agent / user ID (owner). */
  owner_id?: string;
  /** Free-text notes. */
  notes?: string;
  /** Monthly revenue (currency value). */
  monthly_revenue?: string;
  /** Convoso list ID the lead belongs to. */
  list_id?: string;
  /** Lead's last name. */
  last_name?: string;
  /** User who last modified the lead. */
  last_modified_by?: string;
  /** Industry or business type. */
  industry?: string;
  /** Lead's gender. */
  gender?: string;
  /** Lead's first name. */
  first_name?: string;
  /** Email address. */
  email?: string;
  /** Doing Business As name. */
  dba?: string;
  /** Date of birth. */
  date_of_birth?: string;
  /** User who created the lead. */
  created_by?: string;
  /** Country. */
  country?: string;
  /** City. */
  city?: string;
  /** Business name. */
  business_name?: string;
  /** Annual revenue (currency value). */
  annual_revenue?: string;
  /** Alternate phone 2 (work phone). */
  alt_phone_2?: string;
  /** Alternate phone 1 (cell phone). */
  alt_phone_1?: string;
  /** Address line 2. */
  address2?: string;
  /** Address line 1. */
  address1?: string;
}

/**
 * Call-level metadata from the specific call event that triggered the
 * Convoso Connect fire. These are per-call values, not lead profile values.
 *
 * Corresponds to the "Call Log Info" section of a Convoso Connect Adaptor.
 */
export interface ConnectCallLogFields {
  /** Unique ID for this call event. */
  call_log_id?: string;
  /** Convoso internal lead ID. */
  lead_id?: string;
  /** First name at call time. */
  first_name?: string;
  /** Last name at call time. */
  last_name?: string;
  /** List ID during the call. */
  list_id?: string;
  /** Human-readable list name. */
  list_name?: string;
  /** Agent who handled the call. */
  user_id?: string;
  /** Agent who originated the call (may differ in transfers). */
  originating_agent_id?: string;
  /** Campaign the call ran under. */
  campaign_id?: string;
  /** Human-readable campaign name. */
  campaign_name?: string;
  /** Inbound queue ID. */
  queue_id?: string;
  /** Human-readable queue name. */
  queue_name?: string;
  /** Seconds the caller waited in queue. */
  queue_seconds?: number;
  /** Caller's position in queue when answered. */
  queue_position?: number;
  /** Phone number dialed or received. */
  phone_number?: string;
  /** Disposition code (abbreviation, not full name). */
  status?: string;
  /** Call duration in seconds. */
  length_in_sec?: number;
  /** Timestamp of the call. */
  call_date?: string;
  /** Agent's wrap-up notes / comments. */
  agent_comment?: string;
  /** Call direction: Inbound, Outbound, Manual, etc. */
  call_type?: string;
  /** How the call ended. */
  term_reason?: string;
  /** URL to the call recording (MP3). */
  recording?: string;
  /** Caller ID displayed to the lead. */
  caller_id?: string;
  /** DID / inbound number that was called. */
  inbound_number?: string;
}

/**
 * Agent identity fields and account-level custom lead fields.
 *
 * Custom fields 1–10 correspond to the account's configured custom lead
 * fields (check CRM → Lead Layouts & Fields for the mapping).
 *
 * Corresponds to the "Extra Fields" section of a Convoso Connect Adaptor.
 */
export interface ConnectExtraFields {
  /** Full name of the handling agent. */
  agent_full_name?: string;
  /** Agent's email address. */
  agent_email?: string;
  /** Account-specific custom field 1. */
  custom_field_1?: string;
  /** Account-specific custom field 2. */
  custom_field_2?: string;
  /** Account-specific custom field 3. */
  custom_field_3?: string;
  /** Account-specific custom field 4. */
  custom_field_4?: string;
  /** Account-specific custom field 5. */
  custom_field_5?: string;
  /** Account-specific custom field 6. */
  custom_field_6?: string;
  /** Account-specific custom field 7. */
  custom_field_7?: string;
  /** Account-specific custom field 8. */
  custom_field_8?: string;
  /** Account-specific custom field 9. */
  custom_field_9?: string;
  /** Account-specific custom field 10. */
  custom_field_10?: string;
}

/**
 * Complete Convoso Connect webhook payload.
 *
 * The actual fields present in any given payload depend on the Adaptor
 * configuration — only fields with a "Mapped To" value are included.
 * Unmapped fields are excluded entirely (not sent as empty/null).
 *
 * Note: Adaptor field mappings can rename keys. This interface uses
 * Convoso's internal field names. If the receiving system uses different
 * parameter names (via the "Mapped To" column), the keys in the actual
 * HTTP payload will differ.
 *
 * @example
 * ```typescript
 * import type { ConnectPayload } from 'convoso-js';
 *
 * function handleWebhook(payload: ConnectPayload) {
 *   console.log(payload.phone_number, payload.status);
 *   if (payload.call_log_id) {
 *     console.log(`Call ${payload.call_log_id}: ${payload.length_in_sec}s`);
 *   }
 * }
 * ```
 */
export interface ConnectPayload
  extends ConnectLeadFields, ConnectCallLogFields, ConnectExtraFields {
  /** Additional fields from the adaptor's key-value pairs. */
  [key: string]: unknown;
}
