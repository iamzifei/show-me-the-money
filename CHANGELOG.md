# Changelog

All notable changes to **Show Me The Money** are documented here. The current release's highlights also live at the top of [README.md](README.md); older versions live only here.

中文版本：[CHANGELOG.zh-CN.md](CHANGELOG.zh-CN.md)

---

## v2.5.1 — 2026-05-11

### Fixed
- **Value Quantification blocks now render correctly in terminal markdown viewers.** The previous empty-header two-column tables (`| | |`) collapsed to "Column 1 / Column 2" prose in Claude Code's terminal renderer (and similar tools). Converted to a bulleted list with bold prefix across 13 SKILL.md files, which renders cleanly in terminal AND GitHub AND every other markdown viewer.
- Added an explicit rule in `/money`'s Value Quantification template forbidding the empty-header table form so future skills don't reintroduce it.

### Changed
- README "What's New" history extracted to `CHANGELOG.md` (English) and `CHANGELOG.zh-CN.md` (Chinese). The READMEs now show only the latest release's notes; older releases live in the changelog. Keeps the front-page short as the history grows.

---

## v2.5.0 — 2026-05-11

**The "your business isn't a SaaS, and you already have a working product" release.** Two themes folded into existing skills — no new skill files, count stays at 25.

### Theme 1 — Business-type awareness (the suite stops assuming everything is a SaaS)

Before v2.5, every skill defaulted to web SaaS assumptions: Next.js stack, Stripe subscriptions, cold-email outreach, Google web SEO, Meta/Google ads. That's wrong for ~half of real founders. `/money` onboarding now captures `business_type` per project, persisted to `~/.smtm/projects/{slug}/profile.json`, and downstream skills branch their behavior.

**Seven supported types:**
- `saas` — Web SaaS / API
- `app` — iOS / Android / desktop app
- `content-kol` — Xiaohongshu, X, YouTube, Substack, podcast creators
- `commerce` — E-commerce / marketplace seller (Shopify, Amazon, Etsy, Taobao, TikTok Shop)
- `retail-local` — Physical store / local service business
- `service` — Service / agency / consulting
- `hybrid` — Combinations

**What changes when you set the type:**

| Skill | What branches |
|---|---|
| `/money-product` | Alternative build paths for content-KOL (channel setup, first 10 pieces, monetization), commerce (platform pick, listings, fulfillment), retail-local (storefront, listings, local SEO), service (service page, booking, case studies) |
| `/money-finance` | Revenue source maps to type (Stripe / App Store / platform payouts / POS / invoicing); primary growth metric differs (MRR vs DAU vs repeat-purchase rate vs daily covers vs utilization) |
| `/money-outreach` | Cold email is one mode of many — adds local-PR / wholesale / affiliate-recruiting / sponsor-outreach modes for non-SaaS types |
| `/money-seo` | Local SEO (Google Maps + Yelp + 大众点评), App Store Optimization, Platform-Native Search (XHS / X / YouTube / Substack / Douyin / TikTok), Marketplace Search (Amazon / Etsy / TikTok Shop / Taobao) — runs the matching section, not generic web SEO |
| `/money-ads` | Platform picks differ — Apple Search Ads / Google App for apps, Dou+/薯条 for KOL, Yelp/NextDoor/美团 for local, Amazon Sponsored / TikTok Shop Ads for commerce |
| `/money-quality` | Alternative quality modes — Content Quality (authenticity + hook + factual integrity), Listing Quality (photos + title + reviews + fulfillment), Service & Experience Quality (hygiene + scripts + first-impression flow), Deliverable Quality (brief match + voice + case-study extraction) |
| `/money-content` | Content priority differs — listing copy + UGC scripts (commerce); GBP content + reviews seed (retail-local); platform-native format itself (content-kol) |

### Theme 2 — Post-PMF iteration via `/money-strategy iterate`

Most strategy skills assume the user has a blank slate. The opposite is increasingly common: a working product, real customers, real metrics — and the question is *"what should I ship next?"*. v2.5 adds an iterate mode to `/money-strategy` that anchors to measured reality instead of a hypothesis.

