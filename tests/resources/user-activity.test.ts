import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('UserActivity', () => {
  const client = createMockClient(() => ({
    success: true, data: { available_agents: 8, logged_in_agents: 12 },
  }));

  it('search()', async () => {
    const result = await client.userActivity.search({ campaign_id: '1' });
    expect(result.success).toBe(true);
    expect(result.data.available_agents).toBe(8);
    expect(result.data.logged_in_agents).toBe(12);
  });
});
