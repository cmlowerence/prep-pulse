"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { UploadCloud } from "lucide-react";

export default function ImportSyllabusPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    // Implement upload logic to api/uploads
    alert(`Ready to upload: ${file.name}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Import Data</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bulk Upload Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-muted-foreground">
            <UploadCloud className="w-10 h-10 mb-4" />
            <p className="mb-4">Drag and drop CSV or JSON files here</p>
            <Input 
              type="file" 
              accept=".csv,.json"
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="max-w-xs"
            />
          </div>
          <Button onClick={handleUpload} disabled={!file}>
            Start Import
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
