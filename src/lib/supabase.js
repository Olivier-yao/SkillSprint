import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Sprints en groupe : pas d'authentification, la clé publique suffit —
// les tables sont protégées par un code de groupe partagé (cf. migration
// sprints_groupe), adapté à un usage entre amis, pas à des données sensibles.
const SUPABASE_URL = 'https://nyzygerjykdupxvmpcti.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_J9vk1pDMTkrUHMQ1YEnimQ_bOmiVHFI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});
