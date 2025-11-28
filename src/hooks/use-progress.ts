"use client";

import { useState, useEffect } from "react";

export function useProgress() {
  const [completedSubtopics, setCompletedSubtopics] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem("prep-pulse-progress");
    if (saved) {
      try {
        setCompletedSubtopics(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("prep-pulse-progress", JSON.stringify(completedSubtopics));
    }
  }, [completedSubtopics, isLoaded]);

  const toggleSubtopic = (id: string) => {
    setCompletedSubtopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isCompleted = (id: string) => !!completedSubtopics[id];

  const getTopicProgress = (subtopicIds: string[]) => {
    if (subtopicIds.length === 0) return 0;
    const completedCount = subtopicIds.filter((id) => completedSubtopics[id]).length;
    return Math.round((completedCount / subtopicIds.length) * 100);
  };

  return {
    completedSubtopics,
    toggleSubtopic,
    isCompleted,
    getTopicProgress,
    isLoaded,
  };
}