import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2, Target, BookOpen, TrendingUp } from "lucide-react";

export function StatsOverview() {
  // TODO: In the future, these numbers will come from real data
  const stats = [
    {
      label: "Total Progress",
      value: "12%",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Topics Mastered",
      value: "8/64",
      icon: CheckCircle2,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Study Hours",
      value: "14.5h",
      icon: BookOpen,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      label: "Daily Goal",
      value: "80%",
      icon: Target,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

