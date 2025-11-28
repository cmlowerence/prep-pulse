import { TGT_SCIENCE_SYLLABUS } from "@/data/syllabi/tgt-science-2025";
import { Subject, Topic } from "@/types";

export function useSyllabus() {
  const syllabus = TGT_SCIENCE_SYLLABUS;

  const getSubjectById = (id: string): Subject | undefined => {
    return syllabus.subjects.find((s) => s.id === id);
  };

  const getTopicById = (id: string): { topic: Topic; subject: Subject } | null => {
    for (const subject of syllabus.subjects) {
      const topic = subject.topics.find((t) => t.id === id);
      if (topic) {
        return { topic, subject };
      }
    }
    return null;
  };

  return {
    syllabus,
    getSubjectById,
    getTopicById
  };
}