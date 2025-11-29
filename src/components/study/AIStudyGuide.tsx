"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Loader2, Download, FileText } from "lucide-react";
import { MathRenderer } from "./MathRenderer";
import { toast } from "sonner"; // Assuming sonner or similar toast, or remove

interface AIStudyGuideProps {
  topicId: string;
  topicName: string;
}

export const AIStudyGuide = ({ topicId, topicName }: AIStudyGuideProps) => {
  const [content, setContent] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateGuide = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({ topicId, topicName }),
      });
      
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      setContent(data.content);
      setPdfUrl(data.url);
    } catch (error) {
      console.error(error);
      alert("Failed to generate guide");
    } finally {
      setLoading(false);
    }
  };

  if (!content && !loading) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold mb-4">Start Learning: {topicName}</h3>
        <Button onClick={generateGuide} size="lg" className="gap-2">
          <FileText className="w-4 h-4" />
          Generate AI Study Guide
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">AI is crafting your study material...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-lg">
            <h2 className="text-lg font-medium">Study Mode</h2>
            {pdfUrl && (
              <Button variant="outline" size="sm" onClick={() => window.open(pdfUrl, '_blank')}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            )}
          </div>
          
          <Card className="p-8 shadow-sm border-t-4 border-t-primary">
            <MathRenderer content={content} />
          </Card>
        </>
      )}
    </div>
  );
};
