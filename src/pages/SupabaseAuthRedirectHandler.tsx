import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const SupabaseAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { error } = await supabase.auth.getSessionFromUrl();
      if (error) console.error("Error handling Supabase redirect:", error);
      navigate("/", { replace: true }); 
    };

    handleRedirect();
  }, []);

  return <p className="p-4 text-center">Signing you in...</p>;
};

export default SupabaseAuthRedirectHandler;
