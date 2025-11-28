import { Subject, UserProgress } from "@/types";

/**
 * Calculates the percentage of completed subtopics for a specific subject.
 */
export function calculateSubjectProgress(
  subject: Subject,
  completedSubtopics: Record<string, boolean>
): number {
  let total = 0;
  let completed = 0;

  subject.topics.forEach((topic) => {
    total += topic.subtopics.length;
    topic.subtopics.forEach((sub) => {
      if (completedSubtopics[sub.id]) {
        completed++;
      }
    });
  });

  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Calculates the total exam completion percentage.
 */
export function calculateTotalProgress(
  subjects: Subject[],
  completedSubtopics: Record<string, boolean>
): number {
  let totalSubtopics = 0;
  let completedCount = 0;

  subjects.forEach((subject) => {
    subject.topics.forEach((topic) => {
      totalSubtopics += topic.subtopics.length;
      topic.subtopics.forEach((sub) => {
        if (completedSubtopics[sub.id]) {
          completedCount++;
        }
      });
    });
  });

  if (totalSubtopics === 0) return 0;
  return Math.round((completedCount / totalSubtopics) * 100);
}

/**
 * Returns a count of mastered topics (where all subtopics are checked).
 */
export function countMasteredTopics(
  subjects: Subject[],
  completedSubtopics: Record<string, boolean>
): number {
  let masteredCount = 0;

  subjects.forEach((subject) => {
    subject.topics.forEach((topic) => {
      const isMastered = topic.subtopics.every((sub) => completedSubtopics[sub.id]);
      if (isMastered && topic.subtopics.length > 0) {
        masteredCount++;
      }
    });
  });

  return masteredCount;
}