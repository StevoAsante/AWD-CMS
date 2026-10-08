// file: app/register/RegisterForm.tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUser, initialState);

  if (state.success) {
    return (
      <div className="alert alert-success">
        <span>
          Account created successfully. You can now{" "}
          <Link href="/login" className="font-semibold underline">log in</Link>.
        </span>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="label"><span className="label-text">Name (optional)</span></label>
        <input id="name" name="name" type="text" autoComplete="name" maxLength={80} className="input input-bordered w-full" />
      </div>
      <div>
        <label htmlFor="email" className="label"><span className="label-text">Email</span></label>
        <input id="email" name="email" type="email" autoComplete="email" required className="input input-bordered w-full" />
      </div>
      <div>
        <label htmlFor="password" className="label"><span className="label-text">Password</span></label>
        <input id="password" name="password" type="password" autoComplete="new-password" required className="input input-bordered w-full" aria-describedby="password-help" />
        <p id="password-help" className="mt-2 text-sm text-base-content/60">
          12+ characters with uppercase, lowercase, number and special character.
        </p>
      </div>
      {state.error && <div role="alert" className="alert alert-error"><span>{state.error}</span></div>}
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </button>
      <p className="text-center text-sm text-base-content/60">
        Already have an account? <Link href="/login" className="link link-primary">Log in</Link>
      </p>
    </form>
  );
}
