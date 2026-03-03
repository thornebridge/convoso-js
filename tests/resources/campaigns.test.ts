import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Campaigns', () => {
  const client = createMockClient((path) => {
    if (path === '/campaigns/search') return { data: [{ id: '1', name: 'Sales Campaign', status: 'Y', last_call_date: {} }] };
    if (path === '/campaigns/status') return { success: true };
    return {};
  });

  it('search()', async () => {
    const result = await client.campaigns.search();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Sales Campaign');
  });

  it('status()', async () => {
    const result = await client.campaigns.status({ campaign_id: '1', status: true });
    expect(result.success).toBe(true);
  });
});
