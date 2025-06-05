
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload,
  Search,
  Download,
  Eye,
  Calendar,
  User,
  Building,
  Folder,
  Image,
  PlusCircle
} from "lucide-react";

export const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const documents = [
    {
      id: 1,
      name: "Lease Agreement - Sarah Johnson",
      type: "lease",
      category: "Legal",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      property: "Sunnydale Apartments",
      tenant: "Sarah Johnson",
      status: "signed",
      fileType: "pdf"
    },
    {
      id: 2,
      name: "NMM Electricity Bill - March 2024",
      type: "utility",
      category: "Utilities",
      size: "1.2 MB", 
      uploadDate: "2024-03-05",
      property: "All Properties",
      tenant: "N/A",
      status: "processed",
      fileType: "pdf"
    },
    {
      id: 3,
      name: "Property Insurance Policy",
      type: "insurance",
      category: "Legal",
      size: "3.1 MB",
      uploadDate: "2024-02-20",
      property: "Garden View Flats",
      tenant: "N/A", 
      status: "active",
      fileType: "pdf"
    },
    {
      id: 4,
      name: "Maintenance Receipt - Plumbing",
      type: "expense",
      category: "Maintenance",
      size: "456 KB",
      uploadDate: "2024-03-10",
      property: "City Center Studios",
      tenant: "N/A",
      status: "approved",
      fileType: "image"
    },
    {
      id: 5,
      name: "Tenant Application - Michael Chen",
      type: "application",
      category: "Legal",
      size: "1.8 MB",
      uploadDate: "2023-06-10",
      property: "Garden View Flats",
      tenant: "Michael Chen",
      status: "approved",
      fileType: "pdf"
    },
    {
      id: 6,
      name: "Property Photos - Beachfront",
      type: "photos",
      category: "Marketing",
      size: "8.2 MB",
      uploadDate: "2024-01-05",
      property: "Beachfront Residence",
      tenant: "N/A",
      status: "current",
      fileType: "images"
    }
  ];

  const categories = [
    { id: "all", name: "All Documents", count: documents.length },
    { id: "legal", name: "Legal", count: documents.filter(d => d.category === "Legal").length },
    { id: "utilities", name: "Utilities", count: documents.filter(d => d.category === "Utilities").length },
    { id: "maintenance", name: "Maintenance", count: documents.filter(d => d.category === "Maintenance").length },
    { id: "marketing", name: "Marketing", count: documents.filter(d => d.category === "Marketing").length }
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'image': return <Image className="h-5 w-5 text-blue-500" />;
      case 'images': return <Image className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800 border-green-200';
      case 'processed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                           doc.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
          <p className="text-gray-600">Organize and manage all your property-related documents</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Folder
          </Button>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Folder className="h-5 w-5 text-blue-600" />
                <span>Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Upload */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Quick Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Lease Agreement
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Image className="mr-2 h-4 w-4" />
                Property Photos
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Utility Bill
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Expense Receipt
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documents, properties, or tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getFileIcon(doc.fileType)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{doc.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-1">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.category}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Property and Tenant Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{doc.property}</span>
                    </div>
                    {doc.tenant !== "N/A" && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span>{doc.tenant}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
