import { HttpClient } from './http.js';
import { AgentMonitorResource } from './resources/agent-monitor.js';
import { AgentPerformanceResource } from './resources/agent-performance.js';
import { AgentProductivityResource } from './resources/agent-productivity.js';
import { CallLogsResource } from './resources/call-logs.js';
import { CallbacksResource } from './resources/callbacks.js';
import { CampaignsResource } from './resources/campaigns.js';
import { DncResource } from './resources/dnc.js';
import { LeadsResource } from './resources/leads.js';
import { LeadPostResource } from './resources/lead-post.js';
import { LeadValidationResource } from './resources/lead-validation.js';
import { ListsResource } from './resources/lists.js';
import { RevenueResource } from './resources/revenue.js';
import { SmsOptOutResource } from './resources/sms-opt-out.js';
import { StatusResource } from './resources/status.js';
import { UserActivityResource } from './resources/user-activity.js';
import { UsersResource } from './resources/users.js';

export interface ConvosoOptions {
  authToken: string;
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
}

export class Convoso {
  readonly agentMonitor: AgentMonitorResource;
  readonly agentPerformance: AgentPerformanceResource;
  readonly agentProductivity: AgentProductivityResource;
  readonly callLogs: CallLogsResource;
  readonly callbacks: CallbacksResource;
  readonly campaigns: CampaignsResource;
  readonly dnc: DncResource;
  readonly leads: LeadsResource;
  readonly leadPost: LeadPostResource;
  readonly leadValidation: LeadValidationResource;
  readonly lists: ListsResource;
  readonly revenue: RevenueResource;
  readonly smsOptOut: SmsOptOutResource;
  readonly status: StatusResource;
  readonly userActivity: UserActivityResource;
  readonly users: UsersResource;

  constructor(options: ConvosoOptions) {
    const http = new HttpClient({
      authToken: options.authToken,
      baseUrl: options.baseUrl,
      fetch: options.fetch,
    });

    this.agentMonitor = new AgentMonitorResource(http);
    this.agentPerformance = new AgentPerformanceResource(http);
    this.agentProductivity = new AgentProductivityResource(http);
    this.callLogs = new CallLogsResource(http);
    this.callbacks = new CallbacksResource(http);
    this.campaigns = new CampaignsResource(http);
    this.dnc = new DncResource(http);
    this.leads = new LeadsResource(http);
    this.leadPost = new LeadPostResource(http);
    this.leadValidation = new LeadValidationResource(http);
    this.lists = new ListsResource(http);
    this.revenue = new RevenueResource(http);
    this.smsOptOut = new SmsOptOutResource(http);
    this.status = new StatusResource(http);
    this.userActivity = new UserActivityResource(http);
    this.users = new UsersResource(http);
  }
}
