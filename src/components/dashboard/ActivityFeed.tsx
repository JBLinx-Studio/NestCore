
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Home, 
  Users, 
  FileText, 
  DollarSign,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "payment",
      user: "Sarah Johnson",
      action: "Payment received",
      details: "R2,800 for Sunnydale Apartments",
      time: "2 minutes ago",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      type: "maintenance",
      user: "David Thompson",
      action: "Maintenance request completed",
      details: "Plumbing repair at Garden View Flats",
      time: "15 minutes ago",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      type: "lease",
      user: "Agent Jane Smith",
      action: "New lease agreement",
      details: "Unit 3B at Ocean View Villa",
      time: "1 hour ago",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      type: "alert",
      user: "System",
      action: "Payment overdue alert",
      details: "Michael Chen - Garden View Flats",
      time: "2 hours ago",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 5,
      type: "message",
      user: "Lisa Parker",
      action: "Legal consultation scheduled",
      details: "Property law review meeting",
      time: "3 hours ago",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-blue-100 text-blue-800";
      case "lease": return "bg-purple-100 text-purple-800";
      case "alert": return "bg-red-100 text-red-800";
      case "message": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Stay updated with the latest activities across your ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <Badge className={getTypeColor(activity.type)}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {activity.details}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
