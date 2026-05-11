---
name: money-learn
description: "Manage project learnings — small, atomic, validated patterns that the agent should remember across all skills and sessions. Different from /money-save (which captures full session state); learnings are individual insights that get auto-loaded into every other money-* skill's context. Use when the user has just discovered something worth remembering — a customer pattern, a pricing insight, a channel that works, a failure mode. Triggered by: 'remember this', 'log a learning', 'this is a pattern', 'show learnings', 'what have we learned', '记住这个', '存入经验', '查看经验库'."
---

# /money-learn — Project Learnings Manager

Your job is to maintain a project's `learnings.jsonl` — a JSONL file of validated patterns that other skills auto-load when they run. Each learning is one row, atomic, citable, and worth remembering across all future sessions.

**Learnings are NOT snapshots.** A snapshot captures full session state. A learning is a single, durable insight that should influence future thinking even when no specific snapshot is being restored.

---

## Why this exists separately from /money-save

| | `/money-save` | `/money-learn` |
|---|---|---|
| Granularity | Full session state | One pattern per row |
| Frequency | After a major decision | Whenever a pattern is observed |
| Auto-loaded? | Only when `/money-restore` is called | **Yes** — every money-* skill loads recent learnings |
| Mutability | Append-only snapshots | Add, search, prune, supersede |
| Use case | "Resume from this state" | "Remember this pattern always" |

A founder discovers things like:
- "Cold email open rates are 4x higher when the subject is a specific revenue number, not a benefit promise."
- "Our ICP doesn't read X/Twitter — they live in Reddit r/SaaS."
- "Pricing at $39 converts 30% better than $29 even though it's higher."
- "Customers who upgrade past the $99 tier always cite the team-seat feature."

