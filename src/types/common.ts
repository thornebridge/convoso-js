export interface Recording {
  /** Unique recording ID */
  recording_id: string;
  /** Associated lead ID */
  lead_id: string;
  /** Recording start time */
  start_time: string;
  /** Recording end time */
  end_time: string;
  /** Duration in seconds */
  seconds: number;
  /** Recording download/playback URL */
  url: string;
}

export interface PaginatedParams {
  /** Pagination offset (default 0) */
  offset?: number;
  /** Results per page */
  limit?: number;
}

export interface PageOptions {
  /** Number of records per page (default: 100) */
  pageSize?: number;
}

/** Options for the {@link batch} helper. */
export interface BatchOptions {
  /** Maximum number of concurrent operations. Default: 5. */
  concurrency?: number;
}

/** A single successful result from a batch operation. */
export interface BatchItemSuccess<T> {
  /** The status of this item. */
  status: 'fulfilled';
  /** The resolved value. */
  value: T;
  /** Zero-based index of this item in the input array. */
  index: number;
}

/** A single failed result from a batch operation. */
export interface BatchItemError {
  /** The status of this item. */
  status: 'rejected';
  /** The error that caused the failure. */
  reason: Error;
  /** Zero-based index of this item in the input array. */
  index: number;
}

/** Aggregated result of a batch operation. */
export interface BatchResult<T> {
  /** All results in input order, mirroring `Promise.allSettled()` semantics. */
  results: (BatchItemSuccess<T> | BatchItemError)[];
  /** Count of successful operations. */
  successCount: number;
  /** Count of failed operations. */
  errorCount: number;
}

/** Rate limit information extracted from response headers. */
export interface RateLimitInfo {
  /** Maximum requests allowed in the current window, or undefined if header absent. */
  limit?: number;
  /** Remaining requests in the current window, or undefined if header absent. */
  remaining?: number;
  /** Unix timestamp (seconds) when the rate limit window resets, or undefined if header absent. */
  reset?: number;
}
