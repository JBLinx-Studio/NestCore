
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { PropertyManager } from "@/components/property/PropertyManager";
import { TenantManager } from "@/components/tenant/TenantManager";
import { FinancialManager } from "@/components/financial/FinancialManager";
import { MaintenanceManager } from "@/components/maintenance/MaintenanceManager";
import { DocumentManager } from "@/components/document/DocumentManager";
import { LeasingManager } from "@/components/leasing/LeasingManager";
import { ReportsManager } from "@/components/reports/ReportsManager";
import { CommunicationsManager } from "@/components/communications/CommunicationsManager";
import { ComplianceManager } from "@/components/compliance/ComplianceManager";
import { WorkManager } from "@/components/work/WorkManager";
import { PeopleManager } from "@/components/people/PeopleManager";
import { UtilityTracker } from "@/components/utility/UtilityTracker";
import { ApiDashboard } from "@/components/api/ApiDashboard";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { PropertyMatcher } from "@/components/matching/PropertyMatcher";
import { GuestUser } from '@/services/GuestAuthService';

interface IndexProps {
  currentUser: GuestUser;
  onSignOut: () => void;
}

const Index: React.FC<IndexProps> = ({ currentUser, onSignOut }) => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "properties":
        return <PropertyManager />;
      case "tenants":
        return <TenantManager />;
      case "financial":
        return <FinancialManager />;
      case "maintenance":
        return <MaintenanceManager />;
      case "documents":
        return <DocumentManager />;
      case "leasing":
        return <LeasingManager />;
      case "reports":
        return <ReportsManager />;
      case "communications":
        return <CommunicationsManager />;
      case "compliance":
        return <ComplianceManager />;
      case "work":
        return <WorkManager />;
      case "people":
        return <PeopleManager />;
      case "utilities":
        return <UtilityTracker />;
      case "api":
        return <ApiDashboard />;
      case "ai":
        return <AIAssistant />;
      case "matching":
        return <PropertyMatcher />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentUser={currentUser} 
          onSignOut={onSignOut} 
        />
        <main className="flex-1 overflow-auto">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
