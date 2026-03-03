import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Revenue', () => {
  const client = createMockClient((_path, params) => ({
    success: true,
    data: { call_log_id: params.get('call_log_id') },
  }));

  it('update()', async () => {
    const result = await client.revenue.update({ call_log_id: '5001', revenue: 99.99 });
    expect(result.success).toBe(true);
    expect(result.data.call_log_id).toBe('5001');
  });
});
