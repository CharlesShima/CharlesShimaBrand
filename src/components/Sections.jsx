import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent, whatsappLink } from '../lib/content'
import { supabase } from '../lib/supabase'
import Diamond from './Diamond'
import Reveal from './Reveal'
import { Paragraphs } from './Markdown'

const fmtDate = (d, opts = { month: 'long', year: 'numeric' }) =>
  d ? new Date(d + (d.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('en-CA', opts) : ''

const lines = (text) =>
  (text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

const isExternal = (url) => /^https?:\/\//.test(url || '')

// Internal links use the router, external ones open in a new tab
function SmartLink({ to, children, ...rest }) {
  if (!to) return <span {...rest}>{children}</span>
  if (to.startsWith('#')) return <a href={to} {...rest}>{children}</a>
  if (isExternal(to))
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
)

/* ---------------- Hero: one promise, with the logo-shaped portrait ---------------- */
export function HeroPromise() {
  const { settings } = useContent()
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <Diamond /> {settings.siteName}, {settings.roles}
          </p>
          <h1 id="hero-title" className="display hero__title">
            {splitWords(settings.headline)}
          </h1>
          <p className="hero__sub">{settings.intro}</p>
          <div className="btn-row">
            <a href="#guide" className="btn btn--primary">
              Get the free guide
            </a>
            <Link to="/work-with-me?type=Speaking%20invitation" className="btn btn--ghost">
              Invite me to speak
            </Link>
          </div>
        </div>
        <HeroPortrait />
      </div>
    </section>
  )
}

// Each word animates in on load; screen readers still read one sentence.
function splitWords(text) {
  return (text || '').split(' ').map((w, i, all) => (
    <Fragment key={i}>
      <span className="word" style={{ '--w': i }}>
        {w}
      </span>
      {i < all.length - 1 ? ' ' : null}
    </Fragment>
  ))
}

function HeroPortrait() {
  const { settings } = useContent()
  return (
    <figure className="hero__portrait">
      <span className="hero__halo" aria-hidden="true" />
      <Diamond className="hero__dot" />
      <div className="hero__frame">
        <img src={settings.heroImage} alt={`Portrait of ${settings.siteName}`} width="768" height="1152" fetchpriority="high" />
      </div>
      <Chevrons />
    </figure>
  )
}

// Stacked chevrons from the logo, nested under the portrait's 45° point.
// The svg uses the portrait's own coordinates: 400 wide, point at y = 526.
const CHEVRONS = [
  { w: 176, color: 'grey' },
  { w: 132, color: 'purple' },
  { w: 88, color: 'marigold' },
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

/* ---------------- Ticker: stages and features ---------------- */
export function Ticker() {
  const { settings } = useContent()
  const items = lines(settings.tickerItems)
  if (!items.length) return null
  const row = (hidden) => (
    <ul className="ticker__row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i}>
          <Diamond /> {t}
        </li>
      ))}
    </ul>
  )
  return (
    <section className="ticker" aria-label="Stages and features">
      <p className="ticker__label">Stages and features</p>
      <div className="ticker__track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}

/* ---------------- Section heading ---------------- */
export function SectionHead({ title, intro, link, linkLabel, tone, id }) {
  return (
    <div className={`section-head${tone ? ` section-head--${tone}` : ''}`}>
      <h2 className="h2" id={id}>
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

/* ---------------- Two paths ---------------- */
export function Paths() {
  const { settings: s } = useContent()
  const paths = [
    { key: 'a', label: s.pathALabel, title: s.pathATitle, body: s.pathABody, cta: s.pathACta, to: '#guide' },
    {
      key: 'b',
      label: s.pathBLabel,
      title: s.pathBTitle,
      body: s.pathBBody,
      cta: s.pathBCta,
      to: '/work-with-me?type=Coaching%20%26%20mentorship%20session',
    },
  ]
  return (
    <section className="section paths" aria-labelledby="paths-title">
      <Reveal className="wrap">
        <SectionHead id="paths-title" title={s.pathsTitle} />
        {s.painText && (
          <div className="pain reveal-item">
            <p className="pain__label">Sound familiar?</p>
            <p className="pain__text">{s.painText}</p>
          </div>
        )}
        <ul className="path-list">
          {paths.map((p) => (
            <li key={p.key} className={`path path--${p.key} reveal-item`}>
              <SmartLink to={p.to} className="path__link">
                <span className="path__label">{p.label}</span>
                <span className="path__title">{p.title}</span>
                <span className="path__body">{p.body}</span>
                <span className="path__cta">
                  {p.cta} <Arrow />
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

/* ---------------- How I help: the five offers ---------------- */
const ACCENTS = ['purple', 'terracotta', 'emerald', 'marigold', 'lilac']
export function Offers({ showHead = true }) {
  const { contributions } = useContent()
  if (!contributions.length) return null
  return (
    <section className="section offers-section" aria-label="How I help">
      <Reveal className="wrap">
        {showHead && (
          <SectionHead
            title="How I help"
            intro="Five ways to work together, from your first offer to a stage."
            link="/work-with-me"
            linkLabel="Book a conversation"
          />
        )}
        <ol className="offers">
          {contributions.map((c, i) => (
            <li key={c.id} className={`offer offer--${ACCENTS[i % ACCENTS.length]} reveal-item`}>
              <span className="offer__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="offer__title">{c.title}</h3>
              <p className="offer__text">{c.summary}</p>
              {c.image_url && <img className="offer__img" src={c.image_url} alt="" loading="lazy" />}
              {c.link_url && (
                <SmartLink to={c.link_url} className="offer__link">
                  {isExternal(c.link_url) ? `Visit ${c.link_url.replace(/^https?:\/\//, '').replace(/\/$/, '')}` : 'Learn more'}{' '}
                  <Arrow />
                </SmartLink>
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}

/* ---------------- How it works: three steps ---------------- */
export function Steps() {
  const { settings } = useContent()
  const steps = lines(settings.steps).map((l) => {
    const [title, ...rest] = l.split('|')
    return { title: title.trim(), text: rest.join('|').trim() }
  })
  if (!steps.length) return null
  return (
    <section className="steps-band" aria-labelledby="steps-title">
      <Reveal className="wrap">
        <h2 className="h2" id="steps-title">
          {settings.stepsTitle}
        </h2>
        <ol className="steps">
          {steps.map((st, i) => (
            <li key={i} className="step reveal-item">
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="step__title">{st.title}</h3>
              {st.text && <p>{st.text}</p>}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}

/* ---------------- Why me: the proof line ---------------- */
export function Proof() {
  const { settings } = useContent()
  if (!settings.proofLine) return null
  return (
    <section className="section proof" aria-label="Why Charles">
      <Reveal className="wrap proof__grid">
        <figure className="proof__image reveal-item">
          <img src={settings.aboutImage} alt={`${settings.siteName}, seated`} loading="lazy" width="768" height="1152" />
        </figure>
        <div className="proof__text reveal-item">
          <p className="serif-line">Why listen to me</p>
          <blockquote className="proof__quote">{settings.proofLine}</blockquote>
          <Link to="/about" className="text-link">
            Read the full story
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------- About (full page) ---------------- */
export function AboutBlock() {
  const { settings } = useContent()
  const paragraphs = (settings.aboutBody || '').split(/\n\s*\n/).filter(Boolean)
  return (
    <section className="section about">
      <Reveal className="wrap about__grid">
        <figure className="about__image reveal-item">
          <img src={settings.aboutImage} alt={`${settings.siteName}, seated`} loading="lazy" width="768" height="1152" />
        </figure>
        <div className="about__text reveal-item">
          <p className="serif-line">{settings.roles}.</p>
          <h2 className="h3">{settings.aboutTitle}</h2>
          {settings.aboutQuote && <blockquote className="pull">{settings.aboutQuote}</blockquote>}
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------- Speaking ---------------- */
export function SpeakingStrip({ showHead = true, pageMode = false }) {
  const { speaking } = useContent()
  if (!speaking.length) return null
  return (
    <section className="section section--dark" aria-label="Speaking and appearances">
      <div className="wrap">
        {pageMode && <SectionHead tone="dark" title="Where I've spoken" />}
        {showHead && !pageMode && (
          <SectionHead
            tone="dark"
            title="On stage"
            intro="Keynotes, panels and workshops on the Travelpreneur™ Economy, AI in travel, and Rwanda beyond safari."
            link="/speaking"
            linkLabel="Topics and booking"
          />
        )}
      </div>
      <ul className="strip" tabIndex={0} aria-label="Speaking engagements">
        {speaking.map((s, i) => {
          const inner = (
            <>
              {s.image_url ? (
                <img src={s.image_url} alt="" loading="lazy" />
              ) : (
                <span className={`poster__blank poster__blank--${ACCENTS[i % ACCENTS.length]}`} aria-hidden="true">
                  <span>{s.event}</span>
                </span>
              )}
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

export function SpeakingTopics() {
  const { settings } = useContent()
  const topics = lines(settings.speakingTopics)
  return (
    <section className="section">
      <Reveal className="wrap topics__grid">
        <div>
          <SectionHead title="Talk topics" />
          <ol className="topics">
            {topics.map((t, i) => (
              <li key={i} className="topic reveal-item">
                <span className="topic__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="topic__title">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="topics__aside reveal-item">
          {settings.speakerReelUrl && (
            <a className="reel" href={settings.speakerReelUrl} target="_blank" rel="noopener noreferrer">
              <span className="reel__play" aria-hidden="true" />
              <span className="reel__text">
                <strong>Watch the speaker reel</strong>
                {settings.speakerReelLabel && <small>{settings.speakerReelLabel}, on TikTok</small>}
              </span>
            </a>
          )}
          <p className="topics__cta">{settings.speakingCta}</p>
          <Link to="/work-with-me?type=Speaking%20invitation" className="btn btn--primary">
            Send a speaking invitation
          </Link>
        </aside>
      </Reveal>
    </section>
  )
}

/* ---------------- What I'm building: the companies as proof ---------------- */
export function VenturesBlock({ showHead = true }) {
  const { ventures } = useContent()
  if (!ventures.length) return null
  return (
    <section className="section ventures-section">
      <Reveal className="wrap">
        {showHead && (
          <SectionHead
            title="What I'm building"
            intro="The advice comes from the companies I run. Here they are."
            link="/ventures"
            linkLabel="More on the ventures"
          />
        )}
        <div className="ventures">
          {ventures.map((v, i) => (
            <article key={v.id} className={`venture venture--${i % 2 ? 'emerald' : 'purple'} reveal-item`}>
              {v.image_url && (
                <div className="venture__img">
                  <img src={v.image_url} alt="" loading="lazy" />
                </div>
              )}
              <div className="venture__body">
                <p className="venture__role">{v.role}</p>
                <h3 className="venture__name">{v.name}</h3>
                {v.tagline && <p className="venture__tagline">{v.tagline}</p>}
                {v.description && <p>{v.description}</p>}
                {v.link_url && (
                  <a className="venture__link" href={v.link_url} target="_blank" rel="noopener noreferrer">
                    {v.link_url.replace(/^https?:\/\//, '').replace(/\/$/, '')} <Arrow />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------- The Travelpreneur Note: one guide, one form ---------------- */
export function Newsletter() {
  const { settings } = useContent()
  const [email, setEmail] = useState('')
  const [trap, setTrap] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done | error

  async function submit(e) {
    e.preventDefault()
    if (trap) return setState('done')
    const clean = email.trim().toLowerCase()
    if (!supabase) {
      // No database connected: hand the request to the visitor's email app
      window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent('Send me the free guide')}&body=${encodeURIComponent(
        `Please send "${settings.guideTitle}" to ${clean}.`
      )}`
      return setState('done')
    }
    setState('sending')
    // Saves the address in Supabase (see Admin → Subscribers).
    // TODO: connect an email provider (e.g. Kit, MailerLite or Beehiiv) to send the guide
    // and the weekly note automatically. Until then, export the list from the admin.
    const { error } = await supabase.from('subscribers').insert({ email: clean, source: 'guide' })
    setState(!error || error.code === '23505' ? 'done' : 'error')
  }

  return (
    <section className="note" id="guide" aria-labelledby="note-title">
      <Reveal className="wrap note__grid">
        <div className="reveal-item">
          <p className="note__kicker">Free guide</p>
          <h2 className="display display--light note__title" id="note-title">
            {settings.newsletterTitle}
          </h2>
          <p className="note__body">{settings.newsletterBody}</p>
        </div>
        <div className="note__card reveal-item">
          <p className="note__guide">{settings.guideTitle}</p>
          <p className="note__guide-sub">{settings.guideBody}</p>
          {state === 'done' ? (
            <p className="note__done" role="status">
              Thank you, you're on the list. Charles will send the guide to {email || 'your inbox'}.
            </p>
          ) : (
            <form onSubmit={submit} className="note__form">
              <label htmlFor="note-email" className="visually-hidden">
                Your email address
              </label>
              <input
                id="note-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="visually-hidden" aria-hidden="true">
                Leave this empty
                <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </label>
              <button className="btn btn--dark" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send me the guide'}
              </button>
            </form>
          )}
          {state === 'error' && (
            <p className="note__error" role="alert">
              That didn't go through. Check the address and try again.
            </p>
          )}
          <p className="note__fine">No spam. Unsubscribe anytime.</p>
        </div>
      </Reveal>
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
      <Reveal className="wrap">
        {showHead && (
          <SectionHead title="Featured by" intro="Interviews and features." link="/perspectives" linkLabel="All perspectives" />
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
                <li key={p.id} className="reveal-item">
                  {p.link_url ? (
                    <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="press__item">
                      {body}
                      <span className="press__read">
                        Read <Arrow />
                      </span>
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
                <li key={p.id} className="reveal-item">
                  <Link to={`/blog/${p.slug}`} className="post-card">
                    {p.cover_url && <img src={p.cover_url} alt="" loading="lazy" />}
                    <span className="post-card__date">
                      {fmtDate(p.published_at?.slice(0, 10), { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="post-card__title">{p.title}</span>
                    {p.excerpt && <span className="post-card__excerpt">{p.excerpt}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Reveal>
    </section>
  )
}

/* ---------------- Connect ---------------- */
export function ConnectBand() {
  const { settings } = useContent()
  const wa = whatsappLink(settings)
  return (
    <section className="connect">
      <Reveal className="wrap connect__grid">
        <div className="reveal-item">
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
          <img className="connect__img reveal-item" src={settings.connectImage} alt="" loading="lazy" width="768" height="1152" />
        )}
      </Reveal>
    </section>
  )
}

export function PageHero({ title, intro, tone }) {
  return (
    <section className={`page-hero${tone ? ` page-hero--${tone}` : ''}`}>
      <div className="wrap">
        <h1 className="display">{splitWords(title)}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
      </div>
    </section>
  )
}

export { Paragraphs }
