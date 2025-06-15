
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Building, FileText, Download, Calculator, MapPin, Calendar, DollarSign, Sparkles, Award, Target, BarChart3 } from "lucide-react";
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
    marketCondition: "Stable"
  });

  const [valuationProgress, setValuationProgress] = useState(75);

  const calculateIndexedValue = () => {
    setValuationProgress(0);
    
    // Simulate calculation progress
    const interval = setInterval(() => {
      setValuationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    const years = valuationData.valuationYear - new Date(valuationData.purchaseDate).getFullYear();
    const compoundGrowth = Math.pow(1 + (valuationData.growthRate / 100), years);
    const indexedValue = valuationData.purchasePrice * compoundGrowth;
    
    setTimeout(() => {
      setValuationData({
        ...valuationData,
        currentValue: Math.round(indexedValue)
      });
      toast.success("Indexed value calculated with precision analytics!");
    }, 2000);
  };

  const generateValuationReport = () => {
    toast.success("Generating professional valuation certificate...");
  };

  const totalGrowth = ((valuationData.currentValue / valuationData.purchasePrice - 1) * 100);

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-100/40 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-18 h-18 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-green-600/25 rotate-2 hover:rotate-0 transition-transform duration-300">
                  <TrendingUp className="h-9 w-9 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <Award className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-green-800 to-emerald-700 bg-clip-text text-transparent mb-2">
                  Property Valuation Center
                </h2>
                <p className="text-slate-600 text-lg font-medium">Professional indexed valuation with market analysis</p>
                <div className="flex gap-3 mt-3">
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <Target className="h-3 w-3 mr-1" />
                    Certified Analysis
                  </Badge>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Market Intelligence
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                R {valuationData.currentValue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 font-medium">Current Indexed Value</div>
              <Badge className="mt-2 bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                +{totalGrowth.toFixed(1)}% Growth
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Property Information */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3 text-xl font-bold">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="h-5 w-5 text-green-700" />
            </div>
            <span className="text-slate-900">Property Information</span>
          </CardTitle>
          <CardDescription className="text-slate-600 font-medium">Comprehensive property details for accurate valuation</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-semibold text-slate-700 mb-2 block">Property Address</Label>
              <Input
                id="address"
                value={valuationData.propertyAddress}
                onChange={(e) => setValuationData({...valuationData, propertyAddress: e.target.value})}
                className="border-slate-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="extent" className="text-sm font-semibold text-slate-700 mb-2 block">Extent (m²)</Label>
              <Input
                id="extent"
                value={valuationData.extent}
                onChange={(e) => setValuationData({...valuationData, extent: e.target.value})}
                className="border-slate-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="scheme" className="text-sm font-semibold text-slate-700 mb-2 block">Scheme Number</Label>
              <Input
                id="scheme"
                value={valuationData.schemeNumber}
                onChange={(e) => setValuationData({...valuationData, schemeNumber: e.target.value})}
                className="border-slate-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="section" className="text-sm font-semibold text-slate-700 mb-2 block">Section Number</Label>
              <Input
                id="section"
                value={valuationData.sectionNumber}
                onChange={(e) => setValuationData({...valuationData, sectionNumber: e.target.value})}
                className="border-slate-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="municipality" className="text-sm font-semibold text-slate-700 mb-2 block">Municipality</Label>
              <Input
                id="municipality"
                value={valuationData.municipality}
                onChange={(e) => setValuationData({...valuationData, municipality: e.target.value})}
                className="border-slate-200 focus:border-green-400 focus:ring-green-200 shadow-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50/70 to-emerald-50/70 rounded-xl border border-green-100/50 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-green-900 text-base">Location Summary</div>
                <div className="text-sm text-green-700 font-medium">
                  {valuationData.propertyAddress} • Section {valuationData.sectionNumber} • {valuationData.extent}m² • {valuationData.municipality}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Indexed Value Calculation */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-purple-700" />
                </div>
                <span className="text-slate-900">Indexed Value Calculation</span>
              </CardTitle>
              <CardDescription className="text-slate-600 font-medium">Advanced valuation using compound growth indexing</CardDescription>
            </div>
            <Button onClick={calculateIndexedValue} className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Value
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <Label htmlFor="purchase-price" className="text-sm font-semibold text-slate-700 mb-2 block">Purchase Price (R)</Label>
              <Input
                id="purchase-price"
                type="number"
                value={valuationData.purchasePrice}
                onChange={(e) => setValuationData({...valuationData, purchasePrice: Number(e.target.value)})}
                className="border-slate-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="purchase-date" className="text-sm font-semibold text-slate-700 mb-2 block">Purchase Date</Label>
              <Input
                id="purchase-date"
                type="date"
                value={valuationData.purchaseDate}
                onChange={(e) => setValuationData({...valuationData, purchaseDate: e.target.value})}
                className="border-slate-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="growth-rate" className="text-sm font-semibold text-slate-700 mb-2 block">Annual Growth Rate (%)</Label>
              <Input
                id="growth-rate"
                type="number"
                step="0.1"
                value={valuationData.growthRate}
                onChange={(e) => setValuationData({...valuationData, growthRate: Number(e.target.value)})}
                className="border-slate-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="valuation-year" className="text-sm font-semibold text-slate-700 mb-2 block">Valuation Year</Label>
              <Input
                id="valuation-year"
                type="number"
                value={valuationData.valuationYear}
                onChange={(e) => setValuationData({...valuationData, valuationYear: Number(e.target.value)})}
                className="border-slate-200 focus:border-purple-400 focus:ring-purple-200 shadow-sm"
              />
            </div>
          </div>

          {/* Enhanced Calculation Progress */}
          {valuationProgress > 0 && valuationProgress < 100 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 rounded-xl border border-blue-100/60 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold text-blue-700">Calculating indexed value...</span>
                <span className="text-sm text-blue-600 font-medium">{valuationProgress}%</span>
              </div>
              <Progress value={valuationProgress} className="h-3 bg-blue-100" />
            </div>
          )}

          {/* Enhanced Results Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-blue-100 bg-gradient-to-br from-blue-50/80 to-blue-50/40 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    R {valuationData.purchasePrice.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-blue-700 mb-1">Original Purchase Price</div>
                  <div className="text-xs text-blue-600 mt-1 flex items-center justify-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {valuationData.purchaseDate}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-green-100 bg-gradient-to-br from-green-50/80 to-green-50/40 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-green-100 rounded-xl inline-flex mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    R {valuationData.currentValue.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-green-700 mb-1">Current Indexed Value</div>
                  <div className="text-xs text-green-600">As at {valuationData.valuationYear}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 bg-gradient-to-br from-purple-50/80 to-purple-50/40 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-purple-100 rounded-xl inline-flex mb-3">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {valuationData.growthRate}%
                  </div>
                  <div className="text-sm font-semibold text-purple-700 mb-1">Annual Growth Rate</div>
                  <div className="text-xs text-purple-600">
                    {totalGrowth.toFixed(1)}% total appreciation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/60 p-6 rounded-xl border border-green-100/60 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-green-900 text-lg mb-2">Professional Valuation Summary</div>
                <div className="text-green-800 leading-relaxed font-medium">
                  The indexed valuation of <strong>{valuationData.propertyAddress}</strong> is 
                  <strong> R {valuationData.currentValue.toLocaleString()}</strong> as at {valuationData.valuationYear}, 
                  representing a compound annual growth rate of <strong>{valuationData.growthRate}%</strong> from the original 
                  purchase price of R {valuationData.purchasePrice.toLocaleString()} in {new Date(valuationData.purchaseDate).getFullYear()}.
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-medium px-3 py-1">Certified Valuation</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700 font-medium px-3 py-1">Market Indexed</Badge>
                  <span className="text-sm text-green-700 font-medium">
                    Total appreciation: R {(valuationData.currentValue - valuationData.purchasePrice).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Actions */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="text-xl font-bold text-slate-900">Generate Professional Reports</CardTitle>
          <CardDescription className="text-slate-600 font-medium">Export certified valuation documents and certificates</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-wrap gap-4">
            <Button onClick={generateValuationReport} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200">
              <Download className="h-4 w-4 mr-2" />
              Valuation Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Certificate generation in progress...")} className="border-slate-200 hover:bg-slate-50 shadow-sm">
              <FileText className="h-4 w-4 mr-2" />
              Valuation Certificate
            </Button>
            <Button variant="outline" onClick={() => toast.info("Market analysis coming soon...")} className="border-slate-200 hover:bg-slate-50 shadow-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Market Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
