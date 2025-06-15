
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Building, FileText, Download, Calculator, MapPin, Calendar, DollarSign, Sparkles } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100/40 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Property Valuation Center</h2>
                <p className="text-gray-600">Professional indexed valuation with market analysis</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">R {valuationData.currentValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Current Indexed Value</div>
              <Badge className="mt-1 bg-green-50 text-green-700 border-green-200">
                <Sparkles className="h-3 w-3 mr-1" />
                +{totalGrowth.toFixed(1)}% Growth
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Property Information */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building className="h-5 w-5 text-gray-700" />
            <span>Property Information</span>
          </CardTitle>
          <CardDescription>Comprehensive property details for accurate valuation</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">Property Address</Label>
              <Input
                id="address"
                value={valuationData.propertyAddress}
                onChange={(e) => setValuationData({...valuationData, propertyAddress: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="extent" className="text-sm font-medium text-gray-700">Extent (m²)</Label>
              <Input
                id="extent"
                value={valuationData.extent}
                onChange={(e) => setValuationData({...valuationData, extent: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="scheme" className="text-sm font-medium text-gray-700">Scheme Number</Label>
              <Input
                id="scheme"
                value={valuationData.schemeNumber}
                onChange={(e) => setValuationData({...valuationData, schemeNumber: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="section" className="text-sm font-medium text-gray-700">Section Number</Label>
              <Input
                id="section"
                value={valuationData.sectionNumber}
                onChange={(e) => setValuationData({...valuationData, sectionNumber: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="municipality" className="text-sm font-medium text-gray-700">Municipality</Label>
              <Input
                id="municipality"
                value={valuationData.municipality}
                onChange={(e) => setValuationData({...valuationData, municipality: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium text-green-900 text-sm">Location Summary</div>
                <div className="text-xs text-green-700">
                  {valuationData.propertyAddress} • Section {valuationData.sectionNumber} • {valuationData.extent}m² • {valuationData.municipality}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indexed Value Calculation */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calculator className="h-5 w-5 text-gray-700" />
                <span>Indexed Value Calculation</span>
              </CardTitle>
              <CardDescription>Advanced valuation using compound growth indexing</CardDescription>
            </div>
            <Button onClick={calculateIndexedValue} className="bg-purple-600 hover:bg-purple-700">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Value
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="purchase-price" className="text-sm font-medium text-gray-700">Purchase Price (R)</Label>
              <Input
                id="purchase-price"
                type="number"
                value={valuationData.purchasePrice}
                onChange={(e) => setValuationData({...valuationData, purchasePrice: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="purchase-date" className="text-sm font-medium text-gray-700">Purchase Date</Label>
              <Input
                id="purchase-date"
                type="date"
                value={valuationData.purchaseDate}
                onChange={(e) => setValuationData({...valuationData, purchaseDate: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="growth-rate" className="text-sm font-medium text-gray-700">Annual Growth Rate (%)</Label>
              <Input
                id="growth-rate"
                type="number"
                step="0.1"
                value={valuationData.growthRate}
                onChange={(e) => setValuationData({...valuationData, growthRate: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="valuation-year" className="text-sm font-medium text-gray-700">Valuation Year</Label>
              <Input
                id="valuation-year"
                type="number"
                value={valuationData.valuationYear}
                onChange={(e) => setValuationData({...valuationData, valuationYear: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
          </div>

          {/* Calculation Progress */}
          {valuationProgress > 0 && valuationProgress < 100 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Calculating indexed value...</span>
                <span className="text-sm text-blue-600">{valuationProgress}%</span>
              </div>
              <Progress value={valuationProgress} className="h-2" />
            </div>
          )}

          {/* Results Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    R {valuationData.purchasePrice.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-blue-700">Original Purchase Price</div>
                  <div className="text-xs text-blue-600 mt-0.5 flex items-center justify-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {valuationData.purchaseDate}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-green-100 bg-gradient-to-br from-green-50 to-green-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    R {valuationData.currentValue.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-green-700">Current Indexed Value</div>
                  <div className="text-xs text-green-600 mt-0.5">As at {valuationData.valuationYear}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <Calculator className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {valuationData.growthRate}%
                  </div>
                  <div className="text-xs font-medium text-purple-700">Annual Growth Rate</div>
                  <div className="text-xs text-purple-600 mt-0.5">
                    {totalGrowth.toFixed(1)}% total appreciation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-semibold text-green-900">Professional Valuation Summary</div>
                <div className="text-green-800 mt-1 text-sm leading-relaxed">
                  The indexed valuation of <strong>{valuationData.propertyAddress}</strong> is 
                  <strong> R {valuationData.currentValue.toLocaleString()}</strong> as at {valuationData.valuationYear}, 
                  representing a compound annual growth rate of <strong>{valuationData.growthRate}%</strong> from the original 
                  purchase price of R {valuationData.purchasePrice.toLocaleString()} in {new Date(valuationData.purchaseDate).getFullYear()}.
                </div>
                <div className="mt-3 flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Certified Valuation</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700 text-xs">Market Indexed</Badge>
                  <span className="text-xs text-green-700">
                    Total appreciation: R {(valuationData.currentValue - valuationData.purchasePrice).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle className="text-lg">Generate Professional Reports</CardTitle>
          <CardDescription>Export certified valuation documents and certificates</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateValuationReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Valuation Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Certificate generation in progress...")}>
              <FileText className="h-4 w-4 mr-2" />
              Valuation Certificate
            </Button>
            <Button variant="outline" onClick={() => toast.info("Market analysis coming soon...")}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Market Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
