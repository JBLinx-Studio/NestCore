
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
}

export class OpenStreetMapService {
  private baseUrl = 'https://nominatim.openstreetmap.org';
  private userAgent = 'NestCore Property Manager';

  async searchProperties(query: string, limit: number = 10): Promise<PropertyLocation[]> {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `${this.baseUrl}/search?q=${encodedQuery}&format=json&limit=${limit}&countrycodes=za&addressdetails=1`;
      
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
        postalCode: this.extractPostalCode(result.display_name)
      }));
    } catch (error) {
      console.error('OSM Search Error:', error);
      throw error;
    }
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
    // Look for common SA municipality patterns
    const municipalities = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'];
    return municipalities.find(muni => displayName.includes(muni));
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
