import { spawnSync } from "node:child_process";

const audit = spawnSync("npm", ["audit", "--omit=dev", "--audit-level=high"], {
  stdio: "inherit",
  shell: process.platform === "win32"
});
if (audit.status !== 0) {
  console.error("\nDependency audit failed for high or critical advisories. Review advisories above before release.");
  process.exit(audit.status ?? 1);
}
