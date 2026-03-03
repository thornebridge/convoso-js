export interface CallbackSearchParams {
  start_date?: string;
  end_date?: string;
  offset?: number;
  limit?: number;
  campaign_id?: string;
  id?: string;
  lead_id?: string;
  list_id?: string;
  recipient?: string;
  user_id?: string;
  stage?: string;
}

export interface CallbackRecord {
  id: string;
  lead_id: string;
  list_id: string;
  campaign_id: string;
  callback_time: string;
  stage: string;
  recipient: string;
  comments: string;
}

export interface CallbackSearchResponse {
  offset: number;
  limit: number;
  total: number;
  results: CallbackRecord[];
}

export interface CallbackInsertParams {
  lead_id: string;
  recipient: string;
  callback_time_zone: number;
  callback_time: string;
  user_id?: string;
  comments?: string;
}

export interface CallbackInsertResponse {
  success: boolean;
  data: { callback_id: string };
}

export interface CallbackUpdateParams {
  callback_id: string;
  user_id?: string;
  recipient?: string;
  comments?: string;
  callback_time_zone?: number;
  callback_time?: string;
  callback_status?: string;
}

export interface CallbackUpdateResponse {
  success: boolean;
  data: { callback_id: string };
}

export interface CallbackDeleteParams {
  callback_id: string;
}

export interface CallbackDeleteResponse {
  success: boolean;
}
