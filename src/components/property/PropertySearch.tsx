
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
  Loader2,
  AlertTriangle
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
  isExample: boolean; // Flag to indicate this is example data
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
      
      // Use real location data with example property details
      const searchResults: SearchResult[] = locations.map(location => ({
        location,
        details: {
          propertyType: 'Example Property Type',
          isExample: true // All property details are examples for now
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

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Search className="h-6 w-6 text-blue-600" />
            <span>Real Property Location Search</span>
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
              Search Real Locations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Results List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Real Location Results ({results.length})</h3>
          
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
                      <span className="font-semibold">Real Location from OSM</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <MapPin className="h-3 w-3 mr-1" />
                        Real Coordinates
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{result.location.displayName}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Lat: {result.location.lat.toFixed(6)}</span>
                      <span>Lon: {result.location.lon.toFixed(6)}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Property Details: Example Only
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Location Details</h3>
          
          {!selectedResult ? (
            <Card className="p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a location to view details</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Real Location Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>Real Location Data (OpenStreetMap)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Full Address:</span> {selectedResult.location.displayName}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Latitude:</span> {selectedResult.location.lat.toFixed(6)}</div>
                    <div><span className="font-medium">Longitude:</span> {selectedResult.location.lon.toFixed(6)}</div>
                  </div>
                  
                  {selectedResult.location.municipality && (
                    <div className="text-sm">
                      <span className="font-medium">Municipality:</span> {selectedResult.location.municipality}
                    </div>
                  )}
                  
                  {selectedResult.location.province && (
                    <div className="text-sm">
                      <span className="font-medium">Province:</span> {selectedResult.location.province}
                    </div>
                  )}
                  
                  {selectedResult.location.postalCode && (
                    <div className="text-sm">
                      <span className="font-medium">Postal Code:</span> {selectedResult.location.postalCode}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Example Property Info Notice */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Property Details - Example Only</span>
                  </CardTitle>
                  <CardDescription className="text-yellow-700">
                    Property ownership and detail APIs require paid subscriptions. The location data above is real from OpenStreetMap.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-yellow-800">
                    <p><strong>To get real property data, you would need:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Lightstone Property API (paid)</li>
                      <li>Property24 API (paid)</li>
                      <li>SA Deeds Office API access</li>
                      <li>Municipal database access</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* API Integration Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Available Integrations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium">OpenStreetMap</span>
                    <Badge className="bg-green-100 text-green-800">Active & Free</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Property Ownership APIs</span>
                    <Badge variant="secondary">Requires Setup</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Deeds Office API</span>
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
