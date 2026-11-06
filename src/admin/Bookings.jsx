import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const STATUSES = [
  ['new', 'New'],
  ['confirmed', 'Confirmed'],
  ['declined', 'Declined'],
  ['done', 'Done'],
]

export default function Bookings() {
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('new')
  const [msg, setMsg] = useState('')

  async function load() {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (error) setMsg(error.message)
    else setRows(data)
  }
  useEffect(() => {
    load()
  }, [])

  const counts = useMemo(() => Object.fromEntries(STATUSES.map(([s]) => [s, rows.filter((r) => r.status === s).length])), [rows])
  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter)

  async function update(row, patch) {
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, ...patch } : r)))
    const { error } = await supabase.from('bookings').update(patch).eq('id', row.id)
    if (error) {
      setMsg(error.message)
      load()
    }
  }

  async function remove(row) {
    if (!confirm(`Delete the request from ${row.name}? This can't be undone.`)) return
    await supabase.from('bookings').delete().eq('id', row.id)
    load()
  }

  function exportCsv() {
    const cols = ['created_at', 'status', 'booking_type', 'name', 'email', 'phone', 'organisation', 'preferred_date', 'preferred_time', 'message', 'admin_notes']
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  return (
    <div className="a-panel">
      <div className="a-panel__head">
        <h2>Bookings</h2>
        <button className="a-btn" onClick={exportCsv} disabled={!rows.length}>
          Download CSV
        </button>
      </div>
      <div className="a-filters" role="tablist">
        {[...STATUSES, ['all', 'All']].map(([s, label]) => (
          <button key={s} role="tab" aria-selected={filter === s} className={`a-tab${filter === s ? ' is-on' : ''}`} onClick={() => setFilter(s)}>
            {label} {s !== 'all' ? `(${counts[s] || 0})` : `(${rows.length})`}
          </button>
        ))}
      </div>
      {msg && <p className="a-error">{msg}</p>}
      {shown.length === 0 && <p className="a-empty">No {filter === 'all' ? '' : filter + ' '}requests. New requests from the booking page appear here.</p>}
      <ul className="a-bookings">
        {shown.map((r) => {
          const phone = (r.phone || '').replace(/\D/g, '')
          return (
            <li key={r.id} className={`a-booking a-booking--${r.status}`}>
              <div className="a-booking__head">
                <div>
                  <strong>{r.name}</strong> <span className="a-muted">{r.organisation}</span>
                  <div className="a-muted">
                    {r.booking_type} · received {new Date(r.created_at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
                <select value={r.status} onChange={(e) => update(r, { status: e.target.value })} aria-label="Status">
                  {STATUSES.map(([s, label]) => (
                    <option key={s} value={s}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              {(r.preferred_date || r.preferred_time) && (
                <p>
                  <b>Preferred:</b> {r.preferred_date} {r.preferred_time}
                </p>
              )}
              {r.message && <p className="a-booking__msg">{r.message}</p>}
              <div className="a-actions">
                <a className="a-btn" href={`mailto:${r.email}?subject=${encodeURIComponent('Re: ' + (r.booking_type || 'your request'))}`}>
                  Reply by email
                </a>
                {phone && (
                  <a className="a-btn" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                )}
                <button className="a-btn a-btn--quiet a-btn--danger" onClick={() => remove(r)}>
                  Delete
                </button>
              </div>
              <textarea
                className="a-notes"
                placeholder="Private notes"
                defaultValue={r.admin_notes || ''}
                onBlur={(e) => e.target.value !== (r.admin_notes || '') && update(r, { admin_notes: e.target.value })}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
