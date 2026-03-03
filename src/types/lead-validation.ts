export interface LeadValidationSearchParams {
  /** Criteria key for validation */
  criteria_key: string;
  /** Phone number to validate */
  phone_number: string;
  /** State code for validation */
  state?: string;
  /** Postal code for validation */
  postal_code?: string;
}

export interface LeadValidationSearchResponse {
  /** Whether the operation completed (does not indicate acceptance) */
  success: boolean;
  /** Validation result: "Accepted" or "Denied" */
  result: string;
}
