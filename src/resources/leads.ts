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
  LeadRecord,
} from '../types/leads.js';
import type { PageOptions } from '../types/common.js';

export class LeadsResource extends BaseResource {
  async search(params?: LeadSearchParams): Promise<LeadSearchResponse> {
    return this.http.post('/leads/search', params);
  }

  async *searchAll(
    params?: Omit<LeadSearchParams, 'offset' | 'limit'> & PageOptions,
  ): AsyncGenerator<LeadRecord> {
    const { pageSize, ...rest } = params ?? {};
    const limit = pageSize ?? 100;
    let offset = 0;
    while (true) {
      const page = await this.search({ ...rest, offset, limit });
      for (const item of page.results) yield item;
      if (page.results.length < limit) break;
      offset += limit;
    }
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

  async *getRecordingsAll(
    params: Omit<LeadGetRecordingsParams, 'offset' | 'limit'> & PageOptions,
  ): AsyncGenerator<LeadGetRecordingsResponse['entries'][number]> {
    const { pageSize, ...rest } = params;
    const limit = pageSize ?? 100;
    let offset = 0;
    while (true) {
      const page = await this.getRecordings({ ...rest, offset, limit });
      for (const item of page.entries) yield item;
      if (page.entries.length < limit) break;
      offset += limit;
    }
  }
}
