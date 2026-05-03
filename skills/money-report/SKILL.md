---
name: money-report
description: "Generate a deliverable markdown report by merging all /money-save snapshots for a project. Produces a shareable, dated document at ~/.smtm/reports/{project}/. Useful for sharing progress with co-founders, advisors, investors, or for personal review weeks/months later. Use when the user wants to package up accumulated state into a readable artifact. Triggered by: 'package this up', 'make me a report', 'export for partner', 'give me the deliverable', '出报告', '打包', '整理一份', '给合伙人看的'."
---

# /money-report — Deliverable Business Report

Your job is to merge all `/money-save` snapshots from a project's session directory into one coherent, shareable markdown report.

**The report is not your synthesis from conversation memory.** You only read the snapshot files in `~/.smtm/sessions/{project}/` and combine them by date, deduplicating where conclusions repeat or got revised. This is the report's credibility — it's a curated record of the user's confirmed state, not AI-generated narrative.

---

## Why this exists

Snapshots solve the cross-session memory problem, but they're scattered across many files. When the user wants to:
- Send their commercial partner the current state of a business
- Review with an advisor what's been validated and what's been ruled out
- Look back in 6 months at how their thinking evolved
- Hand off context to a contractor or co-founder

…they need one file, not a folder of timestamped fragments. That's the report.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-report` | Merge all snapshots in the current project into a report |
| `/money-report --since YYYY-MM-DD` | Only include snapshots newer than the given date |
| `/money-report --slug <project>` | Specify a non-default project |
| `/money-report --slug <project> --since YYYY-MM-DD` | Combined |

**Natural-language equivalents** (any of these → run `/money-report`):
- English: "package this up", "make me a report", "export for my partner", "give me the deliverable", "summarize the journey"
- 中文: "出报告", "打包", "整理一份", "给合伙人看的", "做个总结发出去"

---

## Workflow

### Step 1 — Verify there's enough material

Find all `*.md` files in `~/.smtm/sessions/{project}/`.

| Snapshot count | Behavior |
|---|---|
| 0 | "No snapshots saved for `{project}`. Run `/money-save` after a few diagnostic conversations, then come back." |
| 1 | "Only 1 snapshot for `{project}`. A single snapshot doesn't need a merge — read it directly at `~/.smtm/sessions/{project}/{filename}.md`. Force a report anyway?" — wait for user confirmation. |
| ≥2 | Proceed |

If `--since` is set, filter first. If the filtered set has <2 files, apply the same rule.

### Step 2 — Load and sort

Read every snapshot, parse YAML frontmatter and the 6 body sections.

Sort by filename `YYYYMMDD-HHMMSS` prefix, oldest → newest. **Do not trust file mtime.**

If any single file is malformed, log a warning and skip it — don't abort the whole report.

### Step 3 — Build the output path

```
~/.smtm/reports/{project}/{YYYYMMDD-HHMMSS}-{project}.md
```

`mkdir -p` first. **Each report is a new file** — never overwrite a prior report. The timestamp in the filename lets the user diff or review historical reports.

### Step 4 — Compose the report

Use this fixed structure. The fields you generate (titles, summaries, evolution-narrative paragraphs) should be drawn directly from the snapshots, not invented.

