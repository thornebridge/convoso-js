import { BaseResource } from './base.js';
import type {
  SmsOptOutSearchParams,
  SmsOptOutSearchResponse,
  SmsOptOutInsertParams,
  SmsOptOutInsertResponse,
  SmsOptOutUpdateParams,
  SmsOptOutUpdateResponse,
  SmsOptOutRecord,
} from '../types/sms-opt-out.js';
import type { PageOptions } from '../types/common.js';

export class SmsOptOutResource extends BaseResource {
  async search(params?: SmsOptOutSearchParams): Promise<SmsOptOutSearchResponse> {
    return this.http.post('/sms-opt-out/search', params);
  }

  async *searchAll(params?: Omit<SmsOptOutSearchParams, 'offset' | 'limit'> & PageOptions): AsyncGenerator<SmsOptOutRecord> {
    const { pageSize, ...rest } = params ?? {};
    const limit = pageSize ?? 100;
    let offset = 0;
    while (true) {
      const page = await this.search({ ...rest, offset, limit });
      for (const item of page.records) yield item;
      if (page.records.length < limit) break;
      offset += limit;
    }
  }

  async insert(params: SmsOptOutInsertParams): Promise<SmsOptOutInsertResponse> {
    return this.http.post('/sms-opt-out/insert', params);
  }

  async update(params: SmsOptOutUpdateParams): Promise<SmsOptOutUpdateResponse> {
    return this.http.post('/sms-opt-out/update', params);
  }
}
