import fs from "fs";
import { spawnSync } from "child_process";

const FOLDERS = [
  "build",
  "node_modules",
  "src-tauri/gen/schemas",
  "src-tauri/icons",
  ".svelte-kit",
];

try {
  console.log("[clear] Starting cleanup...\n");

  FOLDERS.forEach((folder) => {
    fs.rmSync(folder, { recursive: true, force: true });
    console.log(`[clear] removed: ${folder}`);
  });

  console.log("[clear] Running 'cargo clean'");
  const result = spawnSync("cargo", ["clean"], {
    cwd: "src-tauri",
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    throw new Error(`'cargo clean' exited with code ${result.status}`);
  }

  console.log("\n[clear] Cleanup finished successfully.");
} catch (error) {
  console.error("[clear] Failed to execute clear script:", error.message);
  process.exit(1);
}
