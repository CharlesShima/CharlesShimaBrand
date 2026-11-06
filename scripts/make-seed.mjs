// Regenerates supabase/seed.sql from src/content/defaults.js
// Usage: node scripts/make-seed.mjs
import { writeFileSync } from 'node:fs'
import * as d from '../src/content/defaults.js'

const q = (v) => (v === null || v === undefined || v === '' ? 'null' : `'${String(v).replace(/'/g, "''")}'`)
const block = (table, rows, cols) =>
  `insert into public.${table} (${cols.join(', ')})\nselect * from (values\n` +
  rows.map((r) => '  (' + cols.map((c) => (c === 'event_date' || c === 'published_on' ? (r[c] ? `${q(r[c])}::date` : 'null::date') : c === 'sort_order' ? r[c] ?? 0 : q(r[c]))).join(', ') + ')').join(',\n') +
  `\n) v(${cols.join(', ')})\nwhere not exists (select 1 from public.${table});\n`

const settings = { ...d.defaultSettings }
let sql = `-- Starter content for ShimaCharles.ca. Run once in Supabase → SQL Editor, after schema.sql.
-- Each block only inserts if the table is still empty, so re-running is harmless.

update public.site_settings set data = ${q(JSON.stringify(settings))}::jsonb
where key = 'main' and data = '{}'::jsonb;

`
sql += block('contributions', d.defaultContributions, ['title', 'summary', 'image_url', 'sort_order']) + '\n'
sql += block('speaking', d.defaultSpeaking, ['event', 'role', 'event_date', 'location', 'summary', 'image_url', 'link_url', 'sort_order']) + '\n'
sql += block('ventures', d.defaultVentures, ['name', 'role', 'tagline', 'description', 'image_url', 'link_url', 'sort_order']) + '\n'
sql += block('press', d.defaultPress, ['outlet', 'title', 'link_url', 'image_url', 'published_on', 'sort_order']) + '\n'
sql += block('booking_types', d.defaultBookingTypes, ['name', 'duration', 'description', 'sort_order'])
writeFileSync(new URL('../supabase/seed.sql', import.meta.url), sql)
console.log('Wrote supabase/seed.sql')
