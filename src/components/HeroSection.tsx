import { Button } from "@/components/ui/button";
import heroImage from "@/assets/setia-alam-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-malaysia-yellow to-malaysia-red bg-clip-text text-transparent">
            My Setia Alam
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Your trusted source for everything in Setia Alam
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-hero hover:opacity-90 text-lg px-8 py-3 shadow-strong"
          >
            Explore Now
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-white/10 backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-malaysia-red">500+</div>
            <div className="text-sm text-gray-300">Local Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-malaysia-blue">10K+</div>
            <div className="text-sm text-gray-300">Community Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-malaysia-red">50+</div>
            <div className="text-sm text-gray-300">Weekly Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-malaysia-blue">24/7</div>
            <div className="text-sm text-gray-300">Community Support</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;