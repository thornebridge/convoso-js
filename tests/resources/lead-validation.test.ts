import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('LeadValidation', () => {
  const client = createMockClient(() => ({ success: true, result: 'Accepted' }));

  it('search()', async () => {
    const result = await client.leadValidation.search({ criteria_key: 'key123', phone_number: '5551234567' });
    expect(result.success).toBe(true);
    expect(result.result).toBe('Accepted');
  });
});
