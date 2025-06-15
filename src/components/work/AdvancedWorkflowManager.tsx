
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AdvancedCharts } from "../analytics/AdvancedCharts";
import { AdvancedCalculators } from "../financial/AdvancedCalculators";
import { PropertyMatcher } from "../matching/PropertyMatcher";
import { 
  Workflow, 
  BarChart3, 
  Calculator, 
  Target, 
  Zap, 
  TrendingUp,
  Link,
  Brain,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

export const AdvancedWorkflowManager = () => {
  const [activeWorkflow, setActiveWorkflow] = useState("overview");
  
  const automationRules = [
    {
      id: 1,
      name: "Auto CMA Generation",
      trigger: "Property Listed",
      action: "Generate CMA Report",
      status: "active",
      executions: 24
    },
    {
      id: 2,
      name: "Lead Qualification",
      trigger: "Inquiry Received",
      action: "Score & Route Lead",
      status: "active", 
      executions: 156
    },
    {
      id: 3,
      name: "Market Alert System",
      trigger: "Price Change >5%",
      action: "Update Valuations",
      status: "paused",
      executions: 8
    }
  ];

  const dataConnections = [
    { source: "CMA Workspace", target: "Property Listings", status: "connected", strength: 95 },
    { source: "Lead Manager", target: "Property Matcher", status: "connected", strength: 88 },
    { source: "Financial Calculator", target: "ROI Reports", status: "connected", strength: 92 },
    { source: "Market Analysis", target: "Valuation Tools", status: "connected", strength: 90 }
  ];

  const triggerAutomation = (ruleId: number) => {
    const rule = automationRules.find(r => r.id === ruleId);
    toast.success(`Triggering automation: ${rule?.name}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-600/25">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Advanced Workflow Manager
                </h1>
                <p className="text-slate-600 text-lg font-medium">AI-powered automation and advanced analytics</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors px-3 py-1">
                    <Brain className="h-3 w-3 mr-1" />
                    AI-Enhanced
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <Workflow className="h-3 w-3 mr-1" />
                    Automated
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Smart Insights
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeWorkflow} onValueChange={setActiveWorkflow} className="space-y-8">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calculators">Calculators</TabsTrigger>
          <TabsTrigger value="matching">Property Matching</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Data Linking Overview */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold flex items-center">
                <Link className="h-6 w-6 mr-3 text-blue-600" />
                Cross-Module Data Integration
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">Real-time data linking across all platform modules</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataConnections.map((connection, index) => (
                  <div key={index} className="p-6 border border-slate-200 rounded-xl bg-gradient-to-r from-white to-blue-50/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold text-slate-900">{connection.source}</div>
                        <div className="text-sm text-slate-600">↓ Connected to</div>
                        <div className="font-semibold text-blue-700">{connection.target}</div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {connection.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Integration Strength</span>
                        <span className="font-medium text-slate-900">{connection.strength}%</span>
                      </div>
                      <Progress value={connection.strength} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflow Automation Status */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold flex items-center">
                <Workflow className="h-6 w-6 mr-3 text-purple-600" />
                Active Automation Rules
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg">Intelligent workflow automation and triggers</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-bold text-lg text-slate-900">{rule.name}</h3>
                          <Badge className={rule.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}>
                            {rule.status}
                          </Badge>
                        </div>
                        <div className="text-slate-600 mb-2">
                          <span className="font-medium">Trigger:</span> {rule.trigger} → <span className="font-medium">Action:</span> {rule.action}
                        </div>
                        <div className="text-sm text-slate-500">
                          Executed {rule.executions} times this month
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => triggerAutomation(rule.id)}>
                          <Zap className="h-4 w-4 mr-1" />
                          Trigger
                        </Button>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <span>Advanced Analytics Dashboard</span>
              </CardTitle>
              <CardDescription>Comprehensive data visualization and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedCharts />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculators">
          <AdvancedCalculators />
        </TabsContent>

        <TabsContent value="matching">
          <PropertyMatcher />
        </TabsContent>

        <TabsContent value="automation">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Workflow className="h-6 w-6 text-purple-600" />
                <span>Workflow Automation Center</span>
              </CardTitle>
              <CardDescription>Configure and manage intelligent automation rules</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Creating new automation rule...")}
                  variant="outline"
                >
                  <Workflow className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg">New Automation</span>
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Configuring triggers...")}
                  variant="outline"
                >
                  <Zap className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg">Smart Triggers</span>
                </Button>
                
                <Button 
                  className="h-32 flex flex-col items-center justify-center space-y-3 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Generating automation report...")}
                  variant="outline"
                >
                  <TrendingUp className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg">Performance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
