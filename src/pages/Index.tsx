
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { PropertyManager } from "@/components/property/PropertyManager";
import { TenantManager } from "@/components/tenant/TenantManager";
import { UtilityTracker } from "@/components/utility/UtilityTracker";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { DocumentManager } from "@/components/document/DocumentManager";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome to PropertyHub AI</h1>
                  <p className="text-blue-100 text-lg">Your intelligent property management solution for South Africa</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-blue-100 text-sm">Active Properties</div>
                </div>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="dashboard" className="space-y-6">
                <DashboardOverview />
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <PropertyManager />
              </TabsContent>

              <TabsContent value="tenants" className="space-y-6">
                <TenantManager />
              </TabsContent>

              <TabsContent value="utilities" className="space-y-6">
                <UtilityTracker />
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <DocumentManager />
              </TabsContent>

              <TabsContent value="ai-assistant" className="space-y-6">
                <AIAssistant />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
