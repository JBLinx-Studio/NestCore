
import { Document } from "../types";
import { toast } from "sonner";

export class ExportService {
  exportToCSV(docs: Document[], includeMetadata: boolean = true) {
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

    this.downloadFile(csvContent, 'text/csv', 'csv');
    toast.success(`Exported ${docs.length} documents to CSV`);
  }

  exportToPDF(docs: Document[]) {
    const htmlContent = this.generateHTMLReport(docs);
    this.downloadFile(htmlContent, 'text/html', 'html');
    toast.success(`Generated document report for ${docs.length} documents`);
  }

  async exportToZip(docs: Document[]) {
    toast.info("Preparing ZIP archive...");
    
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
    this.downloadFile(manifest, 'application/json', 'json');
    toast.success(`Created archive manifest for ${docs.length} documents`);
  }

  private generateHTMLReport(docs: Document[]): string {
    return `
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
  }

  private downloadFile(content: string, mimeType: string, extension: string) {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const link = globalThis.document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `documents_export_${new Date().toISOString().split('T')[0]}.${extension}`;
    link.click();
  }
}
