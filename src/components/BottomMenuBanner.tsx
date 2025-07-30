import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  icon: string;
  label: string;
  items: string[] | { name: string; href?: string }[];
  href?: string;
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
      "Traffic Jam Alerts 🚗",
    ],
  },
  {
    icon: "🛍️",
    label: "Local Highlights",
    items: [
      "Mall & Store Promotions",
      "New Restaurant Launches 🍽️",
      "Popular Sport Destinations 🏸",
      "Pet Grooming Salons & Hotels 🐾",
    ],
  },
  {
    icon: "💬",
    label: "Community",
    items: [
      { name: "Community Chat & Discussion", href: "/community-chat" },
      "Contribute - Submit News or Tips",
      "Suggest a Business or Event",
    ],
  },
  {
    icon: "📢",
    label: "Advertise With Us",
    items: [
      "Promote Your Business",
      { name: "Classifieds", href: "/classifieds" },
    ],
  },
  {
    icon: "🛈",
    label: "About",
    href: "/about",
    items: [],
  },
];

const BottomMenuBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

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
          {menuItems.map((menu, index) => {
            const isActive = activeMenuIndex === index;
            const isLastTwo = index >= menuItems.length - 2;

            return (
              <div
                key={index}
                className="relative flex-1 text-center"
                onMouseEnter={() => setActiveMenuIndex(index)}
                onMouseLeave={() => setActiveMenuIndex(null)}
              >
                {menu.href ? (
                  <Link
                    to={menu.href}
                    className="flex flex-col items-center justify-center text-malaysia-light hover:text-malaysia-yellow hover:bg-malaysia-dark/50 p-2"
                  >
                    <span className="text-2xl mb-1">{menu.icon}</span>
                    <span
                      className={`text-xs transition-all duration-300 ${
                        isScrolled ? "menu-label-hidden" : "menu-label-visible"
                      }`}
                    >
                      {menu.label}
                    </span>
                  </Link>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center text-malaysia-light hover:text-malaysia-yellow hover:bg-malaysia-dark/50 p-2 cursor-pointer">
                      <span className="text-2xl mb-1">{menu.icon}</span>
                      <span
                        className={`text-xs transition-all duration-300 ${
                          isScrolled ? "menu-label-hidden" : "menu-label-visible"
                        }`}
                      >
                        {menu.label}
                      </span>
                    </div>
                    {menu.items.length > 0 && isActive && (
                      <div
                        className={`absolute bottom-full z-50 min-w-[260px] flex flex-col bg-white border border-gray-200 shadow-lg rounded-md text-left mb-3 ${
                          isLastTwo
                            ? "left-auto right-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-max"
                            : "left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-max"
                        }`}
                      >
                        {/* Bubble tail */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200 z-0" />
                        <div className="z-10 relative">
                          {(menu.items as (string | { name: string; href?: string })[]).map(
                            (item, itemIndex) => {
                              if (typeof item === "string") {
                                return (
                                  <div
                                    key={itemIndex}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 cursor-pointer whitespace-nowrap transition truncate"
                                  >
                                    {item}
                                  </div>
                                );
                              } else {
                                return item.href ? (
                                  <Link
                                    key={itemIndex}
                                    to={item.href}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 cursor-pointer whitespace-nowrap transition truncate block"
                                  >
                                    {item.name}
                                  </Link>
                                ) : (
                                  <div
                                    key={itemIndex}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 cursor-pointer whitespace-nowrap transition truncate"
                                  >
                                    {item.name}
                                  </div>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomMenuBanner;
