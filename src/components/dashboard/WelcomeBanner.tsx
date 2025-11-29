"use client";

import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/Card";

export const WelcomeBanner = () => {
  const { user } = useUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white">
      <div className="p-6">
        <h2 className="text-3xl font-bold">
          {greeting}, {user?.firstName || "Scholar"}! 👋
        </h2>
        <p className="mt-2 text-indigo-100 opacity-90">
          Ready to crush your TGT Science goals today?
        </p>
      </div>
    </Card>
  );
};
