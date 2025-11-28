import { Sparkles } from "lucide-react";

export function WelcomeBanner({ userName = "Aspirant" }: { userName?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-lg">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Welcome back, {userName}!
        </h1>
        <p className="mt-2 text-indigo-100 md:text-lg max-w-2xl">
          You're on track for the <span className="font-semibold text-white">TGT Science 2025</span> exam. 
          Keep up the momentum!
        </p>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-20 -mb-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-2xl" />
      
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-20 rotate-12">
        <Sparkles size={120} />
      </div>
    </div>
  );
}

