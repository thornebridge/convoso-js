export interface StatusSearchParams {
  /** Search by status abbreviation or description */
  query: string;
}

export interface StatusRecord {
  /** Status code (abbreviation) */
  status: string;
  /** Full status name */
  name: string;
  /** Whether this is a final status: Y or N */
  final: string;
  /** Whether contact was reached: Y or N */
  reached: string;
  /** Whether outcome was successful: Y or N */
  success: string;
  /** Whether to add to Do-Not-Call list: Y or N */
  dnc: string;
  /** Whether callbacks are allowed: Y or N */
  callback: string;
  /** Whether contact was established: Y or N */
  contact: string;
  /** Whether this is a voicemail status: Y or N */
  voicemail: string;
  /** Display color in hex format */
  hex_color: string;
}

export interface StatusSearchResponse {
  /** Array of matching status objects */
  data: StatusRecord[];
}

export interface StatusInsertParams {
  /** Status code (2-6 alphanumeric characters) */
  status: string;
  /** Status name */
  name: string;
  /** Whether this is a final status: Y or N */
  final: string;
  /** Whether contact was reached: Y or N */
  reached: string;
  /** Whether outcome was successful: Y or N */
  success: string;
  /** Whether to add to Do-Not-Call list: Y or N */
  dnc: string;
  /** Whether callbacks are allowed: Y or N */
  callback: string;
  /** Whether contact was established: Y or N */
  contact: string;
  /** Whether this is a voicemail status: Y or N */
  voicemail: string;
  /** Display color in hex format (do not include #) */
  hex_color?: string;
}

export interface StatusInsertResponse {
  /** Whether the status was created successfully */
  success: boolean;
  /** Response code (200 for success) */
  code: number;
  /** Response data with new status details */
  data: { new: string; status: string };
}

export interface StatusUpdateParams {
  /** Status code to update (only custom statuses can be modified) */
  status: string;
  /** Status name */
  name?: string;
  /** Display color in hex format (do not include #) */
  hex_color?: string;
  /** Whether this is a final status: Y or N */
  final?: string;
  /** Whether contact was reached: Y or N */
  reached?: string;
  /** Whether outcome was successful: Y or N */
  success?: string;
  /** Whether to add to Do-Not-Call list: Y or N */
  dnc?: string;
  /** Whether callbacks are allowed: Y or N */
  callback?: string;
  /** Whether contact was established: Y or N */
  contact?: string;
  /** Whether this is a voicemail status: Y or N */
  voicemail?: string;
}

export interface StatusUpdateResponse {
  /** Whether the status was updated successfully */
  success: boolean;
  /** Response data with updated status code */
  data: { status: string };
}
