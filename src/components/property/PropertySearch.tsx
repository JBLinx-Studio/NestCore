
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Home, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Satellite,
  Map as MapIcon
} from "lucide-react";
import { toast } from "sonner";

interface PropertyOwner {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  registrationDate?: string;
}

interface PropertyResult {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  owner: PropertyOwner;
  propertyType: string;
  estimatedValue: number;
  lastSaleDate?: string;
  lastSalePrice?: number;
  size: string;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl?: string;
}

export const PropertySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PropertyResult[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyResult | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'map'>('map');

  // Mock data for demonstration
  const mockResults: PropertyResult[] = [
    {
      id: "1",
      address: "123 Main Street, Cape Town, 8001",
      coordinates: { lat: -33.9249, lng: 18.4241 },
      owner: {
        name: "John Smith",
        phone: "+27 21 123 4567",
        email: "john.smith@email.com",
        address: "456 Oak Avenue, Cape Town",
        registrationDate: "2019-03-15"
      },
      propertyType: "Residential House",
      estimatedValue: 2850000,
      lastSaleDate: "2021-08-20",
      lastSalePrice: 2650000,
      size: "250 sqm",
      bedrooms: 3,
      bathrooms: 2,
      imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
    },
    {
      id: "2", 
      address: "789 Beach Road, Durban, 4001",
      coordinates: { lat: -29.8587, lng: 31.0218 },
      owner: {
        name: "Sarah Johnson",
        phone: "+27 31 987 6543",
        email: "sarah.johnson@email.com",
        registrationDate: "2020-11-08"
      },
      propertyType: "Apartment",
      estimatedValue: 1950000,
      size: "120 sqm",
      bedrooms: 2,
      bathrooms: 1,
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a property address or ERF number");
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockResults.filter(property =>
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setIsSearching(false);
      
      if (filteredResults.length === 0) {
        toast.info("No properties found for that search");
      } else {
        toast.success(`Found ${filteredResults.length} property(ies)`);
      }
    }, 1500);
  };

  const MapPlaceholder = ({ property }: { property: PropertyResult }) => (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border border-gray-200 overflow-hidden">
      {/* Mock satellite/map view */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-gray-200">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant={mapView === 'map' ? 'default' : 'outline'}
            onClick={() => setMapView('map')}
          >
            <MapIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={mapView === 'satellite' ? 'default' : 'outline'}
            onClick={() => setMapView('satellite')}
          >
            <Satellite className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Property marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Home className="h-4 w-4 text-white" />
          </div>
        </div>
        
        {/* Coordinates display */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-sm font-mono">
          {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <Search className="h-6 w-6 text-blue-600" />
            <span>Property & Owner Search</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Search any property by address or ERF number to find ownership details and location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter property address, ERF number, or coordinates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12 text-lg"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
            >
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Results List */}
          <Card>
            <CardHeader>
              <CardTitle>Search Results ({searchResults.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {searchResults.map((property) => (
                <div
                  key={property.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedProperty?.id === property.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{property.address}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}</span>
                      </div>
                    </div>
                    <Badge>{property.propertyType}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      <span>{property.owner.name}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>R{property.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Property Details */}
          {selectedProperty && (
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="owner">Owner</TabsTrigger>
                    <TabsTrigger value="map">Location</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    {selectedProperty.imageUrl && (
                      <img
                        src={selectedProperty.imageUrl}
                        alt="Property"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedProperty.address}</h3>
                        <Badge className="mt-1">{selectedProperty.propertyType}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Size:</span>
                          <div className="font-medium">{selectedProperty.size}</div>
                        </div>
                        {selectedProperty.bedrooms && (
                          <div>
                            <span className="text-gray-600">Bedrooms:</span>
                            <div className="font-medium">{selectedProperty.bedrooms}</div>
                          </div>
                        )}
                        {selectedProperty.bathrooms && (
                          <div>
                            <span className="text-gray-600">Bathrooms:</span>
                            <div className="font-medium">{selectedProperty.bathrooms}</div>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-600">Est. Value:</span>
                          <div className="font-medium">R{selectedProperty.estimatedValue.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      {selectedProperty.lastSaleDate && (
                        <div className="pt-3 border-t">
                          <div className="text-sm text-gray-600">Last Sale:</div>
                          <div className="font-medium">
                            R{selectedProperty.lastSalePrice?.toLocaleString()} on {selectedProperty.lastSaleDate}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="owner" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{selectedProperty.owner.name}</div>
                          <div className="text-sm text-gray-600">Property Owner</div>
                        </div>
                      </div>
                      
                      {selectedProperty.owner.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{selectedProperty.owner.phone}</div>
                            <div className="text-sm text-gray-600">Phone</div>
                          </div>
                        </div>
                      )}
                      
                      {selectedProperty.owner.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{selectedProperty.owner.email}</div>
                            <div className="text-sm text-gray-600">Email</div>
                          </div>
                        </div>
                      )}
                      
                      {selectedProperty.owner.address && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{selectedProperty.owner.address}</div>
                            <div className="text-sm text-gray-600">Owner Address</div>
                          </div>
                        </div>
                      )}
                      
                      {selectedProperty.owner.registrationDate && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{selectedProperty.owner.registrationDate}</div>
                            <div className="text-sm text-gray-600">Registration Date</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="map">
                    <MapPlaceholder property={selectedProperty} />
                    <div className="mt-4 text-sm text-gray-600">
                      <strong>Note:</strong> This is a placeholder map. With real API integration, 
                      this would show an actual satellite/street view of the property location.
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      {/* API Integration Info */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">Real API Integration Ready</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-700">
          <p className="mb-2">This interface is ready for real API integration. Once connected to Supabase, we can integrate:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Property Databases:</strong> Deed Office records, municipal databases</li>
            <li><strong>Mapping Services:</strong> Google Maps, Mapbox with satellite imagery</li>
            <li><strong>Geocoding:</strong> Address to coordinates conversion</li>
            <li><strong>Owner Verification:</strong> CIPC records, contact verification</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
