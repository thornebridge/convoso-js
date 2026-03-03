import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'convoso-js',
  description: 'Unofficial TypeScript SDK for the Convoso API',
  base: '/convoso-js/',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>%F0%9F%9F%AA</text></svg>' }],
    ['meta', { name: 'theme-color', content: '#7856ff' }],
    ['meta', { property: 'og:title', content: 'convoso-js' }],
    ['meta', { property: 'og:description', content: 'Unofficial TypeScript SDK for the Convoso API' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    search: { provider: 'local' },

    outline: { level: [2, 3] },

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api-reference/' },
      { text: 'Resources', link: '/resources/' },
      { text: 'v0.1.0', link: 'https://www.npmjs.com/package/convoso-js' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Error Handling', link: '/guide/error-handling' },
            { text: 'Retry & Hooks', link: '/guide/retry-and-hooks' },
            { text: 'Auto-Pagination', link: '/guide/pagination' },
            { text: 'Examples', link: '/guide/examples' },
          ],
        },
      ],
      '/api-reference/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api-reference/' },
          ],
        },
        {
          text: 'Authentication',
          items: [
            { text: 'Authentication', link: '/api-reference/authentication' },
          ],
        },
        {
          text: 'Agent APIs',
          items: [
            { text: 'Agent Monitor', link: '/api-reference/agent-monitor' },
            { text: 'Agent Performance', link: '/api-reference/agent-performance' },
            { text: 'Agent Productivity', link: '/api-reference/agent-productivity' },
          ],
        },
        {
          text: 'Lead Management',
          items: [
            { text: 'Leads', link: '/api-reference/leads' },
            { text: 'Lead Post', link: '/api-reference/lead-post' },
            { text: 'Lead Validation', link: '/api-reference/lead-validation' },
            { text: 'Lists', link: '/api-reference/lists' },
          ],
        },
        {
          text: 'Call Operations',
          items: [
            { text: 'Callbacks', link: '/api-reference/callbacks' },
            { text: 'Call Logs', link: '/api-reference/call-logs' },
            { text: 'Campaigns', link: '/api-reference/campaigns' },
          ],
        },
        {
          text: 'Compliance',
          items: [
            { text: 'DNC (Do Not Call)', link: '/api-reference/dnc' },
            { text: 'SMS Opt-Out', link: '/api-reference/sms-opt-out' },
          ],
        },
        {
          text: 'Other',
          items: [
            { text: 'Status', link: '/api-reference/status' },
            { text: 'Revenue', link: '/api-reference/revenue' },
            { text: 'Users', link: '/api-reference/users' },
            { text: 'User Activity', link: '/api-reference/user-activity' },
          ],
        },
      ],
      '/resources/': [
        {
          text: 'Resources',
          items: [
            { text: 'SDK Resource Map', link: '/resources/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/thornebridge/convoso-js' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/convoso-js' },
    ],

    editLink: {
      pattern: 'https://github.com/thornebridge/convoso-js/edit/main/docs-site/:path',
    },

    footer: {
      message: 'Community project — not affiliated with or endorsed by Convoso.',
      copyright: 'MIT License',
    },
  },
});
