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
  const [expandedBank, setExpandedBank] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/atm_locations.json`)
      .then((res) => res.json())
      .then((data: AtmData) => setAtmData(data))
      .catch((err) => console.error("Failed to load ATM data:", err));
  }, []);

  const banks = Object.keys(atmData);

  return (
    <div className="min-h-screen bg-white text-gray-800 py-10 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        ATM Locator – Setia Alam
      </h1>
	  <h5 className="text-center text-sm text-gray-600 mb-4">
		Click on any of the banks below to reveal all available locations.
	  </h5>

      <div className="space-y-4">
        {banks.map((bank) => (
          <div key={bank} className="border border-gray-300 rounded-xl">
            <button
              onClick={() =>
                setExpandedBank(expandedBank === bank ? null : bank)
              }
              className={cn(
                "w-full text-left px-4 py-3 font-semibold transition",
                expandedBank === bank ? "bg-yellow-100" : "bg-white hover:bg-gray-100"
              )}
            >
              {bank}
            </button>

            <AnimatePresence initial={false}>
              {expandedBank === bank && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <ul className="space-y-3 mt-2">
                    {atmData[bank].map((loc, idx) => (
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

                        <AnimatePresence>
                          {selectedLocation === loc.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-2 text-sm text-gray-700 space-y-2"
                            >
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
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtmLocator;
