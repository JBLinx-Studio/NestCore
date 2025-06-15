
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileSpreadsheet, FileText, Archive } from "lucide-react";
import { Document } from "./types";
import { toast } from "sonner";

interface DocumentExporterProps {
  documents: Document[];
  selectedDocuments?: Document[];
}

export const DocumentExporter = ({ documents, selectedDocuments }: DocumentExporterProps) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'zip'>('csv');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includePreview, setIncludePreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = useCallback((docs: Document[]) => {
    const headers = [
      'Name', 'Category', 'Property', 'Tenant', 'Status', 'Size', 
      'Upload Date', 'File Type', 'Tags'
    ];
    
    if (includeMetadata) {
      headers.push('Expiry Date', 'Amount', 'Score', 'Photo Count');
    }

    const csvContent = [
      headers.join(','),
      ...docs.map(doc => [
        `"${doc.name}"`,
        `"${doc.category}"`,
        `"${doc.property}"`,
        `"${doc.tenant}"`,
        `"${doc.status}"`,
        `"${doc.size}"`,
        `"${doc.uploadDate}"`,
        `"${doc.fileType}"`,
        `"${doc.tags?.join('; ') || ''}"`,
        ...(includeMetadata ? [
          `"${'expiryDate' in doc ? doc.expiryDate || '' : ''}"`,
          `"${'amount' in doc ? doc.amount || '' : ''}"`,
          `"${'score' in doc ? doc.score || '' : ''}"`,
          `"${'photoCount' in doc ? doc.photoCount || '' : ''}"`
        ] : [])
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = globalThis.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `documents_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast.success(`Exported ${docs.length} documents to CSV`);
  }, [includeMetadata]);

  const exportToPDF = useCallback((docs: Document[]) => {
    // Create a simple HTML report
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Document Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .document { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            .document-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; }
            .document-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .detail { font-size: 14px; }
            .label { font-weight: bold; }
            .tags { margin-top: 10px; }
            .tag { background: #f0f0f0; padding: 2px 8px; border-radius: 3px; margin-right: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Document Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <p>Total Documents: ${docs.length}</p>
          </div>
          ${docs.map(doc => `
            <div class="document">
              <div class="document-title">${doc.name}</div>
              <div class="document-details">
                <div class="detail"><span class="label">Category:</span> ${doc.category}</div>
                <div class="detail"><span class="label">Property:</span> ${doc.property}</div>
                <div class="detail"><span class="label">Tenant:</span> ${doc.tenant}</div>
                <div class="detail"><span class="label">Status:</span> ${doc.status}</div>
                <div class="detail"><span class="label">Size:</span> ${doc.size}</div>
                <div class="detail"><span class="label">Upload Date:</span> ${doc.uploadDate}</div>
              </div>
              ${doc.tags && doc.tags.length > 0 ? `
                <div class="tags">
                  <span class="label">Tags:</span>
                  ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = globalThis.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `document_report_${new Date().toISOString().split('T')[0]}.html`;
    link.click();
    
    toast.success(`Generated document report for ${docs.length} documents`);
  }, []);

  const exportToZip = useCallback(async (docs: Document[]) => {
    toast.info("Preparing ZIP archive...");
    
    // Simulate ZIP creation (in real app, would use JSZip)
    const manifestContent = docs.map(doc => ({
      name: doc.name,
      category: doc.category,
      property: doc.property,
      tenant: doc.tenant,
      status: doc.status,
      size: doc.size,
      uploadDate: doc.uploadDate,
      tags: doc.tags
    }));

    const manifest = JSON.stringify(manifestContent, null, 2);
    const blob = new Blob([manifest], { type: 'application/json' });
    const link = globalThis.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `documents_manifest_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast.success(`Created archive manifest for ${docs.length} documents`);
  }, []);

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
          exportToCSV(docsToExport);
          break;
        case 'pdf':
          exportToPDF(docsToExport);
          break;
        case 'zip':
          await exportToZip(docsToExport);
          break;
      }
    } catch (error) {
      toast.error("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [documents, selectedDocuments, exportFormat, exportToCSV, exportToPDF, exportToZip]);

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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Format</label>
              <Select value={exportFormat} onValueChange={(value: 'csv' | 'pdf' | 'zip') => setExportFormat(value)}>
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
                  onCheckedChange={setIncludeMetadata}
                />
                <label htmlFor="metadata" className="text-sm">Include metadata</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="preview" 
                  checked={includePreview}
                  onCheckedChange={setIncludePreview}
                />
                <label htmlFor="preview" className="text-sm">Include file previews (ZIP only)</label>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                {selectedDocuments?.length 
                  ? `Exporting ${selectedDocuments.length} selected documents`
                  : `Exporting all ${documents.length} documents`
                }
              </p>
            </div>

            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="w-full"
            >
              {isExporting ? "Exporting..." : "Export Documents"}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
