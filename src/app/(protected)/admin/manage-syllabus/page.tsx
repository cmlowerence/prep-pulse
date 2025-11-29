import { CURRENT_SYLLABUS } from "@/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function ManageSyllabusPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Syllabus</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Topic
        </Button>
      </div>

      <div className="grid gap-4">
        {Object.entries(CURRENT_SYLLABUS).map(([key, subject]) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${subject.bgColor}`}>
                  <subject.icon className={`w-5 h-5 ${subject.color}`} />
                </div>
                <CardTitle className="text-lg">{subject.title}</CardTitle>
              </div>
              <Button variant="outline" size="sm">Edit Subject</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {subject.sections.map(section => (
                  <div key={section.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <span className="font-medium text-sm">{section.title}</span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
