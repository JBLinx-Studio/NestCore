
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Building, 
  Calendar,
  DollarSign,
  Home,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { openStreetMapService, PropertyLocation } from "@/services/OpenStreetMapService";
import { toast } from "sonner";

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
  isExample: boolean;
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
    setResults([]);
    setSelectedResult(null);

    try {
      const locations = await openStreetMapService.searchProperties(searchQuery, 10);
      
      const searchResults: SearchResult[] = locations.map(location => ({
        location,
        details: {
          propertyType: 'Example Property Type',
          isExample: true
        }
      }));

      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast.info("No properties found for your search");
      } else {
        toast.success(`Found ${searchResults.length} real locations from OpenStreetMap`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Search className="h-6 w-6 text-blue-600" />
            <span>Property Location Search</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Search for real property locations using OpenStreetMap data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Enter address, suburb, or landmark in South Africa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
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

      {/* API Status */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">OpenStreetMap API</span>
              <Badge className="bg-green-100 text-green-800">Active & Free</Badge>
            </div>
            <span className="text-sm text-green-600">Real location data available</span>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Results List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Search Results ({results.length})
          </h3>
          
          {isSearching && (
            <Card className="p-8 text-center">
              <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Searching OpenStreetMap...</p>
            </Card>
          )}

          {results.length === 0 && !isSearching && (
            <Card className="p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No search results yet. Enter an address to get started.</p>
            </Card>
          )}

          {results.map((result, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                selectedResult === result ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedResult(result)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">Real Location</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <MapPin className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{result.location.displayName}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Lat: {result.location.lat.toFixed(6)}</span>
                      <span>Lon: {result.location.lon.toFixed(6)}</span>
                    </div>
                  </div>
                  
                  {selectedResult === result && (
                    <div className="text-right">
                      <Badge className="bg-blue-100 text-blue-700">
                        Selected
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Home className="h-5 w-5 mr-2 text-blue-600" />
            Location Details
          </h3>
          
          {!selectedResult ? (
            <Card className="p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a location to view details</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Real Location Info */}
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Verified Location Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-900 mt-1">{selectedResult.location.displayName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Latitude:</span>
                      <p className="text-gray-900">{selectedResult.location.lat.toFixed(6)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Longitude:</span>
                      <p className="text-gray-900">{selectedResult.location.lon.toFixed(6)}</p>
                    </div>
                  </div>
                  
                  {selectedResult.location.municipality && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Municipality:</span>
                      <p className="text-gray-900">{selectedResult.location.municipality}</p>
                    </div>
                  )}
                  
                  {selectedResult.location.province && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Province:</span>
                      <p className="text-gray-900">{selectedResult.location.province}</p>
                    </div>
                  )}
                  
                  {selectedResult.location.postalCode && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Postal Code:</span>
                      <p className="text-gray-900">{selectedResult.location.postalCode}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Property Details Notice */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg text-yellow-800">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Property Details - Example Only</span>
                  </CardTitle>
                  <CardDescription className="text-yellow-700">
                    Property ownership and detail APIs require paid subscriptions. Location data above is real.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-2">To get real property data, you would need:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Lightstone Property API (paid)</li>
                      <li>Property24 API (paid)</li>
                      <li>SA Deeds Office API access</li>
                      <li>Municipal database access</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Integration Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Building className="h-5 w-5" />
                    <span>Available Integrations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">OpenStreetMap</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active & Free</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">Property Ownership APIs</span>
                    </div>
                    <Badge variant="secondary">Requires Setup</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">Deeds Office API</span>
                    </div>
                    <Badge variant="secondary">Limited Access</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
