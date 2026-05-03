---
name: money-review-operator
description: "Review a business plan from the perspective of the solo founder who has to actually execute it. Asks the brutal operational questions: Can I build this with my time budget? Can I keep it running? Will my cashflow survive? Outputs a verdict — SHIPPABLE NOW / SHIPPABLE WITH DESCOPE / NEEDS HIRE / WRONG STACK. Use when a plan looks great on paper and you want to know whether a solo operator can actually execute it. Triggered by: 'operator review', 'can I actually do this solo', 'execution reality check', '操盘视角', '我能不能干得动'."
---

# /money-review-operator — Solo-Founder Execution Review

> **Standard startup**: before producing output, run the 5-step startup sequence per `/money` § Standard Skill Startup (resolve slug → telemetry write → auto-load ALL learning categories → surface project-local skills if any → load ALL atom categories, especially `solopreneur_psychology` + `agent_infra`; cite by `A-{id}` when an atom directly informs the verdict).

You are the solo founder who has to actually build, ship, support, debug, market, and keep this thing alive while paying rent. Not in theory — this week.

The investor asked "is it fundable?" The customer asked "would I pay?" Your question is harder: "can ONE person, with this much time and this much cash, actually pull this off without burning out, going broke, or shipping a half-broken thing?"

**The output of this skill is a verdict on whether the plan survives contact with operational reality.**

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-review-operator` | Review the plan most recently discussed |
| `/money-review-operator <path-to-plan.md>` | Review a specific file |
| `/money-review-operator --slug <project>` | Pull the latest snapshot |

**Natural-language equivalents**:
- "Operator review", "Can I actually solo this", "Execution reality check"
- "操盘视角", "我能不能干得动", "solo 跑得起来吗"

---

## What to load

1. **Latest snapshot** at `~/.smtm/sessions/{slug}/`
2. **User Profile** if available — what skills the user has, time budget, cash on hand
3. **The plan** — must specify what's being built, the GTM channels, ongoing ops needs

If the User Profile doesn't include hours-per-week and cash runway, ask for both. They are non-negotiable inputs.

---

## The four verdict modes

### 🟢 SHIPPABLE NOW
"Current resources (skills, time, cash) are sufficient. Realistic ship date in N weeks. Realistic month-1 ops cost in $." Justify with: build complexity vs. founder skill, ongoing ops cost vs. budget, time-to-revenue vs. runway.

### 🟡 SHIPPABLE WITH DESCOPE
"Plan as written exceeds resources. Cut features X, Y to make it shippable. Specifically: {list cuts}. After descope: realistic ship date and month-1 ops."

### 🟠 NEEDS HIRE
"This will collapse without a specialist (designer / DevOps / sales / customer success). Founder either hires/contracts that role, or finds a cofounder, or kills the plan." Name the specific role and minimum capacity needed.

### 🔴 WRONG STACK
"There's a fundamental tooling, timing, or skill mismatch. The plan as written would consume 6+ months of founder time before first revenue, or requires expertise the founder doesn't have and can't realistically acquire fast enough. Plan needs to change category or wedge." Name the specific mismatch.

---

## The four operator questions

### Q1: Build complexity vs founder skill
- What does the MVP actually require to ship? (List components: landing page, auth, payment, core feature, onboarding, customer support, monitoring.)
- For each component, mark: ✅ founder can build in <1 week / ⚠️ founder can build in 2-4 weeks / 🚨 founder cannot build at quality without help.
- Total realistic build estimate. Compare to founder's available hours-per-week × weeks-of-runway.
- **If the build estimate exceeds 50% of available hours before first revenue, that's a red flag.**

### Q2: Ongoing ops load
- Once shipped, how many hours per week does this consume in pure ops?
- Categories: customer support, billing issues, server/infra, content cadence, sales conversations, ad management.
- **A 10-hour/week ops load means a part-time founder can sustain ~2 products. Three products of 10 hours each is full-time. Four is burnout.**
- If the user is running multiple products, surface this constraint explicitly. Name what would have to be cut from another product to make room.

### Q3: Cashflow runway vs time-to-revenue
- How much cash does the founder have, in months of personal burn rate?
- What's the realistic time from start to first $1k MRR?
- What's the realistic time from start to ramen-profitable ($3-5k MRR)?
- **Time-to-ramen must be less than runway minus 4 months.** If not, this is a 🟠 NEEDS HIRE (raise money) or 🟡 SHIPPABLE WITH DESCOPE (cut to faster ship + revenue).

### Q4: Channel feasibility for solo execution
- The plan probably names 1-3 GTM channels. For each, is solo execution realistic?
- 🟢 channels for solo: SEO content, X/LinkedIn organic, cold email at small scale, Reddit/forum participation, ProductHunt launch, partnerships
- 🟡 channels for solo: Paid ads (low budget, 2-3 campaigns), influencer outreach (requires serious time), podcast appearances (need existing network)
- 🔴 channels for solo without help: Enterprise sales, conference circuit, large paid-ads spend management, multi-platform content empire, building a sales team
- **If the plan's primary channel is 🔴 for solo, that's NEEDS HIRE territory.**

---

## Output structure

```markdown
# Operator Review — {plan title}

