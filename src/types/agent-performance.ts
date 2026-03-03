export interface AgentPerformanceSearchParams {
  /** Start date in YYYY-MM-DD format */
  date_start?: string;
  /** End date in YYYY-MM-DD format */
  date_end?: string;
  /** Filter by campaign IDs (comma-separated) */
  campaign_ids?: string;
  /** Filter by list IDs (comma-separated) */
  list_ids?: string;
  /** Filter by queue IDs (comma-separated) */
  queue_ids?: string;
  /** Filter by user IDs (comma-separated) */
  user_ids?: string;
  /** Filter by status IDs (comma-separated) */
  status_ids?: string;
}

export interface AgentPerformanceEntry {
  /** Unique agent identifier */
  user_id: string;
  /** Agent's full name */
  name: string;
  /** Total number of calls made during period */
  calls: number;
  /** Number of calls answered by a human (not voicemail/machine) */
  human_answered: number;
  /** Percentage of time spent talking with contacts */
  talk_sec_pt: number;
  /** Percentage of time spent waiting between calls */
  wait_sec_pt: number;
  /** Percentage of time agent was on pause */
  pause_sec_pt: number;
  /** Percentage of time spent on call wrap-up */
  wrap_sec_pt: number;
  /** Total talk time in HH:MM:SS format */
  talk_sec: string;
  /** Total wait time in HH:MM:SS format */
  wait_sec: string;
  /** Total pause time in HH:MM:SS format */
  pause_sec: string;
  /** Total wrap-up time in HH:MM:SS format */
  wrap_sec: string;
  /** Total logged-in time in HH:MM:SS format */
  total_time: string;
  /** Type of calls (inbound, outbound, blended) */
  call_type: string;
}

export type AgentPerformanceSearchResponse = AgentPerformanceEntry[];
