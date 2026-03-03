import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('AgentPerformance', () => {
  const client = createMockClient(() => [{
    user_id: '101', name: 'John Doe', calls: 100, human_answered: 80,
    talk_sec_pt: 45.5, wait_sec_pt: 20.0, pause_sec_pt: 10.0, wrap_sec_pt: 24.5,
    talk_sec: '03:30:00', wait_sec: '01:30:00', pause_sec: '00:45:00', wrap_sec: '01:50:00',
    total_time: '07:35:00', call_type: 'outbound',
  }]);

  it('search()', async () => {
    const result = await client.agentPerformance.search({ date_start: '2026-03-01', date_end: '2026-03-01' });
    expect(result).toHaveLength(1);
    expect(result[0].user_id).toBe('101');
    expect(result[0].calls).toBe(100);
  });
});
