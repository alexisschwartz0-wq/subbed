export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
      <div className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-ink">Sign in to Subbed</h1>
        <p className="mt-2 text-sm text-ink/60">
          Auth form goes here — wire up to Supabase.
        </p>
      </div>
    </main>
  );
}
