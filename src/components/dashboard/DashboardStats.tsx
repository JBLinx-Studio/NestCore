
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Home, 
  Users, 
  DollarSign, 
  Calendar,
  Zap,
  FileText,
  Star,
  Target,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Total Properties",
      value: "324",
      change: "+12%",
      trend: "up",
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Monthly Revenue",
      value: "R2.4M",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Occupancy Rate",
      value: "94.2%",
      change: "+2%",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  const metrics = [
    {
      label: "Property Portfolio Health",
      value: 92,
      color: "bg-green-500"
    },
    {
      label: "User Satisfaction",
      value: 88,
      color: "bg-blue-500"
    },
    {
      label: "Payment Success Rate",
      value: 96,
      color: "bg-purple-500"
    }
  ];

  const handleStatClick = (stat: any) => {
    toast.info(`Viewing detailed ${stat.title} analytics - Drill-down reports coming soon!`);
  };

  const handleMetricClick = (metric: any) => {
    toast.info(`Analyzing ${metric.label} - Detailed breakdown coming soon!`);
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={stat.title} 
              className={`${stat.borderColor} hover:shadow-lg transition-all duration-200 cursor-pointer`}
              onClick={() => handleStatClick(stat)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center text-sm">
                  <TrendIcon className={`h-4 w-4 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <CardTitle>Performance Metrics</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Advanced metrics dashboard coming soon!")}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Key performance indicators for your real estate ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => (
            <div 
              key={metric.label} 
              className="space-y-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => handleMetricClick(metric)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {metric.label}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {metric.value}%
                </span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
