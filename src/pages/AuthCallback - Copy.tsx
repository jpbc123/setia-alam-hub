import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const rawHash = window.location.hash;

        // Extract params from the raw hash string
        const params = new URLSearchParams(rawHash.split("#")[2] || rawHash.split("#")[1]);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (!access_token || !refresh_token) {
          console.error("Missing tokens in callback URL.");
          return;
        }

        // Manually exchange the tokens for a Supabase session
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("Error setting session:", error.message);
          return;
        }

        console.log("✅ Supabase session restored:", data.session);
        navigate("/", { replace: true });

      } catch (err) {
        console.error("OAuth callback error:", err);
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-xl text-malaysia-yellow">
      Logging you in...
    </div>
  );
};

export default AuthCallback;
