
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
  erfNumber: string;
  titleDeedNumber: string;
  propertyType: string;
  landSize: number;
  buildingSize: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  owners: PropertyOwner[];
  valuation: PropertyValuation;
  municipalValue: number;
  rates: number;
  levies?: number;
  history: PropertyHistory[];
  zoningScheme: string;
  buildingRestrictions: string[];
  servitudes: string[];
  daysOnMarket?: number;
  lastListingPrice?: number;
  averageAreaPrice: number;
  investmentGrade: 'A' | 'B' | 'C' | 'D';
  realLocationData: PropertyLocation;
}

export const PropertyIntelligence = ({ selectedProperty }: PropertyIntelligenceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyIntelligenceData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Automatically load intelligence when selectedProperty changes
  useEffect(() => {
    console.log('Selected property changed:', selectedProperty);
    if (selectedProperty) {
      generatePropertyIntelligence(selectedProperty);
      setSearchQuery(selectedProperty.displayName);
    }
  }, [selectedProperty]);

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
        generatePropertyIntelligence(locations[0]);
        toast.success("Property intelligence generated from real location data");
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
    console.log('Generating intelligence for:', location);
    
    const propertyType = determinePropertyType(location.displayName);
    const landSize = estimateLandSize(location.displayName);
    const currentValue = estimatePropertyValue(location);
    
    // Convert location.id to string and handle it properly
    const locationIdString = String(location.id);
    const idSuffix = locationIdString.length >= 6 ? locationIdString.slice(-6) : locationIdString.padStart(6, '0');
    
    const extractedData: PropertyIntelligenceData = {
      erfNumber: `ERF ${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
      titleDeedNumber: `T${idSuffix}/2024`,
      propertyType,
      landSize,
      buildingSize: propertyType === 'Apartment' ? 0 : Math.floor(landSize * 0.3),
      bedrooms: propertyType === 'Apartment' ? 2 : propertyType === 'Townhouse' ? 3 : 4,
      bathrooms: propertyType === 'Apartment' ? 1 : propertyType === 'Townhouse' ? 2 : 3,
      garages: propertyType === 'Apartment' ? 1 : 2,
      
      owners: [{
        id: "1",
        name: "Property Owner Details",
        idNumber: "ID verification requires Home Affairs API",
        ownershipType: "individual",
        ownershipPercentage: 100,
        registrationDate: "Requires Deeds Office integration",
        verified: false
      }],
      
      valuation: {
        currentValue,
        previousValue: Math.floor(currentValue * 0.9),
        valueDate: new Date().toISOString().split('T')[0],
        valuationMethod: "automated",
        confidence: 65,
        pricePerSqm: landSize > 0 ? Math.floor(currentValue / landSize) : 0
      },
      
      municipalValue: Math.floor(currentValue * 0.7),
      rates: Math.floor(currentValue * 0.012 / 12),
      
      history: [
        {
          date: "2023-03-15",
          event: "sale",
          price: Math.floor(currentValue * 0.85),
          details: "Previous sale transaction (estimated)",
          verified: false
        },
        {
          date: "2020-08-20",
          event: "transfer",
          price: Math.floor(currentValue * 0.7),
          details: "Ownership transfer (estimated)",
          verified: false
        }
      ],
      
      zoningScheme: determineZoning(location.displayName),
      buildingRestrictions: ["Requires municipal database integration"],
      servitudes: ["No servitudes identified (requires Deeds Office data)"],
      
      averageAreaPrice: Math.floor(currentValue * 0.9),
      investmentGrade: determineInvestmentGrade(location),
      realLocationData: location
    };

    console.log('Generated property data:', extractedData);
    setPropertyData(extractedData);
    toast.success("Property intelligence loaded with real location data");
  };

  const determinePropertyType = (displayName: string): string => {
    const name = displayName.toLowerCase();
    if (name.includes('apartment') || name.includes('flat') || name.includes('unit')) return 'Apartment';
    if (name.includes('townhouse') || name.includes('cluster')) return 'Townhouse';
    if (name.includes('commercial') || name.includes('shop') || name.includes('office')) return 'Commercial';
    if (name.includes('industrial') || name.includes('warehouse')) return 'Industrial';
    if (name.includes('vacant') || name.includes('plot')) return 'Vacant Land';
    return 'Residential House';
  };

  const estimateLandSize = (displayName: string): number => {
    const name = displayName.toLowerCase();
    if (name.includes('apartment') || name.includes('flat')) return 0;
    if (name.includes('townhouse') || name.includes('cluster')) return 200 + Math.floor(Math.random() * 100);
    if (name.includes('commercial')) return 500 + Math.floor(Math.random() * 1500);
    if (name.includes('industrial')) return 1000 + Math.floor(Math.random() * 5000);
    return 600 + Math.floor(Math.random() * 400); // Default residential
  };

  const estimatePropertyValue = (location: PropertyLocation): number => {
    const province = location.province?.toLowerCase() || '';
    const municipality = location.municipality?.toLowerCase() || '';
    const displayName = location.displayName.toLowerCase();
    
    let baseValue = 1500000; // Default
    
    // Province-based pricing
    if (province.includes('western cape') || municipality.includes('cape town')) {
      baseValue = 2800000;
    } else if (province.includes('gauteng') || municipality.includes('johannesburg') || municipality.includes('pretoria')) {
      baseValue = 2400000;
    } else if (province.includes('kwazulu-natal') || municipality.includes('durban')) {
      baseValue = 2000000;
    }
    
    // Property type adjustments
    if (displayName.includes('apartment') || displayName.includes('flat')) {
      baseValue *= 0.6;
    } else if (displayName.includes('townhouse')) {
      baseValue *= 0.8;
    } else if (displayName.includes('commercial')) {
      baseValue *= 1.5;
    }
    
    // Add some variation
    const variation = 0.8 + (Math.random() * 0.4); // 80% to 120%
    return Math.floor(baseValue * variation);
  };

  const determineZoning = (displayName: string): string => {
    const name = displayName.toLowerCase();
    if (name.includes('commercial')) return 'Commercial (Business 1)';
    if (name.includes('industrial')) return 'Industrial (Light Industrial)';
    if (name.includes('apartment') || name.includes('flat')) return 'Residential 3 (High Density)';
    if (name.includes('townhouse')) return 'Residential 2 (Medium Density)';
    return 'Residential 1 (Single Dwelling)';
  };

  const determineInvestmentGrade = (location: PropertyLocation): 'A' | 'B' | 'C' | 'D' => {
    const province = location.province?.toLowerCase() || '';
    const municipality = location.municipality?.toLowerCase() || '';
    
    if (province.includes('western cape') || municipality.includes('cape town')) return 'A';
    if (province.includes('gauteng') || municipality.includes('johannesburg')) return 'A';
    if (province.includes('kwazulu-natal') || municipality.includes('durban')) return 'B';
    return 'B';
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
            <span>Property Intelligence & Analysis</span>
          </CardTitle>
          <p className="text-lg text-gray-600">
            Comprehensive property research using real OpenStreetMap data
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedProperty && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">✅ Property Loaded from Search:</p>
                    <p className="text-sm text-green-700">{selectedProperty.displayName}</p>
                    <p className="text-xs text-green-600">
                      📍 {selectedProperty.lat.toFixed(6)}, {selectedProperty.lon.toFixed(6)}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Intelligence Ready
                  </Badge>
                </div>
              </div>
            )}
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search new property or use selected property from search tab..."
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
                {isSearching ? "Analyzing..." : "Analyze Property"}
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
                <span className="font-medium text-green-800">OpenStreetMap API</span>
              </div>
              <Badge className="bg-green-100 text-green-800">✅ Active</Badge>
            </div>
            <p className="text-xs text-green-700 mt-1">Real location data working</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Property APIs</span>
              </div>
              <Badge variant="secondary">🔧 Setup Needed</Badge>
            </div>
            <p className="text-xs text-yellow-700 mt-1">Deeds Office, Property24, Lightstone</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">ID Verification</span>
              </div>
              <Badge variant="secondary">🔧 Setup Needed</Badge>
            </div>
            <p className="text-xs text-yellow-700 mt-1">Home Affairs, CIPC APIs</p>
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
                    <span>Property Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800 mb-2">✅ Real Location Data:</p>
                    <p className="text-xs text-green-700">{propertyData.realLocationData.displayName}</p>
                    <p className="text-xs text-green-600">
                      Coordinates: {propertyData.realLocationData.lat.toFixed(6)}, {propertyData.realLocationData.lon.toFixed(6)}
                    </p>
                  </div>
                  
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
                      <span className="font-medium text-gray-700">Land Size:</span>
                      <p className="text-gray-900">{propertyData.landSize > 0 ? `${propertyData.landSize}m²` : 'Sectional Title'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Building Size:</span>
                      <p className="text-gray-900">{propertyData.buildingSize > 0 ? `${propertyData.buildingSize}m²` : 'Unknown'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Bedrooms:</span>
                      <p className="text-gray-900">{propertyData.bedrooms}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Bathrooms:</span>
                      <p className="text-gray-900">{propertyData.bathrooms}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <Info className="h-4 w-4 inline mr-1" />
                      Property details estimated from location data. Connect property APIs for accurate building information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Market Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Estimated Value:</span>
                    <p className="text-3xl font-bold text-green-600">{formatCurrency(propertyData.valuation.currentValue)}</p>
                    <p className="text-sm text-gray-500">Based on location and property type</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Municipal Value:</span>
                      <p className="text-gray-900">{formatCurrency(propertyData.municipalValue)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Monthly Rates:</span>
                      <p className="text-gray-900">{formatCurrency(propertyData.rates)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Price per m²:</span>
                      <p className="text-gray-900">
                        {propertyData.valuation.pricePerSqm > 0 ? formatCurrency(propertyData.valuation.pricePerSqm) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Investment Grade:</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        Grade {propertyData.investmentGrade}
                      </Badge>
                    </div>
                  </div>
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
                    🔧 API Integration Required
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-800 font-medium mb-2">⚠️ Owner Information Not Available</p>
                  <p className="text-sm text-red-700 mb-3">
                    Real property ownership data requires API integration with:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    <li><strong>SA Deeds Office:</strong> Official ownership records & title deeds</li>
                    <li><strong>Home Affairs API:</strong> ID number verification & personal details</li>
                    <li><strong>CIPC API:</strong> Company director information for corporate ownership</li>
                    <li><strong>Credit Bureau APIs:</strong> Additional person verification</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium mb-2">📋 What We Can Provide Once Connected:</p>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    <li>Current property owner name & ID number</li>
                    <li>Ownership percentage & type (individual/company/trust)</li>
                    <li>Contact information (if available)</li>
                    <li>Registration dates & ownership history</li>
                    <li>Verified identity status</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Current Valuation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-3xl font-bold text-green-600">
                      {formatCurrency(propertyData.valuation.currentValue)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Automated valuation based on location data
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level:</span>
                      <Badge variant="secondary">{propertyData.valuation.confidence}%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Valuation Method:</span>
                      <span className="capitalize">{propertyData.valuation.valuationMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Updated:</span>
                      <span>{formatDate(propertyData.valuation.valueDate)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Connect to Lightstone, Property24, or other valuation APIs for professional accuracy
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Value Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Estimate:</span>
                      <span className="font-medium">{formatCurrency(propertyData.valuation.currentValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Municipal Value:</span>
                      <span className="font-medium">{formatCurrency(propertyData.municipalValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Area Average:</span>
                      <span className="font-medium">{formatCurrency(propertyData.averageAreaPrice)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      Property value is {propertyData.valuation.currentValue > propertyData.averageAreaPrice ? 'above' : 'below'} area average
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
                  <span>Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyData.history.map((transaction, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
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
                            {transaction.verified ? "Verified" : "Estimated"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium mb-2">📋 Real Transaction History Available With:</p>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                      <li>SA Deeds Office API for official transfer records</li>
                      <li>Property24 API for listing history</li>
                      <li>Lightstone Property for market transactions</li>
                    </ul>
                  </div>
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
                    <span>Zoning & Legal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Estimated Zoning:</span>
                    <p className="text-gray-900">{propertyData.zoningScheme}</p>
                    <p className="text-xs text-gray-500 mt-1">Based on property type and location analysis</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Municipality:</span>
                    <p className="text-gray-900">{propertyData.realLocationData.municipality || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Province:</span>
                    <p className="text-gray-900">{propertyData.realLocationData.province || 'Unknown'}</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <Info className="h-4 w-4 inline mr-1" />
                      Connect municipal databases for official zoning schemes and building restrictions
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
                    <p className="text-gray-700 font-medium mb-2">📄 Legal Documents Available With API Integration:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Title Deed documents</li>
                      <li>Servitude agreements</li>
                      <li>Building plan approvals</li>
                      <li>Zoning certificates</li>
                      <li>Municipal compliance certificates</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {!propertyData && !selectedProperty && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Property Selected</h3>
            <p className="text-gray-500 mb-4">
              Search for a property above or select one from the Property Search tab
            </p>
            <p className="text-sm text-blue-600">
              💡 Tip: Use the "View Intelligence" button from search results for instant analysis
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
