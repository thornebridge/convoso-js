export interface RevenueUpdateParams {
  /** ID of the call log to update */
  call_log_id: string;
  /** Revenue amount (decimal) */
  revenue?: number;
  /** Return updated data: 1 for yes, 0 for no */
  return?: number;
}

export interface RevenueUpdateResponse {
  /** Whether the revenue was updated successfully */
  success: boolean;
  /** Response data with updated call log ID */
  data: { call_log_id: string };
}
