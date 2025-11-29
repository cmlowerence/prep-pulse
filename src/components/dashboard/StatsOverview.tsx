import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BookOpen, Trophy, Target, Clock } from "lucide-react";

interface StatsProps {
  progress: any[]; // Typed from API response
}

export const StatsOverview = ({ progress }: StatsProps) => {
  const completed = progress.filter((p) => p.completed).length;
  const totalScore = progress.reduce((acc, curr) => acc + (curr.score || 0), 0);
  const avgScore = progress.length ? Math.round(totalScore / progress.length) : 0;

  const stats = [
    {
      title: "Topics Covered",
      value: progress.length,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Avg. Quiz Score",
      value: `${avgScore}%`,
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Study Streak",
      value: "3 Days", // Placeholder for advanced logic
      icon: Clock,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
