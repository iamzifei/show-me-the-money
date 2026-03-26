#!/usr/bin/env node

/**
 * CLI entry point for show-me-the-money.
 *
 * Supports:
 *   npx @orrisai/show-me-the-money install   — install skills to ~/.claude/skills/
 *   npx @orrisai/show-me-the-money update    — pull latest version and re-install skills
 *   npx @orrisai/show-me-the-money version   — print current version
 *   npx @orrisai/show-me-the-money uninstall — remove skills from ~/.claude/skills/
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const PACKAGE_ROOT = path.join(__dirname, "..");
const SKILLS_SRC = path.join(PACKAGE_ROOT, "skills");
const CLAUDE_SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");
const VERSION = fs
  .readFileSync(path.join(PACKAGE_ROOT, "VERSION"), "utf8")
  .trim();

const SKILL_NAMES = fs
  .readdirSync(SKILLS_SRC, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const command = process.argv[2] || "install";

switch (command) {
  case "install":
    install();
    break;
  case "update":
  case "upgrade":
    update();
    break;
  case "version":
  case "--version":
  case "-v":
    console.log(`show-me-the-money v${VERSION}`);
    break;
  case "uninstall":
    uninstall();
    break;
  case "help":
  case "--help":
  case "-h":
    printHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}

function install() {
  fs.mkdirSync(CLAUDE_SKILLS_DIR, { recursive: true });
  console.log(
    `\n  show-me-the-money v${VERSION} — Installing ${SKILL_NAMES.length} skills\n`
  );

  for (const dir of SKILL_NAMES) {
    const src = path.join(SKILLS_SRC, dir);
    const dest = path.join(CLAUDE_SKILLS_DIR, dir);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    copyDirSync(src, dest);
    console.log(`  ✓ ${dir}`);
  }

  console.log(
    "\n  Done! Open Claude Code and type /money to start building your business.\n"
  );
}

/**
 * Check for the latest version on npm, download it, and re-install all skills.
 *
 * Flow:
 *   1. Query npm registry for the latest published version
 *   2. Compare with the currently installed version
 *   3. If already up-to-date, exit early
 *   4. Otherwise run `npx @orrisai/show-me-the-money@latest install` which
 *      downloads the new package and copies skills into ~/.claude/skills/
 */
function update() {
  console.log(`\n  show-me-the-money v${VERSION} — Checking for updates...\n`);

  // Step 1: Fetch the latest version from npm using execFileSync (no shell)
  let latest;
  try {
    latest = execFileSync("npm", ["view", "@orrisai/show-me-the-money", "version"], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    console.error("  Could not reach npm registry. Check your network and try again.");
    process.exit(1);
  }

  // Step 2: Compare versions
  if (latest === VERSION) {
    console.log(`  Already on the latest version (v${VERSION}). No update needed.\n`);
    return;
  }

  console.log(`  Current version: v${VERSION}`);
  console.log(`  Latest version:  v${latest}`);
  console.log(`\n  Downloading and installing...\n`);

  // Step 3: Download the latest package and run its install command.
  //         npx with @latest always fetches the newest published version,
  //         then the "install" sub-command copies skills into ~/.claude/skills/.
  try {
    execFileSync("npx", ["--yes", "@orrisai/show-me-the-money@latest", "install"], {
      stdio: "inherit",
    });
    console.log(`\n  Update complete! v${VERSION} → v${latest}`);
    console.log("  Open Claude Code and type /money to use the new version.\n");
  } catch {
    console.error(
      "  Update failed. Try manually:\n    npx @orrisai/show-me-the-money@latest\n"
    );
    process.exit(1);
  }
}

function uninstall() {
  console.log(`\n  Removing ${SKILL_NAMES.length} skills from Claude Code...\n`);
  for (const dir of SKILL_NAMES) {
    const dest = path.join(CLAUDE_SKILLS_DIR, dir);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
      console.log(`  ✗ ${dir}`);
    }
  }
  console.log("\n  All show-me-the-money skills removed.\n");
}

function printHelp() {
  console.log(`
  show-me-the-money v${VERSION}

  Usage:
    npx @orrisai/show-me-the-money [command]

  Commands:
    install     Install skills to ~/.claude/skills/ (default)
    update      Check for updates, pull latest version, and re-install skills
    uninstall   Remove all skills from ~/.claude/skills/
    version     Print current version
    help        Show this help message

  After installing, open Claude Code and type /money to get started.
`);
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
