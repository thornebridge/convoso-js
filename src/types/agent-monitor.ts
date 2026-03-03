export interface AgentMonitorLogoutParams {
  user_id: string;
}

export interface AgentMonitorLogoutResponse {
  success: boolean;
}

export interface AgentMonitorSearchParams {
  campaign_id?: string;
  queue_id?: string;
  user_id?: string;
  filter_by_skill_options?: string;
}

export interface AgentMonitorAgent {
  user_id: string;
  user_full_name: string;
  campaign_id: string;
  campaign_name: string;
  queue_id: string;
  queue_name: string;
  extension: string;
  channel_type: string;
  call_type: string;
  calls_today: number;
  total_calls: number;
  status: string;
  status_label: string;
  status_time_sec: number;
  status_time_mmss: string;
}

export interface AgentMonitorSearchResponse {
  agents: AgentMonitorAgent[];
  call_data: Record<string, unknown>;
  queue_dialable_leads: number;
  queue_calls_today: number;
  agent_total: number;
  agent_incall: number;
  agent_ready: number;
  agent_paused: number;
}
