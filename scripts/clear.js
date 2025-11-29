import fs from "fs";

const FOLDERS = [
  "dist",
  "node_modules",
  "src-tauri/gen/schemas",
  "src-tauri/icons",
  "src-tauri/target",
];

try {
  console.log("[clear] Starting cleanup...\n");

  FOLDERS.forEach((folder) => {
    fs.rmSync(folder, { recursive: true, force: true });
    console.log(`[clear] removed: ${folder}`);
  });

  console.log("\n[clear] Cleanup finished successfully.");
} catch (error) {
  console.error("[clear] Failed to execute clear script:", error.message);
  process.exit(1);
}
