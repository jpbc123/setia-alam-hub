import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/"); // Ensure we go back to home after logout
  };

  const getFirstName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(" ")[0];
    } else if (user?.email) {
      return user.email.split("@")[0]; // fallback to email prefix
    }
    return "";
  };

  // Close auth modal after login
  useEffect(() => {
    if (user && authModal !== null) {
      setAuthModal(null);
    }
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 bg-malaysia-dark text-malaysia-light border-b border-malaysia-dark/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Greeting */}
          <div className="flex-shrink-0 flex flex-col">
            <Link to="/">
              <h1 className="text-xl font-bold text-malaysia-yellow">
                Setia Alam Hub
              </h1>
            </Link>
            {user && (
              <span className="text-xs text-malaysia-yellow mt-1">
                Hi, {getFirstName()}!
              </span>
            )}
          </div>

          {/* Hamburger Menu */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="text-malaysia-yellow focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-malaysia-dark text-malaysia-light border border-malaysia-yellow rounded-xl shadow-lg p-4 z-50">
                <div className="flex flex-col space-y-2">
                  {user ? (
                    <Button
                      className="w-full bg-malaysia-red hover:bg-malaysia-orange text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAuthModal("signup");
                          setIsMenuOpen(false);
                        }}
                        className="w-full border-malaysia-yellow text-malaysia-yellow hover:bg-malaysia-yellow hover:text-malaysia-dark"
                      >
                        Register
                      </Button>
                      <Button
                        className="w-full bg-malaysia-red hover:bg-malaysia-orange text-white"
                        onClick={() => {
                          setAuthModal("signin");
                          setIsMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          mode={authModal}
          isOpen={authModal !== null}
          onClose={() => setAuthModal(null)}
          onModeChange={(mode) => setAuthModal(mode)}
        />
      )}
    </nav>
  );
};

export default TopNavigation;
