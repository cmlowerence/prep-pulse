import { SignIn } from "@clerk/nextjs";

export default function LoginForm() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <SignIn routing="hash" />
    </div>
  );
}
