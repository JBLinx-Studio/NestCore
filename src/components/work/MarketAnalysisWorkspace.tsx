
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapPin, TrendingUp, BarChart3, Download, FileText, Zap, Target, Clock, DollarSign, Users, Building, Star, Award, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const MarketAnalysisWorkspace = () => {
  const [analysisData, setAnalysisData] = useState({
    area: "Berg Street, Bothasrus",
    radius: 600,
    timeFrame: "12",
    propertyTypes: ["Sectional Title", "Freehold"],
    priceRange: { min: 400000, max: 900000 },
    includeActiveListings: true,
    includePendingSales: true,
    includeSoldProperties: true
  });

  const [marketMetrics, setMarketMetrics] = useState({
    averagePrice: 664000,
    medianPrice: 650000,
    priceGrowth: 5.2,
    timeOnMarket: 65,
    salesVolume: 24,
    pricePerSqm: 5929,
    absorptionRate: 3.2,
    inventoryLevel: 2.8,
    marketVelocity: 78
  });

  const [priceDistribution, setPriceDistribution] = useState([
    { range: "R 375,000 - R 425,999", count: 3, percentage: 10, avgDays: 72 },
    { range: "R 426,000 - R 476,999", count: 0, percentage: 0, avgDays: 0 },
    { range: "R 477,000 - R 527,999", count: 3, percentage: 10, avgDays: 58 },
    { range: "R 528,000 - R 578,999", count: 0, percentage: 0, avgDays: 0 },
    { range: "R 579,000 - R 629,999", count: 8, percentage: 28, avgDays: 45 },
    { range: "R 630,000 - R 680,999", count: 3, percentage: 10, avgDays: 62 },
    { range: "R 681,000 - R 731,999", count: 8, percentage: 28, avgDays: 38 },
    { range: "R 732,000 - R 782,999", count: 1, percentage: 5, avgDays: 89 },
    { range: "R 783,000 - R 833,999", count: 0, percentage: 0, avgDays: 0 },
    { range: "R 834,000 - R 884,000", count: 3, percentage: 9, avgDays: 125 }
  ]);

  const [marketTrends, setMarketTrends] = useState([
    { period: "Q1 2024", avgPrice: 620000, volume: 8, growth: 2.1 },
    { period: "Q2 2024", avgPrice: 635000, volume: 6, growth: 2.4 },
    { period: "Q3 2024", avgPrice: 648000, volume: 5, growth: 2.0 },
    { period: "Q4 2024", avgPrice: 664000, volume: 5, growth: 2.5 }
  ]);

  const [competitiveAnalysis, setCompetitiveAnalysis] = useState([
    { area: "Bothasrus Central", avgPrice: 664000, volume: 24, timeOnMarket: 65, trend: "Stable" },
    { area: "Mill Park", avgPrice: 725000, volume: 18, timeOnMarket: 45, trend: "Rising" },
    { area: "Lemmerville", avgPrice: 598000, volume: 32, timeOnMarket: 78, trend: "Declining" },
    { area: "Summerstrand", avgPrice: 890000, volume: 14, timeOnMarket: 92, trend: "Volatile" }
  ]);

  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runMarketAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast.success("Market analysis completed with comprehensive insights!");
          return 100;
        }
        return prev + 10;
      });
    }, 350);

    // Simulate data updates during analysis
    setTimeout(() => {
      setMarketMetrics(prev => ({
        ...prev,
        marketVelocity: 78 + Math.round(Math.random() * 10),
        absorptionRate: 3.2 + (Math.random() * 0.5)
      }));
    }, 3500);
  };

  const generateMarketReport = () => {
    toast.success("Generating comprehensive market analysis report...");
  };

  const exportPriceDistribution = () => {
    toast.success("Exporting detailed price distribution analysis...");
  };

  const maxPercentage = Math.max(...priceDistribution.map(r => r.percentage));
  const totalSales = priceDistribution.reduce((sum, r) => sum + r.count, 0);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Rising": return "text-green-600 bg-green-50 border-green-200";
      case "Declining": return "text-red-600 bg-red-50 border-red-200";
      case "Volatile": return "text-orange-600 bg-orange-50 border-orange-200";
      default: return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-purple-50/30 to-blue-50/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-center shadow-lg shadow-slate-300/20">
                  <BarChart3 className="h-8 w-8 text-slate-700" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <Target className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Market Analysis Center
                </h2>
                <p className="text-slate-600 font-medium">Comprehensive market intelligence and trend analysis</p>
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 transition-colors">
                    <Award className="h-3 w-3 mr-1" />
                    Professional Analysis
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors">
                    <Star className="h-3 w-3 mr-1" />
                    Market Intelligence
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                R {marketMetrics.averagePrice.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Average Market Price</div>
              <Badge className="mt-2 bg-green-50 text-green-700 border-green-200">
                +{marketMetrics.priceGrowth}% Growth
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Market Area Configuration */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
                  <MapPin className="h-5 w-5 text-slate-700" />
                </div>
                <span className="text-slate-900">Market Analysis Parameters</span>
              </CardTitle>
              <CardDescription className="text-slate-600">Define geographical and temporal scope for analysis</CardDescription>
            </div>
            <Button 
              onClick={runMarketAnalysis} 
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isAnalyzing && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Processing market data...</span>
                <span className="text-sm text-blue-600">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2 bg-blue-100" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Label className="text-sm font-medium text-slate-700">Target Area</Label>
              <Input
                value={analysisData.area}
                onChange={(e) => setAnalysisData({...analysisData, area: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Radius (meters)</Label>
              <Input
                type="number"
                value={analysisData.radius}
                onChange={(e) => setAnalysisData({...analysisData, radius: Number(e.target.value)})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Time Frame (months)</Label>
              <Select value={analysisData.timeFrame} onValueChange={(value) => setAnalysisData({...analysisData, timeFrame: value})}>
                <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                  <SelectItem value="36">36 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Min Price (R)</Label>
              <Input
                type="number"
                value={analysisData.priceRange.min}
                onChange={(e) => setAnalysisData({...analysisData, priceRange: {...analysisData.priceRange, min: Number(e.target.value)}})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Max Price (R)</Label>
              <Input
                type="number"
                value={analysisData.priceRange.max}
                onChange={(e) => setAnalysisData({...analysisData, priceRange: {...analysisData.priceRange, max: Number(e.target.value)}})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={analysisData.includeActiveListings}
                onCheckedChange={(checked) => setAnalysisData({...analysisData, includeActiveListings: checked})}
              />
              <Label className="text-sm font-medium text-slate-700">Active Listings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={analysisData.includePendingSales}
                onCheckedChange={(checked) => setAnalysisData({...analysisData, includePendingSales: checked})}
              />
              <Label className="text-sm font-medium text-slate-700">Pending Sales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={analysisData.includeSoldProperties}
                onCheckedChange={(checked) => setAnalysisData({...analysisData, includeSoldProperties: checked})}
              />
              <Label className="text-sm font-medium text-slate-700">Sold Properties</Label>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-slate-50/70 to-blue-50/70 rounded-xl border border-slate-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
                <Target className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <div className="font-medium text-slate-900">Analysis Scope</div>
                <div className="text-sm text-slate-700">
                  {analysisData.radius}m radius around "{analysisData.area}" • {analysisData.timeFrame} months • 
                  R {analysisData.priceRange.min.toLocaleString()} - R {analysisData.priceRange.max.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Statistics Dashboard */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <TrendingUp className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Market Performance Metrics</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Key indicators and performance statistics</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200/50">
              <div className="text-xl font-bold text-green-700">
                R {marketMetrics.averagePrice.toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Average Price</div>
              <div className="text-xs text-green-500 mt-1">+{marketMetrics.priceGrowth}% YoY</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200/50">
              <div className="text-xl font-bold text-blue-700">
                R {marketMetrics.medianPrice.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Median Price</div>
              <div className="text-xs text-blue-500 mt-1">50th percentile</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200/50">
              <div className="text-xl font-bold text-purple-700">
                {marketMetrics.timeOnMarket}
              </div>
              <div className="text-sm text-purple-600">Days on Market</div>
              <div className="text-xs text-purple-500 mt-1">Average</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200/50">
              <div className="text-xl font-bold text-orange-700">
                {marketMetrics.salesVolume}
              </div>
              <div className="text-sm text-orange-600">Sales Volume</div>
              <div className="text-xs text-orange-500 mt-1">12 months</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200/50">
              <div className="text-xl font-bold text-red-700">
                R {marketMetrics.pricePerSqm.toLocaleString()}
              </div>
              <div className="text-sm text-red-600">Price per m²</div>
              <div className="text-xs text-red-500 mt-1">Average</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="text-lg font-bold text-slate-700">{marketMetrics.absorptionRate}</div>
              <div className="text-sm text-slate-600">Absorption Rate (months)</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="text-lg font-bold text-slate-700">{marketMetrics.inventoryLevel}</div>
              <div className="text-sm text-slate-600">Inventory Level (months)</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="text-lg font-bold text-slate-700">{marketMetrics.marketVelocity}%</div>
              <div className="text-sm text-slate-600">Market Velocity Index</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Distribution Analysis */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
                  <BarChart3 className="h-5 w-5 text-slate-700" />
                </div>
                <span className="text-slate-900">Price Distribution Analysis</span>
              </CardTitle>
              <CardDescription className="text-slate-600">Property price ranges and market activity</CardDescription>
            </div>
            <Button onClick={exportPriceDistribution} variant="outline" className="border-slate-200 hover:bg-slate-50">
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {priceDistribution.map((range, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-48 text-sm font-medium text-slate-900">
                  {range.range}
                </div>
                <div className="flex-1 bg-slate-200 rounded-full h-6 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium transition-all duration-500"
                    style={{ width: `${Math.max((range.percentage / maxPercentage) * 100, 5)}%` }}
                  >
                    {range.percentage > 0 && `${range.percentage}%`}
                  </div>
                </div>
                <div className="w-20 text-sm text-slate-700 text-center">
                  {range.count} sales
                </div>
                <div className="w-20 text-sm text-slate-600 text-center">
                  {range.avgDays > 0 ? `${range.avgDays} days` : '-'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-slate-50/80 to-purple-50/60 rounded-xl border border-slate-200/50">
            <div className="text-sm text-slate-700">
              <strong>Distribution Summary:</strong> The market shows highest activity in the R 579,000 - R 629,999 
              and R 681,000 - R 731,999 ranges, each representing 28% of total sales ({totalSales} properties). 
              Properties in these ranges also show the fastest turnover with average days on market below the area average.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Market Analysis */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-orange-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <Building className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Competitive Area Analysis</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Comparison with neighboring markets</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {competitiveAnalysis.map((area, index) => (
              <div key={index} className="p-4 rounded-xl border border-slate-200/50 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900 text-lg">{area.area}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {area.volume} sales • {area.timeOnMarket} days avg. market time
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-slate-900">
                      R {area.avgPrice.toLocaleString()}
                    </div>
                    <Badge className={`mt-2 ${getTrendColor(area.trend)}`}>
                      {area.trend === "Rising" && <TrendingUp className="h-3 w-3 mr-1" />}
                      {area.trend === "Declining" && <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                      {area.trend === "Volatile" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {area.trend === "Stable" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {area.trend}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights & Recommendations */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <Star className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Market Insights & Recommendations</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Professional analysis and strategic recommendations</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <div className="font-medium text-green-900 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Strong Market Foundation
              </div>
              <div className="text-sm text-green-700 mt-1">
                The area demonstrates robust fundamentals with {marketMetrics.priceGrowth}% annual growth and 
                healthy absorption rate of {marketMetrics.absorptionRate} months, indicating balanced supply-demand dynamics.
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <div className="font-medium text-blue-900 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Optimal Price Positioning
              </div>
              <div className="text-sm text-blue-700 mt-1">
                Properties priced between R 579,000 - R 731,999 capture 56% of market activity with faster 
                turnover rates. This range offers optimal balance of buyer interest and value appreciation.
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <div className="font-medium text-purple-900 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Market Opportunity
              </div>
              <div className="text-sm text-purple-700 mt-1">
                With {marketMetrics.timeOnMarket} days average time on market and {marketMetrics.marketVelocity}% 
                velocity index, the market shows good liquidity and buyer confidence. Strategic pricing can leverage current momentum.
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
              <div className="font-medium text-orange-900 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Timing Considerations
              </div>
              <div className="text-sm text-orange-700 mt-1">
                Current inventory levels at {marketMetrics.inventoryLevel} months suggest neither oversupply nor shortage. 
                Market conditions favor both buyers and sellers with reasonable negotiation opportunities.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Reports */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="text-slate-900">Generate Market Reports</CardTitle>
          <CardDescription className="text-slate-600">Comprehensive market analysis documentation</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button onClick={generateMarketReport} className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Full Market Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Trends analysis generating...")} className="border-slate-200 hover:bg-slate-50">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trends Analysis
            </Button>
            <Button variant="outline" onClick={() => toast.info("Comparable analysis exporting...")} className="border-slate-200 hover:bg-slate-50">
              <BarChart3 className="h-4 w-4 mr-2" />
              Competitive Analysis
            </Button>
            <Button variant="outline" onClick={() => toast.info("Executive summary generating...")} className="border-slate-200 hover:bg-slate-50">
              <Download className="h-4 w-4 mr-2" />
              Executive Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
