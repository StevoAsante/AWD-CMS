// file: app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-base-200 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-base-content/60">Authenticated dashboard</p>
                <h1 className="card-title text-3xl">
                  Welcome{session.user.name ? ", " + session.user.name : ""}
                </h1>
              </div>
              <LogoutButton />
            </div>
            <div className="mt-6 rounded-box bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Signed in as</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <p className="mt-4 text-base-content/70">
              Authentication is working. Newsletter CRUD will be added to this protected area next.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
