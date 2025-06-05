
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
  open: boolean;
  onClose: () => void;
  property?: any;
  onSave: (property: any) => void;
}

export const PropertyForm = ({ open, onClose, property, onSave }: PropertyFormProps) => {
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
  }, [property, open]);

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
      onClose();
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            {property ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50 rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Property Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Sunnydale Apartments"
                  className={getFieldError('name') ? 'border-red-300' : ''}
                />
                {getFieldError('name') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {getFieldError('name')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Full address including area"
                  className={getFieldError('address') ? 'border-red-300' : ''}
                />
                {getFieldError('address') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {getFieldError('address')}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the property features, amenities, etc."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="units" className="text-sm font-medium">Total Units *</Label>
                  <Input
                    id="units"
                    type="number"
                    value={formData.units}
                    onChange={(e) => setFormData({...formData, units: parseInt(e.target.value) || 1})}
                    min="1"
                    className={getFieldError('units') ? 'border-red-300' : ''}
                  />
                  {getFieldError('units') && (
                    <p className="text-xs text-red-600 mt-1">{getFieldError('units')}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="occupied" className="text-sm font-medium">Occupied Units</Label>
                  <Input
                    id="occupied"
                    type="number"
                    value={formData.occupiedUnits}
                    onChange={(e) => setFormData({...formData, occupiedUnits: parseInt(e.target.value) || 0})}
                    min="0"
                    max={formData.units}
                    className={getFieldError('occupiedUnits') ? 'border-red-300' : ''}
                  />
                  {getFieldError('occupiedUnits') && (
                    <p className="text-xs text-red-600 mt-1">{getFieldError('occupiedUnits')}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="rent" className="text-sm font-medium">Monthly Rent (R) *</Label>
                <Input
                  id="rent"
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                  placeholder="2500"
                  className={getFieldError('monthlyRent') ? 'border-red-300' : ''}
                />
                {getFieldError('monthlyRent') && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {getFieldError('monthlyRent')}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
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
                <div>
                  <Label htmlFor="type" className="text-sm font-medium">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Management */}
          <Card className="border-green-100">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos & Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
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
                    <Loader2 className="h-8 w-8 text-blue-500 mx-auto mb-2 animate-spin" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  )}
                  <p className="text-sm text-gray-600 font-medium">
                    {isUploading ? 'Uploading...' : 'Click to upload photos or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''} uploaded
                    </span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Ready
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border rounded-lg p-2">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-blue-50 hover:bg-blue-100"
                  onClick={() => toast.info("Google Photos integration coming soon!")}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Import from Google Photos
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={generateShareableLink}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
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
        <div className="flex justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Badge variant={formData.status === 'active' ? 'default' : 'secondary'}>
              {formData.status}
            </Badge>
            {uploadedImages.length > 0 && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                <ImageIcon className="h-3 w-3 mr-1" />
                {uploadedImages.length} photo{uploadedImages.length !== 1 ? 's' : ''}
              </Badge>
            )}
            {formData.occupiedUnits > 0 && (
              <Badge variant="outline">
                {Math.round((formData.occupiedUnits / formData.units) * 100)}% occupied
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {property ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                  {property ? 'Update Property' : 'Add Property'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
