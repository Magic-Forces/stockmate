import semver from "semver";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const ROOT = process.cwd();
const FILES = {
  node: path.join(ROOT, "package.json"),
  cargo: path.join(ROOT, "src-tauri", "Cargo.toml"),
  tauri: path.join(ROOT, "src-tauri", "tauri.conf.json"),
};

try {
  const version = getVersion();
  const noTag = process.argv.includes("--no-tag");

  console.log(`[version] Target version: ${version}`);
  if (noTag) {
    console.log(
      "[version] --no-tag flag detected. Skipping safety checks and push."
    );
  }
  console.log();

  if (!noTag) {
    isRepoClean();
    isOnMain();
    doesTagExist(version);
  }

  updateJson(FILES.node, version);
  updateJson(FILES.tauri, version);
  updateToml(FILES.cargo, version);

  if (!noTag) {
    commitChanges(version);
    createTag(version);
    gitPush();
  }

  console.log("\n[version] Version update finished successfully.");
} catch (error) {
  console.error("[version] Failed to execute version script:", error.message);
  process.exit(1);
}

function getVersion() {
  const version = process.argv.slice(2).find((arg) => semver.valid(arg));

  if (!version) {
    console.error(
      '[version] Usage: pnpm s:version <version> [--no-tag] (e.g., "1.2.3")'
    );
    process.exit(1);
  }

  return version;
}

function isRepoClean() {
  const output = execSync("git status --porcelain").toString().trim();

  if (output.length > 0) {
    console.log("[version] Working directory is not clean.");
    console.log("[version] Commit your changes before running version bump.");
    process.exit(1);
  }
  console.log("[version] Repository is clean.");
}

function isOnMain() {
  const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

  if (branch !== "main") {
    console.log(`[version] Cannot bump version on branch: ${branch}`);
    console.log(`[version] Switch to 'main' before running this script.`);
    process.exit(1);
  }

  console.log("[version] On main branch.");
}

function doesTagExist(version) {
  const tag = "v" + version;
  const output = execSync(`git tag --list "${tag}"`).toString().trim();
  if (output === tag) {
    throw new Error(`Tag ${tag} already exists.`);
  }
  console.log(`[version] Tag does not exist: ${tag}`);
}

function updateJson(filePath, version) {
  let content = fs.readFileSync(filePath, "utf-8");

  const regex = /"version"\s*:\s*".*"/;
  const newLine = `"version": "${version}"`;

  const updated = content.replace(regex, newLine);
  fs.writeFileSync(filePath, updated);

  console.log(`[version] Updated JSON version in: ${filePath}`);
}

function updateToml(filePath, version) {
  let content = fs.readFileSync(filePath, "utf-8");

  const regex = /^version\s*=\s*".*"/m;
  const newLine = `version = "${version}"`;

  const updated = content.replace(regex, newLine);
  fs.writeFileSync(filePath, updated);

  console.log(`[version] Updated TOML version in: ${filePath}`);
}

function commitChanges(version) {
  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "chore: bump version to ${version}"`, {
    stdio: "inherit",
  });

  console.log("[version] Committed version bump.");
}

function createTag(version) {
  const tag = "v" + version;
  execSync(`git tag -a ${tag} -m "Release ${tag}"`, { stdio: "inherit" });

  console.log(`[version] Created tag: ${tag}`);
}

function gitPush() {
  execSync("git push", { stdio: "inherit" });
  execSync("git push --tags", { stdio: "inherit" });

  console.log("[version] Pushed changes and tags to remote.");
}
