// Default content. The site shows this until the CMS (Supabase) has loaded,
// and uses it whenever a value hasn't been set in /admin yet.
// Everything here can be changed from the admin area — you don't need to edit this file.
// Spelling to keep: Travelpreneur™, Tourifique, ZaNiheza (capital Z, capital N).

export const defaultSettings = {
  siteName: 'Charles Shima',
  seoTitle: 'Charles Shima | Architect of the Travelpreneur™ Economy & Global Speaker',
  seoDescription:
    'Charles Shima helps travel creators turn what they know into income, beyond brand deals. Founder of Tourifique and global speaker on the creator economy, AI in travel, and Rwanda beyond safari.',
  ogImage: '/images/og-image.jpg',

  logoUrl: '/brand/logo-horizontal.png',
  logoLightUrl: '/brand/logo-horizontal-light.png',
  logoMarkUrl: '/brand/logo-mark.png',

  heroImage: '/images/charles-portrait.webp',
  aboutImage: '/images/charles-thinking.webp',
  connectImage: '/images/charles-ascot.webp',

  // Hero
  roles: 'Architect of the Travelpreneur™ Economy and global speaker',
  headline: 'Stop posting travel for free. Become a Travelpreneur™ — and get paid for what you know',
  intro:
    'I help travel creators turn what they know into income — beyond brand deals. Founder of Tourifique. Global speaker on the creator economy, AI in travel, and Rwanda beyond safari.',
  currentlyBuilding: 'Tourifique and ZaNiheza',

  // Proof
  proofLine:
    'Orphaned at 13. Arrived in Canada at 19 with no money. Built a career at RBC, CMHC and BC Housing. Now building Tourifique, and speaking at Web Summit Vancouver, Black Travel Expo, and Phocuswright.',
  tickerItems:
    'Web Summit Vancouver\nBlack Travel Expo, Atlanta\nPhocuswright\nProColombia Vancouver Summit\nFounder Games\nTravel Trends\nBIPOC Foundation\nBlack Business Magazine',

  // Two paths
  pathsTitle: 'Two ways in. Pick the one that sounds like you.',
  painText:
    "You post consistently. Brands pay sometimes, then go quiet. Your knowledge lives in DMs you answer for free. You have followers, but no product, no email list, and no way for a traveller who loved your reel to book or buy anything. AI tools promise to help — you just don't know which ones actually save time.",
  pathALabel: 'Path A: Start',
  pathATitle: "Want to become a Travelpreneur™, but don't know how to start?",
  pathABody: 'Start here. Learn the model, pick your first offer, and launch it.',
  pathACta: 'Start with the free guide',
  pathBLabel: 'Path B: Monetise',
  pathBTitle: "Already a travel creator, but don't know how to monetise?",
  pathBBody:
    'Earn beyond brand deals — webinars, coaching, e-guides, digital services, e-sims, and curated experiences. I am starting to build and test these five ways with creators.',
  pathBCta: 'Book a coaching session',

  // How it works
  stepsTitle: 'How it works',
  steps:
    'Package the knowledge | Choose one of the five income models.\nLet reels signal demand | Saves, shares and DMs show what travellers want before they book.\nUse AI for speed | Script, repurpose and reply faster. Your story and local expertise stay human; AI does the repetitive work.',

  // About
  aboutTitle: 'A life across borders',
  aboutQuote: '', // optional pull quote on the About page
  aboutBody:
    "I was born in Kinshasa, in the Democratic Republic of Congo, and raised in Rwanda. I lost my mother when I was 9 and my father when I was 13. In 1994, at 16, I fled Rwanda. At 19, I arrived in Canada with no money.\n\nIn Canada I built a career at RBC, CMHC and BC Housing.\n\nToday I'm building Tourifique, which connects Travellers, Travelpreneurs™ and Suppliers through short-form travel reels, and ZaNiheza, a travel tour company for immersive and cultural experiences in Rwanda. I speak at events including Web Summit Vancouver, Black Travel Expo and Phocuswright, on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.\n\nMy focus is simple: helping travel creators turn what they know into income, beyond brand deals. My work has been featured by BIPOC Foundation and Black Business Magazine.",

  // Speaking
  speakingTopics:
    'Turn Your Travel Knowledge Into Income: 5 Ways Creators Can Earn Beyond Brand Deals\nAI in Travel: TikTok as a Travel Agent\nRwanda Beyond Safari',
  speakerReelUrl: 'https://vt.tiktok.com/ZSpvyyYAm/',
  speakerReelLabel: 'ProColombia Vancouver Summit',
  speakingCta: 'Share the date, audience and theme, and I will reply with availability.',

  // Newsletter
  newsletterTitle: 'The Travelpreneur Note',
  newsletterBody: 'One idea a week on earning from travel knowledge.',
  guideTitle: '5 Ways Travel Creators Can Earn Beyond Brand Deals',
  guideBody: 'Free with your email.',

  // Contact
  contactTitle: "Let's build together",
  contactBody:
    'Invite me to speak, start a collaboration, or book a conversation. I read every message and reply personally.',

  email: 'hello@shimacharles.ca',
  whatsapp: '',
  whatsappMessage: "Hello Charles, I found you through ShimaCharles.ca and I'd like to talk about ",
  location: 'Canada and Rwanda',

  linkedin: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  x: '',
}

