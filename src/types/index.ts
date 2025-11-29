export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

export interface StudySession {
  sessionId: string;
  userId: string;
  subjectId: string; // e.g., "chemistry"
  sectionId: string; // e.g., "chem_1"
  topicName: string; // e.g., "Matter & its states"
  startTime: Date;
  durationSeconds: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface QuizResult {
  id: string;
  userId: string;
  topicName: string; // Storing name since topics are now strings
  score: number;
  totalQuestions: number;
  difficulty: DifficultyLevel;
  timestamp: Date;
}

export interface AIStudyGuideResponse {
  markdownContent: string;
  generatedAt: Date;
}
