import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Subject } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SubjectProgressCardProps {
  subject: Subject;
  progress: number; // 0-100
}

export function SubjectProgressCard({ subject, progress }: SubjectProgressCardProps) {
  // Mapping color strings to actual Tailwind classes safely
  // Note: In a real app, you might want a safer utility for this
  const colorClass = subject.color || "text-slate-600";
  const bgClass = subject.bgColor || "bg-slate-100";

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-indigo-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-lg p-2 transition-colors", bgClass)}>
            {/* We will render icons dynamically later if needed, for now just the name */}
            <span className={cn("text-lg font-bold", colorClass)}>
              {subject.name.charAt(0)}
            </span>
          </div>
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-100">
            {subject.name}
          </CardTitle>
        </div>
        <span className={cn("text-sm font-bold", colorClass)}>
          {progress}%
        </span>
      </CardHeader>
      
      <CardContent>
        <div className="mt-2 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Progress</span>
              <span>{progress}/100</span>
            </div>
            {/* Pass the specific color class to the progress bar */}
            <ProgressBar 
              value={progress} 
              className="h-2" 
              colorClass={subject.color ? subject.color.replace('text-', 'bg-') : undefined} 
            />
          </div>
          
          <Link 
            href={`/syllabus?subject=${subject.id}`}
            className="flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-indigo-600 transition-colors"
          >
            <span>View Topics</span>
            <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

