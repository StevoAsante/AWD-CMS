// file: components/newsletters/NewsletterForm.tsx
"use client";

import { useActionState } from "react";
import type { NewsletterActionState } from "@/app/dashboard/actions";

type NewsletterFormProps = {
  action: (
    previousState: NewsletterActionState,
    formData: FormData,
  ) => Promise<NewsletterActionState>;
  initialValues?: {
    id?: string;
    title?: string;
    content?: string;
    image?: string | null;
    status?: "Draft" | "Schedule" | "Sent";
  };
};

const initialState: NewsletterActionState = {};

export default function NewsletterForm({ action, initialValues }: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {initialValues?.id && <input type="hidden" name="id" value={initialValues.id} />}

      <div>
        <label htmlFor="title" className="label">
          <span className="label-text">Title</span>
        </label>
        <input id="title" name="title" type="text" required maxLength={160}
          defaultValue={initialValues?.title ?? ""} className="input input-bordered w-full" />
      </div>

      <div>
        <label htmlFor="content" className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea id="content" name="content" required maxLength={50000} rows={12}
          defaultValue={initialValues?.content ?? ""} className="textarea textarea-bordered w-full" />
      </div>

      <div>
        <label htmlFor="image" className="label">
          <span className="label-text">Image URL (optional)</span>
        </label>
        <input id="image" name="image" type="url" maxLength={2048}
          defaultValue={initialValues?.image ?? ""} className="input input-bordered w-full"
          placeholder="https://example.com/image.jpg" />
      </div>

      <div>
        <label htmlFor="status" className="label">
          <span className="label-text">Status</span>
        </label>
        <select id="status" name="status" defaultValue={initialValues?.status ?? "Draft"}
          className="select select-bordered w-full">
          <option value="Draft">Draft</option>
          <option value="Schedule">Scheduled</option>
          <option value="Sent">Sent</option>
        </select>
      </div>

      {state.error && <div role="alert" className="alert alert-error"><span>{state.error}</span></div>}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Saving..." : initialValues?.id ? "Save changes" : "Create newsletter"}
      </button>
    </form>
  );
}
