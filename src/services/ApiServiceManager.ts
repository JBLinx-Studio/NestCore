
export interface ApiService {
  id: string;
  name: string;
  description: string;
  type: 'property' | 'mapping' | 'geocoding' | 'identity' | 'government' | 'weather' | 'economic' | 'crime' | 'education';
  status: 'active' | 'inactive' | 'error' | 'limited';
  isFree: boolean;
  isConfigured: boolean;
  lastChecked?: Date;
  errorMessage?: string;
  responseTime?: number;
  dailyUsage?: number;
  dailyLimit?: number;
  endpoint?: string;
}

export class ApiServiceManager {
  private services: Map<string, ApiService> = new Map();

  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    const defaultServices: ApiService[] = [
      {
        id: 'openstreetmap',
        name: 'OpenStreetMap',
        description: 'Free mapping, geocoding, and amenities data',
        type: 'mapping',
        status: 'active',
        isFree: true,
        isConfigured: true,
        endpoint: 'https://nominatim.openstreetmap.org',
        dailyLimit: 1000
      },
      {
        id: 'overpass',
        name: 'Overpass API',
        description: 'OpenStreetMap data extraction for amenities',
        type: 'mapping',
        status: 'active',
        isFree: true,
        isConfigured: true,
        endpoint: 'https://overpass-api.de/api/interpreter',
        dailyLimit: 10000
      },
      {
        id: 'free_weather',
        name: 'Weather Service',
        description: 'Local weather data and climate information',
        type: 'weather',
        status: 'active',
        isFree: true,
        isConfigured: true,
        endpoint: 'Free weather data',
        dailyLimit: 1000
      },
      {
        id: 'stats_sa',
        name: 'Stats SA Economic Data',
        description: 'South African economic indicators and demographics',
        type: 'economic',
        status: 'active',
        isFree: true,
        isConfigured: true,
        endpoint: 'Public economic data',
        dailyLimit: 100
      },
      {
        id: 'saps_crime',
        name: 'SAPS Crime Statistics',
        description: 'South African Police Service crime data',
        type: 'crime',
        status: 'limited',
        isFree: true,
        isConfigured: true,
        endpoint: 'Public crime statistics',
        dailyLimit: 50
      },
      {
        id: 'school_ratings',
        name: 'School Information Service',
        description: 'School ratings and educational facility data',
        type: 'education',
        status: 'active',
        isFree: true,
        isConfigured: true,
        endpoint: 'Educational data aggregation',
        dailyLimit: 200
      },
      {
        id: 'property24',
        name: 'Property24 API',
        description: 'Property listings and market data',
        type: 'property',
        status: 'inactive',
        isFree: false,
        isConfigured: false,
        endpoint: 'https://api.property24.com'
      },
      {
        id: 'lightstone',
        name: 'Lightstone Property',
        description: 'Property valuations and ownership data',
        type: 'property',
        status: 'inactive',
        isFree: false,
        isConfigured: false,
        endpoint: 'https://api.lightstone.co.za'
      },
      {
        id: 'deeds_office',
        name: 'SA Deeds Office',
        description: 'Official property ownership records',
        type: 'government',
        status: 'limited',
        isFree: true,
        isConfigured: false,
        endpoint: 'https://eservices.deedsoffice.gov.za'
      },
      {
        id: 'home_affairs',
        name: 'Home Affairs API',
        description: 'Identity verification and citizen data',
        type: 'identity',
        status: 'inactive',
        isFree: false,
        isConfigured: false,
        endpoint: 'https://api.dha.gov.za'
      },
      {
        id: 'cipc',
        name: 'CIPC API',
        description: 'Company and business registration data',
        type: 'identity',
        status: 'inactive',
        isFree: false,
        isConfigured: false,
        endpoint: 'https://api.cipc.co.za'
      },
      {
        id: 'google_maps',
        name: 'Google Maps API',
        description: 'Maps, geocoding, and street view',
        type: 'mapping',
        status: 'inactive',
        isFree: false,
        isConfigured: false,
        endpoint: 'https://maps.googleapis.com'
      },
      {
        id: 'mapbox',
        name: 'Mapbox API',
        description: 'Customizable maps and geocoding',
        type: 'mapping',
        status: 'inactive',
        isFree: false,
        isConfigured: false,
        endpoint: 'https://api.mapbox.com'
      }
    ];

    defaultServices.forEach(service => {
      this.services.set(service.id, service);
    });
  }

  public getServices(): ApiService[] {
    return Array.from(this.services.values());
  }

  public getService(id: string): ApiService | undefined {
    return this.services.get(id);
  }

  public async checkServiceHealth(serviceId: string): Promise<ApiService> {
    const service = this.services.get(serviceId);
    if (!service) throw new Error(`Service ${serviceId} not found`);

    const startTime = Date.now();
    
    try {
      let isHealthy = false;
      
      switch (serviceId) {
        case 'openstreetmap':
          isHealthy = await this.checkOpenStreetMapHealth();
          break;
        case 'overpass':
          isHealthy = await this.checkOverpassHealth();
          break;
        case 'free_weather':
        case 'stats_sa':
        case 'saps_crime':
        case 'school_ratings':
          isHealthy = true; // These are always available as they use mock/processed data
          break;
        case 'deeds_office':
          isHealthy = await this.checkDeedsOfficeHealth();
          break;
        default:
          // For APIs that require keys, just check if configured
          isHealthy = service.isConfigured;
      }

      const responseTime = Date.now() - startTime;
      
      const updatedService: ApiService = {
        ...service,
        status: isHealthy ? 'active' : 'error',
        lastChecked: new Date(),
        responseTime,
        errorMessage: isHealthy ? undefined : 'Service unavailable'
      };

      this.services.set(serviceId, updatedService);
      return updatedService;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const updatedService: ApiService = {
        ...service,
        status: 'error',
        lastChecked: new Date(),
        responseTime,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      };

      this.services.set(serviceId, updatedService);
      return updatedService;
    }
  }

  private async checkOpenStreetMapHealth(): Promise<boolean> {
    try {
      const response = await fetch('https://nominatim.openstreetmap.org/search?q=Cape%20Town&format=json&limit=1');
      return response.ok;
    } catch {
      return false;
    }
  }

  private async checkOverpassHealth(): Promise<boolean> {
    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=[out:json][timeout:5];(node["amenity"="school"](around:1000,-33.9249,18.4241););out;'
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async checkDeedsOfficeHealth(): Promise<boolean> {
    // Mock check - in reality would need proper endpoint
    return Math.random() > 0.3; // Simulate 70% uptime
  }

  public async checkAllServices(): Promise<ApiService[]> {
    const promises = Array.from(this.services.keys()).map(id => 
      this.checkServiceHealth(id)
    );
    
    return Promise.all(promises);
  }
}

export const apiServiceManager = new ApiServiceManager();
