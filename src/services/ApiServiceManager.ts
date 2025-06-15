
export interface ApiService {
  id: string;
  name: string;
  description: string;
  type: 'property' | 'mapping' | 'geocoding' | 'identity' | 'government';
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
        description: 'Free mapping and geocoding service',
        type: 'mapping',
        status: 'active',
        isFree: true,
        isConfigured: true,
        endpoint: 'https://nominatim.openstreetmap.org',
        dailyLimit: 1000
      },
      {
        id: 'property24',
        name: 'Property24 API',
        description: 'Property listings and data',
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
