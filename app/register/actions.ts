// file: app/register/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validations";

export type RegisterState = { error?: string; success?: boolean };

export async function registerUser(
  _previousState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const result = registerSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
  });

  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Please check your details." };
  }

  const { name, email, password } = result.data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) return { error: "An account with that email already exists." };

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: { email, name: name || null, password: passwordHash },
  });

  return { success: true };
}
