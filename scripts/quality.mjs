import { spawnSync } from "node:child_process";

const ci = process.argv.includes("--ci");
const steps = [
  ["npm", ["run", "lint"]],
  ["npm", ["run", "typecheck"]],
  ["npm", ["run", "test"]],
  ["npm", ["run", "test:coverage"]],
  ["npm", ["run", "build"]],
  ["npm", ["run", "audit:deps"]],
  ["npm", ["run", "infra:check"]]
];

for (const [command, args] of steps) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, CI: ci ? "true" : process.env.CI ?? "" }
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
