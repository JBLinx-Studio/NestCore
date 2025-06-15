
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Building, FileText, Download, Calculator, MapPin, Calendar, DollarSign } from "lucide-react";
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Property Valuation Center</h2>
            <p className="text-green-100 text-lg">Professional indexed valuation with market analysis</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">R {valuationData.currentValue.toLocaleString()}</div>
            <div className="text-green-200">Current Indexed Value</div>
            <Badge className="mt-2 bg-white/20 text-white border-white/30">
              +{totalGrowth.toFixed(1)}% Growth
            </Badge>
          </div>
        </div>
      </div>

      {/* Enhanced Property Information */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-green-50 rounded-t-xl">
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <Building className="h-6 w-6 text-green-600" />
            <span>Property Information</span>
          </CardTitle>
          <CardDescription className="text-lg">Comprehensive property details for accurate valuation</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-lg font-medium">Property Address</Label>
              <Input
                id="address"
                value={valuationData.propertyAddress}
                onChange={(e) => setValuationData({...valuationData, propertyAddress: e.target.value})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="extent" className="text-lg font-medium">Extent (m²)</Label>
              <Input
                id="extent"
                value={valuationData.extent}
                onChange={(e) => setValuationData({...valuationData, extent: e.target.value})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="scheme" className="text-lg font-medium">Scheme Number</Label>
              <Input
                id="scheme"
                value={valuationData.schemeNumber}
                onChange={(e) => setValuationData({...valuationData, schemeNumber: e.target.value})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="section" className="text-lg font-medium">Section Number</Label>
              <Input
                id="section"
                value={valuationData.sectionNumber}
                onChange={(e) => setValuationData({...valuationData, sectionNumber: e.target.value})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="municipality" className="text-lg font-medium">Municipality</Label>
              <Input
                id="municipality"
                value={valuationData.municipality}
                onChange={(e) => setValuationData({...valuationData, municipality: e.target.value})}
                className="mt-2 h-12 text-lg"
              />
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-900">Location Summary</div>
                <div className="text-sm text-green-700">
                  {valuationData.propertyAddress} • Section {valuationData.sectionNumber} • {valuationData.extent}m² • {valuationData.municipality}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Valuation Calculation */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <span>Indexed Value Calculation</span>
              </CardTitle>
              <CardDescription className="text-lg">Advanced valuation using compound growth indexing</CardDescription>
            </div>
            <Button onClick={calculateIndexedValue} size="lg" className="bg-gradient-to-r from-purple-500 to-purple-600">
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Value
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <Label htmlFor="purchase-price" className="text-lg font-medium">Purchase Price (R)</Label>
              <Input
                id="purchase-price"
                type="number"
                value={valuationData.purchasePrice}
                onChange={(e) => setValuationData({...valuationData, purchasePrice: Number(e.target.value)})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="purchase-date" className="text-lg font-medium">Purchase Date</Label>
              <Input
                id="purchase-date"
                type="date"
                value={valuationData.purchaseDate}
                onChange={(e) => setValuationData({...valuationData, purchaseDate: e.target.value})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="growth-rate" className="text-lg font-medium">Annual Growth Rate (%)</Label>
              <Input
                id="growth-rate"
                type="number"
                step="0.1"
                value={valuationData.growthRate}
                onChange={(e) => setValuationData({...valuationData, growthRate: Number(e.target.value)})}
                className="mt-2 h-12 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="valuation-year" className="text-lg font-medium">Valuation Year</Label>
              <Input
                id="valuation-year"
                type="number"
                value={valuationData.valuationYear}
                onChange={(e) => setValuationData({...valuationData, valuationYear: Number(e.target.value)})}
                className="mt-2 h-12 text-lg"
              />
            </div>
          </div>

          {/* Calculation Progress */}
          {valuationProgress > 0 && valuationProgress < 100 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Calculating indexed value...</span>
                <span className="text-sm text-blue-600">{valuationProgress}%</span>
              </div>
              <Progress value={valuationProgress} className="h-3" />
            </div>
          )}

          {/* Enhanced Results Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    R {valuationData.purchasePrice.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-blue-700">Original Purchase Price</div>
                  <div className="text-xs text-blue-600 mt-1">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {valuationData.purchaseDate}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    R {valuationData.currentValue.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-green-700">Current Indexed Value</div>
                  <div className="text-xs text-green-600 mt-1">As at {valuationData.valuationYear}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Calculator className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {valuationData.growthRate}%
                  </div>
                  <div className="text-sm font-medium text-purple-700">Annual Growth Rate</div>
                  <div className="text-xs text-purple-600 mt-1">
                    {totalGrowth.toFixed(1)}% total appreciation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-start space-x-4">
              <FileText className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <div className="font-bold text-green-900 text-lg">Professional Valuation Summary</div>
                <div className="text-green-800 mt-2 leading-relaxed">
                  The indexed valuation of <strong>{valuationData.propertyAddress}</strong> is 
                  <strong className="text-xl"> R {valuationData.currentValue.toLocaleString()}</strong> as at {valuationData.valuationYear}, 
                  representing a compound annual growth rate of <strong>{valuationData.growthRate}%</strong> from the original 
                  purchase price of R {valuationData.purchasePrice.toLocaleString()} in {new Date(valuationData.purchaseDate).getFullYear()}.
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <Badge className="bg-green-600 text-white">Certified Valuation</Badge>
                  <Badge variant="outline" className="border-green-600 text-green-600">Market Indexed</Badge>
                  <span className="text-sm text-green-700">
                    Total appreciation: R {(valuationData.currentValue - valuationData.purchasePrice).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Actions */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl">
          <CardTitle className="text-2xl">Generate Professional Reports</CardTitle>
          <CardDescription className="text-lg">Export certified valuation documents and certificates</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-wrap gap-4">
            <Button onClick={generateValuationReport} size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600">
              <Download className="h-5 w-5 mr-2" />
              Valuation Report
            </Button>
            <Button variant="outline" size="lg" onClick={() => toast.info("Certificate generation in progress...")}>
              <FileText className="h-5 w-5 mr-2" />
              Valuation Certificate
            </Button>
            <Button variant="outline" size="lg" onClick={() => toast.info("Market analysis coming soon...")}>
              <TrendingUp className="h-5 w-5 mr-2" />
              Market Comparison
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
