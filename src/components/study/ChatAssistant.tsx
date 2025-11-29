"use client";

import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Send, Bot, User } from "lucide-react";
import { useRef, useEffect } from "react";

export const ChatAssistant = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputRef.current?.value) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" /> 
          PrepPulse AI Tutor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground mt-20">
              <p>Ask me anything about this topic!</p>
              <p className="text-xs mt-2">Try: "Explain this formula with an example"</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.parts}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 items-center text-muted-foreground text-sm pl-12">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce delay-75">●</div>
              <div className="animate-bounce delay-150">●</div>
            </div>
          )}
        </div>
        <div className="p-4 border-t flex gap-2">
          <Input 
            ref={inputRef}
            placeholder="Ask a question..." 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={isLoading} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
