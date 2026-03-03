export interface RevenueUpdateParams {
  call_log_id: string;
  revenue?: number;
  return?: number;
}

export interface RevenueUpdateResponse {
  success: boolean;
  data: { call_log_id: string };
}
