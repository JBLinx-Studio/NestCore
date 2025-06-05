
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
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar open={sidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className={`transition-all duration-300 ${
              sidebarOpen ? "ml-64" : "ml-16"
            } mt-16 p-6`}>
              <div className="max-w-7xl mx-auto">
                {renderActiveComponent()}
              </div>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
