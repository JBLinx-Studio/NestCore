
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  PieChart,
  BarChart3,
  Star,
  Award,
  Target,
  CreditCard,
  Building,
  Users,
  FileText,
  Calculator
} from "lucide-react";
import { toast } from "sonner";

export const FinancialManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const financialStats = {
    totalRevenue: 2850000,
    monthlyRevenue: 450000,
    expenses: 185000,
    netIncome: 265000,
    roi: 18.7,
    occupancyRate: 94.2,
    collectionsRate: 96.8,
    portfolioValue: 15200000
  };

  const revenueData = [
    { property: "Berg Street Complex", revenue: 125000, expenses: 35000, net: 90000, units: 15 },
    { property: "Cloete Street", revenue: 85000, expenses: 22000, net: 63000, units: 10 },
    { property: "Mill Park", revenue: 165000, expenses: 45000, net: 120000, units: 20 },
    { property: "Lemmerville", revenue: 75000, expenses: 18000, net: 57000, units: 8 }
  ];

  const expenseBreakdown = [
    { category: "Maintenance", amount: 45000, percentage: 24.3, color: "orange" },
    { category: "Utilities", amount: 38000, percentage: 20.5, color: "blue" },
    { category: "Insurance", amount: 28000, percentage: 15.1, color: "green" },
    { category: "Property Management", amount: 35000, percentage: 18.9, color: "purple" },
    { category: "Marketing", amount: 15000, percentage: 8.1, color: "pink" },
    { category: "Legal & Professional", amount: 12000, percentage: 6.5, color: "gray" },
    { category: "Other", amount: 12000, percentage: 6.5, color: "indigo" }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-green-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl shadow-green-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Financial Management
                </h1>
                <p className="text-slate-600 text-lg font-medium">Income tracking, expense management & ROI analysis</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Revenue Tracking
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {financialStats.roi}% ROI
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Portfolio Analytics
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                R {(financialStats.monthlyRevenue / 1000).toFixed(0)}k
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

      {/* Financial KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Monthly Revenue</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">R {(financialStats.monthlyRevenue / 1000).toFixed(0)}k</div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">+8.5% vs last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Monthly Expenses</CardTitle>
            <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl border border-red-200/50 shadow-sm">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">R {(financialStats.expenses / 1000).toFixed(0)}k</div>
            <div className="flex items-center">
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              <p className="text-sm text-red-600 font-medium">-3.2% vs last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Net Income</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">R {(financialStats.netIncome / 1000).toFixed(0)}k</div>
            <div className="flex items-center">
              <Target className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-sm text-blue-600 font-medium">{((financialStats.netIncome/financialStats.monthlyRevenue)*100).toFixed(1)}% margin</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Portfolio ROI</CardTitle>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">{financialStats.roi}%</div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-sm text-purple-600 font-medium">Above market avg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="expenses">Expense Management</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Financial Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Manage your financial operations efficiently</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Recording income...")}
                  variant="outline"
                >
                  <DollarSign className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Record Income</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-red-200/60 text-red-700 hover:bg-red-50 hover:border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Adding expense...")}
                  variant="outline"
                >
                  <CreditCard className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Add Expense</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Generating financial report...")}
                  variant="outline"
                >
                  <BarChart3 className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Financial Report</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Calculating ROI...")}
                  variant="outline"
                >
                  <Calculator className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">ROI Calculator</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
              <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
                <CardTitle className="text-xl text-slate-900 font-bold">Revenue vs Expenses</CardTitle>
                <CardDescription className="text-slate-600">Monthly financial performance overview</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-green-900">Total Revenue</div>
                      <div className="text-2xl font-bold text-green-700">R {(financialStats.monthlyRevenue / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium text-red-900">Total Expenses</div>
                      <div className="text-2xl font-bold text-red-700">R {(financialStats.expenses / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="p-3 bg-red-100 rounded-xl">
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-blue-900">Net Income</div>
                      <div className="text-2xl font-bold text-blue-700">R {(financialStats.netIncome / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
              <CardHeader className="bg-gradient-to-r from-slate-50/80 to-purple-50/30 border-b border-slate-200/50">
                <CardTitle className="text-xl text-slate-900 font-bold">Portfolio Performance</CardTitle>
                <CardDescription className="text-slate-600">Key investment metrics and indicators</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium text-purple-900">Portfolio Value</div>
                      <div className="text-xl font-bold text-purple-700">R {(financialStats.portfolioValue / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="text-sm text-purple-600">+5.2% YTD</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-green-900">Occupancy Rate</div>
                      <div className="text-xl font-bold text-green-700">{financialStats.occupancyRate}%</div>
                    </div>
                    <div className="text-sm text-green-600">Above target</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-blue-900">Collections Rate</div>
                      <div className="text-xl font-bold text-blue-700">{financialStats.collectionsRate}%</div>
                    </div>
                    <div className="text-sm text-blue-600">Excellent</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Property Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue breakdown by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {revenueData.map((property, index) => (
                  <div key={index} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{property.property}</h3>
                        <p className="text-slate-600">{property.units} units</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">R {(property.net / 1000).toFixed(0)}k</div>
                        <div className="text-sm text-slate-600">Net Income</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-900">R {(property.revenue / 1000).toFixed(0)}k</div>
                        <div className="text-xs text-green-600">Revenue</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <TrendingDown className="h-5 w-5 text-red-600 mx-auto mb-1" />
                        <div className="font-bold text-red-900">R {(property.expenses / 1000).toFixed(0)}k</div>
                        <div className="text-xs text-red-600">Expenses</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Target className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-900">{((property.net/property.revenue)*100).toFixed(1)}%</div>
                        <div className="text-xs text-blue-600">Margin</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Expense Breakdown & Management</CardTitle>
              <CardDescription>Analyze and optimize your operational expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-slate-900">Expense Categories</h3>
                  {expenseBreakdown.map((expense, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">{expense.category}</span>
                        <span className="font-bold text-slate-900">R {(expense.amount / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                          <div 
                            className={`bg-${expense.color}-500 h-2 rounded-full`} 
                            style={{ width: `${expense.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600">{expense.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Expense Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="font-medium text-slate-900 mb-1">Highest Category</div>
                      <div className="text-lg font-bold text-orange-600">Maintenance - R 45k</div>
                      <div className="text-sm text-slate-600">24.3% of total expenses</div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="font-medium text-slate-900 mb-1">Optimization Target</div>
                      <div className="text-lg font-bold text-blue-600">Utilities - R 38k</div>
                      <div className="text-sm text-slate-600">Consider energy efficiency upgrades</div>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="font-medium text-slate-900 mb-1">Variance Alert</div>
                      <div className="text-lg font-bold text-red-600">Marketing +15%</div>
                      <div className="text-sm text-slate-600">Above budget this month</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Financial Reports & Analytics</CardTitle>
              <CardDescription>Generate comprehensive financial reports and insights</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">Standard Reports</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Profit & Loss Statement
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Cash Flow Analysis
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <PieChart className="h-4 w-4 mr-2" />
                      Expense Breakdown
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      ROI Analysis
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Custom Analytics</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Building className="h-4 w-4 mr-2" />
                      Property Performance
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Tenant Analysis
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Seasonal Trends
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Budget vs Actual
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
