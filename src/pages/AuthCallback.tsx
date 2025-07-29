import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSessionFromUrl(); n

      if (error) {
        console.error("Supabase callback error:", error.message);
      }

      navigate("/", { replace: true });
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
