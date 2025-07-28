import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  icon: string;
  label: string;
  items: string[];
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
      "Community Chat / Brainstorm",
      "Submit News or Tips",
      "Suggest a Business or Event",
    ],
  },
  {
    icon: "📢",
    label: "Advertise With Us",
    items: [
      "Promote Your Business",
      "Feature a Restaurant",
      "Sponsored Listings",
      "Classifieds",
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

            return (
              <div
                key={index}
                className="relative flex-1"
                onMouseEnter={() => setActiveMenuIndex(index)}
                onMouseLeave={() => setActiveMenuIndex(null)}
              >
                {menu.href ? (
                  <Link
                    to={menu.href}
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
                  </Link>
                ) : (
                  <>
                    <div className="flex flex-col items-center w-full h-full text-malaysia-light hover:text-malaysia-yellow hover:bg-malaysia-dark/50 p-2 cursor-pointer">
                      <span className="text-2xl mb-1">{menu.icon}</span>
                      <span
                        className={`text-xs text-center transition-all duration-300 ${
                          isScrolled ? "menu-label-hidden" : "menu-label-visible"
                        }`}
                      >
                        {menu.label}
                      </span>
                    </div>
                    {menu.items.length > 0 && isActive && (
                      <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 min-w-[260px] bg-white border border-gray-200 shadow-lg rounded-md z-50 flex flex-col">
                        {menu.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 cursor-pointer whitespace-nowrap transition"
                          >
                            {item}
                          </div>
                        ))}
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
