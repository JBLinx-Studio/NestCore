import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  Home, 
  TrendingUp, 
  Calendar,
  Star,
  Award,
  Zap,
  Eye,
  UserPlus,
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  Building,
  MessageSquare,
  Mail
} from "lucide-react";
import { toast } from "sonner";

export const LeasingManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const leasingStats = {
    totalVacancies: 8,
    activeListings: 12,
    monthlyLeads: 47,
    conversionRate: 23.4,
    averageViewings: 3.2,
    leaseRenewalRate: 87.5
  };

  const activeListings = [
    {
      id: 1,
      property: "Berg Street, Bothasrus",
      type: "2 Bed Apartment",
      price: "R 8,500/month",
      views: 156,
      inquiries: 23,
      viewings: 8,
      status: "active",
      daysListed: 12,
      leadQuality: "high"
    },
    {
      id: 2,
      property: "Cloete Street, Bothasrus", 
      type: "3 Bed Townhouse",
      price: "R 12,000/month",
      views: 89,
      inquiries: 11,
      viewings: 4,
      status: "pending",
      daysListed: 6,
      leadQuality: "medium"
    }
  ];

  const recentLeads = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+27 82 123 4567",
      property: "Berg Street, Bothasrus",
      status: "viewing_scheduled",
      score: 85,
      source: "website",
      date: "2024-12-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com", 
      phone: "+27 83 987 6543",
      property: "Cloete Street, Bothasrus",
      status: "application_submitted",
      score: 92,
      source: "referral",
      date: "2024-12-14"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-50 text-green-700 border-green-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "leased": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case "viewing_scheduled": return "bg-blue-50 text-blue-700 border-blue-200";
      case "application_submitted": return "bg-green-50 text-green-700 border-green-200";
      case "qualified": return "bg-purple-50 text-purple-700 border-purple-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Leasing & Marketing
                </h1>
                <p className="text-slate-600 text-lg font-medium">Vacancy management and lead conversion optimization</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <Target className="h-3 w-3 mr-1" />
                    Lead Management
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {leasingStats.conversionRate}% Conversion
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Digital Marketing
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {leasingStats.monthlyLeads}
              </div>
              <div className="text-sm text-slate-600 font-medium">Monthly Leads</div>
              <div className="flex items-center justify-end mt-2 text-green-600 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+18.3% growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Current Vacancies</CardTitle>
            <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl border border-red-200/50 shadow-sm">
              <Home className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{leasingStats.totalVacancies}</div>
            <div className="flex items-center">
              <Target className="h-4 w-4 text-red-600 mr-1" />
              <p className="text-sm text-red-600 font-medium">-2 from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Active Listings</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{leasingStats.activeListings}</div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-sm text-blue-600 font-medium">2.3k total views</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Conversion Rate</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{leasingStats.conversionRate}%</div>
            <div className="flex items-center">
              <UserPlus className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">Above average</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg. Viewings</CardTitle>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{leasingStats.averageViewings}</div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-sm text-purple-600 font-medium">Per property</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Overview
          </TabsTrigger>
          <TabsTrigger value="listings" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Active Listings
          </TabsTrigger>
          <TabsTrigger value="leads" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Lead Management
          </TabsTrigger>
          <TabsTrigger value="marketing" className="rounded-lg data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 data-[state=active]:shadow-md font-medium transition-all duration-200">
            Marketing Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Manage your leasing activities efficiently</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Creating new property listing...")}
                  variant="outline"
                >
                  <Building className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">New Listing</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Scheduling property viewing...")}
                  variant="outline"
                >
                  <Calendar className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Schedule Viewing</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Processing lease application...")}
                  variant="outline"
                >
                  <FileText className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Process Application</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-orange-200/60 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Generating marketing report...")}
                  variant="outline"
                >
                  <TrendingUp className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Marketing Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Recent Activity & Performance</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Track your leasing progress and key metrics</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {recentLeads.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="group hover:bg-slate-50/50 transition-all duration-300 p-6 border border-slate-100 rounded-xl shadow-md hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                          <Users className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{lead.name}</div>
                          <div className="text-slate-600 text-sm">{lead.property}</div>
                          <div className="text-xs text-slate-500 mt-1">{lead.email} • {lead.phone}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getLeadStatusColor(lead.status)} mb-2`}>
                          {lead.status.replace('_', ' ')}
                        </Badge>
                        <div className="text-sm text-slate-600">Score: {lead.score}/100</div>
                        <div className="text-xs text-slate-500">{lead.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Active Property Listings</CardTitle>
              <CardDescription>Manage your current rental listings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeListings.map((listing) => (
                  <div key={listing.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{listing.property}</h3>
                        <p className="text-slate-600">{listing.type}</p>
                        <p className="text-2xl font-bold text-green-600 mt-2">{listing.price}</p>
                      </div>
                      <Badge className={getStatusColor(listing.status)}>
                        {listing.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Eye className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-900">{listing.views}</div>
                        <div className="text-xs text-blue-600">Views</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-900">{listing.inquiries}</div>
                        <div className="text-xs text-green-600">Inquiries</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <div className="font-bold text-purple-900">{listing.viewings}</div>
                        <div className="text-xs text-purple-600">Viewings</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                        <div className="font-bold text-orange-900">{listing.daysListed}</div>
                        <div className="text-xs text-orange-600">Days Listed</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit Listing</Button>
                      <Button size="sm" variant="outline">Schedule Viewing</Button>
                      <Button size="sm" variant="outline">View Analytics</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Lead Management Pipeline</CardTitle>
              <CardDescription>Track and convert potential tenants efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{lead.name}</h3>
                          <p className="text-slate-600">{lead.property}</p>
                          <p className="text-sm text-slate-500">{lead.email} • {lead.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getLeadStatusColor(lead.status)} style={{ marginBottom: '8px' }}>
                          {lead.status.replace('_', ' ')}
                        </Badge>
                        <div className="text-sm font-medium text-slate-700">Score: {lead.score}/100</div>
                        <div className="text-xs text-slate-500">Source: {lead.source}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Application
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Marketing Tools & Analytics</CardTitle>
              <CardDescription>Optimize your property marketing strategies</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">Digital Marketing</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      Social Media Campaigns
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Virtual Tours
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      SEO Optimization
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Performance Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Listing Views</span>
                      <span className="font-bold text-green-900">2,340</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Inquiries</span>
                      <span className="font-bold text-green-900">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Conversion Rate</span>
                      <span className="font-bold text-green-900">23.4%</span>
                    </div>
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
