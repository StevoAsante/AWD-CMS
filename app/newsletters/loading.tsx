// file: app/newsletters/loading.tsx
export default function NewslettersLoading() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="skeleton h-12 w-64" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="skeleton h-72 w-full" />
          <div className="skeleton h-72 w-full" />
        </div>
      </div>
    </main>
  );
}
