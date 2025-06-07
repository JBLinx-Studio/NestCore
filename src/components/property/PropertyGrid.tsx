
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "./PropertyCard";
import { 
  Plus, 
  Grid3X3, 
  List,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  MoreHorizontal
} from "lucide-react";

interface PropertyGridProps {
  properties: any[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onAddProperty: () => void;
  onEditProperty: (property: any) => void;
  onViewProperty: (property: any) => void;
  onDeleteProperty?: (property: any) => void;
  PropertyActionsComponent?: any;
}

export const PropertyGrid = ({ 
  properties, 
  viewMode, 
  onViewModeChange,
  onAddProperty,
  onEditProperty,
  onViewProperty,
  onDeleteProperty,
  PropertyActionsComponent
}: PropertyGridProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'vacant': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with View Toggle and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Properties ({properties.length})
          </h3>
          <p className="text-gray-600 mt-1">
            Manage your property portfolio
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="px-3"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Add Property Button */}
          <Button onClick={onAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Properties Grid/List */}
      {properties.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {properties.map((property) => (
            viewMode === 'grid' ? (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={() => onEditProperty(property)}
                onView={() => onViewProperty(property)}
                onDelete={onDeleteProperty ? () => onDeleteProperty(property) : undefined}
                ActionsComponent={PropertyActionsComponent}
              />
            ) : (
              <Card key={property.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {property.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.address}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(property.status)}>
                            {property.status}
                          </Badge>
                          {PropertyActionsComponent && (
                            <PropertyActionsComponent
                              property={property}
                              onEdit={onEditProperty}
                              onView={onViewProperty}
                              onDelete={onDeleteProperty}
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{property.occupiedUnits}/{property.units} Units</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>R{property.monthlyRent.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            Start building your portfolio by adding your first property.
          </p>
          <Button onClick={onAddProperty} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Property
          </Button>
        </div>
      )}
    </div>
  );
};
