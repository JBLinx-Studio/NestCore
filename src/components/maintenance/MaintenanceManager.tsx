import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench, 
  Users, 
  Calendar,
  TrendingUp, 
  AlertTriangle,
  Star,
  Award,
  Clock,
  CheckCircle,
  DollarSign,
  Building,
  Phone,
  MapPin,
  Zap,
  Shield
} from "lucide-react";
import { toast } from "sonner";

export const MaintenanceManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const maintenanceStats = {
    openWorkOrders: 23,
    completedThisMonth: 145,
    averageResponseTime: 2.4,
    vendorSatisfaction: 94.2,
    totalVendors: 42,
    monthlyBudget: 125000
  };

  const workOrders = [
    {
      id: "WO-2024-001",
      property: "Berg Street, Bothasrus",
      unit: "Unit 4A",
      issue: "Plumbing leak in kitchen",
      priority: "high",
      status: "in_progress",
      vendor: "Cape Town Plumbing",
      assignedDate: "2024-12-15",
      estimatedCost: 1500,
      category: "plumbing"
    },
    {
      id: "WO-2024-002", 
      property: "Cloete Street, Bothasrus",
      unit: "Unit 2B",
      issue: "Air conditioning maintenance",
      priority: "medium",
      status: "scheduled",
      vendor: "HVAC Solutions",
      assignedDate: "2024-12-16",
      estimatedCost: 800,
      category: "hvac"
    },
    {
      id: "WO-2024-003",
      property: "Mill Park Complex",
      unit: "Common Area",
      issue: "Electrical panel inspection",
      priority: "low",
      status: "pending",
      vendor: "ElectroSafe",
      assignedDate: "2024-12-18",
      estimatedCost: 600,
      category: "electrical"
    }
  ];

  const vendors = [
    {
      id: 1,
      name: "Cape Town Plumbing",
      category: "Plumbing",
      rating: 4.8,
      completedJobs: 89,
      averageRating: 4.8,
      contact: "+27 21 123 4567",
      email: "info@ctplumbing.co.za",
      status: "active",
      responseTime: "2.1 hours"
    },
    {
      id: 2,
      name: "HVAC Solutions",
      category: "HVAC",
      rating: 4.6,
      completedJobs: 67,
      averageRating: 4.6,
      contact: "+27 21 987 6543",
      email: "service@hvacsolutions.co.za",
      status: "active", 
      responseTime: "3.2 hours"
    },
    {
      id: 3,
      name: "ElectroSafe",
      category: "Electrical",
      rating: 4.9,
      completedJobs: 134,
      averageRating: 4.9,
      contact: "+27 21 456 7890",
      email: "safety@electrosafe.co.za",
      status: "active",
      responseTime: "1.8 hours"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-amber-50 text-amber-700 border-amber-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-50 text-green-700 border-green-200";
      case "in_progress": return "bg-blue-50 text-blue-700 border-blue-200";
      case "scheduled": return "bg-purple-50 text-purple-700 border-purple-200";
      case "pending": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-orange-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,88,12,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Wrench className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Maintenance & Operations
                </h1>
                <p className="text-slate-600 text-lg font-medium">Work orders, vendor management & facility operations</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 transition-colors px-3 py-1">
                    <Wrench className="h-3 w-3 mr-1" />
                    Work Orders
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <Users className="h-3 w-3 mr-1" />
                    Vendor Network
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    {maintenanceStats.vendorSatisfaction}% Satisfaction
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {maintenanceStats.openWorkOrders}
              </div>
              <div className="text-sm text-slate-600 font-medium">Open Work Orders</div>
              <div className="flex items-center justify-end mt-2 text-orange-600 text-sm font-medium">
                <Clock className="h-4 w-4 mr-1" />
                <span>{maintenanceStats.averageResponseTime}h avg response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Open Work Orders</CardTitle>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl border border-orange-200/50 shadow-sm">
              <Wrench className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{maintenanceStats.openWorkOrders}</div>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-600 mr-1" />
              <p className="text-sm text-orange-600 font-medium">5 high priority</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Completed This Month</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{maintenanceStats.completedThisMonth}</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Active Vendors</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{maintenanceStats.totalVendors}</div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-sm text-blue-600 font-medium">{maintenanceStats.vendorSatisfaction}% avg rating</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Monthly Budget</CardTitle>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">R {maintenanceStats.monthlyBudget.toLocaleString()}</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-sm text-purple-600 font-medium">78% utilized</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
          <TabsTrigger value="schedules">Maintenance Schedules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-orange-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Manage maintenance operations efficiently</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-orange-200/60 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Creating new work order...")}
                  variant="outline"
                >
                  <Wrench className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">New Work Order</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Scheduling inspection...")}
                  variant="outline"
                >
                  <Calendar className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Schedule Inspection</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Adding vendor...")}
                  variant="outline"
                >
                  <Users className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Add Vendor</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Generating maintenance report...")}
                  variant="outline"
                >
                  <TrendingUp className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Maintenance Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Work Orders */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Recent Work Orders</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Track current maintenance activities</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {workOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="group hover:bg-slate-50/50 transition-all duration-300 p-6 border border-slate-100 rounded-xl shadow-md hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-200 rounded-xl flex items-center justify-center shadow-sm">
                          <Wrench className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{order.id}</div>
                          <div className="text-slate-600">{order.property} - {order.unit}</div>
                          <div className="text-sm text-slate-500 mt-1">{order.issue}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getPriorityColor(order.priority)} mb-2`}>
                          {order.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                        <div className="text-sm text-slate-600 mt-2">R {order.estimatedCost.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Vendor: {order.vendor}</span>
                      <span>Assigned: {order.assignedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-orders">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Work Order Management</CardTitle>
              <CardDescription>Track and manage all maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workOrders.map((order) => (
                  <div key={order.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{order.id}</h3>
                        <p className="text-slate-600">{order.property} - {order.unit}</p>
                        <p className="text-sm text-slate-500 mt-1">{order.issue}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityColor(order.priority)} style={{ marginBottom: '8px' }}>
                          {order.priority}
                        </Badge>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Building className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-900">{order.category}</div>
                        <div className="text-xs text-blue-600">Category</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-900">R {order.estimatedCost.toLocaleString()}</div>
                        <div className="text-xs text-green-600">Estimated Cost</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <div className="font-bold text-purple-900">{order.vendor}</div>
                        <div className="text-xs text-purple-600">Assigned Vendor</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                        <div className="font-bold text-orange-900">{order.assignedDate}</div>
                        <div className="text-xs text-orange-600">Assigned Date</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Update Status</Button>
                      <Button size="sm" variant="outline">Contact Vendor</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Vendor Network</CardTitle>
              <CardDescription>Manage your trusted service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{vendor.name}</h3>
                          <p className="text-slate-600">{vendor.category}</p>
                          <p className="text-sm text-slate-500">{vendor.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-bold text-slate-900">{vendor.rating}</span>
                        </div>
                        <div className="text-sm text-slate-600">{vendor.completedJobs} jobs completed</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-900">{vendor.completedJobs}</div>
                        <div className="text-xs text-green-600">Completed Jobs</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-900">{vendor.responseTime}</div>
                        <div className="text-xs text-blue-600">Avg Response</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Phone className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <div className="font-bold text-purple-900">{vendor.contact}</div>
                        <div className="text-xs text-purple-600">Contact</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">View History</Button>
                      <Button size="sm" variant="outline">Rate Performance</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Maintenance Schedules</CardTitle>
              <CardDescription>Preventive maintenance and inspection schedules</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">Upcoming Inspections</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">HVAC Systems</div>
                        <div className="text-sm text-slate-600">Berg Street Complex</div>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700">Dec 20</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Fire Safety</div>
                        <div className="text-sm text-slate-600">All Properties</div>
                      </div>
                      <Badge className="bg-orange-50 text-orange-700">Dec 25</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Preventive Maintenance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Elevator Service</div>
                        <div className="text-sm text-slate-600">Monthly Check</div>
                      </div>
                      <Badge className="bg-green-50 text-green-700">On Track</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Pool Maintenance</div>
                        <div className="text-sm text-slate-600">Weekly Service</div>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Completed</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
