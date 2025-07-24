import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Setia Alam Night Market",
      date: "Every Friday",
      time: "6:00 PM - 11:00 PM",
      location: "Setia City Park",
      attendees: 250,
      category: "Food & Shopping",
      description: "Weekly night market featuring local food vendors, handicrafts, and live music",
      image: "🌃",
      featured: true
    },
    {
      id: 2,
      title: "Community Badminton Tournament",
      date: "Jan 28, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Setia Alam Sports Complex",
      attendees: 64,
      category: "Sports",
      description: "Annual inter-neighborhood badminton championship with prizes",
      image: "🏸",
      featured: false
    },
    {
      id: 3,
      title: "Family Fun Day at Central Park",
      date: "Feb 3, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Setia Central Park",
      attendees: 180,
      category: "Family",
      description: "Games, food trucks, face painting and activities for the whole family",
      image: "🎪",
      featured: true
    },
    {
      id: 4,
      title: "Entrepreneurship Workshop",
      date: "Feb 10, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Setia Business Center",
      attendees: 45,
      category: "Business",
      description: "Learn how to start and grow your local business with expert speakers",
      image: "💼",
      featured: false
    },
    {
      id: 5,
      title: "Sunset Yoga Session",
      date: "Every Sunday",
      time: "6:00 PM - 7:30 PM",
      location: "Setia Alam Lake",
      attendees: 35,
      category: "Wellness",
      description: "Free weekly yoga classes by the beautiful Setia Alam Lake",
      image: "🧘‍♀️",
      featured: false
    },
    {
      id: 6,
      title: "Pet Adoption Drive",
      date: "Feb 17, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "Setia City Mall",
      attendees: 120,
      category: "Pets",
      description: "Find your new furry friend at our monthly pet adoption event",
      image: "🐕",
      featured: true
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Food & Shopping": "bg-orange-100 text-orange-700",
      "Sports": "bg-blue-100 text-blue-700",
      "Family": "bg-pink-100 text-pink-700",
      "Business": "bg-purple-100 text-purple-700",
      "Wellness": "bg-green-100 text-green-700",
      "Pets": "bg-yellow-100 text-yellow-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Upcoming Community Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join your neighbors at these exciting local events and activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 border border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{event.image}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          className={`text-xs ${getCategoryColor(event.category)}`}
                          variant="secondary"
                        >
                          {event.category}
                        </Badge>
                        {event.featured && (
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
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-community-green" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-community-blue" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1 flex-1 min-w-0">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span className="font-medium">{event.attendees}</span>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <button className="w-full text-sm font-medium bg-gradient-hero text-primary-foreground rounded-md py-2 hover:opacity-90 transition-opacity">
                    Register Now
                  </button>
                  <button className="w-full text-sm font-medium text-community-green hover:text-community-green/80 transition-colors">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center rounded-lg border border-community-green text-community-green hover:bg-community-green hover:text-primary-foreground px-8 py-3 font-medium shadow-soft transition-all">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;