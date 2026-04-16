import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skip = new Set(['node_modules', 'dist', '.git'])

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(ent.name)) continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (/\.(tsx|ts|jsx)$/.test(ent.name)) out.push(p)
  }
  return out
}

for (const file of walk(root)) {
  let c = fs.readFileSync(file, 'utf8')
  const orig = c
  c = c.replace(/'(?=const )/g, "'\n")
  c = c.replace(/'(?=import )/g, "'\n")
  c = c.replace(/'(?=interface )/g, "'\n")
  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8')
    console.log('fixed:', path.relative(root, file))
  }
}
console.log('Done.')
