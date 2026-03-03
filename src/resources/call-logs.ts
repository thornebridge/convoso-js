import { BaseResource } from './base.js';
import type {
  CallLogUpdateParams,
  CallLogUpdateResponse,
  CallLogRetrieveParams,
  CallLogRetrieveResponse,
} from '../types/call-logs.js';

export class CallLogsResource extends BaseResource {
  async update(params: CallLogUpdateParams): Promise<CallLogUpdateResponse> {
    return this.http.post('/log/update', params);
  }

  async retrieve(params?: CallLogRetrieveParams): Promise<CallLogRetrieveResponse> {
    return this.http.post('/log/retrieve', params);
  }
}
