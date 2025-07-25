// src/components/widgets/ForexWidget.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { RotateCcw } from "lucide-react";

interface ForexRate {
  currency: string;
  rate: number;
  change: number;
}

export default function ForexWidget() {
  const [forexData, setForexData] = useState<ForexRate[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const BASE = "MYR";
  const SYMBOLS = ["USD", "SGD", "AUD", "EUR", "GBP", "PHP"];

  const fetchForex = async () => {
    try {
      setIsRefreshing(true);
      const today = format(new Date(), "yyyy-MM-dd");
      const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
      const symbolsQuery = SYMBOLS.join(",");

      const [latestRes, yesterdayRes] = await Promise.all([
        fetch(`https://api.frankfurter.app/latest?from=${BASE}&to=${symbolsQuery}`),
        fetch(`https://api.frankfurter.app/${yesterday}?from=${BASE}&to=${symbolsQuery}`),
      ]);

      const latestData = await latestRes.json();
      const yesterdayData = await yesterdayRes.json();

      const result: ForexRate[] = SYMBOLS.map((currency) => {
        const todayRate = latestData.rates[currency];
        const yesterdayRate = yesterdayData.rates[currency];
        const change = todayRate - yesterdayRate;

        return {
          currency,
          rate: todayRate,
          change,
        };
      });

      setForexData(result);
      setLastUpdated(format(new Date(), "p")); // e.g., 3:05 PM
    } catch (error) {
      console.error("Failed to fetch forex data", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchForex();
  }, []);

  return (
    <Card className="shadow-medium relative">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-malaysia-dark flex items-center">
          💱 Live Forex (MYR)
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {!forexData ? (
          <div className="text-center text-gray-500 text-sm py-4">Loading exchange rates...</div>
        ) : (
          forexData.map((item) => (
            <div key={item.currency} className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.currency}</span>
              <div className="text-right">
                <div className="font-semibold">{item.rate.toFixed(2)}</div>
                <div
                  className={`text-xs ${
                    item.change > 0
                      ? "text-green-600"
                      : item.change < 0
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.change >= 0 ? "+" : ""}
                  {item.change.toFixed(3)}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="text-xs text-gray-500 text-center mt-3">
          Last updated: {lastUpdated}
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchForex}
          disabled={isRefreshing}
          title="Refresh"
          className="absolute bottom-2 right-2 text-gray-400 hover:text-black transition-colors"
        >
          <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </CardContent>
    </Card>
  );
}
