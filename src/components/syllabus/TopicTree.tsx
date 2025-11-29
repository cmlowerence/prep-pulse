"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Hash } from "lucide-react";
import { SubtopicItem } from "./SubtopicItem";

interface Section {
  id: string;
  title: string;
  topics: string[];
}

interface TopicTreeProps {
  sections: Section[];
  activeTopicId?: string;
}

export const TopicTree = ({ sections, activeTopicId }: TopicTreeProps) => {
  // Simple state to toggle sections. In a real app, might want to expand the active one by default.
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    sections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <div key={section.id} className="border rounded-lg overflow-hidden bg-card">
          <button
            onClick={() => toggle(section.id)}
            className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-medium">
              <Hash className="w-4 h-4 text-primary" />
              {section.title}
            </div>
            {expanded[section.id] ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {expanded[section.id] && (
            <div className="p-2 space-y-1 bg-background">
              {section.topics.map((topic, idx) => (
                <SubtopicItem
                  key={idx}
                  title={topic}
                  // Logic to determine if this specific subtopic is the "active" page
                  // For now, we compare strictly by ID matching if you map topics to IDs
                  isActive={activeTopicId === section.id} 
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
