---
name: money-save
description: "Save the current business state to disk so future Claude Code sessions can pick up where you left off. Captures confirmed conclusions, ruled-out directions, open hypotheses, and the next recommended skill. Use when the user has just reached a conclusion in /money-discover, /money-strategy, /money-diagnose, or any pipeline phase, and wants to lock the state in. Also triggered by: 'save this', 'checkpoint', 'remember this', 'lock it in', '保存', '存档', '记下来', '这个结论留着'."
---

# /money-save — Business State Checkpoint

Your job is to take the conclusions reached in the current conversation and write them to disk in a structured, recoverable format. Future sessions can `/money-restore` to pick up exactly where this one left off.

**You do not run diagnoses. You do not give business advice. You only persist state.**

---

## Why this exists

Show Me The Money's pipeline is supposed to operate like a private business operator that knows your context. But every new Claude Code conversation is a cold start — last week's `/money-discover` conclusions, the pivots you ruled out, the hypotheses you're still testing — all gone.

Saving turns a one-shot tool into a continuous operator. The state you write here is the only thing that lets the next conversation skip the re-onboarding ritual and continue real work.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-save` | Save what's been decided in the current conversation. Title auto-extracted. |
| `/money-save <title>` | Save with an explicit title, e.g. `/money-save pricing locked at $29` |
| `/money-save list` | List all snapshots for the current project |
| `/money-save list <project>` | List snapshots for a specific project |
| `/money-save --slug <project>` | Save under a non-default project name |

**Natural-language equivalents** (any of these → run `/money-save`):
- English: "save this", "checkpoint this", "remember this", "lock it in", "snapshot before we continue"
- 中文: "保存", "存档", "记下来", "这个结论留着", "存一份"

---

## Project isolation

Every snapshot belongs to a **project**. A project separates one business from another — what you decide for `MusicAPI` should never bleed into `KolFind`'s diagnosis history.

**Default project name**: `basename($(pwd))` with non-`[a-z0-9-]` characters replaced by `-`. If the user runs `/money-save` from `~/Dev/musicapi`, the project becomes `musicapi`.

**Explicit override**: `--slug my-project`.

**Fallback**: if you're in `$HOME` or somewhere generic, the project is `default`.

In conversation, refer to it as **business** or **project** — never "slug" (that's the internal identifier).

---

## Workflow

### Step 1 — Decide if there's anything worth saving

Before writing anything, scan the conversation for actual decisions. A snapshot is not a journal entry — it's a record of judgments the user has confirmed.

Worth saving if the conversation contains any of:
- A pricing decision the user accepted
- An idea or pivot the user explicitly ruled out
- A hypothesis the user wants to test next sprint
- A clear "next-skill" handoff (e.g., "do `/money-product` next")
- A diagnosis root cause the user agreed with

**If nothing of substance happened**, refuse cleanly:

> Nothing to save yet — no decisions confirmed in this conversation. Run `/money-discover`, `/money-strategy`, or another diagnostic skill first, then come back.

Never write empty or filler snapshots.

### Step 2 — Extract or confirm a title

Pull a noun-phrase title from the conversation, ≤ 24 characters. Examples:
- `pricing locked at $29`
- `ruled out enterprise pivot`
- `MVP scope frozen`
- `首单获客渠道是 [niche forum]`
- `定价从 $9 拉到 $29`

If the user gave an explicit title via `/money-save <title>`, use theirs verbatim.

### Step 3 — Build the path

```
~/.smtm/sessions/{project}/{YYYYMMDD-HHMMSS}-{title-slug}.md
```

- Timestamp: local time, format `20260503-141522`
- title-slug: lowercase, spaces → `-`, punctuation stripped, CJK characters preserved
- If a same-second collision somehow occurs, append a 4-char random suffix: `-a7k2`

`mkdir -p` the directory first if it doesn't exist.

### Step 4 — Write the snapshot

YAML frontmatter + markdown body. Both fixed-format. Other skills will parse this — do not improvise the schema.

```yaml
---
slug: {project}
timestamp: {ISO 8601 with timezone, e.g. 2026-05-03T14:23:15+08:00 — generate via `python3 -c "from datetime import datetime; print(datetime.now().astimezone().isoformat(timespec='seconds'))"` or equivalent. Never use the basic-format variant 20260503T142315+0800.}
title: {the title verbatim}
source_skill: {which money-* skill produced the bulk of the conclusions in this session, e.g. money-discover. If multiple, comma-separated.}
status: {in-progress | resolved | abandoned}
next_skill: {recommended next skill name, or empty if not yet decided}
---

