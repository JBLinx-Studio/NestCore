
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
  onRename: (newName: string) => void;
  type?: "document" | "folder";
}

export const RenameDialog = ({
  open,
  onOpenChange,
  currentName,
  onRename,
  type = "document"
}: RenameDialogProps) => {
  const [newName, setNewName] = useState(currentName);

  const handleRename = () => {
    if (newName.trim() && newName !== currentName) {
      onRename(newName.trim());
      onOpenChange(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setNewName(currentName);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename {type}</DialogTitle>
          <DialogDescription>
            Enter a new name for this {type}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="rename-input">Name</Label>
            <Input
              id="rename-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              placeholder={`Enter ${type} name...`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRename} disabled={!newName.trim() || newName === currentName}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
