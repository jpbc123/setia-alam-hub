import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-malaysia-dark text-malaysia-light border-b border-malaysia-dark/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-xl font-bold text-malaysia-yellow">
                Setia Alam Hub
              </h1>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-malaysia-yellow text-malaysia-yellow hover:bg-malaysia-yellow hover:text-malaysia-dark"
            >
              Register
            </Button>
            <Button
              size="sm"
              className="bg-malaysia-red hover:bg-malaysia-orange text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
