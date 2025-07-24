import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import UpcomingEvents from "@/components/UpcomingEvents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedBusinesses />
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default Index;
