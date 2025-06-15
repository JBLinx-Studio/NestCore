
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp,
  FileText, 
  Download,
  Calendar,
  Star,
  Award,
  Target,
  Building,
  Users,
  DollarSign,
  Activity
} from "lucide-react";
import { toast } from "sonner";

export const ReportsManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const reportStats = {
    totalReports: 156,
    monthlyReports: 24,
    scheduledReports: 8,
    customReports: 12,
    automatedReports: 144,
    reportViews: 2340
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-purple-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-700 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Analytics & Reports
                </h1>
                <p className="text-slate-600 text-lg font-medium">Business intelligence, custom reports & data insights</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors px-3 py-1">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Data Analytics
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Business Intelligence
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Custom Reports
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                {reportStats.totalReports}
              </div>
              <div className="text-sm text-slate-600 font-medium">Total Reports</div>
              <div className="flex items-center justify-end mt-2 text-purple-600 text-sm font-medium">
                <Activity className="h-4 w-4 mr-1" />
                <span>{reportStats.reportViews} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Monthly Reports</CardTitle>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{reportStats.monthlyReports}</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-sm text-purple-600 font-medium">+4 this month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Scheduled Reports</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{reportStats.scheduledReports}</div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-sm text-blue-600 font-medium">Automated</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Custom Reports</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <Target className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{reportStats.customReports}</div>
            <div className="flex items-center">
              <Target className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">User created</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Report Views</CardTitle>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl border border-orange-200/50 shadow-sm">
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">{reportStats.reportViews.toLocaleString()}</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-orange-600 mr-1" />
              <p className="text-sm text-orange-600 font-medium">This month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Report Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Generate and manage your business reports</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Creating custom report...")}
                  variant="outline"
                >
                  <BarChart3 className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Create Report</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Setting up schedule...")}
                  variant="outline"
                >
                  <Calendar className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Schedule Report</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Opening dashboard...")}
                  variant="outline"
                >
                  <PieChart className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Analytics Dashboard</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-orange-200/60 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Exporting data...")}
                  variant="outline"
                >
                  <Download className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Export Data</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
              <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
                <CardTitle className="text-xl text-slate-900 font-bold">Standard Reports</CardTitle>
                <CardDescription className="text-slate-600">Pre-built reports for common business needs</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button className="w-full justify-between" variant="outline">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                      <span>Financial Summary</span>
                    </div>
                    <Badge className="bg-green-50 text-green-700">Monthly</Badge>
                  </Button>
                  
                  <Button className="w-full justify-between" variant="outline">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Property Performance</span>
                    </div>
                    <Badge className="bg-blue-50 text-blue-700">Weekly</Badge>
                  </Button>
                  
                  <Button className="w-full justify-between" variant="outline">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Occupancy Analysis</span>
                    </div>
                    <Badge className="bg-purple-50 text-purple-700">Daily</Badge>
                  </Button>
                  
                  <Button className="w-full justify-between" variant="outline">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                      <span>Market Trends</span>
                    </div>
                    <Badge className="bg-orange-50 text-orange-700">Quarterly</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
              <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
                <CardTitle className="text-xl text-slate-900 font-bold">Recent Reports</CardTitle>
                <CardDescription className="text-slate-600">Your latest generated reports and analytics</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">December Financial Report</div>
                      <div className="text-sm text-slate-600">Generated 2 hours ago</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">Property Occupancy Analysis</div>
                      <div className="text-sm text-slate-600">Generated yesterday</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">Maintenance Cost Summary</div>
                      <div className="text-sm text-slate-600">Generated 3 days ago</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Financial Reports & Analytics</CardTitle>
              <CardDescription>Comprehensive financial analysis and reporting tools</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Revenue Reports</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Income Statement
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Revenue Analysis
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Cash Flow Report
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200">
                  <h3 className="font-bold text-lg text-red-900 mb-4">Expense Reports</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <PieChart className="h-4 w-4 mr-2" />
                      Expense Breakdown
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Budget vs Actual
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Cost Analysis
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">ROI & Performance</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      ROI Analysis
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Building className="h-4 w-4 mr-2" />
                      Property Performance
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Portfolio Summary
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Operational Reports</CardTitle>
              <CardDescription>Property operations, maintenance and efficiency reports</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-lg text-orange-900 mb-4">Property Operations</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Building className="h-4 w-4 mr-2" />
                      Occupancy Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Tenant Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Property Utilization
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-lg text-purple-900 mb-4">Maintenance & Service</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Work Order Analysis
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Vendor Performance
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Maintenance Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create tailored reports for your specific business needs</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Build Custom Reports</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Create personalized reports with drag-and-drop interface. Select data sources, 
                  configure visualizations, and schedule automated delivery.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Launch Report Builder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
