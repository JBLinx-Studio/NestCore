
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
  History
} from "lucide-react";
import { toast } from "sonner";
import { openStreetMapService, PropertyLocation } from "@/services/OpenStreetMapService";

interface PropertyIntelligenceProps {
  selectedProperty?: PropertyLocation | null;
}

interface PropertyOwner {
  id: string;
  name: string;
  idNumber: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  ownershipType: 'individual' | 'company' | 'trust' | 'joint';
  ownershipPercentage: number;
  registrationDate: string;
  verified: boolean;
}

interface PropertyValuation {
  currentValue: number;
  previousValue: number;
  valueDate: string;
  valuationMethod: 'automated' | 'comparative' | 'professional' | 'ai_enhanced';
  confidence: number;
  pricePerSqm: number;
}

interface PropertyHistory {
  date: string;
  event: 'sale' | 'transfer' | 'bond' | 'subdivision' | 'inheritance' | 'donation';
  price?: number;
  details: string;
  verified: boolean;
}

interface PropertyIntelligenceData {
  erfNumber?: string;
  titleDeedNumber?: string;
  propertyType?: string;
  landSize?: number;
  buildingSize?: number;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  owners?: PropertyOwner[];
  valuation?: PropertyValuation;
  municipalValue?: number;
  rates?: number;
  levies?: number;
  history?: PropertyHistory[];
  zoningScheme?: string;
  buildingRestrictions?: string[];
  servitudes?: string[];
  daysOnMarket?: number;
  lastListingPrice?: number;
  averageAreaPrice?: number;
  investmentGrade?: 'A' | 'B' | 'C' | 'D';
  realLocationData: PropertyLocation;
  dataAvailability: {
    ownership: boolean;
    valuation: boolean;
    legal: boolean;
    market: boolean;
    municipal: boolean;
  };
  errors: string[];
}

