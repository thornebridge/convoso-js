import { BaseResource } from './base.js';
import type {
  UsersSearchParams,
  UsersSearchResponse,
  UsersRecordingsParams,
  UsersRecordingsResponse,
} from '../types/users.js';

export class UsersResource extends BaseResource {
  async search(params: UsersSearchParams): Promise<UsersSearchResponse> {
    return this.http.post('/users/search', params);
  }

  async recordings(params: UsersRecordingsParams): Promise<UsersRecordingsResponse> {
    return this.http.post('/users/recordings', params);
  }
}
