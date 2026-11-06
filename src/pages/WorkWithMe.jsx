import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Diamond from '../components/Diamond'
import { PageHero } from '../components/Sections'
import { useContent, whatsappLink } from '../lib/content'
import { supabase } from '../lib/supabase'

const empty = { name: '', email: '', phone: '', organisation: '', preferred_date: '', preferred_time: '', message: '' }

export default function WorkWithMe() {
  const { settings, bookingTypes } = useContent()
  const [params] = useSearchParams()
  const initialType = params.get('type') || bookingTypes[0]?.name || ''
  const [type, setType] = useState(initialType)
  const [form, setForm] = useState(empty)
  const [trap, setTrap] = useState('') // hidden field: bots fill it, people don't
  const [state, setState] = useState({ status: 'idle', error: '' })

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const selected = bookingTypes.find((b) => b.name === type)

  const summary = [
    `Request: ${type}`,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.phone && `Phone / WhatsApp: ${form.phone}`,
    form.organisation && `Organisation: ${form.organisation}`,
    form.preferred_date && `Preferred date: ${form.preferred_date} ${form.preferred_time}`.trim(),
    form.message && `\n${form.message}`,
  ]
    .filter(Boolean)
    .join('\n')

  async function submit(e) {
    e.preventDefault()
    if (trap) return setState({ status: 'sent', error: '' })
    if (!supabase) {
      // No CMS connected yet: hand the request to the visitor's email app.
      window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(type + ' — ' + form.name)}&body=${encodeURIComponent(summary)}`
      return setState({ status: 'sent', error: '' })
    }
    setState({ status: 'sending', error: '' })
    const { error } = await supabase.from('bookings').insert({
      ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim() || null])),
      name: form.name.trim(),
      email: form.email.trim(),
      booking_type: type,
    })
    if (error) {
      setState({
        status: 'error',
        error: 'The request could not be sent. Check your email address and try again, or use email or WhatsApp below.',
      })
    } else {
      setState({ status: 'sent', error: '' })
    }
  }

  const wa = whatsappLink(settings)
  const waWithDetails = whatsappLink(settings, `Hello Charles, I just sent a request on ShimaCharles.ca.\n\n${summary}`)

  return (
    <>
      <Seo title="Work with me" description="Book a speaking engagement, coaching session, advisory call or a conversation with Charles Shima." />
      <PageHero title="Work with me" intro={settings.contactBody} />

      <section className="section section--tight">
        <div className="wrap book">
          <div className="book__types">
            <h2 className="h3">What would you like to book?</h2>
            <div className="choice-list" role="radiogroup" aria-label="Type of request">
              {bookingTypes.map((b) => (
                <label key={b.id} className={`choice${type === b.name ? ' is-selected' : ''}`}>
                  <input type="radio" name="type" value={b.name} checked={type === b.name} onChange={() => setType(b.name)} />
                  <span className="choice__name">
                    <Diamond /> {b.name}
                  </span>
                  {b.duration && <span className="choice__duration">{b.duration}</span>}
                  {b.description && <span className="choice__desc">{b.description}</span>}
                </label>
              ))}
            </div>

            <div className="book__direct">
              <h2 className="h3">Prefer to write directly?</h2>
              {wa && (
                <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp
                </a>
              )}
              {settings.email && (
                <a className="btn btn--ghost" href={`mailto:${settings.email}`}>
                  Email {settings.email}
                </a>
              )}
            </div>
          </div>

          <div className="book__form">
            {state.status === 'sent' ? (
              <div className="confirm" role="status">
                <h2 className="h3">Request sent</h2>
                <p>
                  Thank you, {form.name.split(' ')[0] || 'and welcome'}. Charles will reply to {form.email || 'you'} to confirm the details
                  {selected?.name ? ` for your ${selected.name.toLowerCase()}` : ''}.
                </p>
                {waWithDetails && (
                  <a className="btn btn--primary" href={waWithDetails} target="_blank" rel="noopener noreferrer">
                    Also send these details on WhatsApp
                  </a>
                )}
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setForm(empty)
                    setState({ status: 'idle', error: '' })
                  }}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate={false}>
                <h2 className="h3">{type || 'Your request'}</h2>
                <div className="field-grid">
                  <label className="field">
                    <span>Full name</span>
                    <input required minLength={2} maxLength={120} autoComplete="name" value={form.name} onChange={set('name')} />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} />
                  </label>
                  <label className="field">
                    <span>Phone or WhatsApp (optional)</span>
                    <input type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={set('phone')} />
                  </label>
                  <label className="field">
                    <span>Organisation (optional)</span>
                    <input maxLength={160} autoComplete="organization" value={form.organisation} onChange={set('organisation')} />
                  </label>
                  <label className="field">
                    <span>Preferred date</span>
                    <input type="date" min={today} value={form.preferred_date} onChange={set('preferred_date')} />
                  </label>
                  <label className="field">
                    <span>Preferred time and time zone</span>
                    <input maxLength={40} placeholder="e.g. 3 pm Kigali" value={form.preferred_time} onChange={set('preferred_time')} />
                  </label>
                  <label className="field field--full">
                    <span>Tell Charles about it</span>
                    <textarea
                      required
                      rows={6}
                      maxLength={4000}
                      placeholder="Event or topic, audience, what you hope to get from the conversation"
                      value={form.message}
                      onChange={set('message')}
                    />
                  </label>
                  <label className="visually-hidden" aria-hidden="true">
                    Leave this empty
                    <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </label>
                </div>
                {state.error && (
                  <p className="form-error" role="alert">
                    {state.error}
                  </p>
                )}
                <button className="btn btn--primary" disabled={state.status === 'sending'}>
                  {state.status === 'sending' ? 'Sending request…' : 'Send request'}
                </button>
                <p className="form-note">Your details are only used to reply to this request.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
