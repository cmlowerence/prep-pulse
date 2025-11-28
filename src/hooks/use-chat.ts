"use client";

import { useState } from "react";

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export function useChat(topicContext: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message immediately
    const newHistory = [...messages, { role: 'user' as const, text: message }];
    setMessages(newHistory);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          topicContext,
          history: messages.slice(-4) // Send last 4 messages for context
        })
      });

      if (!res.ok) throw new Error("Failed to fetch response");
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      setError("Failed to connect to AI tutor.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
}