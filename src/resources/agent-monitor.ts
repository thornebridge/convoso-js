import { BaseResource } from './base.js';
import type {
  AgentMonitorLogoutParams,
  AgentMonitorLogoutResponse,
  AgentMonitorSearchParams,
  AgentMonitorSearchResponse,
} from '../types/agent-monitor.js';

export class AgentMonitorResource extends BaseResource {
  async logout(params: AgentMonitorLogoutParams): Promise<AgentMonitorLogoutResponse> {
    return this.http.post('/agent-monitor/logout', params);
  }

  async search(params?: AgentMonitorSearchParams): Promise<AgentMonitorSearchResponse> {
    return this.http.post('/agent-monitor/search', params);
  }
}
