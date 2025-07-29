import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import BottomMenuBanner from "@/components/BottomMenuBanner";
import TrendingCarousel from "@/components/TrendingCarousel";
import Explore from "@/components/Explore";
import RightSidebar from "@/components/RightSidebar";

const Index = () => {
  const exploreRef = useRef<HTMLDivElement>(null);

  const handleScrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-malaysia-light">
      {/* Hero Section */}
      <HeroSection onExploreClick={handleScrollToExplore} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={exploreRef}>
          {/* Left Column: Trending + Featured */}
          <div className="lg:col-span-2 space-y-8">
            <TrendingCarousel />
            <Explore />
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Bottom Menu Banner */}
      <BottomMenuBanner />
    </div>
  );
};

export default Index;
