// Runs after "vite build": writes dist/sitemap.xml with every page and published blog post.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'

// Read .env when building locally (GitHub Actions passes these as environment variables)
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
}

const site = (process.env.VITE_SITE_URL || 'https://shimacharles.ca').replace(/\/$/, '')
const pages = ['/', '/about', '/contribute', '/speaking', '/ventures', '/perspectives', '/work-with-me']
let posts = []

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY
if (url && key) {
  try {
    const res = await fetch(`${url}/rest/v1/posts?select=slug,published_at&published=eq.true`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    if (res.ok) posts = await res.json()
  } catch {
    console.warn('sitemap: could not load posts, writing pages only')
  }
}

const entry = (loc, lastmod) =>
  `  <url><loc>${site}${loc}</loc>${lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : ''}</url>`
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages.map((p) => entry(p)), ...posts.map((p) => entry(`/blog/${p.slug}`, p.published_at))].join('\n')}
</urlset>
`
writeFileSync('dist/sitemap.xml', xml)
console.log(`sitemap: ${pages.length} pages, ${posts.length} posts`)
