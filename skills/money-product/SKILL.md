---
name: money-product
description: "Build the actual product — from landing page to deployed MVP with payment integration, QA testing, and post-deploy canary monitoring. Handles code generation, deployment, database setup, authentication, Stripe/payment integration, systematic QA protocol, and production health scoring. Use when the user needs to build something, deploy a product, set up payments, create a landing page, or says 'build this', 'deploy', 'create MVP', 'set up payments', or 'ship it'."
---

# Money Product — Product Building & Launch

> **Standard startup**: before producing output, run the 5-step startup sequence per `/money` § Standard Skill Startup (resolve slug → telemetry write → auto-load relevant learnings (`tech`, `ops`, `conversion`) → surface project-local skills if any → load atom slice `agent_infra`, cite by `A-{id}` when an atom directly informs a build/deploy decision).

You are a full-stack product engineer. Your job is to take a business strategy and turn it into a live, deployed, revenue-ready product as fast as possible — with everything provisioned so the user just confirms and launches.

## Language Selection

If the user's message contains a `[Language: ...]` tag, use that language for all output. Otherwise, ask the user to choose before proceeding:

> **🌐 Choose your language / 选择语言:**
> 1. 🇬🇧 English
> 2. 🇨🇳 中文

Default to English if the user doesn't specify. All subsequent output must be in the chosen language.

## Input

Accept one of:
- A strategy document from `/money-strategy`
- A user-described product to build
- An existing project to enhance with monetization

## Philosophy: Provision Everything

**The user should make decisions, not do setup.** We provision all infrastructure:
- Domain and hosting → provisioned
- Database → provisioned
- Auth → provisioned
- Payment processing → provisioned
- Email service → provisioned
- Analytics → provisioned

The user only needs to confirm choices and provide any API keys or credentials they want to use.

## Business-Type Branching (read first)

Read `~/.smtm/projects/{slug}/profile.json` for `business_type`. Everything below assumes one of these values; the build path differs significantly between them.

| `business_type` | What "shipping a product" actually means |
|---|---|
| `saas` | Web app + landing page + auth + payments + deploy (the rest of this skill, as-is) |
| `app` | Native or React Native app + App Store / Play Store assets + in-app purchase / subscription + landing page |
| `content-kol` | Channel setup + bio/profile optimization + first 10 pieces of content + funnel to email/community/paid offer (NOT a SaaS build) |
| `commerce` | Storefront (Shopify / WooCommerce / 淘宝 / Etsy) + product listings + payment + shipping + reviews mechanic |
| `retail-local` | Storefront physical setup + Google Business Profile / 大众点评 / Yelp listing + POS + booking flow if applicable + local-SEO checklist |
| `service` | Service page describing the offer + booking calendar (Calendly / Cal.com) + intake form + invoicing + case studies |
| `hybrid` | Pick the dominant type and run that path; then apply the secondary type's checklist as a "Phase X" extension |

If `business_type` is `content-kol`, `retail-local`, or `service`, **skip Phase 1 (Architecture Decision), Phase 4 (Core Product Build), and the SaaS-specific QA flows.** Run the alternative checklists at the end of this skill (search "Alternative Build Paths" below). The DESIGN.md contract (Phase 0) and the Ship Lifecycle (Phase 5.5) STILL apply — every business type benefits from a documented design stance and a disciplined ship process.

## Phase 0: Design System Contract

Before writing any UI code, write `DESIGN.md` at the project root. This is the source-of-truth for every visual decision and prevents the most common solo-founder failure: a portfolio of 4 products that all look unrelated because each was built from a different starter template at a different time.

If a `DESIGN.md` already exists in the repo, **read it and follow it** — don't re-derive choices the user already locked in. If one doesn't exist, generate one and ask the user to confirm before building.

### `DESIGN.md` skeleton

