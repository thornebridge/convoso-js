export interface AgentProductivitySearchParams {
  date_start?: string;
  date_end?: string;
  campaign_id?: string;
  agent_emails?: string;
  offset?: number;
  limit?: number;
}

export interface AgentProductivityEntry {
  id: string;
  user_id: string;
  state: string;
  availability_code: string;
  campaign_id: string;
  event_epoch: number;
  event_sec: number;
  created_at: string;
  user_name: string;
  campaign_name: string;
}

export interface AgentProductivitySearchResponse {
  entries: AgentProductivityEntry[];
}
