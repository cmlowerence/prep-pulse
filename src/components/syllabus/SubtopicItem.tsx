"use client";

import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SubtopicItemProps {
  id: string;
  name: string;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export function SubtopicItem({ id, name, isCompleted, onToggle }: SubtopicItemProps) {
  return (
    <div 
      className={cn(
        "group flex items-center gap-3 p-3 ml-4 rounded-lg cursor-pointer transition-all border border-transparent",
        isCompleted 
          ? "bg-emerald-50/50 hover:bg-emerald-50 dark:bg-emerald-900/10" 
          : "hover:bg-slate-50 hover:border-slate-100 dark:hover:bg-slate-800 dark:hover:border-slate-700"
      )}
      onClick={() => onToggle(id)}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{ scale: isCompleted ? 1 : 0, opacity: isCompleted ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute text-emerald-600 dark:text-emerald-500"
        >
          <Check size={20} strokeWidth={3} />
        </motion.div>
        <Circle 
          size={20} 
          className={cn(
            "transition-colors",
            isCompleted ? "text-transparent" : "text-slate-300 dark:text-slate-600 group-hover:text-indigo-400"
          )} 
        />
      </div>
      
      <span className={cn(
        "text-sm font-medium transition-all duration-300",
        isCompleted ? "text-slate-400 line-through decoration-slate-300" : "text-slate-700 dark:text-slate-200"
      )}>
        {name}
      </span>
    </div>
  );
}

