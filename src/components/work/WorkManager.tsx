
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  FileText, 
  Calculator, 
  MapPin, 
  TrendingUp, 
  Building,
  Users,
  Clock,
  CheckCircle,
  Star,
  Award,
  Target,
  Zap,
  Sparkles
} from "lucide-react";
import { CMAWorkspace } from "./CMAWorkspace";
import { ValuationWorkspace } from "./ValuationWorkspace";
import { MarketAnalysisWorkspace } from "./MarketAnalysisWorkspace";
import { PropertyReportWorkspace } from "./PropertyReportWorkspace";
import { toast } from "sonner";

export const WorkManager = () => {
  const [activeWorkspace, setActiveWorkspace] = useState("overview");
  const [recentWork, setRecentWork] = useState([
    {
      id: 1,
      type: "CMA",
      property: "Berg Street, Bothasrus",
      client: "Sarah Johnson",
      status: "completed",
      date: "2024-12-15",
      value: "R 664,000",
      priority: "high",
      completion: 100
    },
    {
      id: 2,
      type: "Valuation",
      property: "Cloete Street, Bothasrus",
      client: "Michael Chen",
      status: "in-progress",
      date: "2024-12-14",
      value: "R 715,718",
      priority: "medium",
      completion: 75
    },
    {
      id: 3,
      type: "Market Analysis",
      property: "Lemmerville Complex",
      client: "Emma Wilson",
      status: "pending",
      date: "2024-12-13",
      value: "TBD",
      priority: "low",
      completion: 25
    }
  ]);

  const workspaceStats = {
    totalCMAs: 24,
    completedValuations: 18,
    activeClients: 12,
    monthlyRevenue: "R 245,000",
    successRate: 94,
    avgDaysToComplete: 5.2
  };

  const handleCreateNewWork = (type: string) => {
    toast.success(`Creating new ${type} workspace...`);
    setActiveWorkspace(type.toLowerCase());
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-100";
      case "medium": return "bg-amber-50 text-amber-700 border-amber-100";
      case "low": return "bg-green-50 text-green-700 border-green-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header - Similar to Dashboard */}
      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome to Professional Workspace</h1>
                <p className="text-gray-600">Advanced tools for real estate professionals</p>
                <div className="flex gap-2 mt-3">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Tools
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-Powered
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{workspaceStats.monthlyRevenue}</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
              <div className="flex items-center mt-1 text-green-600 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Light & Professional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total CMAs</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{workspaceStats.totalCMAs}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-medium">+3 from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Completed Valuations</CardTitle>
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <Calculator className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{workspaceStats.completedValuations}</div>
            <div className="flex items-center mt-1">
              <Target className="h-3 w-3 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-medium">{workspaceStats.successRate}% success rate</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Active Clients</CardTitle>
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{workspaceStats.activeClients}</div>
            <div className="flex items-center mt-1">
              <Users className="h-3 w-3 text-purple-600 mr-1" />
              <p className="text-xs text-purple-600 font-medium">+1 new this week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Avg. Completion</CardTitle>
            <div className="p-2 bg-orange-50 rounded-lg border border-orange-100">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{workspaceStats.avgDaysToComplete} days</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-medium">15% faster</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workspace Tabs */}
      <Tabs value={activeWorkspace} onValueChange={setActiveWorkspace} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="cma" className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            CMA Tools
          </TabsTrigger>
          <TabsTrigger value="valuation" className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            Valuations
          </TabsTrigger>
          <TabsTrigger value="market-analysis" className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            Market Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-md data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">Start your professional work with these tools</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 group"
                  onClick={() => handleCreateNewWork("CMA")}
                  variant="outline"
                >
                  <Calculator className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">New CMA</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-sm hover:shadow-md transition-all duration-200 group"
                  onClick={() => handleCreateNewWork("Valuation")}
                  variant="outline"
                >
                  <TrendingUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Property Valuation</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-200 group"
                  onClick={() => handleCreateNewWork("Market-Analysis")}
                  variant="outline"
                >
                  <MapPin className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Market Analysis</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-sm hover:shadow-md transition-all duration-200 group"
                  onClick={() => handleCreateNewWork("Reports")}
                  variant="outline"
                >
                  <FileText className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Property Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Work */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-xl text-gray-900">Recent Work & Projects</CardTitle>
              <CardDescription className="text-gray-600">Track your latest professional activities</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentWork.map((work) => (
                  <div key={work.id} className="group hover:bg-gray-50 transition-colors duration-200 p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 rounded-lg flex items-center justify-center">
                          {work.type === "CMA" && <Calculator className="h-5 w-5 text-blue-600" />}
                          {work.type === "Valuation" && <TrendingUp className="h-5 w-5 text-green-600" />}
                          {work.type === "Market Analysis" && <MapPin className="h-5 w-5 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="font-semibold text-gray-900">{work.type}</span>
                            <Badge className={`${getPriorityColor(work.priority)} text-xs`}>
                              {work.priority}
                            </Badge>
                          </div>
                          <div className="text-gray-700 font-medium text-sm">{work.property}</div>
                          <div className="text-xs text-gray-500">Client: {work.client} • {work.date}</div>
                          
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">Progress</span>
                              <span className="text-xs text-gray-600">{work.completion}%</span>
                            </div>
                            <Progress value={work.completion} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900 mb-1">{work.value}</div>
                        <Badge 
                          variant={work.status === "completed" ? "default" : work.status === "in-progress" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {work.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {work.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                          {work.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cma">
          <CMAWorkspace />
        </TabsContent>

        <TabsContent value="valuation">
          <ValuationWorkspace />
        </TabsContent>

        <TabsContent value="market-analysis">
          <MarketAnalysisWorkspace />
        </TabsContent>

        <TabsContent value="reports">
          <PropertyReportWorkspace />
        </TabsContent>
      </Tabs>
    </div>
  );
};
