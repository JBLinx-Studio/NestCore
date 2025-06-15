
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

export const PropertyIntelligence = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyIntelligenceData | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter an address or ERF number");
      return;
    }

    setIsSearching(true);
    setPropertyData(null);

    try {
      // Simulate comprehensive property search
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock comprehensive property data
      const mockData: PropertyIntelligenceData = {
        erfNumber: "ERF 1234",
        titleDeedNumber: "T12345/2020",
        propertyType: "Residential",
        landSize: 800,
        buildingSize: 250,
        bedrooms: 3,
        bathrooms: 2,
        garages: 2,
        
        owners: [
          {
            id: "1",
            name: "John Smith",
            idNumber: "8501015009088",
            contactNumber: "+27 82 123 4567",
            email: "john.smith@email.com",
            address: "Same as property",
            ownershipType: "individual",
            ownershipPercentage: 100,
            registrationDate: "2020-03-15",
            verified: true
          }
        ],
        
        valuation: {
          currentValue: 2500000,
          previousValue: 2200000,
          valueDate: "2024-06-01",
          valuationMethod: "comparative",
          confidence: 85,
          pricePerSqm: 10000
        },
        
        municipalValue: 1800000,
        rates: 2500,
        
        history: [
          {
            date: "2020-03-15",
            event: "sale",
            price: 1800000,
            details: "Purchase from ABC Properties",
            verified: true
          },
          {
            date: "2021-05-20",
            event: "bond",
            price: 1200000,
            details: "Bond registration with Standard Bank",
            verified: true
          }
        ],
        
        zoningScheme: "Residential 1",
        buildingRestrictions: ["Height limit: 2 stories", "Coverage: 60%"],
        servitudes: ["Eskom electrical servitude"],
        
        averageAreaPrice: 9500,
        investmentGrade: "B",
        daysOnMarket: 45,
        lastListingPrice: 2650000
      };

      setPropertyData(mockData);
      toast.success("Property intelligence data retrieved successfully");
      
    } catch (error) {
      console.error('Property search error:', error);
      toast.error("Failed to retrieve property data. Please try again.");
    } finally {
      setIsSearching(false);
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
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Shield className="h-6 w-6 text-green-600" />
            <span>Property Intelligence & Owner Verification</span>
          </CardTitle>
          <p className="text-lg text-gray-600">
            Comprehensive property research, owner verification, and market analysis for real estate professionals
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Enter address, ERF number, or title deed number..."
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
                    <span>Property Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">ERF Number:</span>
                      <p className="text-gray-900">{propertyData.erfNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Title Deed:</span>
                      <p className="text-gray-900">{propertyData.titleDeedNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Land Size:</span>
                      <p className="text-gray-900">{propertyData.landSize}m²</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Building Size:</span>
                      <p className="text-gray-900">{propertyData.buildingSize}m²</p>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Market Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Current Valuation:</span>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(propertyData.valuation.currentValue)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Investment Grade:</span>
                      <Badge className={`ml-2 ${
                        propertyData.investmentGrade === 'A' ? 'bg-green-100 text-green-800' :
                        propertyData.investmentGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                        propertyData.investmentGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Grade {propertyData.investmentGrade}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Price per m²:</span>
                      <p className="text-gray-900">{formatCurrency(propertyData.valuation.pricePerSqm)}</p>
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
                      <span>Property Owner {index + 1}</span>
                    </div>
                    <Badge className={owner.verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {owner.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">Full Name:</span>
                      <p className="text-gray-900">{owner.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">ID Number:</span>
                      <p className="text-gray-900 font-mono">{owner.idNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Ownership %:</span>
                      <p className="text-gray-900">{owner.ownershipPercentage}%</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Registration Date:</span>
                      <p className="text-gray-900">{formatDate(owner.registrationDate)}</p>
                    </div>
                  </div>
                  
                  {owner.contactNumber && (
                    <div className="flex items-center space-x-4 pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{owner.contactNumber}</span>
                      </div>
                      {owner.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{owner.email}</span>
                        </div>
                      )}
                    </div>
                  )}
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
                    <span>Current Valuation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-3xl font-bold text-green-600">
                      {formatCurrency(propertyData.valuation.currentValue)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Last updated: {formatDate(propertyData.valuation.valueDate)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Confidence Level:</span>
                      <span className="text-sm font-medium">{propertyData.valuation.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Method:</span>
                      <span className="text-sm font-medium capitalize">{propertyData.valuation.valuationMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Price per m²:</span>
                      <span className="text-sm font-medium">{formatCurrency(propertyData.valuation.pricePerSqm)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Municipal & Financial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Municipal Value:</span>
                      <span className="text-sm font-medium">{formatCurrency(propertyData.municipalValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-700">Monthly Rates:</span>
                      <span className="text-sm font-medium">{formatCurrency(propertyData.rates)}</span>
                    </div>
                    {propertyData.levies && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Monthly Levies:</span>
                        <span className="text-sm font-medium">{formatCurrency(propertyData.levies)}</span>
                      </div>
                    )}
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
                <div className="space-y-4">
                  {propertyData.history.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 text-center">
                        <div className="text-sm font-medium">{formatDate(event.date)}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={event.event === 'sale' ? 'default' : 'secondary'}>
                            {event.event.charAt(0).toUpperCase() + event.event.slice(1)}
                          </Badge>
                          {event.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{event.details}</p>
                        {event.price && (
                          <p className="text-sm font-medium text-green-600 mt-1">
                            {formatCurrency(event.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
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
                    <span>Zoning & Restrictions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-700">Zoning Scheme:</span>
                    <p className="text-gray-900">{propertyData.zoningScheme}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-700">Building Restrictions:</span>
                    <ul className="mt-1 space-y-1">
                      {propertyData.buildingRestrictions.map((restriction, index) => (
                        <li key={index} className="text-sm text-gray-900">• {restriction}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Servitudes & Encumbrances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <span className="font-medium text-gray-700">Registered Servitudes:</span>
                    <ul className="mt-1 space-y-1">
                      {propertyData.servitudes.map((servitude, index) => (
                        <li key={index} className="text-sm text-gray-900">• {servitude}</li>
                      ))}
                    </ul>
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
            <span>Real Data Integration Available</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <p className="mb-3">
            This example shows the comprehensive property intelligence that can be gathered. 
            For real data integration, we can connect to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>SA Deeds Office API for ownership and title deed information</li>
            <li>Home Affairs API for ID verification</li>
            <li>Property24 & Private Property APIs for market data</li>
            <li>Lightstone Property API for valuations</li>
            <li>Municipal databases for rates and services</li>
            <li>CIPC API for company director information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
