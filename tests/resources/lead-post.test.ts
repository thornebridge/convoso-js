import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('LeadPost', () => {
  const client = createMockClient(() => ({
    result: 'True',
    lead_id: '202',
    error_description: '',
  }));

  it('insert()', async () => {
    const result = await client.leadPost.insert({
      criteria_key: 'key123',
      phone_number: '5551234567',
    });
    expect(result.result).toBe('True');
    expect(result.lead_id).toBe('202');
  });
});
