
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  Users, 
  DollarSign,
  MoreHorizontal,
  Camera,
  AlertCircle,
  Share2,
  Eye,
  Edit,
  Calendar,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface PropertyCardProps {
  property: any;
  onEdit: () => void;
  onView: () => void;
}

export const PropertyCard = ({ property, onEdit, onView }: PropertyCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'vacant': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'unavailable': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/property/${property.name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Property link copied to clipboard!");
  };

  const handleScheduleViewing = () => {
    toast.info("Viewing scheduler coming soon!");
  };

  const calculateOccupancyRate = () => {
    const occupied = property.occupiedUnits || 0;
    const total = property.units || 1;
    return Math.round((occupied / total) * 100);
  };

  const getOccupancyColor = () => {
    const rate = calculateOccupancyRate();
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border border-gray-200 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {property.name}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {property.address}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge className={getStatusColor(property.status)}>
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </Badge>
              {property.status === 'vacant' && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Available Now
                </Badge>
              )}
              <Badge variant="outline" className={`${getOccupancyColor()} border-current`}>
                {calculateOccupancyRate()}% Occupied
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border shadow-lg">
              <DropdownMenuItem onClick={onView}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Property
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Property
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleScheduleViewing}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Viewing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Archive Property
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Property Images */}
        <div className="relative overflow-hidden rounded-lg">
          {property.images && property.images.length > 0 ? (
            <div className="relative">
              <img 
                src={property.images[0].url} 
                alt={property.name}
                className="w-full h-32 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              {property.images.length > 1 && (
                <Badge className="absolute bottom-2 left-2 bg-black/75 text-white backdrop-blur-sm">
                  +{property.images.length - 1} more
                </Badge>
              )}
            </div>
          ) : (
            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <Button 
            size="sm" 
            variant="secondary" 
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={() => toast.info("Photo gallery coming soon!")}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        {/* Property Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
            <Building className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium">{property.units}</div>
              <div className="text-xs text-gray-500">Units</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
            <Users className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-sm font-medium">{property.occupiedUnits || 0}</div>
              <div className="text-xs text-gray-500">Occupied</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
            <TrendingUp className="h-4 w-4 text-yellow-600" />
            <div>
              <div className="text-sm font-medium">{calculateOccupancyRate()}%</div>
              <div className="text-xs text-gray-500">Rate</div>
            </div>
          </div>
        </div>

        {/* Revenue and Details */}
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Monthly Rent
            </span>
            <span className="text-lg font-bold text-green-600">R{property.monthlyRent}</span>
          </div>
          
          {property.description && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{property.description}</p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Municipality: {property.municipality}</span>
            <span className="flex items-center">
              {property.status === 'maintenance' && (
                <AlertCircle className="h-3 w-3 text-orange-500 mr-1" />
              )}
              Updated: {new Date(property.updatedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50" onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1 hover:bg-green-50" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
