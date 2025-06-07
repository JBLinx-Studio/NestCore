
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  Bell,
  TrendingUp,
  UserPlus,
  FileText,
  Home
} from "lucide-react";
import { toast } from "sonner";

interface TenantWorkflowProps {
  tenants: any[];
  onQuickAction: (action: string, tenant?: any) => void;
}

export const TenantWorkflow = ({ tenants, onQuickAction }: TenantWorkflowProps) => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  // Calculate tenant metrics
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'active').length;
  const overdueRent = tenants.filter(t => t.rentStatus === 'overdue').length;
  const newApplications = tenants.filter(t => t.status === 'application').length;
  
  const totalRentDue = tenants.reduce((sum, t) => sum + (t.rentAmount || 0), 0);
  const collectedRent = tenants
    .filter(t => t.rentStatus === 'paid')
    .reduce((sum, t) => sum + (t.rentAmount || 0), 0);
  const collectionRate = totalRentDue > 0 ? (collectedRent / totalRentDue) * 100 : 0;

  const workflows = [
    {
      id: "new-tenant",
      title: "Add New Tenant",
      description: "Onboard a new tenant",
      icon: UserPlus,
      color: "bg-blue-500",
      urgency: "normal",
      action: () => onQuickAction("add-tenant")
    },
    {
      id: "rent-reminder",
      title: "Send Rent Reminders",
      description: `${overdueRent} tenants have overdue rent`,
      icon: Bell,
      color: "bg-red-500",
      urgency: "high",
      action: () => onQuickAction("rent-reminders")
    },
    {
      id: "lease-renewal",
      title: "Lease Renewals",
      description: "Process upcoming lease renewals",
      icon: FileText,
      color: "bg-orange-500",
      urgency: "medium",
      action: () => onQuickAction("lease-renewals")
    },
    {
      id: "maintenance-requests",
      title: "Maintenance Requests",
      description: "Review tenant maintenance requests",
      icon: AlertTriangle,
      color: "bg-yellow-500",
      urgency: "medium",
      action: () => onQuickAction("maintenance-requests")
    }
  ];

  const urgentTasks = [
    {
      type: "overdue",
      message: `${overdueRent} tenants have overdue rent payments`,
      action: () => onQuickAction("rent-reminders"),
      priority: "high"
    },
    {
      type: "applications",
      message: `${newApplications} new tenant applications to review`,
      action: () => onQuickAction("review-applications"),
      priority: "medium"
    },
    {
      type: "expiring",
      message: "3 leases expiring in the next 30 days",
      action: () => onQuickAction("lease-renewals"),
      priority: "medium"
    }
  ];

  const handleWorkflowStart = (workflow: any) => {
    setActiveWorkflow(workflow.id);
    toast.success(`Starting ${workflow.title} workflow`);
    workflow.action();
  };

  const handleQuickContact = (tenant: any, method: string) => {
    switch (method) {
      case 'call':
        toast.success(`Calling ${tenant.name} at ${tenant.phone}`);
        window.open(`tel:${tenant.phone}`);
        break;
      case 'email':
        toast.success(`Opening email to ${tenant.name}`);
        window.open(`mailto:${tenant.email}`);
        break;
      case 'message':
        toast.success(`Opening message to ${tenant.name}`);
        // In real app, would open messaging interface
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tenant Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Tenants</p>
                <p className="text-2xl font-bold text-blue-900">{totalTenants}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={(activeTenants / totalTenants) * 100} className="h-2" />
              <p className="text-xs text-blue-600 mt-1">{activeTenants} Active Tenants</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Rent Collection</p>
                <p className="text-2xl font-bold text-green-900">{collectionRate.toFixed(0)}%</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={collectionRate} className="h-2" />
              <p className="text-xs text-green-600 mt-1">R{collectedRent.toLocaleString()} / R{totalRentDue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Overdue Rent</p>
                <p className="text-2xl font-bold text-red-900">{overdueRent}</p>
              </div>
              <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="destructive" className="text-xs">
                Requires Action
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Applications</p>
                <p className="text-2xl font-bold text-purple-900">{newApplications}</p>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-purple-700 border-purple-300 text-xs">
                Pending Review
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Urgent Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {urgentTasks.map((task, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.priority === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="font-medium">{task.message}</span>
                </div>
                <Button size="sm" onClick={task.action}>
                  Take Action
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tenant Workflows */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Tenant Management Workflows</span>
          </CardTitle>
          <CardDescription>
            Streamlined processes for common tenant management tasks
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
                  } ${workflow.urgency === 'high' ? 'border-red-200' : ''}`}
                  onClick={() => handleWorkflowStart(workflow)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`h-10 w-10 ${workflow.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{workflow.title}</h4>
                          {workflow.urgency === 'high' && (
                            <Badge variant="destructive" className="text-xs">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{workflow.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-green-600" />
            <span>Quick Contact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tenants.slice(0, 6).map((tenant) => (
              <Card key={tenant.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        {tenant.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{tenant.name}</h4>
                      <p className="text-sm text-gray-600">{tenant.property}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleQuickContact(tenant, 'call')}
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleQuickContact(tenant, 'email')}
                    >
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleQuickContact(tenant, 'message')}
                    >
                      <Bell className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
