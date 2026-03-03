import { BaseResource } from './base.js';
import type {
  CallbackSearchParams,
  CallbackSearchResponse,
  CallbackInsertParams,
  CallbackInsertResponse,
  CallbackUpdateParams,
  CallbackUpdateResponse,
  CallbackDeleteParams,
  CallbackDeleteResponse,
  CallbackRecord,
} from '../types/callbacks.js';
import type { PageOptions } from '../types/common.js';

export class CallbacksResource extends BaseResource {
  async search(params?: CallbackSearchParams): Promise<CallbackSearchResponse> {
    return this.http.post('/callbacks/search', params);
  }

  async *searchAll(
    params?: Omit<CallbackSearchParams, 'offset' | 'limit'> & PageOptions,
  ): AsyncGenerator<CallbackRecord> {
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

  async insert(params: CallbackInsertParams): Promise<CallbackInsertResponse> {
    return this.http.post('/callbacks/insert', params);
  }

  async update(params: CallbackUpdateParams): Promise<CallbackUpdateResponse> {
    return this.http.post('/callbacks/update', params);
  }

  async delete(params: CallbackDeleteParams): Promise<CallbackDeleteResponse> {
    return this.http.post('/callbacks/delete', params);
  }
}
