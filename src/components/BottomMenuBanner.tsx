import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MenuItem {
  icon: string;
  label: string;
  items: string[];
}

const menuItems: MenuItem[] = [
  {
    icon: "📰",
    label: "News & Alerts",
    items: [
      "News Around Setia Alam",
      "Crime Watch 🕵️‍♂️",
      "Trending in Setia Alam",
      "Weather & Flooding Alerts 🌦️",
      "Traffic Jam Alerts 🚗"
    ]
  },
  {
    icon: "🛍️",
    label: "Local Highlights",
    items: [
      "Mall & Store Promotions",
      "New Restaurant Launches 🍽️",
      "Popular Sport Destinations 🏸",
      "Pet Grooming Salons & Hotels 🐾"
    ]
  },
  {
    icon: "💬",
    label: "Community",
    items: [
      "Community Chat / Brainstorm",
      "Submit News or Tips",
      "Suggest a Business or Event"
    ]
  },
  {
    icon: "📢",
    label: "Advertise With Us",
    items: [
      "Promote Your Business",
      "Feature a Restaurant",
      "Sponsored Listings",
      "Classifieds"
    ]
  },
  {
    icon: "💖",
    label: "Buy Me a Coffee",
    items: []
  }
];

const BottomMenuBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-malaysia-dark/95 backdrop-blur-md border-t border-malaysia-dark/20 transition-all duration-300 ${
        isScrolled ? "bottom-menu-collapsed" : "bottom-menu-expanded"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-full">
          {menuItems.map((menu, index) => (
            <div key={index} className="flex-1">
              {menu.items.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center w-full h-full text-malaysia-light hover:text-malaysia-yellow hover:bg-malaysia-dark/50 p-2"
                    >
                      <span className="text-2xl mb-1">{menu.icon}</span>
                      <span
                        className={`text-xs text-center transition-all duration-300 ${
                          isScrolled
                            ? "menu-label-hidden"
                            : "menu-label-visible"
                        }`}
                      >
                        {menu.label}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="center"
                    className="dropdown-up bg-white shadow-strong border border-gray-200 mb-2"
                  >
                    {menu.items.map((item, itemIndex) => (
                      <DropdownMenuItem
                        key={itemIndex}
                        className="cursor-pointer hover:bg-malaysia-light/50 px-4 py-2"
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  className="flex flex-col items-center w-full h-full text-malaysia-light hover:text-malaysia-yellow hover:bg-malaysia-dark/50 p-2"
                >
                  <span className="text-2xl mb-1">{menu.icon}</span>
                  <span
                    className={`text-xs text-center transition-all duration-300 ${
                      isScrolled ? "menu-label-hidden" : "menu-label-visible"
                    }`}
                  >
                    {menu.label}
                  </span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomMenuBanner;