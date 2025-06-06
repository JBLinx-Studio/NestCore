
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  FileText, 
  Zap,
  MessageSquare,
  Home
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics"
  },
  {
    id: "properties",
    label: "Properties",
    icon: Building,
    description: "Manage Properties"
  },
  {
    id: "tenants",
    label: "Tenants",
    icon: Users,
    description: "Tenant Management"
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: Zap,
    description: "Bills & Tracking"
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    description: "File Management"
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: MessageSquare,
    description: "Smart Insights"
  }
];

export const Sidebar = ({ open, activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 transition-all duration-300 z-30 shadow-lg",
      open ? "w-64" : "w-16"
    )}>
      <div className="p-4 space-y-2">
        {/* NestCore Brand when collapsed */}
        {!open && (
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
        
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left transition-all duration-200 group",
                open ? "px-4 py-3" : "px-3 py-3",
                isActive && "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg",
                !isActive && "hover:bg-blue-50 hover:text-blue-700"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform group-hover:scale-110", 
                open && "mr-3",
                isActive && "text-white",
                !isActive && "text-gray-600 group-hover:text-blue-600"
              )} />
              {open && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  {!isActive && (
                    <div className="text-xs text-gray-500 truncate group-hover:text-blue-500">
                      {item.description}
                    </div>
                  )}
                </div>
              )}
            </Button>
          );
        })}
      </div>
      
      {/* Footer brand when expanded */}
      {open && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <Home className="h-4 w-4 text-blue-600" />
            <div className="text-xs text-gray-600">
              <div className="font-semibold text-blue-700">NestCore</div>
              <div>Property Management</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
