// -------- SYLLABUS TYPES --------

export interface Subtopic {
  id: string;   // unique subtopic key
  name: string; // display label
}

export interface Topic {
  id: string;       // unique topic key
  name: string;     
  subtopics: Subtopic[];
}

export interface Subject {
  id: string;          // unique subject key
  name: string;
  color?: string;      // tailwind text color
  bgColor?: string;    // tailwind bg color
  icon?: string;       // optional icon name
  topics: Topic[];
}

export interface SyllabusData {
  id: string;          // syllabus id
  examName: string;
  version: string;
  subjects: Subject[]; // all subjects in exam
}

// -------- USER PROGRESS TYPES --------

export interface UserProgress {
  userId: string;
  examId: string;

  // key format: "topicId-subtopicId"
  completedSubtopics: Record<string, boolean>;

  totalCompleted: number; // completed count
  totalSubtopics: number; // total subtopics
}