import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Lists', () => {
  const client = createMockClient((path, params) => {
    if (path === '/lists/search')
      return {
        data: [
          {
            id: '333',
            name: 'Main Leads List',
            status: 'Y',
            last_called_at: '2026-03-01 16:00:00',
          },
        ],
      };
    if (path === '/lists/insert') return { success: true, data: { list_id: '334' }, id: '334' };
    if (path === '/lists/update')
      return { success: true, data: { list_id: params.get('list_id') } };
    if (path === '/lists/delete') return { success: true };
    return {};
  });

  it('search()', async () => {
    const result = await client.lists.search({ status: 1 });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Main Leads List');
  });

  it('insert()', async () => {
    const result = await client.lists.insert({ name: 'New Test List', campaign_id: '1' });
    expect(result.success).toBe(true);
    expect(result.data.list_id).toBe('334');
  });

  it('update()', async () => {
    const result = await client.lists.update({ list_id: '333', name: 'Updated List Name' });
    expect(result.success).toBe(true);
    expect(result.data.list_id).toBe('333');
  });

  it('delete()', async () => {
    const result = await client.lists.delete({ list_id: '333' });
    expect(result.success).toBe(true);
  });
});
