export interface UserActivitySearchParams {
  campaign_id?: string;
  queue_id?: string;
  user_id?: string;
  filter_by_skill_options?: string;
}

export interface UserActivitySearchResponse {
  success: boolean;
  data: {
    available_agents: number;
    logged_in_agents: number;
  };
}
