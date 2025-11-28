"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BrainCircuit, LayoutDashboard, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/syllabus", label: "Syllabus", icon: BookOpen },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="md:hidden fixed top-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-1.5 rounded">
          <BrainCircuit className="text-white w-4 h-4" />
        </div>
        <span className="font-bold text-lg text-slate-900 dark:text-white">PrepPulse</span>
      </div>
      
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <div className={cn(
                "flex items-center gap-3 p-3 rounded-lg text-sm font-medium",
                pathname.startsWith(item.href) 
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20" 
                  : "text-slate-600 dark:text-slate-300"
              )}>
                <item.icon size={18} />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

