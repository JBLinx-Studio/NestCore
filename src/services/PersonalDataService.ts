
export interface PersonVerificationResult {
  verified: boolean;
  confidence: number;
  details: {
    fullName: string;
    idNumber: string;
    dateOfBirth: string;
    citizenship: string;
    status: 'alive' | 'deceased' | 'unknown';
  };
  addresses: Array<{
    type: 'residential' | 'postal' | 'work';
    address: string;
    period: string;
    current: boolean;
  }>;
  alerts: string[];
}

export interface ContactDiscoveryResult {
  phones: Array<{
    number: string;
    type: 'mobile' | 'landline' | 'work';
    carrier?: string;
    verified: boolean;
    lastSeen?: string;
  }>;
  emails: Array<{
    address: string;
    type: 'personal' | 'work' | 'other';
    verified: boolean;
    source: string;
  }>;
  socialMedia: Array<{
    platform: string;
    username: string;
    profileUrl: string;
    verified: boolean;
    lastActive?: string;
  }>;
}

export interface CompanyVerificationResult {
  verified: boolean;
  details: {
    name: string;
    registrationNumber: string;
    vatNumber?: string;
    status: 'active' | 'deregistered' | 'suspended' | 'unknown';
    incorporationDate: string;
  };
  directors: Array<{
    name: string;
    idNumber: string;
    appointmentDate: string;
    resignationDate?: string;
    current: boolean;
  }>;
  addresses: Array<{
    type: 'registered' | 'postal' | 'business';
    address: string;
    current: boolean;
  }>;
  businessActivity: {
    primaryCode: string;
    description: string;
    industry: string;
  };
}

export interface CreditAssessmentResult {
  score: number;
  band: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  factors: {
    paymentHistory: number;
    creditUtilization: number;
    creditLength: number;
    newCredit: number;
    creditMix: number;
  };
  accounts: Array<{
    type: 'credit_card' | 'loan' | 'mortgage' | 'overdraft';
    provider: string;
    balance: number;
    limit?: number;
    status: 'current' | 'overdue' | 'default' | 'closed';
  }>;
  judgments: Array<{
    date: string;
    amount: number;
    creditor: string;
    status: 'active' | 'satisfied';
  }>;
}

export class PersonalDataService {
  private homeAffairsApiUrl = 'https://api.dha.gov.za/v1'; // Hypothetical Home Affairs API
  private cipcApiUrl = 'https://api.cipc.co.za/v1'; // CIPC API
  private creditBureauUrls = {
    transUnion: 'https://api.transunion.co.za/v1',
    experian: 'https://api.experian.co.za/v1',
    compuscan: 'https://api.compuscan.co.za/v1'
  };

  async verifyPersonalIdentity(idNumber: string, fullName?: string): Promise<PersonVerificationResult> {
    console.log('🆔 Verifying personal identity:', idNumber);
    
    // Validate SA ID number format
    if (!this.validateSAIdNumber(idNumber)) {
      throw new Error('Invalid South African ID number format');
    }

    try {
      // In real implementation, this would call Home Affairs DHA API
      // For now, simulate comprehensive identity verification
      
      const birthDate = this.extractBirthDateFromId(idNumber);
      const gender = this.extractGenderFromId(idNumber);
      const citizenship = this.extractCitizenshipFromId(idNumber);

      return {
        verified: true,
        confidence: 0.95,
        details: {
          fullName: fullName || this.generateRealisticName(),
          idNumber,
          dateOfBirth: birthDate,
          citizenship,
          status: 'alive'
        },
        addresses: [
          {
            type: 'residential',
            address: '123 Main Road, Cape Town, 7700',
            period: '2020-current',
            current: true
          },
          {
            type: 'postal',
            address: 'PO Box 456, Cape Town, 7700',
            period: '2020-current',
            current: true
          }
        ],
        alerts: []
      };
    } catch (error) {
      console.error('Identity verification error:', error);
      throw error;
    }
  }

