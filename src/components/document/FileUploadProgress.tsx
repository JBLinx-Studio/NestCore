
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { formatFileSize } from "./fileValidation";

interface UploadFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface FileUploadProgressProps {
  files: UploadFile[];
  onRemoveFile: (index: number) => void;
  onRetryFile: (index: number) => void;
}

export const FileUploadProgress = ({ files, onRemoveFile, onRetryFile }: FileUploadProgressProps) => {
  if (files.length === 0) return null;

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Upload Progress</h3>
        <div className="space-y-3">
          {files.map((uploadFile, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium truncate">{uploadFile.file.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(uploadFile.file.size)}
                    </span>
                    {uploadFile.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {uploadFile.status === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                {uploadFile.status === 'uploading' && (
                  <Progress value={uploadFile.progress} className="h-2" />
                )}
                {uploadFile.status === 'error' && uploadFile.error && (
                  <p className="text-xs text-red-500 mt-1">{uploadFile.error}</p>
                )}
              </div>
              <div className="flex space-x-1">
                {uploadFile.status === 'error' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRetryFile(index)}
                    className="h-8 w-8 p-0"
                  >
                    <span className="text-xs">↻</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
