import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { logger } from "@/lib/logger";

export interface AuthUser {
  id: string; // Clerk ID
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

/**
 * Retrieves the current authenticated user safely.
 * Returns null if not logged in.
 */
export async function getServerUser(): Promise<AuthUser | null> {
  try {
    const user = await currentUser();
    
    if (!user) return null;

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? null,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (error) {
    logger.error("Auth Error", error);
    return null;
  }
}

/**
 * Enforces authentication. Redirects to sign-in if no user found.
 * Use this in Protected Routes or Server Actions.
 */
export async function requireServerUser(): Promise<AuthUser> {
  const user = await getServerUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return user;
}
