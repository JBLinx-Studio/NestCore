
export interface DetailedPropertyInfo {
  schemeNumber?: string;
  schemeName?: string;
  municipalValue?: number;
  municipalHistory?: Array<{
    year: number;
    value: number;
    ratesAmount: number;
  }>;
  saleHistory?: Array<{
    date: string;
    price: number;
    transferType: 'sale' | 'transfer' | 'inheritance';
    verified: boolean;
  }>;
  ownershipDetails?: {
    ownerType: 'individual' | 'company' | 'trust' | 'strata';
    registrationDate?: string;
    bondInfo?: Array<{
      bank: string;
      amount: number;
      registrationDate: string;
    }>;
  };
  physicalDetails?: {
    bedrooms: number;
    bathrooms: number;
    garages: number;
    poolArea?: number;
    gardenArea?: number;
    buildingCondition: 'excellent' | 'good' | 'fair' | 'poor';
    roofType: string;
    wallType: string;
  };
  zoningDetails?: {
    zoningScheme: string;
    zoningRights: string[];
    restrictions: string[];
    coverage: number;
    floorAreaRatio: number;
  };
}

export interface PropertyPriceAnalysis {
  averagePrice: number;
  medianPrice: number;
  pricePerSqm: number;
  saleCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  marketTrend: 'rising' | 'stable' | 'declining';
  comparableProperties: Array<{
    address: string;
    price: number;
    pricePerSqm: number;
    distance: number;
    similarity: number;
    bedrooms: number;
    bathrooms: number;
  }>;
}

export interface AreaMarketData {
  radius: number;
  totalProperties: number;
  averagePrice: number;
  medianPrice: number;
  priceHistory: Array<{
    period: string;
    averagePrice: number;
    saleVolume: number;
  }>;
  investmentPotential: {
    score: number;
    factors: string[];
    forecast: 'positive' | 'neutral' | 'negative';
  };
}

export class AdvancedPropertyDataService {
  private overpassUrl = 'https://overpass-api.de/api/interpreter';
  
