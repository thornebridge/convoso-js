import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('CallLogs', () => {
  const client = createMockClient((path, params) => {
    if (path === '/log/update') return {
      success: true, id: params.get('call_log_id'), lead_id: '200', list_id: '333',
      campaign_id: '1', user_id: '101', phone_number: '5551234567',
      status: 'SALE', call_length: 180, call_date: '2026-03-01 14:00:00', recording: [],
    };
    if (path === '/log/retrieve') return {
      offset: 0, limit: 10, total_found: 1,
      results: [{ id: '5001', lead_id: '200', phone_number: '5551234567', status: 'SALE', call_length: 180, call_date: '2026-03-01 14:00:00', user_id: '101', campaign_id: '1', recording: [] }],
    };
    return {};
  });

  it('update()', async () => {
    const result = await client.callLogs.update({ call_log_id: '5001', extra_field_01: 'value1' });
    expect(result.success).toBe(true);
    expect(result.id).toBe('5001');
  });

  it('retrieve()', async () => {
    const result = await client.callLogs.retrieve({ campaign_id: '1', limit: 10 });
    expect(result.total_found).toBe(1);
    expect(result.results).toHaveLength(1);
    expect(result.results[0].status).toBe('SALE');
  });
});
