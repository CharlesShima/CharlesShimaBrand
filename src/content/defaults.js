// Default content. The site shows this until the CMS (Supabase) has loaded,
// and uses it whenever a value hasn't been set in /admin yet.
// Everything here can be changed from the admin area — you don't need to edit this file.

export const defaultSettings = {
  siteName: 'Charles Shima',
  seoTitle: 'Charles Shima — Entrepreneur, founder and international speaker',
  seoDescription:
    'Charles Shima builds businesses, shares ideas and connects opportunities across Africa, Canada and the world. Founder of Tourifique and ZaNiheza.',
  ogImage: '/images/og-image.jpg',

  logoUrl: '/brand/logo-horizontal.png',
  logoLightUrl: '/brand/logo-horizontal-light.png',
  logoMarkUrl: '/brand/logo-mark.png',

  heroImage: '/images/charles-portrait.webp',
  aboutImage: '/images/charles-thinking.webp',
  connectImage: '/images/charles-ascot.webp',

  roles: 'Entrepreneur, founder and international speaker',
  headline: 'Building businesses. Connecting worlds. Creating opportunities.',
  intro:
    "I'm Charles Shima. I build businesses, share ideas and connect opportunities across Africa, Canada and the world.\n\nThrough entrepreneurship, storytelling and my international experiences, I explore what it means to build something meaningful, embrace change and create opportunities beyond borders.",
  currentlyBuilding: 'Tourifique and ZaNiheza',

  aboutTitle: 'A life across borders',
  aboutQuote: 'Every border I have crossed has taught me something about building.',
  aboutBody:
    "My story runs from the Democratic Republic of Congo and Rwanda to Canada, and back to Rwanda again. Each move asked me to start over, learn a new place and find the people who make things happen there.\n\nThose years shaped how I work today. I build ventures that connect people to places, I tell the stories behind them, and I help others who are crossing their own borders, whether that border is a country, a career or a first business.\n\nToday I divide my time between Canada and Rwanda, building Tourifique, a video-first travel discovery and booking platform, and ZaNiheza.",

  contactTitle: "Let's build something together",
  contactBody:
    'Invite me to speak, start a collaboration, or book a conversation. I read every message and reply personally.',

  email: 'hello@shimacharles.ca',
  whatsapp: '', // international format, digits only, e.g. 250788123456
  whatsappMessage: "Hello Charles, I found you through ShimaCharles.ca and I'd like to talk about ",
  location: 'Kigali, Rwanda and Canada',

  linkedin: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  x: '',
}

export const defaultContributions = [
  {
    id: 'c1',
    title: 'Coaching & mentorship',
    summary: 'Helping founders and professionals navigate their next chapter.',
    image_url: null,
    sort_order: 1,
  },
  {
    id: 'c2',
    title: 'Advisory & collaboration',
    summary: 'Sharing business experience, strategic perspectives and cross-border connections.',
    image_url: null,
    sort_order: 2,
  },
  {
    id: 'c3',
    title: 'Content & storytelling',
    summary: 'Sharing ideas, experiences and stories on LinkedIn, TikTok and other platforms.',
    image_url: null,
    sort_order: 3,
  },
  {
    id: 'c4',
    title: 'Cross-border living',
    summary: 'Helping people explore opportunities and build a life between Canada and Rwanda.',
    image_url: null,
    sort_order: 4,
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
    id: 's3',
    event: 'Founder Games',
    role: 'Founder, Tourifique',
    event_date: null,
    location: '',
    summary: '',
    image_url: '/images/founder-games-tourifique.webp',
    link_url: '',
    sort_order: 3,
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
    sort_order: 4,
  },
]

export const defaultVentures = [
  {
    id: 'v1',
    name: 'Tourifique',
    role: 'Founder and chief storyteller',
    tagline: 'Video-first travel discovery and booking.',
    description:
      'Tourifique helps travellers discover places through short video stories, then book the experiences behind them, with a focus on Africa and its diaspora.',
    image_url: '/images/founder-games-tourifique.webp',
    link_url: '',
    sort_order: 1,
  },
  {
    id: 'v2',
    name: 'ZaNiheza',
    role: 'Founder',
    tagline: 'A new venture, coming soon.',
    description: 'More about ZaNiheza will be shared here soon.',
    image_url: null,
    link_url: '',
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
  { id: 'b1', name: 'Speaking invitation', duration: 'Event', description: 'Keynotes, panels, fireside chats and moderation.', sort_order: 1 },
  { id: 'b2', name: 'Coaching & mentorship session', duration: '60 min', description: 'For founders and professionals working through their next chapter.', sort_order: 2 },
  { id: 'b3', name: 'Advisory call', duration: '45 min', description: 'Business strategy, travel tech and cross-border partnerships.', sort_order: 3 },
  { id: 'b4', name: 'Canada–Rwanda conversation', duration: '30 min', description: 'An informal conversation about building a life and work between the two countries.', sort_order: 4 },
]

export const defaultPosts = []
