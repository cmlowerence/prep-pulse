"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Account Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              defaultValue={session?.user?.name || ""} 
              disabled 
              className="bg-slate-50" 
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input 
              defaultValue={session?.user?.email || ""} 
              disabled 
              className="bg-slate-50" 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exam Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            Currently tracking: <span className="font-bold text-slate-900 dark:text-slate-200">TGT Science & Non-Medical 2025</span>
          </p>
          <Button variant="outline" disabled>Change Exam Goal (Coming Soon)</Button>
        </CardContent>
      </Card>

      <div className="pt-4">
        <Button 
          variant="destructive" 
          className="w-full sm:w-auto gap-2"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut size={16} /> Sign Out
        </Button>
      </div>
    </div>
  );
}

