-- =====================================================================
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
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
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
set data = data || '{"seoTitle":"Charles Shima | Architect of the Travelpreneur™ Economy & Global Speaker","seoDescription":"Charles Shima helps travel creators turn what they know into income, beyond brand deals. Founder of Tourifique and global speaker on the creator economy, AI in travel, and Rwanda beyond safari.","roles":"Architect of the Travelpreneur™ Economy and global speaker","headline":"Stop posting travel for free. Become a Travelpreneur™ — and get paid for what you know","intro":"I help travel creators turn what they know into income — beyond brand deals. Founder of Tourifique. Global speaker on the creator economy, AI in travel, and Rwanda beyond safari.","proofLine":"Orphaned at 13. Arrived in Canada at 19 with no money. Built a career at RBC, CMHC and BC Housing. Now building Tourifique, and speaking at Web Summit Vancouver, Black Travel Expo, and Phocuswright.","tickerItems":"Web Summit Vancouver\nBlack Travel Expo, Atlanta\nPhocuswright\nProColombia Vancouver Summit\nFounder Games\nTravel Trends\nBIPOC Foundation\nBlack Business Magazine","pathsTitle":"Two ways in. Pick the one that sounds like you.","painText":"You post consistently. Brands pay sometimes, then go quiet. Your knowledge lives in DMs you answer for free. You have followers, but no product, no email list, and no way for a traveller who loved your reel to book or buy anything. AI tools promise to help — you just don''t know which ones actually save time.","pathALabel":"Path A: Start","pathATitle":"Want to become a Travelpreneur™, but don''t know how to start?","pathABody":"Start here. Learn the model, pick your first offer, and launch it.","pathACta":"Start with the free guide","pathBLabel":"Path B: Monetise","pathBTitle":"Already a travel creator, but don''t know how to monetise?","pathBBody":"Earn beyond brand deals — webinars, coaching, e-guides, digital services, e-sims, and curated experiences. I am starting to build and test these five ways with creators.","pathBCta":"Book a coaching session","stepsTitle":"How it works","steps":"Package the knowledge | Choose one of the five income models.\nLet reels signal demand | Saves, shares and DMs show what travellers want before they book.\nUse AI for speed | Script, repurpose and reply faster. Your story and local expertise stay human; AI does the repetitive work.","aboutTitle":"A life across borders","aboutQuote":"","aboutBody":"I was born in Kinshasa, in the Democratic Republic of Congo, and raised in Rwanda. I lost my mother when I was 9 and my father when I was 13. In 1994, at 16, I fled Rwanda. At 19, I arrived in Canada with no money.\n\nIn Canada I built a career at RBC, CMHC and BC Housing.\n\nToday I''m building Tourifique, which connects Travellers, Travelpreneurs™ and Suppliers through short-form travel reels, and ZaNiheza, a travel tour company for immersive and cultural experiences in Rwanda. I speak at events including Web Summit Vancouver, Black Travel Expo and Phocuswright, on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.\n\nMy focus is simple: helping travel creators turn what they know into income, beyond brand deals. My work has been featured by BIPOC Foundation and Black Business Magazine.","speakingTopics":"Turn Your Travel Knowledge Into Income: 5 Ways Creators Can Earn Beyond Brand Deals\nAI in Travel: TikTok as a Travel Agent\nRwanda Beyond Safari","speakerReelUrl":"https://vt.tiktok.com/ZSpvyyYAm/","speakerReelLabel":"ProColombia Vancouver Summit","speakingCta":"Share the date, audience and theme, and I will reply with availability.","newsletterTitle":"The Travelpreneur Note","newsletterBody":"One idea a week on earning from travel knowledge.","guideTitle":"5 Ways Travel Creators Can Earn Beyond Brand Deals","guideBody":"Free with your email.","contactTitle":"Let''s build together","contactBody":"Invite me to speak, start a collaboration, or book a conversation. I read every message and reply personally.","location":"Canada and Rwanda"}'::jsonb,
    updated_at = now()
where key = 'main';

-- 3. "How I help": hide the four old offers, add the five new ones ------
update public.contributions set published = false
where title in ('Advisory & collaboration', 'Content & storytelling', 'Cross-border living');

update public.contributions
set summary = 'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.', link_url = 'https://tourifique.com', sort_order = 1, published = true
where title = 'Build with Tourifique';
insert into public.contributions (title, summary, link_url, sort_order, published)
select 'Build with Tourifique', 'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.', 'https://tourifique.com', 1, true
where not exists (select 1 from public.contributions where title = 'Build with Tourifique');

