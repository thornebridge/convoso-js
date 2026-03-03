export interface UserActivitySearchParams {
  /** Filter by campaign ID */
  campaign_id?: string;
  /** Filter by queue ID */
  queue_id?: string;
  /** Filter by specific user ID */
  user_id?: string;
  /** Filter by skills (comma-separated) */
  filter_by_skill_options?: string;
}

export interface UserActivitySearchResponse {
  /** Whether the operation completed successfully */
  success: boolean;
  /** Availability data */
  data: {
    /** Number of agents ready to take work */
    available_agents: number;
    /** Total number of logged-in agents */
    logged_in_agents: number;
  };
}
