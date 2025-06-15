
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CloudSun, 
  CloudRain,
  Map,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge
} from "lucide-react";
import { weatherService, WeatherData, WeatherForecast } from "@/services/WeatherService";
import { PropertyLocation } from "@/services/OpenStreetMapService";

interface PropertyWeatherProps {
  property: PropertyLocation;
}

export const PropertyWeather = ({ property }: PropertyWeatherProps) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, [property]);

  const loadWeatherData = async () => {
    setIsLoading(true);
    try {
      console.log('Loading weather data for:', property.displayName);
      
      const [weather, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(property.lat, property.lon),
        weatherService.getWeatherForecast(property.lat, property.lon)
      ]);
      
      setCurrentWeather(weather);
      setForecast(forecastData);
      console.log('Weather data loaded:', weather);
      
    } catch (error) {
      console.error('Failed to load weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (description: string) => {
    if (description.includes('rain')) return <CloudRain className="h-8 w-8 text-blue-500" />;
    if (description.includes('cloud')) return <CloudSun className="h-8 w-8 text-gray-500" />;
    return <CloudSun className="h-8 w-8 text-yellow-500" />;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudSun className="h-5 w-5 text-blue-600" />
            <span>Local Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentWeather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CloudSun className="h-5 w-5 text-blue-600" />
            <span>Local Weather</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">Weather data unavailable</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CloudSun className="h-5 w-5 text-blue-600" />
              <span>Current Weather</span>
              <Badge className="bg-green-100 text-green-800">Live Data</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Weather Display */}
            <div className="text-center">
              {getWeatherIcon(currentWeather.description)}
              <div className="text-4xl font-bold text-gray-900 mt-2">
                {currentWeather.temperature}°C
              </div>
              <div className="text-lg text-gray-600 capitalize">
                {currentWeather.description}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Feels like {currentWeather.feelsLike}°C
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-gray-500">Humidity</p>
                  <p className="font-medium">{currentWeather.humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-500">Wind Speed</p>
                  <p className="font-medium">{currentWeather.windSpeed} km/h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Gauge className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-gray-500">Pressure</p>
                  <p className="font-medium">{currentWeather.pressure} hPa</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-gray-500">Visibility</p>
                  <p className="font-medium">{currentWeather.visibility} km</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">📍 Location Weather</p>
                <p className="text-xs text-blue-600">{property.displayName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600">
                  Updated: {new Date(currentWeather.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <span>5-Day Forecast</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  {getWeatherIcon(day.description)}
                  <div className="mt-2">
                    <p className="text-lg font-bold text-gray-900">{day.maxTemp}°</p>
                    <p className="text-sm text-gray-500">{day.minTemp}°</p>
                  </div>
                  <p className="text-xs text-gray-600 capitalize mt-1">{day.description}</p>
                  {day.precipitation > 0 && (
                    <p className="text-xs text-blue-600 mt-1">{day.precipitation}% rain</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
