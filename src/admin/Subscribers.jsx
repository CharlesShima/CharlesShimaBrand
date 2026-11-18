import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Email addresses from "The Travelpreneur Note" form.
// Until an email provider is connected, download the CSV and import it there,
// or send the guide by hand.
export default function Subscribers() {
  const [rows, setRows] = useState([])
  const [msg, setMsg] = useState('')

  async function load() {
    const { data, error } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false })
    if (error) setMsg(error.message)
    else setRows(data)
  }
  useEffect(() => {
    load()
  }, [])

  async function remove(row) {
    if (!confirm(`Remove ${row.email}?`)) return
    await supabase.from('subscribers').delete().eq('id', row.id)
    load()
  }

  function exportCsv() {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = ['email,source,signed_up', ...rows.map((r) => [r.email, r.source, r.created_at].map(esc).join(','))].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  return (
    <div className="a-panel">
      <div className="a-panel__head">
        <h2>Subscribers ({rows.length})</h2>
        <button className="a-btn" onClick={exportCsv} disabled={!rows.length}>
          Download CSV
        </button>
      </div>
      <p className="a-msg">
        These people asked for the free guide and The Travelpreneur Note. Send them the guide, or import the CSV into your email provider.
      </p>
      {msg && <p className="a-error">{msg}</p>}
      {rows.length === 0 ? (
        <p className="a-empty">No sign-ups yet.</p>
      ) : (
        <ul className="a-list">
          {rows.map((r) => (
            <li key={r.id}>
              <div className="a-list__item">
                <span>
                  <strong>{r.email}</strong>
                  <small>{new Date(r.created_at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}</small>
                </span>
                <a className="a-btn a-btn--quiet" href={`mailto:${r.email}?subject=${encodeURIComponent('Your free guide')}`}>
                  Email
                </a>
                <button className="a-btn a-btn--quiet a-btn--danger" onClick={() => remove(r)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
