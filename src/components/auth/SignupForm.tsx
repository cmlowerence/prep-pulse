import { SignUp } from "@clerk/nextjs";

export default function SignupForm() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <SignUp routing="hash" />
    </div>
  );
}
