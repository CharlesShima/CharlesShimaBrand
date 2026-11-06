-- Starter content for ShimaCharles.ca. Run once in Supabase → SQL Editor, after schema.sql.
-- Each block only inserts if the table is still empty, so re-running is harmless.

update public.site_settings set data = '{"siteName":"Charles Shima","seoTitle":"Charles Shima — Entrepreneur, founder and international speaker","seoDescription":"Charles Shima builds businesses, shares ideas and connects opportunities across Africa, Canada and the world. Founder of Tourifique and ZaNiheza.","ogImage":"/images/og-image.jpg","logoUrl":"/brand/logo-horizontal.png","logoLightUrl":"/brand/logo-horizontal-light.png","logoMarkUrl":"/brand/logo-mark.png","heroImage":"/images/charles-portrait.webp","aboutImage":"/images/charles-thinking.webp","connectImage":"/images/charles-ascot.webp","roles":"Entrepreneur, founder and international speaker","headline":"Building businesses. Connecting worlds. Creating opportunities.","intro":"I''m Charles Shima. I build businesses, share ideas and connect opportunities across Africa, Canada and the world.\n\nThrough entrepreneurship, storytelling and my international experiences, I explore what it means to build something meaningful, embrace change and create opportunities beyond borders.","currentlyBuilding":"Tourifique and ZaNiheza","aboutTitle":"A life across borders","aboutQuote":"Every border I have crossed has taught me something about building.","aboutBody":"My story runs from the Democratic Republic of Congo and Rwanda to Canada, and back to Rwanda again. Each move asked me to start over, learn a new place and find the people who make things happen there.\n\nThose years shaped how I work today. I build ventures that connect people to places, I tell the stories behind them, and I help others who are crossing their own borders, whether that border is a country, a career or a first business.\n\nToday I divide my time between Canada and Rwanda, building Tourifique, a video-first travel discovery and booking platform, and ZaNiheza.","contactTitle":"Let''s build something together","contactBody":"Invite me to speak, start a collaboration, or book a conversation. I read every message and reply personally.","email":"hello@shimacharles.ca","whatsapp":"","whatsappMessage":"Hello Charles, I found you through ShimaCharles.ca and I''d like to talk about ","location":"Kigali, Rwanda and Canada","linkedin":"","instagram":"","tiktok":"","youtube":"","x":""}'::jsonb
where key = 'main' and data = '{}'::jsonb;

insert into public.contributions (title, summary, image_url, sort_order)
select * from (values
  ('Coaching & mentorship', 'Helping founders and professionals navigate their next chapter.', null, 1),
  ('Advisory & collaboration', 'Sharing business experience, strategic perspectives and cross-border connections.', null, 2),
  ('Content & storytelling', 'Sharing ideas, experiences and stories on LinkedIn, TikTok and other platforms.', null, 3),
  ('Cross-border living', 'Helping people explore opportunities and build a life between Canada and Rwanda.', null, 4)
) v(title, summary, image_url, sort_order)
where not exists (select 1 from public.contributions);

insert into public.speaking (event, role, event_date, location, summary, image_url, link_url, sort_order)
select * from (values
  ('Black Innovation Zone at Web Summit Vancouver', null, '2025-05-27'::date, 'Vancouver, Canada', null, '/images/black-innovation-zone.webp', null, 1),
  ('Black Travel Expo 2025', null, '2025-06-27'::date, 'Atlanta, United States', null, '/images/black-travel-expo.webp', null, 2),
  ('Founder Games', 'Founder, Tourifique', null::date, null, null, '/images/founder-games-tourifique.webp', null, 3),
  ('Travel Trends', 'Featured guest', null::date, null, 'An immigrant who built an Afrocentric platform.', '/images/travel-trends.webp', null, 4)
) v(event, role, event_date, location, summary, image_url, link_url, sort_order)
where not exists (select 1 from public.speaking);

insert into public.ventures (name, role, tagline, description, image_url, link_url, sort_order)
select * from (values
  ('Tourifique', 'Founder and chief storyteller', 'Video-first travel discovery and booking.', 'Tourifique helps travellers discover places through short video stories, then book the experiences behind them, with a focus on Africa and its diaspora.', '/images/founder-games-tourifique.webp', null, 1),
  ('ZaNiheza', 'Founder', 'A new venture, coming soon.', 'More about ZaNiheza will be shared here soon.', null, null, 2)
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
  ('Speaking invitation', 'Event', 'Keynotes, panels, fireside chats and moderation.', 1),
  ('Coaching & mentorship session', '60 min', 'For founders and professionals working through their next chapter.', 2),
  ('Advisory call', '45 min', 'Business strategy, travel tech and cross-border partnerships.', 3),
  ('Canada–Rwanda conversation', '30 min', 'An informal conversation about building a life and work between the two countries.', 4)
) v(name, duration, description, sort_order)
where not exists (select 1 from public.booking_types);
