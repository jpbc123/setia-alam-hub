import ForexWidget from "@/components/widgets/ForexWidget";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Weather {
  tempC: string;
  description: string;
  humidity: string;
  windSpeed: string;
  iconUrl: string;
}

export default function RightSidebar() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=3.1018,101.4555`
        );
        const data = await response.json();

        setWeather({
          tempC: Math.round(data.current.temp_c).toString(),
          description: data.current.condition.text,
          humidity: `${data.current.humidity}%`,
          windSpeed: `${Math.round(data.current.wind_kph)} km/h`,
          iconUrl: "https:" + data.current.condition.icon,
        });
      } catch (e) {
        console.error("Failed to fetch weather", e);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="space-y-6">
      {/* Weather Widget */}
      <Card className="shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-malaysia-dark flex items-center gap-2">
            {weather?.iconUrl && (
              <img src={weather.iconUrl} alt="Weather Icon" className="w-9 h-9" />
            )}
            Setia Alam Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weather ? (
            <div className="text-center">
              <div className="text-3xl font-bold text-malaysia-red mb-2">
                {weather.tempC} °C
              </div>
              <div className="capitalize text-gray-600 mb-3">
                {weather.description}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Humidity:</span>
                  <span className="ml-1 font-medium">{weather.humidity}</span>
                </div>
                <div>
                  <span className="text-gray-500">Wind:</span>
                  <span className="ml-1 font-medium">{weather.windSpeed}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-4">
              Loading weather...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advertisement Placeholder */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-malaysia-yellow/20 to-malaysia-red/20 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-malaysia-dark mb-2">Advertise Here</h3>
            <p className="text-sm text-gray-600 mb-4">
              Reach thousands of Setia Alam residents daily
            </p>
            <button className="bg-malaysia-red text-white px-4 py-2 rounded-lg text-sm hover:bg-malaysia-orange transition-colors">
              Get Started
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Forex Exchange Widget */}
      <ForexWidget />

      {/* Traffic Widget */}
      <Card className="shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">🚗 Live Traffic</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <iframe
            title="Live Traffic Setia Alam"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15941.745161585364!2d101.465!3d3.108!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdad469a7d46db%3A0x2de9fd1ef47363c0!2sSetia%20Alam%2C%2040170%20Shah%20Alam%2C%20Selangor!5e0!3m2!1sen!2smy!4v1721800000000!5m2!1sen!2smy"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </CardContent>
      </Card>
    </div>
  );
}
