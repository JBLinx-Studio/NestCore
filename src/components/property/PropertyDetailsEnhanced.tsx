
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Shield,
  MapPin,
  Activity,
  Zap
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
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevel = (risk: string): number => {
    switch (risk) {
      case 'very_low': return 20;
      case 'low': return 40;
      case 'moderate': return 60;
      case 'high': return 80;
      case 'very_high': return 100;
      default: return 0;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very_low': case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': case 'very_high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Property Intelligence</h3>
              <p className="text-sm text-gray-600">Gathering comprehensive data from multiple sources...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-emerald-200 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Home className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Enhanced Property Intelligence
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Comprehensive analysis for {property.displayName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1">
                <Activity className="h-3 w-3 mr-1" />
                Deep Analysis
              </Badge>
              {propertyDetails && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                  {Math.round(propertyDetails.confidence * 100)}% Confidence
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-12 bg-gray-50 border border-gray-200 rounded-lg p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Home className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="structure" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Hammer className="h-4 w-4 mr-2" />
            Structure
          </TabsTrigger>
          <TabsTrigger value="weather" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <CloudRain className="h-4 w-4 mr-2" />
            Climate
          </TabsTrigger>
          <TabsTrigger value="risks" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Risks
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Calendar className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {propertyDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Property Layout Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                    <Bed className="h-4 w-4 mr-2 text-blue-600" />
                    Property Layout
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {propertyDetails.physical.bedrooms || 'N/A'}
                      </div>
                      <div className="text-xs text-blue-700">Bedrooms</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {propertyDetails.physical.bathrooms || 'N/A'}
                      </div>
                      <div className="text-xs text-green-700">Bathrooms</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="text-lg font-semibold text-purple-600">
                        {propertyDetails.physical.garages || 0}
                      </div>
                      <div className="text-xs text-purple-700">Garages</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <div className="text-lg font-semibold text-orange-600">
                        {propertyDetails.physical.stories || 1}
                      </div>
                      <div className="text-xs text-orange-700">Stories</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Type & Age */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1 text-sm">
                      {propertyDetails.physical.propertyType?.replace('_', ' ') || 'Unknown Type'}
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {propertyDetails.physical.propertyAge || 'Unknown'}
                    </div>
                    <div className="text-xs text-purple-700">Years Old</div>
                    {propertyDetails.physical.constructionYear && (
                      <div className="text-xs text-gray-500 mt-1">
                        Built in {propertyDetails.physical.constructionYear}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Features Summary */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                    <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${propertyDetails.features.pool ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-xs">Pool</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${propertyDetails.features.garden ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-xs">Garden</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-gray-500">Parking:</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {propertyDetails.features.parking.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {propertyDetails.features.security.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                          {feature.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Quality */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium text-gray-700">
                    <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                    Data Quality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {Math.round(propertyDetails.confidence * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">Confidence Score</div>
                  </div>
                  <Progress 
                    value={propertyDetails.confidence * 100} 
                    className="h-2"
                  />
                  <div className="text-center">
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                      {propertyDetails.dataSource.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Structure Tab */}
        <TabsContent value="structure" className="space-y-6">
          {propertyDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Hammer className="h-5 w-5 mr-2 text-gray-600" />
                    Structural Elements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Roof</span>
                        <Badge className={`text-xs ${getConditionColor(propertyDetails.structural.roofCondition)}`}>
                          {propertyDetails.structural.roofCondition}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{propertyDetails.structural.roofType || 'Unknown type'}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Walls</span>
                        <Badge className={`text-xs ${getConditionColor(propertyDetails.structural.wallCondition)}`}>
                          {propertyDetails.structural.wallCondition}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{propertyDetails.structural.wallMaterial || 'Unknown material'}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Foundation</span>
                        <Badge variant="outline" className="text-xs">
                          Good
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{propertyDetails.structural.foundationType || 'Standard'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Wrench className="h-5 w-5 mr-2 text-blue-600" />
                    Systems & Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Heating System</span>
                      <p className="text-sm text-gray-600 mt-1">
                        {propertyDetails.structural.heatingType || 'Not specified'}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Cooling System</span>
                      <p className="text-sm text-gray-600 mt-1">
                        {propertyDetails.structural.coolingType || 'Not specified'}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Appliances</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {propertyDetails.features.appliances.map((appliance, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {appliance}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Climate Tab */}
        <TabsContent value="weather" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regionalWeather && (
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Regional Climate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Climate Zone</span>
                      <p className="text-sm text-blue-700 font-semibold">{regionalWeather.climateZone}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Region</span>
                      <p className="text-sm text-green-700 font-semibold">{regionalWeather.region}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Microclimate</span>
                    <p className="text-sm text-gray-600 mt-1">{regionalWeather.microclimate}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CloudRain className="h-5 w-5 mr-2 text-green-600" />
                  Monthly Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {monthlyWeather.slice(0, 6).map((month, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <span className="font-medium text-sm text-gray-700">{month.month}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600">
                          {month.averageTemp.toFixed(1)}°C
                        </div>
                        <div className="text-xs text-green-600">
                          {month.rainfall.toFixed(0)}mm rain
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks" className="space-y-6">
          {disasters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                    Natural Disaster Risks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries({
                    'Earthquake': disasters.earthquakes.riskLevel,
                    'Flood': disasters.floods.riskLevel,
                    'Fire': disasters.fires.riskLevel,
                    'Storm': disasters.storms.hailRisk
                  }).map(([type, level]) => (
                    <div key={type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{type} Risk</span>
                        <Badge className={`text-xs ${getConditionColor(level)}`}>
                          {level.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Progress 
                        value={getRiskLevel(level)} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Environmental Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Flood Zone</span>
                    <p className="text-sm text-blue-700 mt-1">{disasters.floods.floodZone}</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Fire Season</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {disasters.fires.fireSeasonMonths.slice(0, 3).map((month, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {month}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Drought Status</span>
                    <Badge className={`text-xs mt-1 ${getConditionColor(disasters.drought.currentStatus)}`}>
                      {disasters.drought.currentStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Property Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {propertyDetails?.history.previousSales.length ? (
                <div className="space-y-3">
                  {propertyDetails.history.previousSales.map((sale, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          {new Date(sale.date).toLocaleDateString()}
                        </span>
                        <span className="text-green-600 font-bold text-lg">
                          R{sale.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        R{sale.pricePerSqm.toLocaleString()}/m²
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Transaction History Available</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Property transaction history requires integration with property databases and title deed records.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
