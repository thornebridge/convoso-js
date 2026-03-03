export interface LeadPostInsertParams {
  criteria_key: string;
  phone_number: string;
  phone_code?: string;
  status?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface LeadPostInsertResponse {
  result: string;
  lead_id: string;
  error_description: string;
}
