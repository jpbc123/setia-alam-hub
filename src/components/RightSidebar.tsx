import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RightSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Weather Widget */}
      <Card className="shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-malaysia-dark flex items-center">
            🌤️ Setia Alam Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-malaysia-red mb-2">32°C</div>
            <div className="text-gray-600 mb-3">Partly Cloudy</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Humidity:</span>
                <span className="ml-1 font-medium">75%</span>
              </div>
              <div>
                <span className="text-gray-500">Wind:</span>
                <span className="ml-1 font-medium">8 km/h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advertisement Placeholder */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-malaysia-yellow/20 to-malaysia-red/20 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-malaysia-dark mb-2">
              Advertise Here
            </h3>
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
      <Card className="shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-malaysia-dark flex items-center">
            💱 Live Forex (MYR)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">USD</span>
            <div className="text-right">
              <div className="font-semibold">4.68</div>
              <div className="text-xs text-green-600">+0.02</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">SGD</span>
            <div className="text-right">
              <div className="font-semibold">3.45</div>
              <div className="text-xs text-red-600">-0.01</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">EUR</span>
            <div className="text-right">
              <div className="font-semibold">5.12</div>
              <div className="text-xs text-green-600">+0.05</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">GBP</span>
            <div className="text-right">
              <div className="font-semibold">5.89</div>
              <div className="text-xs text-gray-500">0.00</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center mt-3">
            Last updated: 2 mins ago
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;