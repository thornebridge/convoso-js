export interface AgentMonitorLogoutParams {
  /** User ID for the agent to be logged out */
  user_id: string;
}

export interface AgentMonitorLogoutResponse {
  /** Success status of the logout operation */
  success: boolean;
}

export interface AgentMonitorSearchParams {
  /** Filter by campaign ID */
  campaign_id?: string;
  /** Filter by queue ID */
  queue_id?: string;
  /** Filter by user ID */
  user_id?: string;
  /** Filter by skill options (comma-separated) */
  filter_by_skill_options?: string;
}

export interface AgentMonitorAgent {
  /** Unique agent identifier */
  user_id: string;
  /** Full name of the agent */
  user_full_name: string;
  /** ID of current campaign */
  campaign_id: string;
  /** Name of current campaign */
  campaign_name: string;
  /** ID of current queue */
  queue_id: string;
  /** Name of current queue */
  queue_name: string;
  /** Agent phone extension */
  extension: string;
  /** Communication channel type (phone, email, chat, etc.) */
  channel_type: string;
  /** Type of current call (inbound, outbound) */
  call_type: string;
  /** Number of calls this agent made today */
  calls_today: number;
  /** Total calls for current session */
  total_calls: number;
  /** Current status code (READY, INCALL, PAUSED, etc.) */
  status: string;
  /** Human-readable status label */
  status_label: string;
  /** Seconds in current status */
  status_time_sec: number;
  /** Time in current status in MM:SS format */
  status_time_mmss: string;
}

export interface AgentMonitorSearchResponse {
  /** Array of agent objects with real-time status and metrics */
  agents: AgentMonitorAgent[];
  /** Aggregated call statistics for the selected scope */
  call_data: Record<string, unknown>;
  /** Number of dialable leads available in queue */
  queue_dialable_leads: number;
  /** Total calls processed by queue today */
  queue_calls_today: number;
  /** Total number of agents */
  agent_total: number;
  /** Number of agents currently in a call */
  agent_incall: number;
  /** Number of agents ready to take calls */
  agent_ready: number;
  /** Number of agents currently paused */
  agent_paused: number;
}
