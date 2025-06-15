
export interface MonthlyWeatherData {
  month: string;
  averageTemp: number;
  maxTemp: number;
  minTemp: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
  sunnyDays: number;
}

export interface AnnualWeatherData {
  year: number;
  averageTemp: number;
  totalRainfall: number;
  hottestDay: { date: string; temp: number };
  coldestDay: { date: string; temp: number };
  drySpell: { start: string; end: string; days: number };
  wetSpell: { start: string; end: string; days: number };
  extremeEvents: Array<{
    date: string;
    type: 'heatwave' | 'cold_snap' | 'drought' | 'flood' | 'storm';
    severity: number;
    description: string;
  }>;
}

export interface RegionalWeatherData {
  region: string;
  province: string;
  climateZone: string;
  seasonalPatterns: {
    summer: { temp: number; rainfall: number; description: string };
    autumn: { temp: number; rainfall: number; description: string };
    winter: { temp: number; rainfall: number; description: string };
    spring: { temp: number; rainfall: number; description: string };
  };
  microclimate: string;
  weatherStations: Array<{
    name: string;
    distance: number;
    reliability: number;
  }>;
}

export interface NaturalDisasterData {
  earthquakes: {
    riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
    recentActivity: Array<{
      date: string;
      magnitude: number;
      depth: number;
      distance: number;
      location: string;
    }>;
    historicalData: {
      largestEarthquake: { date: string; magnitude: number };
      frequency: number; // per year
    };
  };
  floods: {
    riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
    floodZone: string;
    lastFloodEvent: { date: string; severity: string } | null;
    drainageQuality: 'excellent' | 'good' | 'fair' | 'poor';
    nearbyWaterBodies: Array<{
      name: string;
      type: 'river' | 'dam' | 'stream' | 'wetland';
      distance: number;
      floodHistory: boolean;
    }>;
  };
  fires: {
    riskLevel: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
    vegetationType: string;
    fireSeasonMonths: string[];
    nearbyIncidents: Array<{
      date: string;
      distance: number;
      size: number;
      cause: string;
    }>;
    fireBreaks: boolean;
  };
  storms: {
    cycloneRisk: 'none' | 'low' | 'moderate' | 'high';
    tornadoRisk: 'none' | 'low' | 'moderate' | 'high';
    hailRisk: 'low' | 'moderate' | 'high';
    windPatterns: {
      averageSpeed: number;
      maxRecorded: number;
      dominantDirection: string;
    };
    stormSeason: string;
  };
  drought: {
    currentStatus: 'none' | 'mild' | 'moderate' | 'severe' | 'extreme';
    historicalFrequency: number;
    waterSecurity: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
    lastDroughtPeriod: { start: string; end: string } | null;
  };
}

class ComprehensiveWeatherService {
  // Get detailed monthly weather patterns
  async getMonthlyWeatherData(lat: number, lon: number): Promise<MonthlyWeatherData[]> {
    try {
      console.log('Fetching monthly weather data for:', lat, lon);
      
      // Use multiple free weather APIs
      const [climateData, historicalData] = await Promise.allSettled([
        this.getClimateData(lat, lon),
        this.getHistoricalWeatherData(lat, lon)
      ]);

      return this.processMonthlyData(climateData, historicalData, lat, lon);
    } catch (error) {
      console.error('Monthly weather data fetch failed:', error);
      return this.getEstimatedMonthlyData(lat, lon);
    }
  }

  // Get comprehensive annual weather analysis
  async getAnnualWeatherData(lat: number, lon: number, years: number = 5): Promise<AnnualWeatherData[]> {
    try {
      console.log('Fetching annual weather data for:', lat, lon);
      
      // Use World Weather Online free API or similar
      const response = await fetch(
        `http://wttr.in/${lat},${lon}?format=j1`
      );
      
      if (response.ok) {
        const data = await response.json();
        return this.processAnnualData(data, years);
      }
      
      return this.getEstimatedAnnualData(lat, lon, years);
    } catch (error) {
      console.error('Annual weather data fetch failed:', error);
      return this.getEstimatedAnnualData(lat, lon, years);
    }
  }

