
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { PropertyManager } from "@/components/property/PropertyManager";
import { TenantManager } from "@/components/tenant/TenantManager";
import { UtilityTracker } from "@/components/utility/UtilityTracker";
import { DocumentManager } from "@/components/document/DocumentManager";
import { AIAssistant } from "@/components/ai/AIAssistant";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview setActiveTab={setActiveTab} />;
      case "properties":
        return <PropertyManager />;
      case "tenants":
        return <TenantManager />;
      case "utilities":
        return <UtilityTracker />;
      case "documents":
        return <DocumentManager />;
      case "ai-assistant":
        return <AIAssistant />;
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 w-full">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar open={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className={`transition-all duration-300 ${
              sidebarOpen ? "ml-64" : "ml-16"
            } mt-16 p-6 min-h-[calc(100vh-4rem)]`}>
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={renderActiveComponent()} />
                  <Route path="/dashboard" element={<DashboardOverview setActiveTab={setActiveTab} />} />
                  <Route path="/properties" element={<PropertyManager />} />
                  <Route path="/tenants" element={<TenantManager />} />
                  <Route path="/utilities" element={<UtilityTracker />} />
                  <Route path="/documents" element={<DocumentManager />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="*" element={renderActiveComponent()} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
