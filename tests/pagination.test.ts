import { describe, expect, it } from 'vitest';
import { createMockClient } from './helpers.js';

describe('Auto-Pagination', () => {
  describe('leads.searchAll', () => {
    it('iterates through multiple pages', async () => {
      const client = createMockClient((path, params) => {
        if (path !== '/leads/search') return {};
        const offset = Number(params.get('offset') ?? 0);
        if (offset === 0) return { results: [{ id: '1' }, { id: '2' }], offset: 0, limit: 2 };
        if (offset === 2) return { results: [{ id: '3' }], offset: 2, limit: 2 };
        return { results: [], offset, limit: 2 };
      });

      const records = [];
      for await (const record of client.leads.searchAll({ list_id: '333', pageSize: 2 })) {
        records.push(record);
      }
      expect(records).toHaveLength(3);
      expect(records.map((r) => r.id)).toEqual(['1', '2', '3']);
    });

    it('handles empty results', async () => {
      const client = createMockClient(() => ({ results: [], offset: 0, limit: 100 }));
      const records = [];
      for await (const record of client.leads.searchAll()) {
        records.push(record);
      }
      expect(records).toHaveLength(0);
    });
  });

  describe('callLogs.retrieveAll', () => {
    it('iterates through pages', async () => {
      const client = createMockClient((path, params) => {
        if (path !== '/log/retrieve') return {};
        const offset = Number(params.get('offset') ?? 0);
        if (offset === 0)
          return { results: [{ id: '10' }, { id: '11' }], offset: 0, limit: 2, total_found: 3 };
        if (offset === 2) return { results: [{ id: '12' }], offset: 2, limit: 2, total_found: 3 };
        return { results: [], offset, limit: 2, total_found: 3 };
      });

      const records = [];
      for await (const record of client.callLogs.retrieveAll({ pageSize: 2 })) {
        records.push(record);
      }
      expect(records).toHaveLength(3);
    });
  });

  describe('dnc.searchAll', () => {
    it('iterates through pages', async () => {
      const client = createMockClient((path, params) => {
        if (path !== '/dnc/search') return {};
        const offset = Number(params.get('offset') ?? 0);
        if (offset === 0)
          return { entries: [{ id: '1' }, { id: '2' }], offset: 0, limit: 2, total: 3 };
        if (offset === 2) return { entries: [{ id: '3' }], offset: 2, limit: 2, total: 3 };
        return { entries: [], offset, limit: 2, total: 3 };
      });

      const records = [];
      for await (const record of client.dnc.searchAll({ pageSize: 2 })) {
        records.push(record);
      }
      expect(records).toHaveLength(3);
    });
  });

  describe('callbacks.searchAll', () => {
    it('iterates through pages', async () => {
      const client = createMockClient((path, params) => {
        if (path !== '/callbacks/search') return {};
        const offset = Number(params.get('offset') ?? 0);
        if (offset === 0)
          return { results: [{ id: 'cb1' }, { id: 'cb2' }], offset: 0, limit: 2, total: 3 };
        if (offset === 2) return { results: [{ id: 'cb3' }], offset: 2, limit: 2, total: 3 };
        return { results: [], offset, limit: 2, total: 3 };
      });

      const records = [];
      for await (const record of client.callbacks.searchAll({ pageSize: 2 })) {
        records.push(record);
      }
      expect(records).toHaveLength(3);
    });
  });

  describe('smsOptOut.searchAll', () => {
    it('iterates through pages', async () => {
      const client = createMockClient((path, params) => {
        if (path !== '/sms-opt-out/search') return {};
        const offset = Number(params.get('offset') ?? 0);
        if (offset === 0)
          return { records: [{ id: '1' }, { id: '2' }], offset: 0, limit: 2, total: 2 };
        return { records: [], offset, limit: 2, total: 2 };
      });

      const records = [];
      for await (const record of client.smsOptOut.searchAll({ pageSize: 2 })) {
        records.push(record);
      }
      expect(records).toHaveLength(2);
    });
  });

  describe('leads.getRecordingsAll', () => {
    it('iterates through recording pages', async () => {
      const client = createMockClient((path, params) => {
        if (path !== '/leads/get-recordings') return {};
        const offset = Number(params.get('offset') ?? 0);
        if (offset === 0) return { entries: [{ recording_id: 'r1' }, { recording_id: 'r2' }] };
        return { entries: [] };
      });

      const recordings = [];
      for await (const rec of client.leads.getRecordingsAll({ lead_id: '100', pageSize: 2 })) {
        recordings.push(rec);
      }
      expect(recordings).toHaveLength(2);
    });
  });
});
