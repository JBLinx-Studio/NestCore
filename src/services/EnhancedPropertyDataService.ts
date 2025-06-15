
import { PropertyLocation } from './OpenStreetMapService';

export interface EnhancedPropertyOwnership {
  primaryOwner: {
    name: string;
    idNumber: string;
    contactNumber?: string;
    email?: string;
    address?: string;
    ownershipType: 'individual' | 'company' | 'trust' | 'joint';
    ownershipPercentage: number;
    registrationDate: string;
    verified: boolean;
  };
  coOwners?: Array<{
    name: string;
    idNumber: string;
    ownershipPercentage: number;
    relationship: string;
  }>;
  ownershipHistory: Array<{
    date: string;
    previousOwner: string;
    transferType: 'sale' | 'inheritance' | 'donation' | 'transfer';
    price?: number;
  }>;
  mortgageBonds: Array<{
    bank: string;
    amount: number;
    registrationDate: string;
    status: 'active' | 'cancelled' | 'settled';
  }>;
}

export interface EnhancedPropertyValuation {
  currentValue: number;
  previousValue: number;
  valueDate: string;
  valuationMethod: 'automated' | 'comparative' | 'professional' | 'ai_enhanced';
  confidence: number;
  pricePerSqm: number;
  marketTrend: 'increasing' | 'decreasing' | 'stable';
  comparativeProperties: Array<{
    address: string;
    price: number;
    distance: number;
    similarity: number;
  }>;
  valuationBreakdown: {
    landValue: number;
    improvementValue: number;
    locationPremium: number;
    marketAdjustment: number;
  };
}

export interface PropertyMarketData {
  averageAreaPrice: number;
  medianAreaPrice: number;
  pricePerSqmArea: number;
  salesVolumeLast12Months: number;
  averageDaysOnMarket: number;
  priceGrowthYoY: number;
  investmentGrade: 'A' | 'B' | 'C' | 'D';
  marketActivity: 'hot' | 'warm' | 'cold';
  demandSupplyRatio: number;
}

export interface PropertyPhysicalData {
  erfNumber: string;
  titleDeedNumber: string;
  propertyType: string;
  landSize: number;
  buildingSize: number;
  buildingAge: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  bedrooms: number;
  bathrooms: number;
  garages: number;
  poolSize?: number;
  hasPool: boolean;
  hasSolarPanels: boolean;
  hasAlarmSystem: boolean;
  roofMaterial: string;
  wallMaterial: string;
  floorMaterial: string;
}

export interface PropertyLegalData {
  zoningScheme: string;
  buildingRestrictions: string[];
  servitudes: string[];
  municipalCompliance: boolean;
  planApprovals: Array<{
    type: string;
    date: string;
    status: string;
  }>;
  contraventions: Array<{
    type: string;
    date: string;
    status: string;
    fine?: number;
  }>;
}

export interface PropertyFinancialData {
  municipalValue: number;
  ratesAndTaxes: {
    monthlyRates: number;
    monthlyRefuse: number;
    monthlyWater: number;
    monthlyElectricity: number;
  };
  levies?: {
    monthlyLevy: number;
    specialLevy?: number;
    bodyCorpName: string;
  };
  insurance: {
    recommendedCover: number;
    averagePremium: number;
  };
}

export class EnhancedPropertyDataService {
  
  async getComprehensivePropertyData(location: PropertyLocation): Promise<{
    ownership: EnhancedPropertyOwnership;
    valuation: EnhancedPropertyValuation;
    market: PropertyMarketData;
    physical: PropertyPhysicalData;
    legal: PropertyLegalData;
    financial: PropertyFinancialData;
  }> {
    console.log('🔍 Gathering comprehensive property data for:', location.displayName);
    
    // Simulate comprehensive data gathering from multiple sources
    const [ownership, valuation, market, physical, legal, financial] = await Promise.all([
      this.getEnhancedOwnership(location),
      this.getEnhancedValuation(location),
      this.getMarketData(location),
      this.getPhysicalData(location),
      this.getLegalData(location),
      this.getFinancialData(location)
    ]);

    return { ownership, valuation, market, physical, legal, financial };
  }

  private async getEnhancedOwnership(location: PropertyLocation): Promise<EnhancedPropertyOwnership> {
    // Simulate enhanced ownership data
    const baseOwner = this.generateRealisticOwner(location);
    
    return {
      primaryOwner: baseOwner,
      coOwners: Math.random() > 0.7 ? [{
        name: "Co-Owner Name",
        idNumber: "ID verification requires integration",
        ownershipPercentage: 50,
        relationship: "spouse"
      }] : undefined,
      ownershipHistory: [
        {
          date: "2020-03-15",
          previousOwner: "Previous Owner Name",
          transferType: "sale",
          price: Math.floor(this.estimatePropertyValue(location) * 0.8)
        },
        {
          date: "2015-08-20",
          previousOwner: "Original Owner",
          transferType: "sale",
          price: Math.floor(this.estimatePropertyValue(location) * 0.6)
        }
      ],
      mortgageBonds: [
        {
          bank: "Standard Bank",
          amount: Math.floor(this.estimatePropertyValue(location) * 0.7),
          registrationDate: "2020-03-15",
          status: "active"
        }
      ]
    };
  }

