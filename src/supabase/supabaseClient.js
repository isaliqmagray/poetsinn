import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xqxrfzgijdbzmbfiuagn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeHJmemdpamRiem1iZml1YWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODAyNzIsImV4cCI6MjA4NzA1NjI3Mn0.CiHDle5ctSUUzgN6aRUL1ARuvM9VUHKsaVoAjsTl81A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
