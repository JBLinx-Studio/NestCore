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
import { DropZone } from "./DropZone";
import { DocumentBatchSelector } from "./DocumentBatchSelector";
import { FileUploadProgress } from "./FileUploadProgress";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { DocumentAnalytics } from "./DocumentAnalytics";
import { DocumentFilters } from "./DocumentFilters";
import { getFileIcon, getStatusColor } from "./categories";
import { validateFiles, getFileCategory, formatFileSize } from "./fileValidation";

interface UploadFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<number[]>([]);
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const [showDocumentView, setShowDocumentView] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<any>({});
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
      url: "#",
      tags: ["lease", "residential", "signed"],
      expiryDate: "2025-01-15"
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
      url: "#",
      tags: ["utility", "electricity", "march"],
      amount: "$245.67"
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
      url: "#",
      tags: ["insurance", "policy", "active"],
      expiryDate: "2025-02-20"
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
      url: "#",
      tags: ["maintenance", "plumbing", "receipt"],
      amount: "$150.00"
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
      url: "#",
      tags: ["application", "tenant", "approved"],
      score: "Excellent"
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
      url: "#",
      tags: ["photos", "marketing", "beachfront"],
      photoCount: 12
    }
  ]);

  const simulateFileUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const uploadTime = Math.random() * 3000 + 1000;
      const shouldFail = Math.random() < 0.1;
      
      const interval = setInterval(() => {
        setUploadingFiles(current => 
          current.map(uf => 
            uf.file === file 
              ? { ...uf, progress: Math.min(uf.progress + Math.random() * 20, 95) }
              : uf
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        
        if (shouldFail) {
          setUploadingFiles(current => 
            current.map(uf => 
              uf.file === file 
                ? { ...uf, status: 'error' as const, error: 'Upload failed. Please try again.' }
                : uf
            )
          );
          reject(new Error('Upload failed'));
        } else {
          setUploadingFiles(current => 
            current.map(uf => 
              uf.file === file 
                ? { ...uf, progress: 100, status: 'completed' as const }
                : uf
            )
          );
          resolve();
        }
      }, uploadTime);
    });
  };

  const handleUpload = async (file: File) => {
    const validation = validateFiles([file]);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    if (validation.warnings.length > 0) {
      validation.warnings.forEach(warning => toast.warning(warning));
    }

    setUploadingFiles(current => [...current, {
      file,
      progress: 0,
      status: 'uploading'
    }]);

    try {
      await simulateFileUpload(file);
      
      const newDocument = {
        id: Date.now(),
        name: file.name,
        type: "document",
        category: getFileCategory(file),
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        property: "All Properties",
        tenant: "N/A",
        status: "uploaded",
        fileType: file.type.includes('image') ? 'image' : 'pdf',
        url: URL.createObjectURL(file),
        tags: ["uploaded", "new"],
        uploadedBy: "Current User"
      };
      
      setDocuments(current => [newDocument, ...current]);
      toast.success(`Successfully uploaded: ${file.name}`);
      
      setTimeout(() => {
        setUploadingFiles(current => current.filter(uf => uf.file !== file));
      }, 2000);
      
    } catch (error) {
      toast.error(`Failed to upload: ${file.name}`);
    }
  };

  const handleFilesDropped = (files: File[]) => {
    const validation = validateFiles(files);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    if (validation.warnings.length > 0) {
      validation.warnings.forEach(warning => toast.warning(warning));
    }

    files.forEach(file => handleUpload(file));
    toast.success(`Started uploading ${files.length} file${files.length > 1 ? 's' : ''}!`);
  };

  const handleRemoveUploadingFile = (index: number) => {
    setUploadingFiles(current => current.filter((_, i) => i !== index));
  };

  const handleRetryUpload = (index: number) => {
    const uploadFile = uploadingFiles[index];
    if (uploadFile) {
      setUploadingFiles(current => 
        current.map((uf, i) => 
          i === index 
            ? { ...uf, status: 'uploading' as const, progress: 0, error: undefined }
            : uf
        )
      );
      simulateFileUpload(uploadFile.file).catch(() => {
        // Error handling is already in simulateFileUpload
      });
    }
  };

  const handleBulkUpload = (files: FileList) => {
    Array.from(files).forEach(file => handleUpload(file));
  };

  const handleBulkAction = (action: string, documentIds: number[]) => {
    const affectedDocs = documents.filter(doc => documentIds.includes(doc.id));
    
    switch (action) {
      case 'delete':
        setDocuments(documents.filter(doc => !documentIds.includes(doc.id)));
        toast.success(`Deleted ${documentIds.length} document${documentIds.length > 1 ? 's' : ''}`);
        break;
      case 'archive':
        setDocuments(documents.map(doc => 
          documentIds.includes(doc.id) 
            ? { ...doc, status: 'archived' } 
            : doc
        ));
        toast.success(`Archived ${documentIds.length} document${documentIds.length > 1 ? 's' : ''}`);
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
        toast.success(`Downloading ${documentIds.length} document${documentIds.length > 1 ? 's' : ''}...`);
        break;
      case 'share':
        const shareText = affectedDocs.map(doc => `${doc.name} - ${doc.property}`).join('\n');
        navigator.clipboard.writeText(shareText);
        toast.success(`Copied ${documentIds.length} document details to clipboard!`);
        break;
      case 'tag':
        const tags = prompt('Enter tags (comma-separated):');
        if (tags) {
          const newTags = tags.split(',').map(tag => tag.trim());
          setDocuments(documents.map(doc => 
            documentIds.includes(doc.id)
              ? { ...doc, tags: [...(doc.tags || []), ...newTags] }
              : doc
          ));
          toast.success(`Added tags to ${documentIds.length} document${documentIds.length > 1 ? 's' : ''}`);
        }
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
      url: "#",
      tags: ["folder", "organization"],
      itemCount: 0
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
    const link = document.createElement('a');
    link.href = document.url || '#';
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteDocument = (docId: number) => {
    setDocumentToDelete(docId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== documentToDelete));
      toast.success("Document deleted successfully");
      setShowDeleteConfirm(false);
      setDocumentToDelete(null);
      if (viewingDocument?.id === documentToDelete) {
        setShowDocumentView(false);
      }
    }
  };

  const handleRenameDocument = (docId: number, newName: string) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, name: newName } : doc
    ));
    toast.success("Document renamed successfully");
  };

  const handleShareDocument = (document: any) => {
    const shareData = {
      title: document.name,
      text: `Document: ${document.name}\nProperty: ${document.property}\nCategory: ${document.category}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        toast.success("Document shared successfully!");
      }).catch(() => {
        fallbackShare(document);
      });
    } else {
      fallbackShare(document);
    }
  };

  const fallbackShare = (document: any) => {
    navigator.clipboard.writeText(`Document: ${document.name} - ${document.property}`);
    toast.success("Document details copied to clipboard!");
  };

  const applyFilters = (docs: any[]) => {
    return docs.filter(doc => {
      // Basic filters
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (doc.tags && doc.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = selectedCategory === "all" || 
                             doc.category.toLowerCase() === selectedCategory;

      // Advanced filters
      const matchesStatus = !advancedFilters.status || doc.status === advancedFilters.status;
      const matchesProperty = !advancedFilters.property || doc.property === advancedFilters.property;
      const matchesTenant = !advancedFilters.tenant || doc.tenant === advancedFilters.tenant;
      
      const matchesDateRange = (!advancedFilters.dateFrom || new Date(doc.uploadDate) >= advancedFilters.dateFrom) &&
                              (!advancedFilters.dateTo || new Date(doc.uploadDate) <= advancedFilters.dateTo);
      
      const matchesTags = !advancedFilters.tags?.length || 
                         advancedFilters.tags.every((tag: string) => doc.tags?.includes(tag));

      return matchesSearch && matchesCategory && matchesStatus && 
             matchesProperty && matchesTenant && matchesDateRange && matchesTags;
    }).sort((a, b) => {
      const { sortBy, sortOrder } = advancedFilters;
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      
      if (sortBy === 'uploadDate') {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  const categories = [
    { id: "all", name: "All Documents", count: documents.length },
    { id: "legal", name: "Legal", count: documents.filter(d => d.category === "Legal").length },
    { id: "utilities", name: "Utilities", count: documents.filter(d => d.category === "Utilities").length },
    { id: "maintenance", name: "Maintenance", count: documents.filter(d => d.category === "Maintenance").length },
    { id: "marketing", name: "Marketing", count: documents.filter(d => d.category === "Marketing").length }
  ];

  const filteredDocuments = applyFilters(documents);

  return (
    <DropZone onFilesDropped={handleFilesDropped} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
          <p className="text-gray-600">Organize and manage all your property-related documents</p>
        </div>
        <DocumentActions onUpload={handleUpload} onCreateFolder={() => {}} />
      </div>

      {/* Document Analytics */}
      <DocumentAnalytics documents={documents} />

      {/* Upload Progress */}
      <FileUploadProgress 
        files={uploadingFiles}
        onRemoveFile={handleRemoveUploadingFile}
        onRetryFile={handleRetryUpload}
      />

      {/* Document Workflow Component */}
      <DocumentWorkflow 
        documents={documents}
        onUpload={handleBulkUpload}
        onCreateFolder={() => {}}
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
          {/* Advanced Filters */}
          <DocumentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categories={categories.map(c => c.name)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onFiltersChange={setAdvancedFilters}
            documents={documents}
          />

          {/* Batch Selection */}
          <DocumentBatchSelector
            documents={filteredDocuments}
            selectedIds={selectedDocumentIds}
            onSelectionChange={setSelectedDocumentIds}
            onBulkAction={handleBulkAction}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                isSelected={selectedDocumentIds.includes(doc.id)}
                onSelectionChange={(selected) => {
                  if (selected) {
                    setSelectedDocumentIds([...selectedDocumentIds, doc.id]);
                  } else {
                    setSelectedDocumentIds(selectedDocumentIds.filter(id => id !== doc.id));
                  }
                }}
                onView={() => {}}
                onDownload={() => {}}
                onShare={() => {}}
                onDelete={() => {}}
                onRename={() => {}}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms or filters' : 'Upload your first document to get started'}
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

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Document"
        description="Are you sure you want to delete this document? This action cannot be undone."
        onConfirm={() => {}}
        confirmText="Delete"
        destructive={true}
      />
    </DropZone>
  );
};
