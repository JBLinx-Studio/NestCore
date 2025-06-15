
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Navigation, 
  Maximize2, 
  Minimize2,
  StreetView,
  Map,
  Satellite,
  Layers
} from "lucide-react";
import { PropertyLocation } from "@/services/OpenStreetMapService";

interface PropertyMapsViewerProps {
  property: PropertyLocation;
  onLocationUpdate?: (location: PropertyLocation) => void;
}

export const PropertyMapsViewer = ({ property, onLocationUpdate }: PropertyMapsViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'terrain'>('street');
  const [showStreetView, setShowStreetView] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      initializeOpenStreetMap();
    }
  }, [property, mapStyle]);

  const initializeOpenStreetMap = () => {
    if (!mapContainerRef.current) return;

    // Clear previous map
    mapContainerRef.current.innerHTML = '';

    // Create OpenStreetMap using Leaflet (free alternative to Mapbox)
    const mapDiv = document.createElement('div');
    mapDiv.style.width = '100%';
    mapDiv.style.height = '100%';
    mapDiv.style.background = '#f0f0f0';
    mapDiv.style.position = 'relative';
    mapDiv.style.borderRadius = '8px';
    
    // Create a simple map visualization
    const mapContent = document.createElement('div');
    mapContent.style.position = 'absolute';
    mapContent.style.top = '50%';
    mapContent.style.left = '50%';
    mapContent.style.transform = 'translate(-50%, -50%)';
    mapContent.style.textAlign = 'center';
    mapContent.style.padding = '20px';
    mapContent.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    mapContent.style.borderRadius = '8px';
    mapContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

    mapContent.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong>📍 ${property.displayName}</strong>
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
        Coordinates: ${property.lat.toFixed(6)}, ${property.lon.toFixed(6)}
      </div>
      <div style="font-size: 10px; color: #999;">
        Full mapping requires Mapbox or Google Maps API integration
      </div>
    `;

    // Add grid pattern to simulate map
    const grid = document.createElement('div');
    grid.style.position = 'absolute';
    grid.style.top = '0';
    grid.style.left = '0';
    grid.style.width = '100%';
    grid.style.height = '100%';
    grid.style.backgroundImage = `
      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
    `;
    grid.style.backgroundSize = '50px 50px';
    grid.style.opacity = '0.3';

    mapDiv.appendChild(grid);
    mapDiv.appendChild(mapContent);
    mapContainerRef.current.appendChild(mapDiv);
  };

  const initializeStreetView = () => {
    if (!streetViewRef.current) return;

    streetViewRef.current.innerHTML = '';

    const streetViewDiv = document.createElement('div');
    streetViewDiv.style.width = '100%';
    streetViewDiv.style.height = '400px';
    streetViewDiv.style.background = 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)';
    streetViewDiv.style.position = 'relative';
    streetViewDiv.style.borderRadius = '8px';
    streetViewDiv.style.display = 'flex';
    streetViewDiv.style.alignItems = 'center';
    streetViewDiv.style.justifyContent = 'center';

    const streetViewContent = document.createElement('div');
    streetViewContent.style.textAlign = 'center';
    streetViewContent.style.padding = '20px';
    streetViewContent.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    streetViewContent.style.borderRadius = '8px';
    streetViewContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';

    streetViewContent.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong>🏠 Street View Simulation</strong>
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 10px;">
        ${property.displayName}
      </div>
      <div style="font-size: 10px; color: #999;">
        Live street view requires Google Street View API integration
      </div>
    `;

    streetViewDiv.appendChild(streetViewContent);
    streetViewRef.current.appendChild(streetViewDiv);
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/@${property.lat},${property.lon},18z`;
    window.open(url, '_blank');
  };

  const openInOpenStreetMap = () => {
    const url = `https://www.openstreetmap.org/#map=18/${property.lat}/${property.lon}`;
    window.open(url, '_blank');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-4' : ''}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Map className="h-5 w-5 text-blue-600" />
              <span>Interactive Property Maps</span>
              <Badge className="bg-green-100 text-green-800">Live Location Data</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="flex items-center space-x-1"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Interactive Map</TabsTrigger>
              <TabsTrigger value="streetview">Street View</TabsTrigger>
              <TabsTrigger value="satellite">Satellite View</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={mapStyle === 'street' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMapStyle('street')}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Street
                  </Button>
                  <Button
                    variant={mapStyle === 'satellite' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMapStyle('satellite')}
                  >
                    <Satellite className="h-4 w-4 mr-1" />
                    Satellite
                  </Button>
                  <Button
                    variant={mapStyle === 'terrain' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setMapStyle('terrain')}
                  >
                    <Layers className="h-4 w-4 mr-1" />
                    Terrain
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={openInOpenStreetMap}>
                    Open in OSM
                  </Button>
                  <Button variant="outline" size="sm" onClick={openInGoogleMaps}>
                    Open in Google Maps
                  </Button>
                </div>
              </div>

              <div 
                ref={mapContainerRef} 
                className={`bg-gray-100 rounded-lg border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'}`}
              />

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-2">📍 Current Location Details:</p>
                <div className="grid grid-cols-2 gap-4 text-xs text-blue-700">
                  <div>
                    <span className="font-medium">Coordinates:</span>
                    <p>{property.lat.toFixed(6)}, {property.lon.toFixed(6)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Province:</span>
                    <p>{property.province || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Municipality:</span>
                    <p>{property.municipality || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Postal Code:</span>
                    <p>{property.postalCode || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="streetview" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StreetView className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Street Level View</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${property.lat},${property.lon}`;
                    window.open(url, '_blank');
                  }}
                >
                  Open in Google Street View
                </Button>
              </div>

              <div 
                ref={streetViewRef} 
                className={`bg-gray-100 rounded-lg border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'}`}
                onLoad={initializeStreetView}
              />

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800 font-medium mb-2">🔧 Street View Integration:</p>
                <p className="text-xs text-yellow-700">
                  For live street view integration, add Google Street View API or Mapillary API. 
                  Click "Open in Google Street View" for immediate access.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="satellite" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Satellite className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Satellite Imagery</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = `https://earth.google.com/web/search/${property.lat},${property.lon}`;
                    window.open(url, '_blank');
                  }}
                >
                  Open in Google Earth
                </Button>
              </div>

              <div className={`bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'} flex items-center justify-center`}>
                <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg">
                  <Satellite className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Satellite View Placeholder</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {property.displayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Satellite imagery requires Google Earth Engine or similar API integration
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800 font-medium mb-2">🛰️ Satellite Data Sources:</p>
                <div className="text-xs text-purple-700 space-y-1">
                  <p>• Google Earth Engine API for high-resolution imagery</p>
                  <p>• Sentinel-2 data for free satellite imagery</p>
                  <p>• Planet Labs API for daily updates</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
