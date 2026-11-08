// Per-page SEO. Defaults come from your CMS settings (useContent); page props override them.
// Same props as before, so existing <Seo ... /> calls keep working. New optional props:
// imageAlt, article, jsonLd.
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useContent } from '../lib/content'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://shimacharles.ca').replace(/\/$/, '')
const PERSON_ID = `${SITE_URL}/#person`

// Fallbacks used only if a CMS setting is empty or still loading
const FALLBACK = {
  siteName: 'Charles Shima',
  seoTitle: 'Charles Shima | Architect of the Travelpreneur™ Economy & Global Speaker',
  seoDescription:
    'Charles Shima is the Architect of the Travelpreneur™ Economy, founder of Tourifique and ZaNiheza, and an entrepreneur, innovator, AI evangelist and global speaker connecting opportunities across Africa, Canada and the world.',
  ogImage: '/images/og-image.jpg',
  ogImageAlt: 'Charles Shima, entrepreneur, founder and global speaker',
}

const abs = (u) => (!u ? undefined : /^https?:/.test(u) ? u : SITE_URL + (u.startsWith('/') ? '' : '/') + u)

// Stops "</script>" inside text from breaking out of the JSON-LD tag
const safeJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

export default function Seo({
  title,              // page name, e.g. "Speaking"; leave empty on the home page
  description,
  image,
  imageAlt,
  type = 'website',   // "profile" on home, "article" on blog posts
  noindex = false,
  article,            // { publishedTime, modifiedTime, tags: [] } for blog posts
  jsonLd,             // extra schema object or array of objects
}) {
  const { settings = {} } = useContent() || {}
  const { pathname } = useLocation()

  const siteName = settings.siteName || FALLBACK.siteName
  const fullTitle = title ? `${title} | ${siteName}` : settings.seoTitle || FALLBACK.seoTitle
  const desc = description || settings.seoDescription || FALLBACK.seoDescription
  const img = abs(image || settings.ogImage || FALLBACK.ogImage)
  const alt = imageAlt || (title ? `${title}, ${siteName}` : FALLBACK.ogImageAlt)

  // Match the sitemap exactly: "https://shimacharles.ca/" for home, no trailing slash elsewhere
  const cleanPath = pathname.replace(/\/+$/, '') || '/'
  const url = cleanPath === '/' ? `${SITE_URL}/` : SITE_URL + cleanPath

  const schemas = []
  if (type === 'article' && article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: title,
      description: desc,
      url,
      mainEntityOfPage: url,
      image: img,
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      inLanguage: 'en',
      keywords: article.tags?.length ? article.tags.join(', ') : undefined,
      author: { '@type': 'Person', '@id': PERSON_ID, name: siteName, url: `${SITE_URL}/` },
      publisher: { '@type': 'Person', '@id': PERSON_ID, name: siteName, url: `${SITE_URL}/` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    })
  }
  if (jsonLd) schemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]))

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large'} />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {img && <meta property="og:image" content={img} />}
      {img && <meta property="og:image:alt" content={alt} />}
      {type === 'profile' && <meta property="profile:first_name" content="Charles" />}
      {type === 'profile' && <meta property="profile:last_name" content="Shima" />}
      {type === 'article' && article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {type === 'article' && article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={`${SITE_URL}/about`} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {img && <meta name="twitter:image" content={img} />}
      {img && <meta name="twitter:image:alt" content={alt} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{safeJson(s)}</script>
      ))}
    </Helmet>
  )
}
