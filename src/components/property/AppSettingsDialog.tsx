
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  setCurrency: (c: string) => void;
  metric: string;
  setMetric: (m: string) => void;
}

const currencies = [
  { id: "ZAR", label: "Rand (R)" },
  { id: "USD", label: "US Dollar ($)" },
  { id: "EUR", label: "Euro (€)" },
  { id: "GBP", label: "Pound (£)" }
];

const metrics = [
  { id: "metric", label: "Metric (m², km)" },
  { id: "imperial", label: "Imperial (ft², mi)" }
];

export function AppSettingsDialog({
  isOpen,
  onClose,
  currency,
  setCurrency,
  metric,
  setMetric,
}: AppSettingsDialogProps) {
  const [internalCurrency, setInternalCurrency] = useState(currency);
  const [internalMetric, setInternalMetric] = useState(metric);

  const handleSave = () => {
    setCurrency(internalCurrency);
    setMetric(internalMetric);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>App Settings</DialogTitle>
          <DialogDescription>
            Choose your currency and preferred units for property measurements.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Currency</label>
            <Select value={internalCurrency} onValueChange={setInternalCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Choose currency..." />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Measurement System</label>
            <Select value={internalMetric} onValueChange={setInternalMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Choose measurement system..." />
              </SelectTrigger>
              <SelectContent>
                {metrics.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
