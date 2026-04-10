import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Admin/service-role client — used for privileged operations (user creation, etc.)
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Anon client — used for user-facing auth (signIn, signUp on behalf of users)
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey)
