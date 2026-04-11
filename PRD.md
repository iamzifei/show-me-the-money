# Show Me The Money — Product Requirements Document

## 1. Vision

**One-liner**: An AI-powered business automation suite that builds and runs a 24/7 company from scratch — from idea discovery to automated revenue generation.

**Problem**: Starting and running a business requires expertise across 10+ domains (strategy, product, marketing, sales, SEO, ads, finance, operations). Solo founders and small teams can't be experts in everything, and hiring is expensive. Existing tools handle individual functions but don't orchestrate the full business lifecycle.

**Solution**: A Claude Code skill suite that acts as a virtual business operating system. It discovers opportunities, creates strategies, builds products, generates content, runs marketing campaigns, manages outreach, optimizes for search, runs paid ads, tracks finances, and orchestrates all of these autonomously 24/7.

**Inspiration**: Business diagnostics frameworks, engineering workflow automation via Claude Code skills, and autonomous multi-agent business operations systems.

## 2. Target User

### Primary Persona: Solo Founder
- Technical or semi-technical
- Building a side project or early-stage startup
- Limited budget ($0-500/month for tools)
- Limited time (nights and weekends, or full-time solo)
- Wants to launch fast and automate as much as possible

### Secondary Persona: Small Team Lead
- 2-5 person team
- Has a product but needs growth
- Wants to automate repetitive business operations
- Needs a system to coordinate marketing, sales, and operations

## 3. Core Architecture

### Skill-Based Architecture

The system is built as a collection of Claude Code skills, each handling a specific business function. Skills communicate through the main router (`/money`) and can be used independently or as a coordinated pipeline.

```
                        ┌─────────────┐
                        │   /money    │ ← Main Router
                        │  (Router)   │
                        └──────┬──────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   ┌────▼────┐           ┌────▼────┐           ┌────▼────┐
   │Discovery│           │Strategy │           │ Product │
   │  Phase  │           │  Phase  │           │  Phase  │
   └────┬────┘           └────┬────┘           └────┬────┘
        │                      │                      │
        │         ┌────────────┼────────────┐         │
        │         │            │            │         │
   ┌────▼────┐ ┌──▼───┐ ┌────▼────┐ ┌────▼────┐ ┌──▼───┐
   │ Content │ │Social│ │  SEO/   │ │  Ads/   │ │Out-  │
   │Pipeline │ │Media │ │  GEO    │ │  SEM    │ │reach │
   └────┬────┘ └──┬───┘ └────┬────┘ └────┬────┘ └──┬───┘
        │         │           │           │         │
        └─────────┴─────┬─────┴───────────┘         │
                        │                            │
                   ┌────▼────┐                  ┌────▼────┐
                   │   Ops   │                  │ Finance │
                   │  24/7   │                  │Tracking │
                   └─────────┘                  └─────────┘
```

### Distribution Model

```
npm publish → npx @orrisai/show-me-the-money install → ~/.claude/skills/money-*/
```

Users install via `npx`, which copies SKILL.md files to their Claude Code skills directory. Upgrades are handled by re-running `npx @orrisai/show-me-the-money@latest install` or using the built-in `/money-upgrade` skill.

## 4. Skill Specifications

### 4.1 `/money` — Main Router
**Purpose**: Entry point that understands user intent and routes to the appropriate skill or runs a full pipeline.

**Key Features**:
- Intent detection and routing
- Full pipeline orchestration (idea → running business)
- State tracking across skills
- Progress reporting

### 4.2 `/money-discover` — Business Idea Discovery
**Purpose**: Find profitable business ideas from scratch using market analysis, trend scanning, and competitive gap identification.

**Key Features**:
- User skills/resources assessment
- Trend analysis (Product Hunt, HN, Reddit, X)
- Problem mining (complaints, "I wish" patterns)
- Revenue model scanning
- Competitive gap analysis
- Ranked idea generation (5 ideas with revenue estimates)

**Output**: Ranked list of business ideas with feasibility scores and first-dollar paths.

### 4.3 `/money-strategy` — Business Strategy
**Purpose**: Turn an idea into an actionable business plan with pricing, competitive positioning, and go-to-market strategy.

**Key Features**:
- Business Model Canvas generation
- Competitive analysis (top 5 competitors)
- Pricing strategy with specific price points
- Go-to-market plan with channel ranking
- 30/60/90-day milestones
- KPI framework

**Output**: Complete strategy document ready for execution.

### 4.4 `/money-product` — Product Building
**Purpose**: Build and deploy a revenue-ready MVP.

**Key Features**:
- Stack selection based on product type
- MVP scope definition (ruthless feature cutting)
- Build sequence execution (setup → landing → auth → core → payments → deploy)
- Stripe payment integration
- Deployment to Vercel
- Post-launch verification checklist

**Output**: Live, deployed product with payment integration.

### 4.5 `/money-content` — Content Pipeline
**Purpose**: Create high-converting content across all channels.

**Key Features**:
- Content strategy and calendar
- Blog post / article pipeline (research → outline → draft → optimize → publish)
- Email sequence design (welcome, onboarding, conversion, re-engagement)
- Social media content creation
- SEO optimization of all content
- E-E-A-T compliance checking

**Output**: Ready-to-publish content pieces with publishing instructions.

### 4.6 `/money-outreach` — Sales Automation
**Purpose**: Build and run automated outreach campaigns for lead generation and sales.

**Key Features**:
- Ideal customer profile (ICP) definition
- Prospect research and list building
- Email sequence design (3-touch minimum)
- Sending strategy with warmup
- Response categorization and follow-up
- Campaign optimization via A/B testing

