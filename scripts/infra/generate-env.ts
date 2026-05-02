import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

type EnvConfig = {
  variables: Record<string, string>;
};

const env = process.argv[2] ?? "dev";
const source = join(process.cwd(), "infra", "environments", `${env}.json`);
const targetName = env === "dev" ? ".env.dev.example" : `.env.${env}.example`;
const target = join(process.cwd(), targetName);
const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "APP_URL", "NODE_ENV"];

if (!existsSync(source)) {
  console.error(`Missing infra environment file: ${source}`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(source, "utf8")) as EnvConfig;
const missing = required.filter((name) => !config.variables[name]);
if (missing.length > 0) {
  console.error(`Infra config is missing variables: ${missing.join(", ")}`);
  process.exit(1);
}

const content = [
  "# Generated example file. Do not put real secrets here.",
  ...Object.entries(config.variables).map(([key, value]) => `${key}=${value}`)
].join("\n");

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, `${content}\n`, "utf8");
console.log(`Generated ${target} from ${source}`);