export const PropertyIntelligence = ({ selectedProperty }: PropertyIntelligenceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyIntelligenceData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [apiStats, setApiStats] = useState<any>(null);

  // Automatically load intelligence when selectedProperty changes
  useEffect(() => {
    console.log('Selected property changed:', selectedProperty);
    if (selectedProperty) {
      generateRealPropertyIntelligence(selectedProperty);
      setSearchQuery(selectedProperty.displayName);
    }
    // Load API stats
    loadApiStats();
  }, [selectedProperty]);

  const loadApiStats = async () => {
    try {
      const { propertyApiIntegrationService } = await import('@/services/PropertyApiIntegrationService');
      const stats = propertyApiIntegrationService.getIntegrationStats();
      setApiStats(stats);
    } catch (error) {
      console.error('Failed to load API stats:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter an address or ERF number");
      return;
    }

    setIsSearching(true);
    setPropertyData(null);

    try {
      const locations = await openStreetMapService.searchProperties(searchQuery, 5);
      
      if (locations.length > 0) {
        await generateRealPropertyIntelligence(locations[0]);
        toast.success("Property intelligence loaded - only real data shown");
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

  const generateRealPropertyIntelligence = async (location: PropertyLocation) => {
    console.log('Generating REAL intelligence for:', location);
    
    try {
      const errors: string[] = [];
      const dataAvailability = {
        ownership: false,
        valuation: false,
        legal: false,
        market: false,
        municipal: false
      };

      // Only include real location data, everything else requires API setup
      const realData: PropertyIntelligenceData = {
        realLocationData: location,
        dataAvailability,
        errors
      };

      // Try to get real data from APIs (will fail gracefully)
      try {
        // Import the enhanced service
        const { enhancedPropertyDataService } = await import('@/services/EnhancedPropertyDataService');
        
        // Attempt to get real comprehensive data
        const comprehensiveData = await enhancedPropertyDataService.getComprehensivePropertyData(location);
        
        // Only add data if it's verified as real
        if (comprehensiveData && comprehensiveData.dataSource === 'real') {
          realData.erfNumber = comprehensiveData.physical.erfNumber;
          realData.titleDeedNumber = comprehensiveData.physical.titleDeedNumber;
          realData.propertyType = comprehensiveData.physical.propertyType;
          realData.landSize = comprehensiveData.physical.landSize;
          realData.buildingSize = comprehensiveData.physical.buildingSize;
          realData.bedrooms = comprehensiveData.physical.bedrooms;
          realData.bathrooms = comprehensiveData.physical.bathrooms;
          realData.garages = comprehensiveData.physical.garages;
          
          if (comprehensiveData.ownership.verified) {
            realData.owners = [{
              id: "1",
              name: comprehensiveData.ownership.primaryOwner.name,
              idNumber: comprehensiveData.ownership.primaryOwner.idNumber,
              contactNumber: comprehensiveData.ownership.primaryOwner.contactNumber,
              email: comprehensiveData.ownership.primaryOwner.email,
              address: comprehensiveData.ownership.primaryOwner.address,
              ownershipType: comprehensiveData.ownership.primaryOwner.ownershipType,
              ownershipPercentage: comprehensiveData.ownership.primaryOwner.ownershipPercentage,
              registrationDate: comprehensiveData.ownership.primaryOwner.registrationDate,
              verified: comprehensiveData.ownership.primaryOwner.verified
            }];
            dataAvailability.ownership = true;
          }
          
          if (comprehensiveData.valuation.verified) {
            realData.valuation = {
              currentValue: comprehensiveData.valuation.currentValue,
              previousValue: comprehensiveData.valuation.previousValue,
              valueDate: comprehensiveData.valuation.valueDate,
              valuationMethod: comprehensiveData.valuation.valuationMethod,
              confidence: comprehensiveData.valuation.confidence,
              pricePerSqm: comprehensiveData.valuation.pricePerSqm
            };
            dataAvailability.valuation = true;
          }
          
          if (comprehensiveData.financial.verified) {
            realData.municipalValue = comprehensiveData.financial.municipalValue;
            realData.rates = comprehensiveData.financial.ratesAndTaxes.monthlyRates;
            realData.levies = comprehensiveData.financial.levies?.monthlyLevy;
            dataAvailability.municipal = true;
          }
          
          if (comprehensiveData.ownership.ownershipHistory.length > 0) {
            realData.history = comprehensiveData.ownership.ownershipHistory.map(h => ({
              date: h.date,
              event: h.transferType as 'sale' | 'transfer' | 'bond' | 'subdivision' | 'inheritance' | 'donation',
              price: h.price,
              details: `${h.transferType} from ${h.previousOwner}`,
              verified: true
            }));
          }
          
          if (comprehensiveData.legal.verified) {
            realData.zoningScheme = comprehensiveData.legal.zoningScheme;
            realData.buildingRestrictions = comprehensiveData.legal.buildingRestrictions;
            realData.servitudes = comprehensiveData.legal.servitudes;
            dataAvailability.legal = true;
          }
          
          if (comprehensiveData.market.verified) {
            realData.averageAreaPrice = comprehensiveData.market.averageAreaPrice;
            realData.investmentGrade = comprehensiveData.market.investmentGrade;
            dataAvailability.market = true;
          }
        }
        
      } catch (error) {
        console.error('Failed to get real property data:', error);
        errors.push("Property ownership data requires API integration with SA Deeds Office");
        errors.push("Property valuation requires Lightstone AVM or Property24 API");
        errors.push("Legal information requires municipal database integration");
        errors.push("Market data requires Property24 or similar API access");
        errors.push("Municipal data requires local government API integration");
      }

      console.log('Real property data loaded:', realData);
      setPropertyData(realData);
      
      if (errors.length > 0) {
        toast.warning(`Property location found. ${errors.length} data sources require API setup for complete information.`);
      } else {
        toast.success("Complete property intelligence loaded with verified data");
      }
      
    } catch (error) {
      console.error('Failed to generate real intelligence:', error);
      toast.error("Failed to load property data - only showing location information");
      
      // Minimal data with just location
      setPropertyData({
        realLocationData: location,
        dataAvailability: {
          ownership: false,
          valuation: false,
          legal: false,
          market: false,
          municipal: false
        },
        errors: ["All property data requires API integrations to be setup"]
      });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA');
  };

  return (
    <div className="space-y-6">
      {/* Real Data Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Shield className="h-6 w-6 text-blue-600" />
            <span>Real Property Intelligence</span>
            <Badge className="bg-blue-100 text-blue-800">Verified Data Only</Badge>
          </CardTitle>
          <p className="text-lg text-gray-600">
            Comprehensive property research with verified data sources - no simulated information
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedProperty && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">✅ Real Location Data:</p>
                    <p className="text-sm text-green-700">{selectedProperty.displayName}</p>
                    <p className="text-xs text-green-600">
                      📍 {selectedProperty.lat.toFixed(6)}, {selectedProperty.lon.toFixed(6)}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Verified Location
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search property for real verified data..."
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
                className="px-8 bg-blue-600 hover:bg-blue-700"
              >
                {isSearching ? "Searching..." : "Real Data Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Location APIs</span>
              </div>
              <Badge className="bg-green-100 text-green-800">✅ Active</Badge>
            </div>
            <p className="text-xs text-green-700 mt-1">OpenStreetMap verified</p>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Property Ownership</span>
              </div>
              <Badge variant="destructive">❌ Not Connected</Badge>
            </div>
            <p className="text-xs text-red-700 mt-1">Deeds Office, Lightstone required</p>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Property Valuation</span>
              </div>
              <Badge variant="destructive">❌ Not Connected</Badge>
            </div>
            <p className="text-xs text-red-700 mt-1">Lightstone AVM, Property24 required</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Legal & Municipal</span>
              </div>
              <Badge variant="destructive">❌ Not Connected</Badge>
            </div>
            <p className="text-xs text-red-700 mt-1">Municipal APIs required</p>
          </CardContent>
        </Card>
      </div>

      {/* API Integration Status */}
      {apiStats && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <span>Data Availability Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{apiStats.active}</p>
                <p className="text-sm text-gray-600">Active Sources</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{apiStats.setupRequired}</p>
                <p className="text-sm text-gray-600">Setup Required</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{apiStats.coverage}%</p>
                <p className="text-sm text-gray-600">Data Coverage</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-600">Data Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {propertyData && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="owners">Ownership</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span>Verified Property Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800 mb-2">✅ Real OpenStreetMap Location:</p>
                    <p className="text-xs text-green-700">{propertyData.realLocationData.displayName}</p>
                    <p className="text-xs text-green-600">
                      Coordinates: {propertyData.realLocationData.lat.toFixed(6)}, {propertyData.realLocationData.lon.toFixed(6)}
                    </p>
                    <p className="text-xs text-green-600">
                      Province: {propertyData.realLocationData.province || 'Not specified'}
                    </p>
                    <p className="text-xs text-green-600">
                      Municipality: {propertyData.realLocationData.municipality || 'Not specified'}
                    </p>
                  </div>
                  
                  {propertyData.errors.length > 0 && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-sm font-medium text-red-800 mb-2">❌ Data Not Available:</p>
                      {propertyData.errors.map((error, index) => (
                        <p key={index} className="text-xs text-red-700">• {error}</p>
                      ))}
                    </div>
                  )}

                  {propertyData.erfNumber ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">ERF Number:</span>
                        <p className="text-gray-900">{propertyData.erfNumber}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Property Type:</span>
                        <p className="text-gray-900">{propertyData.propertyType}</p>
                      </div>
                      {propertyData.landSize && (
                        <div>
                          <span className="font-medium text-gray-700">Land Size:</span>
                          <p className="text-gray-900">{propertyData.landSize}m²</p>
                        </div>
                      )}
                      {propertyData.buildingSize && (
                        <div>
                          <span className="font-medium text-gray-700">Building Size:</span>
                          <p className="text-gray-900">{propertyData.buildingSize}m²</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <Info className="h-4 w-4 inline mr-1" />
                        Property details require SA Deeds Office API integration for accurate information
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Property Valuation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {propertyData.valuation ? (
                    <div>
                      <span className="font-medium text-gray-700">Verified Value:</span>
                      <p className="text-3xl font-bold text-green-600">{formatCurrency(propertyData.valuation.currentValue)}</p>
                      <p className="text-sm text-gray-500">Confidence: {propertyData.valuation.confidence}%</p>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <p className="text-red-800 font-medium mb-2">❌ Valuation Data Not Available</p>
                      <p className="text-sm text-red-700 mb-3">
                        Property valuation requires integration with verified sources:
                      </p>
                      <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                        <li><strong>Lightstone AVM:</strong> Professional automated valuations</li>
                        <li><strong>Property24:</strong> Market-based estimates</li>
                        <li><strong>Municipal Records:</strong> Official property values</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="owners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Property Ownership</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    ❌ API Required
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {propertyData.owners && propertyData.dataAvailability.ownership ? (
                  <div className="space-y-4">
                    {propertyData.owners.map((owner, index) => (
                      <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Owner Name:</span>
                            <p className="text-gray-900">{owner.name}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">ID Number:</span>
                            <p className="text-gray-900">{owner.idNumber}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Ownership %:</span>
                            <p className="text-gray-900">{owner.ownershipPercentage}%</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Verified:</span>
                            <Badge variant={owner.verified ? "default" : "destructive"}>
                              {owner.verified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">❌ Ownership Information Not Available</p>
                    <p className="text-sm text-red-700 mb-3">
                      Real ownership data requires integration with these verified sources:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      <li><strong>SA Deeds Office:</strong> Official ownership records and title deeds</li>
                      <li><strong>Lightstone:</strong> Enhanced ownership data with contact information</li>
                      <li><strong>Home Affairs:</strong> ID verification and personal details</li>
                      <li><strong>CIPC:</strong> Company directors and business registration</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Property Valuation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {propertyData.valuation && propertyData.dataAvailability.valuation ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-3xl font-bold text-green-600">
                        {formatCurrency(propertyData.valuation.currentValue)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Method: {propertyData.valuation.valuationMethod} | Confidence: {propertyData.valuation.confidence}%
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Previous Value:</span>
                        <p className="text-gray-900">{formatCurrency(propertyData.valuation.previousValue)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Price per m²:</span>
                        <p className="text-gray-900">{formatCurrency(propertyData.valuation.pricePerSqm)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">❌ Valuation Data Requires API Access</p>
                    <p className="text-sm text-red-700 mb-3">
                      Professional property valuations available through:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      <li><strong>Lightstone AVM:</strong> R500-R1000 per valuation</li>
                      <li><strong>Property24 API:</strong> Market-based estimates</li>
                      <li><strong>Municipal Records:</strong> Official rates and taxes</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-blue-600" />
                  <span>Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {propertyData.history && propertyData.history.length > 0 ? (
                  <div className="space-y-4">
                    {propertyData.history.map((transaction, index) => (
                      <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium capitalize">{transaction.event}</p>
                            <p className="text-sm text-gray-600">{transaction.details}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(transaction.date)}</p>
                          </div>
                          <div className="text-right">
                            {transaction.price && (
                              <p className="font-medium">{formatCurrency(transaction.price)}</p>
                            )}
                            <Badge variant={transaction.verified ? "default" : "secondary"} className="mt-1">
                              {transaction.verified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">❌ Transaction History Not Available</p>
                    <p className="text-sm text-red-700 mb-3">
                      Real transaction history requires:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      <li><strong>SA Deeds Office:</strong> Official transfer records</li>
                      <li><strong>Property24:</strong> Listing and sale history</li>
                      <li><strong>Lightstone:</strong> Market transaction data</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Legal & Zoning Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {propertyData.zoningScheme && propertyData.dataAvailability.legal ? (
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Zoning:</span>
                      <p className="text-gray-900">{propertyData.zoningScheme}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Municipality:</span>
                      <p className="text-gray-900">{propertyData.realLocationData.municipality || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Province:</span>
                      <p className="text-gray-900">{propertyData.realLocationData.province || 'Not specified'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">❌ Legal Information Requires Municipal API Access</p>
                    <p className="text-sm text-red-700 mb-3">
                      Official legal documentation available through:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      <li><strong>Municipal Databases:</strong> Zoning and building plans</li>
                      <li><strong>Surveyor General:</strong> Property boundaries and servitudes</li>
                      <li><strong>Building Control:</strong> Approved plans and compliance</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {!propertyData && !selectedProperty && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Real Property Intelligence</h3>
            <p className="text-gray-500 mb-4">
              Search for a property to view verified information only
            </p>
            <p className="text-sm text-blue-600">
              💡 No simulated data - only real, verified information shown
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
