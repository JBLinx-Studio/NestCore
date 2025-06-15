
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileSpreadsheet, FileText, Archive } from "lucide-react";
import { Document } from "./types";
import { toast } from "sonner";
import { ExportOptions } from "./export/ExportOptions";
import { ExportService } from "./export/ExportService";

interface DocumentExporterProps {
  documents: Document[];
  selectedDocuments?: Document[];
}

export const DocumentExporter = ({ documents, selectedDocuments }: DocumentExporterProps) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'zip'>('csv');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includePreview, setIncludePreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportService = new ExportService();

  const handleExport = useCallback(async () => {
    const docsToExport = selectedDocuments?.length ? selectedDocuments : documents;
    
    if (docsToExport.length === 0) {
      toast.error("No documents to export");
      return;
    }

    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
      
      switch (exportFormat) {
        case 'csv':
          exportService.exportToCSV(docsToExport, includeMetadata);
          break;
        case 'pdf':
          exportService.exportToPDF(docsToExport);
          break;
        case 'zip':
          await exportService.exportToZip(docsToExport);
          break;
      }
    } catch (error) {
      toast.error("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [documents, selectedDocuments, exportFormat, includeMetadata, exportService]);

  const exportOptions = {
    exportFormat,
    setExportFormat,
    includeMetadata,
    setIncludeMetadata,
    includePreview,
    setIncludePreview,
    isExporting,
    onExport: handleExport,
    documentCount: selectedDocuments?.length || documents.length,
    selectedCount: selectedDocuments?.length || 0
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Documents</DialogTitle>
        </DialogHeader>
        
        <ExportOptions {...exportOptions} />
      </DialogContent>
    </Dialog>
  );
};
