import { BaseResource } from './base.js';
import type {
  ListSearchParams,
  ListSearchResponse,
  ListInsertParams,
  ListInsertResponse,
  ListUpdateParams,
  ListUpdateResponse,
  ListDeleteParams,
  ListDeleteResponse,
} from '../types/lists.js';

export class ListsResource extends BaseResource {
  async search(params: ListSearchParams): Promise<ListSearchResponse> {
    return this.http.post('/lists/search', params);
  }

  async insert(params: ListInsertParams): Promise<ListInsertResponse> {
    return this.http.post('/lists/insert', params);
  }

  async update(params: ListUpdateParams): Promise<ListUpdateResponse> {
    return this.http.post('/lists/update', params);
  }

  async delete(params: ListDeleteParams): Promise<ListDeleteResponse> {
    return this.http.post('/lists/delete', params);
  }
}
