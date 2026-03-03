import { BaseResource } from './base.js';
import type {
  CallLogUpdateParams,
  CallLogUpdateResponse,
  CallLogRetrieveParams,
  CallLogRetrieveResponse,
  CallLogRecord,
} from '../types/call-logs.js';
import type { PageOptions } from '../types/common.js';

export class CallLogsResource extends BaseResource {
  async update(params: CallLogUpdateParams): Promise<CallLogUpdateResponse> {
    return this.http.post('/log/update', params);
  }

  async retrieve(params?: CallLogRetrieveParams): Promise<CallLogRetrieveResponse> {
    return this.http.post('/log/retrieve', params);
  }

  async *retrieveAll(params?: Omit<CallLogRetrieveParams, 'offset' | 'limit'> & PageOptions): AsyncGenerator<CallLogRecord> {
    const { pageSize, ...rest } = params ?? {};
    const limit = pageSize ?? 100;
    let offset = 0;
    while (true) {
      const page = await this.retrieve({ ...rest, offset, limit });
      for (const item of page.results) yield item;
      if (page.results.length < limit) break;
      offset += limit;
    }
  }
}
