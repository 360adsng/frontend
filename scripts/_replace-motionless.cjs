const fs = require("fs");
const path = require("path");

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error("Usage: node _replace-motionless.cjs <file>...");
  process.exit(1);
}

for (const t of targets) {
  const p = path.resolve(t);
  let s = fs.readFileSync(p, "utf8");
  const n = (s.match(/motionless/g) || []).length;
  s = s.replace(/motionless/g, "div");
  fs.writeFileSync(p, s);
  console.log(p, n, "replacements");
}
