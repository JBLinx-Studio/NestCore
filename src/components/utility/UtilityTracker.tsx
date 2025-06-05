
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Droplets,
  Upload,
  Calculator,
  Download,
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign
} from "lucide-react";

export const UtilityTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-03");

  const utilityBills = [
    {
      id: 1,
      municipality: "Nelson Mandela Municipality",
      type: "electricity",
      month: "2024-03",
      totalAmount: "R2,480",
      uploadDate: "2024-03-05",
      processed: true,
      properties: [
        { name: "Sunnydale Apartments", units: 4, amount: "R960", usage: "1200 kWh" },
        { name: "Garden View Flats", units: 6, amount: "R1,440", usage: "1800 kWh" },
        { name: "City Center Studios", units: 2, amount: "R80", usage: "100 kWh" }
      ]
    },
    {
      id: 2,
      municipality: "Nelson Mandela Municipality",
      type: "water",
      month: "2024-03",
      totalAmount: "R1,240",
      uploadDate: "2024-03-05",
      processed: true,
      properties: [
        { name: "Sunnydale Apartments", units: 4, amount: "R480", usage: "24 kL" },
        { name: "Garden View Flats", units: 6, amount: "R720", usage: "36 kL" },
        { name: "Beachfront Residence", units: 2, amount: "R40", usage: "2 kL" }
      ]
    },
    {
      id: 3,
      municipality: "Nelson Mandela Municipality",
      type: "electricity",
      month: "2024-02",
      totalAmount: "R2,680",
      uploadDate: "2024-02-08",
      processed: true,
      properties: [
        { name: "Sunnydale Apartments", units: 4, amount: "R1,040", usage: "1300 kWh" },
        { name: "Garden View Flats", units: 6, amount: "R1,560", usage: "1950 kWh" },
        { name: "City Center Studios", units: 2, amount: "R80", usage: "100 kWh" }
      ]
    }
  ];

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case 'electricity': return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'water': return <Droplets className="h-5 w-5 text-blue-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const currentMonthBills = utilityBills.filter(bill => bill.month === selectedMonth);
  const totalCurrentMonth = currentMonthBills.reduce((sum, bill) => 
    sum + parseInt(bill.totalAmount.replace('R', '').replace(',', '')), 0
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Utility Tracker</h2>
          <p className="text-gray-600">Manage municipal bills and split costs between tenants</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="mr-2 h-4 w-4" />
          Upload New Bill
        </Button>
      </div>

      {/* Month Selector and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Select Month</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Monthly Summary</span>
            </CardTitle>
            <CardDescription>
              Total utilities for {new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-4">
              R{totalCurrentMonth.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Electricity</span>
                </div>
                <div className="text-lg font-bold text-yellow-700">
                  R{currentMonthBills.filter(b => b.type === 'electricity').reduce((sum, bill) => 
                    sum + parseInt(bill.totalAmount.replace('R', '').replace(',', '')), 0
                  ).toLocaleString()}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Water</span>
                </div>
                <div className="text-lg font-bold text-blue-700">
                  R{currentMonthBills.filter(b => b.type === 'water').reduce((sum, bill) => 
                    sum + parseInt(bill.totalAmount.replace('R', '').replace(',', '')), 0
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Calculator className="h-5 w-5" />
            <span>AI Bill Processing</span>
          </CardTitle>
          <CardDescription className="text-blue-700">
            Upload your Nelson Mandela Municipality bill and let AI automatically split costs between properties and tenants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Upload Electricity Bill
            </Button>
            <Button variant="outline" className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50">
              <Upload className="mr-2 h-4 w-4" />
              Upload Water Bill
            </Button>
          </div>
          <div className="mt-4 text-sm text-blue-700">
            <p>✓ Automatic property allocation</p>
            <p>✓ Fair usage-based splitting</p>
            <p>✓ Instant tenant invoices</p>
          </div>
        </CardContent>
      </Card>

      {/* Current Month Bills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Bills for {new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        
        {currentMonthBills.map((bill) => (
          <Card key={bill.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getUtilityIcon(bill.type)}
                  <div>
                    <CardTitle className="text-lg capitalize">{bill.type} Bill</CardTitle>
                    <CardDescription>{bill.municipality}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{bill.totalAmount}</div>
                  {bill.processed && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Processed
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Uploaded on {new Date(bill.uploadDate).toLocaleDateString()}
                </div>

                {/* Property Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Property Breakdown</h4>
                  {bill.properties.map((property, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{property.name}</div>
                          <div className="text-sm text-gray-600">{property.units} units</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{property.amount}</div>
                          <div className="text-sm text-gray-600">{property.usage}</div>
                        </div>
                      </div>
                      <div className="text-sm text-blue-600">
                        ~{property.amount.replace('R', 'R')} per unit ({(parseInt(property.amount.replace('R', '')) / property.units).toFixed(0)} each)
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2 border-t border-gray-100">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate Invoices
                  </Button>
                  <Button variant="outline" size="sm">
                    Send to Tenants
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {currentMonthBills.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bills for this month</h3>
            <p className="text-gray-600 mb-4">Upload your municipal bills to get started</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload First Bill
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
