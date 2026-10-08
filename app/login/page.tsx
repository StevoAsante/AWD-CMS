// file: app/login/page.tsx
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <Link href="/" className="text-sm font-medium text-primary">← Back to home</Link>
            <h1 className="card-title text-3xl">Log in</h1>
            <p className="text-base-content/60">Sign in to manage your newsletters.</p>
            <LoginForm />
            <p className="text-center text-sm text-base-content/60">
              Need an account?{" "}
              <Link href="/register" className="link link-primary">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
