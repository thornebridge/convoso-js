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
} from '../types/dnc.js';

export class DncResource extends BaseResource {
  async search(params?: DncSearchParams): Promise<DncSearchResponse> {
    return this.http.post('/dnc/search', params);
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
