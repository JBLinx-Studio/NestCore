
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Menu, Settings, User, Home, Users, Building, TrendingUp, X, Check, AlertCircle, DollarSign, Wrench } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "payment",
      title: "Rent Payment Overdue",
      message: "Sarah Johnson's rent payment is 3 days overdue",
      time: "2 hours ago",
      read: false,
      icon: DollarSign,
      color: "text-red-500"
    },
    {
      id: 2,
      type: "maintenance",
      title: "Maintenance Request",
      message: "Plumbing issue reported at Ocean View Villa",
      time: "4 hours ago",
      read: false,
      icon: Wrench,
      color: "text-orange-500"
    },
    {
      id: 3,
      type: "tenant",
      title: "New Tenant Application",
      message: "Michael Chen submitted application for Sunset Apartments",
      time: "1 day ago",
      read: true,
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: 4,
      type: "system",
      title: "System Update",
      message: "New features available in your dashboard",
      time: "2 days ago",
      read: true,
      icon: AlertCircle,
      color: "text-green-500"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotifications = () => {
    setShowNotifications(true);
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
    toast.success("Notification deleted");
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "settings":
        setShowSettings(true);
        break;
      case "users":
        setShowUserManagement(true);
        break;
      case "portfolio":
        setShowPortfolio(true);
        break;
      case "support":
        window.open("https://help.nestcore.com", "_blank");
        toast.info("Opening support center...");
        break;
      case "resources":
        window.open("https://resources.nestcore.com", "_blank");
        toast.info("Opening industry resources...");
        break;
      case "logout":
        if (confirm("Are you sure you want to logout?")) {
          toast.success("Logging out...");
          // In a real app, this would handle logout
        }
        break;
      default:
        toast.info("Feature coming soon!");
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 border-b border-gray-700 px-6 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-white/10 text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Home className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-2xl text-white">NestCore</span>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-2 py-1">
                    Pro
                  </Badge>
                </div>
                <div className="text-sm text-blue-200">Complete Real Estate Ecosystem</div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Industry Stats */}
            <div className="hidden lg:flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowPortfolio(true)}>
                <Building className="h-4 w-4 text-blue-300" />
                <div className="text-sm">
                  <div className="font-semibold">324</div>
                  <div className="text-xs text-blue-200">Properties</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowUserManagement(true)}>
                <Users className="h-4 w-4 text-purple-300" />
                <div className="text-sm">
                  <div className="font-semibold">1,247</div>
                  <div className="text-xs text-purple-200">Users</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-300" />
                <div className="text-sm">
                  <div className="font-semibold">94.2%</div>
                  <div className="text-xs text-green-200">Occupied</div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-white hover:bg-white/10"
              onClick={handleNotifications}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white hover:bg-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block">Property Manager</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl border border-gray-200">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMenuAction("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings & Preferences
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuAction("users")}>
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuAction("portfolio")}>
                  <Building className="mr-2 h-4 w-4" />
                  Property Portfolio
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMenuAction("support")}>
                  Support Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuAction("resources")}>
                  Industry Resources
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => handleMenuAction("logout")}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark All Read
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon className={`h-5 w-5 ${notification.color} mt-0.5`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{notification.title}</div>
                        <div className="text-sm text-gray-600">{notification.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Panel */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Settings & Preferences</DialogTitle>
            <DialogDescription>Configure your NestCore experience</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Profile Information
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Password & Security
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Preferences
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Theme & Display
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Data & Privacy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Backup & Sync
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Management Panel */}
      <Dialog open={showUserManagement} onOpenChange={setShowUserManagement}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>User Management</DialogTitle>
            <DialogDescription>Manage users and permissions across your properties</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Active Users: 1,247</div>
              <Button>Add New User</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Property Managers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">Active managers</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tenants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,198</div>
                  <div className="text-sm text-gray-600">Current tenants</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Maintenance Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">37</div>
                  <div className="text-sm text-gray-600">Active staff</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Portfolio Overview Panel */}
      <Dialog open={showPortfolio} onOpenChange={setShowPortfolio}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Property Portfolio Overview</DialogTitle>
            <DialogDescription>Comprehensive view of your real estate portfolio</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">324</div>
                <div className="text-sm text-green-600">+12 this month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,847</div>
                <div className="text-sm text-blue-600">94.2% occupied</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R2.4M</div>
                <div className="text-sm text-green-600">+8.5% vs last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R890M</div>
                <div className="text-sm text-green-600">+12.3% YoY</div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
