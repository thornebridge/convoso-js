export interface DncSearchParams {
  id?: string;
  campaign_id?: string;
  phone_number?: string;
  phone_code?: string;
  insert_date?: string;
  offset?: number;
  limit?: number;
  reason?: string;
  purpose?: string;
}

export interface DncRecord {
  id: string;
  phone_number: string;
  campaign_id: string;
  insert_date: string;
  phone_code: string;
  campaign_name: string;
}

export interface DncSearchResponse {
  offset: number;
  limit: number;
  total: number;
  entries: DncRecord[];
}

export interface DncInsertParams {
  phone_number: string;
  phone_code: string;
  campaign_id: string;
  reason?: string;
  purpose?: string;
}

export interface DncInsertResponse {
  success: boolean;
  id: number;
}

export interface DncUpdateParams {
  id: string;
  phone_number?: string;
  phone_code?: string;
  campaign_id?: string;
  reason?: string;
  purpose?: string;
}

export interface DncUpdateResponse {
  success: boolean;
  id: number;
}

export interface DncDeleteParams {
  phone_number: string;
  phone_code: string;
  campaign_id: string;
  update_lead_status?: boolean;
  lead_status?: string;
}

export interface DncDeleteResponse {
  success: boolean;
}
