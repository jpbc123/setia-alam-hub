import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SupabaseAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error handling Supabase redirect:", error);
      navigate("/", { replace: true }); 
    };

    handleRedirect();
  }, [navigate]);

  return <p className="p-4 text-center">Signing you in...</p>;
};

export default SupabaseAuthRedirectHandler;
