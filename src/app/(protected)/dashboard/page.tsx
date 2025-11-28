import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { SubjectProgressCard } from "@/components/dashboard/SubjectProgressCard";
import { TGT_SCIENCE_SYLLABUS } from "@/data/syllabi/tgt-science-2025";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* 1. Welcome Section */}
      <WelcomeBanner />

      {/* 2. Quick Stats Grid */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 px-1">
          Overview
        </h2>
        <StatsOverview />
      </section>

      {/* 3. Subject Progress Grid */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Subject Wise Progress
          </h2>
          {/* <span className="text-sm text-slate-500">Last updated: Today</span> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TGT_SCIENCE_SYLLABUS.subjects.map((subject) => (
            <SubjectProgressCard 
              key={subject.id} 
              subject={subject} 
              progress={Math.floor(Math.random() * 40) + 5} // Mock progress 5-45% for visual demo
            />
          ))}
        </div>
      </section>
    </div>
  );
}

