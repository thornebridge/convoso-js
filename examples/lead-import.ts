/**
 * Lead Import Pipeline
 *
 * Demonstrates bulk lead insertion with retry, error handling,
 * and auto-pagination to verify imported leads.
 *
 * Usage: npx tsx examples/lead-import.ts
 */

import { Convoso, ConvosoApiError } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_AUTH_TOKEN!,
  maxRetries: 3,
  onRequest: (path) => console.log(`-> POST ${path}`),
  onResponse: (path, _res, data) => console.log(`<- ${path}`, JSON.stringify(data).slice(0, 100)),
});

const leads = [
  { list_id: '1001', phone_number: '5551234567', first_name: 'Jane', last_name: 'Doe' },
  { list_id: '1001', phone_number: '5559876543', first_name: 'John', last_name: 'Smith' },
  { list_id: '1001', phone_number: '5555551234', first_name: 'Alice', last_name: 'Brown' },
];

async function importLeads() {
  const results = { success: 0, failed: 0, errors: [] as string[] };

  for (const lead of leads) {
    try {
      const response = await client.leads.insert({
        ...lead,
        check_dup: 1,
        check_dnc: true,
      });
      console.log(`Inserted lead ${response.id} (${lead.first_name} ${lead.last_name})`);
      results.success++;
    } catch (err) {
      if (err instanceof ConvosoApiError) {
        const desc = err.description ?? err.message;
        console.error(`Failed: ${lead.phone_number} — ${desc} (code ${err.code})`);
        results.errors.push(`${lead.phone_number}: ${desc}`);
      } else {
        throw err;
      }
      results.failed++;
    }
  }

  console.log(`\nImport complete: ${results.success} success, ${results.failed} failed`);

  // Verify by paginating through all leads in the list
  console.log('\nVerifying imported leads...');
  let count = 0;
  for await (const _lead of client.leads.searchAll({ list_id: '1001', pageSize: 50 })) {
    count++;
  }
  console.log(`Total leads in list 1001: ${count}`);
}

importLeads().catch(console.error);
