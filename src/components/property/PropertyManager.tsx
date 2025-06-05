
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  Search,
  Plus,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { PropertyForm } from "./PropertyForm";
import { toast } from "sonner";

export const PropertyManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunnydale Apartments",
      address: "123 Main Street, Port Elizabeth",
      description: "Modern 2-bedroom apartments with sea views, parking, and 24/7 security. Perfect for young professionals and families.",
      units: 4,
      occupiedUnits: 3,
      monthlyRent: "2800",
      status: "active",
      propertyType: "apartment",
      municipality: "Nelson Mandela Municipality",
      images: [
        { id: 1, url: "/placeholder.svg", name: "main.jpg" },
        { id: 2, url: "/placeholder.svg", name: "kitchen.jpg" }
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-02-15"
    },
    {
      id: 2,
      name: "Garden View Flats",
      address: "456 Oak Avenue, Summerstrand",
      description: "Spacious flats with garden access, close to beach and shopping centers.",
      units: 6,
      occupiedUnits: 6,
      monthlyRent: "2100",
      status: "active",
      propertyType: "apartment",
      municipality: "Nelson Mandela Municipality",
      images: [
        { id: 3, url: "/placeholder.svg", name: "exterior.jpg" }
      ],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-20"
    },
    {
      id: 3,
      name: "Beachfront Residence",
      address: "789 Coastal Road, Humewood",
      description: "Luxury beachfront property with stunning ocean views.",
      units: 2,
      occupiedUnits: 0,
      monthlyRent: "3500",
      status: "vacant",
      propertyType: "house",
      municipality: "Nelson Mandela Municipality",
      images: [],
      createdAt: "2024-02-01",
      updatedAt: "2024-03-01"
    }
  ]);

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

  const handleSaveProperty = (propertyData: any) => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === propertyData.id ? propertyData : p));
    } else {
      setProperties([...properties, propertyData]);
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleViewProperty = (property: any) => {
    toast.info(`Viewing details for ${property.name}`);
  };

  const getStatusCounts = () => {
    return {
      total: properties.length,
      active: properties.filter(p => p.status === 'active').length,
      vacant: properties.filter(p => p.status === 'vacant').length,
      maintenance: properties.filter(p => p.status === 'maintenance').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
          <p className="text-gray-600">Manage and showcase all your rental properties</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-blue-600 font-medium">{statusCounts.total} Total</span>
            <span className="text-green-600 font-medium">{statusCounts.active} Active</span>
            <span className="text-orange-600 font-medium">{statusCounts.vacant} Available</span>
            <span className="text-red-600 font-medium">{statusCounts.maintenance} Maintenance</span>
          </div>
        </div>
        <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search properties by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="vacant">Available</option>
            <option value="maintenance">Maintenance</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Properties Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => handleEditProperty(property)}
              onView={() => handleViewProperty(property)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => handleEditProperty(property)}
              onView={() => handleViewProperty(property)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first property'}
          </p>
          <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Property
          </Button>
        </div>
      )}

      {/* Property Form Dialog */}
      <PropertyForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProperty(null);
        }}
        property={editingProperty}
        onSave={handleSaveProperty}
      />
    </div>
  );
};
