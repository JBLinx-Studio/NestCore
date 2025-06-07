
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, FolderPlus, Eye, Download } from "lucide-react";

interface DocumentActionsProps {
  onUpload?: (file: File) => void;
  onCreateFolder?: (name: string) => void;
}

export const DocumentActions = ({ onUpload, onCreateFolder }: DocumentActionsProps) => {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.txt';
    
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files) as File[];
      if (files.length > 0) {
        files.forEach(file => {
          if (onUpload) {
            onUpload(file);
          }
          toast.success(`Uploaded: ${file.name}`);
        });
      }
    };
    
    input.click();
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      if (onCreateFolder) {
        onCreateFolder(folderName.trim());
      }
      toast.success(`Created folder: ${folderName}`);
      setFolderName("");
      setShowCreateFolder(false);
    } else {
      toast.error("Please enter a folder name");
    }
  };

  const handleViewDocument = (document: any) => {
    toast.info(`Opening ${document.name} in viewer`);
    // In a real app, this would open a document viewer
  };

  const handleDownloadDocument = (document: any) => {
    toast.success(`Downloading ${document.name}`);
    // In a real app, this would trigger an actual download
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={handleFileUpload} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
        <Button variant="outline" onClick={() => setShowCreateFolder(true)}>
          <FolderPlus className="mr-2 h-4 w-4" />
          Create Folder
        </Button>
      </div>

      <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder to organize your documents.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Folder name..."
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateFolder(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const DocumentItemActions = ({ document }: { document: any }) => {
  const handleView = () => {
    toast.info(`Opening ${document.name} in viewer`);
    // Mock opening a document viewer
    window.open(`data:application/pdf;base64,`, '_blank');
  };

  const handleDownload = () => {
    toast.success(`Downloading ${document.name}`);
    // Mock file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = document.name;
    link.click();
  };

  return (
    <div className="flex space-x-2 pt-2 border-t border-gray-100">
      <Button variant="outline" size="sm" className="flex-1" onClick={handleView}>
        <Eye className="mr-2 h-3 w-3" />
        View
      </Button>
      <Button variant="outline" size="sm" className="flex-1" onClick={handleDownload}>
        <Download className="mr-2 h-3 w-3" />
        Download
      </Button>
    </div>
  );
};
