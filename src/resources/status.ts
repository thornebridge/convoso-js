import { BaseResource } from './base.js';
import type {
  StatusSearchParams,
  StatusSearchResponse,
  StatusInsertParams,
  StatusInsertResponse,
  StatusUpdateParams,
  StatusUpdateResponse,
} from '../types/status.js';

export class StatusResource extends BaseResource {
  async search(params: StatusSearchParams): Promise<StatusSearchResponse> {
    return this.http.post('/status/search', params);
  }

  async insert(params: StatusInsertParams): Promise<StatusInsertResponse> {
    return this.http.post('/status/insert', params);
  }

  async update(params: StatusUpdateParams): Promise<StatusUpdateResponse> {
    return this.http.post('/status/update', params);
  }
}
