// file: app/dashboard/edit/[id]/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateNewsletter } from "@/app/dashboard/actions";
import NewsletterForm from "@/components/newsletters/NewsletterForm";

export default async function EditNewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const newsletter = await prisma.newsletter.findFirst({
    where: { id, authorId: session.user.id },
  });

  if (!newsletter) notFound();

  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="link link-primary">← Back to dashboard</Link>
        <div className="card mt-6 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl">Edit newsletter</h1>
            <NewsletterForm action={updateNewsletter} initialValues={{
              id: newsletter.id,
              title: newsletter.title,
              content: newsletter.content,
              image: newsletter.image,
              status: newsletter.status,
            }} />
          </div>
        </div>
      </div>
    </main>
  );
}
