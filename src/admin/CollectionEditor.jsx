import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useContent } from '../lib/content'
import { COLLECTIONS } from './schemas'
import { Field } from './Fields'

export default function CollectionEditor({ table }) {
  const schema = COLLECTIONS[table]
  const { refresh } = useContent()
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function load() {
    const [col, opts] = schema.order
    const { data, error } = await supabase.from(table).select('*').order(col, opts || {})
    if (error) setMsg(error.message)
    else setRows(data)
  }

  useEffect(() => {
    setEditing(null)
    setMsg('')
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  async function save(e) {
    e.preventDefault()
    setBusy(true)
    const record = { ...editing }
    if (table === 'posts' && !record.slug) record.slug = (record.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const { error } = record.id
      ? await supabase.from(table).update(record).eq('id', record.id)
      : await supabase.from(table).insert(record)
    setBusy(false)
    if (error) return setMsg(error.code === '23505' ? 'That web address is already used by another post.' : error.message)
    setMsg(`Saved "${schema.label(record)}".`)
    setEditing(null)
    load()
    refresh()
  }

  async function remove(row) {
    if (!confirm(`Delete "${schema.label(row)}"? This can't be undone.`)) return
    const { error } = await supabase.from(table).delete().eq('id', row.id)
    if (error) return setMsg(error.message)
    setMsg(`Deleted "${schema.label(row)}".`)
    setEditing(null)
    load()
    refresh()
  }

  if (editing) {
    return (
      <form className="a-panel" onSubmit={save}>
        <div className="a-panel__head">
          <h2>{editing.id ? `Edit ${schema.item}` : `New ${schema.item}`}</h2>
          <button type="button" className="a-btn a-btn--quiet" onClick={() => setEditing(null)}>
            Cancel
          </button>
        </div>
        {schema.fields.map((f) => (
          <Field
            key={f.name}
            field={f}
            record={editing}
            folder={table}
            value={editing[f.name]}
            onChange={(v) => setEditing((r) => ({ ...r, [f.name]: v }))}
          />
        ))}
        {msg && <p className="a-error">{msg}</p>}
        <div className="a-actions">
          <button className="a-btn a-btn--primary" disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </button>
          {editing.id && (
            <button type="button" className="a-btn a-btn--danger" onClick={() => remove(editing)}>
              Delete
            </button>
          )}
        </div>
      </form>
    )
  }

  return (
    <div className="a-panel">
      <div className="a-panel__head">
        <h2>{schema.title}</h2>
        <button
          className="a-btn a-btn--primary"
          onClick={() => {
            setMsg('')
            setEditing(schema.blank())
          }}
        >
          Add {schema.item}
        </button>
      </div>
      {msg && <p className="a-msg">{msg}</p>}
      {rows.length === 0 ? (
        <p className="a-empty">Nothing here yet. Add your first {schema.item} to show it on the site.</p>
      ) : (
        <ul className="a-list">
          {rows.map((r) => (
            <li key={r.id}>
              <button
                className="a-list__item"
                onClick={() => {
                  setMsg('')
                  setEditing(r)
                }}
              >
                {(r.image_url || r.cover_url) && <img src={r.image_url || r.cover_url} alt="" />}
                <span>
                  <strong>{schema.label(r)}</strong>
                  {schema.sub && <small>{schema.sub(r)}</small>}
                </span>
                {(r.published === false || r.active === false) && <em className="a-badge">Hidden</em>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
