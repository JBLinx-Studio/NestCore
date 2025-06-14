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
  PlusCircle,
  Trash2,
  Edit,
  Share
} from "lucide-react";
import { DocumentActions, DocumentItemActions } from "./DocumentActions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentWorkflow } from "./DocumentWorkflow";

export const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const [showDocumentView, setShowDocumentView] = useState(false);
  const [documents, setDocuments] = useState([
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
      fileType: "pdf",
      url: "#"
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
      fileType: "pdf",
      url: "#"
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
      fileType: "pdf",
      url: "#"
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
      fileType: "image",
      url: "#"
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
      fileType: "pdf",
      url: "#"
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
      fileType: "images",
      url: "#"
    }
  ]);

  const handleUpload = (file: File) => {
    const newDocument = {
      id: Date.now(),
      name: file.name,
      type: "document",
      category: "Legal",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      property: "All Properties",
      tenant: "N/A",
      status: "uploaded",
      fileType: file.type.includes('image') ? 'image' : 'pdf',
      url: URL.createObjectURL(file)
    };
    setDocuments([newDocument, ...documents]);
    toast.success(`Successfully uploaded: ${file.name}`);
  };

  const handleBulkUpload = (files: FileList) => {
    Array.from(files).forEach(file => handleUpload(file));
  };

  const handleBulkAction = (action: string, documentIds: number[]) => {
    const affectedDocs = documents.filter(doc => documentIds.includes(doc.id));
    
    switch (action) {
      case 'delete':
        setDocuments(documents.filter(doc => !documentIds.includes(doc.id)));
        break;
      case 'archive':
        setDocuments(documents.map(doc => 
          documentIds.includes(doc.id) 
            ? { ...doc, status: 'archived' } 
            : doc
        ));
        break;
      case 'download':
        affectedDocs.forEach(doc => {
          const link = document.createElement('a');
          link.href = doc.url || '#';
          link.download = doc.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
        break;
      case 'share':
        const shareText = affectedDocs.map(doc => `${doc.name} - ${doc.property}`).join('\n');
        navigator.clipboard.writeText(shareText);
        break;
    }
  };

  const handleCreateFolder = (name: string) => {
    const newFolder = {
      id: Date.now(),
      name: name,
      type: "folder",
      category: "Organization",
      size: "0 KB",
      uploadDate: new Date().toISOString().split('T')[0],
      property: "All Properties",
      tenant: "N/A",
      status: "active",
      fileType: "folder",
      url: "#"
    };
    setDocuments([newFolder, ...documents]);
    toast.success(`Created folder: ${name}`);
  };

  const handleViewDocument = (document: any) => {
    setViewingDocument(document);
    setShowDocumentView(true);
    toast.info(`Opening ${document.name} in viewer`);
  };

  const handleDownloadDocument = (document: any) => {
    toast.success(`Downloading ${document.name}...`);
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = document.url || '#';
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteDocument = (docId: number) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast.success("Document deleted successfully");
  };

  const handleShareDocument = (document: any) => {
    navigator.clipboard.writeText(`Document: ${document.name} - ${document.property}`);
    toast.success("Document details copied to clipboard!");
  };

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
      case 'folder': return <Folder className="h-5 w-5 text-yellow-500" />;
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
      case 'uploaded': return 'bg-purple-100 text-purple-800 border-purple-200';
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

  // Enhanced Document Item Actions Component
  const EnhancedDocumentItemActions = ({ document }: { document: any }) => (
    <div className="flex space-x-2 pt-2 border-t border-gray-100">
      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDocument(document)}>
        <Eye className="mr-2 h-3 w-3" />
        View
      </Button>
      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownloadDocument(document)}>
        <Download className="mr-2 h-3 w-3" />
        Download
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShareDocument(document)}>
        <Share className="h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleDeleteDocument(document.id)}>
        <Trash2 className="h-3 w-3 text-red-500" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
          <p className="text-gray-600">Organize and manage all your property-related documents</p>
        </div>
        <DocumentActions onUpload={handleUpload} onCreateFolder={handleCreateFolder} />
      </div>

      {/* New Workflow Component */}
      <DocumentWorkflow 
        documents={documents}
        onUpload={handleBulkUpload}
        onCreateFolder={handleCreateFolder}
        onBulkAction={handleBulkAction}
      />

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

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Quick Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf';
                input.onchange = (e: any) => {
                  const file = e.target.files[0];
                  if (file) handleUpload(file);
                };
                input.click();
              }}>
                <FileText className="mr-2 h-4 w-4" />
                Lease Agreement
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;
                input.onchange = (e: any) => {
                  Array.from(e.target.files).forEach((file: any) => handleUpload(file));
                };
                input.click();
              }}>
                <Image className="mr-2 h-4 w-4" />
                Property Photos
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf';
                input.onchange = (e: any) => {
                  const file = e.target.files[0];
                  if (file) handleUpload(file);
                };
                input.click();
              }}>
                <FileText className="mr-2 h-4 w-4" />
                Utility Bill
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.jpg,.jpeg,.png';
                input.onchange = (e: any) => {
                  const file = e.target.files[0];
                  if (file) handleUpload(file);
                };
                input.click();
              }}>
                <FileText className="mr-2 h-4 w-4" />
                Expense Receipt
              </Button>
            </CardContent>
          </Card>
        </div>

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

                  <EnhancedDocumentItemActions document={doc} />
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
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.onchange = (e: any) => {
                  Array.from(e.target.files).forEach((file: any) => handleUpload(file));
                };
                input.click();
              }}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer Dialog */}
      <Dialog open={showDocumentView} onOpenChange={setShowDocumentView}>
        <DialogContent className="max-w-4xl max-h-[95vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {viewingDocument && getFileIcon(viewingDocument.fileType)}
              <span>{viewingDocument?.name}</span>
            </DialogTitle>
            <DialogDescription>
              {viewingDocument?.category} • {viewingDocument?.size} • {viewingDocument?.property}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 bg-gray-100 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center relative">
            {viewingDocument?.fileType === 'image' || viewingDocument?.fileType === 'images' ? (
              viewingDocument.url ? (
                <img
                  src={viewingDocument.url}
                  alt={viewingDocument.name}
                  className="max-h-[400px] max-w-full mx-auto rounded shadow"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div>
                  <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Unable to load image.</p>
                </div>
              )
            ) : viewingDocument?.fileType === 'pdf' ? (
              viewingDocument.url ? (
                <iframe
                  src={viewingDocument.url}
                  title={viewingDocument.name}
                  className="w-full h-[500px] bg-white rounded shadow border"
                  style={{ minHeight: 360 }}
                  frameBorder={0}
                />
              ) : (
                <div>
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">PDF could not be loaded.</p>
                </div>
              )
            ) : (
              <div>
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">This file type is not supported for preview yet.</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => viewingDocument && handleDownloadDocument(viewingDocument)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={() => viewingDocument && handleShareDocument(viewingDocument)}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <Button variant="destructive" onClick={() => {
              if (viewingDocument) {
                handleDeleteDocument(viewingDocument.id);
                setShowDocumentView(false);
              }
            }}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
