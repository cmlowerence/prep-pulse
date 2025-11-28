import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrepPulse - TGT Exam Tracker",
  description: "AI-Powered Syllabus Tracking and Exam Preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-slate-50 dark:bg-slate-900")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

