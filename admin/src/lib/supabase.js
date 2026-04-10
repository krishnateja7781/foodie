import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Returns the public URL for a food product image stored in Supabase Storage.
 */
export const getImageUrl = (image) => {
  if (!image) return ''
  if (image.includes('http')) return image
  return `${supabaseUrl}/storage/v1/object/public/food/products/${image}`
}