**Auto-detection:** If `profile.json` has `post_pmf: true` AND a `live_url`, `/money-strategy` enters iterate mode by default. Force either mode with `/money-strategy fresh` or `/money-strategy iterate`.

**The flow:**

1. **Baseline the user's product** — pricing, current MRR/proxy metric, ICP, last 5 ships
2. **Pick leaderboards (type-aware defaults)**:
   - `saas` → Toolify, TrustMRR, Product Hunt, Indie Hackers top revenue, AppSumo
   - `app` → App Store Top, Play Top Grossing, Sensor Tower, data.ai
   - `content-kol` → XHS 热榜, 飞瓜 抖音榜, Substack Leaderboard, YouTube Trending
   - `commerce` → Amazon Best Sellers, Etsy Bestsellers, Shopify Top Shops, Taobao 热卖, TikTok Shop Trending
   - `retail-local` → Yelp top-rated, 大众点评 必吃榜, Google Maps top
   - `service` → UpWork top, Thumbtack top pros, Clutch top agencies
3. **Pick 3 benchmarks** worth deep-studying (re-uses the existing 4-filter test but with iteration-flavored definitions)
4. **For each benchmark, write a teardown** — the wedge they actually won on, pricing, traffic source, hidden lever, the gap they don't own
5. **Diff matrix** — user's product vs each benchmark across 11 dimensions; gaps classified P0 / P1 / P2
6. **Pick the next 3 ships** — specific, scoped, measurable, with the smallest version that ships
7. **Read the category trajectory** — what the leaderboard top 10 says about where the category is heading, and what NOT to chase

The output is an iteration plan with three concrete ships and a 30/60/90-day re-check date, not an 11-section market research report.

### Onboarding flow updates

`/money` Step 1.5 now asks for the business type and live URL during onboarding. New "I have a working product" situation routes directly to `/money-strategy iterate`. `/money-discover` detects post-PMF status and routes to iterate rather than running fresh discovery — protects against the common "opening discovery out of habit when the question is actually iteration" pattern in multi-product operators.

---

## v2.4.0 — 2026-05-10

**The "ship without nuking production" release.** Nine improvements folded into existing skills — no new commands to remember, no skill-count explosion.

### 1. Operating modes + edit perimeter + panic stop (in `/money-ops`)

Autonomy without guardrails is how solo founders break production at 2am. The ops layer now declares an **operating mode** — `open` / `staging` / `production` — and every destructive command (rm -rf, force push, DROP TABLE, kubectl delete, bulk Stripe operations) requires a confirmation in the higher modes. Add an **edit perimeter** to lock a debugging session to one subtree, and call `/money-ops stop` to halt every scheduled agent and outreach loop instantly.

```
mode: production
→ rm -rf production_users requires typing "yes-delete-production_users"
→ npm publish requires explicit version confirmation
→ Outreach batches > 10 recipients require explicit batch approval
```

### 2. Narrowest-bet pressure test (in `/money-discover`)

The 6 forcing questions surface the smallest version someone would pay for. v2.4 adds a **Phase 4.5 pressure test** that forces the wedge to be **demonstrable tomorrow** — not "in 2-3 weeks of prep". Output is a one-line falsifiable bet: "By {date}, I will put {artifact} in front of {named buyer} to test {specific price} for {one thing it does}. If no signal by {date+7}, the wedge is wrong."

This is the #1 reason solo founders end up at week 4 of "almost ready to show someone".

### 3. Term-by-term audit + fuzzy-to-measurable (in `/money-strategy`)

Layer 1 of the premise audit now runs a loop: spot every load-bearing fuzzy word in the pitch, probe it ("how would a stranger measure this?"), and convert it to a measurable substitute. Every goal becomes `<verb> <metric> <threshold> <by date>` before strategy starts.

If the user can't convert their goals to measurable form, the strategy refuses to proceed and routes back to `/money-discover` Phase 4.5 first. No more strategizing on top of vague terms.

