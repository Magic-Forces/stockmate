import fs from "fs";
const folders = ["dist", "src-tauri/target"];

folders.forEach((folder) => {
  fs.rmSync(folder, { recursive: true, force: true });
  console.log(`> rm -rf ${folder}`);
});

console.log("\nDone!");
