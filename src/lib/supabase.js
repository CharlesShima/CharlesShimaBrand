import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// When the keys aren't set yet, the site still works with its default content,
// and the booking form falls back to opening the visitor's email app.
export const supabase = url && key ? createClient(url, key) : null
export const cmsEnabled = Boolean(supabase)

export async function uploadImage(file, folder = 'uploads') {
  if (!supabase) throw new Error('Connect Supabase to upload images.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  const path = `${folder}/${Date.now()}-${base}.${ext}`
  const { error } = await supabase.storage.from('media').upload(path, file, { cacheControl: '31536000', upsert: false })
  if (error) throw error
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
}
