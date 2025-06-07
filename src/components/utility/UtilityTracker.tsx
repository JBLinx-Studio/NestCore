
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap, 
  Droplets, 
  Wifi, 
  Trash, 
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const UtilityTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedUtility, setSelectedUtility] = useState("all");
  const [showAddBill, setShowAddBill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const [utilities, setUtilities] = useState([
    {
      id: 1,
      type: "electricity",
      provider: "Eskom",
      property: "Sunset Apartments",
      amount: 4250.00,
      dueDate: "2024-01-15",
      status: "pending",
      accountNumber: "ESK-123456",
      period: "December 2023",
      usage: "2,450 kWh"
    },
    {
      id: 2,
      type: "water",
      provider: "City of Cape Town",
      property: "Ocean View Villa",
      amount: 1890.50,
      dueDate: "2024-01-20",
      status: "paid",
      accountNumber: "CT-789012",
      period: "December 2023",
      usage: "18,500 L"
    },
    {
      id: 3,
      type: "internet",
      provider: "Vodacom",
      property: "Green Gardens Townhouse",
      amount: 899.00,
      dueDate: "2024-01-10",
      status: "overdue",
      accountNumber: "VDC-345678",
      period: "December 2023",
      usage: "Unlimited"
    },
    {
      id: 4,
      type: "waste",
      provider: "Waste Management Co",
      property: "Sunset Apartments",
      amount: 560.00,
      dueDate: "2024-01-25",
      status: "pending",
      accountNumber: "WM-901234",
      period: "December 2023",
      usage: "Weekly collection"
    }
  ]);

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case "electricity": return <Zap className="h-5 w-5 text-yellow-500" />;
      case "water": return <Droplets className="h-5 w-5 text-blue-500" />;
      case "internet": return <Wifi className="h-5 w-5 text-purple-500" />;
      case "waste": return <Trash className="h-5 w-5 text-green-500" />;
      default: return <DollarSign className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "overdue": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredUtilities = utilities.filter(utility => {
    const matchesSearch = utility.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         utility.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProperty = selectedProperty === "all" || utility.property === selectedProperty;
    const matchesUtility = selectedUtility === "all" || utility.type === selectedUtility;
    return matchesSearch && matchesProperty && matchesUtility;
  });

  const totalAmount = utilities.reduce((sum, util) => sum + util.amount, 0);
  const paidAmount = utilities.filter(u => u.status === "paid").reduce((sum, util) => sum + util.amount, 0);
  const pendingAmount = utilities.filter(u => u.status === "pending").reduce((sum, util) => sum + util.amount, 0);
  const overdueAmount = utilities.filter(u => u.status === "overdue").reduce((sum, util) => sum + util.amount, 0);

  const properties = ["all", ...Array.from(new Set(utilities.map(u => u.property)))];
  const utilityTypes = ["all", "electricity", "water", "internet", "waste"];

  const handlePayBill = (bill: any) => {
    setSelectedBill(bill);
    setShowPayment(true);
  };

  const processPayment = () => {
    if (selectedBill) {
      setUtilities(utilities.map(u => 
        u.id === selectedBill.id ? { ...u, status: "paid" } : u
      ));
      toast.success(`Payment of R${selectedBill.amount.toFixed(2)} processed successfully`);
      setShowPayment(false);
      setSelectedBill(null);
    }
  };

  const handleAddBill = (billData: any) => {
    const newBill = {
      id: Date.now(),
      ...billData,
      status: "pending"
    };
    setUtilities([...utilities, newBill]);
    toast.success("Utility bill added successfully");
    setShowAddBill(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(utilities, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `utility-bills-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Utility bills exported successfully!");
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const importedBills = JSON.parse(e.target.result);
            setUtilities([...utilities, ...importedBills]);
            toast.success(`Imported ${importedBills.length} utility bills successfully!`);
          } catch (error) {
            toast.error("Failed to import bills. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Utility Tracker</h2>
          <p className="text-gray-600">Monitor and manage utility bills across all properties</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddBill(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bill
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Bills</p>
                <p className="text-2xl font-bold text-blue-900">R{totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Paid</p>
                <p className="text-2xl font-bold text-green-900">R{paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">R{pendingAmount.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Overdue</p>
                <p className="text-2xl font-bold text-red-900">R{overdueAmount.toLocaleString()}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Properties" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property === "all" ? "All Properties" : property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedUtility} onValueChange={setSelectedUtility}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Utilities" />
              </SelectTrigger>
              <SelectContent>
                {utilityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Utilities" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Utility Bills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUtilities.map((utility) => (
          <Card key={utility.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getUtilityIcon(utility.type)}
                  <CardTitle className="text-base capitalize">{utility.type}</CardTitle>
                </div>
                <Badge className={getStatusColor(utility.status)}>
                  {getStatusIcon(utility.status)}
                  <span className="ml-1 capitalize">{utility.status}</span>
                </Badge>
              </div>
              <CardDescription>{utility.provider}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-medium">{utility.property}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-lg">R{utility.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium">{new Date(utility.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Period:</span>
                  <span className="font-medium">{utility.period}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium">{utility.usage}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2 border-t border-gray-100">
                {utility.status !== "paid" && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePayBill(utility)}
                  >
                    Pay Now
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Bill Dialog */}
      <Dialog open={showAddBill} onOpenChange={setShowAddBill}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Utility Bill</DialogTitle>
            <DialogDescription>Enter the details for a new utility bill</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Utility Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="internet">Internet</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount</label>
                <Input type="number" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Provider</label>
              <Input placeholder="Utility provider name" />
            </div>
            <div>
              <label className="text-sm font-medium">Property</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.filter(p => p !== "all").map((property) => (
                    <SelectItem key={property} value={property}>{property}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddBill(false)}>Cancel</Button>
              <Button onClick={() => {
                handleAddBill({
                  type: "electricity",
                  provider: "New Provider",
                  property: "Sunset Apartments",
                  amount: 1000,
                  dueDate: new Date().toISOString().split('T')[0],
                  accountNumber: "ACC-" + Date.now(),
                  period: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                  usage: "TBD"
                });
              }}>Add Bill</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>Confirm payment for this utility bill</DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  {getUtilityIcon(selectedBill.type)}
                  <span className="font-medium capitalize">{selectedBill.type}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span>{selectedBill.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property:</span>
                    <span>{selectedBill.property}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Period:</span>
                    <span>{selectedBill.period}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Amount:</span>
                    <span>R{selectedBill.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowPayment(false)}>Cancel</Button>
                <Button onClick={processPayment}>Confirm Payment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
