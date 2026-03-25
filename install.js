#!/usr/bin/env node

/**
 * Post-install script for show-me-the-money Claude Code skills.
 *
 * Copies all skill directories from this package into the user's
 * ~/.claude/skills/ folder so Claude Code discovers them automatically.
 * Existing skill directories are overwritten to ensure the latest version.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILLS_SRC = path.join(__dirname, "skills");
const CLAUDE_SKILLS_DIR = path.join(os.homedir(), ".claude", "skills");

function main() {
  // Ensure the target directory exists
  fs.mkdirSync(CLAUDE_SKILLS_DIR, { recursive: true });

  // Read all skill directories from the package
  const skillDirs = fs
    .readdirSync(SKILLS_SRC, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (skillDirs.length === 0) {
    console.log("[show-me-the-money] No skills found to install.");
    return;
  }

  console.log(
    `[show-me-the-money] Installing ${skillDirs.length} skills to ${CLAUDE_SKILLS_DIR}`
  );

  for (const dir of skillDirs) {
    const src = path.join(SKILLS_SRC, dir);
    const dest = path.join(CLAUDE_SKILLS_DIR, dir);

    // Remove existing skill directory to ensure clean install
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }

    copyDirSync(src, dest);
    console.log(`  ✓ ${dir}`);
  }

  console.log(
    "\n[show-me-the-money] Installation complete! Skills available via /money in Claude Code."
  );
}

/**
 * Recursively copy a directory and all its contents.
 */
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

main();