### 4. Hook + title pattern library + Release-notes mode (in `/money-content`)

Stage 4.8 adds a **pattern library** — 12 hook patterns and 15 title patterns indexed by reader state (scrolling / searching / decision-making) plus platform-specific patterns for XHS and WeChat. A title must satisfy BOTH a library pattern AND 2+ mechanisms from the existing impact matrix before shipping.

Plus a new **Release-notes mode**: when `/money-product` ships a version, this mode generates three-tier release notes (one-line ship tweet, product email, full CHANGELOG entry + blog post). Release-note emails have the highest conversion rate of any content type — skipping them leaves free→paid upgrades on the table.

### 5. Design system contract + ship lifecycle (in `/money-product`)

A new **Phase 0** writes `DESIGN.md` to the project root before any UI code — aesthetic stance, type/color/spacing tokens, motion rules, AND the rejection list (what the system explicitly does NOT do). Solves the "portfolio of 4 products that all look unrelated" problem.

A new **Phase 5.5 ship lifecycle** turns deployment into a 5-step protocol: VERSION bump (semver) → CHANGELOG entry → pre-deploy verification → deploy + tag → release-notes delivery. Skipping a step is what causes "production incidents" — every step has a refuse-if-missing gate.

### 6. STRIDE threat model + Tech-triage mode (in `/money-quality`)

The security audit now runs BOTH OWASP Top 10 AND a STRIDE pass (spoofing / tampering / repudiation / information disclosure / DoS / elevation-of-privilege) — catches the architectural assumptions that OWASP misses. 3+ STRIDE threats at P0/P1 means NOT ready to charge real money, regardless of OWASP score.

New **Tech-triage mode** for when something is technically broken — failing test, slow query, mystery 500. A 5-step loop (restate → boundary → reproduce → hypothesize-then-test → fix + regression test + `/money-learn` row). Refuses to start guessing or grep before the symptom is restated precisely.

### 7. Custom reviewer personas + architecture lens (in `/money-panel` + `/money-review-operator`)

`/money-panel --add "Enterprise IT buyer: needs SOC2 before signing"` inserts a domain-expert reviewer into the gauntlet. Useful when the four built-in lenses (investor / customer / operator / skeptic) don't capture the specific reviewer your plan needs to survive — enterprise procurement, privacy lawyer, open-source maintainer, regulated-industry compliance.

`/money-review-operator` gets a Q5: **Architecture & data-flow stress test** — five failure modes a solo operator can't escape from (hidden ops cost, data shape lock-in, single point of failure, cost-curve mismatch, debug accessibility). 2+ red flags here flips the verdict to NEEDS HIRE regardless of the other questions.

### 8. Portfolio learnings — cross-project knowledge (in `/money-learn`)

Learnings used to be project-local. v2.4 adds a **portfolio layer** at `~/.smtm/portfolio/learnings.jsonl` that auto-loads into EVERY money-* skill in EVERY project. Run `/money-learn promote <L-id>` to lift a validated, replicated, domain-general pattern from one project to the portfolio. Demote if it turns out to be context-specific.

A solo operator running 6 products discovers patterns that apply to all of them ("Stripe webhook idempotency keys must be checked even when the API call is idempotent"). Those don't belong locked to one product — they belong in the operator's portfolio brain.

### 9. Auto-update command (in `/money-upgrade`)

`/money-upgrade` is now a true auto-updater. One command:
- Checks npm for the latest version
- Shows the delta + headline changes
- Downloads + replaces installed skills
- Reads the CHANGELOG and surfaces what's new
- Prompts to restart Claude Code

No more "version compare by hand" or "did I run install or update". One command, idempotent.

---

## v2.3.1 — 2026-05-03

**Polish patch following the v2.3.0 atom launch.** Five things landed:

