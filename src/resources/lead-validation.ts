import { BaseResource } from './base.js';
import type {
  LeadValidationSearchParams,
  LeadValidationSearchResponse,
} from '../types/lead-validation.js';

export class LeadValidationResource extends BaseResource {
  async search(params: LeadValidationSearchParams): Promise<LeadValidationSearchResponse> {
    return this.http.post('/lead-validation/search', params);
  }
}
