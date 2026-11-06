import { Link } from 'react-router-dom'
import { useContent, whatsappLink } from '../lib/content'
import { NAV } from './nav'
import Diamond from './Diamond'
import { Paragraphs } from './Markdown'

const fmtDate = (d, opts = { month: 'long', year: 'numeric' }) =>
  d ? new Date(d + (d.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('en-CA', opts) : ''

/* ---------------- Hero: portrait with the menu around it ---------------- */
export function HeroOrbit() {
  const { settings } = useContent()
  const left = NAV.slice(0, 3)
  const right = NAV.slice(3, 6)
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__stage">
        <nav className="hero__menu hero__menu--left" aria-label="Explore">
          {left.map((n) => (
            <OrbitLink key={n.to} {...n} />
          ))}
        </nav>

        <figure className="hero__portrait">
          <Diamond className="hero__dot" />
          <div className="hero__frame">
            <img
              src={settings.heroImage}
              alt={`Portrait of ${settings.siteName}`}
              width="768"
              height="1152"
              fetchpriority="high"
            />
          </div>
          <Chevrons />
        </figure>

        <nav className="hero__menu hero__menu--right" aria-label="Explore more">
          {right.map((n) => (
            <OrbitLink key={n.to} {...n} />
          ))}
        </nav>
      </div>

      <div className="hero__intro wrap">
        <h1 className="display">{settings.headline}</h1>
        <div className="hero__copy">
          <p className="serif-line">{settings.roles}.</p>
          <Paragraphs text={settings.intro} />
          <div className="btn-row">
            <Link to="/work-with-me" className="btn btn--primary">
              Work with Shima
            </Link>
            <Link to="/work-with-me?type=Speaking%20invitation" className="btn btn--ghost">
              Invite me to speak
            </Link>
          </div>
          {settings.currentlyBuilding && (
            <p className="hero__building">
              Currently building <Link to="/ventures">{settings.currentlyBuilding}</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function OrbitLink({ to, label, hint }) {
  return (
    <Link to={to} className="orbit-link">
      <span className="orbit-link__label">{label}</span>
      <span className="orbit-link__hint">{hint}</span>
    </Link>
  )
}

// Stacked chevrons from the logo, nested under the portrait's 45° point.
// The svg uses the portrait's own coordinates: 400 wide, point at y = 526.
const CHEVRONS = [
  { w: 176, color: 'grey' },
  { w: 132, color: 'purple' },
  { w: 88, color: 'grey' },
  { w: 44, color: 'purple' },
]
function Chevrons() {
  return (
    <svg className="hero__chevrons" viewBox="0 0 400 720" aria-hidden="true">
      {CHEVRONS.map(({ w, color }, i) => {
        const apex = 526 + (i + 1) * 42
        return (
          <polyline
            key={i}
            className={`chev chev--${color}`}
            style={{ '--i': i }}
            points={`${200 - w},${apex - w} 200,${apex} ${200 + w},${apex - w}`}
          />
        )
      })}
    </svg>
  )
}

/* ---------------- Section heading ---------------- */
export function SectionHead({ title, intro, link, linkLabel, tone }) {
  return (
    <div className={`section-head${tone ? ` section-head--${tone}` : ''}`}>
      <h2 className="h2">
        <Diamond /> {title}
      </h2>
      {intro && <p className="section-head__intro">{intro}</p>}
      {link && (
        <Link className="text-link" to={link}>
          {linkLabel}
        </Link>
      )}
    </div>
  )
}

/* ---------------- About ---------------- */
export function AboutBlock({ full = false }) {
  const { settings } = useContent()
  const paragraphs = (settings.aboutBody || '').split(/\n\s*\n/).filter(Boolean)
  return (
    <section className="section about">
      <div className="wrap about__grid">
        <figure className="about__image">
          <img src={settings.aboutImage} alt={`${settings.siteName}, seated`} loading="lazy" width="768" height="1152" />
        </figure>
        <div className="about__text">
          {!full && <SectionHead title="A little about Shima" />}
          {full && <p className="serif-line">{settings.roles}.</p>}
          <h3 className="h3">{settings.aboutTitle}</h3>
          {settings.aboutQuote && <blockquote className="pull">{settings.aboutQuote}</blockquote>}
          {(full ? paragraphs : paragraphs.slice(0, 1)).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {!full && (
            <Link to="/about" className="text-link">
              Read the full story
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------------- How I contribute ---------------- */
export function ContributeList({ showHead = true }) {
  const { contributions } = useContent()
  if (!contributions.length) return null
  return (
    <section className="section">
      <div className="wrap">
        {showHead && (
          <SectionHead
            title="How I contribute"
            intro="Different ways to work together, all rooted in building across borders."
            link="/contribute"
            linkLabel="See how we can work together"
          />
        )}
        <ul className="rows">
          {contributions.map((c) => (
            <li key={c.id} className="row">
              <h3 className="row__title">{c.title}</h3>
              <p className="row__text">{c.summary}</p>
              {c.image_url && <img className="row__img" src={c.image_url} alt="" loading="lazy" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Speaking ---------------- */
export function SpeakingStrip({ showHead = true }) {
  const { speaking } = useContent()
  if (!speaking.length) return null
  return (
    <section className="section section--dark">
      <div className="wrap">
        {showHead && (
          <SectionHead
            tone="dark"
            title="Speaking and appearances"
            intro="Stages, panels and conversations on travel, technology and building across borders."
            link="/speaking"
            linkLabel="All appearances"
          />
        )}
      </div>
      <ul className="strip" tabIndex={0} aria-label="Speaking engagements">
        {speaking.map((s) => {
          const inner = (
            <>
              {s.image_url && <img src={s.image_url} alt="" loading="lazy" />}
              <div className="poster__meta">
                <h3>{s.event}</h3>
                <p>{[s.role, s.location, fmtDate(s.event_date)].filter(Boolean).join(', ')}</p>
                {s.summary && <p className="poster__summary">{s.summary}</p>}
              </div>
            </>
          )
          return (
            <li key={s.id} className="poster">
              {s.link_url ? (
                <a href={s.link_url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ---------------- Ventures ---------------- */
export function VenturesBlock({ showHead = true }) {
  const { ventures } = useContent()
  if (!ventures.length) return null
  return (
    <section className="section">
      <div className="wrap">
        {showHead && <SectionHead title="What I'm building" link="/ventures" linkLabel="More on the ventures" />}
        <div className="ventures">
          {ventures.map((v) => (
            <article key={v.id} className={`venture${v.image_url ? '' : ' venture--plain'}`}>
              {v.image_url && (
                <div className="venture__img">
                  <img src={v.image_url} alt="" loading="lazy" />
                </div>
              )}
              <div className="venture__body">
                <p className="serif-line">{v.role}</p>
                <h3 className="venture__name">{v.name}</h3>
                {v.tagline && <p className="venture__tagline">{v.tagline}</p>}
                {v.description && <p>{v.description}</p>}
                {v.link_url && (
                  <a className="text-link" href={v.link_url} target="_blank" rel="noopener noreferrer">
                    Visit {v.name}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Press and writing ---------------- */
export function PressList({ showHead = true, limitPosts }) {
  const { press, posts } = useContent()
  const shownPosts = limitPosts ? posts.slice(0, limitPosts) : posts
  if (!press.length && !shownPosts.length) return null
  return (
    <section className="section section--mist">
      <div className="wrap">
        {showHead && (
          <SectionHead
            title="Perspectives"
            intro="Interviews, features and things I've written."
            link="/perspectives"
            linkLabel="All perspectives"
          />
        )}
        {press.length > 0 && (
          <ul className="press">
            {press.map((p) => {
              const body = (
                <>
                  <span className="press__outlet">{p.outlet}</span>
                  <span className="press__title">{p.title}</span>
                  {p.published_on && <span className="press__date">{fmtDate(p.published_on)}</span>}
                </>
              )
              return (
                <li key={p.id}>
                  {p.link_url ? (
                    <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="press__item">
                      {body}
                      <span className="press__read">Read</span>
                    </a>
                  ) : (
                    <div className="press__item">{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
        {shownPosts.length > 0 && (
          <>
            <h3 className="h3 posts-title">Writing</h3>
            <ul className="posts">
              {shownPosts.map((p) => (
                <li key={p.id}>
                  <Link to={`/blog/${p.slug}`} className="post-card">
                    {p.cover_url && <img src={p.cover_url} alt="" loading="lazy" />}
                    <span className="post-card__date">{fmtDate(p.published_at?.slice(0, 10), { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="post-card__title">{p.title}</span>
                    {p.excerpt && <span className="post-card__excerpt">{p.excerpt}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}

/* ---------------- Connect ---------------- */
export function ConnectBand() {
  const { settings } = useContent()
  const wa = whatsappLink(settings)
  return (
    <section className="connect">
      <div className="wrap connect__grid">
        <div>
          <h2 className="display display--light">{settings.contactTitle}</h2>
          <p className="connect__body">{settings.contactBody}</p>
          <div className="btn-row">
            <Link to="/work-with-me" className="btn btn--light">
              Book a conversation
            </Link>
            {wa && (
              <a href={wa} className="btn btn--outline-light" target="_blank" rel="noopener noreferrer">
                Message on WhatsApp
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="btn btn--outline-light">
                Send an email
              </a>
            )}
          </div>
        </div>
        {settings.connectImage && (
          <img className="connect__img" src={settings.connectImage} alt="" loading="lazy" width="768" height="1152" />
        )}
      </div>
    </section>
  )
}

export function PageHero({ title, intro }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="display">{title}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
      </div>
    </section>
  )
}
