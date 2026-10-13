// file: lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Prisma 7 needs a PostgreSQL adapter for direct database connections.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

// Reuse the client during local hot reloads instead of opening a new pool.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
