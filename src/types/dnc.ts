export interface DncSearchParams {
  /** Filter by DNC ID */
  id?: string;
  /** Filter by campaign ID (0 for global) */
  campaign_id?: string;
  /** Filter by phone number */
  phone_number?: string;
  /** Filter by country/region phone code */
  phone_code?: string;
  /** Filter by insert date (YYYY-MM-DD hh:mm:ss) */
  insert_date?: string;
  /** Pagination offset (default 0, max 100000) */
  offset?: number;
  /** Results per page (default 100, max 1000) */
  limit?: number;
  /** Filter by reason: -BLANK- or -NOTBLANK- */
  reason?: string;
  /** Filter by purpose */
  purpose?: string;
}

export interface DncRecord {
  /** DNC entry ID */
  id: string;
  /** Phone number on DNC list */
  phone_number: string;
  /** Campaign ID (0 for global) */
  campaign_id: string;
  /** Date added to DNC */
  insert_date: string;
  /** Country/region phone code */
  phone_code: string;
  /** Campaign name */
  campaign_name: string;
}

export interface DncSearchResponse {
  /** Pagination offset */
  offset: number;
  /** Results per page */
  limit: number;
  /** Total matching entries */
  total: number;
  /** Array of DNC records */
  entries: DncRecord[];
}

export interface DncInsertParams {
  /** Phone number to add to DNC */
  phone_number: string;
  /** Country/region phone code */
  phone_code: string;
  /** Campaign ID (0 for global DNC, -1 for purpose type) */
  campaign_id: string;
  /** Reason for DNC listing */
  reason?: string;
  /** Purpose of DNC entry */
  purpose?: string;
}

export interface DncInsertResponse {
  /** Success status */
  success: boolean;
  /** ID of newly created DNC entry */
  id: number;
}

export interface DncUpdateParams {
  /** DNC ID to update */
  id: string;
  /** Phone number to add to DNC */
  phone_number?: string;
  /** Country/region phone code */
  phone_code?: string;
  /** Campaign ID (0 for global DNC) */
  campaign_id?: string;
  /** Reason for DNC listing (leave blank to clear) */
  reason?: string;
  /** Purpose of DNC entry */
  purpose?: string;
}

export interface DncUpdateResponse {
  /** Success status */
  success: boolean;
  /** Updated DNC ID */
  id: number;
}

export interface DncDeleteParams {
  /** Phone number to remove from DNC */
  phone_number: string;
  /** Country/region phone code */
  phone_code: string;
  /** Campaign ID (0 for global) */
  campaign_id: string;
  /** Update associated lead status when removing from DNC */
  update_lead_status?: boolean;
  /** Status to set on associated leads */
  lead_status?: string;
}

export interface DncDeleteResponse {
  /** Success status of deletion */
  success: boolean;
}
