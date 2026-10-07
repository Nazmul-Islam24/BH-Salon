import { createClient } from '@supabase/supabase-js';

// Retrieve public Supabase configuration from environment variables
const rawUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://rxkezmirysrszombzjyo.supabase.co';

// Clean and normalize URL to base origin (e.g. remove trailing /rest/v1/ if user pasted API endpoint)
const supabaseUrl = rawUrl
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_ByJHN_x8OCsYm9u2W9ymEA_FGabcGKM';

if (!rawUrl || !supabaseAnonKey) {
  console.warn(
    '[LUMÉ Supabase] Supabase URL or Publishable key is missing. Please verify your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
