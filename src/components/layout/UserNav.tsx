"use client";

import { LogOut, User as UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function UserNav() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block text-right">
        <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
        <p className="text-xs text-slate-500 mt-1">{session?.user?.email}</p>
      </div>
      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
        <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => signOut({ callbackUrl: "/" })}
        title="Sign Out"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}

