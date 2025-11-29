import { AIStudyGuide } from "@/components/study/AIStudyGuide";
import { CURRENT_SYLLABUS } from "@/data";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageProps {
  params: { topicId: string };
}

export default function StudyPage({ params }: PageProps) {
  // Simple lookup to find the section title based on ID
  let sectionTitle = "";
  
  // Iterate through syllabus to find the matching section ID
  // (In a real app with DB, this would be a DB query)
  Object.values(CURRENT_SYLLABUS).forEach(subject => {
    subject.sections.forEach(section => {
      if (section.id === params.topicId) {
        sectionTitle = section.title;
      }
    });
  });

  if (!sectionTitle) {
    return <div className="p-8">Topic not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/syllabus">
          <Button variant="ghost" size="icon"><ChevronLeft /></Button>
        </Link>
        <h1 className="text-2xl font-bold">{sectionTitle}</h1>
      </div>

      <AIStudyGuide topicId={params.topicId} topicName={sectionTitle} />
    </div>
  );
}
