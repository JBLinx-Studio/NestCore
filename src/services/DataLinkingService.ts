
export interface PropertyData {
  id: string;
  address: string;
  type: string;
  value: number;
  marketValue?: number;
  cmaValue?: number;
  occupancyRate?: number;
  monthlyRent?: number;
  expenses?: number;
  roi?: number;
}

export interface CMAData {
  id: string;
  propertyId: string;
  estimatedValue: number;
  comparables: Array<{
    address: string;
    soldPrice: number;
    soldDate: string;
    sqft: number;
  }>;
  marketTrends: {
    appreciation: number;
    averageDaysOnMarket: number;
    pricePerSqft: number;
  };
}

export interface LeadData {
  id: string;
  propertyId: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  score: number;
  status: 'qualified' | 'viewing_scheduled' | 'application_submitted' | 'leased';
  source: string;
}

class DataLinkingService {
  private static instance: DataLinkingService;
  private propertyData: Map<string, PropertyData> = new Map();
  private cmaData: Map<string, CMAData> = new Map();
  private leadData: Map<string, LeadData> = new Map();

  static getInstance(): DataLinkingService {
    if (!DataLinkingService.instance) {
      DataLinkingService.instance = new DataLinkingService();
    }
    return DataLinkingService.instance;
  }

  // Property-CMA Linking
  linkCMAToProperty(propertyId: string, cmaData: CMAData): void {
    this.cmaData.set(cmaData.id, { ...cmaData, propertyId });
    
    // Update property with CMA value
    const property = this.propertyData.get(propertyId);
    if (property) {
      this.propertyData.set(propertyId, {
        ...property,
        cmaValue: cmaData.estimatedValue,
        marketValue: cmaData.estimatedValue
      });
    }
  }

  // Lead-Property Linking
  linkLeadToProperty(propertyId: string, leadData: LeadData): void {
    this.leadData.set(leadData.id, { ...leadData, propertyId });
  }

  // Get comprehensive property insights
  getPropertyInsights(propertyId: string) {
    const property = this.propertyData.get(propertyId);
    const cmas = Array.from(this.cmaData.values()).filter(cma => cma.propertyId === propertyId);
    const leads = Array.from(this.leadData.values()).filter(lead => lead.propertyId === propertyId);

    return {
      property,
      cmas,
      leads,
      performance: {
        marketPerformance: this.calculateMarketPerformance(property, cmas),
        leadConversion: this.calculateLeadConversion(leads),
        financialMetrics: this.calculateFinancialMetrics(property)
      }
    };
  }

  private calculateMarketPerformance(property?: PropertyData, cmas: CMAData[] = []) {
    if (!property || cmas.length === 0) return null;
    
    const latestCMA = cmas[cmas.length - 1];
    const appreciationRate = ((latestCMA.estimatedValue - property.value) / property.value) * 100;
    
    return {
      currentValue: latestCMA.estimatedValue,
      purchaseValue: property.value,
      appreciation: appreciationRate,
      marketTrends: latestCMA.marketTrends
    };
  }

  private calculateLeadConversion(leads: LeadData[]) {
    const totalLeads = leads.length;
    const convertedLeads = leads.filter(lead => lead.status === 'leased').length;
    
    return {
      totalLeads,
      convertedLeads,
      conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0,
      averageScore: totalLeads > 0 ? leads.reduce((sum, lead) => sum + lead.score, 0) / totalLeads : 0
    };
  }

  private calculateFinancialMetrics(property?: PropertyData) {
    if (!property) return null;
    
    const monthlyIncome = property.monthlyRent || 0;
    const monthlyExpenses = property.expenses || 0;
    const netIncome = monthlyIncome - monthlyExpenses;
    const annualROI = property.value > 0 ? ((netIncome * 12) / property.value) * 100 : 0;
    
    return {
      monthlyIncome,
      monthlyExpenses,
      netIncome,
      annualROI,
      breakEvenPoint: monthlyExpenses > 0 ? monthlyIncome / monthlyExpenses : 0
    };
  }

  // Workflow automation triggers
  triggerWorkflow(workflowType: string, data: any) {
    console.log(`Triggering workflow: ${workflowType}`, data);
    
    switch (workflowType) {
      case 'property_listed':
        this.autoCreateCMAWorkflow(data.propertyId);
        break;
      case 'lead_qualified':
        this.autoScheduleViewingWorkflow(data.leadId);
        break;
      case 'market_change':
        this.autoUpdateValuationsWorkflow(data.marketData);
        break;
    }
  }

  private autoCreateCMAWorkflow(propertyId: string) {
    console.log(`Auto-creating CMA for property ${propertyId}`);
    // This would integrate with the CMA workspace
  }

  private autoScheduleViewingWorkflow(leadId: string) {
    console.log(`Auto-scheduling viewing for lead ${leadId}`);
    // This would integrate with the leasing manager
  }

  private autoUpdateValuationsWorkflow(marketData: any) {
    console.log(`Auto-updating valuations based on market data`, marketData);
    // This would update all property valuations
  }
}

export default DataLinkingService;
