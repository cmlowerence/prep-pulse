import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

// Import the global styles we created in Stage 1
import "@/styles/globals.css";
import "@/styles/katex.css";
import "@/styles/overrides.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrepPulse | AI Exam Prep",
  description: "Master your TGT Science exam with AI-powered study guides and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-background antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
