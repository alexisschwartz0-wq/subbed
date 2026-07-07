import { updatePassword } from "../actions";
import { Footer } from "@/components/footer";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
        <form
          action={updatePassword}
          className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm"
        >
          <h1 className="font-heading text-2xl font-extrabold text-ink">
            Set a new password
          </h1>
          <p className="mt-2 text-sm font-light text-ink/60">
            Choose a new password for your account.
          </p>

          {params.error && (
            <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-ink">
              {params.error}
            </p>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink"
              >
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-ink"
              >
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
          >
            Update password
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
