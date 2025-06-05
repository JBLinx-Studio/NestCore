
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Building,
  MapPin,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Upload
} from "lucide-react";
import { PropertyForm } from "./PropertyForm";
import { PropertyCard } from "./PropertyCard";
import { toast } from "sonner";

export const PropertyManager = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunnydale Apartments",
      address: "123 Sunshine Ave, Gqeberha",
      description: "Modern apartments with great amenities including swimming pool, gym, and 24/7 security.",
      units: 24,
      occupiedUnits: 20,
      monthlyRent: "3500",
      status: "active",
      propertyType: "apartment",
      municipality: "Nelson Mandela Municipality",
      images: [],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: 2,
      name: "Ocean View Townhouses",
      address: "456 Coastal Road, Summerstrand",
      description: "Beautiful oceanfront townhouses with private gardens and stunning sea views.",
      units: 12,
      occupiedUnits: 10,
      monthlyRent: "5500",
      status: "active",
      propertyType: "townhouse",
      municipality: "Nelson Mandela Municipality",
      images: [],
      createdAt: "2024-02-01",
      updatedAt: "2024-02-05"
    },
    {
      id: 3,
      name: "Central Studios",
      address: "789 Market Street, Central",
      description: "Compact studio apartments perfect for students and young professionals.",
      units: 36,
      occupiedUnits: 25,
      monthlyRent: "2200",
      status: "maintenance",
      propertyType: "studio",
      municipality: "Nelson Mandela Municipality",
      images: [],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18"
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter properties based on search and status
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const totalOccupied = properties.reduce((sum, p) => sum + (p.occupiedUnits || 0), 0);
  const totalRevenue = properties.reduce((sum, p) => sum + (parseFloat(p.monthlyRent) * (p.occupiedUnits || 0)), 0);
  const occupancyRate = totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleViewProperty = (property: any) => {
    toast.info(`Viewing details for ${property.name}`);
    // Future: Navigate to detailed property view
  };

  const handleSaveProperty = (propertyData: any) => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === propertyData.id ? propertyData : p));
    } else {
      setProperties([...properties, propertyData]);
    }
  };

  const handleBulkImport = () => {
    toast.info("Bulk import feature coming soon!");
  };

  const handleExportData = () => {
    toast.info("Export feature coming soon!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage your rental properties and track occupancy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Properties</p>
                <p className="text-2xl font-bold text-blue-900">{totalProperties}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Units</p>
                <p className="text-2xl font-bold text-green-900">{totalUnits}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-yellow-900">{occupancyRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-purple-900">R{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Properties
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search properties by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
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
          </div>
          
          {searchTerm || statusFilter !== "all" ? (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Showing {filteredProperties.length} of {totalProperties} properties
              </span>
              {(searchTerm || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Properties Grid/List */}
      {filteredProperties.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
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
        <Card className="p-12 text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search criteria" 
              : "Get started by adding your first property"
            }
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Button onClick={handleAddProperty} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Property
            </Button>
          )}
        </Card>
      )}

      {/* Property Form Dialog */}
      <PropertyForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        property={editingProperty}
        onSave={handleSaveProperty}
      />
    </div>
  );
};