```markdown
# {project} — Business Report

**Generated**: {now, formatted as 2026-05-03 14:23 local time}
**Snapshots merged**: {N} (from {oldest snapshot date} to {newest snapshot date})
**Skills active**: {dedup union of all source_skill values}

---

## 1. How the focus has evolved

List each snapshot in chronological order, one line each:

- `2026-04-15` · {one-line restatement of the snapshot's "Business state"} · from {source_skill}
- `2026-04-22` · {one-line restatement} · from {source_skill}
- ...

After the list, write **one paragraph** describing how the focus shifted — e.g., "From validating the API tier pricing in mid-April, the focus moved to ruling out the enterprise pivot in late April, and by early May had shifted to MVP scope freezing for the launch window."

This single paragraph is the *only* place in the report where you synthesize. Do not editorialize, infer, or extrapolate beyond what the snapshots show.

---

## 2. Confirmed conclusions

Merge every "Confirmed conclusions" entry across all snapshots. Deduplicate by semantic similarity. Sort newest first.

Format:

- {conclusion} · from `{snapshot title}` · {snapshot date}

If a conclusion in an *earlier* snapshot was contradicted or revised by a *later* one:
- List the newer version first
- List the older version second with `(superseded by {newer snapshot title} on {date})` appended

Example:

- **Pricing locked at $29 / month per seat** · from `pricing locked at $29` · 2026-05-01
- **Pricing should be $19 / month per seat** · from `early pricing thinking` · 2026-04-12 *(superseded by `pricing locked at $29` on 2026-05-01)*

---

## 3. Ruled out

Merge every "Ruled out" entry across all snapshots. Deduplicate.

- {direction} · from `{snapshot title}` · {snapshot date}

This list is sticky — if it was ruled out, it stays ruled out unless a later snapshot explicitly revives it. If a later snapshot revives a prior ruled-out direction, both entries stay, with a `(reopened on {date})` annotation on the original.

---

## 4. Open hypotheses

Merge "Open hypotheses" entries. **Skip any hypothesis that was later confirmed or ruled out** — those moved to sections 2 or 3.

- {hypothesis} · {test plan if present} · from `{snapshot title}`

Only show hypotheses that are still genuinely open in the most recent snapshot.

---

## 5. The current next move

Pull the "Next move" section verbatim from the **most recent snapshot only**. Older next-moves are obsolete by definition.

Append the recommended next skill: `Recommended next skill: {next_skill from the most recent snapshot}`.

---

## 6. Appendix — Source snapshots

For traceability, list every snapshot file merged:

- `{filename}` — `{title}` — {timestamp} — {status}
- ...

---

*Report generated by `/money-report` from `~/.smtm/sessions/{project}/`. To regenerate after new snapshots, run `/money-report` again.*
```

### Step 5 — Confirm to the user

```
✅ Report generated.
File: ~/.smtm/reports/{project}/{filename}.md
Snapshots merged: {N}
```

---

## Edge cases

- **Snapshot referencing a custom field not in the schema** → ignore the field, use the standard ones. Do not error.
- **Conflicting timestamps** (two snapshots claim same second) → keep both, sort by full filename.
- **A snapshot's frontmatter `status` is `abandoned`** → still include in the report, but flag the snapshot's contribution with `(abandoned)` next to its title in section 1.
- **User wants to share externally and a snapshot contains sensitive info** (revenue numbers, customer names) → not your concern. The snapshots are the user's authored content. Don't auto-redact.

---

## Principles

- **Curated, not generated** — Every claim in the report must be traceable to a snapshot file. No invention.
- **Time-aware** — Newer overrides older. Show the trajectory.
- **One paragraph of synthesis** — In section 1, you may describe the *evolution path*. Nowhere else.
- **Append-only** — Each report is a new dated file. Diffing reports across time is itself a feature.
- **Match user's language** — If the snapshots are mostly Chinese, the report is in Chinese. If mixed, default to the user's current language and quote source content verbatim.

---

## Value Quantification (Required After Successful Report Generation)

After confirming the report was written, append:

```markdown
---

### 📊 What this report is worth

| | |
|---|---|
| 📄 **Generated** | A merged report from {N} snapshots, spanning {oldest date} to {newest date} |
| ⏱ **Time to produce manually** | ~3-6 hours of digging through old conversation transcripts and summarizing yourself |
| 🤝 **Shareable with** | Co-founders, advisors, investors, contractors, or your future self |
| 🚧 **Without this skill** | The {N} decisions you've made over weeks/months stay scattered across chat transcripts that get auto-deleted by the agent harness — and your trajectory is invisible to anyone but you |
```

If the report is the user's first one for this project, append:

> 💡 First report for `{project}`. Future reports use the same format and live alongside this one in `~/.smtm/reports/{project}/`. Diffing two reports across time is itself a feature — it shows your trajectory.

If the report contains contradictions (a later snapshot superseded an earlier one), surface this:

> 🔄 **Trajectory note**: Your thinking shifted on {N} topics over this period. The report shows both the current decision and the prior version it replaced. This is useful — it's evidence of learning, not flip-flopping.
