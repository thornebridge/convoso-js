import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Leads', () => {
  const client = createMockClient((path, params) => {
    if (path === '/leads/search')
      return {
        results: [
          {
            id: '200',
            first_name: 'Jane',
            last_name: 'Smith',
            phone_number: '5551234567',
            email: 'jane@example.com',
            status: 'NEW',
            list_id: '333',
            created_at: '2026-03-01 09:00:00',
            modified_at: '2026-03-01 09:00:00',
            address1: '123 Main St',
            city: 'Los Angeles',
            state: 'CA',
            postal_code: '90001',
            country: 'US',
            carrier_name: 'AT&T',
            carrier_type: 'wireless',
          },
        ],
        offset: 0,
        limit: 10,
      };
    if (path === '/leads/insert') return { success: true, data: { lead_id: '201' }, id: '201' };
    if (path === '/leads/update')
      return { success: true, data: { lead_id: params.get('lead_id') } };
    if (path === '/leads/delete') return { success: true };
    if (path === '/leads/get-recordings')
      return {
        entries: [
          {
            recording_id: 'rec-001',
            lead_id: params.get('lead_id'),
            start_time: '2026-03-01 14:00:00',
            end_time: '2026-03-01 14:03:00',
            seconds: 180,
            url: 'https://recordings.convoso.com/rec-001.mp3',
          },
        ],
      };
    return {};
  });

  it('search()', async () => {
    const result = await client.leads.search({ list_id: '333', limit: 100 });
    expect(result.results).toHaveLength(1);
    expect(result.results[0].first_name).toBe('Jane');
  });

  it('insert()', async () => {
    const result = await client.leads.insert({
      list_id: '333',
      phone_number: '5551234567',
      first_name: 'John',
    });
    expect(result.success).toBe(true);
    expect(result.data.lead_id).toBe('201');
  });

  it('update()', async () => {
    const result = await client.leads.update({ lead_id: '200', first_name: 'Updated' });
    expect(result.success).toBe(true);
    expect(result.data.lead_id).toBe('200');
  });

  it('delete()', async () => {
    const result = await client.leads.delete({ lead_id: '200' });
    expect(result.success).toBe(true);
  });

  it('getRecordings()', async () => {
    const result = await client.leads.getRecordings({ lead_id: '200' });
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].recording_id).toBe('rec-001');
    expect(result.entries[0].seconds).toBe(180);
  });
});
