---
name: money-skillify
description: "Codify a successful workflow from the current conversation into a permanent project-local skill. After you discover (e.g.) a cold-email sequence that converts, an ad-creative format that beats baseline, or a content-pipeline cadence that compounds — /money-skillify writes it as a SKILL.md under the project's local skills directory so future sessions can re-invoke it without re-discovery. Use when the user says: 'this worked, save it', 'codify this', 'turn this into a skill', '把这个固化下来', '存成 skill'."
---

# /money-skillify — Codify a Working Pattern Into a Reusable Skill

Most successful workflows are discovered once, executed by hand, and forgotten. The next time the user faces the same problem, they re-discover it (or rebuild a worse version). `/money-skillify` solves this: it walks back through the most recent successful workflow, distills the steps, and writes a project-local SKILL.md.

The output is a custom skill stored at `~/.smtm/projects/{slug}/skills/{name}/SKILL.md`. Future Claude Code sessions in this project can reference it.

---

## Triggers

| Command | Behavior |
|---|---|
| `/money-skillify` | Codify the most recent successful workflow in this conversation |
| `/money-skillify <name>` | Same, with an explicit name for the new skill |
| `/money-skillify list` | List all project-local skills in `~/.smtm/projects/{slug}/skills/` |
| `/money-skillify show <name>` | Print a project-local skill |

**Natural-language equivalents**:
- "This worked, save it", "Codify this", "Turn this into a skill", "Make this reusable"
- "把这个固化下来", "存成 skill", "保存这个流程"

---

## What counts as "a successful workflow"

A workflow is `/money-skillify`-eligible if all three are true:
1. The user explicitly confirmed it worked (clear signal: "this worked", "this converted", "ship it", "much better than before", "我们就这么干")
2. There's a clear sequence of steps (not just a single insight — that's a `/money-learn` not a skill)
3. The pattern is reusable — it would help to do exactly the same thing again next time, in this project

Anti-patterns that should NOT be skillified:
- A one-off bug fix
- A pattern that's user-specific but not reusable across the user's products
- A pattern more naturally captured as a learning (single observation)
- A pattern already covered by an existing money-* skill

---

## Workflow

### Step 1 — Identify the workflow

Walk back through the conversation. Find the most recent sequence where:
1. The user described or asked for something to be done
2. A series of steps was executed
3. The user confirmed satisfaction

Quote the user's confirmation back to them so they can verify which workflow you're about to codify:

> I'm about to codify the workflow that produced "{quoted confirmation}". The steps as I understood them:
> 1. {step 1}
> 2. {step 2}
> ...
>
> Is this what you want to skillify? [y / edit / different workflow]

If the user wants a different workflow, ask which.

### Step 2 — Choose a name

Default: `{slug-of-the-workflow}` (e.g., `cold-email-saas-buyers`, `ad-creative-3x-baseline`, `weekly-ship-cadence`).

If `/money-skillify <name>` was given, use that. Else propose 1-3 candidate names and ask the user to pick.

The skill name will become the file path:
```
~/.smtm/projects/{slug}/skills/{name}/SKILL.md
```

### Step 3 — Distill the steps

Convert the workflow into a fixed format:

```markdown
---
name: {project-slug}-{name}
description: "{One-line summary of what this skill does, when to invoke. Auto-derived but user can edit.}"
project: {project slug}
captured_at: {ISO 8601}
captured_from: {conversation-summary | snapshot-id}
trigger: {natural-language phrase or /command pattern that invokes this}
---

# {Title}

## When to use

{1-2 sentences describing the trigger condition. Specific. "Cold email to early-stage SaaS founders with under $10k MRR" not "cold email to people".}

## Inputs needed

- {Input 1, e.g., "Target ICP description"}
- {Input 2, e.g., "Sender's product URL"}
- ...

## Steps

1. {Step 1, including any specific commands, tools, or templates used}
2. {Step 2}
3. ...

## Success signal

How to know it worked. ("Reply rate ≥10%", "Conversion ≥1.5%", etc.)

## Failure mode + fallback

What goes wrong, and what to do instead. ("If reply rate <5%, the subject line is the issue — switch to {alternative}")

## Variables / templates

If the workflow uses a template (e.g., email body, ad creative), include the template literally. Mark variables in `{double-braces}`.

## Evidence this works

The original conversation context: who, what, when, what result. One paragraph.

## Limitations

When this skill should NOT be used. ("This works for B2B SaaS; do not use for B2C.")
```

