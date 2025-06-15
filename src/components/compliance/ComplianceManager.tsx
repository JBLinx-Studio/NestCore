
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  Calendar,
  AlertTriangle, 
  CheckCircle,
  Star,
  Award,
  Clock,
  Building,
  Users,
  Gavel,
  FileCheck,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export const ComplianceManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const complianceStats = {
    totalCompliance: 87.5,
    activeCertificates: 24,
    expiringThisMonth: 3,
    overdueItems: 2,
    inspectionsPending: 5,
    legalCases: 1
  };

  const complianceItems = [
    {
      id: 1,
      type: "Fire Safety Certificate",
      property: "Berg Street Complex",
      status: "active",
      expiryDate: "2025-06-15",
      daysToExpiry: 182,
      priority: "medium",
      inspector: "Cape Fire Department"
    },
    {
      id: 2,
      type: "Electrical Compliance",
      property: "Cloete Street",
      status: "expiring",
      expiryDate: "2025-01-10",
      daysToExpiry: 26,
      priority: "high",
      inspector: "Electrical Safety Board"
    },
    {
      id: 3,
      type: "Water Quality Certificate",
      property: "Mill Park",
      status: "overdue",
      expiryDate: "2024-11-30",
      daysToExpiry: -15,
      priority: "critical",
      inspector: "Municipal Health"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-50 text-green-700 border-green-200";
      case "expiring": return "bg-amber-50 text-amber-700 border-amber-200";
      case "overdue": return "bg-red-50 text-red-700 border-red-200";
      case "pending": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-50 text-red-700 border-red-200";
      case "high": return "bg-orange-50 text-orange-700 border-orange-200";
      case "medium": return "bg-amber-50 text-amber-700 border-amber-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-red-50/20 border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.06),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-red-100/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 via-red-700 to-rose-700 rounded-2xl flex items-center justify-center shadow-xl shadow-red-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Compliance & Legal
                </h1>
                <p className="text-slate-600 text-lg font-medium">Regulatory compliance, certifications & legal management</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 transition-colors px-3 py-1">
                    <Shield className="h-3 w-3 mr-1" />
                    Compliance Tracking
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <FileCheck className="h-3 w-3 mr-1" />
                    {complianceStats.totalCompliance}% Compliant
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Legal Management
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {complianceStats.totalCompliance}%
              </div>
              <div className="text-sm text-slate-600 font-medium">Compliance Score</div>
              <div className="flex items-center justify-end mt-2 text-amber-600 text-sm font-medium">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>{complianceStats.expiringThisMonth} expiring soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Active Certificates</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <FileCheck className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{complianceStats.activeCertificates}</div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">All current</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Expiring This Month</CardTitle>
            <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl border border-amber-200/50 shadow-sm">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{complianceStats.expiringThisMonth}</div>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
              <p className="text-sm text-amber-600 font-medium">Renewal required</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Overdue Items</CardTitle>
            <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl border border-red-200/50 shadow-sm">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{complianceStats.overdueItems}</div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-1" />
              <p className="text-sm text-red-600 font-medium">Immediate action</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Pending Inspections</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{complianceStats.inspectionsPending}</div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-sm text-blue-600 font-medium">Scheduled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="legal">Legal Affairs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-red-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Compliance Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Manage regulatory compliance efficiently</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-red-200/60 text-red-700 hover:bg-red-50 hover:border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Adding new certificate...")}
                  variant="outline"
                >
                  <FileCheck className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Add Certificate</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Scheduling inspection...")}
                  variant="outline"
                >
                  <Calendar className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Schedule Inspection</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Opening legal case...")}
                  variant="outline"
                >
                  <Gavel className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Legal Matter</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Generating compliance report...")}
                  variant="outline"
                >
                  <FileText className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Compliance Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Items */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Critical Compliance Items</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Monitor certificates and regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {complianceItems.map((item) => (
                  <div key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300 p-6 border border-slate-100 rounded-xl shadow-md hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 border border-red-200 rounded-xl flex items-center justify-center shadow-sm">
                          <Shield className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-lg">{item.type}</div>
                          <div className="text-slate-600">{item.property}</div>
                          <div className="text-sm text-slate-500 mt-1">Inspector: {item.inspector}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(item.status)} mb-2`}>
                          {item.status}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority} priority
                        </Badge>
                        <div className="text-sm text-slate-600 mt-2">
                          {item.daysToExpiry > 0 ? `${item.daysToExpiry} days left` : `${Math.abs(item.daysToExpiry)} days overdue`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Expiry: {item.expiryDate}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Certificate</Button>
                        <Button size="sm" variant="outline">Renew</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Certificate Management</CardTitle>
              <CardDescription>Track all property certificates and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceItems.map((item) => (
                  <div key={item.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{item.type}</h3>
                        <p className="text-slate-600">{item.property}</p>
                        <p className="text-sm text-slate-500 mt-1">Inspector: {item.inspector}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(item.status)} className="mb-2">
                          {item.status}
                        </Badge>
                        <div className="text-sm text-slate-600">Expires: {item.expiryDate}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <FileCheck className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-900">{item.type}</div>
                        <div className="text-xs text-blue-600">Certificate Type</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Building className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-900">{item.property}</div>
                        <div className="text-xs text-green-600">Property</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <div className="font-bold text-purple-900">{item.expiryDate}</div>
                        <div className="text-xs text-purple-600">Expiry Date</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Certificate</Button>
                      <Button size="sm" variant="outline">Download PDF</Button>
                      <Button size="sm" variant="outline">Schedule Renewal</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Inspection Schedules</CardTitle>
              <CardDescription>Manage property inspections and compliance checks</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">Upcoming Inspections</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Fire Safety Inspection</div>
                        <div className="text-sm text-slate-600">Berg Street Complex</div>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700">Dec 22</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Electrical Compliance</div>
                        <div className="text-sm text-slate-600">Cloete Street</div>
                      </div>
                      <Badge className="bg-orange-50 text-orange-700">Jan 10</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Recent Inspections</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Pool Safety Check</div>
                        <div className="text-sm text-slate-600">Mill Park Complex</div>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Passed</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Water Quality Test</div>
                        <div className="text-sm text-slate-600">All Properties</div>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Compliant</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Legal Affairs Management</CardTitle>
              <CardDescription>Track legal matters, contracts and regulatory issues</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-lg text-purple-900 mb-4">Active Legal Cases</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-purple-100">
                      <div className="font-medium text-slate-900">Tenant Dispute Resolution</div>
                      <div className="text-sm text-slate-600">Berg Street - Unit 2A</div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="bg-amber-50 text-amber-700">In Progress</Badge>
                        <span className="text-xs text-slate-500">Opened: Dec 1, 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Legal Documents</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Lease Agreements
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Gavel className="h-4 w-4 mr-2" />
                      Legal Notices
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Compliance Documents
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
