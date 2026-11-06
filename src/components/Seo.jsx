import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useContent } from '../lib/content'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://shimacharles.ca').replace(/\/$/, '')
const abs = (u) => (!u ? undefined : /^https?:/.test(u) ? u : SITE_URL + u)

export default function Seo({ title, description, image, type = 'website', noindex = false }) {
  const { settings } = useContent()
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${settings.siteName}` : settings.seoTitle
  const desc = description || settings.seoDescription
  const img = abs(image || settings.ogImage)
  const url = SITE_URL + pathname
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={settings.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {img && <meta property="og:image" content={img} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {img && <meta name="twitter:image" content={img} />}
    </Helmet>
  )
}
