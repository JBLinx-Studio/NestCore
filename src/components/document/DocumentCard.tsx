
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Share, Trash2 } from "lucide-react";
import { getFileIcon, getStatusColor } from "./categories";

export const DocumentCard = ({
  doc,
  onView,
  onDownload,
  onShare,
  onDelete,
}: {
  doc: any;
  onView: (doc: any) => void;
  onDownload: (doc: any) => void;
  onShare: (doc: any) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Card key={doc.id} className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {getFileIcon(doc.fileType)}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{doc.name}</CardTitle>
              <CardDescription className="flex items-center space-x-2 mt-1">
                <span>{doc.size}</span>
                <span>•</span>
                <span>{doc.category}</span>
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(doc.status)}>
            {doc.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            <span>{doc.property}</span>
          </div>
          {doc.tenant !== "N/A" && (
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>{doc.tenant}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex space-x-2 pt-2 border-t border-gray-100">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(doc)}>
            <Eye className="mr-2 h-3 w-3" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onDownload(doc)}>
            <Download className="mr-2 h-3 w-3" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={() => onShare(doc)}>
            <Share className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(doc.id)}>
            <Trash2 className="h-3 w-3 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
