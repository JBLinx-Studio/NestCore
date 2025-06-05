
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  FileText, 
  Zap,
  MessageSquare
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
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-30",
      open ? "w-64" : "w-16"
    )}>
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left transition-all duration-200",
                open ? "px-4" : "px-3",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
                !isActive && "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className={cn("h-5 w-5", open && "mr-3")} />
              {open && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  {!isActive && (
                    <div className="text-xs text-gray-500 truncate">
                      {item.description}
                    </div>
                  )}
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
