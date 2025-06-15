
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertySearch } from "./PropertySearch";
import { PropertyIntelligenceEnhanced } from "./PropertyIntelligenceEnhanced";
import { PropertyLocation } from "@/services/OpenStreetMapService";
import { Search, Brain, MapPin, ArrowRight, Zap } from "lucide-react";

export const PropertySearchTab = () => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyLocation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePropertySelected = (property: PropertyLocation) => {
    console.log('Property selected for enhanced intelligence:', property);
    setIsAnalyzing(true);
    setSelectedProperty(property);
    
    // Simulate analysis loading time
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleBackToSearch = () => {
    setSelectedProperty(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${!selectedProperty ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                <Search className="h-4 w-4" />
              </div>
              <span className={!selectedProperty ? 'text-blue-900 font-semibold' : 'text-gray-600'}>
                1. Search Location
              </span>
            </div>
            
            <ArrowRight className={`h-5 w-5 transition-colors ${selectedProperty ? 'text-green-500' : 'text-gray-300'}`} />
            
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedProperty ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                {isAnalyzing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Brain className="h-4 w-4" />
                )}
              </div>
              <span className={selectedProperty ? 'text-blue-900 font-semibold' : 'text-gray-500'}>
                2. AI Analysis
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Dynamic Content Based on Workflow State */}
      {!selectedProperty ? (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              <span>Property Location Search</span>
            </CardTitle>
            <p className="text-gray-600">
              Search for any property location to get instant AI-powered intelligence and analysis
            </p>
          </CardHeader>
          <CardContent>
            <PropertySearch onPropertySelected={handlePropertySelected} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Selected Property Summary */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Selected Property</h3>
                    <p className="text-green-700 text-sm">{selectedProperty.address}</p>
                    {selectedProperty.suburb && (
                      <Badge variant="outline" className="mt-1 text-xs border-green-300">
                        {selectedProperty.suburb}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isAnalyzing && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm font-medium">Analyzing...</span>
                    </div>
                  )}
                  <Button variant="outline" size="sm" onClick={handleBackToSearch}>
                    Search Different Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Intelligence Results */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-600" />
                <span>AI-Powered Property Intelligence</span>
                {!isAnalyzing && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Analysis Complete
                  </Badge>
                )}
              </CardTitle>
              <p className="text-gray-600">
                Comprehensive analysis including market data, demographics, amenities, and risk assessment
              </p>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">Analyzing Property</h3>
                      <p className="text-gray-600">Gathering comprehensive intelligence data...</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <span>• Market Analysis</span>
                        <span>• Demographics</span>
                        <span>• Risk Assessment</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <PropertyIntelligenceEnhanced selectedProperty={selectedProperty} />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
