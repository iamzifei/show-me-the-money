---
name: money-retro
description: "Weekly business retrospective. Reads all snapshots, learnings, skill-usage telemetry, and (if provided) revenue data from the past week. Outputs: what got decided, what shipped, what's stalled, skill activity, suggested next focus. Surfaces unused skills as activation prompts. Use at end of week or end of sprint. Triggered by: 'weekly retro', 'business retro', 'what did we ship', 'how's the week going', '周复盘', '业务回顾', '本周复盘'."
---

# /money-retro — Weekly Business Retrospective

> **Standard startup**: before producing output, run the 4-step startup sequence per `/money` § Standard Skill Startup (resolve slug → telemetry write → /money-retro reads from telemetry rather than auto-loading learnings, since it's analyzing usage patterns themselves).

Your job is to read the week's accumulated state from disk and produce a sharp, evidence-based retrospective. This is not a pep talk. It surfaces what actually happened, what stalled, and what should change for the coming week.

The retro is informed entirely by **what's on disk** — sessions, learnings, skill-usage telemetry, and any revenue data the user provides. Do not improvise narrative beyond what the evidence supports.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-retro` | Retro for the past 7 days, current project |
| `/money-retro --days N` | Custom window (e.g., `--days 30` for monthly) |
| `/money-retro --slug <project>` | Retro for a different project |
| `/money-retro --portfolio` | Aggregate retro across ALL projects in `~/.smtm/sessions/` |

**Natural-language equivalents**:
- "Weekly retro", "Business retro", "What did we ship", "How's the week going"
- "周复盘", "业务回顾", "本周怎么样"

---

## What to load

For the time window (default 7 days, sliding from now):

1. **Snapshots** at `~/.smtm/sessions/{slug}/` — filter by filename timestamp ≥ window start
2. **Learnings added** at `~/.smtm/projects/{slug}/learnings.jsonl` — filter by `captured_at` ≥ window start
3. **Skill-usage telemetry** at `~/.smtm/analytics/skill-usage.jsonl` — filter by ts ≥ window start, group by skill
4. **Optional: revenue data** — if user provides numbers (e.g., "MRR went from $X to $Y"), incorporate. Otherwise omit revenue section.
5. **Prior retros** at `~/.smtm/projects/{slug}/retros/` — for trend comparison

If the window is empty (no snapshots, no learnings, no skill usage), say so plainly:

> No activity recorded in `{project}` for the past {N} days. Either you weren't running money-* skills with `~/.smtm/` enabled, or this project was dormant. Either is fine — but there's nothing to retro.

---

## Workflow

### Step 1 — Aggregate the week

For the time window, compute:

- **Snapshots in window**: count, with each snapshot's title and status
- **Decisions made**: pull from each snapshot's `Confirmed conclusions` section
- **Things ruled out**: pull from each snapshot's `Ruled out` section
- **Open hypotheses**: pull from each snapshot's `Open hypotheses` section
- **Stalled hypotheses**: open hypotheses from snapshots ≥14 days old without a follow-up snapshot
- **Learnings added**: count + categories
- **Skills used**: histogram, sorted by frequency

### Step 2 — Identify "stalled" items

A hypothesis is "stalled" if:
- It was opened in a snapshot ≥14 days ago
- No subsequent snapshot in the same project has either confirmed it or ruled it out
- No learning has been added that addresses it

These are the highest-value findings — usually founders forget about hypotheses they meant to test.

### Step 3 — Find unused skills

From `skill-usage.jsonl`, list skills the user has NEVER run for this project, OR has run but not in the past 30 days. These are activation candidates.

Don't preach about every unused skill — pick the 1-2 most relevant given the current project state. If they have a shipped product but never run `/money-ads`, that's a candidate. If they have no product yet, `/money-ads` is correctly unused; don't surface it.

### Step 4 — Output

```markdown
# Weekly Business Retro — {project}

**Window**: {start date} → {end date} ({N} days)
**Generated**: {now}

---

## What you decided this week

{For each snapshot's "Confirmed conclusions" — list with snapshot title and date.}

If no snapshots: "No new decisions checkpointed. Either nothing was decided, or `/money-save` wasn't run."

---

## What you ruled out

{Aggregated from snapshots' "Ruled out" sections, deduplicated.}

If empty: "Nothing was explicitly ruled out this week."

---

## Stalled hypotheses (action required)

These hypotheses were opened ≥14 days ago and never tested:

| Opened | Days stalled | Hypothesis | From |
|---|---|---|---|
| 2026-04-15 | 18 | Reddit r/SaaS will convert at >2% | snapshot:wedge-locked |
| ... | | | |

For each stalled item, suggest the cheapest test to resolve it.

If empty: "All open hypotheses are <14 days old. No stalls."

---

## Learnings captured

{Show recent learnings added in the window, with category and confidence.}

If empty: "No new learnings captured. If you observed any patterns this week, run `/money-learn add`."

---

## Skill activity

| Skill | Runs this week | Trend vs prior week |
|---|---|---|
| /money-discover | 3 | ↑ (was 1) |
| /money-content | 8 | → (was 7) |
| /money-ads | 0 | — (never run) |
| ... | | |

---

## Activation candidates (skills you haven't used)

Pick 1-2 high-relevance unused skills. Frame as a question:

> 💡 You've shipped the product and run `/money-content` 8 times — but never `/money-ads`. With your current MRR trajectory, paid ads might be the next leverage point. Want me to walk you through `/money-ads` next session?

---

## Revenue (only if user provided)

Show MRR/revenue if the user shared numbers. Otherwise omit.

---

## Recommended focus for next week

ONE thing. Not three. The single highest-leverage move based on what the retro surfaced.

Format: "**Focus**: {one sentence}. **First action**: {today or tomorrow specific step}."

---

## Snapshot of project state

| | |
|---|---|
| Total snapshots in project | {N} |
| Total learnings | {N} ({validated} validated, {emerging} emerging, {hypothesis} hypothesis) |
| Project age | {months since first snapshot} |
| Open hypotheses | {N} |
```

### Step 5 — Save the retro

Write the retro itself to `~/.smtm/projects/{slug}/retros/{YYYYMMDD-HHMMSS}-retro.md`. Each retro is a new file (never overwrite). This builds a longitudinal record of how the project is moving.

Confirm to the user:

> ✅ Retro saved to `~/.smtm/projects/{slug}/retros/{filename}.md`
> Compare to last week's retro: `~/.smtm/projects/{slug}/retros/{prior filename}.md`

---

## Portfolio mode (`--portfolio`)

If invoked with `--portfolio`, aggregate across ALL projects in `~/.smtm/sessions/`. Output is similar but adds a top-level "Project rollup" table:

| Project | Snapshots this week | New learnings | Stalled | Status (most recent snapshot) |
|---|---|---|---|---|
| musicapi | 3 | 2 | 0 | in-progress |
| kolfind | 0 | 0 | 4 | ⚠️ stalled |
| ccapi | 1 | 0 | 1 | in-progress |

The "stalled" surface here is especially valuable — solo founders often have one product that's silently dying while they pour attention into the noisier one.

---

## Principles

- **Evidence-only narrative** — If it's not in a snapshot, learning, or telemetry log, it's not in the retro. No improvised storytelling.
- **Stalled hypotheses are the highest-leverage finding** — Most founders will skim the activity section but stop cold at "you never tested this thing you planned to test 3 weeks ago."
- **One focus, not five** — Recommendations dilute as they multiply. Pick the single highest-leverage move.
- **Trend over snapshot** — Show comparison to prior weeks where possible. Trend reveals what point-in-time can hide.
- **Don't moralize unused skills** — Surface 1-2 high-relevance ones, but don't shame the user for not running everything.

---

## After the retro

Always recommend one of:
- `/money-learn add` if the retro surfaced an obvious pattern that wasn't yet logged
- `/money-save` after acting on the recommended focus
- `/money-panel` if multiple stalled hypotheses suggest the plan itself needs re-review
- `/money-diagnose` if stalled items are stalled because of an execution blocker, not lack of time

---

## Value Quantification (Required at End of Output)

| | |
|---|---|
| ⏱ **Time saved** | ~1-2 hours of digging through old chats, snapshots, and trying to remember what you decided |
| ⚠️ **Risks avoided** | (1) Stalled hypotheses going untested for months; (2) running the same activity (e.g., `/money-content` 12x) without checking ROI; (3) ignoring a quietly-dying side project while focusing on the noisy one; (4) repeating the same week-over-week without intentional course correction |
| ✅ **What you got** | Decisions / ruled-out / stalled / learnings / skill activity, plus ONE recommended focus and a portfolio rollup if multi-project |
| 🚧 **Without this skill** | You'd reach the end of the quarter unable to articulate what changed, and at least one hypothesis would have silently aged out without ever being tested |
