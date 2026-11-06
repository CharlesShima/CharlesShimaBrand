import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import Markdown from '../components/Markdown'
import { supabase } from '../lib/supabase'
import { NotFound } from './Pages'

export default function Post() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    let alive = true
    if (!supabase) return setPost(null)
    supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
      .then(({ data }) => alive && setPost(data || null))
    return () => {
      alive = false
    }
  }, [slug])

  if (post === undefined) return <div className="wrap narrow section" aria-busy="true" />
  if (post === null) return <NotFound />

  return (
    <article className="post">
      <Seo
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt}
        image={post.cover_url}
        type="article"
      />
      <header className="wrap narrow post__head">
        <Link to="/perspectives" className="text-link">
          All perspectives
        </Link>
        <h1 className="display display--post">{post.title}</h1>
        <time dateTime={post.published_at}>
          {new Date(post.published_at).toLocaleDateString('en-CA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
      </header>
      {post.cover_url && (
        <div className="wrap post__cover">
          <img src={post.cover_url} alt="" />
        </div>
      )}
      <div className="wrap narrow">
        <Markdown text={post.body} />
      </div>
    </article>
  )
}
