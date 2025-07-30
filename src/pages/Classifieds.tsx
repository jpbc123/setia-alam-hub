import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ClassifiedCard from "@/components/classifieds/ClassifiedCard";
import ClassifiedForm from "@/components/classifieds/ClassifiedForm";
import { useAuth } from "@/contexts/AuthContext";

const categories = ["All", "Sports & Fitness", "Home & Living", "Services", "Buy & Sell", "Others"];

interface Listing {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string;
  image_urls: string[];
  created_at: string;
}

export default function Classifieds() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Ensure page scrolls to top when navigating
    window.scrollTo(0, 0);
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch("/api/classifieds"); // Replace with Supabase later
      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  const filteredListings =
    filteredCategory === "All"
      ? listings
      : listings.filter((item) => item.category === filteredCategory);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === filteredCategory ? "default" : "outline"}
              onClick={() => setFilteredCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {user && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <PlusCircle size={18} /> Post a Listing
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <ClassifiedCard key={item.id} listing={item} />
        ))}
      </div>

      <ClassifiedForm open={showForm} setOpen={setShowForm} onPost={fetchListings} />
    </div>
  );
}
