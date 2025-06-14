
import { FileText, Image, Folder } from "lucide-react";

export const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
    case 'image': return <Image className="h-5 w-5 text-blue-500" />;
    case 'images': return <Image className="h-5 w-5 text-blue-500" />;
    case 'folder': return <Folder className="h-5 w-5 text-yellow-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

export const getStatusColor = (status: string) => {
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
