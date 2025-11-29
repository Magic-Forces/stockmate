import path from "path";
import fs from "fs";
import os from "os";

const PLATFORM = process.platform;
const HOME = os.homedir();

try {
  console.log("[reset] Detected platform:", PLATFORM);

  let folders;

  switch (PLATFORM) {
    case "win32":
      folders = [
        path.join(HOME, "AppData", "Roaming", "pl.foxlab.stockmate"),
        path.join(HOME, "AppData", "Local", "pl.foxlab.stockmate", "logs"),
      ];
      break;
    default:
      folders = undefined;
      break;
  }

  if (!folders) {
    console.log(
      `[reset] No specific folders to clean for this platform (${PLATFORM}).`
    );
    process.exit(0);
  }

  console.log("[reset] Starting reset...\n");

  folders.forEach((folder) => {
    fs.rmSync(folder, { recursive: true, force: true });
    console.log(`[reset] removed: ${folder}`);
  });

  console.log("\n[reset] Reset finished successfully.");
} catch (error) {
  console.error("[reset] Failed to execute reset script:", error.message);
  process.exit(1);
}
