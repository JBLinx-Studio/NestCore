
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  MapPin, 
  Building, 
  Plus, 
  Trash2, 
  Download,
  FileText,
  Search
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
    condition: "Good"
  });

  const [comparableProperties, setComparableProperties] = useState<ComparableProperty[]>([
    {
      id: 1,
      address: "Lemmerville, 4 Cloete Street Bothasrus",
      salePrice: 660000,
      saleDate: "2024/06/27",
      size: 80,
      type: "Residence",
      condition: "Good"
    },
    {
      id: 2,
      address: "Lemmerville, 4 Cloete Street Bothasrus",
      salePrice: 850000,
      saleDate: "2023/08/15",
      size: 127,
      type: "Residence",
      condition: "Good"
    },
    {
      id: 3,
      address: "Lemmerville, 4 Cloete Street Bothasrus",
      salePrice: 670000,
      saleDate: "2022/08/19",
      size: 55,
      type: "Residence",
      condition: "Average"
    }
  ]);

  const [cmaResults, setCmaResults] = useState({
    lowerRange: 617000,
    middleRange: 664000,
    upperRange: 756000,
    recommendedValue: 664000
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
    const variance = 0.15; // 15% variance
    
    const newResults = {
      lowerRange: Math.round(estimatedValue * (1 - variance)),
      middleRange: Math.round(estimatedValue),
      upperRange: Math.round(estimatedValue * (1 + variance)),
      recommendedValue: Math.round(estimatedValue)
    };

    setCmaResults(newResults);
    toast.success("CMA calculation completed!");
  };

  const generateReport = () => {
    toast.success("Generating CMA report...");
    // In a real app, this would generate a PDF report
  };

  return (
    <div className="space-y-6">
      {/* Subject Property */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Subject Property</span>
          </CardTitle>
          <CardDescription>Property being evaluated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={subjectProperty.address}
                onChange={(e) => setSubjectProperty({...subjectProperty, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="size">Size (m²)</Label>
              <Input
                id="size"
                type="number"
                value={subjectProperty.size}
                onChange={(e) => setSubjectProperty({...subjectProperty, size: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={subjectProperty.type}
                onChange={(e) => setSubjectProperty({...subjectProperty, type: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={subjectProperty.condition}
                onChange={(e) => setSubjectProperty({...subjectProperty, condition: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparable Properties */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Comparable Properties</span>
            </CardTitle>
            <CardDescription>Similar properties that have recently sold</CardDescription>
          </div>
          <Button onClick={addComparable} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Comparable
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparableProperties.map((comp) => (
              <div key={comp.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Comparable #{comp.id}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComparable(comp.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <Label>Address</Label>
                    <Input
                      value={comp.address}
                      onChange={(e) => updateComparable(comp.id, 'address', e.target.value)}
                      placeholder="Property address"
                    />
                  </div>
                  <div>
                    <Label>Sale Price (R)</Label>
                    <Input
                      type="number"
                      value={comp.salePrice}
                      onChange={(e) => updateComparable(comp.id, 'salePrice', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Sale Date</Label>
                    <Input
                      type="date"
                      value={comp.saleDate}
                      onChange={(e) => updateComparable(comp.id, 'saleDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Size (m²)</Label>
                    <Input
                      type="number"
                      value={comp.size}
                      onChange={(e) => updateComparable(comp.id, 'size', Number(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Type</Label>
                    <Input
                      value={comp.type}
                      onChange={(e) => updateComparable(comp.id, 'type', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Condition</Label>
                    <Input
                      value={comp.condition}
                      onChange={(e) => updateComparable(comp.id, 'condition', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <div className="text-sm font-medium">
                    Price per m²: R {comp.size > 0 ? Math.round(comp.salePrice / comp.size).toLocaleString() : 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CMA Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>CMA Results</span>
            </CardTitle>
            <CardDescription>Comparative Market Analysis valuation</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button onClick={calculateCMA}>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate CMA
            </Button>
            <Button onClick={generateReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    R {cmaResults.lowerRange.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Lower Range</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    R {cmaResults.middleRange.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Middle Range</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    R {cmaResults.upperRange.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Upper Range</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    R {cmaResults.recommendedValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Recommended Value</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">CMA Summary</div>
                <div className="text-sm text-blue-700 mt-1">
                  Based on {comparableProperties.length} comparable properties, the estimated market value 
                  for {subjectProperty.address} ({subjectProperty.size}m²) is <strong>R {cmaResults.recommendedValue.toLocaleString()}</strong>.
                  This analysis reflects current market conditions in the Bothasrus area.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
