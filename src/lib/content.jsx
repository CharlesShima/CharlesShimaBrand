import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import * as D from '../content/defaults'

const CACHE_KEY = 'shima-content-v1'

const defaults = {
  settings: D.defaultSettings,
  contributions: D.defaultContributions,
  speaking: D.defaultSpeaking,
  ventures: D.defaultVentures,
  press: D.defaultPress,
  posts: D.defaultPosts,
  bookingTypes: D.defaultBookingTypes,
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(value) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(value))
  } catch {
    /* storage full or blocked: the site still works without the cache */
  }
}

const ContentContext = createContext({ ...defaults, loading: false, refresh: () => {} })

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    const cached = supabase ? readCache() : null
    return cached ? { ...defaults, ...cached, settings: { ...D.defaultSettings, ...cached.settings } } : defaults
  })
  const [loading, setLoading] = useState(Boolean(supabase))

  const refresh = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const byOrder = (table) => supabase.from(table).select('*').eq('published', true).order('sort_order').order('created_at')
    const [settings, contributions, speaking, ventures, press, posts, bookingTypes] = await Promise.all([
      supabase.from('site_settings').select('data').eq('key', 'main').maybeSingle(),
      byOrder('contributions'),
      supabase.from('speaking').select('*').eq('published', true).order('sort_order').order('event_date', { ascending: false }),
      byOrder('ventures'),
      byOrder('press'),
      supabase
        .from('posts')
        .select('id, slug, title, excerpt, cover_url, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false }),
      supabase.from('booking_types').select('*').eq('active', true).order('sort_order'),
    ])

    // Use the CMS value when the request worked; keep the default when it failed.
    const pick = (res, fallback) => (res.error || !res.data ? fallback : res.data)
    const next = {
      settings: { ...D.defaultSettings, ...stripEmpty(settings.data?.data || {}) },
      contributions: pick(contributions, defaults.contributions),
      speaking: pick(speaking, defaults.speaking),
      ventures: pick(ventures, defaults.ventures),
      press: pick(press, defaults.press),
      posts: pick(posts, defaults.posts),
      bookingTypes: pick(bookingTypes, defaults.bookingTypes),
    }
    setContent(next)
    writeCache(next)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return <ContentContext.Provider value={{ ...content, loading, refresh }}>{children}</ContentContext.Provider>
}

// Fields left blank in the admin keep the default text instead of showing nothing,
// except contact links, which should disappear when cleared.
const CLEARABLE = new Set(['whatsapp', 'linkedin', 'instagram', 'tiktok', 'youtube', 'x', 'email'])
function stripEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => CLEARABLE.has(k) || (v !== '' && v != null)))
}

export const useContent = () => useContext(ContentContext)

export function whatsappLink(settings, text) {
  if (!settings.whatsapp) return null
  const number = settings.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(text ?? settings.whatsappMessage ?? '')}`
}
