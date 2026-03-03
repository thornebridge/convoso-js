export interface Recording {
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
}

export interface PaginatedParams {
  /** Pagination offset (default 0) */
  offset?: number;
  /** Results per page */
  limit?: number;
}

export interface PageOptions {
  /** Number of records per page (default: 100) */
  pageSize?: number;
}
