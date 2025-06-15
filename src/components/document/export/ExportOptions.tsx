
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, Archive } from "lucide-react";

interface ExportOptionsProps {
  exportFormat: 'csv' | 'pdf' | 'zip';
  setExportFormat: (format: 'csv' | 'pdf' | 'zip') => void;
  includeMetadata: boolean;
  setIncludeMetadata: (include: boolean) => void;
  includePreview: boolean;
  setIncludePreview: (include: boolean) => void;
  isExporting: boolean;
  onExport: () => void;
  documentCount: number;
  selectedCount: number;
}

export const ExportOptions = ({
  exportFormat,
  setExportFormat,
  includeMetadata,
  setIncludeMetadata,
  includePreview,
  setIncludePreview,
  isExporting,
  onExport,
  documentCount,
  selectedCount
}: ExportOptionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Format</label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">
                <div className="flex items-center">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV Spreadsheet
                </div>
              </SelectItem>
              <SelectItem value="pdf">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF Report
                </div>
              </SelectItem>
              <SelectItem value="zip">
                <div className="flex items-center">
                  <Archive className="mr-2 h-4 w-4" />
                  ZIP Archive
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="metadata" 
              checked={includeMetadata}
              onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
            />
            <label htmlFor="metadata" className="text-sm">Include metadata</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="preview" 
              checked={includePreview}
              onCheckedChange={(checked) => setIncludePreview(checked === true)}
            />
            <label htmlFor="preview" className="text-sm">Include file previews (ZIP only)</label>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            {selectedCount > 0
              ? `Exporting ${selectedCount} selected documents`
              : `Exporting all ${documentCount} documents`
            }
          </p>
        </div>

        <Button 
          onClick={onExport} 
          disabled={isExporting}
          className="w-full"
        >
          {isExporting ? "Exporting..." : "Export Documents"}
        </Button>
      </CardContent>
    </Card>
  );
};
