
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Calendar,
  Wrench,
  Thermometer,
  CloudRain,
  AlertTriangle,
  TrendingUp,
  Bed,
  Bath,
  Car,
  Hammer,
  Shield
} from "lucide-react";
import { PropertyLocation } from "@/services/OpenStreetMapService";
import { enhancedPropertyAnalysisService, DetailedPropertyData } from "@/services/EnhancedPropertyAnalysisService";
import { comprehensiveWeatherService, MonthlyWeatherData, AnnualWeatherData, RegionalWeatherData, NaturalDisasterData } from "@/services/ComprehensiveWeatherService";

interface PropertyDetailsEnhancedProps {
  property: PropertyLocation;
}

export const PropertyDetailsEnhanced = ({ property }: PropertyDetailsEnhancedProps) => {
  const [propertyDetails, setPropertyDetails] = useState<DetailedPropertyData | null>(null);
  const [monthlyWeather, setMonthlyWeather] = useState<MonthlyWeatherData[]>([]);
  const [annualWeather, setAnnualWeather] = useState<AnnualWeatherData[]>([]);
  const [regionalWeather, setRegionalWeather] = useState<RegionalWeatherData | null>(null);
  const [disasters, setDisasters] = useState<NaturalDisasterData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEnhancedData();
  }, [property]);

  const loadEnhancedData = async () => {
    setIsLoading(true);
    console.log('Loading enhanced property data for:', property.displayName);

    try {
      const [detailsData, weatherData] = await Promise.allSettled([
        enhancedPropertyAnalysisService.getDetailedPropertyData(property.lat, property.lon, property.displayName),
        comprehensiveWeatherService.getMonthlyWeatherData(property.lat, property.lon),
        comprehensiveWeatherService.getAnnualWeatherData(property.lat, property.lon),
        comprehensiveWeatherService.getRegionalWeatherData(property.lat, property.lon),
        comprehensiveWeatherService.getNaturalDisasterData(property.lat, property.lon)
      ]);

      if (detailsData.status === 'fulfilled') setPropertyDetails(detailsData.value);
      if (weatherData.status === 'fulfilled') setMonthlyWeather(weatherData.value);
      
      // Load other weather data
      const annual = await comprehensiveWeatherService.getAnnualWeatherData(property.lat, property.lon);
      const regional = await comprehensiveWeatherService.getRegionalWeatherData(property.lat, property.lon);
      const disasterData = await comprehensiveWeatherService.getNaturalDisasterData(property.lat, property.lon);
      
      setAnnualWeather(annual);
      setRegionalWeather(regional);
      setDisasters(disasterData);

      console.log('Enhanced data loaded successfully');
    } catch (error) {
      console.error('Failed to load enhanced data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very_low': case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': case 'very_high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500">Loading detailed property analysis...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-green-600" />
            <span>Enhanced Property Intelligence</span>
            <Badge className="bg-green-100 text-green-800">Deep Analysis</Badge>
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive property and environmental analysis for {property.displayName}
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="property" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="property">Property Details</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="weather">Weather Analysis</TabsTrigger>
          <TabsTrigger value="disasters">Natural Hazards</TabsTrigger>
          <TabsTrigger value="history">Property History</TabsTrigger>
        </TabsList>

        <TabsContent value="property" className="space-y-4">
          {propertyDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bed className="h-5 w-5 text-blue-600" />
                    <span>Property Layout</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Bedrooms:</span>
                      <p className="font-medium text-2xl text-blue-600">{propertyDetails.physical.bedrooms || 'Unknown'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Bathrooms:</span>
                      <p className="font-medium text-2xl text-blue-600">{propertyDetails.physical.bathrooms || 'Unknown'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Garages:</span>
                      <p className="font-medium text-2xl text-green-600">{propertyDetails.physical.garages || 0}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Stories:</span>
                      <p className="font-medium text-2xl text-green-600">{propertyDetails.physical.stories || 1}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <span className="text-gray-500">Property Type:</span>
                    <p className="font-medium capitalize">{propertyDetails.physical.propertyType || 'Unknown'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Property Age</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {propertyDetails.physical.propertyAge || 'Unknown'} 
                      {propertyDetails.physical.propertyAge && ' years'}
                    </div>
                    <p className="text-sm text-gray-500">Property Age</p>
                  </div>
                  
                  {propertyDetails.physical.constructionYear && (
                    <div className="text-center pt-2 border-t">
                      <span className="text-gray-500">Built in:</span>
                      <p className="font-medium">{propertyDetails.physical.constructionYear}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <span>Data Confidence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {Math.round(propertyDetails.confidence * 100)}%
                    </div>
                    <p className="text-sm text-gray-500">Accuracy Score</p>
                  </div>
                  
                  <div className="text-center pt-2 border-t">
                    <span className="text-gray-500">Data Source:</span>
                    <Badge className="ml-2">
                      {propertyDetails.dataSource.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          {propertyDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hammer className="h-5 w-5 text-brown-600" />
                    <span>Roof & Walls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-500">Roof Type:</span>
                    <p className="font-medium">{propertyDetails.structural.roofType || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Roof Condition:</span>
                    <p className={`font-medium capitalize ${getConditionColor(propertyDetails.structural.roofCondition)}`}>
                      {propertyDetails.structural.roofCondition}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Wall Material:</span>
                    <p className="font-medium">{propertyDetails.structural.wallMaterial || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Wall Condition:</span>
                    <p className={`font-medium capitalize ${getConditionColor(propertyDetails.structural.wallCondition)}`}>
                      {propertyDetails.structural.wallCondition}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-gray-600" />
                    <span>Property Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500">Pool:</span>
                      <p className="font-medium">{propertyDetails.features.pool ? '✅ Yes' : '❌ No'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Garden:</span>
                      <p className="font-medium">{propertyDetails.features.garden ? '✅ Yes' : '❌ No'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Parking:</span>
                    <p className="font-medium capitalize">{propertyDetails.features.parking.replace('_', ' ')}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Security Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {propertyDetails.features.security.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regionalWeather && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    <span>Regional Climate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-500">Climate Zone:</span>
                    <p className="font-medium">{regionalWeather.climateZone}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Region:</span>
                    <p className="font-medium">{regionalWeather.region}, {regionalWeather.province}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Microclimate:</span>
                    <p className="text-sm text-gray-700">{regionalWeather.microclimate}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CloudRain className="h-5 w-5 text-green-600" />
                  <span>Monthly Weather Patterns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {monthlyWeather.map((month, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium text-sm">{month.month}</span>
                      <div className="text-xs text-gray-600">
                        {month.averageTemp.toFixed(1)}°C • {month.rainfall.toFixed(0)}mm
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="disasters" className="space-y-4">
          {disasters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Natural Disaster Risks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Earthquake Risk:</span>
                      <p className={`font-medium capitalize ${getRiskColor(disasters.earthquakes.riskLevel)}`}>
                        {disasters.earthquakes.riskLevel.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Flood Risk:</span>
                      <p className={`font-medium capitalize ${getRiskColor(disasters.floods.riskLevel)}`}>
                        {disasters.floods.riskLevel.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Fire Risk:</span>
                      <p className={`font-medium capitalize ${getRiskColor(disasters.fires.riskLevel)}`}>
                        {disasters.fires.riskLevel.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Storm Risk:</span>
                      <p className={`font-medium capitalize ${getRiskColor(disasters.storms.hailRisk)}`}>
                        {disasters.storms.hailRisk}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Environmental Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-500">Flood Zone:</span>
                    <p className="font-medium">{disasters.floods.floodZone}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Fire Season:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {disasters.fires.fireSeasonMonths.map((month, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {month}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Drought Status:</span>
                    <p className={`font-medium capitalize ${getRiskColor(disasters.drought.currentStatus)}`}>
                      {disasters.drought.currentStatus}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {propertyDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Property History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {propertyDetails.history.previousSales.length > 0 ? (
                  <div className="space-y-3">
                    {propertyDetails.history.previousSales.map((sale, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{new Date(sale.date).toLocaleDateString()}</span>
                          <span className="text-green-600 font-bold">
                            R{sale.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          R{sale.pricePerSqm.toLocaleString()}/m²
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Property history requires integration with property transaction databases
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
