import syllabusData from './syllabi/default-syllabus';
import { tgtScienceSyllabus } from './syllabi/tgt-science-2025';

export const SYLLABI = {
  default: syllabusData,
  tgtScience2025: tgtScienceSyllabus,
};

export const CURRENT_SYLLABUS = SYLLABI.tgtScience2025;
