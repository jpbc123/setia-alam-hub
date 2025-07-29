import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const redirectTo =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/"
    : "https://jpbc123.github.io/setia-alam-hub/";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    redirectTo,
  },
});
