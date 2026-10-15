// file: app/page.tsx
import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/app/dashboard/LogoutButton";

export default async function HomePage() {
  // Read the session on the server so the homepage actions match the current login state.
  const session = await auth();

  return (
    <main className="min-h-screen bg-base-200 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="hero rounded-3xl bg-base-100 shadow-xl">
          <div className="hero-content py-20 text-center">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Advanced Web Development
              </p>
              <h1 className="text-5xl font-bold">AWD CMS</h1>
              <p className="py-6 text-base-content/70">
                A secure newsletter content management system built with
                Next.js, TypeScript, PostgreSQL, Prisma and Auth.js.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/newsletters" className="btn btn-primary">
                  View newsletters
                </Link>
                {session?.user ? (
                  <>
                    <Link href="/dashboard" className="btn btn-outline">
                      Dashboard
                    </Link>
                    <LogoutButton />
                  </>
                ) : (
                  <Link href="/login" className="btn btn-outline">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