// "How I help" — the five offers, in order
export const defaultContributions = [
  {
    id: 'c1',
    title: 'Build with Tourifique',
    summary:
      'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.',
    link_url: 'https://tourifique.com',
    image_url: null,
    sort_order: 1,
  },
  {
    id: 'c2',
    title: 'Storytelling & content',
    summary:
      'Short-form video stories that turn viewers into bookers. Not just pretty reels — stories that sell the experience behind them.',
    link_url: '',
    image_url: null,
    sort_order: 2,
  },
  {
    id: 'c3',
    title: 'AI for travel creators',
    summary:
      'Use AI for four concrete jobs: scripting, repurposing one reel into a guide, itinerary or e-guide, following up on enquiries, and destination research. Plus: TikTok as a travel agent, and how AI is changing the way people find and book trips.',
    link_url: '',
    image_url: null,
    sort_order: 3,
  },
  {
    id: 'c4',
    title: 'Speaking',
    summary: 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.',
    link_url: '/speaking',
    image_url: null,
    sort_order: 4,
  },
  {
    id: 'c5',
    title: 'Coaching & mentorship',
    summary: 'Helping travel creators navigate their next chapter, from first offer to first income.',
    link_url: '/work-with-me?type=Coaching%20%26%20mentorship%20session',
    image_url: null,
    sort_order: 5,
  },
]

export const defaultSpeaking = [
  {
    id: 's1',
    event: 'Black Innovation Zone at Web Summit Vancouver',
    role: '',
    event_date: '2025-05-27',
    location: 'Vancouver, Canada',
    summary: '',
    image_url: '/images/black-innovation-zone.webp',
    link_url: '',
    sort_order: 1,
  },
  {
    id: 's2',
    event: 'Black Travel Expo 2025',
    role: '',
    event_date: '2025-06-27',
    location: 'Atlanta, United States',
    summary: '',
    image_url: '/images/black-travel-expo.webp',
    link_url: '',
    sort_order: 2,
  },
  {
    id: 's5',
    event: 'ProColombia Vancouver Summit',
    role: 'Speaker reel',
    event_date: null,
    location: 'Vancouver, Canada',
    summary: 'Watch the speaker reel on TikTok.',
    image_url: null,
    link_url: 'https://vt.tiktok.com/ZSpvyyYAm/',
    sort_order: 3,
  },
  {
    id: 's3',
    event: 'Founder Games',
    role: 'Founder, Tourifique',
    event_date: null,
    location: '',
    summary: '',
    image_url: '/images/founder-games-tourifique.webp',
    link_url: '',
    sort_order: 4,
  },
  {
    id: 's4',
    event: 'Travel Trends',
    role: 'Featured guest',
    event_date: null,
    location: '',
    summary: 'An immigrant who built an Afrocentric platform.',
    image_url: '/images/travel-trends.webp',
    link_url: '',
    sort_order: 5,
  },
]

export const defaultVentures = [
  {
    id: 'v1',
    name: 'Tourifique',
    role: 'Founder and chief storyteller',
    tagline: 'Where creators earn and travellers book.',
    description:
      'Tourifique connects Travellers, Travelpreneurs and Suppliers through short-form travel reels — discover through video, book the experience behind it, and let creators earn from their knowledge.',
    image_url: '/images/founder-games-tourifique.webp',
    link_url: 'https://tourifique.com',
    sort_order: 1,
  },
  {
    id: 'v2',
    name: 'ZaNiheza',
    role: 'Founder',
    tagline: 'A travel tour company for immersive & cultural experiences in Rwanda.',
    description:
      'Rwanda through its people — bespoke, local-led experiences above and beyond safari and wildlife, with the curators who live the culture.',
    image_url: null,
    link_url: 'https://zaniheza.com',
    sort_order: 2,
  },
]

export const defaultPress = [
  {
    id: 'p1',
    outlet: 'BIPOC Foundation',
    title: 'Travel tech innovator',
    link_url: 'https://www.bipocfoundation.org/travel-tech-innovator/',
    image_url: null,
    published_on: null,
    sort_order: 1,
  },
  {
    id: 'p2',
    outlet: 'Black Business Magazine',
    title: "Building a travelpreneurs' ecosystem inside Tourifique",
    link_url: 'https://blackbusinessmagazine.ca/building-a-travelpreneurs-ecosystem-inside-tourifique/',
    image_url: null,
    published_on: null,
    sort_order: 2,
  },
  {
    id: 'p3',
    outlet: 'Travel Trends',
    title: 'An immigrant who built an Afrocentric platform',
    link_url: '',
    image_url: '/images/travel-trends.webp',
    published_on: null,
    sort_order: 3,
  },
]

export const defaultBookingTypes = [
  { id: 'b1', name: 'Speaking invitation', duration: 'Event', description: 'Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari.', sort_order: 1 },
  { id: 'b2', name: 'Coaching & mentorship session', duration: '60 min', description: 'For travel creators working from first offer to first income.', sort_order: 2 },
  { id: 'b5', name: 'Build with Tourifique', duration: '30 min', description: 'For creators and suppliers who want to share and sell travel experiences through Tourifique.', sort_order: 3 },
  { id: 'b6', name: 'Storytelling & AI for creators', duration: '45 min', description: 'Reels that turn viewers into bookers, and AI that does the repetitive work.', sort_order: 4 },
]

export const defaultPosts = []
