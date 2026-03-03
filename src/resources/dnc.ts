import { BaseResource } from './base.js';
import type {
  DncSearchParams,
  DncSearchResponse,
  DncInsertParams,
  DncInsertResponse,
  DncUpdateParams,
  DncUpdateResponse,
  DncDeleteParams,
  DncDeleteResponse,
  DncRecord,
} from '../types/dnc.js';
import type { PageOptions } from '../types/common.js';

export class DncResource extends BaseResource {
  async search(params?: DncSearchParams): Promise<DncSearchResponse> {
    return this.http.post('/dnc/search', params);
  }

  async *searchAll(params?: Omit<DncSearchParams, 'offset' | 'limit'> & PageOptions): AsyncGenerator<DncRecord> {
    const { pageSize, ...rest } = params ?? {};
    const limit = pageSize ?? 100;
    let offset = 0;
    while (true) {
      const page = await this.search({ ...rest, offset, limit });
      for (const item of page.entries) yield item;
      if (page.entries.length < limit) break;
      offset += limit;
    }
  }

  async insert(params: DncInsertParams): Promise<DncInsertResponse> {
    return this.http.post('/dnc/insert', params);
  }

  async update(params: DncUpdateParams): Promise<DncUpdateResponse> {
    return this.http.post('/dnc/update', params);
  }

  async delete(params: DncDeleteParams): Promise<DncDeleteResponse> {
    return this.http.post('/dnc/delete', params);
  }
}
