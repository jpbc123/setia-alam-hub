import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error("Supabase callback error:", error.message);
      }

      // Give time for Supabase to update session context
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300); // Small delay helps prevent flicker
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-xl text-center text-malaysia-yellow">
      Logging you in...
    </div>
  );
};

export default AuthCallback;