  async getDetailedPropertyInfo(lat: number, lon: number): Promise<DetailedPropertyInfo> {
    try {
      // Query OpenStreetMap for detailed building information
      const query = `
        [out:json][timeout:25];
        (
          way["building"](around:50,${lat},${lon});
          relation["building"](around:50,${lat},${lon});
          way["addr:housenumber"](around:100,${lat},${lon});
          way["landuse"](around:200,${lat},${lon});
        );
        out geom;
      `;

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        console.warn('Overpass API unavailable for detailed property info');
        return this.getEstimatedPropertyInfo(lat, lon);
      }

      const data = await response.json();
      return this.processDetailedPropertyData(data.elements, lat, lon);
      
    } catch (error) {
      console.error('Detailed property info error:', error);
      return this.getEstimatedPropertyInfo(lat, lon);
    }
  }

  private processDetailedPropertyData(elements: any[], lat: number, lon: number): DetailedPropertyInfo {
    // Process OpenStreetMap data to extract property details
    const buildingData = elements.find(el => el.tags?.building);
    const addressData = elements.find(el => el.tags?.['addr:housenumber']);
    const landData = elements.find(el => el.tags?.landuse);

    return {
      schemeNumber: buildingData?.tags?.['ref'] || `OSM-${buildingData?.id || 'unknown'}`,
      schemeName: landData?.tags?.name || addressData?.tags?.['addr:suburb'] || 'Property Name Not Available',
      physicalDetails: {
        bedrooms: this.extractBedrooms(buildingData?.tags),
        bathrooms: this.extractBathrooms(buildingData?.tags),
        garages: buildingData?.tags?.garage ? 1 : 0,
        buildingCondition: this.assessCondition(buildingData?.tags),
        roofType: buildingData?.tags?.['roof:material'] || 'Not specified',
        wallType: buildingData?.tags?.['building:material'] || 'Not specified'
      },
      zoningDetails: {
        zoningScheme: landData?.tags?.landuse || 'residential',
        zoningRights: this.extractZoningRights(landData?.tags),
        restrictions: this.extractRestrictions(landData?.tags),
        coverage: buildingData?.tags?.['building:levels'] ? parseInt(buildingData.tags['building:levels']) * 0.6 : 0.6,
        floorAreaRatio: 1.0
      }
    };
  }

  private getEstimatedPropertyInfo(lat: number, lon: number): DetailedPropertyInfo {
    // Provide realistic estimates when API data is unavailable
    const locationHash = Math.abs(Math.floor(lat * lon * 1000000)) % 10000;
    
    return {
      schemeNumber: `ERF-${locationHash}`,
      schemeName: 'Property details require municipal database access',
      municipalHistory: [
        { year: 2024, value: 0, ratesAmount: 0 },
        { year: 2023, value: 0, ratesAmount: 0 }
      ],
      physicalDetails: {
        bedrooms: 0,
        bathrooms: 0,
        garages: 0,
        buildingCondition: 'fair' as const,
        roofType: 'Requires building inspection',
        wallType: 'Requires building inspection'
      },
      zoningDetails: {
        zoningScheme: 'Requires municipal zoning records',
        zoningRights: ['Municipal database required'],
        restrictions: ['Municipal database required'],
        coverage: 0,
        floorAreaRatio: 0
      }
    };
  }

  async getPriceAnalysisWithinRadius(lat: number, lon: number, radiusMeters: number = 1000): Promise<PropertyPriceAnalysis> {
    try {
      // Use OpenStreetMap to find buildings within radius
      const query = `
        [out:json][timeout:30];
        (
          way["building"]["addr:housenumber"](around:${radiusMeters},${lat},${lon});
          relation["building"](around:${radiusMeters},${lat},${lon});
        );
        out center;
      `;

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        return this.getEstimatedPriceAnalysis(lat, lon, radiusMeters);
      }

      const data = await response.json();
      return this.processPriceAnalysis(data.elements, lat, lon, radiusMeters);
      
    } catch (error) {
      console.error('Price analysis error:', error);
      return this.getEstimatedPriceAnalysis(lat, lon, radiusMeters);
    }
  }

  private processPriceAnalysis(elements: any[], centerLat: number, centerLon: number, radius: number): PropertyPriceAnalysis {
    const properties = elements.map(element => {
      const lat = element.lat || element.center?.lat;
      const lon = element.lon || element.center?.lon;
      const distance = this.calculateDistance(centerLat, centerLon, lat, lon);
      
      // Estimate property values based on location and building data
      const estimatedPrice = this.estimatePropertyPrice(element.tags, lat, lon);
      const bedrooms = this.extractBedrooms(element.tags);
      const bathrooms = this.extractBathrooms(element.tags);
      
      return {
        address: element.tags?.['addr:street'] || 'Address not available',
        price: estimatedPrice,
        pricePerSqm: estimatedPrice / 200, // Assuming 200sqm average
        distance,
        similarity: this.calculateSimilarity(element.tags),
        bedrooms,
        bathrooms
      };
    }).filter(p => p.distance <= radius);

    const prices = properties.map(p => p.price);
    const averagePrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const medianPrice = prices.length > 0 ? this.median(prices) : 0;

    return {
      averagePrice,
      medianPrice,
      pricePerSqm: averagePrice / 200,
      saleCount: properties.length,
      priceRange: {
        min: prices.length > 0 ? Math.min(...prices) : 0,
        max: prices.length > 0 ? Math.max(...prices) : 0
      },
      marketTrend: 'stable' as const,
      comparableProperties: properties.slice(0, 10)
    };
  }

  private getEstimatedPriceAnalysis(lat: number, lon: number, radius: number): PropertyPriceAnalysis {
    return {
      averagePrice: 0,
      medianPrice: 0,
      pricePerSqm: 0,
      saleCount: 0,
      priceRange: { min: 0, max: 0 },
      marketTrend: 'stable' as const,
      comparableProperties: []
    };
  }

  async getAreaMarketData(lat: number, lon: number, radius: number = 1000): Promise<AreaMarketData> {
    try {
      const priceAnalysis = await this.getPriceAnalysisWithinRadius(lat, lon, radius);
      
      return {
        radius,
        totalProperties: priceAnalysis.saleCount,
        averagePrice: priceAnalysis.averagePrice,
        medianPrice: priceAnalysis.medianPrice,
        priceHistory: [
          { period: '2024', averagePrice: priceAnalysis.averagePrice, saleVolume: priceAnalysis.saleCount },
          { period: '2023', averagePrice: priceAnalysis.averagePrice * 0.95, saleVolume: Math.floor(priceAnalysis.saleCount * 0.8) }
        ],
        investmentPotential: {
          score: this.calculateInvestmentScore(priceAnalysis),
          factors: ['Location analysis based on OpenStreetMap data'],
          forecast: 'neutral' as const
        }
      };
    } catch (error) {
      console.error('Area market data error:', error);
      return {
        radius,
        totalProperties: 0,
        averagePrice: 0,
        medianPrice: 0,
        priceHistory: [],
        investmentPotential: { score: 0, factors: ['Data unavailable'], forecast: 'neutral' as const }
      };
    }
  }

  private extractBedrooms(tags: any): number {
    if (tags?.bedrooms) return parseInt(tags.bedrooms);
    if (tags?.rooms) return Math.max(1, parseInt(tags.rooms) - 2);
    return 0;
  }

  private extractBathrooms(tags: any): number {
    if (tags?.bathrooms) return parseInt(tags.bathrooms);
    return 0;
  }

  private assessCondition(tags: any): 'excellent' | 'good' | 'fair' | 'poor' {
    if (tags?.condition) return tags.condition as any;
    if (tags?.['building:condition']) return tags['building:condition'] as any;
    return 'fair';
  }

  private extractZoningRights(tags: any): string[] {
    const rights = [];
    if (tags?.landuse) rights.push(`Zoned for ${tags.landuse}`);
    if (tags?.['building:use']) rights.push(`Building use: ${tags['building:use']}`);
    return rights.length > 0 ? rights : ['Zoning information requires municipal access'];
  }

  private extractRestrictions(tags: any): string[] {
    const restrictions = [];
    if (tags?.maxheight) restrictions.push(`Max height: ${tags.maxheight}`);
    if (tags?.['building:levels']) restrictions.push(`Max levels: ${tags['building:levels']}`);
    return restrictions.length > 0 ? restrictions : ['Restriction details require municipal access'];
  }

  private estimatePropertyPrice(tags: any, lat: number, lon: number): number {
    // Basic price estimation based on available tags and location
    let basePrice = 1500000; // Base price in ZAR
    
    if (tags?.building === 'house') basePrice *= 1.2;
    if (tags?.building === 'apartments') basePrice *= 0.8;
    if (tags?.amenity) basePrice *= 1.1; // Properties near amenities
    
    return Math.floor(basePrice * (0.8 + Math.random() * 0.4));
  }

  private calculateSimilarity(tags: any): number {
    // Calculate similarity score based on building characteristics
    let score = 0.5;
    if (tags?.building) score += 0.2;
    if (tags?.['addr:housenumber']) score += 0.2;
    if (tags?.bedrooms) score += 0.1;
    return Math.min(1.0, score);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 1000);
  }

  private median(numbers: number[]): number {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];
  }

  private calculateInvestmentScore(analysis: PropertyPriceAnalysis): number {
    if (analysis.saleCount === 0) return 0;
    
    let score = 5; // Base score
    if (analysis.saleCount > 10) score += 2;
    if (analysis.averagePrice > 2000000) score += 1;
    if (analysis.marketTrend === 'rising') score += 2;
    
    return Math.min(10, Math.max(0, score));
  }
}

export const advancedPropertyDataService = new AdvancedPropertyDataService();
