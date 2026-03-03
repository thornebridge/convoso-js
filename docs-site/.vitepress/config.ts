import { defineConfig, type HeadConfig } from 'vitepress';

const HOSTNAME = 'https://thornebridge.github.io';
const BASE = '/convoso-js/';
const SITE_URL = `${HOSTNAME}${BASE}`;
const OG_IMAGE = `${HOSTNAME}${BASE}og-image.png`;
const SITE_TITLE = 'convoso-js';
const SITE_DESCRIPTION =
  'Unofficial TypeScript SDK for the Convoso API — zero dependencies, fully typed, with auto-pagination, retry logic, and request hooks.';

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  base: BASE,
  lastUpdated: true,
  cleanUrls: true,

  sitemap: {
    hostname: SITE_URL,
  },

  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${BASE}favicon-32.png` }],

    // Theme
    ['meta', { name: 'theme-color', content: '#7856ff' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }],

    // OG — static tags shared across all pages (per-page title/desc/url via transformPageData)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'convoso-js' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    [
      'meta',
      { property: 'og:image:alt', content: 'convoso-js — TypeScript SDK for the Convoso API' },
    ],

    // Twitter Card — static tags (per-page title/desc via transformPageData)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],

    // SEO — static
    ['meta', { name: 'author', content: 'Thornebridge' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'convoso, api, sdk, typescript, javascript, call center, dialer, leads, dnc, node.js',
      },
    ],

    // Context7 chat widget
    [
      'script',
      { src: 'https://context7.com/widget.js', 'data-library': '/thornebridge/convoso-js' },
    ],

    // JSON-LD structured data
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'convoso-js',
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        codeRepository: 'https://github.com/thornebridge/convoso-js',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'Node.js',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Organization',
          name: 'Thornebridge',
          url: 'https://github.com/thornebridge',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    ],
  ],

  transformPageData(pageData) {
    // Build per-page canonical URL
    const pagePath = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '');
    const canonicalUrl = `${SITE_URL}${pagePath}`;

    // Build page title for OG
    const pageTitle = pageData.frontmatter.title
      ? `${pageData.frontmatter.title} | ${SITE_TITLE}`
      : SITE_TITLE;

    const pageDescription = pageData.frontmatter.description || SITE_DESCRIPTION;

    // Append per-page <head> tags (mutate directly to preserve hero/features/layout)
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['link', { rel: 'canonical', href: canonicalUrl }],
    );
  },

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    search: { provider: 'local' },

    siteTitle: 'convoso-js',

    outline: { level: [2, 3] },

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api-reference/' },
      { text: 'Connect', link: '/connect/overview' },
      { text: 'Resources', link: '/resources/' },
      {
        text: 'v0.3.0',
        items: [
          { text: 'npm', link: 'https://www.npmjs.com/package/convoso-js' },
          { text: 'Changelog', link: 'https://github.com/thornebridge/convoso-js/releases' },
        ],
      },
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
          items: [{ text: 'Overview', link: '/api-reference/' }],
        },
        {
          text: 'Authentication',
          items: [{ text: 'Authentication', link: '/api-reference/authentication' }],
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
      '/connect/': [
        {
          text: 'Convoso Connect',
          items: [
            { text: 'Overview', link: '/connect/overview' },
            { text: 'Adaptors', link: '/connect/adaptors' },
            { text: 'Endpoints', link: '/connect/endpoints' },
            { text: 'Workflows', link: '/connect/workflows' },
            { text: 'Plugins & Campaigns', link: '/connect/plugins' },
            { text: 'Integrations & Inbound Flow', link: '/connect/integrations' },
            { text: 'Technical Reference', link: '/connect/technical-reference' },
          ],
        },
      ],
      '/resources/': [
        {
          text: 'Resources',
          items: [{ text: 'SDK Resource Map', link: '/resources/' }],
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
