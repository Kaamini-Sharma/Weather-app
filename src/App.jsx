import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Droplets, Wind, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    // --- CORRECTED PART START ---
    const YOUR_ACTUAL_API_KEY = "b4e2b423604efb6dcc544a12718865ae"; // <<< REPLACE THIS WITH YOUR REAL API KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_ACTUAL_API_KEY}&units=metric`;
    // --- CORRECTED PART END ---

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found. Please check the city name.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching weather data. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white">
        <CardContent>
          <div className="flex gap-2 items-center mb-4">
            <Input
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
            />
            <Button onClick={getWeather} variant="default">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-4xl font-extrabold text-blue-600 flex justify-center items-center gap-2">
                <Thermometer className="w-6 h-6" />
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-md capitalize text-gray-500">
                {weather.weather[0].description}
              </p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  {weather.main.humidity}% Humidity
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  {weather.wind.speed} m/s
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
