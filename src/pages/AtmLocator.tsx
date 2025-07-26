import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPinned } from "lucide-react";

interface AtmLocation {
  name: string;
  address: string;
  mapUrl: string;
}

type AtmData = Record<string, AtmLocation[]>;

const AtmLocator = () => {
  const [atmData, setAtmData] = useState<AtmData>({});
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load ATM data from static JSON
	useEffect(() => {
	fetch(`${import.meta.env.BASE_URL}data/atm_locations.json`)
		.then((res) => res.json())
		.then((data: AtmData) => setAtmData(data))
		.catch((err) => console.error("Failed to load ATM data:", err));
	}, []);

  const banks = Object.keys(atmData);

  return (
    <div className="min-h-screen bg-white text-gray-800 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        ATM Locator – Setia Alam
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Column – Bank Cards */}
        <div className="space-y-4">
          {banks.map((bank) => (
            <Card
              key={bank}
              onClick={() => {
                setSelectedBank(bank);
                setSelectedLocation(null);
              }}
              className={cn(
                "cursor-pointer border border-gray-300 hover:border-black transition",
                selectedBank === bank ? "bg-yellow-100" : "bg-white"
              )}
            >
              <CardContent className="p-4 text-center font-semibold">
                {bank}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column – Animated ATM List */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedBank && (
              <motion.div
                key={selectedBank}
                initial={{ opacity: 0, scaleX: 0.5, originX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.5, originX: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 border border-gray-300 rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {selectedBank} ATM Locations in Setia Alam
                </h2>
                <ul className="space-y-4">
                  {atmData[selectedBank]?.map((loc, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() =>
                          setSelectedLocation(
                            selectedLocation === loc.name ? null : loc.name
                          )
                        }
                        className="text-left text-blue-700 font-medium hover:underline"
                      >
                        {loc.name}
                      </button>

                      {selectedLocation === loc.name && (
                        <div className="ml-4 mt-2 text-sm text-gray-700 space-y-2">
                          <p>{loc.address}</p>
                          <a
                            href={loc.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md"
                          >
                            <MapPinned className="w-4 h-4" />
                            Directions
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AtmLocator;
