import { BaseResource } from './base.js';
import type {
  AgentPerformanceSearchParams,
  AgentPerformanceSearchResponse,
} from '../types/agent-performance.js';

export class AgentPerformanceResource extends BaseResource {
  async search(params?: AgentPerformanceSearchParams): Promise<AgentPerformanceSearchResponse> {
    return this.http.post('/agent-performance/search', params);
  }
}
