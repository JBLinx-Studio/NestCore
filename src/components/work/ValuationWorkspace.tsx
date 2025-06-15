
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
import { TrendingUp, Building, FileText, Download, Calculator, MapPin, Calendar, DollarSign, Zap, Award, Target, BarChart3, Clock, AlertCircle, CheckCircle, Star } from "lucide-react";
import { toast } from "sonner";

export const ValuationWorkspace = () => {
  const [valuationData, setValuationData] = useState({
    propertyAddress: "Berg Street, Bothasrus",
    schemeNumber: "468/1993",
    sectionNumber: "4",
    extent: "112",
    municipality: "Nelson Mandela Bay",
    province: "Eastern Cape",
    purchasePrice: 610000,
    purchaseDate: "2019-12-07",
    currentValue: 715718,
    valuationYear: 2025,
    growthRate: 2.7,
    marketCondition: "Stable",
    propertyType: "Sectional Title",
    condition: "Good",
    specialFeatures: "Mountain views, modern renovations"
  });

  const [valuationMethods, setValuationMethods] = useState({
    costApproach: {
      enabled: true,
      landValue: 200000,
      buildingCost: 450000,
      depreciation: 15,
      result: 582500,
      weight: 0.2
    },
    salesComparison: {
      enabled: true,
      comparable1: 695000,
      comparable2: 645000,
      comparable3: 720000,
      adjustments: 25000,
      result: 686667,
      weight: 0.6
    },
    incomeApproach: {
      enabled: false,
      monthlyRental: 8500,
      annualIncome: 102000,
      capitalizationRate: 8.5,
      result: 1200000,
      weight: 0.2
    }
  });

  const [marketAnalysis, setMarketAnalysis] = useState({
    supplyDemand: "Balanced",
    priceGrowthTrend: "Stable",
    marketActivity: "Moderate",
    timeOnMarket: 65,
    salesVolume: 24,
    priceVariance: 12.5,
    marketConfidence: 78
  });

  const [valuationProgress, setValuationProgress] = useState(0);
  const [isValuating, setIsValuating] = useState(false);

  const calculateWeightedValue = () => {
    const methods = Object.values(valuationMethods).filter(method => method.enabled);
    const totalWeight = methods.reduce((sum, method) => sum + method.weight, 0);
    const weightedSum = methods.reduce((sum, method) => sum + (method.result * method.weight), 0);
    return Math.round(weightedSum / totalWeight);
  };

  const runValuationAnalysis = () => {
    setIsValuating(true);
    setValuationProgress(0);
    
    const interval = setInterval(() => {
      setValuationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValuating(false);
          toast.success("Professional valuation completed with comprehensive analysis!");
          return 100;
        }
        return prev + 8.33;
      });
    }, 400);

    // Update valuation methods with realistic calculations
    setTimeout(() => {
      const years = valuationData.valuationYear - new Date(valuationData.purchaseDate).getFullYear();
      const compoundGrowth = Math.pow(1 + (valuationData.growthRate / 100), years);
      const indexedValue = valuationData.purchasePrice * compoundGrowth;
      
      setValuationData({
        ...valuationData,
        currentValue: Math.round(indexedValue)
      });

      // Update sales comparison method
      setValuationMethods(prev => ({
        ...prev,
        salesComparison: {
          ...prev.salesComparison,
          result: Math.round(indexedValue * (0.95 + Math.random() * 0.1))
        }
      }));
    }, 4800);
  };

  const updateMethodWeight = (method: string, weight: number) => {
    setValuationMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method as keyof typeof prev],
        weight: weight
      }
    }));
  };

  const toggleMethod = (method: string) => {
    setValuationMethods(prev => ({
      ...prev,
      [method]: {
        ...prev[method as keyof typeof prev],
        enabled: !prev[method as keyof typeof prev].enabled
      }
    }));
  };

  const generateValuationReport = () => {
    toast.success("Generating comprehensive valuation certificate...");
  };

  const finalValue = calculateWeightedValue();
  const confidenceScore = marketAnalysis.marketConfidence;

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-emerald-50/30 to-green-50/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-center shadow-lg shadow-slate-300/20">
                  <TrendingUp className="h-8 w-8 text-slate-700" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <Award className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Professional Property Valuation
                </h2>
                <p className="text-slate-600 font-medium">Multi-method valuation with market analysis</p>
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 transition-colors">
                    <Target className="h-3 w-3 mr-1" />
                    Certified Analysis
                  </Badge>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors">
                    <Star className="h-3 w-3 mr-1" />
                    Professional Grade
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                R {finalValue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Final Valuation</div>
              <Badge className="mt-2 bg-green-50 text-green-700 border-green-200">
                {confidenceScore}% Confidence
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Property Information */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <Building className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Property Information</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Comprehensive property details for valuation</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Label className="text-sm font-medium text-slate-700">Property Address</Label>
              <Input
                value={valuationData.propertyAddress}
                onChange={(e) => setValuationData({...valuationData, propertyAddress: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Extent (m²)</Label>
              <Input
                value={valuationData.extent}
                onChange={(e) => setValuationData({...valuationData, extent: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Property Type</Label>
              <Select value={valuationData.propertyType} onValueChange={(value) => setValuationData({...valuationData, propertyType: value})}>
                <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sectional Title">Sectional Title</SelectItem>
                  <SelectItem value="Freehold">Freehold</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Condition</Label>
              <Select value={valuationData.condition} onValueChange={(value) => setValuationData({...valuationData, condition: value})}>
                <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Municipality</Label>
              <Input
                value={valuationData.municipality}
                onChange={(e) => setValuationData({...valuationData, municipality: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Label className="text-sm font-medium text-slate-700">Special Features</Label>
            <Textarea
              value={valuationData.specialFeatures}
              onChange={(e) => setValuationData({...valuationData, specialFeatures: e.target.value})}
              className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              rows={2}
            />
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-slate-50/70 to-blue-50/70 rounded-xl border border-slate-200/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
                <MapPin className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <div className="font-medium text-slate-900">Location Summary</div>
                <div className="text-sm text-slate-700">
                  {valuationData.propertyAddress} • {valuationData.extent}m² • {valuationData.municipality}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Methods */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
                  <Calculator className="h-5 w-5 text-slate-700" />
                </div>
                <span className="text-slate-900">Valuation Methods</span>
              </CardTitle>
              <CardDescription className="text-slate-600">Multiple approaches for comprehensive valuation</CardDescription>
            </div>
            <Button 
              onClick={runValuationAnalysis} 
              disabled={isValuating}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isValuating ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isValuating && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Processing valuation methods...</span>
                <span className="text-sm text-blue-600">{valuationProgress}%</span>
              </div>
              <Progress value={valuationProgress} className="h-2 bg-blue-100" />
            </div>
          )}

          <div className="space-y-6">
            {/* Sales Comparison Approach */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              valuationMethods.salesComparison.enabled 
                ? "border-green-200 bg-green-50/50" 
                : "border-slate-200 bg-slate-50/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={valuationMethods.salesComparison.enabled}
                    onCheckedChange={() => toggleMethod('salesComparison')}
                  />
                  <div>
                    <div className="font-semibold text-slate-900">Sales Comparison Approach</div>
                    <div className="text-sm text-slate-600">Based on recent comparable sales</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-slate-900">
                    R {valuationMethods.salesComparison.result.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    Weight: {(valuationMethods.salesComparison.weight * 100)}%
                  </div>
                </div>
              </div>
              
              {valuationMethods.salesComparison.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <Label className="text-xs text-slate-600">Comparable 1</Label>
                    <Input
                      type="number"
                      value={valuationMethods.salesComparison.comparable1}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Comparable 2</Label>
                    <Input
                      type="number"
                      value={valuationMethods.salesComparison.comparable2}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Comparable 3</Label>
                    <Input
                      type="number"
                      value={valuationMethods.salesComparison.comparable3}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Weight (%)</Label>
                    <Input
                      type="number"
                      value={valuationMethods.salesComparison.weight * 100}
                      onChange={(e) => updateMethodWeight('salesComparison', Number(e.target.value) / 100)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cost Approach */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              valuationMethods.costApproach.enabled 
                ? "border-blue-200 bg-blue-50/50" 
                : "border-slate-200 bg-slate-50/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={valuationMethods.costApproach.enabled}
                    onCheckedChange={() => toggleMethod('costApproach')}
                  />
                  <div>
                    <div className="font-semibold text-slate-900">Cost Approach</div>
                    <div className="text-sm text-slate-600">Land value plus depreciated building cost</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-slate-900">
                    R {valuationMethods.costApproach.result.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    Weight: {(valuationMethods.costApproach.weight * 100)}%
                  </div>
                </div>
              </div>
              
              {valuationMethods.costApproach.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <Label className="text-xs text-slate-600">Land Value</Label>
                    <Input
                      type="number"
                      value={valuationMethods.costApproach.landValue}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Building Cost</Label>
                    <Input
                      type="number"
                      value={valuationMethods.costApproach.buildingCost}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Depreciation (%)</Label>
                    <Input
                      type="number"
                      value={valuationMethods.costApproach.depreciation}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Weight (%)</Label>
                    <Input
                      type="number"
                      value={valuationMethods.costApproach.weight * 100}
                      onChange={(e) => updateMethodWeight('costApproach', Number(e.target.value) / 100)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Income Approach */}
            <div className={`p-6 rounded-xl border transition-all duration-200 ${
              valuationMethods.incomeApproach.enabled 
                ? "border-purple-200 bg-purple-50/50" 
                : "border-slate-200 bg-slate-50/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={valuationMethods.incomeApproach.enabled}
                    onCheckedChange={() => toggleMethod('incomeApproach')}
                  />
                  <div>
                    <div className="font-semibold text-slate-900">Income Approach</div>
                    <div className="text-sm text-slate-600">Capitalization of rental income</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-slate-900">
                    R {valuationMethods.incomeApproach.result.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    Weight: {(valuationMethods.incomeApproach.weight * 100)}%
                  </div>
                </div>
              </div>
              
              {valuationMethods.incomeApproach.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <Label className="text-xs text-slate-600">Monthly Rental</Label>
                    <Input
                      type="number"
                      value={valuationMethods.incomeApproach.monthlyRental}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Annual Income</Label>
                    <Input
                      type="number"
                      value={valuationMethods.incomeApproach.annualIncome}
                      className="h-8 text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Cap Rate (%)</Label>
                    <Input
                      type="number"
                      value={valuationMethods.incomeApproach.capitalizationRate}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600">Weight (%)</Label>
                    <Input
                      type="number"
                      value={valuationMethods.incomeApproach.weight * 100}
                      onChange={(e) => updateMethodWeight('incomeApproach', Number(e.target.value) / 100)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Final Valuation Summary */}
          <div className="mt-6 p-6 bg-gradient-to-r from-slate-50/80 to-green-50/60 rounded-xl border border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-lg mb-1">Final Valuation Summary</div>
                <div className="text-slate-700 text-sm">
                  Weighted average based on selected methods with {confidenceScore}% confidence
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">R {finalValue.toLocaleString()}</div>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Professional Grade
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-orange-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <BarChart3 className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Market Analysis</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Current market conditions and trends</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="text-lg font-bold text-slate-900">{marketAnalysis.supplyDemand}</div>
              <div className="text-sm text-slate-600">Supply/Demand</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200/50">
              <div className="text-lg font-bold text-green-700">{marketAnalysis.priceGrowthTrend}</div>
              <div className="text-sm text-green-600">Price Trend</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200/50">
              <div className="text-lg font-bold text-blue-700">{marketAnalysis.timeOnMarket} days</div>
              <div className="text-sm text-blue-600">Avg. Time on Market</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200/50">
              <div className="text-lg font-bold text-purple-700">{marketAnalysis.salesVolume}</div>
              <div className="text-sm text-purple-600">Sales Volume (12m)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Reports */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="text-slate-900">Generate Professional Reports</CardTitle>
          <CardDescription className="text-slate-600">Export certified valuation documents and certificates</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button onClick={generateValuationReport} className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Full Valuation Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Certificate generation in progress...")} className="border-slate-200 hover:bg-slate-50">
              <Award className="h-4 w-4 mr-2" />
              Valuation Certificate
            </Button>
            <Button variant="outline" onClick={() => toast.info("Market analysis exporting...")} className="border-slate-200 hover:bg-slate-50">
              <TrendingUp className="h-4 w-4 mr-2" />
              Market Analysis
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
