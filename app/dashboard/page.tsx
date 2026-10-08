// file: app/dashboard/page.tsx
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import DeleteNewsletterButton from "@/components/newsletters/DeleteNewsletterButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const newsletters = await prisma.newsletter.findMany({
    where: { authorId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-base-content/60">Newsletter management</p>
            <h1 className="text-3xl font-bold">
              Welcome{session.user.name ? `, ${session.user.name}` : ""}
            </h1>
            <p className="text-base-content/60">{session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/newsletters" className="btn btn-ghost">Public feed</Link>
            <LogoutButton />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Your newsletters</h2>
          <Link href="/dashboard/create" className="btn btn-primary">Create newsletter</Link>
        </div>

        {newsletters.length === 0 ? (
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center py-12 text-center">
              <h2 className="card-title">No newsletters yet</h2>
              <p className="text-base-content/60">Create your first newsletter to get started.</p>
              <Link href="/dashboard/create" className="btn btn-primary mt-2">Create newsletter</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {newsletters.map((newsletter) => (
              <article key={newsletter.id} className="card bg-base-100 shadow">
                <div className="card-body">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="card-title">{newsletter.title}</h3>
                      <p className="mt-1 text-sm text-base-content/60">
                        Updated {newsletter.updatedAt.toLocaleString()}
                      </p>
                    </div>
                    <span className={`badge ${
                      newsletter.status === "Sent"
                        ? "badge-success"
                        : newsletter.status === "Schedule"
                          ? "badge-warning"
                          : "badge-ghost"
                    }`}>
                      {newsletter.status === "Schedule" ? "Scheduled" : newsletter.status}
                    </span>
                  </div>

                  <div className="card-actions justify-end">
                    <Link href={`/dashboard/edit/${newsletter.id}`} className="btn btn-sm btn-outline">
                      Edit
                    </Link>
                    <DeleteNewsletterButton id={newsletter.id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