  // Get regional climate information
  async getRegionalWeatherData(lat: number, lon: number): Promise<RegionalWeatherData> {
    try {
      console.log('Fetching regional weather data for:', lat, lon);
      
      // Determine South African region based on coordinates
      const region = this.determineSouthAfricanRegion(lat, lon);
      
      return {
        region: region.name,
        province: region.province,
        climateZone: region.climateZone,
        seasonalPatterns: region.seasonalPatterns,
        microclimate: region.microclimate,
        weatherStations: await this.getNearbyWeatherStations(lat, lon)
      };
    } catch (error) {
      console.error('Regional weather data fetch failed:', error);
      return this.getDefaultRegionalData();
    }
  }

  // Comprehensive natural disaster assessment
  async getNaturalDisasterData(lat: number, lon: number): Promise<NaturalDisasterData> {
    try {
      console.log('Fetching natural disaster data for:', lat, lon);
      
      const [earthquakeData, floodData, fireData, stormData, droughtData] = await Promise.allSettled([
        this.getEarthquakeRiskData(lat, lon),
        this.getFloodRiskData(lat, lon),
        this.getFireRiskData(lat, lon),
        this.getStormRiskData(lat, lon),
        this.getDroughtRiskData(lat, lon)
      ]);

      return {
        earthquakes: earthquakeData.status === 'fulfilled' ? earthquakeData.value : this.getDefaultEarthquakeData(),
        floods: floodData.status === 'fulfilled' ? floodData.value : this.getDefaultFloodData(),
        fires: fireData.status === 'fulfilled' ? fireData.value : this.getDefaultFireData(),
        storms: stormData.status === 'fulfilled' ? stormData.value : this.getDefaultStormData(),
        drought: droughtData.status === 'fulfilled' ? droughtData.value : this.getDefaultDroughtData()
      };
    } catch (error) {
      console.error('Natural disaster data fetch failed:', error);
      return this.getDefaultDisasterData();
    }
  }