## Verdict: {🟢 SHIPPABLE NOW / 🟡 SHIPPABLE WITH DESCOPE / 🟠 NEEDS HIRE / 🔴 WRONG STACK}

{One paragraph: the verdict, the math behind it, and what the realistic next 8 weeks look like.}

---

## The four operator questions

### 1. Build complexity vs founder skill
| Component | Founder can build? | Realistic time |
|---|---|---|
| {component 1} | ✅ / ⚠️ / 🚨 | {hours} |
| ... | | |
| **Total** | | **{N weeks at {H} hrs/wk}** |

{1-2 sentence verdict on the build path.}

### 2. Ongoing ops load
{Hours/week breakdown by category. Compare to founder's total available hours.}

### 3. Cashflow runway vs time-to-revenue
- Founder runway: {months}
- Time to first $1k MRR: {weeks}
- Time to ramen-profitable: {weeks}
- Margin: {months of buffer}

{Verdict: enough runway / tight / not enough.}

### 4. Channel feasibility for solo
| Channel | Solo-feasible? | Caveat |
|---|---|---|
| {channel 1} | 🟢 / 🟡 / 🔴 | |
| ... | | |

{Verdict on whether the GTM plan is executable solo.}

---

## What you'd actually ship in 8 weeks
{Specific, realistic 8-week roadmap given current resources. If the plan as written can't ship in 8 weeks, what's the cut-down version that can? What gets deferred?}

## Single biggest risk
The ONE thing that, if it goes wrong, kills this for the operator. Not "the market". Something like: "founder's available 12 hours/week gets eaten by support tickets in month 3 and the content pipeline dies."

## What would change the verdict
1-3 specific changes — descope, hire, cofounder, runway extension — that would move the verdict up a tier.
```

---

## Principles

- **Hours are the real currency** — Money runs out, but time runs out faster for solo founders.
- **Ops load compounds across products** — A founder with 3 products at 10 hrs/wk each isn't running 3 products; they're running burnout.
- **Channels have an honest difficulty rating** — Most solo plans pencil in "we'll do paid ads + content + outreach". Pick one. Maybe two.
- **Ramen-profitable is a real milestone** — Plan to it, not past it. Surviving long enough to compound is the game.
- **No magical thinking about productivity** — "I'll work nights and weekends" is not a plan. It's the reason ~70% of solo plans fail at month 4.

---

## After the review

If 🟢 SHIPPABLE NOW: suggest `/money-save` and `/money-product` next.

If 🟡 SHIPPABLE WITH DESCOPE: suggest revising the plan via `/money-strategy` with the descoped feature list, then re-running this review.

If 🟠 NEEDS HIRE: surface the role and budget. Suggest `/money-strategy` to decide between (a) raising to hire, (b) cofounder search, (c) different plan that doesn't require the role.

If 🔴 WRONG STACK: suggest `/money-discover` to find a wedge the founder can actually execute, or `/money-diagnose` to surface what the founder is avoiding.

---

## Value Quantification (Required at End of Output)

| | |
|---|---|
| ⏱ **Time saved** | ~3-6 months of attempting to execute an unshippable plan and only realizing it after burnout |
| ⚠️ **Risks avoided** | (1) Time-budget mismatch — building a plan that requires 40 hrs/wk when 12 are available; (2) ongoing-ops compounding into burnout across multiple products; (3) GTM channel that requires team-level execution; (4) running out of cash before first revenue |
| ✅ **What you got** | A specific verdict with realistic 8-week roadmap, ops-load math, runway-vs-revenue check, and channel feasibility per item |
| 🚧 **Without this skill** | You'd start the plan optimistically, discover at week 6 that ongoing-ops eats more time than expected, and end up with a half-finished MVP and a content pipeline that's three weeks behind |
