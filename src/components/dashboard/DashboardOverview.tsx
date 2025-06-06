
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Users,
  Building,
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Shield,
  Hammer,
  Scale,
  Home,
  UserCheck,
  MapPin,
  Clock
} from "lucide-react";

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void;
}

export const DashboardOverview = ({ setActiveTab }: DashboardOverviewProps) => {
  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 52000, expenses: 34000, profit: 18000 },
    { month: "Mar", revenue: 48000, expenses: 31000, profit: 17000 },
    { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
    { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
    { month: "Jun", revenue: 67000, expenses: 41000, profit: 26000 }
  ];

  const propertyTypesData = [
    { name: "Apartments", value: 45, color: "#3b82f6" },
    { name: "Houses", value: 30, color: "#10b981" },
    { name: "Commercial", value: 15, color: "#f59e0b" },
    { name: "Townhouses", value: 10, color: "#ef4444" }
  ];

  const userRolesData = [
    { role: "Property Owners", count: 156, icon: Home, color: "bg-blue-500" },
    { role: "Tenants", count: 342, icon: Users, color: "bg-green-500" },
    { role: "Real Estate Agents", count: 28, icon: UserCheck, color: "bg-purple-500" },
    { role: "Contractors", count: 45, icon: Hammer, color: "bg-orange-500" },
    { role: "Legal Professionals", count: 12, icon: Scale, color: "bg-red-500" }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome to NestCore</h1>
            <p className="text-xl text-blue-100 mb-4">The Complete Real Estate Ecosystem</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Property Owners
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Tenants & Renters
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Real Estate Agents
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Contractors
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Legal Professionals
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">R2.4M</div>
            <div className="text-blue-200">Total Portfolio Value</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Monthly Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">R67,000</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Active Properties</CardTitle>
            <Building className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">24</div>
            <p className="text-xs text-blue-600">Across 8 municipalities</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Users</CardTitle>
            <Users className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">583</div>
            <p className="text-xs text-purple-600">All industry roles</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Occupancy Rate</CardTitle>
            <CheckCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">94.2%</div>
            <p className="text-xs text-orange-600">Above industry average</p>
          </CardContent>
        </Card>
      </div>

      {/* User Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-blue-600" />
            Industry Professionals on NestCore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {userRolesData.map((role, index) => {
              const Icon = role.icon;
              return (
                <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-12 h-12 ${role.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{role.count}</div>
                  <div className="text-sm text-gray-600">{role.role}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R${value.toLocaleString()}`, ""]} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Types */}
        <Card>
          <CardHeader>
            <CardTitle>Property Portfolio Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {propertyTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Different User Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Property Owners */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Home className="h-5 w-5 mr-2" />
              Property Owners
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => setActiveTab("properties")} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Manage Properties
            </Button>
            <Button 
              onClick={() => setActiveTab("tenants")} 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Tenant Relations
            </Button>
            <Button 
              onClick={() => setActiveTab("utilities")} 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              Utility Management
            </Button>
          </CardContent>
        </Card>

        {/* Real Estate Agents */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <UserCheck className="h-5 w-5 mr-2" />
              Real Estate Agents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Property Listings
            </Button>
            <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
              Client Management
            </Button>
            <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
              Market Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Service Providers */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800">
              <Hammer className="h-5 w-5 mr-2" />
              Contractors & Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Service Requests
            </Button>
            <Button 
              onClick={() => setActiveTab("documents")} 
              variant="outline" 
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              Legal Documents
            </Button>
            <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
              Compliance Tracking
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-600" />
            Recent Platform Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New tenant application approved</p>
                <p className="text-xs text-gray-500">Ocean View Villa - Unit 1A</p>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <FileText className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Maintenance contract uploaded</p>
                <p className="text-xs text-gray-500">Garden Heights Complex</p>
              </div>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Lease renewal notice due</p>
                <p className="text-xs text-gray-500">Sunset Apartments - 3 units</p>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
