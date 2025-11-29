import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      {/* Clerk's pre-built profile management component */}
      <UserProfile 
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none border w-full bg-card",
          }
        }}
      />
    </div>
  );
}
