
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  FileText, 
  Zap,
  MessageSquare,
  Home,
  TrendingUp,
  Briefcase,
  DollarSign,
  Wrench,
  Target,
  Shield,
  BarChart3,
  MessageCircle
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigationItems = [
  // Core Management
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Industry Overview",
    category: "core"
  },
  {
    id: "properties",
    label: "Properties",
    icon: Building,
    description: "Portfolio Management",
    category: "core"
  },
  {
    id: "tenants",
    label: "Users Hub",
    icon: Users,
    description: "All Industry Professionals",
    category: "core"
  },
  
  // Professional Services
  {
    id: "work",
    label: "Professional Work",
    icon: Briefcase,
    description: "CMA, Valuations & Analysis",
    category: "professional"
  },
  {
    id: "leasing",
    label: "Leasing & Marketing",
    icon: Target,
    description: "Vacancy & Lead Management",
    category: "professional"
  },
  
  // Operations
  {
    id: "maintenance",
    label: "Operations",
    icon: Wrench,
    description: "Maintenance & Vendors",
    category: "operations"
  },
  {
    id: "financial",
    label: "Financial",
    icon: DollarSign,
    description: "Income, Expenses & ROI",
    category: "operations"
  },
  {
    id: "utilities",
    label: "Utilities",
    icon: Zap,
    description: "Service Management",
    category: "operations"
  },
  
  // Compliance & Insights
  {
    id: "compliance",
    label: "Compliance",
    icon: Shield,
    description: "Legal & Regulatory",
    category: "compliance"
  },
  {
    id: "reports",
    label: "Analytics",
    icon: BarChart3,
    description: "Reports & Insights",
    category: "compliance"
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    description: "Legal & Contracts",
    category: "compliance"
  },
  
  // Communication
  {
    id: "communications",
    label: "Communications",
    icon: MessageCircle,
    description: "Messages & Notifications",
    category: "communication"
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: MessageSquare,
    description: "Smart Insights",
    category: "communication"
  }
];

const categoryLabels = {
  core: "Core Management",
  professional: "Professional Services", 
  operations: "Operations",
  compliance: "Compliance & Legal",
  communication: "Communication"
};

export const Sidebar = ({ open, activeTab, setActiveTab }: SidebarProps) => {
  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-gradient-to-b from-white via-blue-50 to-purple-50 border-r border-gray-200 transition-all duration-300 z-30 shadow-xl overflow-hidden flex flex-col",
      open ? "w-64" : "w-16"
    )}>
      {/* Header spacer */}
      <div className="h-20 border-b border-gray-200 flex items-center justify-center">
        {open ? (
          <div className="flex items-center space-x-2 px-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800">NestCore</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Home className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Scrollable navigation area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-1">
              {open && (
                <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </div>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left transition-all duration-200 group",
                      open ? "px-4 py-3" : "px-3 py-3",
                      isActive && "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg transform scale-[1.02]",
                      !isActive && "hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                    )}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className={cn(
                      "h-4 w-4 transition-all duration-200 group-hover:scale-110", 
                      open && "mr-3",
                      isActive && "text-white",
                      !isActive && "text-gray-600 group-hover:text-blue-600"
                    )} />
                    {open && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.label}</div>
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
              {open && <div className="h-2" />}
            </div>
          ))}
        </div>
      </div>
      
      {/* Fixed bottom stats section */}
      {open && (
        <div className="p-4 bg-gradient-to-t from-purple-50 to-transparent border-t border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">94.2%</span>
              </div>
              <span className="text-xs text-green-600">Occupancy</span>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              <Home className="h-4 w-4 text-blue-600" />
              <div className="text-xs text-gray-600">
                <div className="font-semibold text-blue-700">NestCore</div>
                <div>Real Estate Ecosystem</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
