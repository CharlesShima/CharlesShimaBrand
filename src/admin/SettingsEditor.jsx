import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useContent } from '../lib/content'
import { defaultSettings } from '../content/defaults'
import { SETTINGS_GROUPS } from './schemas'
import { Field } from './Fields'

export default function SettingsEditor() {
  const { refresh } = useContent()
  const [data, setData] = useState(null)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('data')
      .eq('key', 'main')
      .maybeSingle()
      .then(({ data: row, error }) => {
        if (error) setMsg(error.message)
        setData({ ...defaultSettings, ...(row?.data || {}) })
      })
  }, [])

  async function save(e) {
    e.preventDefault()
    setBusy(true)
    const { error } = await supabase.from('site_settings').upsert({ key: 'main', data, updated_at: new Date().toISOString() })
    setBusy(false)
    setMsg(error ? error.message : 'Settings saved. The site is updated.')
    if (!error) refresh()
  }

  if (!data) return <div className="a-panel">Loading settings…</div>

  return (
    <form className="a-panel" onSubmit={save}>
      <div className="a-panel__head">
        <h2>Site settings</h2>
        <button className="a-btn a-btn--primary" disabled={busy}>
          {busy ? 'Saving…' : 'Save settings'}
        </button>
      </div>
      {msg && <p className="a-msg">{msg}</p>}
      {SETTINGS_GROUPS.map((g) => (
        <fieldset key={g.title} className="a-group">
          <legend>{g.title}</legend>
          {g.fields.map((f) => (
            <Field key={f.name} field={f} folder="site" value={data[f.name]} onChange={(v) => setData((d) => ({ ...d, [f.name]: v }))} />
          ))}
        </fieldset>
      ))}
      <div className="a-actions">
        <button className="a-btn a-btn--primary" disabled={busy}>
          {busy ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </form>
  )
}