These are atomic patterns. Each gets one row in `learnings.jsonl`. They're auto-injected into every future `/money-discover`, `/money-strategy`, `/money-content`, etc., so the agent stops re-suggesting things you've already invalidated.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-learn` | Show recent 5 learnings for current project |
| `/money-learn add` | Interactive: extract a learning from current conversation |
| `/money-learn add "<one-line pattern>"` | Add a learning with explicit text |
| `/money-learn search <query>` | Search learnings by keyword/topic |
| `/money-learn list` | List all learnings for current project |
| `/money-learn list <project>` | List learnings for another project |
| `/money-learn prune` | Interactive: review old/contradicted learnings, mark as superseded or remove |
| `/money-learn export` | Output all learnings as a markdown table |
| `/money-learn promote <L-id>` | Promote a project-local learning to the portfolio layer (see below) |
| `/money-learn portfolio` | Show portfolio-wide learnings shared across every project |
| `/money-learn portfolio search <query>` | Search portfolio-wide learnings |
| `/money-learn portfolio demote <L-id>` | Move a portfolio learning back to a single project (if it turned out to be context-specific) |

**Natural-language equivalents**:
- "Remember this", "Log this learning", "This is a pattern worth keeping"
- "What have we learned", "Show learnings", "Show me the learnings"
- "记住这个", "存入经验", "这是一个模式", "查看经验库"

---

## Schema

Each line in `~/.smtm/projects/{slug}/learnings.jsonl` is one JSON object with this fixed schema:

```json
{
  "id": "L-{4 hex chars}",
  "captured_at": "ISO 8601 with timezone",
  "from_skill": "name of the skill that generated this learning, or 'manual'",
  "category": "one of: pricing | channel | icp | positioning | conversion | retention | ops | tech | competition | personal",
  "pattern": "One sentence stating the pattern. Imperative or declarative; no hedging.",
  "evidence": "Concrete evidence supporting the pattern. Specific numbers, dates, quotes preferred.",
  "confidence": "validated | emerging | hypothesis",
  "supersedes": "id of an older learning this replaces (or null)",
  "tags": ["arbitrary", "free-form", "tags"]
}
```

### Confidence levels

- **validated** — At least 2 independent observations or 1 quantitative result with N>30. Acts on this freely.
- **emerging** — One strong observation, not yet replicated. Other skills consider it but don't lock in.
- **hypothesis** — Pattern noticed once, untested. Surfaced for awareness only.

### Categories (closed list)

`pricing`, `channel`, `icp`, `positioning`, `conversion`, `retention`, `ops`, `tech`, `competition`, `personal`

If a learning doesn't fit any category, force a fit — usually it's `personal` (about the founder) or `ops`. Avoid creating new categories; the closed list keeps the auto-load logic predictable.

---

## Workflow

### `/money-learn add` (interactive mode)

Walk through a 5-step extraction:

1. **What pattern?** — One sentence. If the user gives a paragraph, paraphrase to one declarative sentence.
2. **What's the evidence?** — Specific. "5 customers said X" not "customers say X". If evidence is vague, reduce confidence to `hypothesis`.
3. **What category?** — Pick from the closed list.
4. **Confidence?** — Default to `emerging` unless evidence is N≥30 or 2+ independent observations.
5. **Does this supersede an older learning?** — Search for similar patterns, ask the user.

Then write the JSON line to disk and confirm. Print the row that was added.

### Auto-extraction from conversation

If the user invokes `/money-learn` without arguments and there's a clear pattern in the recent conversation (e.g., they just said "wow, the $39 price converts way better than $29"), auto-propose the extraction:

> I noticed a pattern in this conversation. Want to log:
> - Pattern: "Pricing at $39 converts 30% better than $29 in our ICP"
> - Evidence: "{quoted observation from conversation}"
> - Category: pricing
> - Confidence: emerging (one A/B observation; would be `validated` after replication)
>
> Save? [y/n/edit]

### `/money-learn search <query>`

Grep the JSONL for pattern + tags + evidence containing the query (case-insensitive). Return up to 10 matches sorted by:
1. Confidence (validated > emerging > hypothesis)
2. Recency (newer first)

### `/money-learn prune` (interactive)

For each learning older than 90 days OR marked `hypothesis`:
- Show the learning
- Ask: still valid? superseded by something newer? delete entirely?

This is how the library stays signal-dense.

---

## Portfolio learnings (cross-project sharing)

A solo operator running multiple products discovers patterns that apply across all of them — not just to one. Examples:

- "$39 converts better than $29" probably only applies to one product's ICP. **Project-local.**
- "Cold email subject lines that name a specific revenue number outperform benefit-based subjects 4:1" applies to every cold-outreach campaign. **Portfolio-wide.**
- "Stripe webhook idempotency keys MUST be checked even when the underlying API call is idempotent" applies to every Stripe integration. **Portfolio-wide.**

The portfolio layer captures the second kind. Stored at `~/.smtm/portfolio/learnings.jsonl` (the same schema as project-local), it auto-loads into EVERY money-* skill in EVERY project, before the project-local learnings are loaded.

### Promotion criteria

A project-local learning should be promoted to the portfolio when ALL of:

1. **Validated** confidence — emerging or hypothesis don't qualify
2. **Replicated** — observed in at least 2 different projects (or the founder believes it would apply to any future project of the same shape)
3. **Domain-general** — describes a tactic, channel, tool behavior, or operator pattern; NOT a specific ICP, price point, or product-specific finding

Run `/money-learn promote <L-id>` to move a project learning to the portfolio. The skill confirms by re-reading the learning aloud, asks if it really generalizes, and writes to the portfolio file. The original project learning stays in place with a `promoted_to_portfolio: true` flag — so a future audit can trace where it originated.

### Load order

When a money-* skill starts up, learnings are merged in this order (later sources override earlier ones for the same pattern):

1. Atom corpus (read-only, ships with the package)
2. Portfolio learnings (`~/.smtm/portfolio/learnings.jsonl`)
3. Project learnings (`~/.smtm/projects/{slug}/learnings.jsonl`)

A project-specific finding always trumps a portfolio finding for that project — but the portfolio pattern is loaded for context. The agent surfaces both, marking the source:

> 📚 Loaded 6 relevant patterns (4 portfolio, 2 project-local). Notably:
> - L-port-3a8f (portfolio, validated, channel): "Subject lines with specific revenue numbers outperform benefit-based 4:1 across cold-email campaigns"
> - L-a7k2 (project, validated, pricing): "$39 converts 30% better than $29 in our ICP"

### Demotion

If a learning turns out to be context-specific after all (e.g., the portfolio learning fails to replicate in a new project), demote it:

```
/money-learn portfolio demote L-port-3a8f --back-to <project-slug>
```

This moves the row back to a project-local file and removes it from portfolio auto-loading. The provenance is preserved — the row keeps a `was_portfolio: true` flag.

### When NOT to promote

Resist promoting learnings that feel general but aren't:

- Pricing observations: almost always ICP-specific
- "Channel X works" — works for what offer? Resist generalization
- Tool preferences: founder's taste, not portfolio truth
- One-off wins: a single replication does not equal portfolio-grade

Rule of thumb: if you're about to start a new product, would the learning legitimately apply on day 1? If yes → promote. If you'd want to re-validate first → leave project-local.

## Auto-loading into other skills

Every other `money-*` skill that does substantive work should load recent learnings before generating output. The standard pattern (added to those skills' preambles):

```markdown
## Auto-loaded learnings

