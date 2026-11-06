import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'
import { useContent } from '../lib/content'
import CollectionEditor from './CollectionEditor'
import SettingsEditor from './SettingsEditor'
import Bookings from './Bookings'
import './admin.css'

const SECTIONS = [
  ['bookings', 'Bookings'],
  ['posts', 'Blog posts'],
  ['settings', 'Site settings'],
  ['contributions', 'How I contribute'],
  ['speaking', 'Speaking'],
  ['ventures', 'Ventures'],
  ['press', 'Press'],
  ['booking_types', 'Booking options'],
]

export default function AdminApp() {
  const [session, setSession] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(null)
  const [recovering, setRecovering] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s)
      if (event === 'PASSWORD_RECOVERY') setRecovering(true)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return setIsAdmin(null)
    supabase.rpc('is_admin').then(({ data }) => setIsAdmin(Boolean(data)))
  }, [session])

  const head = (
    <Helmet>
      <title>Admin</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  )

  if (!supabase) {
    return (
      <div className="a-center">
        {head}
        <div className="a-card">
          <h1>Connect the database first</h1>
          <p>
            The admin area needs Supabase. Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file
            (or GitHub secrets), rebuild, and come back. The README walks through it step by step.
          </p>
          <Link to="/">Back to the site</Link>
        </div>
      </div>
    )
  }
  if (session === undefined) return <div className="a-center">{head}Loading…</div>
  if (!session) return <Login head={head} />
  if (recovering) return <NewPassword head={head} onDone={() => setRecovering(false)} />
  if (isAdmin === null) return <div className="a-center">{head}Checking access…</div>
  if (!isAdmin) {
    return (
      <div className="a-center">
        {head}
        <div className="a-card">
          <h1>No admin access</h1>
          <p>
            You're signed in as {session.user.email}, but this account isn't listed as an admin. Run the last step of <code>supabase/schema.sql</code> with
            this email.
          </p>
          <button className="a-btn" onClick={() => supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="a-shell">
      {head}
      <aside className="a-side">
        <AdminBrand />
        <nav>
          {SECTIONS.map(([key, label]) => (
            <NavLink key={key} to={`/admin/${key}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="a-side__foot">
          <a href="/" target="_blank" rel="noopener">
            View site
          </a>
          <button className="a-btn a-btn--quiet" onClick={() => supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="a-main">
        <Routes>
          <Route index element={<Navigate to="bookings" replace />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="settings" element={<SettingsEditor />} />
          {SECTIONS.filter(([k]) => !['bookings', 'settings'].includes(k)).map(([key]) => (
            <Route key={key} path={key} element={<CollectionEditor table={key} />} />
          ))}
          <Route path="*" element={<Navigate to="bookings" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function AdminBrand() {
  const { settings } = useContent()
  return (
    <Link to="/admin" className="a-brand">
      <img src={settings.logoLightUrl} alt={settings.siteName} />
      <span>Admin</span>
    </Link>
  )
}

function Login({ head }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setError('Email or password is incorrect.')
  }

  async function reset() {
    if (!email) return setError('Enter your email first, then choose "Reset password".')
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/admin' })
    setResetSent(true)
  }

  return (
    <div className="a-center">
      {head}
      <form className="a-card" onSubmit={submit}>
        <h1>Sign in to edit the site</h1>
        <div className="a-field">
          <label htmlFor="em">Email</label>
          <input id="em" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="a-field">
          <label htmlFor="pw">Password</label>
          <input id="pw" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="a-error">{error}</p>}
        {resetSent && <p className="a-msg">Check your email for a reset link.</p>}
        <button className="a-btn a-btn--primary" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <button type="button" className="a-btn a-btn--quiet" onClick={reset}>
          Reset password
        </button>
      </form>
    </div>
  )
}

function NewPassword({ head, onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  async function submit(e) {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setError(error.message)
    else onDone()
  }
  return (
    <div className="a-center">
      {head}
      <form className="a-card" onSubmit={submit}>
        <h1>Choose a new password</h1>
        <div className="a-field">
          <label htmlFor="np">New password</label>
          <input id="np" type="password" minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <small>At least 8 characters.</small>
        </div>
        {error && <p className="a-error">{error}</p>}
        <button className="a-btn a-btn--primary">Save new password</button>
      </form>
    </div>
  )
}
