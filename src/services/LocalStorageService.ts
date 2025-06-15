interface StorageData {
  properties: any[];
  searches: PropertySearch[];
  userProfile: UserProfile | null;
  propertyAnalytics: PropertyAnalytics[];
  weatherCache: WeatherCache[];
}

interface PropertySearch {
  id: string;
  query: string;
  location: string;
  coordinates: { lat: number; lon: number };
  timestamp: string;
  results: any[];
  filters: {
    priceRange?: [number, number];
    propertyType?: string;
    bedrooms?: number;
    bathrooms?: number;
  };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    currency: string;
    units: string;
    defaultLocation: string;
  };
  createdAt: string;
  lastLogin: string;
}

interface PropertyAnalytics {
  propertyId: string;
  viewCount: number;
  lastViewed: string;
  bookmarked: boolean;
  notes: string[];
  priceHistory: Array<{ date: string; price: number; source: string }>;
}

interface WeatherCache {
  location: string;
  coordinates: { lat: number; lon: number };
  data: any;
  timestamp: string;
  expiresAt: string;
}

class LocalStorageService {
  private readonly STORAGE_KEY = 'nestcore-data';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Initialize storage with default structure
  init(): StorageData {
    const existing = this.getData();
    if (!existing) {
      const defaultData: StorageData = {
        properties: [],
        searches: [],
        userProfile: null,
        propertyAnalytics: [],
        weatherCache: []
      };
      this.saveData(defaultData);
      return defaultData;
    }
    return existing;
  }

  // Get all data
  getData(): StorageData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  // Save all data
  saveData(data: StorageData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Properties
  getProperties(): any[] {
    return this.getData()?.properties || [];
  }

  saveProperty(property: any): void {
    const data = this.getData() || this.init();
    const existingIndex = data.properties.findIndex(p => p.id === property.id);
    
    if (existingIndex >= 0) {
      data.properties[existingIndex] = { ...property, updatedAt: new Date().toISOString() };
    } else {
      data.properties.push({ ...property, id: Date.now().toString(), createdAt: new Date().toISOString() });
    }
    
    this.saveData(data);
  }

  deleteProperty(propertyId: string): void {
    const data = this.getData() || this.init();
    data.properties = data.properties.filter(p => p.id !== propertyId);
    this.saveData(data);
  }

  // Search history
  getSearchHistory(): PropertySearch[] {
    return this.getData()?.searches || [];
  }

  saveSearch(search: Omit<PropertySearch, 'id' | 'timestamp'>): void {
    const data = this.getData() || this.init();
    const newSearch: PropertySearch = {
      ...search,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    data.searches.unshift(newSearch);
    // Keep only last 100 searches
    data.searches = data.searches.slice(0, 100);
    this.saveData(data);
  }

  clearSearchHistory(): void {
    const data = this.getData() || this.init();
    data.searches = [];
    this.saveData(data);
  }

  // User profile
  getUserProfile(): UserProfile | null {
    return this.getData()?.userProfile || null;
  }

  saveUserProfile(profile: UserProfile): void {
    const data = this.getData() || this.init();
    data.userProfile = profile;
    this.saveData(data);
  }

  // Property analytics
  getPropertyAnalytics(propertyId: string): PropertyAnalytics | null {
    const data = this.getData();
    return data?.propertyAnalytics.find(a => a.propertyId === propertyId) || null;
  }

  updatePropertyAnalytics(propertyId: string, updates: Partial<PropertyAnalytics>): void {
    const data = this.getData() || this.init();
    const existingIndex = data.propertyAnalytics.findIndex(a => a.propertyId === propertyId);
    
    if (existingIndex >= 0) {
      data.propertyAnalytics[existingIndex] = { ...data.propertyAnalytics[existingIndex], ...updates };
    } else {
      data.propertyAnalytics.push({
        propertyId,
        viewCount: 1,
        lastViewed: new Date().toISOString(),
        bookmarked: false,
        notes: [],
        priceHistory: [],
        ...updates
      });
    }
    
    this.saveData(data);
  }

  incrementPropertyView(propertyId: string): void {
    const analytics = this.getPropertyAnalytics(propertyId);
    this.updatePropertyAnalytics(propertyId, {
      viewCount: (analytics?.viewCount || 0) + 1,
      lastViewed: new Date().toISOString()
    });
  }

  // Weather cache
  getCachedWeather(lat: number, lon: number): any | null {
    const data = this.getData();
    if (!data?.weatherCache) return null;
    
    const cached = data.weatherCache.find(cache => {
      const distance = Math.sqrt(
        Math.pow(cache.coordinates.lat - lat, 2) + 
        Math.pow(cache.coordinates.lon - lon, 2)
      );
      return distance < 0.01 && new Date(cache.expiresAt) > new Date(); // Within ~1km and not expired
    });
    
    return cached?.data || null;
  }

  cacheWeather(lat: number, lon: number, weatherData: any): void {
    const data = this.getData() || this.init();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.CACHE_DURATION);
    
    const newCache: WeatherCache = {
      location: `${lat.toFixed(4)},${lon.toFixed(4)}`,
      coordinates: { lat, lon },
      data: weatherData,
      timestamp: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };
    
    // Remove old cache for same location
    data.weatherCache = data.weatherCache.filter(cache => {
      const distance = Math.sqrt(
        Math.pow(cache.coordinates.lat - lat, 2) + 
        Math.pow(cache.coordinates.lon - lon, 2)
      );
      return distance >= 0.01;
    });
    
    data.weatherCache.push(newCache);
    
    // Keep only last 50 cache entries
    data.weatherCache = data.weatherCache.slice(-50);
    this.saveData(data);
  }

  // Export data for backup
  exportData(): string {
    const data = this.getData() || this.init();
    return JSON.stringify(data, null, 2);
  }

  // Import data from backup
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const localStorageService = new LocalStorageService();
export type { StorageData, PropertySearch, UserProfile, PropertyAnalytics, WeatherCache };
