/**
 * Vite cannot import from the `public/` folder. Replace
 *   import x from '@public/foo/bar.png'
 * with
 *   const x = '/foo/bar.png'
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const skip = new Set(['node_modules', 'dist', '.git'])

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(ent.name)) continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (/\.(tsx|ts|jsx|mjs)$/.test(ent.name)) out.push(p)
  }
  return out
}

// import name from '...' | "..."
const importRe =
  /^(\s*)import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]@public\/(.+?)['"](\s*);?/gm

for (const file of walk(root)) {
  if (file.includes(`${path.sep}scripts${path.sep}`) && file.endsWith('fix-public-imports.mjs'))
    continue
  let c = fs.readFileSync(file, 'utf8')
  const orig = c
  c = c.replace(importRe, (_, indent, name, rest) => {
    const url = `/${rest.replace(/\\/g, '/')}`
    return `${indent}const ${name} = '${url}'`
  })
  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8')
    console.log('updated:', path.relative(root, file))
  }
}

console.log('Done.')
