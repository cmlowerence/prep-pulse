"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TGT_SCIENCE_SYLLABUS } from "@/data/syllabi/tgt-science-2025";
import { MathRenderer } from "@/components/study/MathRenderer";
import { ChatAssistant } from "@/components/study/ChatAssistant";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Sparkles, Youtube } from "lucide-react";

export default function StudyPage() {
  const params = useParams();
  const topicId = params.topicId as string;

  // 1. Find the topic details from our data
  const topicInfo = (() => {
    for (const subject of TGT_SCIENCE_SYLLABUS.subjects) {
      for (const topic of subject.topics) {
        if (topic.id === topicId) return { name: topic.name, subject: subject.name, type: 'topic' };
        // Check subtopics if we supported deep-linking (simplified for now to just Topics)
      }
    }
    return null;
  })();

  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  // 2. Fetch AI Content on Mount
  useEffect(() => {
    if (!topicInfo) return;

    const fetchGuide = async () => {
      try {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          body: JSON.stringify({ topic: topicInfo.name, subject: topicInfo.subject })
        });
        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setContent("Failed to generate study guide. Please check your API key.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuide();
  }, [topicInfo]);

  if (!topicInfo) return <div className="p-10">Topic not found</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{topicInfo.name}</h1>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium">{topicInfo.subject}</p>
          </header>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-40 bg-slate-100 rounded-xl flex items-center justify-center">
                 <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Sparkles className="animate-spin text-indigo-400" />
                    <span>Generating Study Guide...</span>
                 </div>
              </div>
            </div>
          ) : (
            <>
              {/* The AI Content */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <MathRenderer content={content || ""} />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center py-6">
                <Button 
                  size="lg" 
                  onClick={() => setShowChat(!showChat)}
                  className="rounded-full shadow-lg shadow-indigo-500/20"
                >
                  <MessageSquare className="mr-2" size={18} />
                  {showChat ? "Hide Chat" : "Ask AI Tutor"}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" onClick={() => window.open(`https://www.youtube.com/results?search_query=${topicInfo.name} ${topicInfo.subject} TGT Exam`, '_blank')}>
                  <Youtube className="mr-2 text-red-600" size={18} />
                  Find Videos
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Chat Sidebar (Always visible on large screens if desired, or toggleable) */}
      {showChat && (
        <div className="fixed inset-0 z-50 md:static md:z-0 md:w-96 md:border-l border-slate-200 shadow-xl md:shadow-none bg-white">
          <ChatAssistant 
            topicName={topicInfo.name} 
            onClose={() => setShowChat(false)} 
          />
        </div>
      )}
    </div>
  );
}

