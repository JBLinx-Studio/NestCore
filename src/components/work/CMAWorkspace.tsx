
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  MapPin, 
  Building, 
  Plus, 
  Trash2, 
  Download,
  FileText,
  Search,
  TrendingUp,
  Eye,
  Edit,
  Save,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface ComparableProperty {
  id: number;
  address: string;
  salePrice: number;
  saleDate: string;
  size: number;
  type: string;
  condition: string;
}

export const CMAWorkspace = () => {
  const [subjectProperty, setSubjectProperty] = useState({
    address: "Berg Street, Bothasrus",
    size: 112,
    type: "Residence",
    condition: "Good",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2
  });

  const [comparableProperties, setComparableProperties] = useState<ComparableProperty[]>([
    {
      id: 1,
      address: "Lemmerville, 4 Cloete Street Bothasrus",
      salePrice: 660000,
      saleDate: "2024-06-27",
      size: 80,
      type: "Residence",
      condition: "Good"
    },
    {
      id: 2,
      address: "Lemmerville, 4 Cloete Street Bothasrus", 
      salePrice: 850000,
      saleDate: "2023-08-15",
      size: 127,
      type: "Residence",
      condition: "Good"
    },
    {
      id: 3,
      address: "Lemmerville, 4 Cloete Street Bothasrus",
      salePrice: 670000,
      saleDate: "2022-08-19",
      size: 55,
      type: "Residence",
      condition: "Average"
    }
  ]);

  const [cmaResults, setCmaResults] = useState({
    lowerRange: 617000,
    middleRange: 664000,
    upperRange: 756000,
    recommendedValue: 664000,
    confidence: 85
  });

  const addComparable = () => {
    const newComparable: ComparableProperty = {
      id: Date.now(),
      address: "",
      salePrice: 0,
      saleDate: new Date().toISOString().split('T')[0],
      size: 0,
      type: "Residence",
      condition: "Good"
    };
    setComparableProperties([...comparableProperties, newComparable]);
  };

  const removeComparable = (id: number) => {
    setComparableProperties(comparableProperties.filter(comp => comp.id !== id));
  };

  const updateComparable = (id: number, field: string, value: any) => {
    setComparableProperties(comparableProperties.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const calculateCMA = () => {
    if (comparableProperties.length === 0) {
      toast.error("Please add at least one comparable property");
      return;
    }

    const pricesPerSqm = comparableProperties.map(comp => comp.salePrice / comp.size);
    const avgPricePerSqm = pricesPerSqm.reduce((sum, price) => sum + price, 0) / pricesPerSqm.length;
    
    const estimatedValue = avgPricePerSqm * subjectProperty.size;
    const variance = 0.15;
    
    const newResults = {
      lowerRange: Math.round(estimatedValue * (1 - variance)),
      middleRange: Math.round(estimatedValue),
      upperRange: Math.round(estimatedValue * (1 + variance)),
      recommendedValue: Math.round(estimatedValue),
      confidence: Math.min(95, 70 + (comparableProperties.length * 5))
    };

    setCmaResults(newResults);
    toast.success("CMA calculation completed with high accuracy!");
  };

  const generateReport = () => {
    toast.success("Generating comprehensive CMA report...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Calculator className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Comparative Market Analysis</h2>
                <p className="text-gray-600">Professional CMA tools with advanced analytics</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">R {cmaResults.recommendedValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Estimated Value</div>
              <Badge className="mt-1 bg-blue-50 text-blue-700 border-blue-200">
                <Sparkles className="h-3 w-3 mr-1" />
                {cmaResults.confidence}% Confidence
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Property */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building className="h-5 w-5 text-gray-700" />
            <span>Subject Property</span>
          </CardTitle>
          <CardDescription>Property being evaluated for market value</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">Property Address</Label>
              <Input
                id="address"
                value={subjectProperty.address}
                onChange={(e) => setSubjectProperty({...subjectProperty, address: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="size" className="text-sm font-medium text-gray-700">Size (m²)</Label>
              <Input
                id="size"
                type="number"
                value={subjectProperty.size}
                onChange={(e) => setSubjectProperty({...subjectProperty, size: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={subjectProperty.bedrooms}
                onChange={(e) => setSubjectProperty({...subjectProperty, bedrooms: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-sm font-medium text-gray-700">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={subjectProperty.bathrooms}
                onChange={(e) => setSubjectProperty({...subjectProperty, bathrooms: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="parking" className="text-sm font-medium text-gray-700">Parking Spaces</Label>
              <Input
                id="parking"
                type="number"
                value={subjectProperty.parking}
                onChange={(e) => setSubjectProperty({...subjectProperty, parking: Number(e.target.value)})}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <Eye className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900 text-sm">Property Summary</div>
                <div className="text-xs text-blue-700">
                  {subjectProperty.bedrooms} bed, {subjectProperty.bathrooms} bath residence • {subjectProperty.size}m² • {subjectProperty.parking} parking
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CMA Results */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calculator className="h-5 w-5 text-gray-700" />
                <span>CMA Valuation Results</span>
              </CardTitle>
              <CardDescription>Professional market value assessment</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={calculateCMA} className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate CMA
              </Button>
              <Button onClick={generateReport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border border-red-100 bg-gradient-to-br from-red-50 to-red-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    R {cmaResults.lowerRange.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-red-700">Lower Range</div>
                  <div className="text-xs text-red-600 mt-0.5">Conservative Estimate</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    R {cmaResults.middleRange.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-blue-700">Market Value</div>
                  <div className="text-xs text-blue-600 mt-0.5">Most Likely Price</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-green-100 bg-gradient-to-br from-green-50 to-green-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    R {cmaResults.upperRange.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-green-700">Upper Range</div>
                  <div className="text-xs text-green-600 mt-0.5">Optimistic Estimate</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-50/50 shadow-sm">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    R {cmaResults.recommendedValue.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-purple-700">Recommended</div>
                  <div className="text-xs text-purple-600 mt-0.5">Professional Opinion</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-semibold text-green-900">Professional CMA Summary</div>
                <div className="text-green-800 mt-1 text-sm leading-relaxed">
                  Based on analysis of {comparableProperties.length} comparable properties in the Bothasrus area, 
                  the estimated market value for <strong>{subjectProperty.address}</strong> ({subjectProperty.size}m²) 
                  is <strong>R {cmaResults.recommendedValue.toLocaleString()}</strong> with 
                  a confidence level of <strong>{cmaResults.confidence}%</strong>. This valuation reflects current 
                  market conditions and property characteristics.
                </div>
                <div className="mt-3 flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">High Confidence</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700 text-xs">Market Aligned</Badge>
                  <span className="text-xs text-green-700 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Based on recent sales data
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparable Properties */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="h-5 w-5 text-gray-700" />
                <span>Comparable Properties</span>
              </CardTitle>
              <CardDescription>Recent sales used for market comparison</CardDescription>
            </div>
            <Button onClick={addComparable} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Comparable
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {comparableProperties.map((comp, index) => (
              <div key={comp.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50/30 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Comparable #{index + 1}</span>
                  <Button onClick={() => removeComparable(comp.id)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="lg:col-span-2">
                    <Label className="text-xs text-gray-600">Address</Label>
                    <Input
                      value={comp.address}
                      onChange={(e) => updateComparable(comp.id, 'address', e.target.value)}
                      className="mt-1 text-sm"
                      placeholder="Property address"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Sale Price (R)</Label>
                    <Input
                      type="number"
                      value={comp.salePrice}
                      onChange={(e) => updateComparable(comp.id, 'salePrice', Number(e.target.value))}
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Sale Date</Label>
                    <Input
                      type="date"
                      value={comp.saleDate}
                      onChange={(e) => updateComparable(comp.id, 'saleDate', e.target.value)}
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Size (m²)</Label>
                    <Input
                      type="number"
                      value={comp.size}
                      onChange={(e) => updateComparable(comp.id, 'size', Number(e.target.value))}
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
                {comp.salePrice > 0 && comp.size > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    Price per m²: R {Math.round(comp.salePrice / comp.size).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
