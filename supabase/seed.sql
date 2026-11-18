-- Starter content for ShimaCharles.ca. Run once in Supabase → SQL Editor, after schema.sql.
-- Each block only inserts if the table is still empty, so re-running is harmless.

update public.site_settings set data = '{"siteName":"Charles Shima","seoTitle":"Charles Shima | Architect of the Travelpreneur™ Economy & Global Speaker","seoDescription":"Charles Shima helps travel creators turn what they know into income, beyond brand deals. Founder of Tourifique and global speaker on the creator economy, AI in travel, and Rwanda beyond safari.","ogImage":"/images/og-image.jpg","logoUrl":"/brand/logo-horizontal.png","logoLightUrl":"/brand/logo-horizontal-light.png","logoMarkUrl":"/brand/logo-mark.png","heroImage":"/images/charles-portrait.webp","aboutImage":"/images/charles-thinking.webp","connectImage":"/images/charles-ascot.webp","roles":"Architect of the Travelpreneur™ Economy and global speaker","headline":"Stop posting travel for free. Become a Travelpreneur™ — and get paid for what you know","intro":"I help travel creators turn what they know into income — beyond brand deals. Founder of Tourifique. Global speaker on the creator economy, AI in travel, and Rwanda beyond safari.","currentlyBuilding":"Tourifique and ZaNiheza","proofLine":"Orphaned at 13. Arrived in Canada at 19 with no money. Built a career at RBC, CMHC and BC Housing. Now building Tourifique, and speaking at Web Summit Vancouver, Black Travel Expo, and Phocuswright.","tickerItems":"Web Summit Vancouver\nBlack Travel Expo, Atlanta\nPhocuswright\nProColombia Vancouver Summit\nFounder Games\nTravel Trends\nBIPOC Foundation\nBlack Business Magazine","pathsTitle":"Two ways in. Pick the one that sounds like you.","painText":"You post consistently. Brands pay sometimes, then go quiet. Your knowledge lives in DMs you answer for free. You have followers, but no product, no email list, and no way for a traveller who loved your reel to book or buy anything. AI tools promise to help — you just don''t know which ones actually save time.","pathALabel":"Path A: Start","pathATitle":"Want to become a Travelpreneur™, but don''t know how to start?","pathABody":"Start here. Learn the model, pick your first offer, and launch it.","pathACta":"Start with the free guide","pathBLabel":"Path B: Monetise","pathBTitle":"Already a travel creator, but don''t know how to monetise?","pathBBody":"Earn beyond brand deals — webinars, coaching, e-guides, digital services, e-sims, and curated experiences. I am starting to build and test these five ways with creators.","pathBCta":"Book a coaching session","stepsTitle":"How it works","steps":"Package the knowledge | Choose one of the five income models.\nLet reels signal demand | Saves, shares and DMs show what travellers want before they book.\nUse AI for speed | Script, repurpose and reply faster. Your story and local expertise stay human; AI does the repetitive work.","aboutTitle":"A life across borders","aboutQuote":"","aboutBody":"I was born in Kinshasa, in the Democratic Republic of Congo, and raised in Rwanda. I lost my mother when I was 9 and my father when I was 13. In 1994, at 16, I fled Rwanda. At 19, I arrived in Canada with no money.\n\nIn Canada I built a career at RBC, CMHC and BC Housing.\n\nToday I''m building Tourifique, which connects Travellers, Travelpreneurs™ and Suppliers through short-form travel reels, and ZaNiheza, a travel tour company for immersive and cultural experiences in Rwanda. I speak at events including Web Summit Vancouver, Black Travel Expo and Phocuswright, on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.\n\nMy focus is simple: helping travel creators turn what they know into income, beyond brand deals. My work has been featured by BIPOC Foundation and Black Business Magazine.","speakingTopics":"Turn Your Travel Knowledge Into Income: 5 Ways Creators Can Earn Beyond Brand Deals\nAI in Travel: TikTok as a Travel Agent\nRwanda Beyond Safari","speakerReelUrl":"https://vt.tiktok.com/ZSpvyyYAm/","speakerReelLabel":"ProColombia Vancouver Summit","speakingCta":"Share the date, audience and theme, and I will reply with availability.","newsletterTitle":"The Travelpreneur Note","newsletterBody":"One idea a week on earning from travel knowledge.","guideTitle":"5 Ways Travel Creators Can Earn Beyond Brand Deals","guideBody":"Free with your email.","contactTitle":"Let''s build together","contactBody":"Invite me to speak, start a collaboration, or book a conversation. I read every message and reply personally.","email":"hello@shimacharles.ca","whatsapp":"","whatsappMessage":"Hello Charles, I found you through ShimaCharles.ca and I''d like to talk about ","location":"Canada and Rwanda","linkedin":"","instagram":"","tiktok":"","youtube":"","x":""}'::jsonb
where key = 'main' and data = '{}'::jsonb;

