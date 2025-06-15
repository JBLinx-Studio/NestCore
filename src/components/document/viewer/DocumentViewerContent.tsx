
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Document } from "../types";

interface DocumentViewerContentProps {
  document: Document;
  zoom: number;
  rotation: number;
  onDownload: () => void;
}

export const DocumentViewerContent = ({
  document,
  zoom,
  rotation,
  onDownload
}: DocumentViewerContentProps) => {
  const isPDF = document.fileType === 'pdf' || document.name.toLowerCase().endsWith('.pdf');
  const isImage = document.fileType === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => 
    document.name.toLowerCase().endsWith(`.${ext}`)
  );

  return (
    <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
      <div className="h-full flex items-center justify-center p-4">
        {isPDF ? (
          <div className="w-full h-full bg-white rounded shadow">
            <iframe
              src={document.url}
              className="w-full h-full border-0"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
              title={`PDF Viewer - ${document.name}`}
            />
          </div>
        ) : isImage ? (
          <div className="max-w-full max-h-full overflow-auto">
            <img
              src={document.url}
              alt={document.name}
              className="max-w-none"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
            />
          </div>
        ) : (
          <div className="text-center">
            <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              This file type cannot be previewed in the browser.
            </p>
            <Button onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download to View
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
