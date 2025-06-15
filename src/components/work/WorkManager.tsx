
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
  Sparkles,
  ArrowRight
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
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.04),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Professional Workspace
                </h1>
                <p className="text-slate-600 text-lg font-medium">Advanced tools for real estate professionals</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Suite
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-Enhanced
                  </Badge>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Certified Tools
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {workspaceStats.monthlyRevenue}
              </div>
              <div className="text-sm text-slate-600 font-medium">Monthly Revenue</div>
              <div className="flex items-center justify-end mt-2 text-green-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5% growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Total CMAs</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{workspaceStats.totalCMAs}</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">+3 this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Completed Valuations</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <Calculator className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{workspaceStats.completedValuations}</div>
            <div className="flex items-center">
              <Target className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">{workspaceStats.successRate}% success rate</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Active Clients</CardTitle>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{workspaceStats.activeClients}</div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-sm text-purple-600 font-medium">+1 new this week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg. Completion</CardTitle>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl border border-orange-200/50 shadow-sm">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{workspaceStats.avgDaysToComplete} days</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">15% faster</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Workspace Tabs */}
      <Tabs value={activeWorkspace} onValueChange={setActiveWorkspace} className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Overview
          </TabsTrigger>
          <TabsTrigger value="cma" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            CMA Tools
          </TabsTrigger>
          <TabsTrigger value="valuation" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Valuations
          </TabsTrigger>
          <TabsTrigger value="market-analysis" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Market Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Enhanced Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Start your professional work with these advanced tools</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => handleCreateNewWork("CMA")}
                  variant="outline"
                >
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <Calculator className="h-7 w-7 text-blue-600" />
                  </div>
                  <span className="font-semibold text-lg">New CMA</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => handleCreateNewWork("Valuation")}
                  variant="outline"
                >
                  <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <TrendingUp className="h-7 w-7 text-green-600" />
                  </div>
                  <span className="font-semibold text-lg">Property Valuation</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => handleCreateNewWork("Market-Analysis")}
                  variant="outline"
                >
                  <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <MapPin className="h-7 w-7 text-purple-600" />
                  </div>
                  <span className="font-semibold text-lg">Market Analysis</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-orange-200/60 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => handleCreateNewWork("Reports")}
                  variant="outline"
                >
                  <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                    <FileText className="h-7 w-7 text-orange-600" />
                  </div>
                  <span className="font-semibold text-lg">Property Report</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Work */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Recent Work & Projects</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Track your latest professional activities</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {recentWork.map((work) => (
                  <div key={work.id} className="group hover:bg-slate-50/50 transition-all duration-300 p-6 border border-slate-100 rounded-xl shadow-md hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                          {work.type === "CMA" && <Calculator className="h-6 w-6 text-blue-600" />}
                          {work.type === "Valuation" && <TrendingUp className="h-6 w-6 text-green-600" />}
                          {work.type === "Market Analysis" && <MapPin className="h-6 w-6 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="font-bold text-slate-900 text-lg">{work.type}</span>
                            <Badge className={`${getPriorityColor(work.priority)} text-sm font-medium`}>
                              {work.priority}
                            </Badge>
                          </div>
                          <div className="text-slate-700 font-semibold text-base mb-1">{work.property}</div>
                          <div className="text-sm text-slate-500">Client: {work.client} • {work.date}</div>
                          
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-600 font-medium">Progress</span>
                              <span className="text-sm text-slate-600 font-semibold">{work.completion}%</span>
                            </div>
                            <Progress value={work.completion} className="h-2 bg-slate-100" />
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl text-slate-900 mb-2">{work.value}</div>
                        <Badge 
                          variant={work.status === "completed" ? "default" : work.status === "in-progress" ? "secondary" : "outline"}
                          className="text-sm font-medium"
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
