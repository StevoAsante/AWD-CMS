// file: app/newsletters/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NewslettersPage() {
  const newsletters = await prisma.newsletter.findMany({
    where: { status: "Sent" },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, content: true, image: true, createdAt: true },
  });

  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/" className="link link-primary">← Home</Link>
            <h1 className="mt-2 text-4xl font-bold">Newsletters</h1>
            <p className="text-base-content/60">Public newsletters that have been sent.</p>
          </div>
        </div>

        {newsletters.length === 0 ? (
          <div className="card bg-base-100 shadow">
            <div className="card-body items-center py-16 text-center">
              <h2 className="card-title">No newsletters published yet</h2>
              <p className="text-base-content/60">Check back when the first newsletter is sent.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {newsletters.map((newsletter) => (
              <article key={newsletter.id} className="card overflow-hidden bg-base-100 shadow-xl">
                {newsletter.image && <img src={newsletter.image} alt="" className="h-52 w-full object-cover" />}
                <div className="card-body">
                  <p className="text-sm text-base-content/50">{newsletter.createdAt.toLocaleDateString()}</p>
                  <h2 className="card-title">{newsletter.title}</h2>
                  <p className="line-clamp-4 whitespace-pre-wrap text-base-content/70">{newsletter.content}</p>
                  <div className="card-actions justify-end">
                    <Link href={`/newsletters/${newsletter.id}`} className="btn btn-primary btn-sm">
                      Read newsletter
                    </Link>
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
