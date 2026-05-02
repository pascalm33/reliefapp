import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const command = args.length > 0 ? args : ["vitest", "run"];
const result = spawnSync("npx", command, { stdio: "inherit", shell: process.platform === "win32" });
process.exit(result.status ?? 1);
