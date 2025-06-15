
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mail, 
  Bell,
  Send, 
  Users,
  Star,
  Award,
  Clock,
  CheckCircle,
  Building,
  Phone,
  MessageSquare,
  Megaphone
} from "lucide-react";
import { toast } from "sonner";

export const CommunicationsManager = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const commStats = {
    totalMessages: 1456,
    unreadMessages: 23,
    sentThisMonth: 234,
    responseRate: 94.2,
    avgResponseTime: 2.3,
    notifications: 67
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
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/25 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2">
                  Communications Hub
                </h1>
                <p className="text-slate-600 text-lg font-medium">Tenant messaging, notifications & team collaboration</p>
                <div className="flex gap-3 mt-4">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Messaging System
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors px-3 py-1">
                    <Bell className="h-3 w-3 mr-1" />
                    {commStats.responseRate}% Response Rate
                  </Badge>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors px-3 py-1">
                    <Award className="h-3 w-3 mr-1" />
                    Multi-Channel
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {commStats.unreadMessages}
              </div>
              <div className="text-sm text-slate-600 font-medium">Unread Messages</div>
              <div className="flex items-center justify-end mt-2 text-blue-600 text-sm font-medium">
                <Clock className="h-4 w-4 mr-1" />
                <span>{commStats.avgResponseTime}h avg response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Messages</CardTitle>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 mb-1">{commStats.totalMessages.toLocaleString()}</div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
              <p className="text-sm text-blue-600 font-medium">All time</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Unread Messages</CardTitle>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl border border-orange-200/50 shadow-sm">
              <Bell className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{commStats.unreadMessages}</div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-orange-600 mr-1" />
              <p className="text-sm text-orange-600 font-medium">Requires attention</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Response Rate</CardTitle>
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{commStats.responseRate}%</div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">Excellent</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg Response Time</CardTitle>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-1">{commStats.avgResponseTime}h</div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-purple-600 mr-1" />
              <p className="text-sm text-purple-600 font-medium">Fast response</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
              <CardTitle className="text-2xl text-slate-900 font-bold">Communication Quick Actions</CardTitle>
              <CardDescription className="text-slate-600 text-lg">Manage your communications efficiently</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-blue-200/60 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Composing new message...")}
                  variant="outline"
                >
                  <MessageCircle className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">New Message</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-green-200/60 text-green-700 hover:bg-green-50 hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Creating announcement...")}
                  variant="outline"
                >
                  <Megaphone className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Send Announcement</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-purple-200/60 text-purple-700 hover:bg-purple-50 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Setting up notification...")}
                  variant="outline"
                >
                  <Bell className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Create Notification</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-orange-200/60 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl"
                  onClick={() => toast.success("Opening email templates...")}
                  variant="outline"
                >
                  <Mail className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Email Templates</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Communication Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
              <CardHeader className="bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-b border-slate-200/50">
                <CardTitle className="text-xl text-slate-900 font-bold">Active Channels</CardTitle>
                <CardDescription className="text-slate-600">Communication channels and their status</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-900">In-App Messaging</div>
                        <div className="text-sm text-blue-700">Real-time communication</div>
                      </div>
                    </div>
                    <Badge className="bg-green-50 text-green-700">Active</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900">Email System</div>
                        <div className="text-sm text-green-700">Automated & manual emails</div>
                      </div>
                    </div>
                    <Badge className="bg-green-50 text-green-700">Active</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-purple-900">SMS Notifications</div>
                        <div className="text-sm text-purple-700">Urgent notifications</div>
                      </div>
                    </div>
                    <Badge className="bg-purple-50 text-purple-700">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
              <CardHeader className="bg-gradient-to-r from-slate-50/80 to-green-50/30 border-b border-slate-200/50">
                <CardTitle className="text-xl text-slate-900 font-bold">Recent Communications</CardTitle>
                <CardDescription className="text-slate-600">Latest messages and announcements</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-900">Monthly Newsletter</div>
                      <span className="text-sm text-slate-500">2 hours ago</span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">Sent to all tenants</div>
                    <Badge className="bg-blue-50 text-blue-700">Email</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-900">Maintenance Notice</div>
                      <span className="text-sm text-slate-500">1 day ago</span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">Berg Street Complex</div>
                    <Badge className="bg-orange-50 text-orange-700">Announcement</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-slate-900">Welcome Message</div>
                      <span className="text-sm text-slate-500">3 days ago</span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">New tenant onboarding</div>
                    <Badge className="bg-green-50 text-green-700">Direct Message</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Message Center</CardTitle>
              <CardDescription>Manage all your communications in one place</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Advanced Messaging System</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Send messages to tenants, manage conversations, and track communication history with our integrated messaging platform.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Open Message Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Notification Management</CardTitle>
              <CardDescription>Configure and manage system notifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-lg text-purple-900 mb-4">System Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Payment Reminders</div>
                        <div className="text-sm text-slate-600">Auto-send rent reminders</div>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Maintenance Updates</div>
                        <div className="text-sm text-slate-600">Work order notifications</div>
                      </div>
                      <Badge className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-lg text-orange-900 mb-4">Alert Settings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Emergency Alerts</div>
                        <div className="text-sm text-slate-600">Critical notifications</div>
                      </div>
                      <Badge className="bg-red-50 text-red-700">High Priority</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Event Announcements</div>
                        <div className="text-sm text-slate-600">Community events</div>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700">Standard</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="bg-white border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-built templates for common communications</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Welcome Messages</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      New Tenant Welcome
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Building className="h-4 w-4 mr-2" />
                      Property Orientation
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Information
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">Maintenance Templates</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Maintenance Notice
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      Service Completion
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Follow-up Survey
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-lg text-orange-900 mb-4">Payment Templates</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Payment Reminder
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Payment Confirmation
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Late Payment Notice
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
