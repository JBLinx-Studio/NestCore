
import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize, 
  Eye,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { Document } from "./types";
import { toast } from "sonner";

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

  const isPDF = document.fileType === 'pdf' || document.name.toLowerCase().endsWith('.pdf');
  const isImage = document.fileType === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => 
    document.name.toLowerCase().endsWith(`.${ext}`)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-6xl h-[90vh] ${isFullscreen ? 'w-screen h-screen max-w-none' : ''}`}>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <DialogTitle className="text-lg font-semibold truncate">
              {document.name}
            </DialogTitle>
            <Badge variant="outline">{document.category}</Badge>
            <Badge variant="outline">{document.size}</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom controls */}
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {/* Rotate */}
            {isImage && (
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
            )}
            
            {/* Reset view */}
            <Button variant="outline" size="sm" onClick={resetView}>
              Reset
            </Button>
            
            {/* Fullscreen */}
            <Button variant="outline" size="sm" onClick={handleFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
            
            {/* Actions */}
            <Button variant="outline" size="sm" onClick={() => onDownload(document)}>
              <Download className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => onShare(document)}>
              <Share className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </DialogHeader>

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
                <Button onClick={() => onDownload(document)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download to View
                </Button>
              </div>
            )}
          </div>
        </div>

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
