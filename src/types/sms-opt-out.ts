export interface SmsOptOutSearchParams {
  /** Filter by SMS opt-out record ID */
  id?: string;
  /** Filter by campaign ID (0 for global) */
  campaign_id?: string;
  /** Filter by phone number */
  phone_number?: string;
  /** Filter by country/region phone code */
  phone_code?: string;
  /** Filter by reason: -BLANK- or -NOTBLANK- */
  reason?: string;
  /** Filter by purpose */
  purpose?: string;
  /** Filter by insert date (YYYY-MM-DD) */
  insert_date?: string;
  /** Pagination offset (default 0, max 100000) */
  offset?: number;
  /** Results per page (default 1000, max 1000) */
  limit?: number;
}

export interface SmsOptOutRecord {
  /** Opt-out record ID */
  id: string;
  /** Phone number opted out */
  phone_number: string;
  /** Country/region phone code */
  phone_code: string;
  /** Reason for opt-out */
  reason: string;
  /** Purpose of SMS */
  purpose: string;
  /** Date opted out */
  insert_date: string;
  /** Campaign ID (0 for global) */
  campaign_id: string;
  /** Campaign name */
  campaign_name: string;
}

export interface SmsOptOutSearchResponse {
  /** Operation success */
  success: boolean;
  /** Pagination offset */
  offset: number;
  /** Results per page */
  limit: number;
  /** Total matching records */
  total: number;
  /** Array of opt-out records */
  records: SmsOptOutRecord[];
}

export interface SmsOptOutInsertParams {
  /** Phone number to opt out */
  phone_number: string;
  /** Country/region phone code */
  phone_code: string;
  /** Campaign ID (0 for global, -1 for purpose type) */
  campaign_id: string;
  /** Reason for opt-out */
  reason?: string;
  /** Purpose of SMS */
  purpose?: string;
}

export interface SmsOptOutInsertResponse {
  /** Success status */
  success: boolean;
}

export interface SmsOptOutUpdateParams {
  /** SMS opt-out record ID to update */
  id: string;
  /** Country/region phone code */
  phone_code?: string;
  /** Phone number */
  phone_number?: string;
  /** Reason for opt-out (use -BLANK- to clear) */
  reason?: string;
  /** Purpose of SMS (use -BLANK- to clear) */
  purpose?: string;
}

export interface SmsOptOutUpdateResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the updated record ID */
  data: { id: string };
}
