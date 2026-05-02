import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", ".next", "node_modules", "coverage", "playwright-report", "test-results"]);
const ignoredFiles = new Set(["package-lock.json"]);
const patterns = [
  { name: "Supabase service role key", regex: /SUPABASE_SERVICE_ROLE_KEY\s*=\s*(?!\s*(placeholder|changeme|example|<|$))/i },
  { name: "Private key", regex: /-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----/ },
  { name: "Generic API token", regex: /(api[_-]?key|secret|token)\s*[:=]\s*['"]?[A-Za-z0-9_\-]{32,}/i },
  { name: "JWT-like token", regex: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ }
];

function files(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const rel = relative(root, path);
    const stat = statSync(path);
    if (stat.isDirectory()) return ignoredDirs.has(entry) ? [] : files(path);
    if (ignoredFiles.has(entry) || stat.size > 1_000_000) return [];
    return [rel];
  });
}

const findings = [];
for (const file of files(root)) {
  const content = readFileSync(join(root, file), "utf8");
  for (const pattern of patterns) {
    if (pattern.regex.test(content)) findings.push(`${pattern.name}: ${file}`);
  }
}

if (findings.length > 0) {
  console.error("Potential secrets detected:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log("No obvious secrets detected.");
