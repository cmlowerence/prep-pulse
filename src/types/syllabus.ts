import { type LucideIcon } from 'lucide-react';

export interface SyllabusSection {
  id: string;
  title: string;
  topics: string[]; // Changed from object array to string array to match your data
}

export interface SubjectCategory {
  title: string;
  icon: LucideIcon; // Types the Lucide component (FlaskConical, Atom, etc.)
  color: string;    // e.g., "text-purple-600"
  bgColor: string;  // e.g., "bg-purple-100"
  sections: SyllabusSection[];
}

// This allows keys like 'chemistry', 'physics', 'general', etc.
// while enforcing the structure for each value.
export interface SyllabusData {
  [key: string]: SubjectCategory;
}
