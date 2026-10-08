// file: components/newsletters/DeleteNewsletterButton.tsx
"use client";

import { useState } from "react";
import { deleteNewsletter } from "@/app/dashboard/actions";

export default function DeleteNewsletterButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this newsletter? This cannot be undone.")) return;
    setPending(true);

    const formData = new FormData();
    formData.set("id", id);
    await deleteNewsletter(formData);
  }

  return (
    <button type="button" className="btn btn-sm btn-error btn-outline"
      onClick={handleDelete} disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
