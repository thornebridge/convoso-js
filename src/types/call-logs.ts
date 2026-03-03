export interface CallLogUpdateParams {
  /** ID of the call log to update */
  call_log_id: string;
  /** Custom extra field 01 value */
  extra_field_01?: string;
  /** Custom extra field 02 value */
  extra_field_02?: string;
}

export interface CallLogRecord {
  /** Unique call log ID */
  id: string;
  /** Associated lead ID */
  lead_id: string;
  /** Contact phone number */
  phone_number: string;
  /** Call status code */
  status: string;
  /** Call duration in seconds */
  call_length: number;
  /** Date and time of call */
  call_date: string;
  /** Agent user ID */
  user_id: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** Array of recording objects */
  recording: unknown[];
}

export interface CallLogUpdateResponse {
  /** Success status of update */
  success: boolean;
  /** Call log ID */
  id: string;
  /** Associated lead ID */
  lead_id: string;
  /** Associated list ID */
  list_id: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** Agent user ID */
  user_id: string;
  /** Phone number that was called */
  phone_number: string;
  /** Call status code */
  status: string;
  /** Call duration in seconds */
  call_length: number;
  /** Date and time of call */
  call_date: string;
  /** Array of recording objects */
  recording: unknown[];
}

export interface CallLogRetrieveParams {
  /** Specific call log ID */
  id?: string;
  /** Filter by lead ID */
  lead_id?: string;
  /** Filter by campaign ID */
  campaign_id?: string;
  /** Filter by queue ID */
  queue_id?: string;
  /** Filter by list ID */
  list_id?: string;
  /** Filter by agent user ID */
  user_id?: string;
  /** Filter by call status */
  status?: string;
  /** Filter by phone number called */
  phone_number?: string;
  /** Filter by number dialed */
  number_dialed?: string;
  /** Filter by lead first name */
  first_name?: string;
  /** Filter by lead last name */
  last_name?: string;
  /** Start time in YYYY-MM-DD HH:MM:SS format */
  start_time?: string;
  /** End time in YYYY-MM-DD HH:MM:SS format */
  end_time?: string;
  /** Results per page (default 10, range 1-500) */
  limit?: number;
  /** Pagination offset (default 0, max 40000) */
  offset?: number;
  /** Sort order: asc or desc */
  order?: string;
  /** Filter by call type (OUTBOUND, INBOUND, MANUAL, 3WAY) */
  call_type?: string;
  /** Filter by number of times called */
  called_count?: number;
  /** Include recordings: 0 or 1 */
  include_recordings?: number;
}

export interface CallLogRetrieveResponse {
  /** Pagination offset used in request */
  offset: number;
  /** Results per page */
  limit: number;
  /** Total matching records available */
  total_found: number;
  /** Array of call log objects */
  results: CallLogRecord[];
}
