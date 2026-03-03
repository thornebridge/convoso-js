export interface LeadPostInsertParams {
  /** Criteria key for validation */
  criteria_key: string;
  /** Phone number to validate and insert */
  phone_number: string;
  /** Country phone code */
  phone_code?: string;
  /** Lead status code */
  status?: string;
  /** Email address */
  email?: string;
  /** First name */
  first_name?: string;
  /** Last name */
  last_name?: string;
}

export interface LeadPostInsertResponse {
  /** True if lead accepted, false if rejected */
  result: string;
  /** ID of created lead (if accepted) */
  lead_id: string;
  /** Reason for rejection (if rejected) */
  error_description: string;
}
