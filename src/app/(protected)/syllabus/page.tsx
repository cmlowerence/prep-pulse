import { CURRENT_SYLLABUS } from "@/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SyllabusPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">TGT Science Syllabus</h1>
      
      <div className="grid gap-6 md:grid-cols-1">
        {Object.entries(CURRENT_SYLLABUS).map(([key, subject]) => (
          <Card key={key} className={`border-l-4 ${subject.color.replace('text', 'border')}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${subject.bgColor}`}>
                  <subject.icon className={`w-6 h-6 ${subject.color}`} />
                </div>
                <CardTitle>{subject.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subject.sections.map((section) => (
                  <div key={section.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium mb-2">{section.title}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                      {section.topics.slice(0, 3).map((topic, i) => (
                        <li key={i}>• {topic}</li>
                      ))}
                      {section.topics.length > 3 && <li>+ {section.topics.length - 3} more</li>}
                    </ul>
                    <Link href={`/study/${section.id}`}>
                      <Button size="sm" variant="secondary" className="w-full">
                        Start Studying <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
