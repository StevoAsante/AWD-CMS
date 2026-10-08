// file: app/dashboard/actions.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/newsletter-validations";
import { redirect } from "next/navigation";

export type NewsletterActionState = { error?: string };

async function requireUser() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  return session.user.id;
}

export async function createNewsletter(
  _previousState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const authorId = await requireUser();

  const result = newsletterSchema.safeParse({
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    image: formData.get("image") ?? "",
    status: formData.get("status") ?? "Draft",
  });

  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Please check the newsletter details." };
  }

  await prisma.newsletter.create({
    data: {
      title: result.data.title,
      content: result.data.content,
      image: result.data.image || null,
      status: result.data.status,
      authorId,
    },
  });

  redirect("/dashboard");
}

export async function updateNewsletter(
  _previousState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const authorId = await requireUser();
  const id = String(formData.get("id") ?? "");

  if (!id) return { error: "Newsletter not found." };

  const result = newsletterSchema.safeParse({
    title: formData.get("title") ?? "",
    content: formData.get("content") ?? "",
    image: formData.get("image") ?? "",
    status: formData.get("status") ?? "Draft",
  });

  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Please check the newsletter details." };
  }

  const existing = await prisma.newsletter.findFirst({
    where: { id, authorId },
    select: { id: true },
  });

  if (!existing) return { error: "Newsletter not found." };

  await prisma.newsletter.update({
    where: { id: existing.id },
    data: {
      title: result.data.title,
      content: result.data.content,
      image: result.data.image || null,
      status: result.data.status,
    },
  });

  redirect("/dashboard");
}

export async function deleteNewsletter(formData: FormData) {
  const authorId = await requireUser();
  const id = String(formData.get("id") ?? "");

  if (!id) return;

  await prisma.newsletter.deleteMany({
    where: { id, authorId },
  });

  redirect("/dashboard");
}
