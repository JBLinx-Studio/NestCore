
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
  verified: boolean;
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
  verified: boolean;
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
  verified: boolean;
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
  verified: boolean;
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
  verified: boolean;
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
  verified: boolean;
}

export class EnhancedPropertyDataService {
  
  async getComprehensivePropertyData(location: PropertyLocation): Promise<{
    ownership: EnhancedPropertyOwnership;
    valuation: EnhancedPropertyValuation;
    market: PropertyMarketData;
    physical: PropertyPhysicalData;
    legal: PropertyLegalData;
    financial: PropertyFinancialData;
    dataSource: 'real' | 'estimated';
  }> {
    console.log('🔍 Gathering comprehensive property data for:', location.displayName);
    
    // Since we don't have real API integrations, return error data structure
    const [ownership, valuation, market, physical, legal, financial] = await Promise.all([
      this.getEnhancedOwnership(location),
      this.getEnhancedValuation(location),
      this.getMarketData(location),
      this.getPhysicalData(location),
      this.getLegalData(location),
      this.getFinancialData(location)
    ]);

    return { 
      ownership, 
      valuation, 
      market, 
      physical, 
      legal, 
      financial, 
      dataSource: 'estimated' // Always estimated since no real APIs are connected
    };
  }

  private async getEnhancedOwnership(location: PropertyLocation): Promise<EnhancedPropertyOwnership> {
    // Return unverified placeholder data
    return {
      primaryOwner: {
        name: "Property Owner Details",
        idNumber: "ID verification requires Home Affairs API",
        ownershipType: "individual" as const,
        ownershipPercentage: 100,
        registrationDate: "Requires Deeds Office integration",
        verified: false
      },
      ownershipHistory: [],
      mortgageBonds: [],
      verified: false
    };
  }

  private async getEnhancedValuation(location: PropertyLocation): Promise<EnhancedPropertyValuation> {
    return {
      currentValue: 0,
      previousValue: 0,
      valueDate: new Date().toISOString().split('T')[0],
      valuationMethod: 'automated' as const,
      confidence: 0,
      pricePerSqm: 0,
      marketTrend: 'stable' as const,
      comparativeProperties: [],
      valuationBreakdown: {
        landValue: 0,
        improvementValue: 0,
        locationPremium: 0,
        marketAdjustment: 0
      },
      verified: false
    };
  }

  private async getMarketData(location: PropertyLocation): Promise<PropertyMarketData> {
    return {
      averageAreaPrice: 0,
      medianAreaPrice: 0,
      pricePerSqmArea: 0,
      salesVolumeLast12Months: 0,
      averageDaysOnMarket: 0,
      priceGrowthYoY: 0,
      investmentGrade: 'D' as const,
      marketActivity: 'cold' as const,
      demandSupplyRatio: 0,
      verified: false
    };
  }

  private async getPhysicalData(location: PropertyLocation): Promise<PropertyPhysicalData> {
    return {
      erfNumber: "",
      titleDeedNumber: "",
      propertyType: "Unknown",
      landSize: 0,
      buildingSize: 0,
      buildingAge: 0,
      condition: 'fair' as const,
      bedrooms: 0,
      bathrooms: 0,
      garages: 0,
      hasPool: false,
      hasSolarPanels: false,
      hasAlarmSystem: false,
      roofMaterial: "Unknown",
      wallMaterial: "Unknown",
      floorMaterial: "Unknown",
      verified: false
    };
  }

  private async getLegalData(location: PropertyLocation): Promise<PropertyLegalData> {
    return {
      zoningScheme: "Unknown",
      buildingRestrictions: [],
      servitudes: [],
      municipalCompliance: false,
      planApprovals: [],
      contraventions: [],
      verified: false
    };
  }

  private async getFinancialData(location: PropertyLocation): Promise<PropertyFinancialData> {
    return {
      municipalValue: 0,
      ratesAndTaxes: {
        monthlyRates: 0,
        monthlyRefuse: 0,
        monthlyWater: 0,
        monthlyElectricity: 0
      },
      insurance: {
        recommendedCover: 0,
        averagePremium: 0
      },
      verified: false
    };
  }
}

export const enhancedPropertyDataService = new EnhancedPropertyDataService();
