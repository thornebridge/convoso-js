import { BaseResource } from './base.js';
import type {
  UserActivitySearchParams,
  UserActivitySearchResponse,
} from '../types/user-activity.js';

export class UserActivityResource extends BaseResource {
  async search(params?: UserActivitySearchParams): Promise<UserActivitySearchResponse> {
    return this.http.post('/user-activity/search', params);
  }
}
