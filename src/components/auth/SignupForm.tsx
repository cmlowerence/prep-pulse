"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Automatically sign in the user after successful registration
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSignup}>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
        <Input 
          required 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="John Doe" 
          className="mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <Input 
          required 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="you@example.com" 
          className="mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
        <Input 
          required 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="••••••••" 
          className="mt-1"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="animate-spin mr-2" /> : "Create Account"}
      </Button>
    </form>
  );
}

