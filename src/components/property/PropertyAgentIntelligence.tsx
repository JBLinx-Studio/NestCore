
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  School, 
  Users, 
  AlertTriangle,
  Bus,
  TrendingDown,
  TrendingUp,
  Wind,
  Droplets,
  Building,
  Car,
  MapPin,
  Clock,
  DollarSign,
  Gauge
} from "lucide-react";
import { PropertyLocation } from "@/services/OpenStreetMapService";
import { 
  propertyIntelligenceService,
  CrimeData,
  SchoolData,
  DemographicsData,
  EnvironmentalHazards,
  TransportationData
} from "@/services/PropertyIntelligenceService";

interface PropertyAgentIntelligenceProps {
  property: PropertyLocation;
}

export const PropertyAgentIntelligence = ({ property }: PropertyAgentIntelligenceProps) => {
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);
  const [environmental, setEnvironmental] = useState<EnvironmentalHazards | null>(null);
  const [transportation, setTransportation] = useState<TransportationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAgentIntelligence();
  }, [property]);

  const loadAgentIntelligence = async () => {
    setIsLoading(true);
    console.log('Loading agent intelligence for:', property.displayName);

    try {
      const [crime, schools, demo, env, transport] = await Promise.allSettled([
        propertyIntelligenceService.getCrimeData(property.lat, property.lon),
        propertyIntelligenceService.getSchoolData(property.lat, property.lon),
        propertyIntelligenceService.getDemographicsData(property.lat, property.lon),
        propertyIntelligenceService.getEnvironmentalHazards(property.lat, property.lon),
        propertyIntelligenceService.getTransportationData(property.lat, property.lon)
      ]);

      if (crime.status === 'fulfilled') setCrimeData(crime.value);
      if (schools.status === 'fulfilled') setSchoolData(schools.value);
      if (demo.status === 'fulfilled') setDemographics(demo.value);
      if (env.status === 'fulfilled') setEnvironmental(env.value);
      if (transport.status === 'fulfilled') setTransportation(transport.value);

      console.log('Agent intelligence loaded successfully');
    } catch (error) {
      console.error('Failed to load agent intelligence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSafetyLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 60) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (score >= 40) return { level: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Needs Attention', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getAirQualityLevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-600' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-600' };
    return { level: 'Unhealthy', color: 'text-red-600' };
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500">Loading agent intelligence data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-purple-600" />
            <span>Agent Intelligence Dashboard</span>
            <Badge className="bg-purple-100 text-purple-800">Free Data Sources</Badge>
          </CardTitle>
          <p className="text-gray-600">
            Hard-to-find information that real estate agents need for {property.displayName}
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="safety" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="safety">Safety & Crime</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="safety" className="space-y-4">
          {crimeData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Safety Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg ${getSafetyLevel(crimeData.safetyScore).bg}`}>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getSafetyLevel(crimeData.safetyScore).color}`}>
                        {crimeData.safetyScore}/100
                      </div>
                      <p className={`text-sm font-medium ${getSafetyLevel(crimeData.safetyScore).color}`}>
                        {getSafetyLevel(crimeData.safetyScore).level}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total Incidents (12mo):</span>
                      <p className="font-medium">{crimeData.totalIncidents}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Crime Rate:</span>
                      <p className="font-medium">{crimeData.crimeRate.toFixed(1)}/1000</p>
                    </div>
                    <div>
                      <span className="text-gray-500">vs City Average:</span>
                      <p className={`font-medium ${crimeData.crimeRate < crimeData.comparison.cityAverage ? 'text-green-600' : 'text-red-600'}`}>
                        {crimeData.crimeRate < crimeData.comparison.cityAverage ? '↓ Better' : '↑ Higher'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">vs National:</span>
                      <p className={`font-medium ${crimeData.crimeRate < crimeData.comparison.nationalAverage ? 'text-green-600' : 'text-red-600'}`}>
                        {crimeData.crimeRate < crimeData.comparison.nationalAverage ? '↓ Better' : '↑ Higher'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Recent Incidents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {crimeData.recentIncidents.map((incident, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{incident.type}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(incident.date).toLocaleDateString()} • {incident.distance}m away
                          </p>
                        </div>
                        <Badge 
                          variant={incident.severity === 'low' ? 'default' : 
                                  incident.severity === 'medium' ? 'secondary' : 'destructive'}
                        >
                          {incident.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="schools" className="space-y-4">
          {schoolData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="h-5 w-5 text-green-600" />
                    <span>School Quality</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-600">
                      {schoolData.averageRating.toFixed(1)}/5.0
                    </div>
                    <p className="text-sm text-gray-500">Average School Rating</p>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-500">School District:</span>
                    <p className="font-medium">{schoolData.schoolDistrict}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nearby Schools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schoolData.nearbySchools.map((school, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{school.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{school.type} • {school.distance}m</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{school.rating}</div>
                            <div className="text-xs text-gray-500">rating</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          {demographics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Population</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {demographics.population.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500">Total Population</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        {demographics.medianAge} years
                      </div>
                      <p className="text-sm text-gray-500">Median Age</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Income & Employment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(demographics.medianIncome)}
                      </div>
                      <p className="text-sm text-gray-500">Median Income</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        {demographics.employmentRate}%
                      </div>
                      <p className="text-sm text-gray-500">Employment Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="h-5 w-5 text-purple-600" />
                    <span>Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xl font-bold">
                        {demographics.educationLevel.highSchool}%
                      </div>
                      <p className="text-sm text-gray-500">High School+</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">
                        {demographics.educationLevel.university}%
                      </div>
                      <p className="text-sm text-gray-500">University+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          {environmental && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wind className="h-5 w-5 text-blue-600" />
                    <span>Air Quality</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold ${getAirQualityLevel(environmental.airQuality.aqi).color}`}>
                      {environmental.airQuality.aqi}
                    </div>
                    <p className={`text-sm font-medium ${getAirQualityLevel(environmental.airQuality.aqi).color}`}>
                      {getAirQualityLevel(environmental.airQuality.aqi).level}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">PM2.5:</span>
                      <p className="font-medium">{environmental.airQuality.pollutants.pm25} µg/m³</p>
                    </div>
                    <div>
                      <span className="text-gray-500">PM10:</span>
                      <p className="font-medium">{environmental.airQuality.pollutants.pm10} µg/m³</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Ozone:</span>
                      <p className="font-medium">{environmental.airQuality.pollutants.o3} µg/m³</p>
                    </div>
                    <div>
                      <span className="text-gray-500">NO2:</span>
                      <p className="font-medium">{environmental.airQuality.pollutants.no2} µg/m³</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Natural Hazards</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Flood Risk:</span>
                    <Badge variant={environmental.floodRisk.level === 'low' ? 'default' : 'destructive'}>
                      {environmental.floodRisk.level}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Earthquake Risk:</span>
                    <Badge variant={environmental.earthquakeRisk.level === 'low' ? 'default' : 'destructive'}>
                      {environmental.earthquakeRisk.level}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fire Risk:</span>
                    <Badge variant={environmental.fireRisk.level === 'low' ? 'default' : 'destructive'}>
                      {environmental.fireRisk.level}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>Flood Zone: {environmental.floodRisk.floodZone}</p>
                    <p>Recent Earthquakes: {environmental.earthquakeRisk.recentActivity.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          {transportation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bus className="h-5 w-5 text-green-600" />
                    <span>Public Transport</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Nearest Station:</span>
                    <p className="font-medium">{transportation.publicTransport.nearestStation}</p>
                    <p className="text-sm text-gray-600">
                      {transportation.publicTransport.type} • {transportation.publicTransport.distance}m away
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{transportation.walkScore}</div>
                      <p className="text-xs text-gray-600">Walk Score</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{transportation.bikeScore}</div>
                      <p className="text-xs text-gray-600">Bike Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-orange-600" />
                    <span>Commute Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">To CBD:</span>
                      <p className="text-xl font-bold">{transportation.commuteTimes.cbd} min</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">To Airport:</span>
                      <p className="text-xl font-bold">{transportation.commuteTimes.airport} min</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Traffic Level:</span>
                    <Badge 
                      variant={transportation.trafficLevel === 'low' ? 'default' : 
                              transportation.trafficLevel === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {transportation.trafficLevel}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Data Sources */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Data Sources (All Free APIs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
            <div>
              <strong>Crime:</strong> SA Police Service Open Data
            </div>
            <div>
              <strong>Schools:</strong> Dept. of Basic Education
            </div>
            <div>
              <strong>Demographics:</strong> Statistics South Africa
            </div>
            <div>
              <strong>Environment:</strong> USGS, OpenAQ, SAWS
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
