import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Status', () => {
  const client = createMockClient((path, params) => {
    if (path === '/status/search') return { data: [{ status: 'SALE', name: 'Sale', final: 'Y', reached: 'Y', success: 'Y', dnc: 'N', callback: 'N', contact: 'Y', voicemail: 'N', hex_color: '#00FF00' }] };
    if (path === '/status/insert') return { success: true, code: 200, data: { new: 'Y', status: params.get('status') } };
    if (path === '/status/update') return { success: true, data: { status: params.get('status') } };
    return {};
  });

  it('search()', async () => {
    const result = await client.status.search({ query: 'SALE' });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].status).toBe('SALE');
    expect(result.data[0].final).toBe('Y');
  });

  it('insert()', async () => {
    const result = await client.status.insert({ status: 'XFER', name: 'Transfer', final: 'N', reached: 'Y', success: 'N', dnc: 'N', callback: 'N', contact: 'Y', voicemail: 'N' });
    expect(result.success).toBe(true);
    expect(result.data.status).toBe('XFER');
  });

  it('update()', async () => {
    const result = await client.status.update({ status: 'SALE', hex_color: '#00CC00' });
    expect(result.success).toBe(true);
    expect(result.data.status).toBe('SALE');
  });
});
