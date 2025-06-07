
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  FolderPlus, 
  Search,
  Filter,
  Archive,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Share,
  Eye,
  Trash2,
  Plus,
  Folder,
  Image,
  File
} from "lucide-react";
import { toast } from "sonner";

interface DocumentWorkflowProps {
  documents: any[];
  onUpload: (files: FileList) => void;
  onCreateFolder: (name: string) => void;
  onBulkAction: (action: string, documentIds: number[]) => void;
}

export const DocumentWorkflow = ({ documents, onUpload, onCreateFolder, onBulkAction }: DocumentWorkflowProps) => {
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  // Smart categorization and analytics
  const documentStats = {
    total: documents.length,
    signed: documents.filter(d => d.status === 'signed').length,
    pending: documents.filter(d => d.status === 'pending').length,
    expired: documents.filter(d => d.status === 'expired').length,
    recentUploads: documents.filter(d => {
      const uploadDate = new Date(d.uploadDate);
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return uploadDate >= lastWeek;
    }).length
  };

  const quickUploadTemplates = [
    {
      type: "lease",
      name: "Lease Agreement",
      icon: FileText,
      description: "Upload tenant lease agreements",
      accept: ".pdf,.doc,.docx",
      category: "Legal"
    },
    {
      type: "utility",
      name: "Utility Bill",
      icon: File,
      description: "Upload utility bills and statements",
      accept: ".pdf,.jpg,.jpeg,.png",
      category: "Utilities"
    },
    {
      type: "photos",
      name: "Property Photos",
      icon: Image,
      description: "Upload property images",
      accept: "image/*",
      category: "Marketing"
    },
    {
      type: "maintenance",
      name: "Maintenance Receipt",
      icon: FileText,
      description: "Upload maintenance and repair receipts",
      accept: ".pdf,.jpg,.jpeg,.png",
      category: "Maintenance"
    }
  ];

  const handleQuickUpload = (template: any) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = template.accept;
    input.multiple = template.type === 'photos';
    
    input.onchange = (e: any) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onUpload(files);
        toast.success(`Uploaded ${files.length} ${template.name.toLowerCase()}${files.length > 1 ? 's' : ''}`);
      }
    };
    
    input.click();
  };

  const handleBulkUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt';
    
    input.onchange = (e: any) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onUpload(files);
        toast.success(`Bulk uploaded ${files.length} documents`);
      }
    };
    
    input.click();
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      onCreateFolder(folderName.trim());
      setFolderName("");
      setShowCreateFolder(false);
      toast.success(`Created folder: ${folderName}`);
    }
  };

  const handleSelectDocument = (docId: number) => {
    if (selectedDocuments.includes(docId)) {
      setSelectedDocuments(prev => prev.filter(id => id !== docId));
    } else {
      setSelectedDocuments(prev => [...prev, docId]);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedDocuments.length === 0) {
      toast.error("Please select documents first");
      return;
    }
    
    onBulkAction(action, selectedDocuments);
    setSelectedDocuments([]);
    setBulkMode(false);
    
    const actionMessages = {
      delete: `Deleted ${selectedDocuments.length} documents`,
      archive: `Archived ${selectedDocuments.length} documents`,
      download: `Downloaded ${selectedDocuments.length} documents`,
      share: `Shared ${selectedDocuments.length} documents`
    };
    
    toast.success(actionMessages[action as keyof typeof actionMessages] || "Action completed");
  };

  return (
    <div className="space-y-6">
      {/* Document Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Documents</p>
                <p className="text-xl font-bold text-blue-900">{documentStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Signed/Active</p>
                <p className="text-xl font-bold text-green-900">{documentStats.signed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-xl font-bold text-yellow-900">{documentStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-600">Need Review</p>
                <p className="text-xl font-bold text-red-900">{documentStats.expired}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Recent</p>
                <p className="text-xl font-bold text-purple-900">{documentStats.recentUploads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Upload Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-blue-600" />
            <span>Quick Upload Templates</span>
          </CardTitle>
          <CardDescription>
            Upload documents using predefined templates for faster organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickUploadTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card 
                  key={template.type}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200 hover:bg-blue-50"
                  onClick={() => handleQuickUpload(template)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="flex justify-center mt-6 space-x-3">
            <Button onClick={handleBulkUpload} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="outline" onClick={() => setShowCreateFolder(true)}>
              <FolderPlus className="h-4 w-4 mr-2" />
              Create Folder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Management Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Archive className="h-5 w-5 text-gray-600" />
              <span>Document Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={bulkMode ? "default" : "outline"}
                size="sm"
                onClick={() => setBulkMode(!bulkMode)}
              >
                {bulkMode ? "Exit Bulk Mode" : "Bulk Actions"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {bulkMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedDocuments.length} documents selected
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('download')}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('share')}>
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Recent Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Lease agreement signed by Sarah Johnson</span>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Upload className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Property photos uploaded for Ocean View Villa</span>
                </div>
                <span className="text-xs text-gray-500">4 hours ago</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Insurance policy renewal reminder</span>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
            <Input
              placeholder="Folder name..."
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateFolder(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolder}>
                Create Folder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
