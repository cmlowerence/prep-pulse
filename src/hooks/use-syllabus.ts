import { CURRENT_SYLLABUS } from '@/data';
import { useProgress } from './use-progress';

export function useSyllabus() {
  const { progress } = useProgress();

  const getTopicStatus = (topicId: string) => {
    // Assuming progress data returns { topic_id: string, completed: boolean }
    // We map the raw topic string/id to the progress
    // In a real app, ensure IDs match perfectly.
    const found = progress.find((p: any) => p.topic_id === topicId);
    return {
      completed: found?.completed || false,
      score: found?.score || 0
    };
  };

  return {
    syllabus: CURRENT_SYLLABUS,
    getTopicStatus
  };
}
