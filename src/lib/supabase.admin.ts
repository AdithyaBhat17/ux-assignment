import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseSecretRole = process.env.SUPABASE_KEY || "";

export const supabase = createClient(supabaseURL, supabaseSecretRole);
