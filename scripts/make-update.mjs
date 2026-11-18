// Writes supabase/update-2026-11-travelpreneur.sql: brings an existing live database
// up to the Travelpreneur™ copy. Usage: node scripts/make-update.mjs
import { writeFileSync } from 'node:fs'
import * as d from '../src/content/defaults.js'

const q = (v) => (v === null || v === undefined || v === '' ? 'null' : `'${String(v).replace(/'/g, "''")}'`)
const keys = [
  'seoTitle', 'seoDescription', 'roles', 'headline', 'intro', 'proofLine', 'tickerItems',
  'pathsTitle', 'painText', 'pathALabel', 'pathATitle', 'pathABody', 'pathACta',
  'pathBLabel', 'pathBTitle', 'pathBBody', 'pathBCta', 'stepsTitle', 'steps',
  'aboutTitle', 'aboutQuote', 'aboutBody', 'speakingTopics', 'speakerReelUrl', 'speakerReelLabel',
  'speakingCta', 'newsletterTitle', 'newsletterBody', 'guideTitle', 'guideBody',
  'contactTitle', 'contactBody', 'location',
]
const patch = Object.fromEntries(keys.map((k) => [k, d.defaultSettings[k]]))
const offers = d.defaultContributions
const t = d.defaultVentures.find((v) => v.name === 'Tourifique')
const z = d.defaultVentures.find((v) => v.name === 'ZaNiheza')
const pc = d.defaultSpeaking.find((s) => s.event.startsWith('ProColombia'))
const newTypes = d.defaultBookingTypes.filter((b) => ['b5', 'b6'].includes(b.id))

const sql = `-- =====================================================================
-- ShimaCharles.ca — November 2026 update: the Travelpreneur™ focus
-- Run ONCE in Supabase → SQL Editor → New query → Run, after updating the code.
-- It changes only the text listed here. Your images, email, WhatsApp number and
-- social links stay as they are. Old offers and booking options are hidden, not
-- deleted, so you can switch them back on in /admin.
-- =====================================================================

-- 1. New pieces the new design needs ------------------------------------
alter table public.contributions add column if not exists link_url text;

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' and char_length(email) <= 254),
  source text check (source is null or char_length(source) <= 40),
  created_at timestamptz default now()
);
alter table public.subscribers enable row level security;
drop policy if exists "anyone can subscribe" on public.subscribers;
create policy "anyone can subscribe" on public.subscribers for insert with check (true);
drop policy if exists "admin manage" on public.subscribers;
create policy "admin manage" on public.subscribers for all using (public.is_admin()) with check (public.is_admin());

-- 2. Site text: hero, two paths, proof, about, speaking, newsletter -----
update public.site_settings
set data = data || ${q(JSON.stringify(patch))}::jsonb,
    updated_at = now()
where key = 'main';

-- 3. "How I help": hide the four old offers, add the five new ones ------
update public.contributions set published = false
where title in ('Advisory & collaboration', 'Content & storytelling', 'Cross-border living');

${offers
  .map(
    (o) => `update public.contributions
set summary = ${q(o.summary)}, link_url = ${q(o.link_url)}, sort_order = ${o.sort_order}, published = true
where title = ${q(o.title)};
insert into public.contributions (title, summary, link_url, sort_order, published)
select ${q(o.title)}, ${q(o.summary)}, ${q(o.link_url)}, ${o.sort_order}, true
where not exists (select 1 from public.contributions where title = ${q(o.title)});`
  )
  .join('\n\n')}

-- 4. Ventures: correct Tourifique, and ZaNiheza is live -----------------
update public.ventures
set role = ${q(t.role)}, tagline = ${q(t.tagline)}, description = ${q(t.description)}, link_url = ${q(t.link_url)}
where lower(name) = 'tourifique';

update public.ventures
set name = 'ZaNiheza', role = ${q(z.role)}, tagline = ${q(z.tagline)}, description = ${q(z.description)}, link_url = ${q(z.link_url)}
where lower(name) = 'zaniheza';

-- 5. Speaking: add the ProColombia speaker reel --------------------------
insert into public.speaking (event, role, location, summary, link_url, sort_order, published)
select ${q(pc.event)}, ${q(pc.role)}, ${q(pc.location)}, ${q(pc.summary)}, ${q(pc.link_url)}, ${pc.sort_order}, true
where not exists (select 1 from public.speaking where event = ${q(pc.event)});
update public.speaking set sort_order = 4 where event = 'Founder Games';
update public.speaking set sort_order = 5 where event = 'Travel Trends';

-- 6. Booking options: match the new offers -------------------------------
update public.booking_types set active = false where name in ('Advisory call', 'Canada–Rwanda conversation');
${d.defaultBookingTypes
  .filter((b) => ['b1', 'b2'].includes(b.id))
  .map((b) => `update public.booking_types set description = ${q(b.description)} where name = ${q(b.name)};`)
  .join('\n')}
${newTypes
  .map(
    (b) => `insert into public.booking_types (name, duration, description, sort_order, active)
select ${q(b.name)}, ${q(b.duration)}, ${q(b.description)}, ${b.sort_order}, true
where not exists (select 1 from public.booking_types where name = ${q(b.name)});`
  )
  .join('\n')}
`
writeFileSync(new URL('../supabase/update-2026-11-travelpreneur.sql', import.meta.url), sql)
console.log('Wrote supabase/update-2026-11-travelpreneur.sql')
