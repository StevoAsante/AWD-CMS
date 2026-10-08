// file: types/next-auth.d.ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "User" | "Admin";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "User" | "Admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "User" | "Admin";
  }
}
