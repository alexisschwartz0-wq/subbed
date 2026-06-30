export default function SignupPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
      <div className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-ink">Join Subbed</h1>
        <p className="mt-2 text-sm text-ink/60">
          Signup form goes here — wire up to Supabase, with a role toggle for
          instructor vs. studio owner.
        </p>
      </div>
    </main>
  );
}
