import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import SupabaseAuthRedirectHandler from "@/pages/SupabaseAuthRedirectHandler";
import AuthCallback from "@/pages/AuthCallback";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AtmLocator from "./pages/AtmLocator";
import Classifieds from "./pages/Classifieds";
import CommunityChat from "./pages/CommunityChat";
import GroupChatPage from "@/pages/GroupChatPage";

import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-malaysia-yellow">
        Loading session...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
      <Route path="/classifieds" element={<Layout><Classifieds /></Layout>} />
      <Route path="/atm-locator" element={<Layout><AtmLocator /></Layout>} />
      <Route path="/community-chat" element={<Layout><CommunityChat /></Layout>} />
      <Route path="/group-chat/:id" element={<Layout><GroupChatPage /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
