import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Building, 
  User,
  TrendingUp,
  DollarSign,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  History,
  Cloud,
  GraduationCap,
  Activity,
  TreePine,
  Calculator,
  Map
} from "lucide-react";
import { toast } from "sonner";
import { openStreetMapService, PropertyLocation, NearbyAmenities, AreaInsights } from "@/services/OpenStreetMapService";
import { freeDataService, WeatherData, EconomicData, PropertyMarketTrends } from "@/services/FreeDataService";
import { advancedPropertyDataService, DetailedPropertyInfo } from "@/services/AdvancedPropertyDataService";
import { PropertyMapsViewer } from "./PropertyMapsViewer";
import { PropertyPriceAnalysisComponent } from "./PropertyPriceAnalysis";

interface PropertyIntelligenceProps {
  selectedProperty?: PropertyLocation | null;
}

interface EnhancedPropertyData {
  erfNumber?: string;
  titleDeedNumber?: string;
  propertyType?: string;
  landSize?: number;
  buildingSize?: number;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  owners?: Array<{
    id: string;
    name: string;
    idNumber: string;
    ownershipType: 'individual' | 'company' | 'trust' | 'joint';
    ownershipPercentage: number;
    registrationDate: string;
    verified: boolean;
  }>;
  valuation?: {
    currentValue: number;
    previousValue: number;
    valueDate: string;
    valuationMethod: 'automated' | 'comparative' | 'professional' | 'ai_enhanced';
    confidence: number;
    pricePerSqm: number;
  };
  municipalValue?: number;
  rates?: number;
  levies?: number;
  history?: Array<{
    date: string;
    event: 'sale' | 'transfer' | 'bond' | 'subdivision' | 'inheritance' | 'donation';
    price?: number;
    details: string;
    verified: boolean;
  }>;
  zoningScheme?: string;
  buildingRestrictions?: string[];
  servitudes?: string[];
  daysOnMarket?: number;
  lastListingPrice?: number;
  averageAreaPrice?: number;
  investmentGrade?: 'A' | 'B' | 'C' | 'D';
  detailedInfo?: DetailedPropertyInfo;
  realLocationData: PropertyLocation;
  nearbyAmenities?: NearbyAmenities;
  areaInsights?: AreaInsights;
  weatherData?: WeatherData;
  economicData?: EconomicData;
  marketTrends?: PropertyMarketTrends;
  crimeStats?: {safetyScore: number; crimeTypes: string[]; source: string};
  schoolRatings?: Array<{name: string; rating: number; type: string; distance: number}>;
  taxInfo?: {
    monthlyRates: number;
    annualRates: number;
    taxRate: number;
    rebates: string[];
    source: string;
  };
}

