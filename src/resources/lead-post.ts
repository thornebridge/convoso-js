import { BaseResource } from './base.js';
import type {
  LeadPostInsertParams,
  LeadPostInsertResponse,
} from '../types/lead-post.js';

export class LeadPostResource extends BaseResource {
  async insert(params: LeadPostInsertParams): Promise<LeadPostInsertResponse> {
    return this.http.post('/lead-post-validation/insert', params);
  }
}
