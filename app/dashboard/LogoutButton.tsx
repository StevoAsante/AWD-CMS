// file: app/dashboard/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton() {
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <button type="button" className="btn btn-outline" onClick={handleLogout} disabled={pending}>
      {pending ? "Signing out..." : "Log out"}
    </button>
  );
}
