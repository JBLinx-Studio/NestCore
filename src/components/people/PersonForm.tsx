
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Person, PersonRole } from "./types";
import { User, Home, IdCard } from "lucide-react";

interface PersonFormProps {
  person?: Person | null;
  onSave: (p: Person) => void;
  onCancel: () => void;
}

const ROLES: { value: PersonRole; label: string; icon: any }[] = [
  { value: "agent", label: "Agent", icon: User },
  { value: "owner", label: "Owner", icon: Home },
  { value: "tenant", label: "Tenant", icon: IdCard },
];

export function PersonForm({ person, onSave, onCancel }: PersonFormProps) {
  const [name, setName] = useState(person?.name ?? "");
  const [role, setRole] = useState<PersonRole>(person?.role ?? "tenant");
  const [idNumber, setIdNumber] = useState(person?.idNumber ?? "");
  const [contact, setContact] = useState(person?.contact ?? "");
  const [idDoc, setIdDoc] = useState<{ url: string; name: string } | undefined>(person?.idDoc);

  async function handleDocUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // For demo: use local blob. Replace with actual upload service in future!
    const url = URL.createObjectURL(file);
    setIdDoc({ url, name: file.name });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !idNumber.trim() || !contact.trim()) return;
    onSave({
      id: person?.id ?? Date.now(),
      name,
      role,
      idNumber,
      contact,
      idDoc
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <Select value={role} onValueChange={val => setRole(val as PersonRole)}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map(r => (
              <SelectItem key={r.value} value={r.value}>
                <span className="inline-flex items-center gap-1"><r.icon className="h-4 w-4" />{r.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium">ID Number</label>
        <Input value={idNumber} onChange={e => setIdNumber(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Contact Info</label>
        <Input value={contact} onChange={e => setContact(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium">Upload ID Document/Scan</label>
        <Input type="file" accept="image/*,.pdf" onChange={handleDocUpload} />
        {idDoc && (
          <div className="mt-2 text-xs">
            <a href={idDoc.url} target="_blank" rel="noreferrer" className="underline text-blue-600">{idDoc.name}</a>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <Button type="submit">{person ? "Update" : "Add"} Person</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
