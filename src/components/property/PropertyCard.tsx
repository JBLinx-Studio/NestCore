
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  DollarSign,
  Calendar,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

interface PropertyCardProps {
  property: any;
  onEdit: () => void;
  onView: () => void;
  onDelete?: () => void;
  ActionsComponent?: any;
}

export const PropertyCard = ({ property, onEdit, onView, onDelete, ActionsComponent }: PropertyCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'vacant': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const occupancyRate = (property.occupiedUnits / property.units) * 100;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1 text-gray-900">{property.name}</CardTitle>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <CardDescription className="text-sm">{property.address}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(property.status)}>
              {property.status}
            </Badge>
            {ActionsComponent && (
              <ActionsComponent
                property={property}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Image */}
        {property.images && property.images.length > 0 && (
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={property.images[0].url}
              alt={property.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Property Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{property.occupiedUnits}/{property.units} Units</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>R{property.monthlyRent.toLocaleString()}/mo</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Occupancy Rate</span>
            <span className="font-medium text-gray-900">{occupancyRate.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {property.description}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          <Button variant="outline" size="sm" className="flex-1" onClick={onView}>
            <Eye className="mr-2 h-3 w-3" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Button>
        </div>

        {/* Municipality & Date */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>{property.municipality}</span>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(property.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
