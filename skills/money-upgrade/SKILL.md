---
name: money-upgrade
description: "Auto-update the show-me-the-money skill suite to the latest version. One command checks npm for a new version, downloads it, replaces the installed skills, and shows what changed. Use when the user wants to update skills, check for new versions, or says 'upgrade money', 'update skills', 'latest version', 'auto-update', or 'check for updates'."
disable-model-invocation: true
---

# Money Upgrade — Auto-Updater

One command updates every money-* skill to the latest published version. No manual file copying, no version comparison by hand, no risk of partial installs.

## Language Selection

If the user's message contains a `[Language: ...]` tag, use that language for all output. Otherwise, ask the user to choose before proceeding:

> **🌐 Choose your language / 选择语言:**
> 1. 🇬🇧 English
> 2. 🇨🇳 中文

Default to English if the user doesn't specify. All subsequent output must be in the chosen language.

## What this skill does

When the user invokes `/money-upgrade`, run the three steps in order:

1. **Read the installed version** — `cat ~/.claude/skills/money/../../VERSION` if the file exists, otherwise read from the package metadata
2. **Check npm for the latest version** — `npm view @orrisai/show-me-the-money version`
3. **If outdated, run the auto-updater** — `npx @orrisai/show-me-the-money@latest update`

The CLI (`bin/cli.js`) handles the actual work: download, version compare, backup, install. This skill is the user-facing wrapper that decides when to call it.

## The full auto-update command

This is the single command that does everything — version check, download, replace, verify:

```bash
npx @orrisai/show-me-the-money@latest update
```

Run it for the user. It prints the before/after versions, lists which skills were re-installed, and exits cleanly.

## Workflow

### Step 1 — Print current state

```
Current installation:
  Version: v{current}
  Location: ~/.claude/skills/
  Skills installed: {count}

Checking npm for updates...
```

### Step 2 — Check for updates

Run `npm view @orrisai/show-me-the-money version` (no arguments needed). Capture stdout. Compare to the local VERSION.

If equal, exit with:

```
✅ You're on the latest version (v{version}). Nothing to update.
```

If different (local < remote), proceed to Step 3.

### Step 3 — Run the updater

```bash
npx @orrisai/show-me-the-money@latest update
```

The CLI prints its own progress. After it returns, verify success:

- Check that VERSION now matches the latest npm version
- Confirm all skill directories are present in `~/.claude/skills/`

### Step 4 — Show what changed

After update succeeds, fetch the release notes for the new version and summarize:

```bash
curl -s https://raw.githubusercontent.com/iamzifei/show-me-the-money/v{version}/CHANGELOG.md | head -80
```

If CHANGELOG.md isn't available, fall back to the README's "What's new" section. Present the highlights in 5-10 bullets — not the full diff.

### Step 5 — Remind to restart

```
✅ Updated to v{new}.

To pick up the new skills, restart Claude Code (or run /reload-plugins if available).

What's new in this version:
- [bullet 1]
- [bullet 2]
- ...

Run /money to start using the updated suite.
```

## Manual fallback

If the auto-updater fails (npm offline, registry issue, permission error), fall back to the manual path. Read the error message and surface ONE specific reason it failed — not a wall of generic recovery options.

Common failures and the response:

| Failure | Diagnostic | Response |
|---|---|---|
| `npm: command not found` | Node/npm not installed | "Install Node.js from nodejs.org first, then re-run `/money-upgrade`." |
| Network unreachable | No internet or npm registry down | "Can't reach npm registry. Check your network — registry status: https://status.npmjs.org." |
| EACCES on `~/.claude/skills/` | Permission denied on the skills dir | "Permission denied writing to `~/.claude/skills/`. Run `sudo chown -R $(whoami) ~/.claude/` then re-run." |
| Tag exists but install fails | Likely a publish race or a broken release | "Latest release has an install issue. Run `npx @orrisai/show-me-the-money@{previous-stable}` to pin to the prior version." |

## Rollback

If the new version breaks something, roll back to the previous version explicitly:

```bash
# 1. Find the previous stable version on npm
npm view @orrisai/show-me-the-money versions --json | tail -20

# 2. Install that specific version
npx @orrisai/show-me-the-money@{previous-version} install
```

The auto-updater does NOT auto-rollback on failure — it leaves the installation in whatever state the failed install ended at. If the user reports a regression after update, run the two-step rollback above and then file an issue at https://github.com/iamzifei/show-me-the-money/issues.

## When to auto-update vs ask first

Default: ask before updating. The user invoked `/money-upgrade`, so they want to update — but show the version delta first and let them confirm. Example:

```
Current: v2.3.1
Latest:  v2.4.0  ← 1 minor version behind

New in v2.4.0:
- Tech-triage mode for technical debugging
- DESIGN.md design system contract in money-product
- Ship lifecycle: VERSION + CHANGELOG + release notes flow
- Cross-project portfolio learnings via /money-learn promote
- STRIDE threat model in money-quality
- Operating modes + edit perimeter + panic stop in money-ops

Proceed with update? [y/n]
```

**Skip the confirmation** only if the user explicitly said `--yes`, `--auto`, or "just update it" in their message.

## Principles

- **One command, one outcome** — Don't ask the user to copy multiple shell snippets
- **Show the delta before changing anything** — Version numbers + headline changes, not full diffs
- **Don't auto-rollback** — Failed installs surface as failures; rollback is an explicit user action
- **Restart prompt at the end** — Skills don't always reload mid-session; remind the user
- **Read the CHANGELOG, not the commit log** — Users care about behavior changes, not implementation churn

---

## Value Quantification (Required at End of Output)

- ⏱ **Time saved** — ~10-15 minutes vs the manual upgrade path (compare versions, backup, install, verify, read release notes)
- ⚠️ **Risks avoided** — (1) Partial install where some skills update and others don't; (2) backing up the wrong directory and losing project-local skills; (3) running an old skill alongside a new one and getting inconsistent behavior
- ✅ **What you got** — A clean update from v{current} → v{new}, the relevant CHANGELOG bullets, and the restart prompt
- 🚧 **Without this skill** — Most users put off the update for weeks, run old skills against new docs/atoms, and surface mystery bugs that turn out to be "you're on v2.1, that field was renamed in v2.3"
