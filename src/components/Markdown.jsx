import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useMemo } from 'react'

marked.setOptions({ gfm: true, breaks: false })

export default function Markdown({ text, className = 'prose' }) {
  const html = useMemo(() => DOMPurify.sanitize(marked.parse(text || '')), [text])
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

// Plain paragraphs from text with blank lines between them
export function Paragraphs({ text }) {
  return (text || '')
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((p, i) => <p key={i}>{p}</p>)
}
