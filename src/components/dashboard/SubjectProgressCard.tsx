import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LucideIcon } from "lucide-react";

interface SubjectProgressCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  totalTopics: number;
  completedTopics: number;
}

export const SubjectProgressCard = ({
  title,
  icon: Icon,
  color,
  totalTopics,
  completedTopics
}: SubjectProgressCardProps) => {
  const percentage = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {percentage}%
        </div>
        <ProgressBar value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {completedTopics} / {totalTopics} topics completed
        </p>
      </CardContent>
    </Card>
  );
};
