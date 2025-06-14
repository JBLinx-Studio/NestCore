
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Person, PersonRole } from "./types";
import { PersonForm } from "./PersonForm";
import { User, Home, IdCard, Search } from "lucide-react";

export function PeopleManager() {
  const [people, setPeople] = useState<Person[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const filteredPeople = people.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.idNumber?.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(person: Person) {
    setEditingPerson(person);
    setShowForm(true);
  }

  function handleDelete(person: Person) {
    setPeople(prev => prev.filter(p => p.id !== person.id));
  }

  function handleSavePerson(data: Person) {
    setPeople(prev =>
      prev.some(p => p.id === data.id)
        ? prev.map(p => (p.id === data.id ? data : p))
        : [...prev, data]
    );
    setShowForm(false);
    setEditingPerson(null);
  }

  return (
    <div className="space-y-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contacts & ID Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={() => { setEditingPerson(null); setShowForm(true); }}>
              Add New Person
            </Button>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-9"
                placeholder="Search by name or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPeople.map(p => (
              <Card key={p.id} className="bg-gray-50 border">
                <CardContent className="p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {(p.role === "agent" && <User className="h-6 w-6 text-blue-600" />)
                      || (p.role === "owner" && <Home className="h-6 w-6 text-green-600" />)
                      || (p.role === "tenant" && <IdCard className="h-6 w-6 text-yellow-600" />)}
                    <span className="font-semibold">{p.name}</span>
                    <span className="px-2 py-0.5 text-xs rounded bg-gray-100 border">{p.role}</span>
                  </div>
                  <div className="text-sm text-gray-800">
                    <span className="font-medium">ID:</span> {p.idNumber}
                  </div>
                  <div className="text-sm text-gray-800">
                    <span className="font-medium">Contact:</span> {p.contact}
                  </div>
                  {p.idDoc && (
                    <div className="text-xs">
                      <a href={p.idDoc.url} target="_blank" rel="noreferrer" className="underline text-blue-600">View ID Document</a>
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(p)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(p)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPerson ? "Edit Person" : "Add New Person"}</DialogTitle>
          </DialogHeader>
          <PersonForm person={editingPerson} onSave={handleSavePerson} onCancel={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
