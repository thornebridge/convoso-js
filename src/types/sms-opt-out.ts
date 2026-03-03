export interface SmsOptOutSearchParams {
  id?: string;
  campaign_id?: string;
  phone_number?: string;
  phone_code?: string;
  reason?: string;
  purpose?: string;
  insert_date?: string;
  offset?: number;
  limit?: number;
}

export interface SmsOptOutRecord {
  id: string;
  phone_number: string;
  phone_code: string;
  reason: string;
  purpose: string;
  insert_date: string;
  campaign_id: string;
  campaign_name: string;
}

export interface SmsOptOutSearchResponse {
  success: boolean;
  offset: number;
  limit: number;
  total: number;
  records: SmsOptOutRecord[];
}

export interface SmsOptOutInsertParams {
  phone_number: string;
  phone_code: string;
  campaign_id: string;
  reason?: string;
  purpose?: string;
}

export interface SmsOptOutInsertResponse {
  success: boolean;
}

export interface SmsOptOutUpdateParams {
  id: string;
  phone_code?: string;
  phone_number?: string;
  reason?: string;
  purpose?: string;
}

export interface SmsOptOutUpdateResponse {
  success: boolean;
  data: { id: string };
}
