
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Home,
  Loader2
} from "lucide-react";
import { openStreetMapService, PropertyLocation } from "@/services/OpenStreetMapService";
import { toast } from "sonner";

interface PropertyOwner {
  name: string;
  idNumber?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface PropertyDetails {
  erfNumber?: string;
  propertyType: string;
  size?: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  yearBuilt?: number;
  marketValue?: number;
  rates?: number;
  owner?: PropertyOwner;
}

interface SearchResult {
  location: PropertyLocation;
  details: PropertyDetails;
}

export const PropertySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsSearching(true);
    try {
      const locations = await openStreetMapService.searchProperties(searchQuery, 10);
      
      // Mock property details for demonstration
      const searchResults: SearchResult[] = locations.map(location => ({
        location,
        details: generateMockPropertyDetails(location)
      }));

      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast.info("No properties found for your search");
      } else {
        toast.success(`Found ${searchResults.length} properties`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const generateMockPropertyDetails = (location: PropertyLocation): PropertyDetails => {
    const propertyTypes = ['House', 'Apartment', 'Townhouse', 'Villa', 'Farm'];
    const randomType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    
    return {
      erfNumber: `ERF${Math.floor(Math.random() * 9999) + 1000}`,
      propertyType: randomType,
      size: `${Math.floor(Math.random() * 500) + 100}m²`,
      bedrooms: Math.floor(Math.random() * 5) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      parkingSpaces: Math.floor(Math.random() * 4),
      yearBuilt: Math.floor(Math.random() * 50) + 1970,
      marketValue: Math.floor(Math.random() * 2000000) + 500000,
      rates: Math.floor(Math.random() * 3000) + 500,
      owner: {
        name: generateRandomName(),
        idNumber: generateRandomId(),
        phone: generateRandomPhone(),
        email: generateRandomEmail(),
        address: location.address
      }
    };
  };

  const generateRandomName = () => {
    const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 9000000000000) + 1000000000000;
  };

  const generateRandomPhone = () => {
    return `+27 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`;
  };

  const generateRandomEmail = () => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const username = Math.random().toString(36).substring(2, 8);
    return `${username}@${domain}`;
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Search className="h-6 w-6 text-blue-600" />
            <span>Property Search</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Search for any property in South Africa using our integrated database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Enter address, ERF number, or property description..."
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
              className="px-8"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Results List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Search Results ({results.length})</h3>
          
          {results.length === 0 && !isSearching && (
            <Card className="p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No search results yet. Enter an address to get started.</p>
            </Card>
          )}

          {results.map((result, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedResult === result ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedResult(result)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">{result.details.propertyType}</span>
                      {result.details.erfNumber && (
                        <Badge variant="outline">{result.details.erfNumber}</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{result.location.displayName}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {result.details.bedrooms && (
                        <span>{result.details.bedrooms} bed</span>
                      )}
                      {result.details.bathrooms && (
                        <span>{result.details.bathrooms} bath</span>
                      )}
                      {result.details.size && (
                        <span>{result.details.size}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {result.details.marketValue && (
                      <div className="font-bold text-green-600">
                        R {result.details.marketValue.toLocaleString()}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {result.location.lat.toFixed(4)}, {result.location.lon.toFixed(4)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Property Details</h3>
          
          {!selectedResult ? (
            <Card className="p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a property to view details</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Property Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>Property Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Type:</span> {selectedResult.details.propertyType}</div>
                    <div><span className="font-medium">ERF:</span> {selectedResult.details.erfNumber}</div>
                    <div><span className="font-medium">Size:</span> {selectedResult.details.size}</div>
                    <div><span className="font-medium">Built:</span> {selectedResult.details.yearBuilt}</div>
                    <div><span className="font-medium">Bedrooms:</span> {selectedResult.details.bedrooms}</div>
                    <div><span className="font-medium">Bathrooms:</span> {selectedResult.details.bathrooms}</div>
                  </div>
                  
                  {selectedResult.details.marketValue && (
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Market Value:</span>
                        <span className="text-lg font-bold text-green-600">
                          R {selectedResult.details.marketValue.toLocaleString()}
                        </span>
                      </div>
                      {selectedResult.details.rates && (
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-600">Monthly Rates:</span>
                          <span className="text-sm">R {selectedResult.details.rates}</span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Owner Info */}
              {selectedResult.details.owner && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Owner Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><span className="font-medium">Name:</span> {selectedResult.details.owner.name}</div>
                    {selectedResult.details.owner.idNumber && (
                      <div><span className="font-medium">ID Number:</span> {selectedResult.details.owner.idNumber}</div>
                    )}
                    {selectedResult.details.owner.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{selectedResult.details.owner.phone}</span>
                      </div>
                    )}
                    {selectedResult.details.owner.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{selectedResult.details.owner.email}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Location Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">{selectedResult.location.displayName}</div>
                  <div className="text-xs text-gray-500">
                    Coordinates: {selectedResult.location.lat.toFixed(6)}, {selectedResult.location.lon.toFixed(6)}
                  </div>
                  {selectedResult.location.municipality && (
                    <div className="text-xs"><span className="font-medium">Municipality:</span> {selectedResult.location.municipality}</div>
                  )}
                  {selectedResult.location.province && (
                    <div className="text-xs"><span className="font-medium">Province:</span> {selectedResult.location.province}</div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
