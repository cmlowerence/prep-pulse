"use client";

import { CheckCircle, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubtopicItemProps {
  title: string;
  isCompleted?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const SubtopicItem = ({ 
  title, 
  isCompleted, 
  isActive, 
  onClick 
}: SubtopicItemProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md text-sm cursor-pointer transition-colors",
        isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground",
        isCompleted && "text-muted-foreground/70"
      )}
    >
      {isCompleted ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : isActive ? (
        <PlayCircle className="w-4 h-4 text-primary" />
      ) : (
        <Circle className="w-4 h-4" />
      )}
      <span>{title}</span>
    </div>
  );
};
