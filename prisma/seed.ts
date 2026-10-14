// file: prisma/seed.ts
import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  // Keep demo records out of production databases.
  if (process.env.NODE_ENV === "production") {
    throw new Error("The development seed cannot run in production.");
  }

  // Reuse one demo author so running the seed again does not create duplicates.
  const author = await prisma.user.upsert({
    where: { email: "demo@awd-cms.local" },
    update: { name: "AWD CMS Demo" },
    create: {
      email: "demo@awd-cms.local",
      name: "AWD CMS Demo",
      role: "User",
    },
  });

  // Stable IDs make these example newsletters safe to seed more than once.
  const newsletters = [
    {
      id: "seed-newsletter-welcome",
      title: "Welcome to AWD CMS",
      content:
        "This example newsletter shows how published content appears in the public feed.",
      status: "Sent" as const,
    },
    {
      id: "seed-newsletter-project-update",
      title: "Project update",
      content:
        "Use this sample to test the newsletter detail page and the public feed.",
      status: "Sent" as const,
    },
    {
      id: "seed-newsletter-draft",
      title: "Draft newsletter example",
      content:
        "This draft should remain visible only in the author's dashboard.",
      status: "Draft" as const,
    },
  ];

  for (const newsletter of newsletters) {
    await prisma.newsletter.upsert({
      where: { id: newsletter.id },
      update: {
        title: newsletter.title,
        content: newsletter.content,
        status: newsletter.status,
        authorId: author.id,
      },
      create: {
        ...newsletter,
        authorId: author.id,
      },
    });
  }

  console.log("Development demo user and newsletters are ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
