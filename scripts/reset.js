import path from "path";
import fs from "fs";
import os from "os";

const platform = process.platform;
const homeFolder = os.homedir();
let folders;

switch (platform) {
  case "win32":
    folders = [
      path.join(homeFolder, "AppData", "Roaming", "pl.foxlab.stockmate"),
    ];
    break;
}

folders.forEach((folder) => {
  fs.rmSync(folder, { recursive: true, force: true });
  console.log(`> rm -rf ${folder}`);
});

console.log("\nSockmate data successfully cleared!");
