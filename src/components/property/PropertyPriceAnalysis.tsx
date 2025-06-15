
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Building,
  Calculator,
  BarChart3,
  Target,
  Clock
} from "lucide-react";
import { PropertyLocation } from "@/services/OpenStreetMapService";
import { advancedPropertyDataService, PropertyPriceAnalysis, AreaMarketData } from "@/services/AdvancedPropertyDataService";

interface PropertyPriceAnalysisProps {
  property: PropertyLocation;
  radius?: number;
}

export const PropertyPriceAnalysisComponent = ({ property, radius = 1000 }: PropertyPriceAnalysisProps) => {
  const [priceAnalysis, setPriceAnalysis] = useState<PropertyPriceAnalysis | null>(null);
  const [areaMarketData, setAreaMarketData] = useState<AreaMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(radius);

  useEffect(() => {
    loadPriceAnalysis();
  }, [property, selectedRadius]);

  const loadPriceAnalysis = async () => {
    setIsLoading(true);
    try {
      const [priceData, marketData] = await Promise.all([
        advancedPropertyDataService.getPriceAnalysisWithinRadius(property.lat, property.lon, selectedRadius),
        advancedPropertyDataService.getAreaMarketData(property.lat, property.lon, selectedRadius)
      ]);
      
      setPriceAnalysis(priceData);
      setAreaMarketData(marketData);
    } catch (error) {
      console.error('Price analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-ZA').format(num);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const getInvestmentGradeColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    if (score >= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-green-600" />
              <span>Property Price Analysis</span>
              <Badge className="bg-blue-100 text-blue-800">Within {selectedRadius}m</Badge>
            </div>
            <div className="flex items-center space-x-2">
              {[500, 1000, 1500, 2000].map((r) => (
                <Button
                  key={r}
                  variant={selectedRadius === r ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRadius(r)}
                >
                  {r}m
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4">
            <p className="text-sm text-blue-800 font-medium">🎯 Analysis Center:</p>
            <p className="text-xs text-blue-700">{property.displayName}</p>
            <p className="text-xs text-blue-600">
              Analyzing properties within {selectedRadius}m radius
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Analyzing property prices...</p>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="comparables">Comparables</TabsTrigger>
                <TabsTrigger value="market">Market Data</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {priceAnalysis ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Average Price</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(priceAnalysis.averagePrice)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Based on {priceAnalysis.saleCount} properties
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Median Price</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(priceAnalysis.medianPrice)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Middle market value
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Price per m²</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {formatCurrency(priceAnalysis.pricePerSqm)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Per square meter
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Market Trend</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getTrendIcon(priceAnalysis.marketTrend)}</span>
                          <span className="text-lg font-bold capitalize text-orange-600">
                            {priceAnalysis.marketTrend}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium">❌ Price Analysis Data Unavailable</p>
                    <p className="text-sm text-red-700 mt-2">
                      Real property price analysis requires integration with property databases like:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 mt-1 space-y-1">
                      <li>Lightstone Property Data</li>
                      <li>Property24 Sales Data</li>
                      <li>Deeds Office Transfer Records</li>
                    </ul>
                  </div>
                )}

                {priceAnalysis && priceAnalysis.priceRange && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Price Range Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Lowest Price:</span>
                          <p className="text-xl font-bold text-red-600">
                            {formatCurrency(priceAnalysis.priceRange.min)}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Highest Price:</span>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(priceAnalysis.priceRange.max)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Min</span>
                          <span>Avg: {formatCurrency(priceAnalysis.averagePrice)}</span>
                          <span>Max</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="comparables" className="space-y-4">
                {priceAnalysis && priceAnalysis.comparableProperties.length > 0 ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Comparable Properties</h3>
                    {priceAnalysis.comparableProperties.map((comp, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium">{comp.address}</p>
                              <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                                <div>Distance: {formatNumber(comp.distance)}m</div>
                                <div>Similarity: {(comp.similarity * 100).toFixed(0)}%</div>
                                <div>Bedrooms: {comp.bedrooms}</div>
                                <div>Bathrooms: {comp.bathrooms}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                {formatCurrency(comp.price)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatCurrency(comp.pricePerSqm)}/m²
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 font-medium">⚠️ No Comparable Properties Found</p>
                    <p className="text-sm text-yellow-700 mt-2">
                      Try expanding the search radius or check if property data APIs are configured.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="market" className="space-y-4">
                {areaMarketData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Building className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Total Properties</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">
                            {formatNumber(areaMarketData.totalProperties)}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Area Average</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(areaMarketData.averagePrice)}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium">Area Median</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">
                            {formatCurrency(areaMarketData.medianPrice)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {areaMarketData.priceHistory.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span>Price History</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {areaMarketData.priceHistory.map((period, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span className="font-medium">{period.period}</span>
                                <div className="text-right">
                                  <p className="font-bold">{formatCurrency(period.averagePrice)}</p>
                                  <p className="text-sm text-gray-500">{period.saleVolume} sales</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium">❌ Market Data Unavailable</p>
                    <p className="text-sm text-red-700 mt-2">
                      Area market analysis requires property transaction databases.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="investment" className="space-y-4">
                {areaMarketData?.investmentPotential ? (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <BarChart3 className="h-5 w-5 text-green-600" />
                          <span>Investment Score</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-2xl font-bold ${getInvestmentGradeColor(areaMarketData.investmentPotential.score)}`}>
                            {areaMarketData.investmentPotential.score}/10
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                          <div 
                            className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all"
                            style={{ width: `${areaMarketData.investmentPotential.score * 10}%` }}
                          ></div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Investment Factors:</h4>
                          {areaMarketData.investmentPotential.factors.map((factor, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm">{factor}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium">Forecast: 
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              areaMarketData.investmentPotential.forecast === 'positive' ? 'bg-green-100 text-green-800' :
                              areaMarketData.investmentPotential.forecast === 'negative' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {areaMarketData.investmentPotential.forecast}
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 font-medium">⚠️ Investment Analysis Unavailable</p>
                    <p className="text-sm text-yellow-700 mt-2">
                      Investment potential analysis requires historical market data and trend analysis.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
