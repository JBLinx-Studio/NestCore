
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
  Zap
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
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-3xl border border-purple-200 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Professional Workspace</h1>
              <p className="text-xl text-purple-100 mb-4">Advanced tools for real estate professionals</p>
              <div className="flex gap-3">
                <Badge className="bg-purple-500/20 text-purple-100 border-purple-300/30 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Premium Tools
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-100 border-blue-300/30 px-4 py-2">
                  <Zap className="h-4 w-4 mr-2" />
                  AI-Powered
                </Badge>
                <Badge className="bg-green-500/20 text-green-100 border-green-300/30 px-4 py-2">
                  <Award className="h-4 w-4 mr-2" />
                  Industry Leading
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right text-white">
            <div className="text-4xl font-bold">{workspaceStats.monthlyRevenue}</div>
            <div className="text-lg text-purple-200">Monthly Revenue</div>
            <div className="flex items-center mt-2 text-green-300">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">+12.5% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total CMAs</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{workspaceStats.totalCMAs}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-medium">+3 from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Completed Valuations</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <Calculator className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{workspaceStats.completedValuations}</div>
            <div className="flex items-center mt-2">
              <Target className="h-3 w-3 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-medium">{workspaceStats.successRate}% success rate</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Active Clients</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{workspaceStats.activeClients}</div>
            <div className="flex items-center mt-2">
              <Users className="h-3 w-3 text-purple-600 mr-1" />
              <p className="text-xs text-purple-600 font-medium">+1 new this week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Avg. Completion</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{workspaceStats.avgDaysToComplete} days</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <p className="text-xs text-green-600 font-medium">15% faster</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Workspace Tabs */}
      <Tabs value={activeWorkspace} onValueChange={setActiveWorkspace} className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 rounded-xl p-1 shadow-lg">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="cma" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
            CMA Tools
          </TabsTrigger>
          <TabsTrigger value="valuation" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
            Valuations
          </TabsTrigger>
          <TabsTrigger value="market-analysis" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
            Market Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Enhanced Quick Actions */}
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
              <CardTitle className="text-2xl text-gray-800">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">Start your professional work with these advanced tools</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => handleCreateNewWork("CMA")}
                >
                  <Calculator className="h-8 w-8 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">New CMA</span>
                  <span className="text-xs opacity-90">Comparative Market Analysis</span>
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => handleCreateNewWork("Valuation")}
                >
                  <TrendingUp className="h-8 w-8 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">Property Valuation</span>
                  <span className="text-xs opacity-90">Professional Assessment</span>
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => handleCreateNewWork("Market-Analysis")}
                >
                  <MapPin className="h-8 w-8 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">Market Analysis</span>
                  <span className="text-xs opacity-90">Area Insights</span>
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => handleCreateNewWork("Reports")}
                >
                  <FileText className="h-8 w-8 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">Property Report</span>
                  <span className="text-xs opacity-90">Detailed Documentation</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Work */}
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
              <CardTitle className="text-2xl text-gray-800">Recent Work & Projects</CardTitle>
              <CardDescription className="text-gray-600">Track your latest professional activities and progress</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentWork.map((work) => (
                  <div key={work.id} className="group hover:bg-gray-50 transition-colors duration-200 p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          {work.type === "CMA" && <Calculator className="h-6 w-6 text-white" />}
                          {work.type === "Valuation" && <TrendingUp className="h-6 w-6 text-white" />}
                          {work.type === "Market Analysis" && <MapPin className="h-6 w-6 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-bold text-lg text-gray-900">{work.type}</span>
                            <Badge className={`${getPriorityColor(work.priority)} border`}>
                              {work.priority}
                            </Badge>
                          </div>
                          <div className="text-gray-700 font-medium">{work.property}</div>
                          <div className="text-sm text-gray-500">Client: {work.client}</div>
                          <div className="text-sm text-gray-500">{work.date}</div>
                          
                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">Progress</span>
                              <span className="text-xs text-gray-600">{work.completion}%</span>
                            </div>
                            <Progress value={work.completion} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-gray-900 mb-2">{work.value}</div>
                        <Badge 
                          variant={work.status === "completed" ? "default" : work.status === "in-progress" ? "secondary" : "outline"}
                          className="shadow-sm"
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
