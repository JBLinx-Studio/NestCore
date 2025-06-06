
import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List } from "lucide-react";

interface PropertyGridProps {
  properties: any[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onAddProperty: () => void;
  onEditProperty: (property: any) => void;
  onViewProperty: (property: any) => void;
}

export const PropertyGrid = ({ 
  properties, 
  viewMode, 
  onViewModeChange, 
  onAddProperty, 
  onEditProperty, 
  onViewProperty 
}: PropertyGridProps) => {
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {properties.length} total
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Add Property Button */}
          <Button onClick={onAddProperty} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Properties Grid/List */}
      {properties.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-blue-200">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start building your property portfolio by adding your first property to NestCore.
          </p>
          <Button onClick={onAddProperty} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Property
          </Button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
        }>
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id || index}
              property={property}
              onEdit={() => onEditProperty(property)}
              onView={() => onViewProperty(property)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
