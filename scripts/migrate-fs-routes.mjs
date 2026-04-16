/**
 * One-time migration: Next.js app/ conventions → TanStack Router file routes.
 * - (group) folders → _group (pathless)
 * - [param] folders → $param
 * - page.tsx → index.tsx
 * - layout.tsx → route.tsx
 */
import { readdirSync, renameSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const appRoot = join(__dirname, '..', 'app')

function walkDirs(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      out.push(p)
      walkDirs(p, out)
    }
  }
  return out
}

const dirs = walkDirs(appRoot).sort(
  (a, b) => b.split(/[/\\]/).length - a.split(/[/\\]/).length,
)

for (const dir of dirs) {
  const name = dir.split(/[/\\]/).pop()
  let newName = name
  if (name.startsWith('(') && name.endsWith(')')) {
    newName = '_' + name.slice(1, -1)
  } else if (name.startsWith('[') && name.endsWith(']')) {
    newName = '$' + name.slice(1, -1)
  }
  if (newName !== name) {
    const parent = dir.slice(0, -name.length - 1)
    const target = join(parent, newName)
    if (!existsSync(target)) {
      renameSync(dir, target)
    }
  }
}

function walkFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkFiles(p, out)
    else out.push(p)
  }
  return out
}

for (const f of walkFiles(appRoot)) {
  const base = f.split(/[/\\]/).pop()
  if (base === 'page.tsx') {
    renameSync(f, join(f, '..', 'index.tsx'))
  } else if (base === 'layout.tsx') {
    renameSync(f, join(f, '..', 'route.tsx'))
  }
}

console.log('FS route migration done.')
