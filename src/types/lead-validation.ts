export interface LeadValidationSearchParams {
  criteria_key: string;
  phone_number: string;
  state?: string;
  postal_code?: string;
}

export interface LeadValidationSearchResponse {
  success: boolean;
  result: string;
}
