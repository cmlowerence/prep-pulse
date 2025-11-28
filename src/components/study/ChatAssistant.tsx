"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { MathRenderer } from "./MathRenderer";

interface ChatAssistantProps {
  topicName: string;
  className?: string;
  onClose?: () => void;
}

export function ChatAssistant({ topicName, className, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          topicContext: topicName,
          history: messages.slice(-4) // Keep context small for demo
        })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I couldn't connect to the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800", className)}>
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-slate-900">
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
          <Bot size={18} className="text-indigo-600" />
          AI Tutor
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X size={18} />
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center text-slate-400 text-sm mt-8">
            <p>Ask me anything about <br/><span className="font-semibold text-indigo-500">{topicName}</span>!</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-slate-200 dark:bg-slate-700" : "bg-indigo-100 dark:bg-indigo-900"
            )}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-indigo-600 dark:text-indigo-400" />}
            </div>
            <div className={cn(
              "max-w-[85%] rounded-lg p-3 text-sm",
              msg.role === 'user' 
                ? "bg-indigo-600 text-white" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            )}>
              {msg.role === 'ai' ? <MathRenderer content={msg.text} /> : msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
               <Bot size={14} className="text-indigo-600" />
             </div>
             <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 flex items-center">
               <Loader2 size={16} className="animate-spin text-slate-400" />
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
}