**Output**: Prospect lists, email sequences, and outreach schedules.

### 4.7 `/money-social` — Social Media Management
**Purpose**: Build and grow a social media presence that converts to customers.

**Key Features**:
- Platform selection and strategy
- Content pillar framework
- Platform-specific content creation (X, LinkedIn, Reddit)
- Community building strategy
- Engagement automation
- Performance metrics tracking

**Output**: Content calendar, draft posts, engagement playbook.

### 4.8 `/money-seo` — Search & AI Optimization
**Purpose**: Drive organic traffic through traditional SEO and AI search optimization (GEO).

**Key Features**:
- Technical SEO audit and fixes
- Keyword research and mapping
- On-page optimization
- GEO (Generative Engine Optimization) for AI search
- Schema markup implementation
- Link building strategy
- Ranking monitoring

**Output**: SEO audit report, keyword map, optimized pages, schema markup.

### 4.9 `/money-ads` — Paid Advertising
**Purpose**: Set up and optimize paid advertising campaigns with positive ROI.

**Key Features**:
- Platform selection (Google, Meta, LinkedIn, etc.)
- Campaign structure and setup
- Ad copy generation
- Landing page optimization
- Budget management with safety caps
- Weekly optimization cycle
- ROAS tracking

**Output**: Campaign configurations, ad copy, budget plans.

### 4.10 `/money-ops` — 24/7 Operations
**Purpose**: Orchestrate all business functions autonomously on schedules.

**Key Features**:
- Daily/weekly/monthly operation schedules
- Claude Code scheduled triggers setup
- System cron configuration
- Health monitoring and alerts
- Incident response
- Setup wizard for first-time configuration

**Output**: Configured schedules, monitoring dashboards, alert thresholds.

### 4.11 `/money-finance` — Financial Intelligence
**Purpose**: Track revenue, manage expenses, and provide financial clarity.

**Key Features**:
- Stripe revenue integration
- MRR/ARR/churn tracking
- Unit economics (CAC, LTV, payback period)
- Daily/weekly/monthly financial reports
- Cohort analysis
- Pricing optimization recommendations
- P&L summaries and forecasting

**Output**: Financial dashboards, reports, pricing recommendations.

### 4.12 `/money-upgrade` — Version Management
**Purpose**: Keep the skill suite up to date.

**Key Features**:
- Version checking (current vs. latest)
- Automated backup before upgrade
- One-command upgrade via npx
- Rollback capability
- Changelog display

## 5. User Flows

### Flow 1: Zero to Business (Full Pipeline)
```
User: /money
→ "Starting from zero"
→ /money-discover → 5 ranked ideas
→ User picks idea
→ /money-strategy → Complete business plan
→ User approves plan
→ /money-product → Live MVP with payments
→ /money-content → Launch content ready
→ /money-seo → SEO optimized
→ /money-social → Social presence live
→ /money-ads → First ad campaigns running
→ /money-outreach → Outreach sequences active
→ /money-ops → 24/7 automation configured
→ /money-finance → Revenue tracking live
```

### Flow 2: Grow Existing Product
```
User: /money "I have a SaaS product at example.com, need more customers"
→ /money-strategy → Competitive analysis + GTM plan
→ /money-seo → SEO audit + fixes
→ /money-content → Content calendar + first batch
→ /money-ads → Paid campaigns
→ /money-ops → Automate ongoing operations
```

### Flow 3: Individual Skill Usage
```
User: /money-ads "set up Google Ads for my API product"
→ Campaign strategy
→ Keyword research
→ Ad copy generation
→ Budget recommendation
→ Setup instructions
```

## 6. Technical Requirements

### Installation
- Distributed via npm (`npx @orrisai/show-me-the-money install`)
- Skills installed to `~/.claude/skills/` for global availability
- No external dependencies (pure Markdown skills)
- Version management via `/money-upgrade`

### Compatibility
- Claude Code CLI (primary target)
- Works with any Claude Code environment (terminal, desktop app, web, IDE extensions)
- Skills are self-contained Markdown — no compilation needed

### Updates
- Published to npm registry for `npx` distribution
- Automatic update notification via version checking
- Backup + upgrade + rollback cycle
- GitHub releases for changelogs

## 7. Success Metrics

| Metric | Target (3 months) |
|--------|-------------------|
| GitHub stars | 500+ |
| npm installs | 1,000+ |
| Active users (weekly) | 200+ |
| Skills contributed by community | 5+ |
| User-reported revenue generated | $10K+ aggregate |

## 8. Roadmap

### v1.0 (Launch)
- All 12 core skills
- npm distribution
- Basic documentation

### v1.1 (Community Feedback)
- Improved skill prompts based on user feedback
- Additional templates and frameworks
- Integration with popular tools (Notion, Airtable, etc.)

### v2.0 (Advanced Automation)
- Multi-project management
- Team collaboration features
- Custom skill creation framework
- Analytics dashboard
- MCP server integration for real-time data

## 9. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Skills produce low-quality output | Iterative prompt refinement, community feedback loop |
| Users don't know where to start | Strong `/money` router with guided flow |
| Automation runs too aggressively | Sandbox mode by default, human-in-the-loop for critical actions |
| npm squatting / name conflicts | Register name early, verify ownership |
| Skills become outdated | `/money-upgrade` for easy updates, regular maintenance schedule |

## 10. License

CC BY-NC 4.0 — Free for personal use. Commercial use requires separate authorization.
