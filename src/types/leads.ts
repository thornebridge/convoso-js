export interface LeadSearchParams {
  /** Filter by lead ID */
  lead_id?: string;
  /** Filter by list ID */
  list_id?: string;
  /** Filter by assigned user ID */
  user_id?: string;
  /** Filter by lead owner ID */
  owner_id?: string;
  /** Filter by lead status code */
  status?: string;
  /** Pagination offset (default 0) */
  offset?: number;
  /** Results per page (default 10, max 2000) */
  limit?: number;
  /** Filter by first name */
  first_name?: string;
  /** Filter by last name */
  last_name?: string;
  /** Filter by phone number */
  phone_number?: string;
  /** Filter by email address */
  email?: string;
  /** Filter by city */
  city?: string;
  /** Filter by state/province */
  state?: string;
  /** Filter by postal code */
  postal_code?: string;
  /** Filter by country */
  country?: string;
  /** Filter by date of birth (YYYY-MM-DD) */
  date_of_birth?: string;
  /** Filter by creation date start */
  created_at_start_date?: string;
  /** Filter by creation date end */
  created_at_end_date?: string;
  /** Filter by modification date start */
  updated_at_start_date?: string;
  /** Filter by modification date end */
  updated_at_end_date?: string;
}

export interface LeadRecord {
  /** Unique lead ID */
  id: string;
  /** Contact first name */
  first_name: string;
  /** Contact last name */
  last_name: string;
  /** Primary phone number */
  phone_number: string;
  /** Email address */
  email: string;
  /** Lead status code */
  status: string;
  /** Associated list ID */
  list_id: string;
  /** Creation timestamp */
  created_at: string;
  /** Last modification timestamp */
  modified_at: string;
  /** Street address */
  address1: string;
  /** City */
  city: string;
  /** State/Province */
  state: string;
  /** Postal code */
  postal_code: string;
  /** Country code */
  country: string;
  /** Phone carrier name */
  carrier_name: string;
  /** Carrier type (wireless/landline/voip) */
  carrier_type: string;
}

export interface LeadSearchResponse {
  /** Array of lead objects */
  results: LeadRecord[];
  /** Pagination offset */
  offset: number;
  /** Results per page */
  limit: number;
}

export interface LeadInsertParams {
  /** List ID to add lead to */
  list_id: string;
  /** Primary phone number */
  phone_number: string;
  /** Country phone code */
  phone_code?: string;
  /** First name */
  first_name?: string;
  /** Last name */
  last_name?: string;
  /** Email address */
  email?: string;
  /** Lead status code */
  status?: string;
  /** Street address */
  address1?: string;
  /** Address line 2 */
  address2?: string;
  /** City */
  city?: string;
  /** State/Province */
  state?: string;
  /** Postal code */
  postal_code?: string;
  /** Country code */
  country?: string;
  /** Add to queue hopper for immediate dialing */
  hopper?: boolean;
  /** Hopper priority (0=lowest, 99=highest) */
  hopper_priority?: number;
  /** Hopper expiration in minutes (max 300) */
  hopper_expires_in?: number;
  /** Update if lead already exists */
  update_if_found?: boolean;
  /** Duplicate check level (0=none, 1=current list, 2=all lists, 3=all+archive, 4=complete) */
  check_dup?: number;
  /** Check DNC list before adding */
  check_dnc?: boolean;
}

export interface LeadInsertResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the new lead ID */
  data: { lead_id: string };
  /** Lead ID */
  id: string;
}

export interface LeadUpdateParams {
  /** ID of the lead to update */
  lead_id: string;
  /** Move to different list */
  list_id?: string;
  /** Update phone number */
  phone_number?: string;
  /** Update first name */
  first_name?: string;
  /** Update last name */
  last_name?: string;
  /** Update email address */
  email?: string;
  /** Update lead status code */
  status?: string;
  /** Update street address */
  address1?: string;
  /** Update city */
  city?: string;
  /** Update state/province */
  state?: string;
  /** Update postal code */
  postal_code?: string;
  /** Update country */
  country?: string;
}

export interface LeadUpdateResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the updated lead ID */
  data: { lead_id: string };
}

export interface LeadDeleteParams {
  /** ID of the lead to delete */
  lead_id: string;
}

export interface LeadDeleteResponse {
  /** Success status of deletion */
  success: boolean;
}

export interface LeadGetRecordingsParams {
  /** ID of the lead */
  lead_id: string;
  /** Start time filter in YYYY-MM-DD HH:MM:SS format */
  start_time?: string;
  /** End time filter in YYYY-MM-DD HH:MM:SS format */
  end_time?: string;
  /** Pagination offset (default 0) */
  offset?: number;
  /** Results per page (default 10, max 100) */
  limit?: number;
}

export interface LeadGetRecordingsResponse {
  /** Array of recording objects */
  entries: Array<{
    /** Unique recording ID */
    recording_id: string;
    /** Associated lead ID */
    lead_id: string;
    /** Recording start time */
    start_time: string;
    /** Recording end time */
    end_time: string;
    /** Duration in seconds */
    seconds: number;
    /** Recording download/playback URL */
    url: string;
  }>;
}
