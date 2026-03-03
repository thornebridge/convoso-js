export interface Recording {
  recording_id: string;
  lead_id: string;
  start_time: string;
  end_time: string;
  seconds: number;
  url: string;
}

export interface PaginatedParams {
  offset?: number;
  limit?: number;
}
