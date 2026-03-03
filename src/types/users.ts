export interface UsersSearchParams {
  /** Comma-delimited users to search by email, first name, or last name */
  user: string;
  /** Results per page (default 20) */
  limit?: number;
  /** Pagination offset (default 0) */
  offset?: number;
}

export interface UserRecord {
  /** User ID */
  id: string;
  /** Email address */
  email: string;
  /** First name */
  first_name: string;
  /** Last name */
  last_name: string;
  /** User privilege level (agent, supervisor, admin) */
  user_level: string;
  /** User status (active, inactive, suspended) */
  status: string;
  /** Timestamp of last login */
  last_login: string;
  /** Local GMT offset (e.g., -7.00) */
  local_gmt: string;
  /** Connection type (softphone, VoIP, desk_phone) */
  connection_type: string;
  /** Array of assigned phone extensions */
  extension: string[];
  /** Access control profile */
  acl_access_profile: string;
  /** Whether the user can select their own queues */
  allow_queue_selection: boolean;
  /** Whether the user can manage callbacks */
  allow_callbacks: boolean;
  /** Whether the user can transfer calls */
  allow_transfers: boolean;
}

export type UsersSearchResponse = UserRecord[];

export interface UsersRecordingsParams {
  /** Comma-delimited user emails */
  user: string;
  /** Start time in YYYY-MM-DD HH:MM:SS format */
  start_time?: string;
  /** End time in YYYY-MM-DD HH:MM:SS format */
  end_time?: string;
  /** Results per page (default 20) */
  limit?: number;
  /** Pagination offset (default 0) */
  offset?: number;
}

export interface UsersRecordingsResponse {
  /** Array of recording objects */
  entries: Array<{
    /** Unique recording ID */
    recording_id: string;
    /** Associated lead ID */
    lead_id: string;
    /** Recording start timestamp */
    start_time: string;
    /** Recording end timestamp */
    end_time: string;
    /** Duration in seconds */
    seconds: number;
    /** Recording URL for playback/download */
    url: string;
  }>;
}
