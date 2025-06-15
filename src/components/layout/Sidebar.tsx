import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  DollarSign, 
  Wrench, 
  FileText, 
  HandHeart,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Briefcase,
  UserCheck,
  Zap,
  Activity,
  Bot,
  Search,
  Monitor,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building },
  { id: 'tenants', label: 'Tenants', icon: Users },
  { id: 'financial', label: 'Financial', icon: DollarSign },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'leasing', label: 'Leasing', icon: HandHeart },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'communications', label: 'Communications', icon: MessageSquare },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'people', label: 'People', icon: UserCheck },
  { id: 'utilities', label: 'Utilities', icon: Zap },
  { id: 'api', label: 'API Services', icon: Activity },
  { id: 'ai', label: 'AI Assistant', icon: Bot },
  { id: 'matching', label: 'Property Matching', icon: Search },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, activeTab, setActiveTab }) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 shadow-lg",
      open ? "w-64" : "w-16"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building className="h-6 w-6 text-white" />
          </div>
          {open && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">NestCore</h1>
              <p className="text-xs text-gray-500">Property Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("h-5 w-5", open ? "mr-3" : "mx-auto")} />
                {open && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Developer Tools Section */}
        {open && (
          <div className="mt-8 px-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Developer Tools
            </div>
            <Link
              to="/diagnostics"
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Monitor className="h-5 w-5 mr-3" />
              <span>System Diagnostics</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};