  async discoverContactInformation(fullName: string, idNumber?: string): Promise<ContactDiscoveryResult> {
    console.log('📞 Discovering contact information for:', fullName);
    
    // Simulate contact discovery from multiple sources
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      phones: [
        {
          number: '+27821234567',
          type: 'mobile',
          carrier: 'MTN',
          verified: true,
          lastSeen: '2024-01-15'
        },
        {
          number: '+27214567890',
          type: 'landline',
          verified: false
        }
      ],
      emails: [
        {
          address: `${fullName.toLowerCase().replace(' ', '.')}@email.com`,
          type: 'personal',
          verified: true,
          source: 'Social Media'
        },
        {
          address: `${fullName.toLowerCase().replace(' ', '.')}@company.co.za`,
          type: 'work',
          verified: false,
          source: 'Professional Networks'
        }
      ],
      socialMedia: [
        {
          platform: 'LinkedIn',
          username: fullName.toLowerCase().replace(' ', '-'),
          profileUrl: `https://linkedin.com/in/${fullName.toLowerCase().replace(' ', '-')}`,
          verified: true,
          lastActive: '2024-01-10'
        },
        {
          platform: 'Facebook',
          username: fullName.toLowerCase().replace(' ', '.'),
          profileUrl: `https://facebook.com/${fullName.toLowerCase().replace(' ', '.')}`,
          verified: false
        }
      ]
    };
  }

  async verifyCompanyDetails(companyNumber: string): Promise<CompanyVerificationResult> {
    console.log('🏢 Verifying company details:', companyNumber);
    
    try {
      // In real implementation, this would call CIPC API
      // Simulate CIPC company verification
      
      return {
        verified: true,
        details: {
          name: 'Property Investments (Pty) Ltd',
          registrationNumber: companyNumber,
          vatNumber: '4567890123',
          status: 'active',
          incorporationDate: '2018-03-15'
        },
        directors: [
          {
            name: 'John Smith',
            idNumber: '8001015009088',
            appointmentDate: '2018-03-15',
            current: true
          }
        ],
        addresses: [
          {
            type: 'registered',
            address: '123 Business Avenue, Cape Town, 7700',
            current: true
          }
        ],
        businessActivity: {
          primaryCode: '68100',
          description: 'Real estate activities with own or leased property',
          industry: 'Real Estate'
        }
      };
    } catch (error) {
      console.error('Company verification error:', error);
      throw error;
    }
  }

  async getCreditAssessment(idNumber: string): Promise<CreditAssessmentResult> {
    console.log('💳 Performing credit assessment:', idNumber);
    
    // Simulate credit bureau assessment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const score = 550 + Math.floor(Math.random() * 300);
    
    return {
      score,
      band: this.scoreToBand(score),
      factors: {
        paymentHistory: 0.35,
        creditUtilization: 0.30,
        creditLength: 0.15,
        newCredit: 0.10,
        creditMix: 0.10
      },
      accounts: [
        {
          type: 'mortgage',
          provider: 'Standard Bank',
          balance: 850000,
          limit: 1000000,
          status: 'current'
        },
        {
          type: 'credit_card',
          provider: 'ABSA',
          balance: 15000,
          limit: 50000,
          status: 'current'
        }
      ],
      judgments: []
    };
  }

  private validateSAIdNumber(idNumber: string): boolean {
    if (idNumber.length !== 13) return false;
    
    // Validate date part
    const year = parseInt(idNumber.substring(0, 2));
    const month = parseInt(idNumber.substring(2, 4));
    const day = parseInt(idNumber.substring(4, 6));
    
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    // Validate citizenship digit
    const citizenship = idNumber.substring(10, 11);
    if (citizenship !== '0' && citizenship !== '1') return false;
    
    return true;
  }

  private extractBirthDateFromId(idNumber: string): string {
    const year = parseInt(idNumber.substring(0, 2));
    const fullYear = year > 50 ? 1900 + year : 2000 + year;
    const month = idNumber.substring(2, 4);
    const day = idNumber.substring(4, 6);
    
    return `${fullYear}-${month}-${day}`;
  }

  private extractGenderFromId(idNumber: string): string {
    const genderDigit = parseInt(idNumber.substring(6, 10));
    return genderDigit < 5000 ? 'Female' : 'Male';
  }

  private extractCitizenshipFromId(idNumber: string): string {
    const citizenshipDigit = idNumber.substring(10, 11);
    return citizenshipDigit === '0' ? 'South African' : 'Permanent Resident';
  }

  private generateRealisticName(): string {
    const firstNames = ['John', 'Sarah', 'Michael', 'Lisa', 'David', 'Emma', 'James', 'Sophie'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  private scoreToBand(score: number): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' {
    if (score >= 781) return 'A';
    if (score >= 661) return 'B';
    if (score >= 601) return 'C';
    if (score >= 561) return 'D';
    if (score >= 481) return 'E';
    return 'F';
  }
}

export const personalDataService = new PersonalDataService();
