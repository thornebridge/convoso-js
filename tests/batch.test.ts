import { describe, expect, it } from 'vitest';
import { batch } from '../src/batch.js';
import { ConvosoApiError } from '../src/errors.js';

describe('batch', () => {
  it('processes all items successfully', async () => {
    const items = [1, 2, 3, 4, 5];
    const result = await batch(items, async (n) => n * 2, { concurrency: 3 });

    expect(result.successCount).toBe(5);
    expect(result.errorCount).toBe(0);
    expect(result.results.every((r) => r.status === 'fulfilled')).toBe(true);
    expect(result.results.map((r) => (r as { value: number }).value)).toEqual([2, 4, 6, 8, 10]);
  });

  it('handles individual failures without aborting', async () => {
    const items = [1, 2, 3, 4];
    const result = await batch(items, async (n) => {
      if (n === 2 || n === 4) throw new Error(`fail-${n}`);
      return n;
    });

    expect(result.successCount).toBe(2);
    expect(result.errorCount).toBe(2);
    expect(result.results[0].status).toBe('fulfilled');
    expect(result.results[1].status).toBe('rejected');
    expect(result.results[2].status).toBe('fulfilled');
    expect(result.results[3].status).toBe('rejected');
    expect((result.results[1] as { reason: Error }).reason.message).toBe('fail-2');
    expect((result.results[3] as { reason: Error }).reason.message).toBe('fail-4');
  });

  it('respects concurrency limit', async () => {
    let active = 0;
    let maxActive = 0;
    const items = Array.from({ length: 10 }, (_, i) => i);

    await batch(
      items,
      async () => {
        active++;
        maxActive = Math.max(maxActive, active);
        await new Promise((r) => setTimeout(r, 10));
        active--;
        return 'done';
      },
      { concurrency: 3 },
    );

    expect(maxActive).toBe(3);
  });

  it('returns results in input order', async () => {
    const items = [30, 20, 10, 5];
    const result = await batch(
      items,
      async (ms) => {
        await new Promise((r) => setTimeout(r, ms));
        return ms;
      },
      { concurrency: 4 },
    );

    expect(result.results.map((r) => r.index)).toEqual([0, 1, 2, 3]);
    expect(result.results.map((r) => (r as { value: number }).value)).toEqual([30, 20, 10, 5]);
  });

  it('uses default concurrency of 5', async () => {
    let active = 0;
    let maxActive = 0;
    const items = Array.from({ length: 10 }, (_, i) => i);

    await batch(items, async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise((r) => setTimeout(r, 10));
      active--;
      return 'done';
    });

    expect(maxActive).toBe(5);
  });

  it('handles empty input array', async () => {
    const result = await batch([], async () => 'never');

    expect(result.results).toEqual([]);
    expect(result.successCount).toBe(0);
    expect(result.errorCount).toBe(0);
  });

  it('handles a single item', async () => {
    const result = await batch([42], async (n) => n * 2);

    expect(result.successCount).toBe(1);
    expect(result.results[0]).toEqual({ status: 'fulfilled', value: 84, index: 0 });
  });

  it('caps workers at item count when concurrency exceeds items', async () => {
    let active = 0;
    let maxActive = 0;
    const items = [1, 2, 3];

    await batch(
      items,
      async (n) => {
        active++;
        maxActive = Math.max(maxActive, active);
        await new Promise((r) => setTimeout(r, 10));
        active--;
        return n;
      },
      { concurrency: 100 },
    );

    expect(maxActive).toBe(3);
  });

  it('works with ConvosoApiError', async () => {
    const items = ['good', 'bad'];
    const result = await batch(items, async (item) => {
      if (item === 'bad') {
        throw new ConvosoApiError('Duplicate', 6009, { success: false });
      }
      return { success: true };
    });

    expect(result.successCount).toBe(1);
    expect(result.errorCount).toBe(1);
    expect(result.results[1].status).toBe('rejected');
    expect((result.results[1] as { reason: Error }).reason).toBeInstanceOf(ConvosoApiError);
  });

  it('wraps non-Error throws in Error', async () => {
    const items = ['throw-string'];
    const result = await batch(items, async () => {
      throw 'raw string error';
    });

    expect(result.errorCount).toBe(1);
    const item = result.results[0];
    expect(item.status).toBe('rejected');
    expect((item as { reason: Error }).reason).toBeInstanceOf(Error);
    expect((item as { reason: Error }).reason.message).toBe('raw string error');
  });
});
