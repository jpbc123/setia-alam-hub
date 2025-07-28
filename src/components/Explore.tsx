import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Explore = () => {
  const [showMore, setShowMore] = useState(false);

  const initialBusinesses = [
    {
      id: 1,
      name: "ATM Locator",
      category: "Banking",
      image: "🏧",
      description: "Find nearby ATMs and banks across Setia Alam with ease.",
      link: "/atm-locator",
    },
    {
      id: 2,
      name: "Emergency Contacts",
      category: "Safety",
      image: "🚨",
      description: "Quick access to police, fire department, and emergency hotlines.",
      link: "/emergency-contacts",
    },
    {
      id: 3,
      name: "Clinics & Health Services",
      category: "Healthcare",
      image: "🏥",
      description: "Access to trusted clinics, dental care, and emergency services.",
      link: "/health-services",
    },
  ];

  const extraBusinesses = [
    {
      id: 4,
      name: "Pet Services",
      category: "Pets",
      image: "🐾",
      description: "Discover pet groomers, boarding, and veterinary services.",
      link: "/pet-services",
    },
    {
      id: 5,
      name: "Community Groups & NGOs",
      category: "Non-Profit",
      image: "🤝",
      description: "Join community efforts, volunteer, or support local NGOs.",
      link: "/community-groups",
    },
    {
      id: 6,
      name: "Sports",
      category: "Recreation",
      image: "🏸",
      description: "Popular pickleball courts, badminton halls, and parks for all ages.",
      link: "/sports",
    },
    {
      id: 7,
      name: "Fitness & Wellness",
      category: "Wellness",
      image: "🏋️‍♂️",
      description: "Explore gyms, yoga studios, and wellness centers around you.",
      link: "/fitness",
    },
  ];

  const displayedBusinesses = showMore
    ? [...initialBusinesses, ...extraBusinesses]
    : initialBusinesses;

  return (
    <section className="py-16 bg-community-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Explore Setia Alam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and support the amazing businesses that make Setia Alam special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBusinesses.map((business) => (
            <Link
              key={business.id}
              to={business.link}
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-0 h-full">
                <CardHeader className="pb-3">
                  <div className="flex flex-col items-center space-y-2 w-full text-center">
                    <CardTitle className="text-lg line-clamp-1">{business.name}</CardTitle>

                    <div className="text-xs bg-community-green-light text-community-green px-3 py-1 rounded-md">
                      {business.category}
                    </div>

                    <div className="text-2xl w-12 h-12 bg-white border rounded-full shadow flex items-center justify-center">
                      {business.image}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {business.description}
                  </p>

                  <div className="pt-2 border-t text-sm font-medium text-community-green hover:text-community-green/80 transition-colors">
                    View Details →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground hover:opacity-90 px-8 py-3 font-medium shadow-medium transition"
          >
            {showMore ? "View Less" : "View More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Explore;
