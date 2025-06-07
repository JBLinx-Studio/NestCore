
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  FileText, 
  DollarSign,
  Calendar,
  TrendingUp,
  Plus,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

interface PropertyWorkflowProps {
  properties: any[];
  onQuickAction: (action: string, property?: any) => void;
}

export const PropertyWorkflow = ({ properties, onQuickAction }: PropertyWorkflowProps) => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  // Calculate workflow metrics
  const totalProperties = properties.length;
  const activeProperties = properties.filter(p => p.status === 'active').length;
  const vacantProperties = properties.filter(p => p.status === 'vacant').length;
  const maintenanceProperties = properties.filter(p => p.status === 'maintenance').length;

  const occupancyRate = totalProperties > 0 ? (activeProperties / totalProperties) * 100 : 0;
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const unitOccupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

  const workflows = [
    {
      id: "new-property",
      title: "Add New Property",
      description: "Quick setup for a new property listing",
      steps: ["Property Details", "Upload Photos", "Set Pricing", "List Property"],
      icon: Plus,
      color: "bg-blue-500",
      action: () => onQuickAction("add-property")
    },
    {
      id: "rent-collection",
      title: "Rent Collection",
      description: "Review and collect outstanding rent",
      steps: ["Review Tenants", "Send Reminders", "Process Payments", "Update Records"],
      icon: DollarSign,
      color: "bg-green-500",
      action: () => onQuickAction("rent-collection")
    },
    {
      id: "maintenance",
      title: "Schedule Maintenance",
      description: "Plan and track property maintenance",
      steps: ["Identify Issues", "Schedule Work", "Track Progress", "Complete & Document"],
      icon: AlertTriangle,
      color: "bg-orange-500",
      action: () => onQuickAction("maintenance")
    },
    {
      id: "tenant-screening",
      title: "Tenant Screening",
      description: "Screen and onboard new tenants",
      steps: ["Application Review", "Background Check", "Reference Check", "Lease Signing"],
      icon: Users,
      color: "bg-purple-500",
      action: () => onQuickAction("tenant-screening")
    }
  ];

  const handleWorkflowStart = (workflow: any) => {
    setActiveWorkflow(workflow.id);
    toast.success(`Starting ${workflow.title} workflow`);
    workflow.action();
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Properties</p>
                <p className="text-2xl font-bold text-blue-900">{totalProperties}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={occupancyRate} className="h-2" />
              <p className="text-xs text-blue-600 mt-1">{occupancyRate.toFixed(0)}% Portfolio Active</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Unit Occupancy</p>
                <p className="text-2xl font-bold text-green-900">{occupiedUnits}/{totalUnits}</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={unitOccupancyRate} className="h-2" />
              <p className="text-xs text-green-600 mt-1">{unitOccupancyRate.toFixed(0)}% Units Occupied</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Vacant Units</p>
                <p className="text-2xl font-bold text-yellow-900">{vacantProperties}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                Needs Attention
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Maintenance</p>
                <p className="text-2xl font-bold text-orange-900">{maintenanceProperties}</p>
              </div>
              <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Workflows */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Quick Action Workflows</span>
          </CardTitle>
          <CardDescription>
            Streamlined workflows to complete common tasks efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((workflow) => {
              const Icon = workflow.icon;
              const isActive = activeWorkflow === workflow.id;
              
              return (
                <Card 
                  key={workflow.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleWorkflowStart(workflow)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`h-10 w-10 ${workflow.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{workflow.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                        <div className="flex items-center space-x-1">
                          {workflow.steps.map((step, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{step}</span>
                              {index < workflow.steps.length - 1 && (
                                <ArrowRight className="h-3 w-3 text-gray-400 mx-1" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Today's Priority Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">Collect overdue rent from 3 tenants</span>
              </div>
              <Button size="sm" onClick={() => {
                toast.success("Opening rent collection workflow");
                onQuickAction("rent-collection");
              }}>
                Start
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Schedule maintenance for Ocean View Villa</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => {
                toast.success("Opening maintenance scheduling");
                onQuickAction("maintenance");
              }}>
                Schedule
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Follow up on 2 pending tenant applications</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => {
                toast.success("Opening tenant screening workflow");
                onQuickAction("tenant-screening");
              }}>
                Follow Up
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Review and approve 1 maintenance request</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => {
                toast.success("Opening maintenance requests");
                onQuickAction("maintenance");
              }}>
                Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
