import { Topic, Subject, Syllabus } from "@/types/syllabus";

interface ProgressMap {
  [topicId: string]: {
    score: number;
    completed: boolean;
  };
}

/**
 * Calculates the percentage completion of a specific subject
 */
export function calculateSubjectProgress(subject: Subject, progressMap: ProgressMap): number {
  let totalTopics = 0;
  let completedTopics = 0;

  subject.sections.forEach(section => {
    totalTopics += section.topics.length;
    section.topics.forEach(topicName => {
      // We assume topic ID is constructed or mapped. 
      // For this calc, we check if the specific topic key exists and is completed
      // In a real app, you might map topic names to IDs.
      // Here we check if ANY progress exists for simplicity or strict mapping
      const key = `${section.id}_${topicName.replace(/\s+/g, '_').toLowerCase()}`; 
      if (progressMap[key]?.completed) {
        completedTopics++;
      }
    });
  });

  return totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
}

/**
 * Calculates overall syllabus completion
 */
export function calculateTotalProgress(syllabus: Syllabus, progressMap: ProgressMap): number {
  const subjects = Object.values(syllabus);
  if (subjects.length === 0) return 0;

  const totalPercentage = subjects.reduce((acc, subject) => {
    return acc + calculateSubjectProgress(subject, progressMap);
  }, 0);

  return Math.round(totalPercentage / subjects.length);
}
