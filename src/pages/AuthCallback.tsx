import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automatically parses the OAuth hash and stores the session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session retrieval failed:", error.message);
      }

      if (data.session) {
        console.log("✅ Session restored after OAuth:", data.session);
        navigate("/", { replace: true });
      } else {
        console.warn("No session found after OAuth.");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-xl text-malaysia-yellow">
      Logging you in...
    </div>
  );
};

export default AuthCallback;
