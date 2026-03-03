export interface LeadSearchParams {
  lead_id?: string;
  list_id?: string;
  user_id?: string;
  owner_id?: string;
  status?: string;
  offset?: number;
  limit?: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  date_of_birth?: string;
  created_at_start_date?: string;
  created_at_end_date?: string;
  updated_at_start_date?: string;
  updated_at_end_date?: string;
}

export interface LeadRecord {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  status: string;
  list_id: string;
  created_at: string;
  modified_at: string;
  address1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  carrier_name: string;
  carrier_type: string;
}

export interface LeadSearchResponse {
  results: LeadRecord[];
  offset: number;
  limit: number;
}

export interface LeadInsertParams {
  list_id: string;
  phone_number: string;
  phone_code?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  status?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  hopper?: boolean;
  hopper_priority?: number;
  hopper_expires_in?: number;
  update_if_found?: boolean;
  check_dup?: number;
  check_dnc?: boolean;
}

export interface LeadInsertResponse {
  success: boolean;
  data: { lead_id: string };
  id: string;
}

export interface LeadUpdateParams {
  lead_id: string;
  list_id?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  status?: string;
  address1?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface LeadUpdateResponse {
  success: boolean;
  data: { lead_id: string };
}

export interface LeadDeleteParams {
  lead_id: string;
}

export interface LeadDeleteResponse {
  success: boolean;
}

export interface LeadGetRecordingsParams {
  lead_id: string;
  start_time?: string;
  end_time?: string;
  offset?: number;
  limit?: number;
}

export interface LeadGetRecordingsResponse {
  entries: Array<{
    recording_id: string;
    lead_id: string;
    start_time: string;
    end_time: string;
    seconds: number;
    url: string;
  }>;
}
