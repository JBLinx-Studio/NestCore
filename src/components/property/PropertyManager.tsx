
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  MapPin, 
  Users, 
  DollarSign,
  Search,
  Plus,
  MoreHorizontal,
  Camera,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PropertyManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const properties = [
    {
      id: 1,
      name: "Sunnydale Apartments",
      address: "123 Main Street, Port Elizabeth",
      units: 4,
      occupiedUnits: 3,
      monthlyRevenue: "R8,400",
      status: "active",
      lastInspection: "2024-02-15",
      image: "/placeholder.svg",
      municipality: "Nelson Mandela Municipality"
    },
    {
      id: 2,
      name: "Garden View Flats",
      address: "456 Oak Avenue, Summerstrand",
      units: 6,
      occupiedUnits: 6,
      monthlyRevenue: "R12,600",
      status: "active",
      lastInspection: "2024-01-20",
      image: "/placeholder.svg",
      municipality: "Nelson Mandela Municipality"
    },
    {
      id: 3,
      name: "Beachfront Residence",
      address: "789 Coastal Road, Humewood",
      units: 2,
      occupiedUnits: 1,
      monthlyRevenue: "R3,500",
      status: "maintenance",
      lastInspection: "2024-03-01",
      image: "/placeholder.svg",
      municipality: "Nelson Mandela Municipality"
    },
    {
      id: 4,
      name: "City Center Studios",
      address: "321 Church Street, Central",
      units: 8,
      occupiedUnits: 7,
      monthlyRevenue: "R14,000",
      status: "active",
      lastInspection: "2024-02-28",
      image: "/placeholder.svg",
      municipality: "Nelson Mandela Municipality"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'vacant': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
          <p className="text-gray-600">Manage and monitor all your rental properties</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
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
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                    {property.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}
                  </div>
                  <Badge className={getStatusColor(property.status)}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Property</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Inspection</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Property Image */}
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-32 object-cover rounded-lg bg-gray-100"
                />
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute bottom-2 right-2 h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">{property.units} Units</div>
                    <div className="text-xs text-gray-500">Total available</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">{property.occupiedUnits} Occupied</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((property.occupiedUnits / property.units) * 100)}% occupancy
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue and Municipality */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Monthly Revenue</span>
                  <span className="text-lg font-bold text-green-600">{property.monthlyRevenue}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Municipality: {property.municipality}
                </div>
              </div>

              {/* Last Inspection */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Last inspection: {new Date(property.lastInspection).toLocaleDateString()}
                </span>
                {property.status === 'maintenance' && (
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Tenants
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Utilities
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first property'}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Property
          </Button>
        </div>
      )}
    </div>
  );
};