1. **Atom corpus grew 258 → 276** — re-ran the distill with a longer per-tweet timeout and recovered 18 of the 26 tweets that errored on the first pass (mostly long Chinese threads that needed more inference time).
2. **Per-skill atom-loading callouts** — every non-router skill now has a Standard-startup callout at the top, declaring which atom slice it loads and reminding the agent to cite by `A-{id}` when an atom directly informs a recommendation. Previously the doctrine lived only in `skills/money/SKILL.md` and downstream skills inherited it implicitly; now it's self-documenting per file.
3. **Workflow step ordering** — `Extract release notes` now runs **before** `Publish to npm` in the auto-publish workflow. Before this fix, a notes-extraction failure left a published-but-unreleased orphan version on npm (which is exactly what happened on the v2.3.0 ship). Notes-failure now leaves a clean rollback path.
4. **Chinese README at full v2.3 parity** — `README.zh-CN.md` was a v1.x-era page (14 skills, no banner, no founder narrative). Rewritten to match the English version line-for-line, including the v2.1/2.2/2.3 release notes and the founder receipts.
5. **`printf -- '...'` end-of-options fix** — already shipped in 2.3.0 but worth restating: the auto-publish workflow's `printf '----...'` separator hit bash's option-parsing on its first real run, exiting before npm publish. Now bullet-proof.

No new skills, no new atoms in the corpus from sources other than #1. Library health-check only.

---

## v2.3.0 — 2026-05-03

**The founder knowledge base ships with the suite.** Every money-* skill now auto-loads atomic principles distilled from years of solo-SaaS operating notes — battle-tested judgement embedded directly in your AI agent's working context.

### What changed

```
skills/money/knowledge/atoms/
  atoms.jsonl                              ← full corpus
  atoms_solopreneur_psychology.jsonl       ← character, action threshold, focus
  atoms_market_observation.jsonl           ← shifts, channels, trajectories
  atoms_agent_infra.jsonl                  ← AI agents, skill design, automation
  atoms_growth_tactics.jsonl               ← outreach, ads ROI, pricing, conversion
  atoms_content_meta.jsonl                 ← strategy, AI-content traps, positioning
```

Each atom is one declarative principle: a market observation, an anti-mainstream take, a hard-won tactic. Distilled from a multi-year archive of working notes — not opinion blog posts.

### Why this matters

Skills used to re-derive the same conclusions every conversation. Now `/money-discover` starts already knowing which market shapes are traps for solo founders. `/money-content` starts already knowing which AI-content patterns kill positioning. `/money-diagnose` cites specific atoms when the user's failure mode matches a known one — and you can trace any recommendation back to its source.

When an atom directly informs a recommendation, the skill cites it by ID:

> "Picking a $29/mo consumer wedge here would hit trap **A-bce2** — agent infra is shifting consumer apps toward UI-less API plays within 12 months."

Click through the source link and you see the original observation, dated, with the original context.

### Two layers of memory now

- **Atoms** (this release) — global, founder-maintained, ship with the package, read-only at runtime. Encode general principles.
- **Learnings** (v2.2) — project-local, auto-captured per-slug, mutable. Encode this-project-specific patterns.

Together: every skill run starts with both general operating wisdom **and** what we learned about this specific business.

### Maintainer-only: incremental distillation

The pipeline that produces atoms (`scripts/x-distill.mjs`, gitignored) is incremental — only new content gets distilled on subsequent runs, so the corpus grows organically without re-processing the archive.

---

## v2.2.0 — 2026-04 (initial release pre-2.3)

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

## v2.1.0

**Cross-session state management.** Three skills — `/money-save`, `/money-restore`, `/money-report` — turn every conversation into a checkpoint. Last week's pricing decision, the pivots you ruled out, the hypotheses you're testing — all persist across Claude Code sessions.

```
session 1  →  /money-discover  →  /money-save     ✅ wedge locked
   …a week passes…
session 2  →  /money-restore   →  picks up here   📦 no re-explanation
           →  /money-strategy  →  /money-save     ✅ pricing locked
   …a month passes…
session N  →  /money-report                        📄 full deliverable
```