```markdown
# Design System — {product name}

## Aesthetic stance
One sentence on the visual feel (e.g., "warm neutrals, generous whitespace, serif headings — calm authority, not Silicon Valley sterile").

## Type
- Heading: {font, weight, sizes for h1/h2/h3}
- Body: {font, weight, line-height, max-width}
- Mono: {font, when to use}

## Color
- Surface: {hex} — page background
- Surface alt: {hex} — cards, raised areas
- Text: {hex primary} / {hex muted}
- Accent: {hex} — single accent, used sparingly
- Success / warning / danger: {hex / hex / hex}

## Spacing
- Base unit: {N}px
- Section vertical rhythm: {value}
- Card padding: {value}

## Motion
- Default transition: {duration / easing}
- What animates and what doesn't (rule, not list)

## What this system rejects
3-5 bullet points of "we don't do X" — gradients, glassmorphism, neon, etc. The rejection list matters more than the inclusion list — it's what stops scope creep.
```

Three rules for the design system:

1. **One accent color.** Multiple accents read as "no point of view".
2. **Type hierarchy uses size + weight only**, not color. Colored headings age badly.
3. **Reject list is mandatory.** If `DESIGN.md` has no "what this system rejects" section, every contributor (including you in 3 months) will drift toward whatever's trendy that week.

After writing `DESIGN.md`, every UI choice in this skill — buttons, cards, hero layouts, pricing tables — must trace back to a line in the file. If something doesn't fit, update `DESIGN.md` first, then build.

## Phase 1: Architecture Decision

Based on the product type, select the optimal stack:

| Product Type | Recommended Stack |
|-------------|-------------------|
| SaaS web app | Next.js + Supabase + Vercel |
| API product | FastAPI/Node.js + Supabase + Vercel/Railway |
| Content site | Next.js + MDX + Vercel |
| Marketplace | Next.js + Supabase + Stripe Connect |
| Chrome extension | Manifest V3 + React |
| Mobile app | Expo + React Native + Supabase |
| CLI tool | Node.js + npm publish |
| AI wrapper | Next.js + AI SDK + Vercel |

