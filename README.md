# 💰 Show Me The Money

**Build and run a 24/7 automated business from scratch — powered by Claude Code.**

Show Me The Money is a Claude Code skill suite that acts as your AI business operating system. It discovers opportunities, creates strategies, builds products, runs marketing, manages sales, and orchestrates everything autonomously.

## Quick Start

```bash
npx show-me-the-money
```

Then open Claude Code and type:

```
/money
```

## What It Does

```
💡 Idea Discovery ──► 📋 Strategy ──► 🔨 Build Product ──► 📈 Grow
                                                              │
                                    ┌─────────────────────────┤
                                    │         │         │     │
                                    ▼         ▼         ▼     ▼
                                Content    Social    SEO    Ads
                                    │         │         │     │
                                    └─────────┴────┬────┴─────┘
                                                   ▼
                                              🤖 24/7 Ops
                                                   │
                                                   ▼
                                              💵 Revenue
```

From zero to a running business:

1. **No idea?** → `/money-discover` scans markets, trends, and gaps to find profitable opportunities
2. **Have an idea?** → `/money-strategy` creates your business model, pricing, and go-to-market plan
3. **Have a plan?** → `/money-product` builds and deploys your MVP with payment integration
4. **Have a product?** → Growth skills handle content, social, SEO, ads, and outreach
5. **Want automation?** → `/money-ops` runs everything 24/7 without you

## Installation

### Via npx (Recommended)

```bash
npx show-me-the-money
```

This installs all 12 skills to `~/.claude/skills/` automatically.

### Via npm (Global)

```bash
npm install -g show-me-the-money
```

### Manual

```bash
git clone https://github.com/iamzifei/show-me-the-money.git ~/.claude/skills/show-me-the-money
cd ~/.claude/skills/show-me-the-money && node install.js
```

### Upgrade

```bash
npx show-me-the-money@latest
```

Or from within Claude Code:

```
/money-upgrade
```

## Skills

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Router** | `/money` | Main entry point — routes you to the right skill or runs the full pipeline |
| **Discover** | `/money-discover` | Find profitable business ideas from market gaps and trends |
| **Strategy** | `/money-strategy` | Business model, pricing, competitive analysis, go-to-market plan |
| **Product** | `/money-product` | Build and deploy MVP with payments (Next.js, Supabase, Stripe, Vercel) |
| **Content** | `/money-content` | Content pipeline — blog posts, emails, social media, copywriting |
| **Outreach** | `/money-outreach` | Cold email sequences, lead generation, partnership outreach |
| **Social** | `/money-social` | Social media management across X, LinkedIn, Reddit, Product Hunt |
| **SEO** | `/money-seo` | Traditional SEO + GEO (AI search optimization for ChatGPT, Perplexity) |
| **Ads** | `/money-ads` | Google Ads, Meta Ads — campaign setup, optimization, ROAS tracking |
| **Ops** | `/money-ops` | 24/7 autonomous operations — scheduling, monitoring, health checks |
| **Finance** | `/money-finance` | Revenue tracking, unit economics, financial reports, pricing optimization |
| **Upgrade** | `/money-upgrade` | Update to the latest version with backup and rollback |

## Usage Examples

### Start from scratch
```
/money
→ Select "Starting from zero"
→ Follow the guided pipeline
```

### Get business ideas
```
/money-discover "I'm a developer who can build web apps"
```

### Create a strategy for an existing idea
```
/money-strategy "API product that provides AI image generation"
```

### Build and ship a product
```
/money-product "SaaS tool for email analytics, $29/mo"
```

### Set up marketing automation
```
/money-ops "automate content, social, and SEO for my product at example.com"
```

### Run ads
```
/money-ads "Google Ads campaign for my AI writing tool, $20/day budget"
```

### Get financial reports
```
/money-finance "weekly revenue report from Stripe"
```

## How It Works

Show Me The Money is built on the [Claude Code skill system](https://docs.anthropic.com/en/docs/claude-code/skills). Each skill is a `SKILL.md` file containing:

- **Frontmatter** — Name, description, and configuration
- **Instructions** — Step-by-step workflows Claude follows
- **Frameworks** — Business templates, checklists, and decision trees

Skills are installed to `~/.claude/skills/` where Claude Code automatically discovers them. When you type `/money`, Claude loads the skill instructions and follows them to execute your request.

### Architecture

```
~/.claude/skills/
├── money/SKILL.md              ← Main router
├── money-discover/SKILL.md     ← Business idea discovery
├── money-strategy/SKILL.md     ← Strategy & planning
├── money-product/SKILL.md      ← Product building
├── money-content/SKILL.md      ← Content pipeline
├── money-outreach/SKILL.md     ← Sales & outreach
├── money-social/SKILL.md       ← Social media
├── money-seo/SKILL.md          ← SEO & GEO
├── money-ads/SKILL.md          ← Paid advertising
├── money-ops/SKILL.md          ← 24/7 operations
├── money-finance/SKILL.md      ← Financial tracking
└── money-upgrade/SKILL.md      ← Version management
```

## Inspired By

- [dbskill](https://github.com/dontbesilent2025/dbskill) — Business diagnostics framework
- [gstack](https://github.com/garrytan/gstack) — Engineering workflow automation by Garry Tan
- [Polsia](https://github.com/PolsiaAI/Polsia) — 24/7 autonomous business agent system

## Uninstall

```bash
npx show-me-the-money uninstall
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Edit SKILL.md files in `skills/`
4. Test by copying to `~/.claude/skills/` and running in Claude Code
5. Submit a PR

## License

MIT
