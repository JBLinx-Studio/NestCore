
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Zap,
  Server,
  Database,
  Wifi,
  Monitor,
  Settings,
  Bug
} from "lucide-react";
import { ApiService, apiServiceManager } from "@/services/ApiServiceManager";
import { propertyApiIntegrationService } from "@/services/PropertyApiIntegrationService";
import { toast } from "sonner";

export const DiagnosticsPage = () => {
  const [services, setServices] = useState<ApiService[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [systemHealth, setSystemHealth] = useState({
    memory: 0,
    performance: 0,
    network: 0,
    storage: 0
  });

  useEffect(() => {
    loadDiagnostics();
    checkSystemHealth();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      checkSystemHealth();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadDiagnostics = async () => {
    setServices(apiServiceManager.getServices());
    await checkAllServices();
  };

  const checkAllServices = async () => {
    setIsChecking(true);
    try {
      const updatedServices = await apiServiceManager.checkAllServices();
      setServices(updatedServices);
      setLastRefresh(new Date());
      toast.success("API diagnostics updated");
    } catch (error) {
      toast.error("Failed to update diagnostics");
    } finally {
      setIsChecking(false);
    }
  };

  const checkSystemHealth = () => {
    // Simulate system health metrics
    setSystemHealth({
      memory: Math.random() * 30 + 60, // 60-90%
      performance: Math.random() * 20 + 75, // 75-95%
      network: Math.random() * 15 + 80, // 80-95%
      storage: Math.random() * 40 + 40 // 40-80%
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'limited': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-400 bg-gray-50';
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const activeServices = services.filter(s => s.status === 'active').length;
  const errorServices = services.filter(s => s.status === 'error').length;
  const avgResponseTime = services.filter(s => s.responseTime).length > 0 
    ? Math.round(services.filter(s => s.responseTime).reduce((acc, s) => acc + (s.responseTime || 0), 0) / services.filter(s => s.responseTime).length)
    : 0;

  const integrationStats = propertyApiIntegrationService.getIntegrationStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">System Diagnostics</h1>
                <p className="text-xl text-gray-300">Developer API & Service Monitor</p>
              </div>
            </div>
            
            <div className="text-right">
              <Button 
                onClick={loadDiagnostics} 
                disabled={isChecking}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                {isChecking ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh All
              </Button>
              {lastRefresh && (
                <p className="text-sm text-gray-300 mt-2">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="apis">API Status</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active APIs</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{activeServices}</div>
                  <p className="text-xs text-muted-foreground">of {services.length} total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failed APIs</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{errorServices}</div>
                  <p className="text-xs text-muted-foreground">need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{avgResponseTime}ms</div>
                  <p className="text-xs text-muted-foreground">response time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Coverage</CardTitle>
                  <Activity className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{integrationStats.coverage}%</div>
                  <p className="text-xs text-muted-foreground">integration coverage</p>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Memory</span>
                      <span className={`text-sm ${getHealthColor(systemHealth.memory)}`}>
                        {Math.round(systemHealth.memory)}%
                      </span>
                    </div>
                    <Progress value={systemHealth.memory} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Performance</span>
                      <span className={`text-sm ${getHealthColor(systemHealth.performance)}`}>
                        {Math.round(systemHealth.performance)}%
                      </span>
                    </div>
                    <Progress value={systemHealth.performance} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Network</span>
                      <span className={`text-sm ${getHealthColor(systemHealth.network)}`}>
                        {Math.round(systemHealth.network)}%
                      </span>
                    </div>
                    <Progress value={systemHealth.network} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Storage</span>
                      <span className={`text-sm ${getHealthColor(systemHealth.storage)}`}>
                        {Math.round(systemHealth.storage)}%
                      </span>
                    </div>
                    <Progress value={systemHealth.storage} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Status Tab */}
          <TabsContent value="apis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {service.type}
                      </div>
                      <div>
                        <span className="font-medium">Cost:</span> {service.isFree ? 'Free' : 'Paid'}
                      </div>
                      <div>
                        <span className="font-medium">Configured:</span> {service.isConfigured ? 'Yes' : 'No'}
                      </div>
                      {service.responseTime && (
                        <div>
                          <span className="font-medium">Response:</span> {service.responseTime}ms
                        </div>
                      )}
                    </div>
                    {service.endpoint && (
                      <div className="text-xs text-gray-600 break-all">
                        <span className="font-medium">Endpoint:</span> {service.endpoint}
                      </div>
                    )}
                    {service.errorMessage && (
                      <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {service.errorMessage}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Integrations:</span>
                    <span className="font-bold">{integrationStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active:</span>
                    <span className="font-bold text-green-600">{integrationStats.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Setup Required:</span>
                    <span className="font-bold text-yellow-600">{integrationStats.setupRequired}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-bold">{integrationStats.coverage}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4" />
                  <p>Performance monitoring coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="h-5 w-5" />
                  <span>System Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                  <div>[{new Date().toISOString()}] INFO: System diagnostics initialized</div>
                  <div>[{new Date().toISOString()}] INFO: API services loaded: {services.length}</div>
                  <div>[{new Date().toISOString()}] INFO: Active services: {activeServices}</div>
                  {errorServices > 0 && (
                    <div>[{new Date().toISOString()}] WARN: {errorServices} services with errors</div>
                  )}
                  <div>[{new Date().toISOString()}] INFO: System health check completed</div>
                  <div>[{new Date().toISOString()}] INFO: Diagnostics page ready</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
