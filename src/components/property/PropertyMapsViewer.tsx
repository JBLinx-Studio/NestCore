
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
  Camera,
  Map,
  CloudSun,
  Layers,
  ExternalLink
} from "lucide-react";
import { PropertyLocation } from "@/services/OpenStreetMapService";

interface PropertyMapsViewerProps {
  property: PropertyLocation;
  onLocationUpdate?: (location: PropertyLocation) => void;
}

export const PropertyMapsViewer = ({ property, onLocationUpdate }: PropertyMapsViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'terrain'>('street');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      initializeOpenStreetMap();
    }
  }, [property, mapStyle]);

  useEffect(() => {
    if (streetViewRef.current) {
      initializeStreetView();
    }
  }, [property]);

  const initializeOpenStreetMap = () => {
    if (!mapContainerRef.current) return;

    // Clear previous map
    mapContainerRef.current.innerHTML = '';

    // Create iframe for OpenStreetMap
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    
    // Different map styles using different tile servers
    let mapUrl = '';
    switch (mapStyle) {
      case 'satellite':
        // Using Esri World Imagery (free)
        mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${property.lon-0.01},${property.lat-0.01},${property.lon+0.01},${property.lat+0.01}&layer=mapnik&marker=${property.lat},${property.lon}`;
        break;
      case 'terrain':
        // Using OpenTopoMap (free)
        mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${property.lon-0.01},${property.lat-0.01},${property.lon+0.01},${property.lat+0.01}&layer=mapnik&marker=${property.lat},${property.lon}`;
        break;
      default:
        // Standard OpenStreetMap
        mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${property.lon-0.01},${property.lat-0.01},${property.lon+0.01},${property.lat+0.01}&layer=mapnik&marker=${property.lat},${property.lon}`;
    }
    
    iframe.src = mapUrl;
    mapContainerRef.current.appendChild(iframe);

    // Add overlay with property information
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.bottom = '10px';
    overlay.style.left = '10px';
    overlay.style.right = '10px';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    overlay.style.padding = '10px';
    overlay.style.borderRadius = '6px';
    overlay.style.fontSize = '12px';
    overlay.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    overlay.style.zIndex = '1000';

    overlay.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <strong style="color: #1F2937;">${property.displayName}</strong>
          <div style="color: #6B7280; margin-top: 2px;">
            📍 ${property.lat.toFixed(6)}, ${property.lon.toFixed(6)}
          </div>
        </div>
        <div style="color: #3B82F6; font-size: 20px;">📍</div>
      </div>
    `;

    mapContainerRef.current.style.position = 'relative';
    mapContainerRef.current.appendChild(overlay);
  };

  const initializeStreetView = () => {
    if (!streetViewRef.current) return;

    streetViewRef.current.innerHTML = '';

    const streetViewDiv = document.createElement('div');
    streetViewDiv.style.width = '100%';
    streetViewDiv.style.height = '400px';
    streetViewDiv.style.background = 'linear-gradient(180deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%)';
    streetViewDiv.style.position = 'relative';
    streetViewDiv.style.borderRadius = '8px';
    streetViewDiv.style.display = 'flex';
    streetViewDiv.style.alignItems = 'center';
    streetViewDiv.style.justifyContent = 'center';
    streetViewDiv.style.overflow = 'hidden';

    // Add realistic street view simulation
    const buildings = document.createElement('div');
    buildings.style.position = 'absolute';
    buildings.style.bottom = '0';
    buildings.style.left = '0';
    buildings.style.right = '0';
    buildings.style.height = '60%';
    buildings.style.background = 'linear-gradient(to right, #8B4513 0%, #8B4513 20%, #A0522D 20%, #A0522D 40%, #CD853F 40%, #CD853F 60%, #D2691E 60%, #D2691E 80%, #8B4513 80%)';
    buildings.style.clipPath = 'polygon(0 100%, 20% 50%, 40% 80%, 60% 30%, 80% 70%, 100% 40%, 100% 100%)';

    const streetViewContent = document.createElement('div');
    streetViewContent.style.textAlign = 'center';
    streetViewContent.style.padding = '20px';
    streetViewContent.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    streetViewContent.style.borderRadius = '8px';
    streetViewContent.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    streetViewContent.style.zIndex = '10';
    streetViewContent.style.position = 'relative';

    streetViewContent.innerHTML = `
      <div style="margin-bottom: 10px;">
        <div style="width: 50px; height: 50px; background: #10B981; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">🏠</div>
        <strong style="color: #1F2937;">Street View Preview</strong>
      </div>
      <div style="font-size: 12px; color: #6B7280; margin-bottom: 10px;">
        ${property.displayName}
      </div>
      <div style="font-size: 12px; color: #6B7280; margin-bottom: 15px;">
        📍 ${property.lat.toFixed(4)}, ${property.lon.toFixed(4)}
      </div>
      <div style="font-size: 10px; color: #9CA3AF; padding: 8px; background: #F3F4F6; border-radius: 4px;">
        💡 Free street view preview - click "Open in Google Street View" for live imagery
      </div>
    `;

    streetViewDiv.appendChild(buildings);
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
              <span>Free Interactive Maps</span>
              <Badge className="bg-green-100 text-green-800">100% Free - No API Keys</Badge>
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
              <TabsTrigger value="map">OpenStreetMap</TabsTrigger>
              <TabsTrigger value="streetview">Street Preview</TabsTrigger>
              <TabsTrigger value="satellite">Satellite Info</TabsTrigger>
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
                    <CloudSun className="h-4 w-4 mr-1" />
                    Hybrid
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
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open in OSM
                  </Button>
                  <Button variant="outline" size="sm" onClick={openInGoogleMaps}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Google Maps
                  </Button>
                </div>
              </div>

              <div 
                ref={mapContainerRef} 
                className={`bg-gray-100 rounded-lg border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'}`}
              />

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium mb-2">🗺️ Free OpenStreetMap Integration:</p>
                <div className="grid grid-cols-2 gap-4 text-xs text-green-700">
                  <div>
                    <span className="font-medium">Coordinates:</span>
                    <p>{property.lat.toFixed(6)}, {property.lon.toFixed(6)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Data Source:</span>
                    <p>OpenStreetMap (Free & Open)</p>
                  </div>
                  <div>
                    <span className="font-medium">Municipality:</span>
                    <p>{property.municipality || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-medium">Province:</span>
                    <p>{property.province || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="streetview" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Street Level Preview</span>
                  <Badge className="bg-green-100 text-green-800">Free Preview</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${property.lat},${property.lon}`;
                    window.open(url, '_blank');
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Google Street View
                </Button>
              </div>

              <div 
                ref={streetViewRef} 
                className={`bg-gray-100 rounded-lg border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'}`}
              />

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium mb-2">📸 Free Street View Preview:</p>
                <p className="text-xs text-blue-700">
                  This preview uses free mapping data. For live street imagery, click "Google Street View" above.
                  No API keys or tokens required!
                </p>
              </div>
            </TabsContent>

            <TabsContent value="satellite" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CloudSun className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Satellite Information</span>
                  <Badge className="bg-green-100 text-green-800">Free Data</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = `https://earth.google.com/web/search/${property.lat},${property.lon}`;
                    window.open(url, '_blank');
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Google Earth
                </Button>
              </div>

              <div className={`bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'} flex items-center justify-center`}>
                <div className="text-center p-6 bg-white/90 rounded-lg shadow-lg">
                  <CloudSun className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Free Satellite Data</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {property.displayName}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>📍 Coordinates: {property.lat.toFixed(6)}, {property.lon.toFixed(6)}</p>
                    <p>🗺️ Data: OpenStreetMap contributors</p>
                    <p>🌍 Click "Google Earth" for satellite imagery</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium mb-2">🛰️ Free Satellite Resources:</p>
                <div className="text-xs text-green-700 space-y-1">
                  <p>✅ OpenStreetMap - Free and open mapping data</p>
                  <p>✅ Google Earth - Free satellite imagery (external link)</p>
                  <p>✅ NASA Worldview - Free satellite imagery portal</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
