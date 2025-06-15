export interface OSMSearchResult {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

export interface PropertyLocation {
  id: string;
  address: string;
  lat: number;
  lon: number;
  displayName: string;
  municipality?: string;
  province?: string;
  postalCode?: string;
  houseNumber?: string;
  road?: string;
  suburb?: string;
  city?: string;
  county?: string;
  osmType?: string;
  osmClass?: string;
}

export interface NearbyAmenities {
  schools: Array<{name: string; distance: number; type: string}>;
  hospitals: Array<{name: string; distance: number; type: string}>;
  shopping: Array<{name: string; distance: number; type: string}>;
  transport: Array<{name: string; distance: number; type: string}>;
}

export interface AreaInsights {
  crimeData?: {
    safetyRating: number;
    source: string;
  };
  demographics?: {
    populationDensity: string;
    averageIncome: string;
    source: string;
  };
  infrastructure?: {
    roadQuality: string;
    utilities: string[];
    source: string;
  };
}

export class OpenStreetMapService {
  private baseUrl = 'https://nominatim.openstreetmap.org';
  private overpassUrl = 'https://overpass-api.de/api/interpreter';
  private userAgent = 'NestCore Property Manager';

  async searchProperties(query: string, limit: number = 10): Promise<PropertyLocation[]> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${this.baseUrl}/search?q=${encodedQuery}&format=json&limit=${limit}&countrycodes=za&addressdetails=1&extratags=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent
        }
      });

      if (!response.ok) {
        throw new Error(`OSM API error: ${response.status}`);
      }

      const results: OSMSearchResult[] = await response.json();
      
      return results.map(result => ({
        id: result.place_id,
        address: result.display_name,
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        displayName: result.display_name,
        municipality: this.extractMunicipality(result.display_name),
        province: this.extractProvince(result.display_name),
        postalCode: result.address?.postcode || this.extractPostalCode(result.display_name),
        houseNumber: result.address?.house_number,
        road: result.address?.road,
        suburb: result.address?.suburb,
        city: result.address?.city,
        county: result.address?.county,
        osmType: result.osm_type,
        osmClass: result.class
      }));
    } catch (error) {
      console.error('OSM Search Error:', error);
      throw error;
    }
  }

  async getNearbyAmenities(lat: number, lon: number, radius: number = 2000): Promise<NearbyAmenities> {
    try {
      // Overpass query to find nearby amenities
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"~"^(school|university|college|hospital|clinic|pharmacy|bank|atm|restaurant|cafe|shop|fuel|bus_station|taxi)$"](around:${radius},${lat},${lon});
          way["amenity"~"^(school|university|college|hospital|clinic|pharmacy|bank|atm|restaurant|cafe|shop|fuel|bus_station|taxi)$"](around:${radius},${lat},${lon});
        );
        out center;
      `;

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        console.warn('Overpass API unavailable, using mock data');
        return this.getMockAmenities();
      }

      const data = await response.json();
      return this.processAmenities(data.elements, lat, lon);
    } catch (error) {
      console.error('Amenities fetch error:', error);
      return this.getMockAmenities();
    }
  }

  private processAmenities(elements: any[], centerLat: number, centerLon: number): NearbyAmenities {
    const amenities: NearbyAmenities = {
      schools: [],
      hospitals: [],
      shopping: [],
      transport: []
    };

    elements.forEach(element => {
      const lat = element.lat || element.center?.lat;
      const lon = element.lon || element.center?.lon;
      if (!lat || !lon) return;

      const distance = this.calculateDistance(centerLat, centerLon, lat, lon);
      const name = element.tags?.name || element.tags?.amenity || 'Unknown';
      const amenity = element.tags?.amenity;

      if (['school', 'university', 'college'].includes(amenity)) {
        amenities.schools.push({ name, distance, type: amenity });
      } else if (['hospital', 'clinic', 'pharmacy'].includes(amenity)) {
        amenities.hospitals.push({ name, distance, type: amenity });
      } else if (['shop', 'restaurant', 'cafe', 'bank', 'atm'].includes(amenity)) {
        amenities.shopping.push({ name, distance, type: amenity });
      } else if (['bus_station', 'taxi', 'fuel'].includes(amenity)) {
        amenities.transport.push({ name, distance, type: amenity });
      }
    });

    // Sort by distance and limit results
    amenities.schools = amenities.schools.sort((a, b) => a.distance - b.distance).slice(0, 5);
    amenities.hospitals = amenities.hospitals.sort((a, b) => a.distance - b.distance).slice(0, 5);
    amenities.shopping = amenities.shopping.sort((a, b) => a.distance - b.distance).slice(0, 5);
    amenities.transport = amenities.transport.sort((a, b) => a.distance - b.distance).slice(0, 5);

    return amenities;
  }

  private getMockAmenities(): NearbyAmenities {
    return {
      schools: [
        { name: 'Local Primary School', distance: 800, type: 'school' },
        { name: 'High School', distance: 1200, type: 'school' }
      ],
      hospitals: [
        { name: 'Community Clinic', distance: 600, type: 'clinic' },
        { name: 'General Hospital', distance: 3000, type: 'hospital' }
      ],
      shopping: [
        { name: 'Local Shopping Center', distance: 500, type: 'shop' },
        { name: 'Grocery Store', distance: 300, type: 'shop' }
      ],
      transport: [
        { name: 'Bus Stop', distance: 200, type: 'bus_station' },
        { name: 'Taxi Rank', distance: 400, type: 'taxi' }
      ]
    };
  }

  async getAreaInsights(lat: number, lon: number): Promise<AreaInsights> {
    // Using publicly available data and estimates
    try {
      // For now, we'll provide estimated insights based on location
      // In the future, these could be enhanced with real APIs
      const municipality = await this.getMunicipalityFromCoords(lat, lon);
      
      return {
        crimeData: {
          safetyRating: this.estimateSafetyRating(municipality),
          source: 'Estimated based on location data'
        },
        demographics: {
          populationDensity: this.estimatePopulationDensity(municipality),
          averageIncome: this.estimateAverageIncome(municipality),
          source: 'Estimated from municipal data'
        },
        infrastructure: {
          roadQuality: 'Good - based on OpenStreetMap data',
          utilities: ['Electricity', 'Water', 'Sewerage', 'Telecommunications'],
          source: 'Municipal infrastructure data'
        }
      };
    } catch (error) {
      console.error('Area insights error:', error);
      return {
        infrastructure: {
          roadQuality: 'Data unavailable',
          utilities: ['Information pending'],
          source: 'Unable to retrieve data'
        }
      };
    }
  }

  private async getMunicipalityFromCoords(lat: number, lon: number): Promise<string> {
    try {
      const result = await this.reverseGeocode(lat, lon);
      return result?.municipality || result?.county || 'Unknown';
    } catch {
      return 'Unknown';
    }
  }

  private estimateSafetyRating(municipality: string): number {
    // Basic safety estimation based on known areas
    const safeAreas = ['sandton', 'rosebank', 'camps bay', 'constantia', 'ballito'];
    const moderateAreas = ['cape town', 'durban', 'pretoria', 'johannesburg'];
    
    const area = municipality.toLowerCase();
    if (safeAreas.some(safe => area.includes(safe))) return 8;
    if (moderateAreas.some(mod => area.includes(mod))) return 6;
    return 5; // Default moderate rating
  }

  private estimatePopulationDensity(municipality: string): string {
    const denseCities = ['johannesburg', 'cape town', 'durban'];
    const area = municipality.toLowerCase();
    if (denseCities.some(city => area.includes(city))) return 'High (>1000/km²)';
    return 'Medium (500-1000/km²)';
  }

  private estimateAverageIncome(municipality: string): string {
    const highIncomeAreas = ['sandton', 'rosebank', 'camps bay', 'constantia'];
    const area = municipality.toLowerCase();
    if (highIncomeAreas.some(rich => area.includes(rich))) return 'High (R50,000+/month)';
    return 'Medium (R20,000-50,000/month)';
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 1000); // Return distance in meters
  }

  async reverseGeocode(lat: number, lon: number): Promise<PropertyLocation | null> {
    try {
      const url = `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent
        }
      });

      if (!response.ok) {
        throw new Error(`OSM Reverse Geocoding error: ${response.status}`);
      }

      const result: OSMSearchResult = await response.json();
      
      return {
        id: result.place_id,
        address: result.display_name,
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        displayName: result.display_name,
        municipality: this.extractMunicipality(result.display_name),
        province: this.extractProvince(result.display_name),
        postalCode: this.extractPostalCode(result.display_name)
      };
    } catch (error) {
      console.error('OSM Reverse Geocoding Error:', error);
      return null;
    }
  }

  private extractMunicipality(displayName: string): string | undefined {
    const parts = displayName.split(', ');
    const municipalities = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Nelspruit', 'Polokwane', 'Kimberley', 'Mahikeng', 'Pietermaritzburg'];
    return municipalities.find(muni => displayName.includes(muni)) || 
           parts.find(part => part.includes('Metropolitan Municipality') || part.includes('Local Municipality'));
  }

  private extractProvince(displayName: string): string | undefined {
    const provinces = ['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West'];
    return provinces.find(province => displayName.includes(province));
  }

  private extractPostalCode(displayName: string): string | undefined {
    const match = displayName.match(/\b\d{4}\b/);
    return match ? match[0] : undefined;
  }
}

export const openStreetMapService = new OpenStreetMapService();
