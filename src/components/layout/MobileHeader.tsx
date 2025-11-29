"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserNav } from "@/components/layout/UserNav";
import { Button } from "@/components/ui/Button";

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between p-4 border-b lg:hidden bg-background">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="font-bold text-lg">PrepPulse</div>
        <UserNav />
      </div>

      {/* Mobile Drawer/Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar Content */}
          <div className="relative flex-1 w-full max-w-xs bg-gray-900 h-full p-4 animate-in slide-in-from-left">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="mt-8 h-full">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
