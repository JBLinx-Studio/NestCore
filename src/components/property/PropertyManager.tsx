
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, Upload, Home, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyForm } from "./PropertyForm";
import { PropertyStats } from "./PropertyStats";
import { PropertyGrid } from "./PropertyGrid";
import { PropertyActions } from "./PropertyActions";
import { PropertyView } from "./PropertyView";
import { toast } from "sonner";
import { PropertyWorkflow } from "./PropertyWorkflow";
import { AppSettingsDialog } from "./AppSettingsDialog";
import { PropertySearchTab } from "./PropertySearchTab";
import { localStorageService } from "../../services/LocalStorageService";
import { guestAuthService } from "../../services/GuestAuthService";

export const PropertyManager = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [municipalityFilter, setMunicipalityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [viewingProperty, setViewingProperty] = useState<any>(null);
  const [showPropertyView, setShowPropertyView] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");

  // Settings state from user preferences
  const [currency, setCurrency] = useState("ZAR");
  const [metric, setMetric] = useState("metric");

  // Initialize data and load properties
  useEffect(() => {
    // Initialize storage service
    localStorageService.init();
    
    // Load properties from local storage
    const savedProperties = localStorageService.getProperties();
    setProperties(savedProperties);

    // Load user preferences
    const currentUser = guestAuthService.getCurrentUser();
    if (currentUser) {
      setCurrency(currentUser.preferences.currency);
      setMetric(currentUser.preferences.units);
    }
  }, []);

  // Save properties whenever they change
  useEffect(() => {
    // Don't save on initial load
    if (properties.length > 0) {
      properties.forEach(property => {
        localStorageService.saveProperty(property);
      });
    }
  }, [properties]);

  // Get currency symbol for display
  const currencySymbols: Record<string, string> = {
    ZAR: "R",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const currencySymbol = currencySymbols[currency] || currency;

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesMunicipality = municipalityFilter === "all" || property.municipality === municipalityFilter;
    return matchesSearch && matchesStatus && matchesMunicipality;
  });

  const municipalities = ["all", ...Array.from(new Set(properties.map(p => p.municipality).filter(Boolean)))];

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleViewProperty = (property: any) => {
    setViewingProperty(property);
    setShowPropertyView(true);
    
    // Track property view in analytics
    localStorageService.incrementPropertyView(property.id);
    
    toast.success(`Opening detailed view for ${property.name}`);
  };

  const handleDeleteProperty = (property: any) => {
    // Remove from local storage
    localStorageService.deleteProperty(property.id);
    
    // Update state
    const updatedProperties = properties.filter(p => p.id !== property.id);
    setProperties(updatedProperties);
    
    toast.success(`${property.name} has been deleted successfully`);
  };

  const handleSaveProperty = (propertyData: any) => {
    if (editingProperty) {
      const updatedProperty = { 
        ...propertyData, 
        id: editingProperty.id, 
        updatedAt: new Date().toISOString() 
      };
      
      // Save to local storage
      localStorageService.saveProperty(updatedProperty);
      
      // Update state
      const updatedProperties = properties.map(p => 
        p.id === editingProperty.id ? updatedProperty : p
      );
      setProperties(updatedProperties);
      toast.success("Property updated successfully!");
    } else {
      const newProperty = {
        ...propertyData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Save to local storage
      localStorageService.saveProperty(newProperty);
      
      // Update state
      setProperties([...properties, newProperty]);
      toast.success("Property added successfully!");
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleExport = () => {
    if (properties.length === 0) {
      toast.error("No properties to export");
      return;
    }

    // Export all data including analytics
    const exportData = localStorageService.exportData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(exportData);
    const exportFileDefaultName = `nestcore-backup-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Complete data backup exported successfully!");
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const success = localStorageService.importData(e.target.result);
            if (success) {
              // Reload properties from storage
              const importedProperties = localStorageService.getProperties();
              setProperties(importedProperties);
              toast.success(`Data imported successfully! ${importedProperties.length} properties loaded.`);
            } else {
              toast.error("Failed to import data. Please check the file format.");
            }
          } catch (error) {
            toast.error("Failed to import data. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleQuickAction = (action: string, property?: any) => {
    switch (action) {
      case "add-property":
        handleAddProperty();
        break;
      case "rent-collection":
        toast.info("Rent collection feature - add your implementation here");
        break;
      case "maintenance":
        toast.info("Maintenance scheduler feature - add your implementation here");
        break;
      case "tenant-screening":
        toast.info("Tenant screening feature - add your implementation here");
        break;
      default:
        toast.info(`${action} feature - add your implementation here`);
    }
  };

  const handleSettingsUpdate = (newCurrency: string, newMetric: string) => {
    setCurrency(newCurrency);
    setMetric(newMetric);
    
    // Update user preferences
    guestAuthService.updatePreferences({
      currency: newCurrency,
      units: newMetric
    });
    
    toast.success("Settings updated successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Page Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Home className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Property Management</h1>
            <p className="text-lg text-gray-600">Manage your real estate portfolio with persistent local data</p>
            <div className="flex gap-2 mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {properties.length} Properties
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {properties.filter(p => p.status === 'active').length} Active
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {properties.filter(p => p.status === 'vacant').length} Vacant
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleImport}
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Backup
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="bg-white hover:bg-gray-50 border-gray-300"
            disabled={properties.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Backup Data
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setShowSettings(true)}
            className="ml-2 flex items-center"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 mr-1 text-gray-500" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-slate-200/60 rounded-xl p-1 shadow-lg h-14">
          <TabsTrigger 
            value="portfolio" 
            className="text-lg py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            My Portfolio
          </TabsTrigger>
          <TabsTrigger 
            value="search" 
            className="text-lg py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            Property Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6 mt-6">
          {/* Property Workflow */}
          <PropertyWorkflow 
            properties={properties} 
            onQuickAction={handleQuickAction}
          />

          {/* Property Stats */}
          <PropertyStats properties={properties} currencySymbol={currencySymbol} />

          {/* Empty State */}
          {properties.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center">
              <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Properties Added Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start building your property portfolio by adding your first property. You can add details, photos, and track important information.
              </p>
              <Button onClick={handleAddProperty} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Home className="h-5 w-5 mr-2" />
                Add Your First Property
              </Button>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                  <div className="flex-1 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                    <div className="relative flex-1 max-w-md w-full">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 border-gray-300 focus:border-blue-500 rounded-xl text-lg"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-48 h-12 rounded-xl">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="vacant">Vacant</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                        <SelectTrigger className="w-48 h-12 rounded-xl">
                          <SelectValue placeholder="Filter by municipality" />
                        </SelectTrigger>
                        <SelectContent>
                          {municipalities.map((municipality) => (
                            <SelectItem key={municipality} value={municipality}>
                              {municipality === "all" ? "All Municipalities" : municipality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <PropertyGrid
                properties={filteredProperties}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onAddProperty={handleAddProperty}
                onEditProperty={handleEditProperty}
                onViewProperty={handleViewProperty}
                onDeleteProperty={handleDeleteProperty}
                PropertyActionsComponent={PropertyActions}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="search" className="space-y-6 mt-6">
          <PropertySearchTab />
        </TabsContent>
      </Tabs>

      {/* Property Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-2xl">
              <Home className="h-6 w-6 text-blue-600" />
              <span>{editingProperty ? 'Edit Property' : 'Add New Property'}</span>
            </DialogTitle>
          </DialogHeader>
          <PropertyForm
            property={editingProperty}
            onSave={handleSaveProperty}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Property View Dialog */}
      <PropertyView
        property={viewingProperty}
        isOpen={showPropertyView}
        onClose={() => setShowPropertyView(false)}
        onEdit={() => {
          setShowPropertyView(false);
          handleEditProperty(viewingProperty);
        }}
      />

      {/* Settings Dialog */}
      <AppSettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currency={currency}
        setCurrency={(newCurrency) => handleSettingsUpdate(newCurrency, metric)}
        metric={metric}
        setMetric={(newMetric) => handleSettingsUpdate(currency, newMetric)}
      />
    </div>
  );
};

export default PropertyManager;
