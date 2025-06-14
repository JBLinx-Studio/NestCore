import { DashboardStats } from "./DashboardStats";
import { ActivityFeed } from "./ActivityFeed";
import { QuickActions } from "./QuickActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Home, 
  Users, 
  DollarSign,
  Globe,
  Building,
  UserCheck
} from "lucide-react";
import { LandingHero } from "@/components/landing/LandingHero";

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void;
}

export const DashboardOverview = ({ setActiveTab }: DashboardOverviewProps) => {
  const revenueData = [
    { month: "Jan", revenue: 1800000, properties: 45 },
    { month: "Feb", revenue: 2100000, properties: 52 },
    { month: "Mar", revenue: 1950000, properties: 48 },
    { month: "Apr", revenue: 2400000, properties: 58 },
    { month: "May", revenue: 2200000, properties: 55 },
    { month: "Jun", revenue: 2600000, properties: 62 }
  ];

  const occupancyData = [
    { name: "Occupied", value: 85, color: "#22c55e" },
    { name: "Vacant", value: 10, color: "#f59e0b" },
    { name: "Maintenance", value: 5, color: "#ef4444" }
  ];

  const userTypeData = [
    { type: "Tenants", count: 450, growth: "+12%" },
    { type: "Agents", count: 89, growth: "+8%" },
    { type: "Contractors", count: 156, growth: "+15%" },
    { type: "Lawyers", count: 34, growth: "+5%" }
  ];

  return (
    <div className="space-y-8">
      {/* Landing Hero Section */}
      <LandingHero onSelectRole={(role) => {
        // Later improve this to route or filter dashboard!
        if (role === "owner") setActiveTab("dashboard");
        if (role === "agent") setActiveTab("properties");
        if (role === "renter") setActiveTab("tenants");
        if (role === "lawyer") setActiveTab("documents");
        if (role === "contractor") setActiveTab("utilities");
      }} />

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 rounded-3xl border border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to NestCore
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Your comprehensive real estate ecosystem dashboard
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Globe className="h-4 w-4 mr-1" />
                Industry Leading Platform
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <TrendingUp className="h-4 w-4 mr-1" />
                Growing Network
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                <UserCheck className="h-4 w-4 mr-1" />
                Verified Professionals
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">324</div>
              <div className="text-sm text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">94.2%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Revenue Trends</span>
            </CardTitle>
            <CardDescription>
              Monthly revenue and property growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `R${(value as number).toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Properties'
                  ]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-600" />
              <span>Property Occupancy</span>
            </CardTitle>
            <CardDescription>
              Current occupancy status across all properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Types Overview */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>User Categories</span>
          </CardTitle>
          <CardDescription>
            Distribution of professionals in your ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {userTypeData.map((userType) => (
              <div key={userType.type} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {userType.count}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {userType.type}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {userType.growth} this month
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions setActiveTab={setActiveTab} />
        <ActivityFeed />
      </div>
    </div>
  );
};
