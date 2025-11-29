"use client";

import { ClerkProvider } from "@clerk/nextjs";

// Wrapper if we need to inject custom context later
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
};
