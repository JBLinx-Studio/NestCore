
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, DollarSign, Users, Star, Target, Filter } from "lucide-react";
import { toast } from "sonner";

interface PropertyListing {
  id: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  size: number;
  features: string[];
  score: number;
  distance: number;
  images: string[];
}

interface SearchCriteria {
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  propertyType: string;
  location: string;
  features: string[];
  maxDistance: number;
}

export const PropertyMatcher = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    minPrice: 500000,
    maxPrice: 1000000,
    minBedrooms: 2,
    maxBedrooms: 4,
    minBathrooms: 1,
    propertyType: "",
    location: "",
    features: [],
    maxDistance: 10
  });

  const [matches, setMatches] = useState<PropertyListing[]>([
    {
      id: "1",
      address: "Berg Street, Bothasrus",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      price: 664000,
      size: 85,
      features: ["Parking", "Security", "Garden", "Pool"],
      score: 95,
      distance: 2.3,
      images: ["/placeholder.svg"]
    },
    {
      id: "2", 
      address: "Cloete Street, Bothasrus",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 2,
      price: 715718,
      size: 120,
      features: ["Garage", "Security", "Garden", "Patio"],
      score: 88,
      distance: 3.7,
      images: ["/placeholder.svg"]
    },
    {
      id: "3",
      address: "Pine Ridge Estate",
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      price: 950000,
      size: 180,
      features: ["Double Garage", "Pool", "Security", "Large Garden", "Study"],
      score: 92,
      distance: 5.2,
      images: ["/placeholder.svg"]
    }
  ]);

  const availableFeatures = [
    "Parking", "Garage", "Security", "Pool", "Garden", "Patio", 
    "Study", "En-suite", "Alarm", "Fireplace", "Air Conditioning", "Solar"
  ];

  const runMatchingAlgorithm = () => {
    // Advanced matching algorithm simulation
    toast.success("Running AI-powered property matching algorithm...");
    
    const scoredMatches = matches.map(property => {
      let score = 0;
      
      // Price matching (30% weight)
      const priceInRange = property.price >= searchCriteria.minPrice && property.price <= searchCriteria.maxPrice;
      if (priceInRange) score += 30;
      
      // Bedroom matching (25% weight)
      const bedroomsMatch = property.bedrooms >= searchCriteria.minBedrooms && property.bedrooms <= searchCriteria.maxBedrooms;
      if (bedroomsMatch) score += 25;
      
      // Bathroom matching (15% weight)
      const bathroomsMatch = property.bathrooms >= searchCriteria.minBathrooms;
      if (bathroomsMatch) score += 15;
      
      // Property type matching (10% weight)
      const typeMatch = !searchCriteria.propertyType || property.type.toLowerCase().includes(searchCriteria.propertyType.toLowerCase());
      if (typeMatch) score += 10;
      
      // Feature matching (15% weight)
      const featuresMatch = searchCriteria.features.filter(feature => property.features.includes(feature)).length;
      score += (featuresMatch / searchCriteria.features.length) * 15;
      
      // Distance bonus (5% weight)
      if (property.distance <= searchCriteria.maxDistance) score += 5;
      
      return { ...property, score: Math.round(score) };
    });
    
    setMatches(scoredMatches.sort((a, b) => b.score - a.score));
  };

  const toggleFeature = (feature: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 75) return "bg-blue-100 text-blue-800 border-blue-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-blue-600" />
            <span>AI-Powered Property Matching</span>
          </CardTitle>
          <CardDescription>Advanced algorithms to find perfect property matches for your clients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Price Range
              </h3>
              <div className="space-y-2">
                <Label>Min Price: R {searchCriteria.minPrice.toLocaleString()}</Label>
                <Slider
                  value={[searchCriteria.minPrice]}
                  onValueChange={(value) => setSearchCriteria({...searchCriteria, minPrice: value[0]})}
                  max={2000000}
                  min={300000}
                  step={50000}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Price: R {searchCriteria.maxPrice.toLocaleString()}</Label>
                <Slider
                  value={[searchCriteria.maxPrice]}
                  onValueChange={(value) => setSearchCriteria({...searchCriteria, maxPrice: value[0]})}
                  max={2000000}
                  min={300000}
                  step={50000}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <Home className="h-5 w-5 mr-2 text-blue-600" />
                Property Details
              </h3>
              <div>
                <Label htmlFor="property-type">Property Type</Label>
                <Select value={searchCriteria.propertyType} onValueChange={(value) => setSearchCriteria({...searchCriteria, propertyType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Type</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Bedrooms: {searchCriteria.minBedrooms}</Label>
                  <Slider
                    value={[searchCriteria.minBedrooms]}
                    onValueChange={(value) => setSearchCriteria({...searchCriteria, minBedrooms: value[0]})}
                    max={6}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label>Max Bedrooms: {searchCriteria.maxBedrooms}</Label>
                  <Slider
                    value={[searchCriteria.maxBedrooms]}
                    onValueChange={(value) => setSearchCriteria({...searchCriteria, maxBedrooms: value[0]})}
                    max={6}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label>Min Bathrooms: {searchCriteria.minBathrooms}</Label>
                <Slider
                  value={[searchCriteria.minBathrooms]}
                  onValueChange={(value) => setSearchCriteria({...searchCriteria, minBathrooms: value[0]})}
                  max={4}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                Location & Features
              </h3>
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Input
                  id="location"
                  placeholder="Enter suburb or area"
                  value={searchCriteria.location}
                  onChange={(e) => setSearchCriteria({...searchCriteria, location: e.target.value})}
                />
              </div>
              <div>
                <Label>Max Distance: {searchCriteria.maxDistance} km</Label>
                <Slider
                  value={[searchCriteria.maxDistance]}
                  onValueChange={(value) => setSearchCriteria({...searchCriteria, maxDistance: value[0]})}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Desired Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableFeatures.map((feature) => (
                    <Button
                      key={feature}
                      variant={searchCriteria.features.includes(feature) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeature(feature)}
                      className="text-xs"
                    >
                      {feature}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={runMatchingAlgorithm} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Search className="h-4 w-4 mr-2" />
              Find Matches
            </Button>
            <Button variant="outline" onClick={() => toast.info("Saving search criteria...")}>
              <Filter className="h-4 w-4 mr-2" />
              Save Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Matching Results */}
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle>Property Matches</CardTitle>
          <CardDescription>Properties ranked by AI matching algorithm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {matches.map((property) => (
              <div key={property.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{property.address}</h3>
                      <Badge className={getScoreColor(property.score)}>
                        <Star className="h-3 w-3 mr-1" />
                        {property.score}% Match
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-slate-600 mb-3">
                      <span>{property.type}</span>
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.size}m²</span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.distance}km away
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {property.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      R {property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">
                      R {Math.round(property.price / property.size).toLocaleString()}/m²
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Schedule Viewing</Button>
                  <Button size="sm" variant="outline">Contact Owner</Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Users className="h-4 w-4 mr-1" />
                    Match with Client
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
