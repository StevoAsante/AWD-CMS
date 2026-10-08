// file: app/register/page.tsx
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <Link href="/" className="text-sm font-medium text-primary">← Back to home</Link>
            <h1 className="card-title text-3xl">Create your account</h1>
            <p className="text-base-content/60">Register to create and manage your newsletters.</p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
