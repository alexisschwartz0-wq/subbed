import Link from "next/link";
import { requestPasswordReset } from "../actions";
import { Footer } from "@/components/footer";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
        <div className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-extrabold text-ink">
            Reset your password
          </h1>
          <p className="mt-2 text-sm font-light text-ink/60">
            Enter your email and we&apos;ll send you a link to reset it.
          </p>

          {params.error && (
            <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-ink">
              {params.error}
            </p>
          )}

          {params.sent ? (
            <p className="mt-6 rounded-lg bg-mist px-3 py-2 text-sm text-ink">
              If an account exists for that email, a reset link is on its
              way. Check your inbox.
            </p>
          ) : (
            <form action={requestPasswordReset} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink"
                >
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

              <button
                type="submit"
                className="w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
              >
                Send reset link
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-ink/60">
            <Link href="/login" className="font-medium text-ink hover:text-rose">
              Back to sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
