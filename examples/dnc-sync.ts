/**
 * DNC List Sync
 *
 * Demonstrates syncing a Do-Not-Call list: fetch all existing entries
 * using auto-pagination, compare against a local list, and insert missing ones.
 *
 * Usage: npx tsx examples/dnc-sync.ts
 */

import { Convoso, ConvosoApiError, CONVOSO_ERROR_CODES } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_AUTH_TOKEN!,
  maxRetries: 2,
});

const CAMPAIGN_ID = '500';
const PHONE_CODE = '1';

// Numbers to ensure are on the DNC list
const numbersToBlock = ['5551112222', '5553334444', '5555556666', '5557778888'];

async function syncDnc() {
  // Step 1: Fetch all existing DNC entries for this campaign
  console.log('Fetching existing DNC entries...');
  const existing = new Set<string>();

  for await (const entry of client.dnc.searchAll({ campaign_id: CAMPAIGN_ID, pageSize: 200 })) {
    existing.add(entry.phone_number);
  }
  console.log(`Found ${existing.size} existing DNC entries`);

  // Step 2: Find numbers that need to be added
  const toAdd = numbersToBlock.filter((num) => !existing.has(num));
  console.log(`${toAdd.length} new numbers to add`);

  // Step 3: Insert missing numbers
  for (const phone of toAdd) {
    try {
      const result = await client.dnc.insert({
        phone_number: phone,
        phone_code: PHONE_CODE,
        campaign_id: CAMPAIGN_ID,
        reason: 'External DNC list sync',
      });
      console.log(`Added ${phone} (DNC ID: ${result.id})`);
    } catch (err) {
      if (err instanceof ConvosoApiError) {
        console.warn(`Skipped ${phone}: ${err.description ?? err.message}`);
      } else {
        throw err;
      }
    }
  }

  console.log('\nDNC sync complete');
}

syncDnc().catch(console.error);
