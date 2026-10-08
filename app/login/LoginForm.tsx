// file: app/login/LoginForm.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setPending(false);

    if (!result?.ok) {
      setError("Invalid email or password.");
      return;
    }

    window.location.assign(result.url || callbackUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="label"><span className="label-text">Email</span></label>
        <input id="email" name="email" type="email" autoComplete="email" required value={email}
          onChange={(event) => setEmail(event.target.value)} className="input input-bordered w-full" />
      </div>
      <div>
        <label htmlFor="password" className="label"><span className="label-text">Password</span></label>
        <input id="password" name="password" type="password" autoComplete="current-password" required value={password}
          onChange={(event) => setPassword(event.target.value)} className="input input-bordered w-full" />
      </div>
      {error && <div role="alert" className="alert alert-error"><span>{error}</span></div>}
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
