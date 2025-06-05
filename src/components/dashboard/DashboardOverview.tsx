import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Users, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  Zap,
  MessageSquare
} from "lucide-react";

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Properties",
      value: "8",
      change: "+2 this month",
      icon: Building,
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Active Tenants",
      value: "12",
      change: "2 pending renewals",
      icon: Users,
      trend: "stable",
      color: "text-green-600"
    },
    {
      title: "Monthly Revenue",
      value: "R24,500",
      change: "+8.2% from last month",
      icon: DollarSign,
      trend: "up",
      color: "text-emerald-600"
    },
    {
      title: "Outstanding Payments",
      value: "R3,200",
      change: "3 overdue tenants",
      icon: AlertTriangle,
      trend: "attention",
      color: "text-orange-600"
    }
  ];

  const recentActivity = [
    {
      type: "payment",
      title: "Rent payment received",
      description: "Unit 2A - Sarah Johnson paid R2,800",
      time: "2 hours ago",
      status: "success"
    },
    {
      type: "maintenance",
      title: "Maintenance request",
      description: "Unit 1B - Leaking tap reported",
      time: "5 hours ago",
      status: "pending"
    },
    {
      type: "utility",
      title: "Utility bill processed",
      description: "Nelson Mandela Municipality - R1,240",
      time: "1 day ago",
      status: "info"
    },
    {
      type: "lease",
      title: "Lease renewal due",
      description: "Unit 3C - Renewal needed by March 15",
      time: "2 days ago",
      status: "warning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest updates across your properties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-blue-500' :
                  activity.status === 'warning' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Monthly Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Send Rent Reminders
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Add New Property
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI Assistant
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Property Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Property Portfolio Overview</CardTitle>
          <CardDescription>
            Occupancy rates and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Occupancy</span>
              <span className="text-sm text-gray-600">12/14 units (85.7%)</span>
            </div>
            <Progress value={85.7} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-green-700">Fully Occupied</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-blue-700">Partially Occupied</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">2</div>
                <div className="text-sm text-orange-700">Vacant Units</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