## Business state

{One paragraph. What is the current state of this business? What brought the user to /money this conversation? Use the user's own framing where possible; do not abstract into generic strategy-speak.}

## Confirmed conclusions

- {Conclusion 1, one line. Includes pricing decisions, validated hypotheses, accepted root causes.}
- {Conclusion 2}
- ...

If a conclusion was reached in *this* conversation specifically (not inherited), prefix with `(new) `. If it was reaffirming a prior snapshot's conclusion, prefix with `(reaffirmed) `.

## Ruled out

- {Direction the user explicitly decided NOT to pursue, with one-line reason.}
- {e.g. "Won't pivot to enterprise — sales cycle too long for solo founder."}
- {If empty, write `(none yet)`.}

## Open hypotheses

- {Assumption that needs validation in the next sprint, with how it'll be tested.}
- {e.g. "Hypothesis: niche-forum traffic will convert at >2%. Test: 5 posts over 2 weeks, track signups via UTM."}
- {If empty, write `(none yet)`.}

## Next move

{One paragraph or a bullet. Which skill picks up from here? What action does the user take first?}

E.g. "Next: /money-product to build the landing page. First action: register the domain musicapi.ai."

## Notes

{Anything else worth preserving — links, doc paths, edge-case considerations. Optional. If empty, write `(none)`.}
```

### Step 5 — Confirm to the user

Print a short confirmation in the user's chosen language:

> ✅ Saved as `<title>` under project `<project>`.
> File: `~/.smtm/sessions/<project>/<filename>.md`
>
> Resume next time with `/money-restore` from this directory.

---

## List mode

`/money-save list` and `/money-save list <project>` enumerate snapshots:

```
musicapi (5 snapshots):
  1. 2026-05-03 14:23  pricing locked at $29  (resolved, from money-strategy)
  2. 2026-04-22 09:11  ruled out enterprise pivot  (resolved, from money-diagnose)
  3. 2026-04-15 16:40  MVP scope frozen  (in-progress, from money-product)
  ...
```

Sort by filename timestamp, newest first.

---

## Edge cases

- **No decisions yet** → Refuse cleanly per Step 1. Do not invent content.
- **Same project, same second** → Append 4-char random suffix.
- **iCloud-synced sessions directory** → Do not rely on file `mtime`; sort exclusively by the `YYYYMMDD-HHMMSS` prefix in the filename.
- **User runs `/money-save` from a freshly-cloned repo with no decisions** → Same as "no decisions yet" — refuse.
- **User-facing language** — match the user's chosen language (English or 中文). Map internal field names (slug, source_skill, next_skill) to user-friendly terms in conversation: `slug → 项目/business`, `source_skill → from`, `next_skill → next`.

---

## Principles

- **State, not narrative** — Snapshots are checkpoints, not journals. Bullet > paragraph.
- **User's words, not yours** — Quote the user's framing where possible. Do not paraphrase decisions into corporate-speak.
- **Append-only** — Never overwrite an existing snapshot. Every save is a new file.
- **Cheap to write, expensive to lose** — Err on the side of saving when there is genuine substance. But never save filler.

---

## Value Quantification (Required After Each Successful Save)

After confirming the snapshot was written, append:

```markdown
---

### 📊 What this checkpoint is worth

| | |
|---|---|
| 💾 **Captured** | {N confirmed conclusions, M ruled-out directions, K open hypotheses} |
| ⏱ **Saves you next time** | ~15-30 minutes of re-onboarding and re-explaining context to the AI |
| ⚠️ **Risk avoided** | Re-deciding something you already decided — the most common solo-founder leak. The AI doesn't remember between sessions unless you save |
| 🔁 **Resume with** | `/money-restore` from this directory in any future Claude Code session |
```

Use the actual counts from the snapshot. If only 1 conclusion was captured, the value is real but smaller — show it honestly. Never inflate.

If the user has saved ≥3 snapshots in this project, append a second line:

> 💡 You now have {N} snapshots in `{project}`. Run `/money-report` if you want a single deliverable merging them — useful for sharing with co-founders or for your own multi-month review.
