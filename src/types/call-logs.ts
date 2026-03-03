export interface CallLogUpdateParams {
  call_log_id: string;
  extra_field_01?: string;
  extra_field_02?: string;
}

export interface CallLogRecord {
  id: string;
  lead_id: string;
  phone_number: string;
  status: string;
  call_length: number;
  call_date: string;
  user_id: string;
  campaign_id: string;
  recording: unknown[];
}

export interface CallLogUpdateResponse {
  success: boolean;
  id: string;
  lead_id: string;
  list_id: string;
  campaign_id: string;
  user_id: string;
  phone_number: string;
  status: string;
  call_length: number;
  call_date: string;
  recording: unknown[];
}

export interface CallLogRetrieveParams {
  id?: string;
  lead_id?: string;
  campaign_id?: string;
  queue_id?: string;
  list_id?: string;
  user_id?: string;
  status?: string;
  phone_number?: string;
  number_dialed?: string;
  first_name?: string;
  last_name?: string;
  start_time?: string;
  end_time?: string;
  limit?: number;
  offset?: number;
  order?: string;
  call_type?: string;
  called_count?: number;
  include_recordings?: number;
}

export interface CallLogRetrieveResponse {
  offset: number;
  limit: number;
  total_found: number;
  results: CallLogRecord[];
}