  private async getEnhancedValuation(location: PropertyLocation): Promise<EnhancedPropertyValuation> {
    const currentValue = this.estimatePropertyValue(location);
    const landSize = this.estimateLandSize(location.displayName);
    
    return {
      currentValue,
      previousValue: Math.floor(currentValue * 0.9),
      valueDate: new Date().toISOString().split('T')[0],
      valuationMethod: 'ai_enhanced',
      confidence: 78,
      pricePerSqm: landSize > 0 ? Math.floor(currentValue / landSize) : 0,
      marketTrend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)] as any,
      comparativeProperties: [
        {
          address: "Similar property 1",
          price: Math.floor(currentValue * (0.9 + Math.random() * 0.2)),
          distance: 0.5,
          similarity: 85
        },
        {
          address: "Similar property 2", 
          price: Math.floor(currentValue * (0.9 + Math.random() * 0.2)),
          distance: 0.8,
          similarity: 78
        }
      ],
      valuationBreakdown: {
        landValue: Math.floor(currentValue * 0.4),
        improvementValue: Math.floor(currentValue * 0.5),
        locationPremium: Math.floor(currentValue * 0.08),
        marketAdjustment: Math.floor(currentValue * 0.02)
      }
    };
  }

  private async getMarketData(location: PropertyLocation): Promise<PropertyMarketData> {
    const baseValue = this.estimatePropertyValue(location);
    
    return {
      averageAreaPrice: Math.floor(baseValue * 0.95),
      medianAreaPrice: Math.floor(baseValue * 0.92),
      pricePerSqmArea: Math.floor(baseValue * 0.0008),
      salesVolumeLast12Months: Math.floor(Math.random() * 50) + 10,
      averageDaysOnMarket: Math.floor(Math.random() * 90) + 30,
      priceGrowthYoY: (Math.random() * 20) - 5, // -5% to +15%
      investmentGrade: this.determineInvestmentGrade(location),
      marketActivity: ['hot', 'warm', 'cold'][Math.floor(Math.random() * 3)] as any,
      demandSupplyRatio: 0.8 + (Math.random() * 0.4) // 0.8 to 1.2
    };
  }

  private async getPhysicalData(location: PropertyLocation): Promise<PropertyPhysicalData> {
    const propertyType = this.determinePropertyType(location.displayName);
    const landSize = this.estimateLandSize(location.displayName);
    
    return {
      erfNumber: `ERF ${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
      titleDeedNumber: `T${String(location.id).slice(-6)}/2024`,
      propertyType,
      landSize,
      buildingSize: propertyType === 'Apartment' ? 0 : Math.floor(landSize * 0.35),
      buildingAge: Math.floor(Math.random() * 30) + 5,
      condition: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)] as any,
      bedrooms: propertyType === 'Apartment' ? 2 : propertyType === 'Townhouse' ? 3 : 4,
      bathrooms: propertyType === 'Apartment' ? 1 : propertyType === 'Townhouse' ? 2 : 3,
      garages: propertyType === 'Apartment' ? 1 : 2,
      hasPool: Math.random() > 0.7,
      poolSize: Math.random() > 0.7 ? Math.floor(Math.random() * 40) + 20 : undefined,
      hasSolarPanels: Math.random() > 0.6,
      hasAlarmSystem: Math.random() > 0.5,
      roofMaterial: ['Tiles', 'IBR Sheeting', 'Thatch', 'Concrete'][Math.floor(Math.random() * 4)],
      wallMaterial: ['Brick', 'Concrete Block', 'Steel Frame'][Math.floor(Math.random() * 3)],
      floorMaterial: ['Tiles', 'Laminate', 'Carpet', 'Concrete'][Math.floor(Math.random() * 4)]
    };
  }

  private async getLegalData(location: PropertyLocation): Promise<PropertyLegalData> {
    return {
      zoningScheme: this.determineZoning(location.displayName),
      buildingRestrictions: [
        "Maximum building coverage: 60%",
        "Height restriction: 2 storeys",
        "Setback requirements: 3m from boundary"
      ],
      servitudes: [
        "Municipal water servitude",
        "Electrical servitude"
      ],
      municipalCompliance: Math.random() > 0.2,
      planApprovals: [
        {
          type: "Building Plan Approval",
          date: "2020-01-15",
          status: "Approved"
        }
      ],
      contraventions: Math.random() > 0.8 ? [{
        type: "Minor building contravention",
        date: "2023-06-10",
        status: "Resolved",
        fine: 2500
      }] : []
    };
  }

  private async getFinancialData(location: PropertyLocation): Promise<PropertyFinancialData> {
    const currentValue = this.estimatePropertyValue(location);
    const municipalValue = Math.floor(currentValue * 0.7);
    
    return {
      municipalValue,
      ratesAndTaxes: {
        monthlyRates: Math.floor(municipalValue * 0.012 / 12),
        monthlyRefuse: 250,
        monthlyWater: 400,
        monthlyElectricity: 800
      },
      levies: this.determinePropertyType(location.displayName) === 'Apartment' ? {
        monthlyLevy: 1200,
        specialLevy: Math.random() > 0.8 ? 5000 : undefined,
        bodyCorpName: "Residential Body Corporate"
      } : undefined,
      insurance: {
        recommendedCover: Math.floor(currentValue * 1.2),
        averagePremium: Math.floor(currentValue * 0.008 / 12)
      }
    };
  }

  // Helper methods
  private generateRealisticOwner(location: PropertyLocation) {
    const ownerTypes = ['individual', 'company', 'trust', 'joint'] as const;
    return {
      name: "Property Owner (requires API integration)",
      idNumber: "ID verification requires Home Affairs API",
      contactNumber: "Contact lookup requires integration",
      email: "Email lookup requires integration",
      address: "Address verification requires integration",
      ownershipType: ownerTypes[Math.floor(Math.random() * ownerTypes.length)],
      ownershipPercentage: 100,
      registrationDate: "Requires Deeds Office integration",
      verified: false
    };
  }

  private estimatePropertyValue(location: PropertyLocation): number {
    const province = location.province?.toLowerCase() || '';
    const municipality = location.municipality?.toLowerCase() || '';
    const displayName = location.displayName.toLowerCase();
    
    let baseValue = 1500000;
    
    // Province-based pricing (more accurate)
    if (province.includes('western cape') || municipality.includes('cape town')) {
      baseValue = 3200000;
    } else if (province.includes('gauteng') || municipality.includes('johannesburg') || municipality.includes('pretoria')) {
      baseValue = 2800000;
    } else if (province.includes('kwazulu-natal') || municipality.includes('durban')) {
      baseValue = 2200000;
    } else if (province.includes('eastern cape')) {
      baseValue = 1400000;
    }
    
    // Property type adjustments
    if (displayName.includes('apartment') || displayName.includes('flat')) {
      baseValue *= 0.65;
    } else if (displayName.includes('townhouse')) {
      baseValue *= 0.85;
    } else if (displayName.includes('commercial')) {
      baseValue *= 1.8;
    } else if (displayName.includes('industrial')) {
      baseValue *= 1.2;
    }
    
    const variation = 0.85 + (Math.random() * 0.3);
    return Math.floor(baseValue * variation);
  }

  private determinePropertyType(displayName: string): string {
    const name = displayName.toLowerCase();
    if (name.includes('apartment') || name.includes('flat') || name.includes('unit')) return 'Apartment';
    if (name.includes('townhouse') || name.includes('cluster')) return 'Townhouse';
    if (name.includes('commercial') || name.includes('shop') || name.includes('office')) return 'Commercial';
    if (name.includes('industrial') || name.includes('warehouse')) return 'Industrial';
    if (name.includes('vacant') || name.includes('plot')) return 'Vacant Land';
    return 'Residential House';
  }

  private estimateLandSize(displayName: string): number {
    const name = displayName.toLowerCase();
    if (name.includes('apartment') || name.includes('flat')) return 0;
    if (name.includes('townhouse') || name.includes('cluster')) return 200 + Math.floor(Math.random() * 150);
    if (name.includes('commercial')) return 800 + Math.floor(Math.random() * 2000);
    if (name.includes('industrial')) return 2000 + Math.floor(Math.random() * 8000);
    return 600 + Math.floor(Math.random() * 600);
  }

  private determineZoning(displayName: string): string {
    const name = displayName.toLowerCase();
    if (name.includes('commercial')) return 'Commercial (Business 1)';
    if (name.includes('industrial')) return 'Industrial (Light Industrial)';
    if (name.includes('apartment') || name.includes('flat')) return 'Residential 3 (High Density)';
    if (name.includes('townhouse')) return 'Residential 2 (Medium Density)';
    return 'Residential 1 (Single Dwelling)';
  }

  private determineInvestmentGrade(location: PropertyLocation): 'A' | 'B' | 'C' | 'D' {
    const province = location.province?.toLowerCase() || '';
    const municipality = location.municipality?.toLowerCase() || '';
    
    if (province.includes('western cape') || municipality.includes('cape town')) return 'A';
    if (province.includes('gauteng') || municipality.includes('johannesburg')) return 'A';
    if (province.includes('kwazulu-natal') || municipality.includes('durban')) return 'B';
    if (province.includes('eastern cape')) return 'B';
    return 'C';
  }
}

export const enhancedPropertyDataService = new EnhancedPropertyDataService();
