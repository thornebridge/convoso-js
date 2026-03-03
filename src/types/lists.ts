export interface ListSearchParams {
  status: number;
  id?: string;
  campaign_id?: string;
}

export interface ListRecord {
  id: string;
  name: string;
  status: string;
  last_called_at: string;
}

export interface ListSearchResponse {
  data: ListRecord[];
}

export interface ListInsertParams {
  name: string;
  campaign_id: string;
  description?: string;
  status?: number;
}

export interface ListInsertResponse {
  success: boolean;
  data: { list_id: string };
  id: string;
}

export interface ListUpdateParams {
  list_id: string;
  name?: string;
  campaign_id?: string;
  description?: string;
  status?: number;
}

export interface ListUpdateResponse {
  success: boolean;
  data: { list_id: string };
}

export interface ListDeleteParams {
  list_id: string;
}

export interface ListDeleteResponse {
  success: boolean;
}
