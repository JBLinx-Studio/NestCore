
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  FileText, 
  Calculator, 
  MapPin, 
  TrendingUp, 
  Building,
  Users,
  Clock,
  CheckCircle
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
      value: "R 664,000"
    },
    {
      id: 2,
      type: "Valuation",
      property: "Cloete Street, Bothasrus",
      client: "Michael Chen",
      status: "in-progress",
      date: "2024-12-14",
      value: "R 715,718"
    },
    {
      id: 3,
      type: "Market Analysis",
      property: "Lemmerville Complex",
      client: "Emma Wilson",
      status: "pending",
      date: "2024-12-13",
      value: "TBD"
    }
  ]);

  const workspaceStats = {
    totalCMAs: 24,
    completedValuations: 18,
    activeClients: 12,
    monthlyRevenue: "R 245,000"
  };

  const handleCreateNewWork = (type: string) => {
    toast.success(`Creating new ${type} workspace...`);
    setActiveWorkspace(type.toLowerCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Professional Workspace</h1>
            <p className="text-lg text-gray-600">Complete CMA, valuations, and market analysis tools</p>
            <div className="flex gap-2 mt-3">
              <Badge className="bg-purple-100 text-purple-800">Agent Tools</Badge>
              <Badge className="bg-blue-100 text-blue-800">CMA Ready</Badge>
              <Badge className="bg-green-100 text-green-800">Report Generator</Badge>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{workspaceStats.monthlyRevenue}</div>
          <div className="text-sm text-gray-600">Monthly Revenue</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CMAs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workspaceStats.totalCMAs}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Valuations</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workspaceStats.completedValuations}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workspaceStats.activeClients}</div>
            <p className="text-xs text-muted-foreground">+1 new this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Property Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 664K</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Workspace */}
      <Tabs value={activeWorkspace} onValueChange={setActiveWorkspace} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cma">CMA Workspace</TabsTrigger>
          <TabsTrigger value="valuation">Valuations</TabsTrigger>
          <TabsTrigger value="market-analysis">Market Analysis</TabsTrigger>
          <TabsTrigger value="reports">Property Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start your professional work with these tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  className="h-24 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600"
                  onClick={() => handleCreateNewWork("CMA")}
                >
                  <Calculator className="h-6 w-6" />
                  <span>New CMA</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-500 to-green-600"
                  onClick={() => handleCreateNewWork("Valuation")}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>Property Valuation</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600"
                  onClick={() => handleCreateNewWork("Market-Analysis")}
                >
                  <MapPin className="h-6 w-6" />
                  <span>Market Analysis</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-500 to-orange-600"
                  onClick={() => handleCreateNewWork("Reports")}
                >
                  <FileText className="h-6 w-6" />
                  <span>Property Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Work */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Work</CardTitle>
              <CardDescription>Your latest professional activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWork.map((work) => (
                  <div key={work.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        {work.type === "CMA" && <Calculator className="h-5 w-5 text-white" />}
                        {work.type === "Valuation" && <TrendingUp className="h-5 w-5 text-white" />}
                        {work.type === "Market Analysis" && <MapPin className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <div className="font-medium">{work.type} - {work.property}</div>
                        <div className="text-sm text-gray-600">Client: {work.client}</div>
                        <div className="text-sm text-gray-500">{work.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{work.value}</div>
                      <Badge 
                        variant={work.status === "completed" ? "default" : work.status === "in-progress" ? "secondary" : "outline"}
                      >
                        {work.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {work.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                        {work.status}
                      </Badge>
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
