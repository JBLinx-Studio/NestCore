
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Eye, Trash2, Download, Upload } from "lucide-react";
import { toast } from "sonner";

interface PropertyActionsProps {
  property: any;
  onEdit: (property: any) => void;
  onView: (property: any) => void;
  onDelete?: (property: any) => void;
}

export const PropertyActions = ({ property, onEdit, onView, onDelete }: PropertyActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    onEdit(property);
    setIsOpen(false);
    toast.success(`Editing ${property.name}`);
  };

  const handleView = () => {
    onView(property);
    setIsOpen(false);
    toast.info(`Viewing details for ${property.name}`);
  };

  const handleDownload = () => {
    toast.success(`Downloading property report for ${property.name}`);
    setIsOpen(false);
  };

  const handleUpload = () => {
    toast.info(`Opening document upload for ${property.name}`);
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(property);
      toast.success(`${property.name} deleted successfully`);
    } else {
      toast.error("Delete functionality not available");
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
        <DropdownMenuLabel>Property Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleView} className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpload} className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          Upload Documents
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleDelete} 
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Property
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
