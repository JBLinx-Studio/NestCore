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
import { toast } from "sonner";

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
      description: "Modern apartment complex with great amenities",
      images: [
        { url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop" }
      ],
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
      description: "Beautiful villa with ocean views",
      images: [
        { url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop" }
      ],
      updatedAt: new Date().toISOString()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleViewProperty = (property: any) => {
    toast.info(`Viewing ${property.name} - Full property details coming soon!`);
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
        updatedAt: new Date().toISOString()
      };
      setProperties([...properties, newProperty]);
      toast.success("Property added successfully!");
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleExport = () => {
    toast.info("Export functionality coming soon!");
  };

  const handleImport = () => {
    toast.info("Import functionality coming soon!");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Home className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
            <p className="text-gray-600">Manage your property portfolio with NestCore</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Property Stats */}
      <PropertyStats properties={properties} />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex-1 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="vacant">Vacant</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property Grid/List */}
      <PropertyGrid
        properties={filteredProperties}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddProperty={handleAddProperty}
        onEditProperty={handleEditProperty}
        onViewProperty={handleViewProperty}
      />

      {/* Property Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
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
    </div>
  );
};
