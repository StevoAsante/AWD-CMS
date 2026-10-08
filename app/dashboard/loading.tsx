// file: app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-base-200 px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-6 w-48" />
        <div className="grid gap-4">
          <div className="skeleton h-32 w-full" />
          <div className="skeleton h-32 w-full" />
        </div>
      </div>
    </main>
  );
}
