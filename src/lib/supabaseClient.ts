// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Base URL for your app, depending on the environment
const baseAppUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://jpbc123.github.io/setia-alam-hub";

// Full redirect URL including the hash for HashRouter
// This is where Supabase will send the user AFTER it has processed Google's response
const redirectTo = `${baseAppUrl}/#/auth/callback`;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    redirectTo: redirectTo,
    // Make sure you have these options for PKCE flow which is recommended
    // flowType: 'pkce', // This is often the default or recommended for client-side
  },
});