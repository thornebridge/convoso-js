/**
 * Agent Monitoring Dashboard
 *
 * Polls agent status in a loop and prints a summary table.
 * Demonstrates request hooks for logging and real-time monitoring endpoints.
 *
 * Usage: npx tsx examples/agent-dashboard.ts
 */

import { Convoso } from 'convoso-js';

const client = new Convoso({
  authToken: process.env.CONVOSO_AUTH_TOKEN!,
  maxRetries: 2,
  onResponse: (_path, _res, data) => {
    const d = data as Record<string, unknown>;
    if (d.success === false) {
      console.warn('API returned unsuccessful response');
    }
  },
});

const POLL_INTERVAL_MS = 10_000; // 10 seconds

async function pollAgents() {
  console.log('Agent Dashboard — press Ctrl+C to stop\n');

  while (true) {
    try {
      const monitor = await client.agentMonitor.search();

      console.clear();
      console.log(`=== Agent Dashboard (${new Date().toLocaleTimeString()}) ===\n`);
      console.log(`Total agents: ${monitor.total_agents}`);
      console.log(`In call:      ${monitor.agents_in_call}`);
      console.log(`Ready:        ${monitor.agents_ready}`);
      console.log(`Paused:       ${monitor.agents_paused}`);
      console.log(`\nDialable leads in queue: ${monitor.queue_dialable_leads}`);
      console.log(`Calls today:            ${monitor.queue_calls_today}\n`);

      if (monitor.agents.length > 0) {
        console.log('Agent                  Status          Campaign        Duration');
        console.log('─'.repeat(72));
        for (const agent of monitor.agents) {
          const name = agent.full_name.padEnd(22);
          const status = (agent.status_label ?? agent.status).padEnd(15);
          const campaign = (agent.campaign_name ?? '—').padEnd(15);
          const duration = agent.status_time_mmss ?? '—';
          console.log(`${name} ${status} ${campaign} ${duration}`);
        }
      }

      // Also check agent performance
      const perf = await client.agentPerformance.search();
      if (perf.length > 0) {
        console.log('\nTop performers by calls:');
        const sorted = [...perf].sort((a, b) => Number(b.calls ?? 0) - Number(a.calls ?? 0));
        for (const agent of sorted.slice(0, 5)) {
          console.log(`  ${agent.full_name}: ${agent.calls} calls, ${agent.talk_time} talk time`);
        }
      }
    } catch (err) {
      console.error('Poll error:', err instanceof Error ? err.message : err);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

pollAgents().catch(console.error);
