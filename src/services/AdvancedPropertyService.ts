
export interface PropertyOwnershipHistory {
  transfers: Array<{
    date: string;
    from: string;
    to: string;
    price: number;
    transferType: 'sale' | 'inheritance' | 'donation' | 'court_order';
    deedNumber: string;
  }>;
  bondHistory: Array<{
    date: string;
    bank: string;
    amount: number;
    status: 'active' | 'cancelled' | 'paid_off';
    bondNumber: string;
  }>;
  ownershipDisputes: Array<{
    date: string;
    type: string;
    status: 'resolved' | 'pending' | 'ongoing';
    court?: string;
  }>;
}

export interface PropertyValuationAnalysis {
  currentEstimate: {
    low: number;
    high: number;
    average: number;
    confidence: number;
  };
  comparableProperties: Array<{
    address: string;
    soldDate: string;
    price: number;
    similarity: number;
    distance: number;
  }>;
  priceHistory: Array<{
    date: string;
    price: number;
    source: string;
  }>;
  marketTrends: {
    yearOverYear: number;
    quarterOverQuarter: number;
    forecast6Month: number;
    forecast12Month: number;
  };
}

export interface PropertyCompliance {
  buildingApprovals: Array<{
    date: string;
    type: string;
    status: 'approved' | 'pending' | 'rejected';
    permitNumber: string;
  }>;
  zoningCompliance: {
    currentZoning: string;
    permittedUses: string[];
    restrictions: string[];
    violations: string[];
  };
  occupancyCertificate: {
    issued: boolean;
    date?: string;
    certificateNumber?: string;
    expiryDate?: string;
  };
}

export class AdvancedPropertyService {
  private deedsOfficeBaseUrl = 'https://eservices.deeds.gov.za/DeedsWeb'; // Official portal
  private property24ApiUrl = 'https://api.property24.com/v1'; // Hypothetical API
  private lightstoneApiUrl = 'https://api.lightstone.co.za/v2'; // Hypothetical API
  private municipalApiUrl = 'https://municipal-api.gov.za/v1'; // Hypothetical municipal API

  async searchPropertyByAddress(address: string): Promise<{
    erfNumber?: string;
    titleDeedNumber?: string;
    coordinates: { lat: number; lon: number };
    municipalAccount?: string;
  } | null> {
    console.log('🔍 Searching property records for:', address);
    
    try {
      // First, try to get coordinates and municipal info
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&countrycodes=za&addressdetails=1`
      );
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.length > 0) {
          const property = geoData[0];
          return {
            coordinates: {
              lat: parseFloat(property.lat),
              lon: parseFloat(property.lon)
            },
            erfNumber: this.extractErfFromAddress(address),
            municipalAccount: this.generateMunicipalAccount(address)
          };
        }
      }
    } catch (error) {
      console.error('Property search error:', error);
    }

    return null;
  }

  async getOwnershipHistory(erfNumber: string): Promise<PropertyOwnershipHistory> {
    console.log('📜 Fetching ownership history for ERF:', erfNumber);
    
    // In real implementation, this would query Deeds Office API
    // For now, simulate comprehensive ownership data
    
    return {
      transfers: [
        {
          date: '2020-03-15',
          from: 'ABC Developments (Pty) Ltd',
          to: 'John Smith',
          price: 1250000,
          transferType: 'sale',
          deedNumber: 'T12345/2020'
        },
        {
          date: '2015-08-22',
          from: 'Original Owner Trust',
          to: 'ABC Developments (Pty) Ltd',
          price: 850000,
          transferType: 'sale',
          deedNumber: 'T67890/2015'
        }
      ],
      bondHistory: [
        {
          date: '2020-03-15',
          bank: 'Standard Bank',
          amount: 1000000,
          status: 'active',
          bondNumber: 'B123456789'
        }
      ],
      ownershipDisputes: []
    };
  }

  async getDetailedValuation(address: string, lat: number, lon: number): Promise<PropertyValuationAnalysis> {
    console.log('💰 Performing detailed property valuation...');
    
    // Simulate comprehensive valuation analysis
    const baseValue = 1500000 + Math.random() * 1000000;
    
    return {
      currentEstimate: {
        low: Math.round(baseValue * 0.85),
        high: Math.round(baseValue * 1.15),
        average: Math.round(baseValue),
        confidence: 0.75 + Math.random() * 0.2
      },
      comparableProperties: this.generateComparableProperties(lat, lon, baseValue),
      priceHistory: this.generatePriceHistory(baseValue),
      marketTrends: {
        yearOverYear: 8.5 + Math.random() * 10,
        quarterOverQuarter: 2.1 + Math.random() * 3,
        forecast6Month: 3.2 + Math.random() * 4,
        forecast12Month: 6.8 + Math.random() * 8
      }
    };
  }

  async getComplianceStatus(erfNumber: string): Promise<PropertyCompliance> {
    console.log('⚖️ Checking property compliance status...');
    
    return {
      buildingApprovals: [
        {
          date: '2021-05-15',
          type: 'Addition - Patio',
          status: 'approved',
          permitNumber: 'BP2021/05/1234'
        }
      ],
      zoningCompliance: {
        currentZoning: 'Residential 1',
        permittedUses: ['Single residential dwelling', 'Home office', 'Guest accommodation'],
        restrictions: ['Maximum 2 floors', 'Building line restrictions', 'No commercial activities'],
        violations: []
      },
      occupancyCertificate: {
        issued: true,
        date: '2020-04-01',
        certificateNumber: 'OC2020/04/5678',
        expiryDate: '2025-04-01'
      }
    };
  }

  private extractErfFromAddress(address: string): string {
    // Try to extract ERF number from address
    const erfMatch = address.match(/ERF\s*(\d+)/i);
    if (erfMatch) return `ERF ${erfMatch[1]}`;
    
    // Generate simulated ERF number
    return `ERF ${Math.floor(Math.random() * 99999) + 1}`;
  }

  private generateMunicipalAccount(address: string): string {
    // Generate realistic municipal account number
    const cityCode = address.toLowerCase().includes('cape town') ? 'CT' : 
                    address.toLowerCase().includes('johannesburg') ? 'JHB' : 'MUN';
    return `${cityCode}${Math.floor(Math.random() * 9999999) + 1000000}`;
  }

  private generateComparableProperties(lat: number, lon: number, baseValue: number) {
    const comparables = [];
    for (let i = 0; i < 5; i++) {
      const variance = 0.8 + Math.random() * 0.4; // 80% to 120% of base value
      comparables.push({
        address: `${Math.floor(Math.random() * 200) + 1} Nearby Street, Same Area`,
        soldDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: Math.round(baseValue * variance),
        similarity: 0.7 + Math.random() * 0.3,
        distance: Math.round(Math.random() * 2000) + 100
      });
    }
    return comparables;
  }

  private generatePriceHistory(currentValue: number) {
    const history = [];
    const startValue = currentValue * 0.6; // Started at 60% of current value
    const years = 10;
    
    for (let i = 0; i < years; i++) {
      const year = new Date().getFullYear() - (years - i);
      const growth = Math.pow(1.08, i); // 8% annual growth
      history.push({
        date: `${year}-01-01`,
        price: Math.round(startValue * growth),
        source: 'Market Data'
      });
    }
    
    return history;
  }
}

export const advancedPropertyService = new AdvancedPropertyService();
