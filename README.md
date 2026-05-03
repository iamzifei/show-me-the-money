<p align="center">
  <img src="https://pbs.twimg.com/media/HFoAbmGawAAdzJm?format=jpg&name=large" alt="Show Me The Money — autonomous business OS for solo founders" width="100%" />
</p>

# 💰 Show Me The Money

[![npm version](https://img.shields.io/npm/v/@orrisai/show-me-the-money?label=npm&color=blue)](https://www.npmjs.com/package/@orrisai/show-me-the-money)
[![Latest release](https://img.shields.io/github/v/release/iamzifei/show-me-the-money?label=release&color=green)](https://github.com/iamzifei/show-me-the-money/releases)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/license-CC%20BY--NC%204.0-orange.svg)](LICENSE)

**Current version: `v2.2.0`** · [What's new →](#-whats-new-in-v220)

[English](README.md) | [中文](README.zh-CN.md)

**AI agent skills that build and run your business autonomously — from idea to revenue, 24/7.**

> One command. 25 agent skills. Zero to profitable business.

**Author** · [X / @jamesai](https://x.com/jamesai) · [小红书 / 在悉尼和稀泥](https://www.xiaohongshu.com/user/profile/5af26425e8ac2b0a9bc030d2)

---

## 🎯 Why this exists — the receipts

I'm a solo founder running **6 SaaS products in parallel** — APIs, developer tools, and consumer apps shipped over the last 32 months.

Across those products, the working numbers right now:

```
💰  $1M+         lifetime revenue across all products
💳  6,500+       paying transactions processed
👥  10,000+      paying customers served
🚢  6            production SaaS products shipped
⏱   32 months   from first $1 to today
🧑   1 person    no team, no employees, just AI agents
```

I built **none of this** with a marketing team, a sales department, or a content agency. Just me, a laptop, and a Claude Code window open most of the day.

The 25 skills in this repo are the **exact operating system** I run my businesses on. Not a course, not a framework — the working code I use myself. Every skill in here has been used to ship something real that's now collecting payments on Stripe.

**This is not a hypothetical playbook. It's what's been running my company.**

If you're a solo founder, an indie hacker, or a technical founder who wants to ship like a team of twenty — this is the closest thing to a copy-paste of my workflow you can get.

---

Show Me The Money is an open-source skill suite for [Claude Code](https://claude.ai/code) and compatible AI coding agents. It turns your AI assistant into a full-stack business operating system — discovering opportunities, validating demand, building products, running marketing, managing ads, operating everything autonomously, **and remembering what you decided across every session**.

Works with **Claude Code**, **Codex CLI**, **Gemini CLI**, and other agents that support the skill system.

---

## ✨ What's New in v2.2.0

**The review panel + cross-session learning.** Eight new skills, plus auto-loading of every prior insight into every future session.

### The plan-review gauntlet

Most solo founders self-justify their plan into a green light, then ship for 6 months before discovering the structural flaw. Now there are four independent reviewers — each a complete persona — and one orchestrator:

```
/money-review-investor   ← VC mode: SEED VIABLE / LATER ROUND / BOOTSTRAP-ONLY / UNFUNDABLE
/money-review-customer   ← Named-ICP mode: PAY NOW / WITH FRICTION / WRONG POSITIONING / WRONG ICP
/money-review-operator   ← Solo-execution mode: SHIPPABLE / DESCOPE / NEEDS HIRE / WRONG STACK
/money-review-skeptic    ← Devil's advocate: EXISTENTIAL / SOLVABLE / LOW-RISK / WRONG QUESTION
/money-panel             ← Runs all four, finds agreement, surfaces only taste decisions
```

One command runs the full gauntlet and only stops at the borderline calls.

### Cross-session learning, finally

```
/money-learn       ← Atomic, validated patterns auto-loaded into every other skill
/money-retro       ← Weekly retro: decided / shipped / stalled / unused-skills / focus
/money-skillify    ← Codify a successful workflow into a project-local skill
```

Every other money-* skill now auto-loads relevant learnings on startup. The agent gets smarter session by session instead of cold-starting each conversation.

### Iron Law for /money-diagnose

`/money-diagnose` now runs in **four explicit phases** (investigate → analyze → hypothesize → recommend) with a hard gate at phase 3: **no recommendations until the user explicitly confirms the root-cause hypothesis.** This prevents the most common diagnostic failure mode — agent has 80% confidence, user gives polite "hmm yeah", and 30 minutes of recommendations get aimed at the wrong target.

Optional Claude Code hook for tool-level enforcement is documented in the skill.

---

## ✨ What's New in v2.1.0

**Cross-session state management.** Three skills — `/money-save`, `/money-restore`, `/money-report` — turn every conversation into a checkpoint. Last week's pricing decision, the pivots you ruled out, the hypotheses you're testing — all persist across Claude Code sessions.

```
session 1  →  /money-discover  →  /money-save     ✅ wedge locked
   …a week passes…
session 2  →  /money-restore   →  picks up here   📦 no re-explanation
           →  /money-strategy  →  /money-save     ✅ pricing locked
   …a month passes…
session N  →  /money-report                        📄 full deliverable
```

---

## 🚀 Quick Start

### Option 1 — Claude Code plugin marketplace

```bash
claude plugin marketplace add iamzifei/show-me-the-money
claude plugin install money@show-me-the-money
```

### Option 2 — npx (works for any agent)

```bash
npx @orrisai/show-me-the-money
```

Then open Claude Code (or Codex CLI / Gemini CLI) and type:

```
/money
```

That's it. The AI will check for prior session state, onboard you if you're new, and guide you through every step.

---

## 🧭 What It Does

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
💾 Persist              /money-save → /money-restore → /money-report
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
14. **Save / Restore / Report** (`/money-save`, `/money-restore`, `/money-report`) — Cross-session state management. Checkpoint decisions, resume them in future conversations, and merge multi-month progress into a shareable deliverable

---

## 🌟 Why This Exists

Most AI business tools give you generic advice. Show Me The Money gives you **executable workflows** — every skill produces concrete actions, not just analysis. Every phase ends with "Tomorrow's first action: [specific task]."

**Key differentiators:**

- **Personalized** — Auto-researches your background and tailors all recommendations to YOU
- **Validated frameworks** — Battle-tested methodologies: premise deconstruction, 6-question demand validation, 5-filter opportunity scoring, business model stress test, 5-dimensional content diagnosis, 12-signal authenticity audit, headline impact matrix
- **Full-stack** — Covers the entire business lifecycle, not just one piece
- **Revenue-first** — Every recommendation connects to making money. No fluff
- **Persistent memory** — Decisions, ruled-out directions, and hypotheses survive across sessions via `/money-save`
- **Autonomous** — Set up once, runs 24/7 with `/money-ops`
- **Open source** — CC BY-NC 4.0 license. Free for personal use. Customize, extend, contribute

---

## 📦 Installation

### Via Claude Code plugin marketplace (recommended for Claude Code users)

```bash
claude plugin marketplace add iamzifei/show-me-the-money
claude plugin install money@show-me-the-money
```

To update later:

```bash
claude plugin marketplace update show-me-the-money
claude plugin update money@show-me-the-money
/reload-plugins
```

### Via npx (works for any agent — Claude Code, Codex, Gemini)

```bash
npx @orrisai/show-me-the-money
```

This installs all 25 skills to `~/.claude/skills/` automatically.

To update later, run the same command:

```bash
npx @orrisai/show-me-the-money
```

### Via npm (Global)

```bash
npm install -g @orrisai/show-me-the-money
```

### Manual

```bash
git clone https://github.com/iamzifei/show-me-the-money.git ~/.claude/skills/show-me-the-money
cd ~/.claude/skills/show-me-the-money && node install.js
```

---

## 🛠 Skills Reference

### Core (router, state, learning)

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Router** | `/money` | Onboards you, builds your profile, checks for prior state, routes to the right skill |
| **Save** | `/money-save` | Checkpoint the current business state to `~/.smtm/sessions/{project}/` |
| **Restore** | `/money-restore` | Resume from a prior saved state — pick up exactly where the last session left off |
| **Report** | `/money-report` | Merge all saved states into a deliverable markdown report |
| **Learn** | `/money-learn` | Manage atomic project learnings (auto-loaded into every other skill) |
| **Skillify** | `/money-skillify` | Codify a successful workflow into a project-local reusable skill |
| **Upgrade** | `/money-upgrade` | Update to the latest version |

### Discover · Strategy · Diagnose · Review

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Discover** | `/money-discover` | Find and validate profitable business ideas with competitive intelligence |
| **Strategy** | `/money-strategy` | Premise deconstruction + market research + business model stress test |
| **Diagnose** | `/money-diagnose` | Deep diagnosis when business is stuck — root cause, not symptoms (with Iron Law phase gate) |
| **Panel** | `/money-panel` | Run all four reviewers, find agreement, surface only taste decisions |
| **Investor Review** | `/money-review-investor` | VC-mode review with funding viability verdict |
| **Customer Review** | `/money-review-customer` | Named-ICP customer review with willingness-to-pay verdict |
| **Operator Review** | `/money-review-operator` | Solo-founder execution feasibility review |
| **Skeptic Review** | `/money-review-skeptic` | Devil's advocate red-team review |

### Build · Quality

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Product** | `/money-product` | Build, deploy, QA test, and monitor MVP |
| **Quality** | `/money-quality` | Code review, security audit, performance check, pre-launch gates |

### Grow

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Content** | `/money-content` | Content pipeline with authenticity audit and headline impact matrix |
| **Outreach** | `/money-outreach` | Cold email sequences and partnership outreach |
| **Social** | `/money-social` | Social media management with hook-writing frameworks |
| **SEO** | `/money-seo` | SEO + GEO optimization for search engines and AI |
| **Ads** | `/money-ads` | Google Ads, Meta Ads — setup, optimization, ROAS |

### Operate · Reflect

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Ops** | `/money-ops` | 24/7 autonomous operations with health scoring and safety guardrails |
| **Finance** | `/money-finance` | Revenue tracking and financial reports |
| **Retro** | `/money-retro` | Weekly retrospective: decided / shipped / stalled / unused-skills / focus |

---

## 💡 Usage Examples

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

### Lock in a decision and continue later

```
/money-discover "..."
→ AI validates the wedge, you confirm pricing
/money-save                       ✅ wedge + pricing checkpointed

   …a week later, new Claude Code session…

/money-restore                    📦 picks up exactly where you left off
/money-strategy                   → builds GTM plan from there
```

### Generate a deliverable for a co-founder

```
/money-report
→ Merges all your saved checkpoints (over weeks or months) into one
   shareable markdown report at ~/.smtm/reports/{project}/
```

---

## 🌐 Compatibility

Show Me The Money works with any AI coding agent that supports the `~/.claude/skills/` skill system or the Claude Code plugin marketplace:

- **Claude Code** (primary, full plugin marketplace support)
- **Codex CLI**
- **Gemini CLI**
- **Cursor** (via skills)
- **Other compatible agents**

---

## 🏗 How It Works

Built on the [Claude Code skill system](https://docs.anthropic.com/en/docs/claude-code/skills). Each skill is a `SKILL.md` file containing step-by-step workflows, business frameworks, and decision trees that the AI follows autonomously.

```
~/.claude/skills/
├── money/SKILL.md              ← Router + onboarding + prior-state check
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
├── money-save/SKILL.md         ← Cross-session checkpoint writer
├── money-restore/SKILL.md      ← Cross-session state loader
├── money-report/SKILL.md       ← Deliverable report generator
└── money-upgrade/SKILL.md      ← Version management
```

State files live in `~/.smtm/sessions/{project}/` (per-project, append-only) and `~/.smtm/reports/{project}/` (timestamped, never overwritten).

---

## 🗑 Uninstall

```bash
npx @orrisai/show-me-the-money uninstall
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Edit SKILL.md files in `skills/`
4. Test by copying to `~/.claude/skills/` and running in Claude Code
5. Submit a PR

All contributions welcome — new skills, framework improvements, language support, and bug fixes.

---

## 📄 License

CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0)

- Personal / learning / research: use freely
- Public derivative works: attribute source
- Commercial use: requires separate authorization
