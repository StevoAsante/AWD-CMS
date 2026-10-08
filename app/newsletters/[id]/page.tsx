// file: app/newsletters/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const newsletter = await prisma.newsletter.findFirst({
    where: { id, status: "Sent" },
    select: { title: true, content: true, image: true, createdAt: true },
  });

  if (!newsletter) notFound();

  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <article className="mx-auto max-w-3xl">
        <Link href="/newsletters" className="link link-primary">← Back to newsletters</Link>
        <div className="card mt-6 overflow-hidden bg-base-100 shadow-xl">
          {newsletter.image && <img src={newsletter.image} alt="" className="max-h-[28rem] w-full object-cover" />}
          <div className="card-body p-8">
            <p className="text-sm text-base-content/50">{newsletter.createdAt.toLocaleDateString()}</p>
            <h1 className="text-4xl font-bold">{newsletter.title}</h1>
            <div className="mt-6 whitespace-pre-wrap leading-8 text-base-content/80">{newsletter.content}</div>
          </div>
        </div>
      </article>
    </main>
  );
}
