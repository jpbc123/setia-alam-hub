import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-community-green">
              My Setia Alam
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Connecting our community with local news, businesses, and events. 
              Your trusted source for everything Setia Alam.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Made with love for our community</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-green transition-colors">
                  News & Alerts
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-green transition-colors">
                  Local Businesses
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-green transition-colors">
                  Community Events
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-green transition-colors">
                  Submit a Tip
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-green transition-colors">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-blue transition-colors">
                  🍽️ Restaurants & Food
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-blue transition-colors">
                  🛍️ Shopping & Retail
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-blue transition-colors">
                  🏥 Health & Wellness
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-blue transition-colors">
                  🏸 Sports & Recreation
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-community-blue transition-colors">
                  🏠 Home & Garden
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-community-green" />
                <span className="text-primary-foreground/80">Setia Alam, Selangor</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-community-blue" />
                <a 
                  href="mailto:hello@mysetiaalam.com" 
                  className="text-primary-foreground/80 hover:text-community-blue transition-colors"
                >
                  hello@mysetiaalam.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-community-green" />
                <a 
                  href="tel:+60123456789" 
                  className="text-primary-foreground/80 hover:text-community-green transition-colors"
                >
                  +60 12-345 6789
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/60">
              © {currentYear} My Setia Alam. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;