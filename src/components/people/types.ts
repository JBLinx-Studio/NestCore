
export type PersonRole = "agent" | "owner" | "tenant";

export interface Person {
  id: number;
  name: string;
  role: PersonRole;
  idNumber: string;
  contact: string;
  idDoc?: { url: string; name: string };
  linkedPropertyIds?: number[];
}
