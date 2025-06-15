
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Globe, 
  Building, 
  MapPin, 
  User,
  FileText,
  Clock,
  Zap
} from "lucide-react";
import { ApiService, apiServiceManager } from "@/services/ApiServiceManager";
import { toast } from "sonner";

export const ApiDashboard = () => {
  const [services, setServices] = useState<ApiService[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    loadServices();
    checkAllServices();
  }, []);

  const loadServices = () => {
    setServices(apiServiceManager.getServices());
  };

  const checkAllServices = async () => {
    setIsChecking(true);
    try {
      const updatedServices = await apiServiceManager.checkAllServices();
      setServices(updatedServices);
      setLastRefresh(new Date());
      toast.success("API health check completed");
    } catch (error) {
      toast.error("Failed to check API services");
    } finally {
      setIsChecking(false);
    }
  };

  const checkSingleService = async (serviceId: string) => {
    try {
      const updatedService = await apiServiceManager.checkServiceHealth(serviceId);
      setServices(prev => prev.map(s => s.id === serviceId ? updatedService : s));
      toast.success(`${updatedService.name} status updated`);
    } catch (error) {
      toast.error(`Failed to check ${serviceId}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'limited': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      case 'limited': return <AlertTriangle className="h-4 w-4" />;
      case 'inactive': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property': return <Building className="h-5 w-5" />;
      case 'mapping': return <MapPin className="h-5 w-5" />;
      case 'geocoding': return <Globe className="h-5 w-5" />;
      case 'identity': return <User className="h-5 w-5" />;
      case 'government': return <FileText className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const activeServices = services.filter(s => s.status === 'active').length;
  const totalServices = services.length;
  const freeServices = services.filter(s => s.isFree).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Services Dashboard</h1>
              <p className="text-lg text-gray-600">Monitor and manage all integrated services</p>
            </div>
          </div>
          
          <div className="text-right">
            <Button 
              onClick={checkAllServices} 
              disabled={isChecking}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isChecking ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh All
            </Button>
            {lastRefresh && (
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeServices}/{totalServices}</div>
            <Progress value={(activeServices / totalServices) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Services</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{freeServices}</div>
            <p className="text-xs text-muted-foreground">Available without API keys</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {services.filter(s => s.responseTime).length > 0 
                ? Math.round(services.filter(s => s.responseTime).reduce((acc, s) => acc + (s.responseTime || 0), 0) / services.filter(s => s.responseTime).length)
                : 0}ms
            </div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Configured</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {services.filter(s => s.isConfigured).length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(service.status)}`} />
            
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(service.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => checkSingleService(service.id)}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(service.status)}
                  <span className="font-medium capitalize">{service.status}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Badge variant={service.isFree ? "default" : "secondary"}>
                    {service.isFree ? "Free" : "Paid"}
                  </Badge>
                  <Badge variant={service.isConfigured ? "default" : "outline"}>
                    {service.isConfigured ? "Configured" : "Setup Required"}
                  </Badge>
                </div>
              </div>

              {service.endpoint && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Endpoint:</span> {service.endpoint}
                </div>
              )}

              {service.responseTime && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Response Time:</span> {service.responseTime}ms
                </div>
              )}

              {service.dailyUsage !== undefined && service.dailyLimit && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Usage</span>
                    <span>{service.dailyUsage}/{service.dailyLimit}</span>
                  </div>
                  <Progress value={(service.dailyUsage / service.dailyLimit) * 100} />
                </div>
              )}

              {service.errorMessage && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  <span className="font-medium">Error:</span> {service.errorMessage}
                </div>
              )}

              {service.lastChecked && (
                <div className="text-xs text-gray-500">
                  Last checked: {service.lastChecked.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
