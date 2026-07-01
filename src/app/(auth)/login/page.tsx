import Link from "next/link";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm"
      >
        <h1 className="font-heading text-2xl font-extrabold text-ink">
          Sign in to Subbed
        </h1>
        <p className="mt-2 text-sm font-light text-ink/60">Welcome back.</p>

        {params.error && (
          <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-rose">
            {params.error}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
        >
          Sign in
        </button>

        <p className="mt-4 text-center text-sm text-ink/60">
          Need an account?{" "}
          <Link href="/signup" className="font-medium text-mauve hover:text-rose">
            Join Subbed
          </Link>
        </p>
      </form>
    </main>
  );
}
