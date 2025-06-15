

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Download, Archive, Trash2, Share, Tag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentBatchSelectorProps {
  documents: any[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onBulkAction: (action: string, ids: number[]) => void;
}

export const DocumentBatchSelector = ({ 
  documents, 
  selectedIds, 
  onSelectionChange, 
  onBulkAction 
}: DocumentBatchSelectorProps) => {
  const allSelected = documents.length > 0 && selectedIds.length === documents.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < documents.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(documents.map(doc => doc.id));
    }
  };

  const handleBulkAction = (action: string) => {
    onBulkAction(action, selectedIds);
    onSelectionChange([]); // Clear selection after action
  };

  if (documents.length === 0) return null;

  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={allSelected}
          onCheckedChange={handleSelectAll}
          className={someSelected && !allSelected ? "opacity-60" : ""}
        />
        <span className="text-sm font-medium">
          {selectedIds.length > 0 
            ? `${selectedIds.length} document${selectedIds.length > 1 ? 's' : ''} selected`
            : 'Select all'
          }
        </span>
        {selectedIds.length > 0 && (
          <Badge variant="secondary">{selectedIds.length}</Badge>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('download')}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('share')}
          >
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                More Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction('tag')}>
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleBulkAction('delete')}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

