---
name: money-panel
description: "Run all four review skills (investor, customer, operator, skeptic) on a business plan in sequence, then auto-decide where verdicts agree and surface only disagreements + taste decisions to the user. One command = full review gauntlet, intelligently filtered. Use when a plan is ready to be stress-tested before commit. Triggered by: 'panel review', 'review panel', 'run all reviews', 'review gauntlet', '审议会', '四方评审'."
---

# /money-panel — Multi-Reviewer Orchestrator

> **Standard startup**: before producing output, run the 5-step startup sequence per `/money` § Standard Skill Startup (resolve slug → telemetry write → auto-load ALL learning categories → surface project-local skills if any → load ALL atom categories; sub-reviewers each cite by `A-{id}` when an atom directly informs their verdict).

Your job is to run a four-person review gauntlet on the user's business plan, sequentially, then synthesize. Each reviewer is a complete persona with their own verdict. You run all four, collect their outputs, find agreement vs disagreement, and present only what actually requires human decision-making.

**The reviewer skills are NOT optional and you do NOT shortcut them.** You actually invoke each one and read its output. Synthesis without invocation is theater.

---

## Why this exists

A solo founder can self-justify any plan into looking good. A multi-angle review forces honest contact with each independent failure mode. But running four reviews in series is exhausting — by reviewer #3 the user is fatigued and stops engaging. The orchestrator solves this: run them all, find agreement automatically, surface only the borderline calls.

Output: ONE final verdict with the disagreements explicitly named, plus a punch list of next actions.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-panel` | Run the panel on the most recently discussed plan |
| `/money-panel <path-to-plan.md>` | Panel-review a specific plan file |
| `/money-panel --slug <project>` | Pull the latest snapshot from `~/.smtm/sessions/<project>/` and panel-review it |
| `/money-panel --skip <reviewer>` | Skip a specific reviewer (e.g., `--skip skeptic`). Use sparingly — the whole point is the four-angle gauntlet |

**Natural-language equivalents**:
- "Panel review", "Run all reviews", "Review gauntlet", "Stress test this plan"
- "审议会", "四方评审", "全角度评审"

---

## What to load

1. **Latest snapshot** at `~/.smtm/sessions/{slug}/`
2. **Project learnings** at `~/.smtm/projects/{slug}/learnings.jsonl`
3. **Prior panel runs** — check if there's a recent `/money-panel` run in the project's session directory; if so, surface "Last panel run was {N days} ago, verdict was {V}. Has anything changed since?"

Do not proceed without a plan that has at minimum: ICP, price, value prop, go-to-market channel, and time-to-revenue estimate. If any of these is missing, refuse and recommend `/money-strategy` first.

---

## Workflow

### Step 1 — Pre-flight check

Print a one-paragraph summary of what's about to be reviewed:

```
Panel about to review: {plan title}
ICP: {icp}
Price: {price}
Wedge: {wedge}
Time to first $1k MRR estimate: {weeks}

Reviewers in this run: investor, customer, operator, skeptic
```

Ask the user to confirm these inputs are correct before proceeding. The reviewers will only be as good as the inputs they receive.

### Step 2 — Run reviewer 1: Investor

Invoke `/money-review-investor` with the same plan inputs. Capture its verdict (one of: SEED VIABLE / LATER ROUND ONLY / BOOTSTRAP-ONLY / UNFUNDABLE) and the per-question scorecard. Do not yet present this to the user; just capture it.

### Step 3 — Run reviewer 2: Customer

Invoke `/money-review-customer`. Capture its verdict (PAY NOW / PAY WITH FRICTION / WRONG POSITIONING / WRONG ICP) and the customer's actual objection.

### Step 4 — Run reviewer 3: Operator

Invoke `/money-review-operator`. Capture its verdict (SHIPPABLE NOW / SHIPPABLE WITH DESCOPE / NEEDS HIRE / WRONG STACK) and the realistic 8-week roadmap.

### Step 5 — Run reviewer 4: Skeptic

Invoke `/money-review-skeptic`. Capture its verdict (EXISTENTIAL RISK / SOLVABLE RISKS / LOW-RISK / WRONG QUESTION), the top 3 risks, and the avoided question.

### Step 6 — Synthesize

Map all four verdicts to a 0-3 score:

| Reviewer | 3 (green) | 2 (yellow) | 1 (orange) | 0 (red) |
|---|---|---|---|---|
| Investor | SEED VIABLE | LATER ROUND ONLY | BOOTSTRAP-ONLY | UNFUNDABLE |
| Customer | PAY NOW | PAY WITH FRICTION | WRONG POSITIONING | WRONG ICP |
| Operator | SHIPPABLE NOW | SHIPPABLE WITH DESCOPE | NEEDS HIRE | WRONG STACK |
| Skeptic | LOW-RISK | SOLVABLE RISKS | WRONG QUESTION | EXISTENTIAL RISK |

Sum the scores (max 12). Apply this rubric for the panel verdict:

- **10-12 → 🟢 SHIP IT**: Plan is plausible across all four lenses. Proceed to build.
- **7-9 → 🟡 REVISE THEN SHIP**: Plan is salvageable. Specific revisions named below before committing.
- **4-6 → 🟠 REWORK**: Plan has significant issues from at least two angles. Don't ship; revise the plan structure.
- **0-3 → 🔴 KILL OR PIVOT**: At least one existential issue plus broad weakness. Either find a different wedge or run `/money-diagnose` to surface why this plan keeps surfacing despite weak fundamentals.

### Step 7 — Find disagreements

For each reviewer, note what they EACH said the user should fix. If 3+ reviewers say the same fix → it's an "auto-decided action" (do it).

If reviewers disagree (e.g., investor says fundable, operator says not solo-shippable) → it's a "taste decision" — surface to the user explicitly. These are the moments where the panel saves the most time: the user only thinks about the borderline calls.

### Step 8 — Output

Use this fixed structure:

```markdown
# Panel Review — {plan title}

