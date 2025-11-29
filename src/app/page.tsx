import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { getServerUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await getServerUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center border-b">
        <span className="font-bold text-xl flex items-center gap-2">
          <Sparkles className="text-primary" /> PrepPulse
        </span>
        <div className="ml-auto gap-4 flex">
          <Link href="/sign-in"><Button variant="ghost">Sign In</Button></Link>
          <Link href="/sign-up"><Button>Get Started</Button></Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Master Your Exams with <br />
          <span className="text-primary">AI-Powered Precision</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Personalized study guides, instant quizzes, and syllabus tracking for the TGT Science Exam.
        </p>
        <Link href="/sign-up">
          <Button size="lg" className="h-12 px-8 text-lg gap-2">
            Start Preparing Now <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
