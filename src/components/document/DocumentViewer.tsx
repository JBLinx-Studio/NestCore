
import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document } from "./types";
import { toast } from "sonner";
import { DocumentViewerHeader } from "./viewer/DocumentViewerHeader";
import { DocumentViewerContent } from "./viewer/DocumentViewerContent";

interface DocumentViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (doc: Document) => void;
  onShare: (doc: Document) => void;
}

export const DocumentViewer = ({ 
  document, 
  isOpen, 
  onClose, 
  onDownload, 
  onShare 
}: DocumentViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 200));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 50));
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      const element = globalThis.document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      if (globalThis.document.exitFullscreen) {
        globalThis.document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  const handlePrint = useCallback(() => {
    if (document) {
      const printWindow = globalThis.window.open(document.url, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
      toast.success("Opening print dialog...");
    }
  }, [document]);

  const resetView = useCallback(() => {
    setZoom(100);
    setRotation(0);
  }, []);

  if (!document) return null;

  const isImage = document.fileType === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => 
    document.name.toLowerCase().endsWith(`.${ext}`)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-6xl h-[90vh] ${isFullscreen ? 'w-screen h-screen max-w-none' : ''}`}>
        <DocumentViewerHeader
          document={document}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRotate={handleRotate}
          onReset={resetView}
          onFullscreen={handleFullscreen}
          onDownload={() => onDownload(document)}
          onShare={() => onShare(document)}
          onPrint={handlePrint}
          isImage={isImage}
        />

        <DocumentViewerContent
          document={document}
          zoom={zoom}
          rotation={rotation}
          onDownload={() => onDownload(document)}
        />

        {/* Document info footer */}
        <div className="border-t pt-4 text-sm text-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="font-medium">Property:</span> {document.property}
            </div>
            <div>
              <span className="font-medium">Tenant:</span> {document.tenant}
            </div>
            <div>
              <span className="font-medium">Status:</span> {document.status}
            </div>
            <div>
              <span className="font-medium">Uploaded:</span> {new Date(document.uploadDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
