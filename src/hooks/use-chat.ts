import { useState } from 'react';

interface Message {
  role: 'user' | 'model';
  parts: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    setIsLoading(true);
    setError(null);

    // Optimistic update
    const userMsg: Message = { role: 'user', parts: content };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: content
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      setMessages([...newHistory, { role: 'model', parts: data.response }]);
    } catch (err) {
      setError('Failed to get response');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading, error };
}
