
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building, FileText, Download, Calculator } from "lucide-react";
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
    growthRate: 2.7
  });

  const calculateIndexedValue = () => {
    const years = valuationData.valuationYear - new Date(valuationData.purchaseDate).getFullYear();
    const compoundGrowth = Math.pow(1 + (valuationData.growthRate / 100), years);
    const indexedValue = valuationData.purchasePrice * compoundGrowth;
    
    setValuationData({
      ...valuationData,
      currentValue: Math.round(indexedValue)
    });
    
    toast.success("Indexed value calculated successfully!");
  };

  const generateValuationReport = () => {
    toast.success("Generating property valuation report...");
  };

  return (
    <div className="space-y-6">
      {/* Property Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Property Information</span>
          </CardTitle>
          <CardDescription>Basic property details for valuation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="address">Property Address</Label>
              <Input
                id="address"
                value={valuationData.propertyAddress}
                onChange={(e) => setValuationData({...valuationData, propertyAddress: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="scheme">Scheme Number</Label>
              <Input
                id="scheme"
                value={valuationData.schemeNumber}
                onChange={(e) => setValuationData({...valuationData, schemeNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="section">Section Number</Label>
              <Input
                id="section"
                value={valuationData.sectionNumber}
                onChange={(e) => setValuationData({...valuationData, sectionNumber: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="extent">Extent (m²)</Label>
              <Input
                id="extent"
                value={valuationData.extent}
                onChange={(e) => setValuationData({...valuationData, extent: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="municipality">Municipality</Label>
              <Input
                id="municipality"
                value={valuationData.municipality}
                onChange={(e) => setValuationData({...valuationData, municipality: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="province">Province</Label>
              <Input
                id="province"
                value={valuationData.province}
                onChange={(e) => setValuationData({...valuationData, province: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Calculation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Indexed Value Calculation</span>
            </CardTitle>
            <CardDescription>Calculate current property value using indexed growth</CardDescription>
          </div>
          <Button onClick={calculateIndexedValue}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Value
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="purchase-price">Purchase Price (R)</Label>
              <Input
                id="purchase-price"
                type="number"
                value={valuationData.purchasePrice}
                onChange={(e) => setValuationData({...valuationData, purchasePrice: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="purchase-date">Purchase Date</Label>
              <Input
                id="purchase-date"
                type="date"
                value={valuationData.purchaseDate}
                onChange={(e) => setValuationData({...valuationData, purchaseDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="growth-rate">Annual Growth Rate (%)</Label>
              <Input
                id="growth-rate"
                type="number"
                step="0.1"
                value={valuationData.growthRate}
                onChange={(e) => setValuationData({...valuationData, growthRate: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="valuation-year">Valuation Year</Label>
              <Input
                id="valuation-year"
                type="number"
                value={valuationData.valuationYear}
                onChange={(e) => setValuationData({...valuationData, valuationYear: Number(e.target.value)})}
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    R {valuationData.purchasePrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Original Purchase Price</div>
                  <div className="text-xs text-gray-500 mt-1">{valuationData.purchaseDate}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    R {valuationData.currentValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Current Indexed Value</div>
                  <div className="text-xs text-gray-500 mt-1">As at {valuationData.valuationYear}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {valuationData.growthRate}%
                  </div>
                  <div className="text-sm text-gray-600">Compound Annual Growth</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {((valuationData.currentValue / valuationData.purchasePrice - 1) * 100).toFixed(1)}% total growth
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900">Valuation Summary</div>
                <div className="text-sm text-green-700 mt-1">
                  The indexed value of {valuationData.propertyAddress} is <strong>R {valuationData.currentValue.toLocaleString()}</strong> 
                  as at {valuationData.valuationYear}, based on a compound annual growth rate of {valuationData.growthRate}% 
                  from the original purchase price of R {valuationData.purchasePrice.toLocaleString()} in {new Date(valuationData.purchaseDate).getFullYear()}.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Export valuation data and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button onClick={generateValuationReport} className="bg-gradient-to-r from-blue-500 to-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Valuation Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Certificate generation coming soon...")}>
              <FileText className="h-4 w-4 mr-2" />
              Valuation Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
