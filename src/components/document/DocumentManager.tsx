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
import { CategoriesSidebar } from "./CategoriesSidebar";
import { DocumentCard } from "./DocumentCard";
import { getFileIcon, getStatusColor } from "./categories";

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
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleUpload={handleUpload}
          />
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
              <DocumentCard
                key={doc.id}
                doc={doc}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
                onShare={handleShareDocument}
                onDelete={handleDeleteDocument}
              />
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
