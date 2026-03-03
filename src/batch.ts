import type {
  BatchOptions,
  BatchResult,
  BatchItemSuccess,
  BatchItemError,
} from './types/common.js';

/**
 * Execute an async operation for each item with concurrency control.
 *
 * Spawns a pool of workers that pull from a shared queue. Each item's
 * success or failure is tracked independently — one failure does not
 * abort the batch. Results are returned in input order.
 *
 * @param items - Array of inputs to process.
 * @param operation - Async function to call for each item.
 * @param options - Concurrency control options.
 * @returns Aggregated results with per-item success/failure tracking.
 *
 * @example
 * ```typescript
 * import { Convoso, batch } from 'convoso-js';
 *
 * const client = new Convoso({ authToken: 'token', maxRetries: 2 });
 *
 * const leads = [
 *   { list_id: '100', phone_number: '5551234567' },
 *   { list_id: '100', phone_number: '5559876543' },
 * ];
 *
 * const result = await batch(leads, (lead) => client.leads.insert(lead), {
 *   concurrency: 3,
 * });
 *
 * console.log(`${result.successCount} inserted, ${result.errorCount} failed`);
 * ```
 */
export async function batch<TInput, TOutput>(
  items: TInput[],
  operation: (item: TInput) => Promise<TOutput>,
  options?: BatchOptions,
): Promise<BatchResult<TOutput>> {
  const concurrency = options?.concurrency ?? 5;
  const results: (BatchItemSuccess<TOutput> | BatchItemError)[] = new Array(items.length);
  let successCount = 0;
  let errorCount = 0;
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      try {
        const value = await operation(items[index]);
        results[index] = { status: 'fulfilled', value, index };
        successCount++;
      } catch (err) {
        results[index] = {
          status: 'rejected',
          reason: err instanceof Error ? err : new Error(String(err)),
          index,
        };
        errorCount++;
      }
    }
  }

  const workerCount = Math.min(concurrency, items.length);
  const workers: Promise<void>[] = [];
  for (let i = 0; i < workerCount; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  return { results, successCount, errorCount };
}