### Step 4 — Write to disk

Path: `~/.smtm/projects/{slug}/skills/{name}/SKILL.md`

`mkdir -p` the directory tree first. If a file already exists at that path, ask:
- Append a version number (e.g., `cold-email-v2/`)?
- Overwrite?
- Cancel?

Default to "append a version" — preserves the prior skill in case the new one is worse.

### Step 5 — Confirm + register

Print:

```
✅ Skill codified.

Path: ~/.smtm/projects/{slug}/skills/{name}/SKILL.md
Trigger: {trigger}

To re-run this skill in a future Claude Code session:
1. Open Claude Code in this project's directory
2. Type "{trigger}" or load the file directly: `read ~/.smtm/projects/{slug}/skills/{name}/SKILL.md`
3. The skill will execute the same steps with new inputs
```

Optionally suggest creating a learning to record that this workflow was successfully captured:

> Want to also log a learning? E.g., "{name} converts at X% for {ICP}" — `/money-learn add`.

---

## Auto-loading project-local skills

Other money-* skills should check `~/.smtm/projects/{slug}/skills/` at startup. If any project-local skills exist, surface them once per session:

> 📦 This project has 3 codified skills: `cold-email-saas-buyers`, `ad-creative-3x-baseline`, `weekly-ship-cadence`. Reference them by name or run `/money-skillify list` to see all.

This is how the user's accumulated craft becomes part of every future session, automatically.

---

## List mode

`/money-skillify list`:

```
Project-local skills for `{project}`:

| Name | Captured | Trigger |
|---|---|---|
| cold-email-saas-buyers | 2026-04-22 | "cold email outreach for SaaS" |
| ad-creative-3x-baseline | 2026-04-15 | "generate ad creative" |
| ... | | |
```

`/money-skillify show <name>`:
Cat the file. Print path at top.

---

## Edge cases

- **No clear successful workflow in conversation** — Ask the user to describe the workflow and walk through Step 3 manually.
- **Workflow uses external tools the user doesn't have configured** — Note them in the SKILL.md as prerequisites; don't fail.
- **Workflow contains sensitive data** (customer names, internal URLs) — Strip them out, replace with `{variable}` placeholders, ask user to confirm sanitization.
- **Project-local skill duplicates a global money-* skill** — Warn: "This overlaps significantly with `/money-content`. Are you sure you want a project-local version, or should we update your `/money-content` workflow instead?"

---

## Principles

- **Codify only proven patterns** — Failed or unconfirmed workflows get a `/money-learn` entry, not a skill.
- **Specific over general** — A skill named `cold-email-saas-founders-under-10k-mrr` is more useful than `cold-email-template`. Specificity drives retrieval and quality.
- **Sanitize before saving** — Project-local skills may end up in version control or shared. Strip secrets and PII as part of Step 3.
- **Versions, not overwrites** — `cold-email/` then `cold-email-v2/` then `cold-email-v3/`. The progression is itself useful institutional memory.
- **Skill, not journal** — A skill encodes a procedure. A journal records what happened. If there's no procedure to encode, log a learning instead.

---

## Value Quantification (Required at End of Output)

After successful codification:

| | |
|---|---|
| 📦 **Captured** | One reusable skill at `{path}` |
| ⏱ **Time saved per future use** | ~30-90 minutes — re-discovering the same sequence vs. running it from a SKILL.md |
| ⚠️ **Risk avoided** | Re-doing the workflow worse next time — most founders re-build a degraded version of their own prior success because the original wasn't captured |
| 🔁 **Auto-surfaced** | Every future Claude Code session in this project gets a one-line nudge listing project-local skills available |

After `/money-skillify list`:

| | |
|---|---|
| 📋 **Surfaced** | {N} project-local skills, each with its trigger |
| ✅ **What you got** | A complete list of your codified workflows for this project, with file paths and triggers |
