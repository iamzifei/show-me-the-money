---
name: money-upgrade
description: "Upgrade show-me-the-money skills to the latest version. Use when the user wants to update skills, check for new versions, or says 'upgrade money', 'update skills', or 'latest version'."
disable-model-invocation: true
---

# Money Upgrade — Version Management

Upgrade the show-me-the-money skill suite to the latest version.

## Language Selection

If the user's message contains a `[Language: ...]` tag, use that language for all output. Otherwise, ask the user to choose before proceeding:

> **🌐 Choose your language / 选择语言:**
> 1. 🇬🇧 English
> 2. 🇨🇳 中文

Default to English if the user doesn't specify. All subsequent output must be in the chosen language.

## Upgrade Process

### Step 1: Check Current Version
Read the VERSION file from the installed skill directory:
```bash
cat ~/.claude/skills/money/../../VERSION 2>/dev/null || echo "Unknown"
```

Or check via CLI:
```bash
npx @orrisai/show-me-the-money version
```

### Step 2: Check Latest Version
```bash
npm view @orrisai/show-me-the-money version
```

### Step 3: Compare Versions
- If current == latest: "You're on the latest version (vX.X.X)."
- If current < latest: Proceed to upgrade.

### Step 4: Backup Current Installation
```bash
BACKUP_DIR=~/.claude/skills-backup/money-$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR"
for dir in money money-discover money-strategy money-product money-content money-outreach money-social money-seo money-ads money-ops money-finance money-upgrade; do
  [ -d ~/.claude/skills/$dir ] && cp -r ~/.claude/skills/$dir "$BACKUP_DIR/"
done
echo "Backup saved to $BACKUP_DIR"
```

### Step 5: Install Latest Version
```bash
npx @orrisai/show-me-the-money@latest install
```

### Step 6: Verify Installation
- Check that all 12 skill directories exist in `~/.claude/skills/`
- Read the new VERSION file
- Confirm the upgrade was successful

### Step 7: Show Changelog
Display what's new in this version (from the GitHub releases page or CHANGELOG).

## Rollback

If the upgrade fails or causes issues:
```bash
# Find the latest backup
ls -la ~/.claude/skills-backup/

# Restore from backup
BACKUP_DIR=~/.claude/skills-backup/money-XXXXXXXX-XXXXXX
for dir in "$BACKUP_DIR"/*/; do
  dir_name=$(basename "$dir")
  rm -rf ~/.claude/skills/$dir_name
  cp -r "$dir" ~/.claude/skills/$dir_name
done
echo "Rolled back to backup version."
```

## Cleanup

Remove old backups (keep last 3):
```bash
cd ~/.claude/skills-backup && ls -dt money-* | tail -n +4 | xargs rm -rf
```
