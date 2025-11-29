import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { requireServerUser } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireServerUser(); // Gatekeeper

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 h-full">
        <MobileHeader />
        <div className="p-8 h-full bg-slate-50 dark:bg-slate-950">
          {children}
        </div>
      </main>
    </div>
  );
}
