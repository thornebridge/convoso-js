export interface CallbackSearchParams {
  /** Start date in YYYY-MM-DD format */
  start_date?: string;
  /** End date in YYYY-MM-DD format */
  end_date?: string;
  /** Pagination offset (default 0, max 50000) */
  offset?: number;
  /** Results per page (default 20, max 5000) */
  limit?: number;
  /** Filter by campaign ID */
  campaign_id?: string;
  /** Filter by callback ID */
  id?: string;
  /** Filter by lead ID */
  lead_id?: string;
  /** Filter by list ID */
  list_id?: string;
  /** Filter by recipient type: System or Personal */
  recipient?: string;
  /** Filter by user ID */
  user_id?: string;
  /** Filter by stage: COMPLETED, PAST_DUE, PENDING, DISMISSED */
  stage?: string;
}

export interface CallbackRecord {
  /** Callback ID */
  id: string;
  /** Associated lead ID */
  lead_id: string;
  /** Associated list ID */
  list_id: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** Scheduled callback time */
  callback_time: string;
  /** Current stage status (COMPLETED, PAST_DUE, PENDING, DISMISSED) */
  stage: string;
  /** Callback recipient type (system or personal) */
  recipient: string;
  /** Callback notes/comments */
  comments: string;
}

export interface CallbackSearchResponse {
  /** Pagination offset */
  offset: number;
  /** Results per page */
  limit: number;
  /** Total matching callbacks */
  total: number;
  /** Array of callback objects */
  results: CallbackRecord[];
}

export interface CallbackInsertParams {
  /** ID of the lead for callback */
  lead_id: string;
  /** Recipient type: system or personal */
  recipient: string;
  /** Timezone offset (e.g., -7.00 for MST, -5.00 for EST) */
  callback_time_zone: number;
  /** Callback time in YYYY-MM-DD hh:mm AM/PM format */
  callback_time: string;
  /** Assign callback to specific user/agent */
  user_id?: string;
  /** Callback comments/notes */
  comments?: string;
}

export interface CallbackInsertResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the new callback ID */
  data: { callback_id: string };
}

export interface CallbackUpdateParams {
  /** ID of the callback to update */
  callback_id: string;
  /** Reassign callback to different user */
  user_id?: string;
  /** Recipient type: system or personal */
  recipient?: string;
  /** Callback comments/notes */
  comments?: string;
  /** Timezone offset (e.g., -7.00 for MST) */
  callback_time_zone?: number;
  /** Callback time in YYYY-MM-DD hh:mm AM/PM format */
  callback_time?: string;
  /** Callback status: dismissed */
  callback_status?: string;
}

export interface CallbackUpdateResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the updated callback ID */
  data: { callback_id: string };
}

export interface CallbackDeleteParams {
  /** ID of the callback to delete */
  callback_id: string;
}

export interface CallbackDeleteResponse {
  /** Success status of deletion */
  success: boolean;
}