Before producing output, read `~/.smtm/projects/{slug}/learnings.jsonl` and surface any
relevant rows by category. Match priority:
- For /money-discover: icp, positioning, channel, competition
- For /money-strategy: pricing, icp, channel, positioning, competition
- For /money-content: positioning, conversion, channel
- For /money-product: tech, ops, conversion
- For /money-diagnose: ALL categories (the diagnosis may surface anything)
- For /money-panel and the four reviewer skills: ALL categories
- For /money-ads: channel, conversion, pricing
- For /money-outreach: channel, icp, positioning, conversion

Filter to confidence ≥ emerging by default. Show the user which learnings influenced the output, so they can spot if any are stale.
```

The skills should not silently override learnings — they surface them in a small preamble:

> 📚 Loaded 4 relevant learnings from this project's history. Notably:
> - L-a7k2 (validated, pricing): $39 converts 30% better than $29 in our ICP
> - L-9b14 (emerging, channel): Reddit r/SaaS converts 3x better than X for cold outreach
>
> These will inform the analysis below.

---

## Output structures

### `/money-learn` (default — show recent)

```markdown
# Recent learnings — {project}

{N learnings shown of {total} total}

| ID | Captured | Confidence | Category | Pattern |
|---|---|---|---|---|
| L-a7k2 | 2026-04-22 | validated | pricing | $39 converts 30% better than $29 in our ICP |
| ... | | | | |

Use `/money-learn search <query>` to filter, `/money-learn add` to capture a new one, or `/money-learn prune` to clean up stale ones.
```

### `/money-learn add` (after capture)

```markdown
✅ Learning captured.

ID: L-{hex}
Pattern: {pattern}
Evidence: {evidence}
Category: {category}
Confidence: {confidence}
File: ~/.smtm/projects/{slug}/learnings.jsonl

This will now influence future runs of /money-discover, /money-strategy, /money-content, etc.
```

---

## Edge cases

- **Conflicting learnings** — Two patterns may directly contradict (e.g., "X channel works great" and "X channel is dead"). Don't auto-merge. Use `supersedes` field. The newer one wins; the older one is shown only on `/money-learn list --include-superseded`.
- **JSONL corruption** — One bad line shouldn't break the whole file. On read errors, log the bad line and continue.
- **No project slug** — If running outside a project directory, fall back to `default` project.
- **Empty file** — Show: "No learnings yet for `{project}`. Add the first one with `/money-learn add`."

---

## Principles

- **Atomic, not narrative** — Each learning is one row, one sentence. If it spans multiple paragraphs, it should be split.
- **Evidence over opinion** — Patterns without evidence are guesses, mark as `hypothesis`.
- **Closed category list** — Don't invent categories. Force-fit to the existing 10.
- **Supersede, don't overwrite** — Old learnings may be wrong now but the supersession itself is signal.
- **Library hygiene matters** — A 1,000-row learnings file with 30% noise is worse than a 200-row library with 95% signal.

---

## Value Quantification (Required at End of Output)

After `/money-learn add` (capturing one learning):

- 📝 **Captured** — 1 {category} learning at {confidence} confidence
- ⏱ **Saves you each future skill run** — ~30 seconds of re-explaining a pattern + permanent prevention of skill suggesting something you already ruled out
- ⚠️ **Risk avoided** — The agent has no memory across sessions without learnings — it will re-suggest the wrong pricing, wrong channel, wrong ICP unless told otherwise
- 🔁 **Auto-loaded by** — All major money-* skills on next invocation (filtered by relevant category)

After `/money-learn` (showing recent) or `/money-learn search` (querying):

- 📚 **Surfaced** — {N} matching learnings from {total} total
- ⏱ **Time saved** — ~5-15 minutes of digging through old conversation transcripts
- ✅ **What you got** — The exact validated patterns relevant to your current question, with evidence citations
