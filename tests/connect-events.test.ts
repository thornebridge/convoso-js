import { describe, expect, it } from 'vitest';
import { CONNECT_WORKFLOW_EVENTS, CONNECT_WORKFLOW_ACTIONS } from '../src/connect-events.js';

describe('CONNECT_WORKFLOW_EVENTS', () => {
  it('contains all 11 event trigger types', () => {
    const keys = Object.keys(CONNECT_WORKFLOW_EVENTS);
    expect(keys).toHaveLength(11);
  });

  it('includes the core event types', () => {
    expect(CONNECT_WORKFLOW_EVENTS.DISPOSITION).toBeDefined();
    expect(CONNECT_WORKFLOW_EVENTS.CALL_COUNT).toBeDefined();
    expect(CONNECT_WORKFLOW_EVENTS.CALL_TYPE).toBeDefined();
    expect(CONNECT_WORKFLOW_EVENTS.LEAD_STATUS).toBeDefined();
    expect(CONNECT_WORKFLOW_EVENTS.TERM_REASON).toBeDefined();
    expect(CONNECT_WORKFLOW_EVENTS.HOPPER_EXPIRED).toBeDefined();
  });

  it('has string descriptions for all entries', () => {
    for (const [_key, value] of Object.entries(CONNECT_WORKFLOW_EVENTS)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe('CONNECT_WORKFLOW_ACTIONS', () => {
  it('contains all 12 action types', () => {
    const keys = Object.keys(CONNECT_WORKFLOW_ACTIONS);
    expect(keys).toHaveLength(12);
  });

  it('includes the core action types', () => {
    expect(CONNECT_WORKFLOW_ACTIONS.INTEGRATION).toBeDefined();
    expect(CONNECT_WORKFLOW_ACTIONS.EMAIL).toBeDefined();
    expect(CONNECT_WORKFLOW_ACTIONS.MOVE).toBeDefined();
    expect(CONNECT_WORKFLOW_ACTIONS.STATUS).toBeDefined();
    expect(CONNECT_WORKFLOW_ACTIONS.DNC).toBeDefined();
    expect(CONNECT_WORKFLOW_ACTIONS.REVENUE).toBeDefined();
  });

  it('has string descriptions for all entries', () => {
    for (const [_key, value] of Object.entries(CONNECT_WORKFLOW_ACTIONS)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it('INTEGRATION action mentions Convoso Connect', () => {
    expect(CONNECT_WORKFLOW_ACTIONS.INTEGRATION).toContain('Convoso Connect');
  });
});
