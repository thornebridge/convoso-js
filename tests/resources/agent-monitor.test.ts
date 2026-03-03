import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('AgentMonitor', () => {
  const client = createMockClient((path) => {
    if (path === '/agent-monitor/logout') return { success: true };
    if (path === '/agent-monitor/search') return {
      agents: [{ user_id: '101', user_full_name: 'John Doe', campaign_id: '1', campaign_name: 'Sales', queue_id: '10', queue_name: 'Main', extension: '8001', channel_type: 'phone', call_type: 'outbound', calls_today: 42, total_calls: 42, status: 'READY', status_label: 'Ready', status_time_sec: 120, status_time_mmss: '02:00' }],
      call_data: {}, queue_dialable_leads: 500, queue_calls_today: 300, agent_total: 10, agent_incall: 3, agent_ready: 5, agent_paused: 2,
    };
    return {};
  });

  it('logout()', async () => {
    const result = await client.agentMonitor.logout({ user_id: '101' });
    expect(result.success).toBe(true);
  });

  it('search()', async () => {
    const result = await client.agentMonitor.search({ campaign_id: '1' });
    expect(result.agents).toHaveLength(1);
    expect(result.agents[0].user_id).toBe('101');
    expect(result.agent_total).toBe(10);
  });
});