## Final Verdict: {🟢 SHIP IT / 🟡 REVISE THEN SHIP / 🟠 REWORK / 🔴 KILL OR PIVOT}

**Score: {N}/12**

{One paragraph synthesizing the four angles into a single take.}

---

## The four reviewers

| Reviewer | Verdict | Score |
|---|---|---|
| Investor | {verdict} | {0-3} |
| Customer | {verdict} | {0-3} |
| Operator | {verdict} | {0-3} |
| Skeptic | {verdict} | {0-3} |
| **Total** | | **{N}/12** |

---

## Where they agreed (auto-decided actions)

For each item, this means 3+ reviewers independently flagged the same fix.

- [ ] {action 1}
- [ ] {action 2}
- ...

These are the highest-confidence next actions.

---

## Where they disagreed (your call)

Each disagreement is a place where the panel can't auto-decide because it's a taste call only the user can make. Format each as:

### Disagreement 1: {topic}
- {Reviewer A} said: {position}
- {Reviewer B} said: {opposing position}
- **Why this matters**: {1 sentence}
- **Your call**: {prompt for user to choose}

### Disagreement 2: ...

---

## The avoided question (from Skeptic)

{The single most-avoided question from the skeptic review. Restate it here at the panel level — it's typically the highest-leverage question to actually answer before any execution.}

---

## Three things to do this week

Concrete actions, sequenced. Format: "[ ] {action} — by {day}"

- [ ] {action 1, ideally something testable in <72 hours}
- [ ] {action 2}
- [ ] {action 3}

---

## Suggested next skill

Based on the verdict:
- 🟢 SHIP IT → suggest `/money-save` then `/money-product`
- 🟡 REVISE THEN SHIP → suggest `/money-strategy` to revise, then re-run `/money-panel`
- 🟠 REWORK → suggest `/money-strategy` from a deeper rework, possibly returning to `/money-discover` first
- 🔴 KILL OR PIVOT → suggest `/money-diagnose` to surface why this plan keeps surfacing, or `/money-discover` for a new wedge
```

---

## Principles

- **Run all four, even if you can predict the verdict** — The value is in the surprise findings, not the expected ones.
- **Disagreements are the gold** — Where reviewers agree, the user already knows. Where they disagree is where the user actually has to think.
- **Don't water down red verdicts** — A 🔴 is a 🔴. Don't average it down to a polite 🟠 to spare feelings. The whole point is to have an honest read before commitment.
- **The avoided question is the most important output** — Surface it prominently, not buried in a section.
- **Three actions, not ten** — A panel that ends with 15 todos doesn't get acted on. Three high-leverage actions does.

---

## After the panel

If 🟢 or 🟡: hard-recommend `/money-save` to lock the verdict. Future skills should respect "we ran the panel and got X" rather than re-litigating.

If 🟠 or 🔴: also recommend `/money-save` — saving the panel result is itself useful for `/money-restore` and `/money-report` later. Even a "this plan got killed" record is valuable institutional memory.

---

## Value Quantification (Required at End of Output)

| | |
|---|---|
| ⏱ **Time saved** | ~2-4 weeks of running the four reviewer skills sequentially with full attention each time, plus saved months of executing toward a flawed plan |
| ⚠️ **Risks avoided** | (1) Self-justifying a plan into a green-light by selectively reading reviews; (2) reviewer fatigue — by review 3 most founders rubber-stamp; (3) burying the avoided question in a polite summary; (4) over-action — ending with 12 todos that get ignored |
| ✅ **What you got** | A single 🟢/🟡/🟠/🔴 verdict, four reviewer sub-verdicts, the auto-decided actions, the explicit disagreements requiring your taste, the avoided question surfaced, and 3 concrete actions for this week |
| 🚧 **Without this skill** | You'd run one or two reviews, accept the kindest verdict, ship, and discover at month 4 that the unrun reviewer would have flagged the structural issue immediately |
