import { describe, expect, it } from 'vitest';
import { createMockClient } from '../helpers.js';

describe('Users', () => {
  const client = createMockClient((path) => {
    if (path === '/users/search') return [{ id: '101', email: 'john@example.com', first_name: 'John', last_name: 'Doe', user_level: 'agent', status: 'active', last_login: '2026-03-01 08:00:00', local_gmt: '-8.00', connection_type: 'VoIP', extension: ['8001'], acl_access_profile: 'default', allow_queue_selection: true, allow_callbacks: true, allow_transfers: true }];
    if (path === '/users/recordings') return { entries: [{ recording_id: 'rec-002', lead_id: '200', start_time: '2026-03-01 15:00:00', end_time: '2026-03-01 15:05:00', seconds: 300, url: 'https://recordings.convoso.com/rec-002.mp3' }] };
    return {};
  });

  it('search()', async () => {
    const result = await client.users.search({ user: 'john@example.com' });
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('john@example.com');
    expect(result[0].first_name).toBe('John');
  });

  it('recordings()', async () => {
    const result = await client.users.recordings({ user: 'john@example.com' });
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].recording_id).toBe('rec-002');
    expect(result.entries[0].seconds).toBe(300);
  });
});
