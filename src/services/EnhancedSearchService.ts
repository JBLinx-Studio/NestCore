
import { openStreetMapService, PropertyLocation } from './OpenStreetMapService';
import { advancedPropertyService } from './AdvancedPropertyService';
import { personalDataService } from './PersonalDataService';
import { enhancedDataService } from './EnhancedDataService';

export interface ComprehensivePropertyIntel {
  basicInfo: PropertyLocation;
  ownership: any;
  valuation: any;
  compliance: any;
  residents: Array<{
    name: string;
    idNumber: string;
    verified: boolean;
    contactInfo: any;
    creditProfile: any;
  }>;
  enhancedData: any;
}

export class EnhancedSearchService {
  async performDeepPropertySearch(address: string): Promise<ComprehensivePropertyIntel | null> {
    console.log('🔍 Starting comprehensive property intelligence gathering for:', address);
    
    try {
      // Step 1: Get basic property location data
      const properties = await openStreetMapService.searchProperties(address, 1);
      if (properties.length === 0) {
        throw new Error('Property not found');
      }
      
      const property = properties[0];
      console.log('📍 Property located:', property);
      
      // Step 2: Search for detailed property information
      const propertyDetails = await advancedPropertyService.searchPropertyByAddress(address);
      
      // Step 3: Get ownership and legal information
      const erfNumber = propertyDetails?.erfNumber || 'ERF12345';
      const [ownership, valuation, compliance] = await Promise.all([
        advancedPropertyService.getOwnershipHistory(erfNumber),
        advancedPropertyService.getDetailedValuation(address, property.lat, property.lon),
        advancedPropertyService.getComplianceStatus(erfNumber)
      ]);
      
      // Step 4: Identify potential residents/owners
      const residents = await this.identifyResidents(ownership, address);
      
      // Step 5: Get enhanced data (weather, amenities, etc.)
      const enhancedData = await enhancedDataService.getAllEnhancedData(property);
      
      return {
        basicInfo: property,
        ownership,
        valuation,
        compliance,
        residents,
        enhancedData
      };
      
    } catch (error) {
      console.error('Deep property search error:', error);
      return null;
    }
  }

  private async identifyResidents(ownership: any, address: string) {
    const residents = [];
    
    // Extract potential residents from ownership data
    const currentOwner = ownership.transfers[0]?.to;
    
    if (currentOwner) {
      try {
        console.log('🔍 Investigating resident:', currentOwner);
        
        // Check if it's a person (has ID number) or company
        const isCompany = currentOwner.includes('(Pty)') || currentOwner.includes('Ltd') || currentOwner.includes('Trust');
        
        if (isCompany) {
          // Handle company ownership
          const companyNumber = this.generateCompanyNumber();
          const companyDetails = await personalDataService.verifyCompanyDetails(companyNumber);
          
          // Get director information
          for (const director of companyDetails.directors) {
            if (director.current) {
              const [contactInfo, creditProfile] = await Promise.all([
                personalDataService.discoverContactInformation(director.name, director.idNumber),
                personalDataService.getCreditAssessment(director.idNumber)
              ]);
              
              residents.push({
                name: director.name,
                idNumber: director.idNumber,
                verified: true,
                contactInfo,
                creditProfile,
                role: 'Director/Owner'
              });
            }
          }
        } else {
          // Handle individual ownership
          const idNumber = this.generateIdNumber();
          const [verification, contactInfo, creditProfile] = await Promise.all([
            personalDataService.verifyPersonalIdentity(idNumber, currentOwner),
            personalDataService.discoverContactInformation(currentOwner, idNumber),
            personalDataService.getCreditAssessment(idNumber)
          ]);
          
          residents.push({
            name: currentOwner,
            idNumber,
            verified: verification.verified,
            contactInfo,
            creditProfile,
            role: 'Owner'
          });
        }
      } catch (error) {
        console.error('Error investigating resident:', error);
      }
    }
    
    return residents;
  }

  async searchByPersonalDetails(name: string, idNumber?: string): Promise<Array<{
    person: any;
    properties: PropertyLocation[];
    businesses: any[];
  }>> {
    console.log('👤 Searching by personal details:', name, idNumber);
    
    try {
      // Verify the person
      const verification = idNumber 
        ? await personalDataService.verifyPersonalIdentity(idNumber, name)
        : null;
      
      // Get contact information
      const contactInfo = await personalDataService.discoverContactInformation(name, idNumber);
      
      // Search for properties associated with addresses
      const properties = [];
      if (verification?.addresses) {
        for (const address of verification.addresses) {
          const foundProperties = await openStreetMapService.searchProperties(address.address, 5);
          properties.push(...foundProperties);
        }
      }
      
      // Search for business interests
      const businesses = [];
      // This would integrate with CIPC to find companies where person is director
      
      return [{
        person: {
          verification,
          contactInfo,
          creditProfile: idNumber ? await personalDataService.getCreditAssessment(idNumber) : null
        },
        properties,
        businesses
      }];
    } catch (error) {
      console.error('Personal search error:', error);
      return [];
    }
  }

  async searchByPhoneNumber(phoneNumber: string): Promise<{
    owner?: any;
    properties: PropertyLocation[];
    businesses: any[];
  }> {
    console.log('📞 Searching by phone number:', phoneNumber);
    
    // This would integrate with phone number lookup services
    // For now, simulate the search
    
    return {
      owner: {
        name: 'John Smith',
        verified: false,
        source: 'Phone directory lookup'
      },
      properties: [],
      businesses: []
    };
  }

  private generateIdNumber(): string {
    // Generate realistic SA ID number for demo
    const year = Math.floor(Math.random() * 50) + 50; // 1950-1999
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const gender = Math.floor(Math.random() * 10000);
    const citizenship = Math.floor(Math.random() * 2);
    const checksum = Math.floor(Math.random() * 10);
    
    return `${year}${month}${day}${String(gender).padStart(4, '0')}${citizenship}8${checksum}`;
  }

  private generateCompanyNumber(): string {
    const year = 2000 + Math.floor(Math.random() * 24);
    const sequence = Math.floor(Math.random() * 999999) + 1;
    const suffix = Math.floor(Math.random() * 99) + 1;
    
    return `${year}/${String(sequence).padStart(6, '0')}/${String(suffix).padStart(2, '0')}`;
  }
}

export const enhancedSearchService = new EnhancedSearchService();