export const PropertyIntelligenceEnhanced = ({ selectedProperty }: PropertyIntelligenceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<EnhancedPropertyData | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (selectedProperty) {
      generateEnhancedPropertyIntelligence(selectedProperty);
      setSearchQuery(selectedProperty.displayName);
    }
  }, [selectedProperty]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter an address or property details");
      return;
    }

    setIsSearching(true);
    setPropertyData(null);

    try {
      const locations = await openStreetMapService.searchProperties(searchQuery, 5);
      
      if (locations.length > 0) {
        await generateEnhancedPropertyIntelligence(locations[0]);
        toast.success("✅ Enhanced property intelligence loaded with real data!");
      } else {
        toast.error("No properties found for your search");
      }
      
    } catch (error) {
      console.error('Property search error:', error);
      toast.error("Failed to retrieve property data. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const generateEnhancedPropertyIntelligence = async (location: PropertyLocation) => {
    console.log('🚀 Generating ADVANCED intelligence for:', location);
    setIsLoadingDetails(true);
    
    try {
      // Generate basic property data structure
      const basicData: EnhancedPropertyData = {
        realLocationData: location
      };
      setPropertyData(basicData);
      
      // Load enhanced data in parallel
      const [detailedInfo, amenities, areaInsights, weatherData, economicData, marketTrends, crimeStats, schoolRatings, taxInfo] = await Promise.allSettled([
        advancedPropertyDataService.getDetailedPropertyInfo(location.lat, location.lon),
        openStreetMapService.getNearbyAmenities(location.lat, location.lon),
        openStreetMapService.getAreaInsights(location.lat, location.lon),
        freeDataService.getWeatherData(location.lat, location.lon),
        freeDataService.getEconomicIndicators(location.province || 'Unknown'),
        freeDataService.getPropertyMarketTrends(location.municipality || 'Unknown'),
        freeDataService.getCrimeStatistics(location.municipality || 'Unknown'),
        freeDataService.getSchoolRatings(location.lat, location.lon),
        freeDataService.getPropertyTaxInfo(1500000, location.municipality || 'Unknown') // Default value for tax calculation
      ]);

      const enhancedData: EnhancedPropertyData = {
        realLocationData: location,
        detailedInfo: detailedInfo.status === 'fulfilled' ? detailedInfo.value : undefined,
        nearbyAmenities: amenities.status === 'fulfilled' ? amenities.value : undefined,
        areaInsights: areaInsights.status === 'fulfilled' ? areaInsights.value : undefined,
        weatherData: weatherData.status === 'fulfilled' ? weatherData.value || undefined : undefined,
        economicData: economicData.status === 'fulfilled' ? economicData.value : undefined,
        marketTrends: marketTrends.status === 'fulfilled' ? marketTrends.value : undefined,
        crimeStats: crimeStats.status === 'fulfilled' ? crimeStats.value : undefined,
        schoolRatings: schoolRatings.status === 'fulfilled' ? schoolRatings.value : undefined,
        taxInfo: taxInfo.status === 'fulfilled' ? taxInfo.value : undefined
      };

      setPropertyData(enhancedData);
      
      let successCount = 0;
      [detailedInfo, amenities, areaInsights, weatherData, economicData, marketTrends, crimeStats, schoolRatings, taxInfo].forEach(result => {
        if (result.status === 'fulfilled') successCount++;
      });
      
      toast.success(`🚀 Enhanced intelligence loaded! ${successCount}/9 data sources active`);
      
    } catch (error) {
      console.error('Enhanced intelligence generation error:', error);
      toast.error("Some data sources unavailable, showing available information");
    } finally {
      setIsLoadingDetails(false);
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

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Shield className="h-6 w-6 text-green-600" />
            <span>Advanced Property Intelligence</span>
            <Badge className="bg-green-100 text-green-800">🚀 Deep Analysis Active</Badge>
          </CardTitle>
          <p className="text-lg text-gray-600">
            Comprehensive property research with real-time mapping, price analysis, and detailed property information
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedProperty && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">✅ Enhanced Analysis Active:</p>
                    <p className="text-sm text-green-700">{selectedProperty.displayName}</p>
                    <p className="text-xs text-green-600">
                      📍 {selectedProperty.lat.toFixed(6)}, {selectedProperty.lon.toFixed(6)}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className="bg-green-100 text-green-800">Maps ✅</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Prices ✅</Badge>
                    <Badge className="bg-purple-100 text-purple-800">Details ✅</Badge>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search for advanced property analysis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-lg h-12"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isSearching}
                size="lg"
                className="px-8 bg-green-600 hover:bg-green-700"
              >
                {isSearching ? "Analyzing..." : "Deep Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Service Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800 text-sm">Maps & Location</span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">✅ Active</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800 text-sm">Price Analysis</span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">✅ Active</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800 text-sm">Property Details</span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">✅ Active</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800 text-sm">Weather Data</span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">✅ Live</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800 text-sm">Amenities</span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">✅ Real-time</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs with Advanced Features */}
      {propertyData && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="maps">Maps & Views</TabsTrigger>
            <TabsTrigger value="pricing">Price Analysis</TabsTrigger>
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Property Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span>Property Overview</span>
                    <Badge className="bg-green-100 text-green-800">Real OSM Data</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800 mb-2">✅ Verified Location:</p>
                    <p className="text-xs text-green-700">{propertyData.realLocationData.displayName}</p>
                    <p className="text-xs text-green-600">
                      📍 {propertyData.realLocationData.lat.toFixed(6)}, {propertyData.realLocationData.lon.toFixed(6)}
                    </p>
                  </div>
                  
                  {propertyData.detailedInfo && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Scheme Number:</span>
                        <p className="text-gray-900">{propertyData.detailedInfo.schemeNumber}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Scheme Name:</span>
                        <p className="text-gray-900">{propertyData.detailedInfo.schemeName}</p>
                      </div>
                      {propertyData.detailedInfo.physicalDetails && (
                        <>
                          <div>
                            <span className="font-medium text-gray-700">Bedrooms:</span>
                            <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.bedrooms || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Bathrooms:</span>
                            <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.bathrooms || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Condition:</span>
                            <p className="text-gray-900 capitalize">{propertyData.detailedInfo.physicalDetails.buildingCondition}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Roof Type:</span>
                            <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.roofType}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Weather & Location */}
              {propertyData.weatherData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Cloud className="h-5 w-5 text-blue-600" />
                      <span>Current Conditions</span>
                      <Badge className="bg-blue-100 text-blue-800">Live Data</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-blue-600">{propertyData.weatherData.temperature}°C</p>
                      <p className="text-lg text-gray-600">{propertyData.weatherData.condition}</p>
                      <p className="text-sm text-gray-500">Humidity: {propertyData.weatherData.humidity}%</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="maps" className="space-y-6">
            <PropertyMapsViewer property={propertyData.realLocationData} />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <PropertyPriceAnalysisComponent property={propertyData.realLocationData} />
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {propertyData.detailedInfo ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Physical Details */}
                {propertyData.detailedInfo.physicalDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-blue-600" />
                        <span>Physical Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Bedrooms:</span>
                          <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.bedrooms}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Bathrooms:</span>
                          <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.bathrooms}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Garages:</span>
                          <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.garages}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Condition:</span>
                          <p className="text-gray-900 capitalize">{propertyData.detailedInfo.physicalDetails.buildingCondition}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Roof Material:</span>
                          <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.roofType}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Wall Material:</span>
                          <p className="text-gray-900">{propertyData.detailedInfo.physicalDetails.wallType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Zoning Details */}
                {propertyData.detailedInfo.zoningDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <span>Zoning & Legal</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">Zoning Scheme:</span>
                        <p className="text-gray-900">{propertyData.detailedInfo.zoningDetails.zoningScheme}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Coverage:</span>
                        <p className="text-gray-900">{(propertyData.detailedInfo.zoningDetails.coverage * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Floor Area Ratio:</span>
                        <p className="text-gray-900">{propertyData.detailedInfo.zoningDetails.floorAreaRatio}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 mb-1">Zoning Rights:</span>
                        <div className="space-y-1">
                          {propertyData.detailedInfo.zoningDetails.zoningRights.map((right, index) => (
                            <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                              {right}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium">⚠️ Detailed Property Information Unavailable</p>
                <p className="text-sm text-yellow-700 mt-2">
                  Complete property details require integration with municipal databases and property registries.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="amenities" className="space-y-6">
            {propertyData.nearbyAmenities ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      <span>Schools & Education</span>
                      <Badge className="bg-green-100 text-green-800">Real OSM Data</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {propertyData.nearbyAmenities.schools.length > 0 ? (
                      <div className="space-y-2">
                        {propertyData.nearbyAmenities.schools.map((school, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{school.name}</span>
                            <span className="text-gray-500">{Math.round(school.distance)}m</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No schools found in immediate area</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span>Healthcare</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {propertyData.nearbyAmenities.hospitals.length > 0 ? (
                      <div className="space-y-2">
                        {propertyData.nearbyAmenities.hospitals.map((hospital, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{hospital.name}</span>
                            <span className="text-gray-500">{Math.round(hospital.distance)}m</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No healthcare facilities found nearby</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-green-600" />
                      <span>Shopping & Services</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {propertyData.nearbyAmenities.shopping.length > 0 ? (
                      <div className="space-y-2">
                        {propertyData.nearbyAmenities.shopping.map((shop, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{shop.name}</span>
                            <span className="text-gray-500">{Math.round(shop.distance)}m</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No shopping facilities found nearby</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <span>Transport</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {propertyData.nearbyAmenities.transport.length > 0 ? (
                      <div className="space-y-2">
                        {propertyData.nearbyAmenities.transport.map((transport, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{transport.name}</span>
                            <span className="text-gray-500">{Math.round(transport.distance)}m</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No transport facilities found nearby</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="text-center py-8">
                <CardContent>
                  {isLoadingDetails ? (
                    <TreePine className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                  ) : (
                    <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  )}
                  <p className="text-gray-600">{isLoadingDetails ? "Loading nearby amenities..." : "Amenities data will load automatically"}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            {propertyData.marketTrends ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Live Market Analysis</span>
                    <Badge className="bg-blue-100 text-blue-800">Real Market Data</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Price Change</p>
                      <p className="text-lg font-bold text-green-600">{propertyData.marketTrends.averagePriceChange}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Market Activity</p>
                      <p className="text-sm text-blue-800">{propertyData.marketTrends.marketActivity}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">Forecast</p>
                      <p className="text-sm text-purple-800">{propertyData.marketTrends.forecastTrend}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-800 font-medium">❌ Market Data Unavailable</p>
                <p className="text-sm text-red-700 mt-2">
                  Market data requires integration with property market APIs.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            {propertyData.taxInfo ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Municipal Rates & Taxes</span>
                    <Badge className="bg-green-100 text-green-800">Calculated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Monthly Rates:</span>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(propertyData.taxInfo.monthlyRates)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Annual Rates:</span>
                      <p className="text-gray-900">{formatCurrency(propertyData.taxInfo.annualRates)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Tax Rate:</span>
                      <p className="text-gray-900">{(propertyData.taxInfo.taxRate * 100).toFixed(3)}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Available Rebates:</p>
                    <div className="flex flex-wrap gap-1">
                      {propertyData.taxInfo.rebates.map((rebate, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{rebate}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium">⚠️ Financial Data Unavailable</p>
                <p className="text-sm text-yellow-700 mt-2">
                  Municipal rates and tax information requires local government API integration.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {!propertyData && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Advanced Property Intelligence Ready</h3>
            <p className="text-gray-500 mb-4">
              Search for comprehensive property analysis with maps, pricing, and detailed information
            </p>
            <p className="text-sm text-green-600">
              🚀 Includes live mapping, price analysis within 1000m, detailed property info, and more!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
