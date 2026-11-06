import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContent } from '../lib/content'
import { NAV } from './nav'
import Diamond from './Diamond'

export default function Header() {
  const { settings } = useContent()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header${isHome ? ' is-home' : ''}`}>
      <div className="site-header__bar">
        <Link to="/" className="site-header__logo" aria-label={`${settings.siteName}, home`}>
          <img src={settings.logoUrl} alt={settings.siteName} width="220" height="40" />
        </Link>

        <nav className="site-header__nav" aria-label="Main">
          {NAV.slice(0, 5).map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/work-with-me" className="btn btn--primary btn--small site-header__cta">
          Work with me
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-toggle__lines" aria-hidden="true" />
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          <NavLink to="/" end className="mobile-menu__link">
            <Diamond /> Home
          </NavLink>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="mobile-menu__link">
              <Diamond /> {item.label}
              <small>{item.hint}</small>
            </NavLink>
          ))}
        </nav>
        <img className="mobile-menu__logo" src={settings.logoLightUrl} alt="" />
      </div>
    </header>
  )
}
