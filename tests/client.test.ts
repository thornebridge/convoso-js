import { describe, expect, it } from 'vitest';
import { Convoso } from '../src/client.js';

describe('Convoso client', () => {
  const client = new Convoso({ authToken: 'test-token' });

  it('exposes all 16 resource properties', () => {
    expect(client.agentMonitor).toBeDefined();
    expect(client.agentPerformance).toBeDefined();
    expect(client.agentProductivity).toBeDefined();
    expect(client.callLogs).toBeDefined();
    expect(client.callbacks).toBeDefined();
    expect(client.campaigns).toBeDefined();
    expect(client.dnc).toBeDefined();
    expect(client.leads).toBeDefined();
    expect(client.leadPost).toBeDefined();
    expect(client.leadValidation).toBeDefined();
    expect(client.lists).toBeDefined();
    expect(client.revenue).toBeDefined();
    expect(client.smsOptOut).toBeDefined();
    expect(client.status).toBeDefined();
    expect(client.userActivity).toBeDefined();
    expect(client.users).toBeDefined();
  });
});
