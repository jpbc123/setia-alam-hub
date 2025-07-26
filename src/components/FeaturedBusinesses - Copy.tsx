import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock } from "lucide-react";

const FeaturedBusinesses = () => {
  const businesses = [
    {
      id: 1,
      name: "Setia City Mall",
      category: "Shopping Mall",
      image: "🏬",
      rating: 4.5,
      description: "Your one-stop shopping destination with over 200 stores",
      location: "Setia Alam Central",
      hours: "10AM - 10PM",
      featured: true
    },
    {
      id: 2,
      name: "Restoran Hakka",
      category: "Chinese Cuisine",
      image: "🍜",
      rating: 4.8,
      description: "Authentic Hakka dishes with family recipes",
      location: "Jalan Setia Alam",
      hours: "11AM - 9PM",
      featured: false
    },
    {
      id: 3,
      name: "Fitness Zone Gym",
      category: "Fitness Center",
      image: "💪",
      rating: 4.6,
      description: "State-of-the-art equipment and personal training",
      location: "Setia Business Park",
      hours: "6AM - 11PM",
      featured: true
    },
    {
      id: 4,
      name: "Paws & Claws Pet Spa",
      category: "Pet Services",
      image: "🐾",
      rating: 4.9,
      description: "Premium grooming and boarding services for your pets",
      location: "Setia Alam U13",
      hours: "9AM - 7PM",
      featured: false
    },
    {
      id: 5,
      name: "Central Park Café",
      category: "Coffee & Pastry",
      image: "☕",
      rating: 4.4,
      description: "Freshly brewed coffee and homemade pastries",
      location: "Setia Walk",
      hours: "7AM - 6PM",
      featured: true
    },
    {
      id: 6,
      name: "Tech Repair Hub",
      category: "Electronics",
      image: "📱",
      rating: 4.7,
      description: "Quick and reliable phone and laptop repairs",
      location: "Setia Avenue",
      hours: "10AM - 8PM",
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-community-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Featured Local Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and support the amazing businesses that make Setia Alam special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <Card 
              key={business.id} 
              className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-0 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{business.image}</div>
                    <div>
                      <CardTitle className="text-lg line-clamp-1">{business.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-community-green-light text-community-green"
                        >
                          {business.category}
                        </Badge>
                        {business.featured && (
                          <Badge className="text-xs bg-gradient-hero">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {business.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{business.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{business.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{business.hours}</span>
                </div>

                <div className="pt-2 border-t">
                  <button className="w-full text-sm font-medium text-community-green hover:text-community-green/80 transition-colors">
                    View Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground hover:opacity-90 px-8 py-3 font-medium shadow-medium">
            Explore All Businesses
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;