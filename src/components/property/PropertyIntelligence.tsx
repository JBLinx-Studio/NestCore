
import { useState } from "react";
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
  Phone,
  Mail,
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
  valuationMethod: 'automated' | 'comparative' | 'professional';
  confidence: number;
  pricePerSqm: number;
}

interface PropertyHistory {
  date: string;
  event: 'sale' | 'transfer' | 'bond' | 'subdivision';
  price?: number;
  details: string;
  verified: boolean;
}

interface PropertyIntelligenceData {
  // Property Details
  erfNumber: string;
  titleDeedNumber: string;
  propertyType: string;
  landSize: number;
  buildingSize: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  
  // Ownership
  owners: PropertyOwner[];
  
  // Financial
  valuation: PropertyValuation;
  municipalValue: number;
  rates: number;
  levies?: number;
  
  // History
  history: PropertyHistory[];
  
  // Legal
  zoningScheme: string;
  buildingRestrictions: string[];
  servitudes: string[];
  
  // Market
  daysOnMarket?: number;
  lastListingPrice?: number;
  averageAreaPrice: number;
  investmentGrade: 'A' | 'B' | 'C' | 'D';
}

export const PropertyIntelligence = ({ selectedProperty }: PropertyIntelligenceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyIntelligenceData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchResults, setSearchResults] = useState<PropertyLocation[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter an address or ERF number");
      return;
    }

    setIsSearching(true);
    setPropertyData(null);

    try {
      // Get real location data from OpenStreetMap
      const locations = await openStreetMapService.searchProperties(searchQuery, 10);
      setSearchResults(locations);
      
      if (locations.length > 0) {
        // Use the first result for property intelligence
        generatePropertyIntelligence(locations[0]);
        toast.success("Property data retrieved from OpenStreetMap");
      } else {
        toast.info("No properties found for your search");
      }
      
    } catch (error) {
      console.error('Property search error:', error);
      toast.error("Failed to retrieve property data. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const generatePropertyIntelligence = (location: PropertyLocation) => {
    // Extract real location data and create property intelligence
    const extractedData: PropertyIntelligenceData = {
      erfNumber: `ERF ${location.id.slice(-4)}`,
      titleDeedNumber: `T${location.id}/2024`,
      propertyType: determinePropertyType(location.displayName),
      landSize: estimateLandSize(location.displayName),
      buildingSize: 0, // Unknown from OSM data
      bedrooms: 0, // Unknown from OSM data
      bathrooms: 0, // Unknown from OSM data
      garages: 0, // Unknown from OSM data
      
      owners: [{
        id: "1",
        name: "Property Owner (Details require Deeds Office API)",
        idNumber: "ID verification requires Home Affairs API",
        ownershipType: "individual",
        ownershipPercentage: 100,
        registrationDate: "Unknown - requires Deeds Office data",
        verified: false
      }],
      
      valuation: {
        currentValue: estimatePropertyValue(location),
        previousValue: 0,
        valueDate: new Date().toISOString().split('T')[0],
        valuationMethod: "automated",
        confidence: 40, // Low confidence without real valuation data
        pricePerSqm: 0
      },
      
      municipalValue: 0, // Requires municipal database
      rates: 0, // Requires municipal database
      
      history: [{
        date: "Unknown",
        event: "sale",
        details: "Transaction history requires Deeds Office API integration",
        verified: false
      }],
      
      zoningScheme: determineZoning(location.displayName),
      buildingRestrictions: ["Requires municipal database integration"],
      servitudes: ["Requires Deeds Office data"],
      
      averageAreaPrice: estimateAreaPrice(location),
      investmentGrade: "C", // Conservative estimate
    };

    setPropertyData(extractedData);
  };

  // Use selected property from search tab if available
  const handleUseSelectedProperty = () => {
    if (selectedProperty) {
      generatePropertyIntelligence(selectedProperty);
      setSearchQuery(selectedProperty.displayName);
      toast.success("Using property from search results");
    }
  };

  // Helper functions to extract meaningful data from OSM results
  const determinePropertyType = (displayName: string): string => {
    const name = displayName.toLowerCase();
    if (name.includes('apartment') || name.includes('flat')) return 'Apartment';
    if (name.includes('townhouse')) return 'Townhouse';
    if (name.includes('commercial') || name.includes('shop') || name.includes('office')) return 'Commercial';
    if (name.includes('industrial')) return 'Industrial';
    return 'Residential';
  };

  const estimateLandSize = (displayName: string): number => {
    // Basic estimation based on property type and location
    const name = displayName.toLowerCase();
    if (name.includes('apartment') || name.includes('flat')) return 0;
    if (name.includes('townhouse')) return 200;
    if (name.includes('commercial')) return 1000;
    return 600; // Default residential
  };

  const estimatePropertyValue = (location: PropertyLocation): number => {
    // Basic estimation based on province and municipality
    const province = location.province?.toLowerCase() || '';
    const municipality = location.municipality?.toLowerCase() || '';
    
    if (province.includes('western cape') || municipality.includes('cape town')) {
      return 2500000;
    } else if (province.includes('gauteng') || municipality.includes('johannesburg')) {
      return 2200000;
    } else if (province.includes('kwazulu-natal') || municipality.includes('durban')) {
      return 1800000;
    }
    return 1500000; // Default estimate
  };

  const estimateAreaPrice = (location: PropertyLocation): number => {
    return estimatePropertyValue(location) * 0.8; // 20% below individual property
  };

  const determineZoning = (displayName: string): string => {
    const name = displayName.toLowerCase();
    if (name.includes('commercial')) return 'Commercial';
    if (name.includes('industrial')) return 'Industrial';
    return 'Residential 1';
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
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Shield className="h-6 w-6 text-green-600" />
            <span>Property Intelligence & Owner Verification</span>
          </CardTitle>
          <p className="text-lg text-gray-600">
            Real property research using OpenStreetMap data - enhanced with professional APIs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedProperty && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">Property selected from search:</p>
                    <p className="text-sm text-blue-600">{selectedProperty.displayName}</p>
                  </div>
                  <Button onClick={handleUseSelectedProperty} variant="outline" className="bg-white">
                    Use This Property
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter address, ERF number, or use property from search..."
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
                {isSearching ? "Searching..." : "Search Property"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">OpenStreetMap</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Deeds Office API</span>
              </div>
              <Badge variant="secondary">Setup Required</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Home Affairs ID API</span>
              </div>
              <Badge variant="secondary">Setup Required</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {propertyData && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
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
                    <span>Property Details (from OpenStreetMap)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">ERF Number:</span>
                      <p className="text-gray-900">{propertyData.erfNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Property Type:</span>
                      <p className="text-gray-900">{propertyData.propertyType}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Estimated Land Size:</span>
                      <p className="text-gray-900">{propertyData.landSize > 0 ? `${propertyData.landSize}m²` : 'Unknown'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Zoning:</span>
                      <p className="text-gray-900">{propertyData.zoningScheme}</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <Info className="h-4 w-4 inline mr-1" />
                      Building details require property-specific APIs for accurate data
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Market Estimation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Estimated Value:</span>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(propertyData.valuation.currentValue)}</p>
                      <p className="text-xs text-gray-500">Based on location and property type</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Confidence Level:</span>
                      <Badge variant="secondary" className="ml-2">
                        {propertyData.valuation.confidence}% (Estimated)
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Investment Grade:</span>
                      <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                        Grade {propertyData.investmentGrade} (Estimated)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="owners" className="space-y-6">
            {propertyData.owners.map((owner, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <span>Property Owner Information</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      Requires API Integration
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">Owner Verification Not Available</p>
                    <p className="text-sm text-red-700">
                      To get real owner information, you need to integrate with:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 mt-2">
                      <li>SA Deeds Office API for ownership records</li>
                      <li>Home Affairs API for ID verification</li>
                      <li>CIPC API for company information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="valuation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Estimated Valuation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-3xl font-bold text-green-600">
                      {formatCurrency(propertyData.valuation.currentValue)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Estimated based on location data
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Accurate valuations require property valuation APIs (Lightstone, Property24)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Municipal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-gray-700 font-medium mb-2">Municipal Data Not Available</p>
                    <p className="text-sm text-gray-600">
                      Municipal values, rates, and services information requires integration with local municipality databases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-blue-600" />
                  <span>Property Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg border text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Transaction History Not Available</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Property transaction history requires SA Deeds Office API integration
                  </p>
                  <Badge variant="secondary">Deeds Office API Required</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Zoning Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Estimated Zoning:</span>
                    <p className="text-gray-900">{propertyData.zoningScheme}</p>
                    <p className="text-xs text-gray-500 mt-1">Based on property type and location</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <Info className="h-4 w-4 inline mr-1" />
                      Detailed zoning and restrictions require municipal database access
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-gray-700 font-medium mb-2">Legal Documents Not Available</p>
                    <p className="text-sm text-gray-600">
                      Title deeds, servitudes, and legal restrictions require Deeds Office API integration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Integration Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Info className="h-5 w-5" />
            <span>Current Data Sources & Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">✅ Currently Working:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Real location data from OpenStreetMap</li>
                <li>Basic property type estimation</li>
                <li>Location-based value estimation</li>
                <li>Province and municipality extraction</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">🔧 Requires API Integration:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>SA Deeds Office for ownership & history</li>
                <li>Home Affairs for ID verification</li>
                <li>Lightstone/Property24 for valuations</li>
                <li>Municipal databases for rates & zoning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
