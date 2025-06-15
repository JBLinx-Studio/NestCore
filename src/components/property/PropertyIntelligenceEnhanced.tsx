import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { PropertyLocation } from '@/services/OpenStreetMapService';
import { enhancedSearchService } from '@/services/EnhancedSearchService';
import { personalDataService } from '@/services/PersonalDataService';

interface PropertyIntelligenceEnhancedProps {
  selectedProperty: PropertyLocation | null;
}

export const PropertyIntelligenceEnhanced: React.FC<PropertyIntelligenceEnhancedProps> = ({ selectedProperty }) => {
  const [loading, setLoading] = useState(false);
  const [comprehensiveData, setComprehensiveData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'address' | 'person' | 'phone'>('address');
  const [searchResults, setSearchResults] = useState<any>(null);

  useEffect(() => {
    if (selectedProperty) {
      setSearchQuery(selectedProperty.address);
    }
  }, [selectedProperty]);

  const handleDeepSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      let results;
      
      switch (searchType) {
        case 'address':
          results = await enhancedSearchService.performDeepPropertySearch(searchQuery);
          setComprehensiveData(results);
          break;
        case 'person':
          results = await enhancedSearchService.searchByPersonalDetails(searchQuery);
          setSearchResults(results);
          break;
        case 'phone':
          results = await enhancedSearchService.searchByPhoneNumber(searchQuery);
          setSearchResults(results);
          break;
      }
    } catch (error) {
      console.error('Deep search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔍 Deep Intelligence Search
          </CardTitle>
          <CardDescription>
            Comprehensive property and personal data investigation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value as any)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="address">🏠 Property Address</option>
              <option value="person">👤 Person Name/ID</option>
              <option value="phone">📞 Phone Number</option>
            </select>
            <Input
              placeholder={
                searchType === 'address' ? 'Enter property address...' :
                searchType === 'person' ? 'Enter name or ID number...' :
                'Enter phone number...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleDeepSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Deep Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Data Display */}
      {comprehensiveData && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg h-14">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="ownership">🏛️ Ownership</TabsTrigger>
            <TabsTrigger value="valuation">💰 Valuation</TabsTrigger>
            <TabsTrigger value="residents">👥 Residents</TabsTrigger>
            <TabsTrigger value="compliance">⚖️ Legal</TabsTrigger>
            <TabsTrigger value="intelligence">🚀 Intelligence</TabsTrigger>
            <TabsTrigger value="apis">🔧 APIs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Address:</strong> {comprehensiveData.basicInfo.displayName}</p>
                    <p><strong>ERF:</strong> {comprehensiveData.ownership?.erfNumber || 'Unknown'}</p>
                    <p><strong>Current Value:</strong> R{comprehensiveData.valuation?.currentEstimate?.average?.toLocaleString()}</p>
                    <p><strong>Owner:</strong> {comprehensiveData.ownership?.transfers?.[0]?.to}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investigation Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Property Data:</span>
                      <Badge variant="default">✅ Complete</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Ownership History:</span>
                      <Badge variant="default">✅ Complete</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Resident Analysis:</span>
                      <Badge variant="default">✅ Complete</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact Information:</span>
                      <Badge variant="default">✅ Complete</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="residents">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Identified Residents & Associated Persons</h3>
              
              {comprehensiveData.residents?.map((resident: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{resident.name}</span>
                      <Badge variant={resident.verified ? "default" : "secondary"}>
                        {resident.verified ? "✅ Verified" : "❓ Unverified"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {resident.role} • ID: {resident.idNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="contact" className="w-full">
                      <TabsList>
                        <TabsTrigger value="contact">📞 Contact</TabsTrigger>
                        <TabsTrigger value="credit">💳 Credit</TabsTrigger>
                        <TabsTrigger value="social">📱 Social</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="contact" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Phone Numbers</h4>
                            {resident.contactInfo?.phones?.map((phone: any, i: number) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-1">
                                <span>{phone.number}</span>
                                <Badge variant={phone.verified ? "default" : "secondary"}>
                                  {phone.carrier} • {phone.verified ? "Verified" : "Unverified"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Email Addresses</h4>
                            {resident.contactInfo?.emails?.map((email: any, i: number) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-1">
                                <span className="truncate">{email.address}</span>
                                <Badge variant={email.verified ? "default" : "secondary"}>
                                  {email.verified ? "Verified" : "Unverified"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="credit" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Credit Score</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-3xl font-bold text-center">
                                {resident.creditProfile?.score}
                              </div>
                              <div className="text-center text-sm text-gray-600">
                                Band: {resident.creditProfile?.band}
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle>Credit Accounts</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {resident.creditProfile?.accounts?.map((account: any, i: number) => (
                                <div key={i} className="flex justify-between items-center p-2 border-b">
                                  <div>
                                    <div className="font-semibold">{account.provider}</div>
                                    <div className="text-sm text-gray-600">{account.type}</div>
                                  </div>
                                  <div className="text-right">
                                    <div>R{account.balance?.toLocaleString()}</div>
                                    <Badge variant={account.status === 'current' ? "default" : "destructive"}>
                                      {account.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="social" className="mt-4">
                        <div className="space-y-2">
                          {resident.contactInfo?.socialMedia?.map((social: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <div>
                                <div className="font-semibold">{social.platform}</div>
                                <div className="text-sm text-gray-600">@{social.username}</div>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant={social.verified ? "default" : "secondary"}>
                                  {social.verified ? "Verified" : "Unverified"}
                                </Badge>
                                <Button variant="outline" size="sm">
                                  <a href={social.profileUrl} target="_blank" rel="noopener noreferrer">
                                    View Profile
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Keep existing tabs with enhanced data */}
          <TabsContent value="ownership">
            {/* Enhanced ownership data display */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Ownership History</CardTitle>
              </CardHeader>
              <CardContent>
                {comprehensiveData.ownership?.transfers?.map((transfer: any, index: number) => (
                  <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{transfer.to}</h4>
                        <p className="text-sm text-gray-600">From: {transfer.from}</p>
                        <p className="text-sm text-gray-600">Date: {transfer.date}</p>
                        <p className="text-sm text-gray-600">Deed: {transfer.deedNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R{transfer.price?.toLocaleString()}</p>
                        <Badge>{transfer.transferType}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation">
            {/* Enhanced valuation display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Valuation Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Low Estimate:</span>
                      <span className="font-semibold">R{comprehensiveData.valuation?.currentEstimate?.low?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average:</span>
                      <span className="font-semibold">R{comprehensiveData.valuation?.currentEstimate?.average?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>High Estimate:</span>
                      <span className="font-semibold">R{comprehensiveData.valuation?.currentEstimate?.high?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span>{Math.round((comprehensiveData.valuation?.currentEstimate?.confidence || 0) * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Market Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Year over Year:</span>
                      <span className="font-semibold text-green-600">+{comprehensiveData.valuation?.marketTrends?.yearOverYear?.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quarter over Quarter:</span>
                      <span className="font-semibold">+{comprehensiveData.valuation?.marketTrends?.quarterOverQuarter?.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6 Month Forecast:</span>
                      <span className="font-semibold">+{comprehensiveData.valuation?.marketTrends?.forecast6Month?.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keep existing intelligence and apis tabs */}
          <TabsContent value="intelligence">
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Property Intelligence</CardTitle>
                <CardDescription>Detailed insights from various sources</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(comprehensiveData?.enhancedData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apis">
            <Card>
              <CardHeader>
                <CardTitle>API Status Overview</CardTitle>
                <CardDescription>Real-time status of integrated APIs</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(comprehensiveData?.enhancedData?.propertyApis, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Search Results Display */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(searchResults, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {!selectedProperty && !comprehensiveData && (
        <Card>
          <CardContent>
            No property selected. Please search for a property to view enhanced intelligence.
          </CardContent>
        </Card>
      )}
    </div>
  );
};
