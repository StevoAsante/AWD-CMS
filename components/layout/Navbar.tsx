// file: components/layout/Navbar.tsx
import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/app/dashboard/LogoutButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-6xl px-6">
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold">AWD CMS</Link>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/newsletters" className="btn btn-ghost btn-sm">Newsletters</Link>

          {session?.user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary btn-sm">Dashboard</Link>
              <span className="hidden text-sm text-base-content/60 sm:inline">
                {session.user.name || session.user.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
