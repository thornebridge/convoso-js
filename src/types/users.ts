export interface UsersSearchParams {
  user: string;
  limit?: number;
  offset?: number;
}

export interface UserRecord {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_level: string;
  status: string;
  last_login: string;
  local_gmt: string;
  connection_type: string;
  extension: string[];
  acl_access_profile: string;
  allow_queue_selection: boolean;
  allow_callbacks: boolean;
  allow_transfers: boolean;
}

export type UsersSearchResponse = UserRecord[];

export interface UsersRecordingsParams {
  user: string;
  start_time?: string;
  end_time?: string;
  limit?: number;
  offset?: number;
}

export interface UsersRecordingsResponse {
  entries: Array<{
    recording_id: string;
    lead_id: string;
    start_time: string;
    end_time: string;
    seconds: number;
    url: string;
  }>;
}
