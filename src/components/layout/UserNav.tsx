import { UserButton } from "@clerk/nextjs";

export const UserNav = () => {
  return (
    <div className="flex items-center gap-x-2">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
