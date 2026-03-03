import { BaseResource } from './base.js';
import type {
  LeadSearchParams,
  LeadSearchResponse,
  LeadInsertParams,
  LeadInsertResponse,
  LeadUpdateParams,
  LeadUpdateResponse,
  LeadDeleteParams,
  LeadDeleteResponse,
  LeadGetRecordingsParams,
  LeadGetRecordingsResponse,
} from '../types/leads.js';

export class LeadsResource extends BaseResource {
  async search(params?: LeadSearchParams): Promise<LeadSearchResponse> {
    return this.http.post('/leads/search', params);
  }

  async insert(params: LeadInsertParams): Promise<LeadInsertResponse> {
    return this.http.post('/leads/insert', params);
  }

  async update(params: LeadUpdateParams): Promise<LeadUpdateResponse> {
    return this.http.post('/leads/update', params);
  }

  async delete(params: LeadDeleteParams): Promise<LeadDeleteResponse> {
    return this.http.post('/leads/delete', params);
  }

  async getRecordings(params: LeadGetRecordingsParams): Promise<LeadGetRecordingsResponse> {
    return this.http.post('/leads/get-recordings', params);
  }
}
