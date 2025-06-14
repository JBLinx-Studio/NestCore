import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Upload, Home } from "lucide-react";
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

export const PropertyManager = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, Cape Town",
      municipality: "City of Cape Town",
      units: 12,
      occupiedUnits: 10,
      monthlyRent: 15000,
      status: "active",
      description: "Modern apartment complex with stunning sunset views and premium amenities including 24/7 security, swimming pool, and gym facilities.",
      propertyType: "apartment",
      images: [
        { 
          id: 1,
          url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
          name: "main-view.jpg"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Ocean View Villa",
      address: "456 Beach Rd, Durban",
      municipality: "eThekwini",
      units: 1,
      occupiedUnits: 0,
      monthlyRent: 8500,
      status: "vacant",
      description: "Luxurious beachfront villa with panoramic ocean views, private garden, and direct beach access.",
      propertyType: "villa",
      images: [
        { 
          id: 2,
          url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop",
          name: "ocean-villa.jpg"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Green Gardens Townhouse",
      address: "789 Garden Lane, Pretoria",
      municipality: "Tshwane",
      units: 8,
      occupiedUnits: 6,
      monthlyRent: 12000,
      status: "active",
      description: "Family-friendly townhouse complex with beautiful gardens, playground, and excellent schools nearby.",
      propertyType: "townhouse",
      images: [
        { 
          id: 3,
          url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
          name: "townhouse.jpg"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [municipalityFilter, setMunicipalityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [viewingProperty, setViewingProperty] = useState<any>(null);
  const [showPropertyView, setShowPropertyView] = useState(false);
  const [priceValuation, setPriceValuation] = useState<{ [id: number]: { current: number; list: number; lastSold: number; valuationDoc?: { url: string, name: string } } }>({});

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesMunicipality = municipalityFilter === "all" || property.municipality === municipalityFilter;
    return matchesSearch && matchesStatus && matchesMunicipality;
  });

  const municipalities = ["all", ...Array.from(new Set(properties.map(p => p.municipality)))];

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
    toast.success(`Opening detailed view for ${property.name}`);
  };

  const handleDeleteProperty = (property: any) => {
    setProperties(properties.filter(p => p.id !== property.id));
    toast.success(`${property.name} has been deleted successfully`);
  };

  const handleSaveProperty = (propertyData: any) => {
    if (editingProperty) {
      setProperties(properties.map(p => 
        p.id === editingProperty.id ? { ...propertyData, id: editingProperty.id } : p
      ));
      toast.success("Property updated successfully!");
    } else {
      const newProperty = {
        ...propertyData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProperties([...properties, newProperty]);
      toast.success("Property added successfully!");
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(properties, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `nestcore-properties-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Properties exported successfully!");
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
            const importedProperties = JSON.parse(e.target.result);
            setProperties([...properties, ...importedProperties]);
            toast.success(`Imported ${importedProperties.length} properties successfully!`);
          } catch (error) {
            toast.error("Failed to import properties. Please check the file format.");
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
        toast.info("Opening rent collection dashboard...");
        // In a real app, this would navigate to rent collection
        break;
      case "maintenance":
        toast.info("Opening maintenance scheduler...");
        // In a real app, this would navigate to maintenance
        break;
      case "tenant-screening":
        toast.info("Opening tenant screening workflow...");
        // In a real app, this would navigate to tenant screening
        break;
      default:
        toast.info(`${action} workflow starting...`);
    }
  };

  // New: handle valuation doc upload (per property)
  const handleValuationDocUpload = (propertyId: number, file: File) => {
    const url = URL.createObjectURL(file); // In real system, upload and store
    setPriceValuation(prev => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        valuationDoc: { url, name: file.name }
      }
    }));
  };

  return (
    <div className="space-y-8 p-6">
      {/* Enhanced Page Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Home className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Property Portfolio</h1>
            <p className="text-lg text-gray-600">Manage your properties with NestCore's advanced platform</p>
            <div className="flex gap-2 mt-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {properties.length} Total Properties
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
            Import
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* New Workflow Component */}
      <PropertyWorkflow 
        properties={properties} 
        onQuickAction={handleQuickAction}
      />

      {/* Enhanced Property Stats */}
      <PropertyStats properties={properties} />

      {/* Enhanced Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search properties, addresses, descriptions..."
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

      {/* Enhanced Property Grid/List */}
      <PropertyGrid
        properties={filteredProperties}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddProperty={handleAddProperty}
        onEditProperty={handleEditProperty}
        onViewProperty={handleViewProperty}
        onDeleteProperty={handleDeleteProperty}
        PropertyActionsComponent={PropertyActions}
        extraDetailsRender={(property) => (
          <div className="space-y-2 mt-2">
            <div>
              <div className="text-sm font-semibold">Valuation Details</div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs">Current: R{priceValuation[property.id]?.current ?? "N/A"}</span>
                <span className="text-xs">List: R{priceValuation[property.id]?.list ?? "N/A"}</span>
                <span className="text-xs">Last Sold: R{priceValuation[property.id]?.lastSold ?? "N/A"}</span>
                {priceValuation[property.id]?.valuationDoc && (
                  <a
                    className="underline text-blue-500 text-xs"
                    href={priceValuation[property.id].valuationDoc!.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Valuation Doc
                  </a>
                )}
              </div>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="Update Current"
                  min={0}
                  className="w-28"
                  value={priceValuation[property.id]?.current ?? ""}
                  onChange={e => setPriceValuation(val => ({ ...val, [property.id]: { ...val[property.id], current: Number(e.target.value) } }))}
                />
                <Input
                  type="number"
                  placeholder="List Price"
                  min={0}
                  className="w-28"
                  value={priceValuation[property.id]?.list ?? ""}
                  onChange={e => setPriceValuation(val => ({ ...val, [property.id]: { ...val[property.id], list: Number(e.target.value) } }))}
                />
                <Input
                  type="number"
                  placeholder="Last Sold"
                  min={0}
                  className="w-28"
                  value={priceValuation[property.id]?.lastSold ?? ""}
                  onChange={e => setPriceValuation(val => ({ ...val, [property.id]: { ...val[property.id], lastSold: Number(e.target.value) } }))}
                />
                <Input
                  type="file"
                  accept=".pdf,image/*"
                  className="w-40"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleValuationDocUpload(property.id, file);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      />

      {/* Enhanced Property Form Dialog */}
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
    </div>
  );
};

export default PropertyManager;
