import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-malaysia-dark text-malaysia-light border-b border-malaysia-dark/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl font-bold text-malaysia-yellow">
                Setia Alam Hub
              </h1>
            </Link>
          </div>

          {/* Hamburger Menu - Always visible */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="text-malaysia-yellow focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-malaysia-dark text-malaysia-light border border-malaysia-yellow rounded-xl shadow-lg p-4 z-50">
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-malaysia-yellow text-malaysia-yellow hover:bg-malaysia-yellow hover:text-malaysia-dark"
                  >
                    Register
                  </Button>
                  <Button
                    className="w-full bg-malaysia-red hover:bg-malaysia-orange text-white"
                  >
                    Login
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
