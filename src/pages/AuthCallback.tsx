import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; // adjust path if needed

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase handles session automatically, we just wait a bit
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/", { replace: true }); // Redirect after session is set
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
