export interface AgentPerformanceSearchParams {
  date_start?: string;
  date_end?: string;
  campaign_ids?: string;
  list_ids?: string;
  queue_ids?: string;
  user_ids?: string;
  status_ids?: string;
}

export interface AgentPerformanceEntry {
  user_id: string;
  name: string;
  calls: number;
  human_answered: number;
  talk_sec_pt: number;
  wait_sec_pt: number;
  pause_sec_pt: number;
  wrap_sec_pt: number;
  talk_sec: string;
  wait_sec: string;
  pause_sec: string;
  wrap_sec: string;
  total_time: string;
  call_type: string;
}

export type AgentPerformanceSearchResponse = AgentPerformanceEntry[];
