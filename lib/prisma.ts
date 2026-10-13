
 // file: lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Prisma 7 needs a driver adapter to connect to PostgreSQL.
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

// Reuse the client during local hot reloads instead of opening
// a new pool every time Next.js reloads this module.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
