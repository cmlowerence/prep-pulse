import { getUserProgress } from "@/lib/progress-service";
import { requireServerUser } from "@/lib/auth";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function DashboardPage() {
  const user = await requireServerUser();
  const progress = await getUserProgress(user.id);

  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <StatsOverview progress={progress} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <Link href="/syllabus">
              <Button>Resume Syllabus</Button>
            </Link>
            <Link href="/study/last-session">
              <Button variant="outline">Review Last Topic</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
