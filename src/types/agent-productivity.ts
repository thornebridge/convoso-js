export interface AgentProductivitySearchParams {
  /** Start date in YYYY-MM-DD format */
  date_start?: string;
  /** End date in YYYY-MM-DD format */
  date_end?: string;
  /** Filter by specific campaign ID */
  campaign_id?: string;
  /** Filter by agent emails (comma-separated) */
  agent_emails?: string;
  /** Pagination offset (default 0) */
  offset?: number;
  /** Results per page (default/max 1000) */
  limit?: number;
}

export interface AgentProductivityEntry {
  /** Unique event ID */
  id: string;
  /** Agent's user ID */
  user_id: string;
  /** Current state (LOGIN, Ready, NotReady, LogOut) */
  state: string;
  /** Availability status code (e.g. AVAILABLE, READY_CALLS, BREAK, LUNCH) */
  availability_code: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** Unix timestamp of event */
  event_epoch: number;
  /** Seconds elapsed in day for this event */
  event_sec: number;
  /** Event timestamp in YYYY-MM-DD HH:MM:SS format */
  created_at: string;
  /** Agent's full name */
  user_name: string;
  /** Campaign name */
  campaign_name: string;
}

export interface AgentProductivitySearchResponse {
  /** Array of productivity event entries */
  entries: AgentProductivityEntry[];
}
