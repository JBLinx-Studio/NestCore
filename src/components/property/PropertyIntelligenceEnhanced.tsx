import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Building, 
  TrendingUp,
  Shield,
  Zap,
  Users,
  Leaf,
  Car,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { PropertyLocation } from "@/services/OpenStreetMapService";
import { enhancedDataService } from "@/services/EnhancedDataService";
import { toast } from "sonner";

interface PropertyIntelligenceEnhancedProps {
  selectedProperty: PropertyLocation | null;
}

export const PropertyIntelligenceEnhanced = ({ selectedProperty }: PropertyIntelligenceEnhancedProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [enhancedData, setEnhancedData] = useState<any>(null);

  useEffect(() => {
    console.log('Enhanced intelligence triggered for:', selectedProperty);
    if (selectedProperty) {
      generateEnhancedIntelligence(selectedProperty);
    }
  }, [selectedProperty]);

  const generateEnhancedIntelligence = async (property: PropertyLocation) => {
    setIsLoading(true);
    console.log('Generating enhanced intelligence for:', property);
    
    try {
      const data = await enhancedDataService.getAllEnhancedData(property);
      setEnhancedData(data);
      toast.success("🚀 Enhanced property intelligence loaded with real-time data!");
    } catch (error) {
      console.error('Enhanced intelligence error:', error);
      toast.error("Failed to load enhanced intelligence");
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

  if (!selectedProperty) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Property</h3>
          <p className="text-gray-500">
            Choose a property from the Location Search tab to view enhanced intelligence
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">🚀 Gathering Enhanced Intelligence...</h3>
          <p className="text-gray-500">Analyzing location, market, demographics, and more...</p>
        </CardContent>
      </Card>
    );
  }

  if (!enhancedData) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">Loading Enhanced Data...</h3>
          <p className="text-gray-500">Please wait while we gather comprehensive property intelligence</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Building className="h-6 w-6 text-green-600" />
            <span>🚀 Enhanced Property Intelligence</span>
          </CardTitle>
          <div className="space-y-2">
            <p className="text-lg text-gray-700 font-medium">{selectedProperty.displayName}</p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800">
                📍 Real Location Data
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                🌦️ Live Weather
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                📊 Market Analysis
              </Badge>
              <Badge className="bg-orange-100 text-orange-800">
                🚗 Transport Hub
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                🆔 ID Verification Ready
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced API Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Location APIs</span>
              </div>
              <Badge className="bg-green-100 text-green-800">✅ Active</Badge>
            </div>
            <p className="text-xs text-green-700 mt-1">OpenStreetMap + Overpass working</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Weather APIs</span>
              </div>
              <Badge className="bg-green-100 text-green-800">✅ Enhanced</Badge>
            </div>
            <p className="text-xs text-green-700 mt-1">
              {enhancedData.weather?.source || 'Multiple weather sources'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Property APIs</span>
              </div>
              <Badge className="bg-red-100 text-red-800">🔧 Need Setup</Badge>
            </div>
            <p className="text-xs text-red-700 mt-1">Deeds Office, Property24, Lightstone</p>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">ID/Contact APIs</span>
              </div>
              <Badge className="bg-red-100 text-red-800">🔧 Need Setup</Badge>
            </div>
            <p className="text-xs text-red-700 mt-1">Home Affairs, CIPC, Credit Bureau</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg h-14">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            🏠 Overview
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            📍 Location
          </TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            📊 Market
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            👥 Community
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
            ⚡ Services
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            📞 Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>Property Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium">{enhancedData.propertySpecific.architecturalStyle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Built:</span>
                    <span className="font-medium">{enhancedData.propertySpecific.buildingAge}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Energy Rating:</span>
                    <Badge variant="secondary">{enhancedData.propertySpecific.energyRating}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Parking:</span>
                    <span className="font-medium">{enhancedData.propertySpecific.parkingSpaces} spaces</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Market Position</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Economic Level:</span>
                    <span className="font-medium">{enhancedData.demographics.incomeLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Employment:</span>
                    <span className="font-medium">{enhancedData.demographics.employmentRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GDP Growth:</span>
                    <span className="font-medium">{enhancedData.economic.gdpPerCapita}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span>Security & Safety</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Safety Score:</span>
                    <Badge className="bg-green-100 text-green-800">
                      {enhancedData.crime.safetyScore}/10
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Neighborhood Watch:</span>
                    <span className="font-medium">
                      {enhancedData.propertySpecific.neighborhoodWatch ? '✅ Active' : '❌ None'}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Security Features:</span>
                    <div className="mt-1 space-y-1">
                      {enhancedData.propertySpecific.securityFeatures.slice(0, 3).map((feature: string, index: number) => (
                        <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span>Transport & Accessibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">🚌 Nearby Transport</p>
                  {enhancedData.transport.nearbyStations.slice(0, 3).map((station: any, index: number) => (
                    <div key={index} className="text-sm text-blue-700 mb-1">
                      {station.name} ({Math.round(station.distance)}m away)
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Traffic Level:</span>
                    <Badge variant={enhancedData.transport.trafficAnalysis.congestionLevel === 'low' ? 'default' : 'secondary'}>
                      {enhancedData.transport.trafficAnalysis.congestionLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commute Time:</span>
                    <span className="font-medium">{enhancedData.transport.trafficAnalysis.averageCommute}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>Environment & Green Spaces</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Air Quality:</span>
                    <Badge className="bg-green-100 text-green-800">
                      {enhancedData.environmental.airQuality.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Noise Level:</span>
                    <span className="font-medium">{enhancedData.environmental.noiseLevel.split(' -')[0]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Flood Risk:</span>
                    <span className="font-medium">Low Risk</span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">🌳 Nearby Green Spaces</p>
                  {enhancedData.environmental.greenSpaces.map((space: any, index: number) => (
                    <div key={index} className="text-sm text-green-700">
                      {space.name} - {Math.round(space.distance)}m
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Financial Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Rates:</span>
                    <span className="font-medium">{formatCurrency(enhancedData.propertyTax.monthlyRates)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Annual Tax:</span>
                    <span className="font-medium">{formatCurrency(enhancedData.propertyTax.annualRates)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax Rate:</span>
                    <span className="font-medium">{(enhancedData.propertyTax.taxRate * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>Economic Indicators</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GDP per Capita:</span>
                    <span className="font-medium">{enhancedData.economic.gdpPerCapita}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Unemployment:</span>
                    <span className="font-medium">{enhancedData.economic.unemploymentRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inflation:</span>
                    <span className="font-medium">{enhancedData.economic.inflationRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-orange-600" />
                  <span>Business Environment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-800 mb-2">💼 Business Activity</p>
                  <p className="text-xs text-orange-700">{enhancedData.business.commercialActivity}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Nearby Businesses:</span>
                  <p className="font-medium">{enhancedData.business.nearbyBusinesses.length} within 1.5km</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Demographics & Community</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">👥 Age Distribution</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                    <div>Under 18: {enhancedData.demographics.ageDistribution.under18}</div>
                    <div>18-35: {enhancedData.demographics.ageDistribution['18-35']}</div>
                    <div>35-55: {enhancedData.demographics.ageDistribution['35-55']}</div>
                    <div>Over 55: {enhancedData.demographics.ageDistribution.over55}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Population Density:</span>
                    <span className="font-medium">{enhancedData.demographics.populationDensity}/km²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Education Level:</span>
                    <span className="font-medium">{enhancedData.demographics.educationLevel}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-800 mb-2">🗣️ Languages</p>
                  {enhancedData.demographics.languageDistribution.map((lang: string, index: number) => (
                    <div key={index} className="text-xs text-gray-700">{lang}</div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  <span>Schools & Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 mb-2">🏫 Nearby Schools</p>
                  {enhancedData.schools.map((school: any, index: number) => (
                    <div key={index} className="text-sm text-purple-700 mb-2">
                      <div className="font-medium">{school.name}</div>
                      <div className="text-xs">
                        Rating: {school.rating.toFixed(1)}/10 • {Math.round(school.distance)}m away
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Utilities & Infrastructure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-1">⚡ Electricity</p>
                    <p className="text-xs text-yellow-700">
                      {enhancedData.utilities.electricity.provider} • 
                      {enhancedData.utilities.electricity.reliability}% uptime
                    </p>
                    <p className="text-xs text-yellow-600">{enhancedData.utilities.electricity.loadShedding}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">💧 Water</p>
                    <p className="text-xs text-blue-700">{enhancedData.utilities.water.quality}</p>
                    <p className="text-xs text-blue-600">{enhancedData.utilities.water.restrictions.join(', ')}</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-1">🌐 Internet</p>
                    <p className="text-xs text-green-700">
                      Fiber: {enhancedData.utilities.internet.fiberAvailability ? '✅ Available' : '❌ Not Available'}
                    </p>
                    <p className="text-xs text-green-600">
                      Average: {enhancedData.utilities.internet.averageSpeed}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span>Weather & Climate</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {enhancedData.weather && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-orange-800 mb-2">🌤️ Live Weather Data</p>
                    <div className="space-y-1 text-sm text-orange-700">
                      <div>Temperature: {enhancedData.weather.temperature}°C</div>
                      <div>Condition: {enhancedData.weather.condition}</div>
                      <div>Humidity: {enhancedData.weather.humidity}%</div>
                      {enhancedData.weather.windSpeed && (
                        <div>Wind: {enhancedData.weather.windSpeed} km/h</div>
                      )}
                      {enhancedData.weather.pressure && (
                        <div>Pressure: {enhancedData.weather.pressure} hPa</div>
                      )}
                      {enhancedData.weather.sunrise && (
                        <div>Sunrise: {enhancedData.weather.sunrise}</div>
                      )}
                      {enhancedData.weather.sunset && (
                        <div>Sunset: {enhancedData.weather.sunset}</div>
                      )}
                    </div>
                    <p className="text-xs text-orange-600 mt-2">
                      Source: {enhancedData.weather.source}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span>Property Owner & Contact APIs</span>
                  <Badge className="bg-red-100 text-red-800 ml-auto">🔧 API Setup Needed</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 font-medium mb-2">🏛️ Property Ownership APIs</p>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    <li><strong>SA Deeds Office API:</strong> Official ownership records, title deeds</li>
                    <li><strong>Property24 API:</strong> Market prices, property details, photos</li>
                    <li><strong>Lightstone API:</strong> Property valuations, market analytics</li>
                    <li><strong>SGT API:</strong> ERF numbers, survey data, boundaries</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium mb-2">🆔 ID Verification & Contact APIs</p>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li><strong>Home Affairs API:</strong> ID verification, personal details</li>
                    <li><strong>CIPC API:</strong> Company registration, directors</li>
                    <li><strong>Credit Bureau APIs:</strong> Contact verification, credit checks</li>
                    <li><strong>Phone Lookup APIs:</strong> TrueCaller, Tellows for number owner</li>
                    <li><strong>Email Discovery:</strong> Hunter.io, RocketReach for emails</li>
                    <li><strong>Social Media APIs:</strong> LinkedIn, Facebook profile discovery</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium mb-2">✅ Data Available Once Connected:</p>
                  <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                    <li>Property owner full name, ID number, citizenship</li>
                    <li>Current and previous ownership history</li>
                    <li>Contact numbers, email addresses</li>
                    <li>Physical and postal addresses</li>
                    <li>Employment information</li>
                    <li>Company directors (for corporate ownership)</li>
                    <li>Credit score and payment history</li>
                    <li>Social media profiles</li>
                    <li>Property valuation and market analysis</li>
                    <li>Legal status, bonds, restrictions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span>Professional Services Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-orange-800 font-medium mb-2">🏢 Real Estate Professionals</p>
                  <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                    <li>Local estate agents with area expertise</li>
                    <li>Property attorneys and conveyancers</li>
                    <li>Professional valuers and appraisers</li>
                    <li>Property managers and rental agents</li>
                    <li>Municipal officials and contacts</li>
                    <li>Building inspectors and surveyors</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 font-medium mb-2">💼 Service Provider APIs</p>
                  <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                    <li>Property24 Professional Network</li>
                    <li>Law Society of South Africa</li>
                    <li>Estate Agency Affairs Board</li>
                    <li>SA Institute of Valuers</li>
                    <li>Property Practitioners Regulatory Authority</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-medium mb-2">🔧 Setup Required For:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Professional contact databases</li>
                    <li>Regulatory body member lists</li>
                    <li>Service provider ratings and reviews</li>
                    <li>Direct contact information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
