
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Users, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  FileText,
  Image,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Edit,
  Download,
  Share
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PropertyViewProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export const PropertyView = ({ property, isOpen, onClose, onEdit }: PropertyViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!property) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'vacant': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const occupancyRate = (property.occupiedUnits / property.units) * 100;
  const monthlyIncome = property.occupiedUnits * (property.monthlyRent / property.units);

  const handleShare = () => {
    navigator.clipboard.writeText(`${property.name} - ${property.address}`);
    toast.success("Property details copied to clipboard!");
  };

  const handleDownloadReport = () => {
    toast.success(`Generating property report for ${property.name}...`);
    // Simulate report generation
    setTimeout(() => {
      toast.success("Property report downloaded successfully!");
    }, 2000);
  };

  const mockTenants = [
    { id: 1, name: "Sarah Johnson", unit: "2A", rent: 2800, status: "paid", phone: "+27 82 123 4567", email: "sarah@email.com" },
    { id: 2, name: "Michael Chen", unit: "1B", rent: 2100, status: "overdue", phone: "+27 83 987 6543", email: "michael@email.com" }
  ];

  const mockDocuments = [
    { id: 1, name: "Lease Agreement - Unit 2A", type: "legal", date: "2024-01-15", size: "2.4 MB" },
    { id: 2, name: "Property Insurance", type: "insurance", date: "2024-02-20", size: "1.8 MB" },
    { id: 3, name: "Maintenance Records", type: "maintenance", date: "2024-03-10", size: "856 KB" }
  ];

  const mockFinancials = [
    { month: "Jan 2024", income: monthlyIncome, expenses: 1200, profit: monthlyIncome - 1200 },
    { month: "Feb 2024", income: monthlyIncome, expenses: 900, profit: monthlyIncome - 900 },
    { month: "Mar 2024", income: monthlyIncome, expenses: 1500, profit: monthlyIncome - 1500 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{property.name}</DialogTitle>
              <DialogDescription className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                {property.address}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(property.status)}>
                {property.status}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-1" />
                Report
              </Button>
              <Button size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Property Images */}
            {property.images && property.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.images.map((image: any, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold">{property.occupiedUnits}/{property.units}</div>
                      <div className="text-sm text-gray-600">Units Occupied</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold">R{monthlyIncome.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Monthly Income</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold">{occupancyRate.toFixed(0)}%</div>
                      <div className="text-sm text-gray-600">Occupancy Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold">{new Date(property.createdAt).getFullYear()}</div>
                      <div className="text-sm text-gray-600">Year Added</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{property.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Property Type:</span>
                    <span className="ml-2 capitalize">{property.propertyType}</span>
                  </div>
                  <div>
                    <span className="font-medium">Municipality:</span>
                    <span className="ml-2">{property.municipality}</span>
                  </div>
                  <div>
                    <span className="font-medium">Total Units:</span>
                    <span className="ml-2">{property.units}</span>
                  </div>
                  <div>
                    <span className="font-medium">Average Rent:</span>
                    <span className="ml-2">R{(property.monthlyRent / property.units).toLocaleString()}/month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenants" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Current Tenants</h3>
              <Button size="sm">
                <Users className="h-4 w-4 mr-1" />
                Add Tenant
              </Button>
            </div>
            
            <div className="grid gap-4">
              {mockTenants.slice(0, property.occupiedUnits).map((tenant) => (
                <Card key={tenant.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {tenant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{tenant.name}</div>
                          <div className="text-sm text-gray-600">Unit {tenant.unit} • R{tenant.rent}/month</div>
                          <div className="text-xs text-gray-500">
                            <Phone className="h-3 w-3 inline mr-1" />
                            {tenant.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={tenant.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {tenant.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Summary</h3>
            
            <div className="grid gap-4">
              {mockFinancials.map((record, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{record.month}</div>
                        <div className="text-sm text-gray-600">
                          Income: R{record.income.toLocaleString()} • Expenses: R{record.expenses.toLocaleString()}
                        </div>
                      </div>
                      <div className={`font-bold ${record.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {record.profit >= 0 ? '+' : ''}R{record.profit.toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Property Documents</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Upload Document
              </Button>
            </div>
            
            <div className="grid gap-3">
              {mockDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-gray-600">{doc.size} • {doc.date}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Maintenance Records</h3>
              <Button size="sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Report Issue
              </Button>
            </div>
            
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Plumbing Repair - Unit 2A</div>
                        <div className="text-sm text-gray-600">Completed on March 15, 2024</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">R850</div>
                      <div className="text-sm text-gray-600">Cost</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-medium">HVAC Maintenance</div>
                        <div className="text-sm text-gray-600">Scheduled for March 25, 2024</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">R1,200</div>
                      <div className="text-sm text-gray-600">Estimated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
