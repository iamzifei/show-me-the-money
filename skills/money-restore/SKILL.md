---
name: money-restore
description: "Restore a prior business-state snapshot saved by /money-save, so you can continue from exactly where the last session left off. Loads the most recent snapshot for the current project (auto-detected from the working directory), or a specific one by index. Use when starting a new Claude Code conversation and the user wants to continue prior work. Triggered by: 'continue from last time', 'where did we leave off', 'pick up from before', 'resume', '接着上次', '续上', '之前的结论', '上次诊断到哪了'."
---

# /money-restore — Continue From Where You Left Off

Your job is to load the most recent business-state snapshot from `~/.smtm/sessions/{project}/`, parse it, and present the state to the user so they can pick up where they left off.

**You do not run diagnoses. You do not jump to other skills. You only restore memory.**

After restoring, recommend the next skill — but let the user decide whether to invoke it.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-restore` | Load the latest snapshot for the current project |
| `/money-restore <N>` | Load the Nth snapshot (use indices from `/money-save list`) |
| `/money-restore list` | Same as `/money-save list` — list all snapshots |
| `/money-restore --slug <project>` | Switch to a different project's history |

**Natural-language equivalents** (any of these → run `/money-restore`):
- English: "continue from last time", "where did we leave off", "pick up from before", "resume the diagnosis", "what did we conclude last time"
- 中文: "接着上次", "续上", "之前的结论", "上次诊断到哪了", "上次说到哪"

---

## Project resolution

Same rules as `/money-save`:
- Default = `basename($(pwd))`, sanitized
- Override = `--slug <name>`
- Fallback = `default`

Refer to it as **business** or **project** in conversation.

---

## Workflow

### Step 1 — Locate the snapshot file

In order:
1. If user passed `<N>` → list snapshots in current project, sorted oldest → newest by filename timestamp, return the Nth.
2. If user passed `--slug X` → use X as the project name.
3. Otherwise → use the default project, find the **newest** file in `~/.smtm/sessions/{project}/` by filename timestamp.

**Always sort by the `YYYYMMDD-HHMMSS` filename prefix, never by file `mtime`.** mtime is unreliable when sessions are synced via iCloud, Dropbox, or git.

### Step 2 — Handle missing data gracefully

**Case A: project directory empty or missing**

Check whether `~/.smtm/sessions/` exists at all and what other projects are in it.

If other projects exist with snapshots, list the 3 most recently active:

```
No saved state for project `{project}`. You've been active in these other projects recently:

1. musicapi             (latest 2026-04-22)
2. kolfind              (latest 2026-04-15)
3. adwhiz               (latest 2026-03-30)

Run `/money-restore --slug <name>` to load a specific project's state.
```

If `~/.smtm/sessions/` doesn't exist at all:

```
No saved state yet. Run /money-discover, /money-strategy, or any diagnostic skill, then `/money-save` to lock in the conclusion. Next time you can `/money-restore` to continue.
```

**Case B: list mode**

Hand off to `/money-save list` logic. Output format identical.

### Step 3 — Read and parse

Open the snapshot file, parse YAML frontmatter, parse the 6 markdown sections (Business state, Confirmed conclusions, Ruled out, Open hypotheses, Next move, Notes).

If the file is malformed (frontmatter incomplete, sections missing — perhaps the user hand-edited it), present whatever fields are valid. Do not refuse to load just because the format is imperfect.

### Step 4 — Present the state

Output a concise summary in the user's chosen language. Don't dump the full file — extract what matters and let the user ask for more.

Format:

```markdown
## Picking up where you left off

**Project**: {project}
**When**: {timestamp formatted as `2026-05-03 14:23`}
**Title**: {title from frontmatter}
**Status**: {status — translate to user-friendly form: in-progress / resolved / abandoned → 进行中 / 已结论 / 已放弃 if Chinese}
**Last from**: {source_skill}

---

### Where you were

{Business state paragraph, verbatim from the snapshot}

### What you'd already decided
- {Each confirmed conclusion}

### What you'd ruled out
- {Each ruled-out direction}
- ({if empty, write "(nothing ruled out yet)")}

### Open hypotheses to test
- {Each open hypothesis}
- ({if empty, write "(none yet)")}

### Next move you'd planned
{Next move paragraph}

---

**Recommendation**: Continue with `{next_skill}` — that was the planned next step.

If you want to revise direction first, type a new `/money-*` command.
```

### Step 5 — Wait for user direction

After presenting the state, **stop**. Do not auto-invoke `next_skill`.

The user's intent for this new conversation may have shifted. Let them confirm or redirect:
- "Yes continue with `<next_skill>`" → invoke it
- "Actually, I want to switch to `<other-skill>`" → invoke that instead
- "Just refresh my memory, I'll decide later" → fine, do nothing further

---

## Edge cases

- **Multiple snapshots in current project** — default to the newest. If the user wants something older, suggest `/money-save list` to get indices, then `/money-restore <N>`.
- **Snapshot status was `abandoned`** — surface this prominently. The user may have decided not to pursue this anymore; remind them.
- **Snapshot is more than 90 days old** — flag with: "⚠️ This snapshot is from {N days ago}. Verify the conclusions still hold before acting on them."
- **Conflicting prior decisions across snapshots** — only show the newest. Use `/money-report` if the user wants the full history merged.

---

## Principles

- **Restore, don't replace** — Present prior state, let the user decide what's still valid.
- **Time-aware** — Old snapshots may be stale. Surface the date prominently.
- **No silent jumps** — Never auto-invoke `next_skill`. The user just opened a new conversation; they may have a new agenda.
- **Match the user's language** — If the snapshot was saved in Chinese but the user is now in English, present in English but quote original-language content verbatim where it preserves nuance.

---

## Value Quantification (Required After Successful Restore)

After presenting the prior state and the next-step recommendation, append:

```markdown
---

### 📊 What this restore is worth

| | |
|---|---|
| 📦 **Restored** | {N conclusions, M ruled-out directions, K open hypotheses from {date}} |
| ⏱ **Saved this session** | ~15-30 minutes of re-explaining context to the AI |
| ⚠️ **Risk avoided** | Re-suggesting a direction you already ruled out (the AI has no memory across sessions without `/money-save` and `/money-restore`) |
| ⏭ **Suggested next** | {next_skill from frontmatter, or "decide based on the state above"} |
```

If the snapshot is older than 90 days, prepend a warning row:

> ⚠️ **Stale**: This snapshot is {N days} old. Verify the conclusions still hold before acting on them.

If the snapshot's status is `abandoned`, prepend:

> ⚠️ **Abandoned**: This snapshot was marked abandoned. Restoring is fine for review — but the conclusions here were rejected, not validated.
