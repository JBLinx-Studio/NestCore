
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Menu, Settings, User, Home, Users, Building, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const handleNotifications = () => {
    toast.info("7 new notifications - Payment alerts, maintenance updates, and more!");
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "settings":
        toast.info("Settings panel coming soon - Configure your preferences!");
        break;
      case "users":
        toast.info("User management interface coming soon!");
        break;
      case "portfolio":
        toast.info("Portfolio overview coming soon - Detailed property analytics!");
        break;
      case "support":
        toast.info("Support center coming soon - Get help when you need it!");
        break;
      case "resources":
        toast.info("Industry resources coming soon - Legal docs, market data, and more!");
        break;
      case "logout":
        toast.success("Logout functionality coming soon - Secure session management!");
        break;
      default:
        toast.info("Feature coming soon!");
    }
  };

  return (
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
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-blue-300" />
              <div className="text-sm">
                <div className="font-semibold">324</div>
                <div className="text-xs text-blue-200">Properties</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
              7
            </Badge>
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
  );
};
