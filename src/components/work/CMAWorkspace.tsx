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
  Sparkles,
  BarChart3,
  Target,
  DollarSign
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
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-100/40 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-18 h-18 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/25 rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Calculator className="h-9 w-9 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent mb-2">
                  Comparative Market Analysis
                </h2>
                <p className="text-slate-600 text-lg font-medium">Professional CMA tools with advanced analytics</p>
                <div className="flex gap-3 mt-3">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <Target className="h-3 w-3 mr-1" />
                    Precision Analysis
                  </Badge>
                  <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 transition-colors px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Market Intelligence
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                R {cmaResults.recommendedValue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 font-medium">Estimated Value</div>
              <Badge className="mt-2 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                {cmaResults.confidence}% Confidence
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Subject Property */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
          <CardTitle className="flex items-center space-x-3 text-xl font-bold">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 text-blue-700" />
            </div>
            <span className="text-slate-900">Subject Property</span>
          </CardTitle>
          <CardDescription className="text-slate-600 font-medium">Property being evaluated for market value</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Label htmlFor="address" className="text-sm font-semibold text-slate-700 mb-2 block">Property Address</Label>
              <Input
                id="address"
                value={subjectProperty.address}
                onChange={(e) => setSubjectProperty({...subjectProperty, address: e.target.value})}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="size" className="text-sm font-semibold text-slate-700 mb-2 block">Size (m²)</Label>
              <Input
                id="size"
                type="number"
                value={subjectProperty.size}
                onChange={(e) => setSubjectProperty({...subjectProperty, size: Number(e.target.value)})}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="bedrooms" className="text-sm font-semibold text-slate-700 mb-2 block">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={subjectProperty.bedrooms}
                onChange={(e) => setSubjectProperty({...subjectProperty, bedrooms: Number(e.target.value)})}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-sm font-semibold text-slate-700 mb-2 block">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={subjectProperty.bathrooms}
                onChange={(e) => setSubjectProperty({...subjectProperty, bathrooms: Number(e.target.value)})}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
              />
            </div>
            <div>
              <Label htmlFor="parking" className="text-sm font-semibold text-slate-700 mb-2 block">Parking Spaces</Label>
              <Input
                id="parking"
                type="number"
                value={subjectProperty.parking}
                onChange={(e) => setSubjectProperty({...subjectProperty, parking: Number(e.target.value)})}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50/70 to-cyan-50/70 rounded-xl border border-blue-100/50 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-blue-900 text-base">Property Summary</div>
                <div className="text-sm text-blue-700 font-medium">
                  {subjectProperty.bedrooms} bed, {subjectProperty.bathrooms} bath residence • {subjectProperty.size}m² • {subjectProperty.parking} parking
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced CMA Results */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-green-700" />
                </div>
                <span className="text-slate-900">CMA Valuation Results</span>
              </CardTitle>
              <CardDescription className="text-slate-600 font-medium">Professional market value assessment</CardDescription>
            </div>
            <div className="flex space-x-3">
              <Button onClick={calculateCMA} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate CMA
              </Button>
              <Button onClick={generateReport} variant="outline" className="border-slate-200 hover:bg-slate-50 shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border border-red-100 bg-gradient-to-br from-red-50/80 to-red-50/40 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-red-100 rounded-xl inline-flex mb-3">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    R {cmaResults.lowerRange.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-red-700 mb-1">Lower Range</div>
                  <div className="text-xs text-red-600">Conservative Estimate</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-100 bg-gradient-to-br from-blue-50/80 to-blue-50/40 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-3">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    R {cmaResults.middleRange.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-blue-700 mb-1">Market Value</div>
                  <div className="text-xs text-blue-600">Most Likely Price</div>
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
                    R {cmaResults.upperRange.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-green-700 mb-1">Upper Range</div>
                  <div className="text-xs text-green-600">Optimistic Estimate</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-purple-100 bg-gradient-to-br from-purple-50/80 to-purple-50/40 shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-3 bg-purple-100 rounded-xl inline-flex mb-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    R {cmaResults.recommendedValue.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-purple-700 mb-1">Recommended</div>
                  <div className="text-xs text-purple-600">Professional Opinion</div>
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
                <div className="font-bold text-green-900 text-lg mb-2">Professional CMA Summary</div>
                <div className="text-green-800 leading-relaxed font-medium">
                  Based on analysis of <strong>{comparableProperties.length} comparable properties</strong> in the Bothasrus area, 
                  the estimated market value for <strong>{subjectProperty.address}</strong> ({subjectProperty.size}m²) 
                  is <strong>R {cmaResults.recommendedValue.toLocaleString()}</strong> with 
                  a confidence level of <strong>{cmaResults.confidence}%</strong>. This valuation reflects current 
                  market conditions and property characteristics.
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-700 border-green-200 font-medium px-3 py-1">High Confidence</Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700 font-medium px-3 py-1">Market Aligned</Badge>
                  <span className="text-sm text-green-700 flex items-center font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Based on recent sales data
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Comparable Properties */}
      <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
        <CardHeader className="bg-gradient-to-r from-slate-50/80 to-orange-50/30 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-3 text-xl font-bold">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-orange-700" />
                </div>
                <span className="text-slate-900">Comparable Properties</span>
              </CardTitle>
              <CardDescription className="text-slate-600 font-medium">Recent sales used for market comparison</CardDescription>
            </div>
            <Button onClick={addComparable} variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Comparable
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {comparableProperties.map((comp, index) => (
              <div key={comp.id} className="p-6 border border-slate-100 rounded-xl bg-gradient-to-br from-slate-50/30 to-white hover:from-slate-50/50 hover:to-slate-50/10 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-base font-bold text-slate-700">Comparable #{index + 1}</span>
                  </div>
                  <Button onClick={() => removeComparable(comp.id)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <Label className="text-sm font-semibold text-slate-600 mb-2 block">Address</Label>
                    <Input
                      value={comp.address}
                      onChange={(e) => updateComparable(comp.id, 'address', e.target.value)}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
                      placeholder="Property address"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600 mb-2 block">Sale Price (R)</Label>
                    <Input
                      type="number"
                      value={comp.salePrice}
                      onChange={(e) => updateComparable(comp.id, 'salePrice', Number(e.target.value))}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600 mb-2 block">Sale Date</Label>
                    <Input
                      type="date"
                      value={comp.saleDate}
                      onChange={(e) => updateComparable(comp.id, 'saleDate', e.target.value)}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600 mb-2 block">Size (m²)</Label>
                    <Input
                      type="number"
                      value={comp.size}
                      onChange={(e) => updateComparable(comp.id, 'size', Number(e.target.value))}
                      className="border-slate-200 focus:border-blue-400 focus:ring-blue-200 shadow-sm"
                    />
                  </div>
                </div>
                {comp.salePrice > 0 && comp.size > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">
                        Price per m²: R {Math.round(comp.salePrice / comp.size).toLocaleString()}
                      </span>
                    </div>
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
