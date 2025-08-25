import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jpllaucdsygxevwhmbal.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
