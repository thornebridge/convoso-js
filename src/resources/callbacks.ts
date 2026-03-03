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
} from '../types/callbacks.js';

export class CallbacksResource extends BaseResource {
  async search(params?: CallbackSearchParams): Promise<CallbackSearchResponse> {
    return this.http.post('/callbacks/search', params);
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
