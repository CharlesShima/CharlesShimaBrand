import { Link } from 'react-router-dom'
import { useContent, whatsappLink } from '../lib/content'
import { NAV } from './nav'

const SOCIALS = [
  ['linkedin', 'LinkedIn'],
  ['instagram', 'Instagram'],
  ['tiktok', 'TikTok'],
  ['youtube', 'YouTube'],
  ['x', 'X'],
]

export default function Footer() {
  const { settings } = useContent()
  const wa = whatsappLink(settings)
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <img className="site-footer__logo" src={settings.logoLightUrl} alt={settings.siteName} width="240" />
          {settings.location && <p className="site-footer__muted">{settings.location}</p>}
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="site-footer__contact">
          {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          )}
          <div className="site-footer__social">
            {SOCIALS.filter(([k]) => settings[k]).map(([k, label]) => (
              <a key={k} href={settings[k]} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap site-footer__base">
        <span>© {new Date().getFullYear()} {settings.siteName}</span>
      </div>
    </footer>
  )
}
