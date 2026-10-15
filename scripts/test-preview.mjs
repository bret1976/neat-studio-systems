import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
const base = process.argv[2];
if (!base || new URL(base).protocol !== "https:")
  throw new Error("Pass the HTTPS preview URL");
const env = await readFile(".env.local", "utf8").catch(() => "");
const line = env.split("\n").find((v) => v.startsWith("VERCEL_OIDC_TOKEN="));
const token = line
  ?.slice("VERCEL_OIDC_TOKEN=".length)
  .trim()
  .replace(/^"|"$/g, "");
const child = spawn("npx", ["playwright", "test", ...process.argv.slice(3)], {
  stdio: "inherit",
  env: {
    ...process.env,
    BASE_URL: base,
    ...(token ? { VERCEL_OIDC_TOKEN: token } : {}),
  },
});
child.on("exit", (code) => process.exit(code ?? 1));
