
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
import { Calculator, MapPin, TrendingUp, Building, FileText, Download, Zap, Target, BarChart3, Clock, Users, DollarSign, AlertCircle, CheckCircle, Star, Award } from "lucide-react";
import { toast } from "sonner";

export const CMAWorkspace = () => {
  const [subjectProperty, setSubjectProperty] = useState({
    address: "Berg Street, Bothasrus",
    scheme: "468/1993",
    section: "4",
    extent: "112",
    bedrooms: "2",
    bathrooms: "2",
    parking: "1",
    propertyType: "Sectional Title",
    condition: "Good",
    specialFeatures: "Mountain views, modern kitchen",
    marketingPeriod: "60"
  });

  const [marketData, setMarketData] = useState({
    searchRadius: "1000",
    timeFrame: "12",
    minPrice: "500000",
    maxPrice: "800000",
    propertyTypes: ["Sectional Title", "Freehold"],
    includeActiveListings: true,
    includeSoldProperties: true
  });

  const [comparables, setComparables] = useState([
    {
      id: 1,
      address: "Cloete Street, Bothasrus",
      price: 695000,
      pricePerSqm: 6205,
      bedrooms: 2,
      bathrooms: 2,
      extent: 112,
      saleDate: "2024-11-15",
      daysOnMarket: 45,
      condition: "Excellent",
      adjustments: {
        condition: 15000,
        view: -5000,
        parking: 0,
        total: 10000
      },
      adjustedPrice: 705000,
      weight: 0.3,
      selected: true
    },
    {
      id: 2,
      address: "Albany Road, Bothasrus",
      price: 620000,
      pricePerSqm: 5536,
      bedrooms: 2,
      bathrooms: 1,
      extent: 112,
      saleDate: "2024-10-28",
      daysOnMarket: 38,
      condition: "Good",
      adjustments: {
        condition: 0,
        view: 8000,
        parking: 15000,
        total: 23000
      },
      adjustedPrice: 643000,
      weight: 0.25,
      selected: true
    },
    {
      id: 3,
      address: "Mill Park, Bothasrus",
      price: 685000,
      pricePerSqm: 6116,
      bedrooms: 2,
      bathrooms: 2,
      extent: 112,
      saleDate: "2024-12-01",
      daysOnMarket: 52,
      condition: "Average",
      adjustments: {
        condition: 25000,
        view: -3000,
        parking: 0,
        total: 22000
      },
      adjustedPrice: 707000,
      weight: 0.25,
      selected: true
    },
    {
      id: 4,
      address: "Mountain View, Bothasrus",
      price: 750000,
      pricePerSqm: 6696,
      bedrooms: 3,
      bathrooms: 2,
      extent: 112,
      saleDate: "2024-11-20",
      daysOnMarket: 29,
      condition: "Excellent",
      adjustments: {
        condition: 5000,
        view: 0,
        parking: -10000,
        total: -5000
      },
      adjustedPrice: 745000,
      weight: 0.2,
      selected: false
    }
  ]);

  const [cmaResults, setCmaResults] = useState({
    lowValue: 643000,
    highValue: 745000,
    recommendedValue: 664000,
    confidence: 85,
    marketTrend: "Stable",
    averageDaysOnMarket: 41,
    pricePerSqm: 5929
  });

  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runCMAAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast.success("CMA analysis completed with 85% confidence rating!");
          return 100;
        }
        return prev + 12.5;
      });
    }, 300);

    // Simulate calculation with weighted adjustments
    const selectedComps = comparables.filter(comp => comp.selected);
    const weightedAverage = selectedComps.reduce((sum, comp) => 
      sum + (comp.adjustedPrice * comp.weight), 0
    ) / selectedComps.reduce((sum, comp) => sum + comp.weight, 0);
    
    setTimeout(() => {
      setCmaResults({
        ...cmaResults,
        recommendedValue: Math.round(weightedAverage),
        confidence: Math.round(85 + Math.random() * 10)
      });
    }, 2400);
  };

  const toggleComparable = (id: number) => {
    setComparables(comparables.map(comp => 
      comp.id === id ? { ...comp, selected: !comp.selected } : comp
    ));
  };

  const updateAdjustment = (id: number, type: string, value: number) => {
    setComparables(comparables.map(comp => {
      if (comp.id === id) {
        const newAdjustments = { ...comp.adjustments, [type]: value };
        const total = Object.values(newAdjustments).reduce((sum: number, val) => 
          typeof val === 'number' ? sum + val : sum, 0
        ) - (newAdjustments.total || 0);
        return {
          ...comp,
          adjustments: { ...newAdjustments, total },
          adjustedPrice: comp.price + total
        };
      }
      return comp;
    }));
  };

  const generateCMAReport = () => {
    toast.success("Generating professional CMA report with comparable analysis...");
  };

  const selectedComps = comparables.filter(comp => comp.selected);

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-purple-50/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-center shadow-lg shadow-slate-300/20">
                  <Calculator className="h-8 w-8 text-slate-700" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <Target className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Comparative Market Analysis
                </h2>
                <p className="text-slate-600 font-medium">Professional property valuation with comparable sales analysis</p>
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 transition-colors">
                    <Award className="h-3 w-3 mr-1" />
                    Certified Analysis
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors">
                    <Star className="h-3 w-3 mr-1" />
                    Market Intelligence
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                R {cmaResults.recommendedValue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Recommended Value</div>
              <Badge className="mt-2 bg-green-50 text-green-700 border-green-200">
                {cmaResults.confidence}% Confidence
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Property Details */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <Building className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Subject Property Details</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Property information for comparative analysis</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-slate-700">Property Address</Label>
              <Input
                id="address"
                value={subjectProperty.address}
                onChange={(e) => setSubjectProperty({...subjectProperty, address: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Extent (m²)</Label>
              <Input
                value={subjectProperty.extent}
                onChange={(e) => setSubjectProperty({...subjectProperty, extent: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Property Type</Label>
              <Select value={subjectProperty.propertyType} onValueChange={(value) => setSubjectProperty({...subjectProperty, propertyType: value})}>
                <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sectional Title">Sectional Title</SelectItem>
                  <SelectItem value="Freehold">Freehold</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Bedrooms</Label>
              <Input
                value={subjectProperty.bedrooms}
                onChange={(e) => setSubjectProperty({...subjectProperty, bedrooms: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Bathrooms</Label>
              <Input
                value={subjectProperty.bathrooms}
                onChange={(e) => setSubjectProperty({...subjectProperty, bathrooms: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Parking</Label>
              <Input
                value={subjectProperty.parking}
                onChange={(e) => setSubjectProperty({...subjectProperty, parking: e.target.value})}
                className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Condition</Label>
              <Select value={subjectProperty.condition} onValueChange={(value) => setSubjectProperty({...subjectProperty, condition: value})}>
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
          </div>
          <div className="mt-4">
            <Label className="text-sm font-medium text-slate-700">Special Features</Label>
            <Textarea
              value={subjectProperty.specialFeatures}
              onChange={(e) => setSubjectProperty({...subjectProperty, specialFeatures: e.target.value})}
              className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-200"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Market Search Parameters */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <MapPin className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Market Search Parameters</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Define criteria for comparable property search</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Search Radius (m)</Label>
              <Input
                type="number"
                value={marketData.searchRadius}
                onChange={(e) => setMarketData({...marketData, searchRadius: e.target.value})}
                className="mt-1 border-slate-200 focus:border-purple-400 focus:ring-purple-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Time Frame (months)</Label>
              <Input
                type="number"
                value={marketData.timeFrame}
                onChange={(e) => setMarketData({...marketData, timeFrame: e.target.value})}
                className="mt-1 border-slate-200 focus:border-purple-400 focus:ring-purple-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Min Price (R)</Label>
              <Input
                type="number"
                value={marketData.minPrice}
                onChange={(e) => setMarketData({...marketData, minPrice: e.target.value})}
                className="mt-1 border-slate-200 focus:border-purple-400 focus:ring-purple-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Max Price (R)</Label>
              <Input
                type="number"
                value={marketData.maxPrice}
                onChange={(e) => setMarketData({...marketData, maxPrice: e.target.value})}
                className="mt-1 border-slate-200 focus:border-purple-400 focus:ring-purple-200"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={marketData.includeActiveListings}
                onCheckedChange={(checked) => setMarketData({...marketData, includeActiveListings: checked})}
              />
              <Label className="text-sm font-medium text-slate-700">Include Active Listings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={marketData.includeSoldProperties}
                onCheckedChange={(checked) => setMarketData({...marketData, includeSoldProperties: checked})}
              />
              <Label className="text-sm font-medium text-slate-700">Include Sold Properties</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CMA Analysis */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
                  <Zap className="h-5 w-5 text-slate-700" />
                </div>
                <span className="text-slate-900">CMA Analysis Engine</span>
              </CardTitle>
              <CardDescription className="text-slate-600">Advanced comparative analysis with weighted adjustments</CardDescription>
            </div>
            <Button 
              onClick={runCMAAnalysis} 
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isAnalyzing && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Analyzing comparable properties...</span>
                <span className="text-sm text-blue-600">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2 bg-blue-100" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="text-xl font-bold text-slate-900">R {cmaResults.lowValue.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Low Range</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200/50">
              <div className="text-xl font-bold text-green-700">R {cmaResults.recommendedValue.toLocaleString()}</div>
              <div className="text-sm text-green-600">Recommended</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="text-xl font-bold text-slate-900">R {cmaResults.highValue.toLocaleString()}</div>
              <div className="text-sm text-slate-600">High Range</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200/50">
              <div className="text-xl font-bold text-blue-700">{cmaResults.confidence}%</div>
              <div className="text-sm text-blue-600">Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparable Properties */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-orange-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 rounded-lg border border-slate-200/50">
              <BarChart3 className="h-5 w-5 text-slate-700" />
            </div>
            <span className="text-slate-900">Comparable Properties ({selectedComps.length} selected)</span>
          </CardTitle>
          <CardDescription className="text-slate-600">Review and adjust comparable property data</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {comparables.map((comp) => (
              <div key={comp.id} className={`p-6 rounded-xl border transition-all duration-200 ${
                comp.selected 
                  ? "border-green-200 bg-green-50/50 shadow-md" 
                  : "border-slate-200 bg-slate-50/30 hover:bg-slate-50"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={comp.selected}
                        onChange={() => toggleComparable(comp.id)}
                        className="w-4 h-4 text-green-600 rounded border-slate-300"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{comp.address}</div>
                      <div className="text-sm text-slate-600">
                        {comp.bedrooms} bed • {comp.bathrooms} bath • {comp.extent}m² • {comp.condition}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-slate-900">R {comp.price.toLocaleString()}</div>
                    <div className="text-sm text-slate-600">R {comp.pricePerSqm.toLocaleString()}/m²</div>
                    <Badge variant="outline" className="mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {comp.daysOnMarket} days
                    </Badge>
                  </div>
                </div>

                {comp.selected && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200/50">
                    <div className="text-sm font-medium text-slate-700 mb-3">Adjustments</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs text-slate-600">Condition</Label>
                        <Input
                          type="number"
                          value={comp.adjustments.condition}
                          onChange={(e) => updateAdjustment(comp.id, 'condition', Number(e.target.value))}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">View</Label>
                        <Input
                          type="number"
                          value={comp.adjustments.view}
                          onChange={(e) => updateAdjustment(comp.id, 'view', Number(e.target.value))}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Parking</Label>
                        <Input
                          type="number"
                          value={comp.adjustments.parking}
                          onChange={(e) => updateAdjustment(comp.id, 'parking', Number(e.target.value))}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Adjusted Price</Label>
                        <div className="h-8 flex items-center text-sm font-medium text-green-700">
                          R {comp.adjustedPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Reports */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="text-slate-900">Generate CMA Reports</CardTitle>
          <CardDescription className="text-slate-600">Professional comparative market analysis documentation</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button onClick={generateCMAReport} className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Full CMA Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Executive summary generating...")} className="border-slate-200 hover:bg-slate-50">
              <Download className="h-4 w-4 mr-2" />
              Executive Summary
            </Button>
            <Button variant="outline" onClick={() => toast.info("Comparable grid exporting...")} className="border-slate-200 hover:bg-slate-50">
              <BarChart3 className="h-4 w-4 mr-2" />
              Comparable Grid
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
