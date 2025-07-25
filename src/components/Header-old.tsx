import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Heart, Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openAuth = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const newsItems = [
    { title: "News Around Setia Alam", icon: "📰" },
    { title: "Crime Watch", icon: "🕵️‍♂️" },
    { title: "Trending in Setia Alam", icon: "📈" },
    { title: "Weather & Flooding Alerts", icon: "🌦️" },
    { title: "Traffic Jam Alerts", icon: "🚗" },
  ];

  const localHighlights = [
    { title: "Mall & Store Promotions", icon: "🛍️" },
    { title: "New Restaurant Launches", icon: "🍽️" },
    { title: "Popular Sport Destinations", icon: "🏸" },
    { title: "Pet Grooming Salons & Hotels", icon: "🐾" },
  ];

  const communityItems = [
    { title: "Community Chat / Brainstorm", icon: "💬" },
    { title: "Submit News or Tips", icon: "📝" },
    { title: "Suggest a Business or Event", icon: "💡" },
  ];

  const advertiseItems = [
    { title: "Promote Your Business", icon: "📢" },
    { title: "Feature a Restaurant", icon: "🍴" },
    { title: "Sponsored Listings", icon: "⭐" },
    { title: "Classifieds", icon: "📋" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              My Setia Alam
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto px-4 py-2 text-sm font-medium">
                  📰 News & Alerts
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4">
                    <div className="grid gap-2">
                      {newsItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-3 rounded-lg p-3 hover:bg-community-green-light transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto px-4 py-2 text-sm font-medium">
                  🛍️ Local Highlights
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4">
                    <div className="grid gap-2">
                      {localHighlights.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-3 rounded-lg p-3 hover:bg-community-blue-light transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto px-4 py-2 text-sm font-medium">
                  💬 Community
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4">
                    <div className="grid gap-2">
                      {communityItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-3 rounded-lg p-3 hover:bg-community-warm transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto px-4 py-2 text-sm font-medium">
                  📢 Advertise With Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4">
                    <div className="grid gap-2">
                      {advertiseItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center space-x-3 rounded-lg p-3 hover:bg-accent/10 transition-colors"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm font-medium">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-auto px-4 py-2 border-community-green text-community-green hover:bg-community-green hover:text-primary-foreground"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  💖 Submit a Tip
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openAuth("signin")}
                className="border-community-blue text-community-blue hover:bg-community-blue hover:text-accent-foreground"
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={() => openAuth("signup")}
                className="bg-gradient-hero hover:opacity-90"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container px-4 py-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  📰 News & Alerts
                </h3>
                {newsItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-3 rounded-lg p-2 hover:bg-community-green-light transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.title}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  🛍️ Local Highlights
                </h3>
                {localHighlights.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-3 rounded-lg p-2 hover:bg-community-blue-light transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.title}</span>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => openAuth("signup")}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => openAuth("signin")}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Header;