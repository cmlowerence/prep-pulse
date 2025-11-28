import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <MobileHeader />
      
      {/* Main Content Area */}
      {/* md:pl-64 pushes content right on desktop to make room for sidebar */}
      {/* pt-16 pushes content down on mobile to make room for header */}
      <main className="md:pl-64 pt-16 md:pt-0 min-h-screen">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}

