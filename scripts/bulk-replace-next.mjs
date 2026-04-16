import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')

function walkSync(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkSync(p, out)
    else if (/\.(tsx|jsx)$/.test(name)) out.push(p)
  }
  return out
}

const files = [
  ...walkSync(join(root, 'app')),
  ...walkSync(join(root, 'components')),
]

let changed = 0
for (const file of files) {
  let s = readFileSync(file, 'utf8')
  const orig = s

  s = s.replace(/^['"]use client['"];\s*\r?\n/gm, '')

  s = s.replace(
    /import Image, \{ StaticImageData \} from ['"]next\/image['"]\s*\n?/g,
    '',
  )
  s = s.replace(/import Image from ['"]next\/image['"]\s*\n?/g, '')
  s = s.replace(/import\s+Image\s+from\s+['"]next\/image['"]\s*\n?/g, '')

  s = s.replace(
    /import Link from ['"]next\/link['"]/g,
    'import { Link } from "@tanstack/react-router"',
  )
  s = s.replace(
    /import\s+Link\s+from\s+['"]next\/link['"]/g,
    'import { Link } from "@tanstack/react-router"',
  )

  s = s.replace(/import Head from ['"]next\/head['"]\s*\n?/g, '')

  s = s.replace(/<Image\b/g, '<img')
  s = s.replace(/\s*width=\{0\}\s*height=\{0\}\s*/g, ' ')
  s = s.replace(/\s*height=\{0\}\s*width=\{0\}\s*/g, ' ')

  // JSX attribute href= on links (not __root head links object — those use href:)
  if (!file.endsWith('__root.tsx')) {
    s = s.replace(/\bhref=/g, 'to=')
  } else {
    // only child route links if any use Link href
    s = s.replace(/<Link[^>]*\bhref=/g, (m) => m.replace('href=', 'to='))
  }

  if (s !== orig) {
    writeFileSync(file, s, 'utf8')
    changed++
    console.log(relative(root, file))
  }
}

console.log('Updated files:', changed)
