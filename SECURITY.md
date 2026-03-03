# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in convoso-js, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please use [GitHub's private vulnerability reporting](https://github.com/thornebridge/convoso-js/security/advisories/new) to submit your report. This ensures the issue can be addressed before public disclosure.

### What to include

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: within 48 hours
- **Initial assessment**: within 1 week
- **Fix & disclosure**: coordinated with reporter

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |

## Security Best Practices

When using convoso-js:

- **Never hardcode API tokens** — use environment variables or a secrets manager
- **Never commit `.env` files** — they are gitignored by default
- **Rotate tokens regularly** — follow your organization's rotation policy
- **Use least privilege** — request only the API permissions you need

## Dependencies

convoso-js has **zero runtime dependencies**, which minimizes supply chain risk. All builds are published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements) via GitHub Actions OIDC.
