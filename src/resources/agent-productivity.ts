import { BaseResource } from './base.js';
import type {
  AgentProductivitySearchParams,
  AgentProductivitySearchResponse,
} from '../types/agent-productivity.js';

export class AgentProductivityResource extends BaseResource {
  async search(params?: AgentProductivitySearchParams): Promise<AgentProductivitySearchResponse> {
    return this.http.post('/agent-productivity/search', params);
  }
}
