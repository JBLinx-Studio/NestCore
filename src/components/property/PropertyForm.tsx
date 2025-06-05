
import { useState } from "react";
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
  Link2,
  Download
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
    name: property?.name || "",
    address: property?.address || "",
    description: property?.description || "",
    units: property?.units || 1,
    monthlyRent: property?.monthlyRent || "",
    status: property?.status || "active",
    propertyType: property?.propertyType || "apartment",
    municipality: property?.municipality || "Nelson Mandela Municipality",
    ...property
  });
  
  const [uploadedImages, setUploadedImages] = useState(property?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newImages.push({
        id: Date.now() + i,
        url: imageUrl,
        name: file.name,
        size: file.size
      });
    }

    setUploadedImages([...uploadedImages, ...newImages]);
    setIsUploading(false);
    toast.success(`${newImages.length} image(s) uploaded successfully`);
  };

  const removeImage = (imageId: number) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== imageId));
  };

  const handleSave = () => {
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
  };

  const generateShareableLink = () => {
    const shareUrl = `${window.location.origin}/property/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Shareable link copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {property ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Sunnydale Apartments"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Full address including area"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the property features, amenities, etc."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="units">Total Units</Label>
                  <Input
                    id="units"
                    type="number"
                    value={formData.units}
                    onChange={(e) => setFormData({...formData, units: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="rent">Monthly Rent (R)</Label>
                  <Input
                    id="rent"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                    placeholder="2500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
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
                  <Label htmlFor="type">Property Type</Label>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos & Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {isUploading ? 'Uploading...' : 'Click to upload photos or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg"
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
              )}

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
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
                    Share Property
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
              <Badge variant="outline">
                {uploadedImages.length} photo{uploadedImages.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {property ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
