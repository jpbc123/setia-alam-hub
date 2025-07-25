import TopNavigation from "@/components/TopNavigation";
import HeroSection from "@/components/HeroSection";
import BottomMenuBanner from "@/components/BottomMenuBanner";
import TrendingCarousel from "@/components/TrendingCarousel";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import RightSidebar from "@/components/RightSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-malaysia-light">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Trending + Featured */}
          <div className="lg:col-span-2 space-y-8">
            <TrendingCarousel />
            <FeaturedBusinesses />
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
