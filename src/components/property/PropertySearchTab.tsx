
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertySearch } from "./PropertySearch";
import { PropertyIntelligenceEnhanced } from "./PropertyIntelligenceEnhanced";
import { PropertyLocation } from "@/services/OpenStreetMapService";

export const PropertySearchTab = () => {
  const [activeTab, setActiveTab] = useState("location");
  const [selectedProperty, setSelectedProperty] = useState<PropertyLocation | null>(null);

  const handlePropertySelected = (property: PropertyLocation) => {
    console.log('Property selected for enhanced intelligence:', property);
    setSelectedProperty(property);
    setActiveTab("intelligence");
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg h-14">
          <TabsTrigger 
            value="location" 
            className="text-lg py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            🔍 Location Search
          </TabsTrigger>
          <TabsTrigger 
            value="intelligence" 
            className="text-lg py-3 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            🚀 Enhanced Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="location" className="space-y-6 mt-6">
          <PropertySearch onPropertySelected={handlePropertySelected} />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6 mt-6">
          <PropertyIntelligenceEnhanced selectedProperty={selectedProperty} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
