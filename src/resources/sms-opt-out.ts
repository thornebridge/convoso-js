import { BaseResource } from './base.js';
import type {
  SmsOptOutSearchParams,
  SmsOptOutSearchResponse,
  SmsOptOutInsertParams,
  SmsOptOutInsertResponse,
  SmsOptOutUpdateParams,
  SmsOptOutUpdateResponse,
} from '../types/sms-opt-out.js';

export class SmsOptOutResource extends BaseResource {
  async search(params?: SmsOptOutSearchParams): Promise<SmsOptOutSearchResponse> {
    return this.http.post('/sms-opt-out/search', params);
  }

  async insert(params: SmsOptOutInsertParams): Promise<SmsOptOutInsertResponse> {
    return this.http.post('/sms-opt-out/insert', params);
  }

  async update(params: SmsOptOutUpdateParams): Promise<SmsOptOutUpdateResponse> {
    return this.http.post('/sms-opt-out/update', params);
  }
}
