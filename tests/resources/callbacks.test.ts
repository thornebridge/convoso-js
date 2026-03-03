import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Callbacks', () => {
  const client = createMockClient((path, params) => {
    if (path === '/callbacks/search') return { offset: 0, limit: 20, total: 1, results: [{ id: '3001', lead_id: '200', list_id: '333', campaign_id: '1', callback_time: '2026-03-02 10:00 AM', stage: 'PENDING', recipient: 'system', comments: 'Follow up' }] };
    if (path === '/callbacks/insert') return { success: true, data: { callback_id: '3002' } };
    if (path === '/callbacks/update') return { success: true, data: { callback_id: params.get('callback_id') } };
    if (path === '/callbacks/delete') return { success: true };
    return {};
  });

  it('search()', async () => {
    const result = await client.callbacks.search({ campaign_id: '1' });
    expect(result.total).toBe(1);
    expect(result.results[0].stage).toBe('PENDING');
  });

  it('insert()', async () => {
    const result = await client.callbacks.insert({ lead_id: '200', recipient: 'system', callback_time_zone: -7, callback_time: '2026-03-02 10:00 AM' });
    expect(result.success).toBe(true);
    expect(result.data.callback_id).toBe('3002');
  });

  it('update()', async () => {
    const result = await client.callbacks.update({ callback_id: '3001', comments: 'Updated' });
    expect(result.success).toBe(true);
    expect(result.data.callback_id).toBe('3001');
  });

  it('delete()', async () => {
    const result = await client.callbacks.delete({ callback_id: '3001' });
    expect(result.success).toBe(true);
  });
});