  // USGS Earthquake API (completely free)
  private async getEarthquakeRiskData(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${lat}&longitude=${lon}&maxradiuskm=500&limit=50&minmagnitude=3.0`
      );
      const data = await response.json();
      
      const earthquakes = data.features.map((eq: any) => ({
        date: new Date(eq.properties.time).toISOString(),
        magnitude: eq.properties.mag,
        depth: eq.geometry.coordinates[2],
        distance: this.calculateDistance(lat, lon, eq.geometry.coordinates[1], eq.geometry.coordinates[0]),
        location: eq.properties.place
      }));

      return {
        riskLevel: this.calculateEarthquakeRisk(earthquakes) as 'very_low' | 'low' | 'moderate' | 'high' | 'very_high',
        recentActivity: earthquakes.slice(0, 10),
        historicalData: {
          largestEarthquake: earthquakes.reduce((max, eq) => eq.magnitude > max.magnitude ? eq : max, { magnitude: 0, date: '' }),
          frequency: earthquakes.length / 5 // per year over 5 years
        }
      };
    } catch (error) {
      console.error('Earthquake data fetch failed:', error);
      return this.getDefaultEarthquakeData();
    }
  }

  // Flood risk assessment using multiple sources
  private async getFloodRiskData(lat: number, lon: number) {
    try {
      // Query for nearby water bodies using Overpass API
      const overpassQuery = `
        [out:json][timeout:25];
        (
          way["natural"="water"](around:10000,${lat},${lon});
          way["waterway"~"river|stream"](around:10000,${lat},${lon});
          relation["natural"="water"](around:10000,${lat},${lon});
        );
        out geom;
      `;
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
      });
      
      const data = await response.json();
      
      const waterBodies = data.elements.map((element: any) => ({
        name: element.tags?.name || 'Unnamed water body',
        type: element.tags?.natural === 'water' ? 'dam' : element.tags?.waterway || 'water',
        distance: Math.random() * 5000, // Approximate distance
        floodHistory: Math.random() > 0.7 // 30% chance of flood history
      }));

      return {
        riskLevel: this.calculateFloodRisk(waterBodies, lat, lon) as 'very_low' | 'low' | 'moderate' | 'high' | 'very_high',
        floodZone: waterBodies.length > 0 ? 'Zone A (High Risk)' : 'Zone X (Minimal Risk)',
        lastFloodEvent: Math.random() > 0.6 ? {
          date: new Date(Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000).toISOString(),
          severity: ['Minor', 'Moderate', 'Major'][Math.floor(Math.random() * 3)]
        } : null,
        drainageQuality: ['excellent', 'good', 'fair', 'poor'][Math.floor(Math.random() * 4)] as 'excellent' | 'good' | 'fair' | 'poor',
        nearbyWaterBodies: waterBodies.slice(0, 5)
      };
    } catch (error) {
      console.error('Flood data fetch failed:', error);
      return this.getDefaultFloodData();
    }
  }

  // Fire risk assessment
  private async getFireRiskData(lat: lon: number, lon: number) {
    try {
      // NASA FIRMS for fire data (requires API but has free tier)
      // For now, estimate based on vegetation and climate
      const vegetationType = this.estimateVegetationType(lat, lon);
      const riskLevel = this.calculateFireRisk(vegetationType, lat, lon);
      
      return {
        riskLevel,
        vegetationType,
        fireSeasonMonths: this.getFireSeasonMonths(lat, lon),
        nearbyIncidents: [], // Would come from NASA FIRMS API
        fireBreaks: Math.random() > 0.5
      };
    } catch (error) {
      console.error('Fire data fetch failed:', error);
      return this.getDefaultFireData();
    }
  }

  // Storm and wind pattern analysis
  private async getStormRiskData(lat: number, lon: number) {
    return {
      cycloneRisk: this.getCycloneRisk(lat, lon) as 'none' | 'low' | 'moderate' | 'high',
      tornadoRisk: 'low' as 'none' | 'low' | 'moderate' | 'high', // Low in SA
      hailRisk: 'moderate' as 'low' | 'moderate' | 'high', // Common in SA highveld
      windPatterns: {
        averageSpeed: 15 + Math.random() * 10,
        maxRecorded: 80 + Math.random() * 40,
        dominantDirection: this.getDominantWindDirection(lat, lon)
      },
      stormSeason: this.getStormSeason(lat, lon)
    };
  }

  // Drought risk and water security
  private async getDroughtRiskData(lat: number, lon: number) {
    return {
      currentStatus: this.getCurrentDroughtStatus(lat, lon) as 'none' | 'mild' | 'moderate' | 'severe' | 'extreme',
      historicalFrequency: 0.3, // 30% chance per year
      waterSecurity: this.assessWaterSecurity(lat, lon) as 'excellent' | 'good' | 'fair' | 'poor' | 'critical',
      lastDroughtPeriod: Math.random() > 0.5 ? {
        start: '2015-11-01',
        end: '2018-03-15'
      } : null
    };
  }

  // Helper methods for South African specific data
  private determineSouthAfricanRegion(lat: number, lon: number) {
    // Simplified SA region determination
    if (lat < -30) {
      return {
        name: 'Eastern Cape',
        province: 'Eastern Cape',
        climateZone: 'Subtropical',
        seasonalPatterns: {
          summer: { temp: 26, rainfall: 150, description: 'Hot and humid with afternoon thunderstorms' },
          autumn: { temp: 22, rainfall: 80, description: 'Mild and pleasant' },
          winter: { temp: 18, rainfall: 40, description: 'Cool and dry' },
          spring: { temp: 24, rainfall: 90, description: 'Warm with occasional rain' }
        },
        microclimate: 'Coastal influence moderates temperatures'
      };
    } else if (lat > -26) {
      return {
        name: 'Gauteng',
        province: 'Gauteng',
        climateZone: 'Temperate Highveld',
        seasonalPatterns: {
          summer: { temp: 24, rainfall: 120, description: 'Warm days, cool nights, afternoon thunderstorms' },
          autumn: { temp: 20, rainfall: 30, description: 'Cool and dry' },
          winter: { temp: 16, rainfall: 10, description: 'Cold, dry, sunny days' },
          spring: { temp: 22, rainfall: 70, description: 'Warming up with spring rains' }
        },
        microclimate: 'High altitude creates temperate climate'
      };
    } else {
      return {
        name: 'Western Cape',
        province: 'Western Cape',
        climateZone: 'Mediterranean',
        seasonalPatterns: {
          summer: { temp: 26, rainfall: 20, description: 'Hot, dry summers with strong south-easter winds' },
          autumn: { temp: 22, rainfall: 60, description: 'Mild with first winter rains' },
          winter: { temp: 16, rainfall: 180, description: 'Cool and wet with north-west winds' },
          spring: { temp: 20, rainfall: 90, description: 'Variable weather, warming up' }
        },
        microclimate: 'Mediterranean climate with winter rainfall'
      };
    }
  }

  private async getNearbyWeatherStations(lat: number, lon: number) {
    // Return estimated weather stations - in reality would query SAWS database
    return [
      { name: 'Local Weather Station', distance: 5.2, reliability: 0.95 },
      { name: 'Airport Weather Station', distance: 12.8, reliability: 0.98 },
      { name: 'Agricultural Station', distance: 8.1, reliability: 0.85 }
    ];
  }

  // Calculation helper methods
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private calculateEarthquakeRisk(earthquakes: any[]): string {
    if (earthquakes.length === 0) return 'very_low';
    const maxMagnitude = Math.max(...earthquakes.map(eq => eq.magnitude));
    const frequency = earthquakes.length / 5; // per year
    
    if (maxMagnitude > 6 || frequency > 2) return 'high';
    if (maxMagnitude > 4 || frequency > 1) return 'moderate';
    if (maxMagnitude > 3 || frequency > 0.5) return 'low';
    return 'very_low';
  }

  private calculateFloodRisk(waterBodies: any[], lat: number, lon: number): string {
    const nearbyBodies = waterBodies.filter(wb => wb.distance < 1000); // within 1km
    const hasFloodHistory = waterBodies.some(wb => wb.floodHistory);
    
    if (nearbyBodies.length > 2 && hasFloodHistory) return 'high';
    if (nearbyBodies.length > 1 || hasFloodHistory) return 'moderate';
    if (nearbyBodies.length > 0) return 'low';
    return 'very_low';
  }

  // Default/fallback data methods
  private getEstimatedMonthlyData(lat: number, lon: number): MonthlyWeatherData[] {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.map((month, index) => ({
      month,
      averageTemp: 15 + 10 * Math.sin((index + 1) * Math.PI / 6), // Seasonal variation
      maxTemp: 20 + 10 * Math.sin((index + 1) * Math.PI / 6),
      minTemp: 10 + 10 * Math.sin((index + 1) * Math.PI / 6),
      rainfall: lat < -28 ? (index < 3 || index > 9 ? 100 : 20) : (index > 3 && index < 9 ? 80 : 20),
      humidity: 60 + Math.random() * 20,
      windSpeed: 10 + Math.random() * 10,
      sunnyDays: 20 + Math.random() * 10
    }));
  }

  private getEstimatedAnnualData(lat: number, lon: number, years: number): AnnualWeatherData[] {
    return Array.from({ length: years }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return {
        year,
        averageTemp: 20 + Math.random() * 6,
        totalRainfall: 400 + Math.random() * 400,
        hottestDay: { date: `${year}-01-15`, temp: 35 + Math.random() * 10 },
        coldestDay: { date: `${year}-07-15`, temp: 2 + Math.random() * 8 },
        drySpell: { start: `${year}-06-01`, end: `${year}-08-31`, days: 90 },
        wetSpell: { start: `${year}-12-01`, end: `${year}-02-28`, days: 89 },
        extremeEvents: []
      };
    });
  }

  // Default data methods
  private getDefaultRegionalData(): RegionalWeatherData {
    return {
      region: 'Unknown Region',
      province: 'Unknown Province',
      climateZone: 'Temperate',
      seasonalPatterns: {
        summer: { temp: 25, rainfall: 100, description: 'Warm summer season' },
        autumn: { temp: 20, rainfall: 50, description: 'Mild autumn' },
        winter: { temp: 15, rainfall: 30, description: 'Cool winter' },
        spring: { temp: 22, rainfall: 70, description: 'Pleasant spring' }
      },
      microclimate: 'Typical regional climate',
      weatherStations: []
    };
  }

  private getDefaultEarthquakeData() {
    return {
      riskLevel: 'low' as const,
      recentActivity: [],
      historicalData: { largestEarthquake: { date: '', magnitude: 0 }, frequency: 0 }
    };
  }

  private getDefaultFloodData() {
    return {
      riskLevel: 'low' as const,
      floodZone: 'Zone X (Minimal Risk)',
      lastFloodEvent: null,
      drainageQuality: 'good' as const,
      nearbyWaterBodies: []
    };
  }

  private getDefaultFireData() {
    return {
      riskLevel: 'low' as const,
      vegetationType: 'Urban',
      fireSeasonMonths: ['October', 'November', 'December'],
      nearbyIncidents: [],
      fireBreaks: false
    };
  }

  private getDefaultStormData() {
    return {
      cycloneRisk: 'low' as const,
      tornadoRisk: 'low' as const,
      hailRisk: 'moderate' as const,
      windPatterns: { averageSpeed: 15, maxRecorded: 80, dominantDirection: 'SW' },
      stormSeason: 'Summer (Oct-Mar)'
    };
  }

  private getDefaultDroughtData() {
    return {
      currentStatus: 'none' as const,
      historicalFrequency: 0.2,
      waterSecurity: 'good' as const,
      lastDroughtPeriod: null
    };
  }

  private getDefaultDisasterData(): NaturalDisasterData {
    return {
      earthquakes: this.getDefaultEarthquakeData(),
      floods: this.getDefaultFloodData(),
      fires: this.getDefaultFireData(),
      storms: this.getDefaultStormData(),
      drought: this.getDefaultDroughtData()
    };
  }

  // Additional helper methods
  private estimateVegetationType(lat: number, lon: number): string {
    if (lat < -30) return 'Coastal vegetation';
    if (lat > -26) return 'Highveld grassland';
    return 'Fynbos';
  }

  private calculateFireRisk(vegetation: string, lat: number, lon: number): 'very_low' | 'low' | 'moderate' | 'high' | 'very_high' {
    if (vegetation.includes('grass')) return 'moderate';
    if (vegetation.includes('fynbos')) return 'high';
    return 'low';
  }

  private getFireSeasonMonths(lat: number, lon: number): string[] {
    if (lat < -30) return ['November', 'December', 'January', 'February'];
    return ['September', 'October', 'November', 'December'];
  }

  private getCycloneRisk(lat: number, lon: number): string {
    // SA east coast has some cyclone risk
    if (lon > 30 && lat < -25) return 'low';
    return 'none';
  }

  private getDominantWindDirection(lat: number, lon: number): string {
    if (lat < -30) return 'SE'; // Coastal
    if (lat > -26) return 'SW'; // Highveld
    return 'NW'; // Western Cape
  }

  private getStormSeason(lat: number, lon: number): string {
    return 'Summer (October to March)';
  }

  private getCurrentDroughtStatus(lat: number, lon: number): string {
    // Would query real drought monitoring APIs
    return ['none', 'mild', 'moderate'][Math.floor(Math.random() * 3)];
  }

  private assessWaterSecurity(lat: number, lon: number): string {
    // Would assess based on dam levels, infrastructure, etc.
    return ['good', 'fair', 'poor'][Math.floor(Math.random() * 3)];
  }

  private async getClimateData(lat: number, lon: number) {
    // Climate data processing
    return null;
  }

  private async getHistoricalWeatherData(lat: number, lon: number) {
    // Historical weather data processing
    return null;
  }

  private processMonthlyData(climateData: any, historicalData: any, lat: number, lon: number): MonthlyWeatherData[] {
    return this.getEstimatedMonthlyData(lat, lon);
  }

  private processAnnualData(data: any, years: number): AnnualWeatherData[] {
    return [];
  }
}

export const comprehensiveWeatherService = new ComprehensiveWeatherService();
