import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('AgentProductivity', () => {
  const client = createMockClient(() => ({
    entries: [{ id: '1001', user_id: '101', state: 'Ready', availability_code: 'AVAIL', campaign_id: '1', event_epoch: 1709500000, event_sec: 300, created_at: '2026-03-01 10:00:00', user_name: 'John Doe', campaign_name: 'Sales' }],
  }));

  it('search()', async () => {
    const result = await client.agentProductivity.search({ campaign_id: '1' });
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].state).toBe('Ready');
  });
});
