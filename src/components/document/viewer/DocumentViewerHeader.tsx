
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize 
} from "lucide-react";
import { Document } from "../types";

interface DocumentViewerHeaderProps {
  document: Document;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onDownload: () => void;
  onShare: () => void;
  onPrint: () => void;
  isImage: boolean;
}

export const DocumentViewerHeader = ({
  document,
  zoom,
  onZoomIn,
  onZoomOut,
  onRotate,
  onReset,
  onFullscreen,
  onDownload,
  onShare,
  onPrint,
  isImage
}: DocumentViewerHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-4">
      <div className="flex items-center space-x-3">
        <h2 className="text-lg font-semibold truncate">
          {document.name}
        </h2>
        <Badge variant="outline">{document.category}</Badge>
        <Badge variant="outline">{document.size}</Badge>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Zoom controls */}
        <Button variant="outline" size="sm" onClick={onZoomOut} disabled={zoom <= 50}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
        <Button variant="outline" size="sm" onClick={onZoomIn} disabled={zoom >= 200}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        {/* Rotate */}
        {isImage && (
          <Button variant="outline" size="sm" onClick={onRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        )}
        
        {/* Reset view */}
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
        
        {/* Fullscreen */}
        <Button variant="outline" size="sm" onClick={onFullscreen}>
          <Maximize className="h-4 w-4" />
        </Button>
        
        {/* Actions */}
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="sm" onClick={onPrint}>
          Print
        </Button>
      </div>
    </div>
  );
};
