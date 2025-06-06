
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Upload, 
  X, 
  MapPin, 
  DollarSign, 
  Users, 
  Building,
  Camera,
  Share2,
  Download,
  Check,
  AlertCircle,
  Loader2,
  Plus,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface PropertyFormProps {
  property?: any;
  onSave: (property: any) => void;
  onCancel: () => void;
}

export const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    units: 1,
    monthlyRent: "",
    status: "active",
    propertyType: "apartment",
    municipality: "Nelson Mandela Municipality",
    occupiedUnits: 0,
    ...property
  });
  
  const [uploadedImages, setUploadedImages] = useState(property?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when property changes
  useEffect(() => {
    if (property) {
      setFormData({
        name: "",
        address: "",
        description: "",
        units: 1,
        monthlyRent: "",
        status: "active",
        propertyType: "apartment",
        municipality: "Nelson Mandela Municipality",
        occupiedUnits: 0,
        ...property
      });
      setUploadedImages(property.images || []);
    } else {
      setFormData({
        name: "",
        address: "",
        description: "",
        units: 1,
        monthlyRent: "",
        status: "active",
        propertyType: "apartment",
        municipality: "Nelson Mandela Municipality",
        occupiedUnits: 0,
      });
      setUploadedImages([]);
    }
    setErrors({});
  }, [property]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Property name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.monthlyRent.trim()) newErrors.monthlyRent = "Monthly rent is required";
    if (formData.units < 1) newErrors.units = "Units must be at least 1";
    if (formData.occupiedUnits > formData.units) {
      newErrors.occupiedUnits = "Occupied units cannot exceed total units";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const newImages = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
          continue;
        }

        const imageUrl = URL.createObjectURL(file);
        newImages.push({
          id: Date.now() + i,
          url: imageUrl,
          name: file.name,
          size: file.size
        });
      }

      setUploadedImages([...uploadedImages, ...newImages]);
      toast.success(`${newImages.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (imageId: number) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
    toast.info("Image removed");
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsSaving(true);
    
    try {
      const propertyData = {
        ...formData,
        images: uploadedImages,
        id: property?.id || Date.now(),
        createdAt: property?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onSave(propertyData);
      toast.success(property ? "Property updated successfully" : "Property added successfully");
    } catch (error) {
      toast.error("Failed to save property");
    } finally {
      setIsSaving(false);
    }
  };

  const generateShareableLink = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a property name first");
      return;
    }
    
    const shareUrl = `${window.location.origin}/property/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Shareable link copied to clipboard!");
  };

  const getFieldError = (field: string) => errors[field];

  const municipalities = [
    "Nelson Mandela Municipality",
    "City of Cape Town",
    "eThekwini",
    "City of Johannesburg",
    "Ekurhuleni",
    "Buffalo City",
    "Mangaung",
    "Tshwane"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-3">
              <Building className="h-6 w-6 text-blue-600" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Property Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Sunnydale Apartments"
                className={`transition-all ${getFieldError('name') ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}`}
              />
              {getFieldError('name') && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError('name')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Full Address *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="123 Main Street, Cape Town, 8000"
                  className={`pl-10 transition-all ${getFieldError('address') ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}`}
                />
              </div>
              {getFieldError('address') && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError('address')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="municipality" className="text-sm font-semibold text-gray-700">Municipality</Label>
              <Select value={formData.municipality} onValueChange={(value) => setFormData({...formData, municipality: value})}>
                <SelectTrigger className="focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the property features, amenities, nearby attractions..."
                rows={4}
                className="resize-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="units" className="text-sm font-semibold text-gray-700">Total Units *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="units"
                    type="number"
                    value={formData.units}
                    onChange={(e) => setFormData({...formData, units: parseInt(e.target.value) || 1})}
                    min="1"
                    className={`pl-10 transition-all ${getFieldError('units') ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}`}
                  />
                </div>
                {getFieldError('units') && (
                  <p className="text-xs text-red-600 mt-1">{getFieldError('units')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupied" className="text-sm font-semibold text-gray-700">Occupied Units</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="occupied"
                    type="number"
                    value={formData.occupiedUnits}
                    onChange={(e) => setFormData({...formData, occupiedUnits: parseInt(e.target.value) || 0})}
                    min="0"
                    max={formData.units}
                    className={`pl-10 transition-all ${getFieldError('occupiedUnits') ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}`}
                  />
                </div>
                {getFieldError('occupiedUnits') && (
                  <p className="text-xs text-red-600 mt-1">{getFieldError('occupiedUnits')}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rent" className="text-sm font-semibold text-gray-700">Monthly Rent (R) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="rent"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                  placeholder="2500"
                  className={`pl-10 transition-all ${getFieldError('monthlyRent') ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}`}
                />
              </div>
              {getFieldError('monthlyRent') && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {getFieldError('monthlyRent')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-semibold text-gray-700">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-semibold text-gray-700">Property Type</Label>
                <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                  <SelectTrigger className="focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="cottage">Cottage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Management */}
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-3">
              <Camera className="h-6 w-6 text-green-600" />
              Photos & Media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 hover:bg-green-50/50 transition-all duration-200">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              <label htmlFor="images" className="cursor-pointer">
                {isUploading ? (
                  <Loader2 className="h-12 w-12 text-green-500 mx-auto mb-4 animate-spin" />
                ) : (
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                )}
                <p className="text-lg text-gray-700 font-medium mb-2">
                  {isUploading ? 'Uploading photos...' : 'Drop photos here or click to browse'}
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    {uploadedImages.length} photo{uploadedImages.length !== 1 ? 's' : ''} uploaded
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Ready
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto border rounded-xl p-4 bg-gray-50">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-green-300 transition-all"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                onClick={() => toast.info("Google Photos integration coming soon!")}
              >
                <Camera className="mr-2 h-5 w-5" />
                Import from Google Photos
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700"
                  onClick={generateShareableLink}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Link
                </Button>
                <Button
                  variant="outline"
                  className="bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700"
                  onClick={() => toast.info("Export feature coming soon!")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
        <div className="flex items-center gap-3">
          <Badge 
            variant={formData.status === 'active' ? 'default' : 'secondary'}
            className="text-sm px-3 py-1"
          >
            {formData.status}
          </Badge>
          {uploadedImages.length > 0 && (
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-sm px-3 py-1">
              <ImageIcon className="h-4 w-4 mr-1" />
              {uploadedImages.length} photo{uploadedImages.length !== 1 ? 's' : ''}
            </Badge>
          )}
          {formData.occupiedUnits > 0 && (
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-sm px-3 py-1">
              {Math.round((formData.occupiedUnits / formData.units) * 100)}% occupied
            </Badge>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            disabled={isSaving}
            className="px-8 py-2 text-lg"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-2 text-lg"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {property ? <Check className="mr-2 h-5 w-5" /> : <Plus className="mr-2 h-5 w-5" />}
                {property ? 'Update Property' : 'Add Property'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