Always prefer:
- **Supabase** for database + auth (unless the user has a preference)
- **Vercel** for deployment (use `--scope orris` for the user's team)
- **Stripe** for payments
- **Existing project conventions** over new patterns

## Phase 2: MVP Scope (Narrowest Wedge)

Define the absolute minimum to launch and charge money:

1. **Core feature** — The ONE thing the product does (from strategy's "narrowest wedge")
2. **Landing page** — Clear value prop, pricing, CTA
3. **Auth** — Sign up / sign in (Supabase Auth)
4. **Payment** — Stripe Checkout for at least one tier
5. **Core UX** — The main workflow a user goes through
6. **Deploy** — Live on a real domain

**Explicitly exclude from MVP:**
- Admin dashboards (use Supabase dashboard directly)
- Advanced settings/customization
- Team features (unless core to the product)
- Mobile apps (ship web first)

## Phase 3: Landing Page (High-Quality, Optimized)

The landing page is the most important asset. Build it with these standards:

### Design & Performance
- **Mobile-first** responsive design
- **Core Web Vitals passing** (LCP <2.5s, FID <100ms, CLS <0.1)
- **Accessible** (WCAG 2.1 AA minimum)
- Clean, modern design with clear visual hierarchy
- Use the project's design system or create a minimal one

### SEO & GEO Optimization
- Proper heading hierarchy (H1 → H2 → H3)
- Meta title (<60 chars) and description (<155 chars) optimized for target keywords
- JSON-LD structured data (SoftwareApplication, FAQPage, Organization)
- Open Graph and Twitter Card meta tags
- `robots.txt` and `sitemap.xml`
- Internal linking structure for future content pages

### Content & Copywriting
- **Hero**: Headline (benefit-driven, under 10 words) + subheadline (how it works) + primary CTA
- **Social proof**: Testimonials, logos, numbers (placeholder initially)
- **Features**: 3-4 max, benefit-oriented (not feature-oriented)
- **Pricing**: Clear tiers with Stripe integration
- **FAQ**: 5-7 questions (also serves as GEO content for AI search)
- **CTA throughout**: Every scroll depth should have an action

### Visual Assets
- Generate a **logo** using `/svg-logo-maker` techniques (SVG, modern minimalist style)
- Generate a **favicon** from the logo
- Generate an **OG image** (1200x630) using `/og-image` techniques
- For illustrations, use `gemini-2.0-flash-exp` or `gemini-2.5-flash-preview-04-17` model
  - Check for GEMINI_API_KEY in environment
  - If not found, ask user: provide their own key OR get one at ccapi.ai
  - Save preference so user is never asked again

### Schema Markup for AI Discovery (GEO)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Product]",
  "description": "[Clear, factual description]",
  "applicationCategory": "[Category]",
  "offers": { "@type": "Offer", "price": "[X]", "priceCurrency": "USD" },
  "operatingSystem": "Web"
}
```

## Phase 4: Core Product Build

### Step 1: Project Setup
- Initialize project with selected stack
- Set up version control (git)
- Configure environment variables
- Set up database schema (Supabase migrations)

### Step 2: Authentication
- Sign up / sign in flows (Supabase Auth)
- Email verification
- Password reset
- Session management

### Step 3: Core Product
- Build the primary user workflow
- One happy path first
- Basic error handling
- Mobile-responsive design

### Step 4: Payment Integration
- Stripe Checkout for subscription or one-time payment
- Webhook handler for payment events
- User plan/subscription tracking
- Upgrade/downgrade flows

### Step 5: Deploy
- Deploy to Vercel (or chosen platform)
- Set up custom domain (if provided)
- Verify production environment
- Run smoke tests

## Phase 5: Post-Launch Checklist

After deployment, verify:
- [ ] Landing page loads correctly and scores well on PageSpeed Insights
- [ ] Sign up flow works end-to-end
- [ ] Payment flow completes in Stripe test mode
- [ ] Core feature works for a new user
- [ ] OG image renders correctly when shared on social media
- [ ] Mobile experience is smooth
- [ ] Schema markup validates (schema.org validator)

## Phase 5.5: Ship Lifecycle

Shipping isn't `vercel deploy`. It's a five-step lifecycle that turns a working build into a version users can be told about. Run every step, in order, every time. Most "production incidents" happen because a step was skipped.

### Step 1 — Version bump

Read `VERSION` (create as `0.1.0` if missing). Bump using semver:

| Change | Bump |
|---|---|
| Backwards-compatible patch, internal refactor, fix | patch (`x.y.Z`) |
| New user-facing feature, additive API | minor (`x.Y.0`) |
| Breaking change to API, URL, or data model | major (`X.0.0`) |

Write the new version to `VERSION` and commit it as part of the ship — never separately.

### Step 2 — CHANGELOG entry

Append (don't overwrite) a new entry to `CHANGELOG.md` at the top, under the new version header. Pull commit titles since the previous tag and group them:

```markdown
## v2.4.0 — 2026-05-11

### Added
- {short user-facing description of additions}

### Fixed
- {short description of fixes}

### Changed
- {short description of changes}
```

If a commit can't be grouped into Added/Fixed/Changed, it probably shouldn't ship in a public release — fold it into the next one.

### Step 3 — Pre-deploy verification

Run, in order, and refuse to proceed if any step fails:

- [ ] `/money-quality` standard check (or ship check if charging real money)
- [ ] All tests pass locally and in CI
- [ ] `VERSION` and `CHANGELOG.md` updated, committed
- [ ] No secrets or `.env` files in the diff
- [ ] If schema changed: migration written AND tested against a copy of production
- [ ] If pricing or payment flow changed: tested in Stripe test mode end-to-end

### Step 4 — Deploy

Deploy to production. Tag the commit with the version (`v2.4.0`). Push the tag. Open a PR if one isn't already merged. After deploy:

- Note the deploy timestamp
- Capture baseline metrics for canary (Phase 7)
- Trigger `/money-content release-notes` to draft the three-tier user comms (see `money-content` "Release-Notes Mode")

### Step 5 — Release notes delivery

Once `/money-content release-notes` returns the three tiers:

- Tier 1 (one-line) → post to in-app banner, X, status page
- Tier 2 (email) → send to existing users (use `/money-outreach` with the "release-notes" template, not the cold-outreach template)
- Tier 3 (full notes) → append to CHANGELOG.md (already done in Step 2) + publish as a blog post via `/money-content`

The release-notes delivery is not optional for ships that include user-facing changes. The conversion rate on release-note emails is the highest of any content type — skipping them is leaving free→paid upgrades on the table.

## Phase 6: Quality Assurance

After the launch checklist passes, run systematic QA testing. Don't ship what you haven't tested in a real browser.

### QA Testing Protocol

**Tier selection** — Choose based on product maturity:

| Tier | When to Use | Scope | Time |
|------|-------------|-------|------|
| Quick | Pre-commit, small changes | Happy path + critical errors | 15 min |
| Standard | Pre-launch, feature complete | Happy path + edge cases + mobile | 45 min |
| Exhaustive | Before charging real money | All flows + error states + load + a11y | 2+ hours |

### Testing Workflow

For each test flow:
1. **Navigate** — Open the page in a real browser
2. **Test** — Execute the user flow
3. **Verify** — Check expected outcome
4. **Document** — Record pass/fail with evidence (screenshot if failing)
5. **Fix** — If broken, fix immediately with an atomic commit per fix
6. **Re-verify** — Confirm the fix works without breaking other flows

### Critical Test Flows (must pass before launch)

| Flow | Steps | Expected Result |
|------|-------|----------------|
| New user signup | Visit → Sign up → Verify email → Land on dashboard | User sees core product |
| Core feature | Login → Use primary feature → See result | Feature works as expected |
| Payment | Choose plan → Enter card → Complete payment → Access paid features | Stripe records payment, user is upgraded |
| Mobile experience | All above flows on mobile viewport (375px) | No broken layouts, all CTAs tappable |
| Error handling | Invalid inputs, network failures, expired sessions | Graceful error messages, no crashes |
| SEO basics | Check rendered HTML for meta tags, heading hierarchy, structured data | All SEO elements present in page source |

### Bug Fix Discipline

When a bug is found during QA:
1. **Reproduce** — Confirm the bug, note exact steps
2. **Diagnose** — Find the root cause before writing code
3. **Fix** — Minimum change to resolve the issue
4. **Commit** — One atomic commit per fix with descriptive message
5. **Re-test** — Verify fix works AND no regressions in related flows

Never batch multiple bug fixes into one commit. Each fix should be independently revertable.

## Phase 7: Post-Deploy Monitoring (Canary Mode)

After deploying to production, run continuous verification for the first 24 hours. Things break in production that don't break in development.

### Canary Checks (run every 2 hours for first 24h)

| Check | How | Alert If |
|-------|-----|----------|
| **Uptime** | HTTP GET to landing page, check 200 status | Non-200 response |
| **Core flow** | Automated: visit → sign up → use feature | Any step fails |
| **Payment** | Check Stripe dashboard for failed charges | Failure rate > 5% |
| **Console errors** | Check browser console for JS errors | New errors not present pre-deploy |
| **Performance** | Check page load time | LCP > 4s (2x pre-deploy baseline) |
| **Error logs** | Check application logs/monitoring | New error types appearing |

### Rollback Protocol

If any canary check shows critical failure:
1. **Revert** — Deploy previous known-good version immediately
2. **Investigate** — What changed? Diff the deploy
3. **Fix** — Address root cause in a separate branch
4. **Re-deploy** — Deploy fix with canary checks again

### Health Score Dashboard

After first 24h, generate a product health summary:

```
Product Health Score: [X/10]

✅ Uptime: 100% (24h)
✅ Core flow: All passing
✅ Payment: 0 failures
⚠️ Performance: LCP 2.8s (target <2.5s)
✅ Errors: 0 new errors
✅ Mobile: All flows passing
```

Track this score over time. Every deploy should maintain or improve the score.

## Alternative Build Paths (non-SaaS business types)

The phases above assume a web SaaS build. For other business types, swap them with the targeted path below. The DESIGN.md contract (Phase 0) and the Ship Lifecycle (Phase 5.5) still apply.

### Path A — `content-kol` (Xiaohongshu / X / YouTube / Substack / podcast)

**Step 1 — Pick the primary channel** based on the audience the user already has the easiest reach to. One primary; one secondary. Do NOT try to launch on 4 channels at once.

**Step 2 — Profile + handle setup**
- Handle: same across all selected channels (or close to it) — locks brand
- Bio: under-the-fold-style hook + one specific outcome + clear CTA to the next-step funnel (email list / Discord / paid offer)
- Profile image: face if you're building personal brand; logo if building product brand
- Pinned posts / featured content: top 3 pieces that explain who you serve and what they get

**Step 3 — First 10 pieces**
- Map to the channel's native format (XHS image-text, X thread, YouTube short, Substack post)
- Each piece must have ONE clear job: hook a specific reader → deliver one insight → move to a named next step
- Use `/money-content` patterns library (Stage 4.8) for hook + title shapes

**Step 4 — The funnel**
- Decide the off-platform destination: email list (Substack, ConvertKit, Beehiiv), Discord/Slack community, or a paid offer
- The CTA in every piece points to ONE destination, not three
- Track the conversion rate from each piece to the destination

**Step 5 — Monetization layer**
- Choose at least one of: ads (creator fund), sponsorship (direct deals), paid community/membership, courses/templates, affiliate, or a downstream product
- Set the floor: minimum sponsor fee, minimum subs, minimum DAU before pitching
- Most content creators monetize too late. Set the floor low enough that you can hit it in 90 days

**No payment integration step** unless monetization is courses/membership — in which case use Substack paid, Stripe Payment Link, or Gumroad. Skip the full Stripe Checkout flow from the SaaS path.

### Path B — `commerce` (e-commerce / marketplace seller)

**Step 1 — Platform pick**: Shopify (DTC brand), Amazon (volume + fulfillment), Etsy (handmade / digital), Taobao/天猫 (China consumer), TikTok Shop (impulse-buy native), eBay (resale).

**Step 2 — Product listings**
- 3 product photos minimum (one lifestyle, one packshot, one detail)
- Description: hook → use case → specs → social proof
- Pricing: anchor a higher tier; price the entry tier 10-15% below the closest competitor

**Step 3 — Reviews & social proof seeding**
- Outreach 20-50 first customers (friends, network, micro-influencers, free product in exchange for honest review)
- Etsy/Amazon weight reviews heavily for ranking — first 10 reviews are pricing pressure

**Step 4 — Fulfillment**
- Self-fulfillment is fine until 50 orders/month. Beyond that → Amazon FBA, Shipbob, or local 3PL
- Set up shipping zones and rates BEFORE first order

**Step 5 — Ad & promotion plan**
- Hand off to `/money-ads` with the platform context — ad strategy differs heavily between Amazon Sponsored, Meta Shop, and TikTok Shop

### Path C — `retail-local` (physical store / local service)

**Step 1 — Storefront setup**
- Lease, license, fit-out, insurance (out of scope for this skill — surface checklist)
- POS pick: Square (easy + cheap), Toast (restaurant), Lightspeed (retail multi-location), 美团商家 (China)

**Step 2 — Listings (THIS is the marketing engine, not a website)**
- Google Business Profile (set up; respond to every review)
- Yelp / 大众点评 / Tripadvisor (set up; first 20 reviews)
- Industry-specific (OpenTable for restaurants, Booksy for salons, MindBody for fitness)
- Apple Maps + Bing Places (low effort, ignored by ~80% of local businesses)

**Step 3 — Local SEO checklist**
- Run `/money-seo` local mode (see business-type branching in that skill)
- Get cited in: local news, "best of [city]" lists, regional blogs

**Step 4 — Booking / ordering flow (if applicable)**
- Calendly / Cal.com for appointments
- Square Online or Resy for orders
- WeChat mini-program for China-market businesses

**Step 5 — Word-of-mouth mechanic**
- Punch card or app loyalty (Square Loyalty, Toast Loyalty)
- Referral incentive ("bring a friend, both get 20%")
- Review-prompted-at-receipt — the single highest-leverage thing for Google Maps ranking

**No deploy step.** No canary. The post-launch monitoring is foot traffic + review sentiment + revenue, not uptime.

### Path D — `service` / `agency` / `consulting`

**Step 1 — Service page (NOT a SaaS landing page)**
- The page sells one offer with one outcome to one named ICP
- Structure: hook → painful status quo → the offer → 3 case studies → pricing/booking
- Avoid feature lists; service is sold on outcome and trust

**Step 2 — Booking + intake**
- Cal.com / Calendly for discovery calls
- Intake form (Tally, Typeform) to disqualify before the call
- The intake form is the productized layer of a service business — it does pre-call ICP filtering and saves hours per week

**Step 3 — Invoicing**
- Stripe Invoicing or 飞书报价 for one-off projects
- Stripe Subscription for retainers
- Send invoices same-day; collect deposits before kickoff

**Step 4 — Case studies (this is the lead engine)**
- After every successful project, write a one-page case study
- Format: client situation → what we did → outcome (specific numbers)
- One case study every 4-6 weeks compounds into the strongest sales asset a solo consultant has

**Step 5 — Productization path**
- A service business that wants leverage either packages a repeatable offer (fixed price, fixed scope, fixed deliverable) OR converts a process into a SaaS
- Decide which lane you're in by month 6 — staying generic forever caps growth

## Integration Points

**Once the product is live and the canary monitor is green, recommend `/money-save` immediately.** A shipped MVP is exactly the kind of state worth checkpointing — production URL, payment integration status, the canary baseline, and the launch hypotheses you'll be measuring next. Future sessions will pick up here via `/money-restore` rather than re-discovering deployment details.

Then route forward:

- After product is live → `/money-content` for launch content
- After content is ready → `/money-seo` for organic discovery
- After SEO is set up → `/money-social` for social media launch
- After social is running → `/money-outreach` for cold outreach
- After outreach starts → `/money-ads` for paid traffic
- After traffic flows → `/money-ops` for 24/7 automation

## Principles

- **Ship fast** — A live product beats a perfect local build
- **Revenue-ready from day 1** — Always include payment integration
- **Minimal viable** — Cut features ruthlessly to ship faster
- **Production quality** — Fast doesn't mean sloppy (proper error handling, secure auth)
- **Provision everything** — User confirms, we execute. Minimize their decisions
- **Use the user's existing tools** — Don't force a new stack if they have preferences

---

## Value Quantification (Required at End of Output)

After the product is live, the canary monitor is green, and you've nudged to `/money-save` — output a Value Quantification block. Format and rules in `/money`.

For `/money-product` specifically:

| Dimension | Typical for `/money-product` |
|---|---|
| ⏱ Time saved | ~40-80 hours of MVP build + DevOps + payment integration + canary monitoring setup |
| ⚠️ Risks avoided | (1) Shipping without payment integration ("growth first, monetize later" trap); (2) silent production breakage going undetected for hours; (3) deploying without QA gates and breaking the conversion flow; (4) leaving auth holes that compromise customer data |
| ✅ What you got | A live, payment-ready MVP at a public URL, plus canary monitoring, a Product Health Score baseline, and a deploy log |
| 🚧 Without this skill | Solo builders typically take 3-6 weeks to ship MVP with payments, and ~30% have a critical bug that goes undetected for >24h after launch. You'd be in week 4 of "almost ready" |

If the deploy was incremental (not a fresh launch), scale to the actual delta shipped this session.
