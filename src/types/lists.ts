export interface ListSearchParams {
  /** Status filter: 0 (inactive) or 1 (active) */
  status: number;
  /** Filter by list ID */
  id?: string;
  /** Filter by campaign ID */
  campaign_id?: string;
}

export interface ListRecord {
  /** Unique list ID */
  id: string;
  /** List name */
  name: string;
  /** List status: Y (active) or N (inactive) */
  status: string;
  /** Timestamp of last call activity */
  last_called_at: string;
}

export interface ListSearchResponse {
  /** Array of list objects */
  data: ListRecord[];
}

export interface ListInsertParams {
  /** List name (minimum 10 characters) */
  name: string;
  /** Associated campaign ID */
  campaign_id: string;
  /** List description (0-255 characters) */
  description?: string;
  /** Status: 1 (active) or 0 (inactive, default 1) */
  status?: number;
}

export interface ListInsertResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the new list ID */
  data: { list_id: string };
  /** List ID (duplicate field) */
  id: string;
}

export interface ListUpdateParams {
  /** ID of the list to update */
  list_id: string;
  /** List name (minimum 10 characters) */
  name?: string;
  /** Associated campaign ID */
  campaign_id?: string;
  /** List description (0-255 characters) */
  description?: string;
  /** Status: 1 (active) or 0 (inactive) */
  status?: number;
}

export interface ListUpdateResponse {
  /** Success status */
  success: boolean;
  /** Response data containing the updated list ID */
  data: { list_id: string };
}

export interface ListDeleteParams {
  /** ID of the list to delete */
  list_id: string;
}

export interface ListDeleteResponse {
  /** Success status of deletion */
  success: boolean;
}
