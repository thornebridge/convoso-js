import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('DNC', () => {
  const client = createMockClient((path, params) => {
    if (path === '/dnc/search')
      return {
        offset: 0,
        limit: 100,
        total: 1,
        entries: [
          {
            id: '7001',
            phone_number: '5559999999',
            campaign_id: '0',
            insert_date: '2026-03-01',
            phone_code: '1',
            campaign_name: 'Global',
          },
        ],
      };
    if (path === '/dnc/insert') return { success: true, id: 7002 };
    if (path === '/dnc/update') return { success: true, id: parseInt(params.get('id') ?? '0') };
    if (path === '/dnc/delete') return { success: true };
    return {};
  });

  it('search()', async () => {
    const result = await client.dnc.search({ campaign_id: '0' });
    expect(result.total).toBe(1);
    expect(result.entries[0].phone_number).toBe('5559999999');
  });

  it('insert()', async () => {
    const result = await client.dnc.insert({
      phone_number: '5559999999',
      phone_code: '1',
      campaign_id: '0',
    });
    expect(result.success).toBe(true);
    expect(result.id).toBe(7002);
  });

  it('update()', async () => {
    const result = await client.dnc.update({ id: '7001', reason: 'Customer request' });
    expect(result.success).toBe(true);
  });

  it('delete()', async () => {
    const result = await client.dnc.delete({
      phone_number: '5559999999',
      phone_code: '1',
      campaign_id: '0',
    });
    expect(result.success).toBe(true);
  });
});
