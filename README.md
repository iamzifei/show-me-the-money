# 💰 Show Me The Money

[English](README.md) | [中文](README.zh-CN.md)

**AI agent skills that build and run your business autonomously — from idea to revenue, 24/7.**

> One command. 14 agent skills. Zero to profitable business.

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
2. **Discover** (`/money-discover`) — Scans market gaps, validates demand with 6 forcing questions, runs a 5-filter evaluation with competitive intelligence protocol
3. **Strategy** (`/money-strategy`) — Generates a full market research report: premise deconstruction, SWOT, 4P analysis, competitive landscape, business model stress test, go-to-market plan
4. **Product** (`/money-product`) — Builds and deploys your MVP with landing page, auth, payments, SEO/GEO optimization, QA testing, and post-deploy canary monitoring
5. **Quality** (`/money-quality`) — Pre-launch quality gates: code review, QA testing, security audit, performance checks, accessibility
6. **Content** (`/money-content`) — Creates blog posts, email sequences, social content, video scripts — with authenticity audit, headline impact matrix, and content substance scoring
7. **Outreach** (`/money-outreach`) — Cold email sequences, partnership outreach, lead generation with personalization
8. **Social** (`/money-social`) — Social media management across X, LinkedIn, Reddit, Product Hunt with hook-writing frameworks
9. **SEO** (`/money-seo`) — Traditional SEO + GEO (AI search optimization for ChatGPT, Perplexity, Gemini)
10. **Ads** (`/money-ads`) — Google Ads, Meta Ads — campaign setup, optimization, ROAS tracking
11. **Ops** (`/money-ops`) — 24/7 autonomous operations with business health scoring, canary monitoring, and safety guardrails
12. **Finance** (`/money-finance`) — Revenue tracking, unit economics, financial reports
13. **Diagnose** (`/money-diagnose`) — Deep business diagnosis when things aren't working: problem deconstruction, assumption audit, execution coaching

## Why This Exists

Most AI business tools give you generic advice. Show Me The Money gives you **executable workflows** — every skill produces concrete actions, not just analysis. Every phase ends with "Tomorrow's first action: [specific task]."

**Key differentiators:**
- **Personalized** — Auto-researches your background and tailors all recommendations to YOU
- **Validated frameworks** — Integrates battle-tested methodologies: premise deconstruction protocol, 6-question demand validation, 5-filter opportunity scoring, business model stress test, 5-dimensional content diagnosis, 12-signal authenticity audit, headline impact matrix
- **Full-stack** — Covers the entire business lifecycle, not just one piece
- **Revenue-first** — Every recommendation connects to making money. No fluff
- **Autonomous** — Set up once, runs 24/7 with `/money-ops`
- **Open source** — CC BY-NC 4.0 license. Free for personal use. Customize, extend, contribute

## Installation

### Via npx (Recommended)

```bash
npx @orrisai/show-me-the-money
```

This installs all 14 skills to `~/.claude/skills/` automatically.

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
| **Discover** | `/money-discover` | Find and validate profitable business ideas with competitive intelligence |
| **Strategy** | `/money-strategy` | Premise deconstruction + market research + business model stress test |
| **Diagnose** | `/money-diagnose` | Deep diagnosis when business is stuck — root cause, not symptoms |
| **Product** | `/money-product` | Build, deploy, QA test, and monitor MVP |
| **Quality** | `/money-quality` | Code review, security audit, performance check, pre-launch gates |
| **Content** | `/money-content` | Content pipeline with authenticity audit and headline impact matrix |
| **Outreach** | `/money-outreach` | Cold email sequences and partnership outreach |
| **Social** | `/money-social` | Social media management with hook-writing frameworks |
| **SEO** | `/money-seo` | SEO + GEO optimization for search engines and AI |
| **Ads** | `/money-ads` | Google Ads, Meta Ads — setup, optimization, ROAS |
| **Ops** | `/money-ops` | 24/7 autonomous operations with health scoring and safety guardrails |
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
├── money/SKILL.md              ← Router + onboarding + signal-based routing
├── money-discover/SKILL.md     ← Idea discovery + competitive intelligence
├── money-strategy/SKILL.md     ← Premise deconstruction + market research
├── money-diagnose/SKILL.md     ← Business diagnosis + execution coaching
├── money-product/SKILL.md      ← Product building + QA + canary monitoring
├── money-quality/SKILL.md      ← Code review + security + performance gates
├── money-content/SKILL.md      ← Content pipeline + authenticity audit
├── money-outreach/SKILL.md     ← Sales & outreach
├── money-social/SKILL.md       ← Social media
├── money-seo/SKILL.md          ← SEO & GEO
├── money-ads/SKILL.md          ← Paid advertising
├── money-ops/SKILL.md          ← 24/7 operations + health scoring
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

CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0)

- Personal / learning / research: use freely
- Public derivative works: attribute source
- Commercial use: requires separate authorization
