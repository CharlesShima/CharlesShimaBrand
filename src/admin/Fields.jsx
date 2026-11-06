import { useState } from 'react'
import { uploadImage } from '../lib/supabase'
import Markdown from '../components/Markdown'

export const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)

export function Field({ field, value, onChange, record, folder }) {
  const id = `f-${field.name}`
  const common = { id, name: field.name }
  let input
  switch (field.type) {
    case 'textarea':
      input = <textarea {...common} rows={field.rows || 4} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      break
    case 'markdown':
      input = <MarkdownField {...common} value={value ?? ''} onChange={onChange} />
      break
    case 'image':
      input = <ImageField {...common} value={value ?? ''} onChange={onChange} folder={folder} />
      break
    case 'boolean':
      return (
        <label className="a-check">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span>{field.label}</span>
          {field.help && <small>{field.help}</small>}
        </label>
      )
    case 'number':
      input = <input {...common} type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />
      break
    case 'date':
      input = <input {...common} type="date" value={value ?? ''} onChange={(e) => onChange(e.target.value || null)} />
      break
    case 'datetime':
      input = (
        <input
          {...common}
          type="datetime-local"
          value={value ? toLocalInput(value) : ''}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
        />
      )
      break
    case 'slug':
      input = (
        <div className="a-inline">
          <input {...common} value={value ?? ''} onChange={(e) => onChange(slugify(e.target.value))} />
          <button type="button" className="a-btn a-btn--quiet" onClick={() => onChange(slugify(record?.[field.from]))}>
            Use title
          </button>
        </div>
      )
      break
    default:
      input = (
        <input
          {...common}
          type={field.type === 'url' ? 'url' : 'text'}
          required={field.required}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
  }
  return (
    <div className="a-field">
      <label htmlFor={id}>{field.label}</label>
      {input}
      {field.help && <small>{field.help}</small>}
    </div>
  )
}

function toLocalInput(iso) {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function ImageField({ id, value, onChange, folder }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function pick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) return setError('Choose an image under 8 MB.')
    setBusy(true)
    setError('')
    try {
      onChange(await uploadImage(file, folder))
    } catch (err) {
      setError(err.message || 'Upload failed. Try again.')
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }
  return (
    <div className="a-image">
      {value ? <img src={value} alt="" /> : <div className="a-image__empty">No image</div>}
      <div className="a-image__actions">
        <label className="a-btn">
          {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          <input id={id} type="file" accept="image/*" onChange={pick} disabled={busy} hidden />
        </label>
        {value && (
          <button type="button" className="a-btn a-btn--quiet" onClick={() => onChange('')}>
            Remove
          </button>
        )}
        <input className="a-image__url" placeholder="or paste an image URL" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      {error && <p className="a-error">{error}</p>}
    </div>
  )
}

function MarkdownField({ id, value, onChange }) {
  const [preview, setPreview] = useState(false)
  const [busy, setBusy] = useState(false)
  async function insertImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      const url = await uploadImage(file, 'posts')
      onChange(`${value}\n\n![](${url})\n`)
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }
  return (
    <div className="a-md">
      <div className="a-md__bar">
        <button type="button" className={`a-tab${!preview ? ' is-on' : ''}`} onClick={() => setPreview(false)}>
          Write
        </button>
        <button type="button" className={`a-tab${preview ? ' is-on' : ''}`} onClick={() => setPreview(true)}>
          Preview
        </button>
        <label className="a-btn a-btn--quiet">
          {busy ? 'Uploading…' : 'Add image'}
          <input type="file" accept="image/*" hidden onChange={insertImage} />
        </label>
        <span className="a-md__hint">## Heading, **bold**, *italic*, [link](https://…), - list</span>
      </div>
      {preview ? (
        <div className="a-md__preview">
          <Markdown text={value} />
        </div>
      ) : (
        <textarea id={id} rows={18} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}
