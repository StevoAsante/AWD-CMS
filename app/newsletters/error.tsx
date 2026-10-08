// file: app/newsletters/error.tsx
"use client";

export default function NewslettersError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-16">
      <div className="mx-auto max-w-xl">
        <div className="alert alert-error">
          <div>
            <h1 className="font-semibold">Unable to load newsletters</h1>
            <p className="text-sm">The public newsletter feed could not be loaded.</p>
          </div>
        </div>
        <button type="button" className="btn btn-primary mt-4" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