insert into public.contributions (title, summary, link_url, image_url, sort_order)
select * from (values
  ('Build with Tourifique', 'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.', 'https://tourifique.com', null, 1),
  ('Storytelling & content', 'Short-form video stories that turn viewers into bookers. Not just pretty reels — stories that sell the experience behind them.', null, null, 2),
  ('AI for travel creators', 'Use AI for four concrete jobs: scripting, repurposing one reel into a guide, itinerary or e-guide, following up on enquiries, and destination research. Plus: TikTok as a travel agent, and how AI is changing the way people find and book trips.', null, null, 3),
  ('Speaking', 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.', '/speaking', null, 4),
  ('Coaching & mentorship', 'Helping travel creators navigate their next chapter, from first offer to first income.', '/work-with-me?type=Coaching%20%26%20mentorship%20session', null, 5)
) v(title, summary, link_url, image_url, sort_order)
where not exists (select 1 from public.contributions);

insert into public.speaking (event, role, event_date, location, summary, image_url, link_url, sort_order)
select * from (values
  ('Black Innovation Zone at Web Summit Vancouver', null, '2025-05-27'::date, 'Vancouver, Canada', null, '/images/black-innovation-zone.webp', null, 1),
  ('Black Travel Expo 2025', null, '2025-06-27'::date, 'Atlanta, United States', null, '/images/black-travel-expo.webp', null, 2),
  ('ProColombia Vancouver Summit', 'Speaker reel', null::date, 'Vancouver, Canada', 'Watch the speaker reel on TikTok.', null, 'https://vt.tiktok.com/ZSpvyyYAm/', 3),
  ('Founder Games', 'Founder, Tourifique', null::date, null, null, '/images/founder-games-tourifique.webp', null, 4),
  ('Travel Trends', 'Featured guest', null::date, null, 'An immigrant who built an Afrocentric platform.', '/images/travel-trends.webp', null, 5)
) v(event, role, event_date, location, summary, image_url, link_url, sort_order)
where not exists (select 1 from public.speaking);

insert into public.ventures (name, role, tagline, description, image_url, link_url, sort_order)
select * from (values
  ('Tourifique', 'Founder and chief storyteller', 'Where creators earn and travellers book.', 'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.', '/images/founder-games-tourifique.webp', 'https://tourifique.com', 1),
  ('ZaNiheza', 'Founder', 'A travel tour company for immersive & cultural experiences in Rwanda.', 'Rwanda through its people — bespoke, local-led experiences above and beyond safari and wildlife, with the curators who live the culture.', null, 'https://zaniheza.com', 2)
) v(name, role, tagline, description, image_url, link_url, sort_order)
where not exists (select 1 from public.ventures);

insert into public.press (outlet, title, link_url, image_url, published_on, sort_order)
select * from (values
  ('BIPOC Foundation', 'Travel tech innovator', 'https://www.bipocfoundation.org/travel-tech-innovator/', null, null::date, 1),
  ('Black Business Magazine', 'Building a travelpreneurs'' ecosystem inside Tourifique', 'https://blackbusinessmagazine.ca/building-a-travelpreneurs-ecosystem-inside-tourifique/', null, null::date, 2),
  ('Travel Trends', 'An immigrant who built an Afrocentric platform', null, '/images/travel-trends.webp', null::date, 3)
) v(outlet, title, link_url, image_url, published_on, sort_order)
where not exists (select 1 from public.press);

insert into public.booking_types (name, duration, description, sort_order)
select * from (values
  ('Speaking invitation', 'Event', 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.', 1),
  ('Coaching & mentorship session', '60 min', 'For travel creators working from first offer to first income.', 2),
  ('Build with Tourifique', '30 min', 'For creators and suppliers who want to share and sell travel experiences through Tourifique.', 3),
  ('Storytelling & AI for creators', '45 min', 'Reels that turn viewers into bookers, and AI that does the repetitive work.', 4)
) v(name, duration, description, sort_order)
where not exists (select 1 from public.booking_types);
