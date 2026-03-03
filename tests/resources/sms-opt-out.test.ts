import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('SmsOptOut', () => {
  const client = createMockClient((path, params) => {
    if (path === '/sms-opt-out/search')
      return {
        success: true,
        offset: 0,
        limit: 100,
        total: 1,
        records: [
          {
            id: '9001',
            phone_number: '5558887777',
            phone_code: '1',
            reason: 'User requested',
            purpose: 'Marketing',
            insert_date: '2026-03-01',
            campaign_id: '0',
            campaign_name: 'Global',
          },
        ],
      };
    if (path === '/sms-opt-out/insert') return { success: true };
    if (path === '/sms-opt-out/update') return { success: true, data: { id: params.get('id') } };
    return {};
  });

  it('search()', async () => {
    const result = await client.smsOptOut.search({ campaign_id: '0' });
    expect(result.total).toBe(1);
    expect(result.records[0].phone_number).toBe('5558887777');
  });

  it('insert()', async () => {
    const result = await client.smsOptOut.insert({
      phone_number: '5558887777',
      phone_code: '1',
      campaign_id: '0',
    });
    expect(result.success).toBe(true);
  });

  it('update()', async () => {
    const result = await client.smsOptOut.update({ id: '9001', reason: 'Updated reason' });
    expect(result.success).toBe(true);
    expect(result.data.id).toBe('9001');
  });
});
