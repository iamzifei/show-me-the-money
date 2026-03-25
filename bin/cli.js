#!/usr/bin/env node

/**
 * CLI entry point for show-me-the-money.
 *
 * Supports:
 *   npx show-me-the-money install   — install skills to ~/.claude/skills/
 *   npx show-me-the-money upgrade   — re-install latest from GitHub
 *   npx show-me-the-money version   — print current version
 *   npx show-me-the-money uninstall — remove skills from ~/.claude/skills/
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
  case "upgrade":
    upgrade();
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

function upgrade() {
  console.log("\n  Upgrading show-me-the-money to latest version...\n");
  try {
    execFileSync("npm", ["install", "-g", "@orrisai/show-me-the-money@latest"], {
      stdio: "inherit",
    });
    console.log("\n  Upgrade complete!\n");
  } catch {
    console.error(
      "  Upgrade failed. Try manually: npm install -g @orrisai/show-me-the-money@latest"
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
    npx show-me-the-money [command]

  Commands:
    install     Install skills to ~/.claude/skills/ (default)
    upgrade     Upgrade to the latest version
    uninstall   Remove all skills from ~/.claude/skills/
    version     Print version
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
