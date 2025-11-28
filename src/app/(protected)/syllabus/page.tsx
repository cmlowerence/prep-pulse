"use client";

import { useState } from "react";
import { TGT_SCIENCE_SYLLABUS } from "@/data/syllabi/tgt-science-2025";
import { TopicTree } from "@/components/syllabus/TopicTree";
import { useProgress } from "@/hooks/use-progress";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function SyllabusPage() {
  const { completedSubtopics, toggleSubtopic, isLoaded } = useProgress();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic (simple search)
  const filteredSubjects = TGT_SCIENCE_SYLLABUS.subjects.map(subject => ({
    ...subject,
    topics: subject.topics.filter(topic => {
      const matchesTopic = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubtopic = topic.subtopics.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTopic || matchesSubtopic;
    })
  })).filter(subject => subject.topics.length > 0);

  if (!isLoaded) {
    return <div className="p-8 text-center text-slate-500">Loading progress...</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Syllabus Tracker</h1>
          <p className="text-slate-500">Track your coverage of the {TGT_SCIENCE_SYLLABUS.examName}</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-12">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <TopicTree
              key={subject.id}
              subject={subject}
              completedState={completedSubtopics}
              onToggle={toggleSubtopic}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No topics found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

