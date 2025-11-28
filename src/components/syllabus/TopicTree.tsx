"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Subject, Topic } from "@/types";
import { cn } from "@/lib/utils";
import { SubtopicItem } from "./SubtopicItem";
import { Button } from "@/components/ui/Button";

interface TopicTreeProps {
  subject: Subject;
  completedState: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function TopicTree({ subject, completedState, onToggle }: TopicTreeProps) {
  // We keep track of which topics are expanded
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleExpand = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-lg bg-slate-100 dark:bg-slate-800", subject.color)}>
           {/* If we had icons in the data, we'd use them here. Using first letter for now */}
           <span className="font-bold text-lg">{subject.name[0]}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{subject.name}</h2>
      </div>

      <div className="space-y-3">
        {subject.topics.map((topic) => {
          const isExpanded = expandedTopics[topic.id];
          // Calculate progress for this specific topic
          const completedCount = topic.subtopics.filter(s => completedState[s.id]).length;
          const totalCount = topic.subtopics.length;
          const progressPercent = Math.round((completedCount / totalCount) * 100);
          const isFullyComplete = completedCount === totalCount && totalCount > 0;

          return (
            <div 
              key={topic.id} 
              className={cn(
                "rounded-xl border transition-all duration-200 bg-white dark:bg-slate-900 overflow-hidden",
                isExpanded ? "border-indigo-200 shadow-md ring-1 ring-indigo-100 dark:ring-indigo-900 dark:border-indigo-800" : "border-slate-200 dark:border-slate-800 hover:border-indigo-200"
              )}
            >
              {/* Topic Header */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleExpand(topic.id)}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400"
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                  
                  <div>
                    <h3 className={cn("font-semibold text-slate-800 dark:text-slate-200", isFullyComplete && "text-emerald-600 dark:text-emerald-500")}>
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {completedCount}/{totalCount} completed • {progressPercent}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   {/* Study Button - Stops propagation so clicking it doesn't close the accordion */}
                   <Link href={`/study/${topic.id}`} onClick={(e) => e.stopPropagation()}>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="hidden sm:flex gap-2 text-indigo-600 border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                    >
                      <Sparkles size={14} />
                      Study
                    </Button>
                    <Button size="icon" variant="ghost" className="sm:hidden text-indigo-600">
                      <Sparkles size={16} />
                    </Button>
                   </Link>
                </div>
              </div>

              {/* Progress Line (Visible when collapsed) */}
              {!isExpanded && totalCount > 0 && (
                <div className="h-1 w-full bg-slate-50 dark:bg-slate-800">
                  <div 
                    className={cn("h-full transition-all duration-500", isFullyComplete ? "bg-emerald-500" : "bg-indigo-500")} 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
              )}

              {/* Expanded Content (Subtopics) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                  >
                    <div className="p-2 pb-4 space-y-1">
                      {topic.subtopics.map((subtopic) => (
                        <SubtopicItem
                          key={subtopic.id}
                          id={subtopic.id}
                          name={subtopic.name}
                          isCompleted={!!completedState[subtopic.id]}
                          onToggle={onToggle}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

