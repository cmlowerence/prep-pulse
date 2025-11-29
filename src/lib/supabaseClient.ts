import { createClient } from '@supabase/supabase-js';

// NOTE: This is for migration purposes only. 
// New features use @vercel/postgres (src/lib/db.ts)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
