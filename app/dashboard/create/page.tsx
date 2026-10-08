// file: app/dashboard/create/page.tsx
import Link from "next/link";
import { createNewsletter } from "@/app/dashboard/actions";
import NewsletterForm from "@/components/newsletters/NewsletterForm";

export default function CreateNewsletterPage() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="link link-primary">← Back to dashboard</Link>
        <div className="card mt-6 bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl">Create newsletter</h1>
            <p className="text-base-content/60">
              Write a newsletter and choose whether it stays private or becomes public.
            </p>
            <NewsletterForm action={createNewsletter} />
          </div>
        </div>
      </div>
    </main>
  );
}
