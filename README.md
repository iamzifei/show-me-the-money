# 💰 Show Me The Money

[English](README.md) | [中文](README.zh-CN.md)

**AI agent skills that build and run your business autonomously — from idea to revenue, 24/7.**

> One command. 12 agent skills. Zero to profitable business.

Show Me The Money is an open-source skill suite for [Claude Code](https://claude.ai/code) and compatible AI coding agents. It turns your AI assistant into a full-stack business operating system — discovering opportunities, validating demand, building products, running marketing, managing ads, and operating everything autonomously.

Works with **Claude Code**, **Codex CLI**, **Gemini CLI**, and other agents that support the skill system.

## Quick Start

```bash
npx @orrisai/show-me-the-money
```

Then open Claude Code and type:

```
/money
```

That's it. The AI will onboard you, build your profile, and guide you through every step.

## What It Does

```
📧 Onboarding          Build your profile from public data
       │
       ▼
💡 Discover             Scan markets, validate demand, find your wedge
       │
       ▼
📊 Strategy             Market research, SWOT, 4P, business model, GTM plan
       │
       ▼
🔨 Build                Ship MVP with landing page, payments, and SEO
       │
       ▼
📈 Grow                 Content, social, outreach, SEO, ads — all automated
       │
       ▼
🤖 Operate              24/7 autonomous ops, monitoring, financial reports
       │
       ▼
💵 Revenue
```

### The Full Pipeline

1. **Onboarding** — Share your email and socials. The AI auto-researches your background and builds a personalized profile
2. **Discover** (`/money-discover`) — Scans market gaps, validates demand with 6 forcing questions, runs a 5-filter evaluation on every idea
3. **Strategy** (`/money-strategy`) — Generates a full market research report: SWOT, 4P analysis, competitive landscape, business model validation, go-to-market plan
4. **Product** (`/money-product`) — Builds and deploys your MVP with landing page, auth, payments, SEO/GEO optimization, logo, and OG images
5. **Content** (`/money-content`) — Creates blog posts, email sequences, social content, video scripts — all diagnosed with a 5-dimensional quality check
6. **Outreach** (`/money-outreach`) — Cold email sequences, partnership outreach, lead generation with personalization
7. **Social** (`/money-social`) — Social media management across X, LinkedIn, Reddit, Product Hunt with hook-writing frameworks
8. **SEO** (`/money-seo`) — Traditional SEO + GEO (AI search optimization for ChatGPT, Perplexity, Gemini)
9. **Ads** (`/money-ads`) — Google Ads, Meta Ads — campaign setup, optimization, ROAS tracking
10. **Ops** (`/money-ops`) — 24/7 autonomous operations — scheduling, monitoring, health checks
11. **Finance** (`/money-finance`) — Revenue tracking, unit economics, financial reports

## Why This Exists

Most AI business tools give you generic advice. Show Me The Money gives you **executable workflows** — every skill produces concrete actions, not just analysis. Every phase ends with "Tomorrow's first action: [specific task]."

**Key differentiators:**
- **Personalized** — Auto-researches your background and tailors all recommendations to YOU
- **Validated frameworks** — Integrates battle-tested methodologies: 6-question demand validation, 5-filter opportunity scoring, business model audit, 5-dimensional content diagnosis
- **Full-stack** — Covers the entire business lifecycle, not just one piece
- **Revenue-first** — Every recommendation connects to making money. No fluff
- **Autonomous** — Set up once, runs 24/7 with `/money-ops`
- **Open source** — MIT license. Customize, extend, contribute

## Installation

### Via npx (Recommended)

```bash
npx @orrisai/show-me-the-money
```

This installs all 12 skills to `~/.claude/skills/` automatically.

### Via npm (Global)

```bash
npm install -g @orrisai/show-me-the-money
```

### Manual

```bash
git clone https://github.com/iamzifei/show-me-the-money.git ~/.claude/skills/show-me-the-money
cd ~/.claude/skills/show-me-the-money && node install.js
```

### Update

```bash
npx @orrisai/show-me-the-money update
```

This checks for the latest version, downloads it, and re-installs all skills automatically.

## Skills Reference

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Router** | `/money` | Onboards you, builds your profile, routes to the right skill |
| **Discover** | `/money-discover` | Find and validate profitable business ideas |
| **Strategy** | `/money-strategy` | Market research report with SWOT, 4P, BMC, and GTM plan |
| **Product** | `/money-product` | Build and deploy MVP (Next.js, Supabase, Stripe, Vercel) |
| **Content** | `/money-content` | Content pipeline with 5-dimensional quality diagnosis |
| **Outreach** | `/money-outreach` | Cold email sequences and partnership outreach |
| **Social** | `/money-social` | Social media management with hook-writing frameworks |
| **SEO** | `/money-seo` | SEO + GEO optimization for search engines and AI |
| **Ads** | `/money-ads` | Google Ads, Meta Ads — setup, optimization, ROAS |
| **Ops** | `/money-ops` | 24/7 autonomous operations and monitoring |
| **Finance** | `/money-finance` | Revenue tracking and financial reports |
| **Upgrade** | `/money-upgrade` | Update to the latest version |

## Usage Examples

### Start from scratch
```
/money
→ Share your email and X handle
→ AI researches your background
→ Follow the guided pipeline
```

### Validate a business idea
```
/money-discover "I'm a developer who can build web apps"
```

### Get a full market research report
```
/money-strategy "API product that provides AI image generation"
```

### Build and ship a product
```
/money-product "SaaS tool for email analytics, $29/mo"
```

### Launch your content engine
```
/money-content "create a launch content plan for my product at example.com"
```

### Automate everything
```
/money-ops "automate content, social, and SEO for my product at example.com"
```

## Compatibility

Show Me The Money works with any AI coding agent that supports the `~/.claude/skills/` skill system:

- **Claude Code** (primary)
- **Codex CLI**
- **Gemini CLI**
- **Cursor** (via skills)
- **Other compatible agents**

## How It Works

Built on the [Claude Code skill system](https://docs.anthropic.com/en/docs/claude-code/skills). Each skill is a `SKILL.md` file containing step-by-step workflows, business frameworks, and decision trees that the AI follows autonomously.

```
~/.claude/skills/
├── money/SKILL.md              ← Router + onboarding
├── money-discover/SKILL.md     ← Idea discovery + validation
├── money-strategy/SKILL.md     ← Market research + strategy
├── money-product/SKILL.md      ← Product building + deployment
├── money-content/SKILL.md      ← Content creation pipeline
├── money-outreach/SKILL.md     ← Sales & outreach
├── money-social/SKILL.md       ← Social media
├── money-seo/SKILL.md          ← SEO & GEO
├── money-ads/SKILL.md          ← Paid advertising
├── money-ops/SKILL.md          ← 24/7 operations
├── money-finance/SKILL.md      ← Financial tracking
└── money-upgrade/SKILL.md      ← Version management
```

## Uninstall

```bash
npx @orrisai/show-me-the-money uninstall
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Edit SKILL.md files in `skills/`
4. Test by copying to `~/.claude/skills/` and running in Claude Code
5. Submit a PR

All contributions welcome — new skills, framework improvements, language support, and bug fixes.

## License

MIT
