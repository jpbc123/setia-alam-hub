import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TrendingItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const trendingItems: TrendingItem[] = [
  {
    id: 1,
    title: "New Shopping Mall Opens in Setia Alam",
    description: "Grand opening of Setia City Mall with over 200 retail stores...",
    image: "/placeholder.svg",
    category: "Shopping"
  },
  {
    id: 2,
    title: "Local Food Festival This Weekend",
    description: "Join us for the biggest food festival featuring local delicacies...",
    image: "/placeholder.svg",
    category: "Events"
  },
  {
    id: 3,
    title: "Traffic Update: New Highway Access",
    description: "New highway access point reduces travel time to KL city center...",
    image: "/placeholder.svg",
    category: "Traffic"
  },
  {
    id: 4,
    title: "Community Park Renovation Complete",
    description: "The central park now features new playground and jogging tracks...",
    image: "/placeholder.svg",
    category: "Community"
  },
  {
    id: 5,
    title: "Local Business Spotlight: Ahmad's Bakery",
    description: "Traditional Malaysian pastries made with love for 20 years...",
    image: "/placeholder.svg",
    category: "Business"
  }
];

const TrendingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === trendingItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-malaysia-dark mb-4">
        🔥 Trending in Setia Alam
      </h2>
      
      <div className="relative overflow-hidden rounded-lg shadow-medium">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {trendingItems.map((item) => (
            <Card key={item.id} className="min-w-full">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-malaysia-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-malaysia-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center space-x-2">
        {trendingItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-malaysia-red"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;