update public.contributions
set summary = 'Short-form video stories that turn viewers into bookers. Not just pretty reels — stories that sell the experience behind them.', link_url = null, sort_order = 2, published = true
where title = 'Storytelling & content';
insert into public.contributions (title, summary, link_url, sort_order, published)
select 'Storytelling & content', 'Short-form video stories that turn viewers into bookers. Not just pretty reels — stories that sell the experience behind them.', null, 2, true
where not exists (select 1 from public.contributions where title = 'Storytelling & content');

update public.contributions
set summary = 'Use AI for four concrete jobs: scripting, repurposing one reel into a guide, itinerary or e-guide, following up on enquiries, and destination research. Plus: TikTok as a travel agent, and how AI is changing the way people find and book trips.', link_url = null, sort_order = 3, published = true
where title = 'AI for travel creators';
insert into public.contributions (title, summary, link_url, sort_order, published)
select 'AI for travel creators', 'Use AI for four concrete jobs: scripting, repurposing one reel into a guide, itinerary or e-guide, following up on enquiries, and destination research. Plus: TikTok as a travel agent, and how AI is changing the way people find and book trips.', null, 3, true
where not exists (select 1 from public.contributions where title = 'AI for travel creators');

update public.contributions
set summary = 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.', link_url = '/speaking', sort_order = 4, published = true
where title = 'Speaking';
insert into public.contributions (title, summary, link_url, sort_order, published)
select 'Speaking', 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.', '/speaking', 4, true
where not exists (select 1 from public.contributions where title = 'Speaking');

update public.contributions
set summary = 'Helping travel creators navigate their next chapter, from first offer to first income.', link_url = '/work-with-me?type=Coaching%20%26%20mentorship%20session', sort_order = 5, published = true
where title = 'Coaching & mentorship';
insert into public.contributions (title, summary, link_url, sort_order, published)
select 'Coaching & mentorship', 'Helping travel creators navigate their next chapter, from first offer to first income.', '/work-with-me?type=Coaching%20%26%20mentorship%20session', 5, true
where not exists (select 1 from public.contributions where title = 'Coaching & mentorship');

-- 4. Ventures: correct Tourifique, and ZaNiheza is live -----------------
update public.ventures
set role = 'Founder and chief storyteller', tagline = 'Where creators earn and travellers book.', description = 'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.', link_url = 'https://tourifique.com'
where lower(name) = 'tourifique';

update public.ventures
set name = 'ZaNiheza', role = 'Founder', tagline = 'A travel tour company for immersive & cultural experiences in Rwanda.', description = 'Rwanda through its people — bespoke, local-led experiences above and beyond safari and wildlife, with the curators who live the culture.', link_url = 'https://zaniheza.com'
where lower(name) = 'zaniheza';

-- 5. Speaking: add the ProColombia speaker reel --------------------------
insert into public.speaking (event, role, location, summary, link_url, sort_order, published)
select 'ProColombia Vancouver Summit', 'Speaker reel', 'Vancouver, Canada', 'Watch the speaker reel on TikTok.', 'https://vt.tiktok.com/ZSpvyyYAm/', 3, true
where not exists (select 1 from public.speaking where event = 'ProColombia Vancouver Summit');
update public.speaking set sort_order = 4 where event = 'Founder Games';
update public.speaking set sort_order = 5 where event = 'Travel Trends';

-- 6. Booking options: match the new offers -------------------------------
update public.booking_types set active = false where name in ('Advisory call', 'Canada–Rwanda conversation');
update public.booking_types set description = 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.' where name = 'Speaking invitation';
update public.booking_types set description = 'For travel creators working from first offer to first income.' where name = 'Coaching & mentorship session';
insert into public.booking_types (name, duration, description, sort_order, active)
select 'Build with Tourifique', '30 min', 'For creators and suppliers who want to share and sell travel experiences through Tourifique.', 3, true
where not exists (select 1 from public.booking_types where name = 'Build with Tourifique');
insert into public.booking_types (name, duration, description, sort_order, active)
select 'Storytelling & AI for creators', '45 min', 'Reels that turn viewers into bookers, and AI that does the repetitive work.', 4, true
where not exists (select 1 from public.booking_types where name = 'Storytelling & AI for creators');
