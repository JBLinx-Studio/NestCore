
import { useState, useCallback } from "react";
import { Upload, FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFilesDropped: (files: File[]) => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const DropZone = ({ onFilesDropped, children, className, disabled = false }: DropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesDropped(files);
    }
  }, [onFilesDropped, disabled]);

  return (
    <div
      className={cn(
        "relative transition-all duration-200",
        isDragOver && !disabled && "bg-blue-50 border-blue-300 scale-[1.02]",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      
      {isDragOver && !disabled && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-50/90 border-2 border-dashed border-blue-400 rounded-lg">
          <div className="text-center">
            <Upload className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-medium text-blue-900">Drop files here to upload</p>
            <p className="text-sm text-blue-700">Supports PDF, images, and documents</p>
          </div>
        </div>
      )}
    </div>
  );
};
