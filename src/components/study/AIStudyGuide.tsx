import { MathRenderer } from "./MathRenderer";
import { VideoResourceList } from "./VideoResourceList";
import { Sparkles } from "lucide-react";

interface AIStudyGuideProps {
  content: string | null;
  isLoading: boolean;
  topicName: string;
}

export function AIStudyGuide({ content, isLoading, topicName }: AIStudyGuideProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse p-6">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
           <div className="flex flex-col items-center gap-3 text-slate-400">
              <Sparkles className="animate-spin text-indigo-500" size={32} />
              <span className="font-medium">Curating study material for {topicName}...</span>
           </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return <div className="p-6 text-center text-red-500">Failed to load content.</div>;
  }

  // Parse out the video section if the AI included it in the text, 
  // or we can rely on a separate API call. For now, we render the full text.
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        <MathRenderer content={content} />
      </div>
      
      {/* In a future update, we can parse the `content` string to extract 
        Youtube links and pass them to VideoResourceList.
        For now, we will render a static list or placeholders.
      */}
      <VideoResourceList videos={[
        { title: `Introduction to ${topicName}`, url: `https://www.youtube.com/results?search_query=${topicName}` },
        { title: `Advanced concepts in ${topicName}`, url: `https://www.youtube.com/results?search_query=${topicName} advanced` }
      ]} />
    </div>
  );
}

