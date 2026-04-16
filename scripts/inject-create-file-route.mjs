/**
 * Injects `export const Route = createFileRoute(routeId)({ component })` into
 * every app route module (index.tsx / route.tsx) using the same route paths as
 * @tanstack/router-generator.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getConfig, physicalGetRouteNodes } from '@tanstack/router-generator'
import { createTokenRegex } from '../node_modules/@tanstack/router-generator/dist/esm/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const cfg = getConfig(
  {
    routesDirectory: './app',
    generatedRouteTree: './routeTree.gen.ts',
  },
  projectRoot,
)

const tokenRegexes = {
  indexTokenSegmentRegex: createTokenRegex(cfg.indexToken, { type: 'segment' }),
  routeTokenSegmentRegex: createTokenRegex(cfg.routeToken, { type: 'segment' }),
}

const { routeNodes } = await physicalGetRouteNodes(cfg, projectRoot, tokenRegexes)

function ensureCreateFileRouteImport(code) {
  if (/createFileRoute/.test(code)) return code
  const re =
    /import\s*\{([^}]*)\}\s*from\s*['"]@tanstack\/react-router['"]/
  const m = code.match(re)
  if (m) {
    const parts = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!parts.includes('createFileRoute')) parts.unshift('createFileRoute')
    return code.replace(re, `import { ${parts.join(', ')} } from '@tanstack/react-router'`)
  }
  return `import { createFileRoute } from '@tanstack/react-router'\n${code}`
}

function injectRoute(code, routePath) {
  const idLiteral = JSON.stringify(routePath)
  // verboseFileRoutes:false codegen can strip the path, leaving invalid `createFileRoute({`
  if (/export\s+const\s+Route\s*=\s*createFileRoute\s*\(\s*\{/.test(code)) {
    let fixed = code.replace(
      /export\s+const\s+Route\s*=\s*createFileRoute\s*\(\s*\{/,
      `export const Route = createFileRoute(${idLiteral})({`,
    )
    fixed = ensureCreateFileRouteImport(fixed)
    return { code: fixed, skipped: false }
  }
  if (/export\s+const\s+Route\s*=\s*createFileRoute\s*\(\s*['"`]/.test(code)) {
    return { code, skipped: true }
  }

  let c = ensureCreateFileRouteImport(code)

  const mDefaultFn = c.match(/export\s+default\s+function\s+(\w+)\b/)
  if (mDefaultFn) {
    const name = mDefaultFn[1]
    c = c.replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
    c = `${c.trimEnd()}\n\nexport const Route = createFileRoute(${idLiteral})({\n  component: ${name},\n})\n\nexport default ${name}\n`
    return { code: c, skipped: false }
  }

  const mEnd = c.match(/\n\s*export\s+default\s+(\w+)\s*;?\s*$/m)
  if (mEnd) {
    const name = mEnd[1]
    c = c.replace(/\n\s*export\s+default\s+\w+\s*;?\s*$/m, '')
    c = `${c.trimEnd()}\n\nexport const Route = createFileRoute(${idLiteral})({\n  component: ${name},\n})\n\nexport default ${name}\n`
    return { code: c, skipped: false }
  }

  return { code, skipped: 'unmatched' }
}

const seen = new Map()
for (const node of routeNodes) {
  const base = path.basename(node.fullPath)
  if (base === '__root.tsx') continue
  if (!/^(index|route)\.tsx$/.test(base)) continue
  if (seen.has(node.fullPath)) continue
  seen.set(node.fullPath, true)

  const rp = node.routePath
  if (rp === undefined || rp === null) {
    console.warn('No routePath for', node.fullPath)
    continue
  }

  const raw = fs.readFileSync(node.fullPath, 'utf8')
  const { code, skipped } = injectRoute(raw, rp)
  if (skipped === true) {
    console.log('already had Route:', path.relative(projectRoot, node.fullPath))
    continue
  }
  if (skipped === 'unmatched') {
    console.warn('SKIP (no default export pattern):', node.fullPath)
    continue
  }
  fs.writeFileSync(node.fullPath, code, 'utf8')
  console.log('updated:', path.relative(projectRoot, node.fullPath), '→', rp)
}

console.log('Done.')
