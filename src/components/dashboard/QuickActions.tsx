
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Upload, 
  MessageSquare, 
  Calendar,
  FileText,
  Users,
  Home,
  Zap,
  TrendingUp,
  Download
} from "lucide-react";

interface QuickActionsProps {
  setActiveTab: (tab: string) => void;
}

export const QuickActions = ({ setActiveTab }: QuickActionsProps) => {
  const actions = [
    {
      title: "Add Property",
      description: "List a new property",
      icon: Home,
      color: "from-blue-500 to-blue-600",
      action: () => setActiveTab("properties")
    },
    {
      title: "Add User",
      description: "Invite new professionals",
      icon: Users,
      color: "from-green-500 to-green-600",
      action: () => setActiveTab("tenants")
    },
    {
      title: "Schedule Meeting",
      description: "Book consultation",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      action: () => console.log("Schedule meeting")
    },
    {
      title: "Generate Report",
      description: "Create analytics report",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      action: () => console.log("Generate report")
    },
    {
      title: "Upload Documents",
      description: "Add legal documents",
      icon: Upload,
      color: "from-indigo-500 to-indigo-600",
      action: () => setActiveTab("documents")
    },
    {
      title: "AI Assistant",
      description: "Get smart insights",
      icon: MessageSquare,
      color: "from-pink-500 to-pink-600",
      action: () => setActiveTab("ai-assistant")
    }
  ];

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>
          Streamline your workflow with one-click actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all duration-200 border-gray-200 hover:border-gray-300"
                onClick={action.action}
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 text-sm">
                    {action.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
