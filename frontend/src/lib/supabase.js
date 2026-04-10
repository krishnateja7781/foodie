import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase env vars missing. Auth features will not work.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

/**
 * Returns the public URL for a food product image stored in Supabase Storage.
 * Handles both full URLs (already resolved) and bare filenames.
 */
export const getImageUrl = (image) => {
  if (!image) return ''
  if (image.includes('http')) return image
  return `${supabaseUrl}/storage/v1/object/public/food/products/${image}`
}
