/**
 * TanStack Router warns when route modules export the page/layout component in addition
 * to `Route`, because those exports block moving the component into a split chunk.
 * This removes trailing `export default X` and rewrites `export default function X` → `function X`.
 * Skips files named `-*.tsx` (non-route chunks used by lazy imports — they must keep default export).
 */
import fs from "node:fs";
import path from "node:path";

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

const appDir = path.join(process.cwd(), "app");
const files = walk(appDir);

let touched = 0;
for (const file of files) {
  const base = path.basename(file);
  if (base.startsWith("-")) continue;

  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("createFileRoute")) continue;

  const original = s;

  s = s.replace(/\bexport default function\s+(\w+)/g, "function $1");

  for (;;) {
    const next = s.replace(/\nexport default\s+\w+\s*;?\s*$/m, "\n");
    if (next === s) break;
    s = next;
  }

  if (s !== original) {
    fs.writeFileSync(file, s);
    touched++;
  }
}

console.log(`strip-route-default-exports: updated ${touched} files`);
