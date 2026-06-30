import Link from "next/link";
import { signup } from "../actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; confirm?: string; role?: string }>;
}) {
  const params = await searchParams;

  if (params.confirm) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
        <div className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-ink">Check your email</h1>
          <p className="mt-2 text-sm text-ink/60">
            We sent a confirmation link to your inbox. Click it to activate
            your account, then sign in to finish your profile.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
          >
            Go to sign in
          </Link>
        </div>
      </main>
    );
  }

  const defaultRole = params.role === "studio_owner" ? "studio_owner" : "instructor";

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-sand px-6 py-24">
      <form
        action={signup}
        className="w-full max-w-sm rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-ink">Join Subbed</h1>
        <p className="mt-2 text-sm text-ink/60">
          Create your account to get started.
        </p>

        {params.error && (
          <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-rose">
            {params.error}
          </p>
        )}

        <div className="mt-6 flex gap-1 rounded-full bg-sand p-1">
          <label className="flex-1">
            <input
              type="radio"
              name="role"
              value="instructor"
              defaultChecked={defaultRole === "instructor"}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-full px-3 py-2 text-center text-sm font-medium text-ink/60 peer-checked:bg-mauve peer-checked:text-sand">
              Instructor
            </span>
          </label>
          <label className="flex-1">
            <input
              type="radio"
              name="role"
              value="studio_owner"
              defaultChecked={defaultRole === "studio_owner"}
              className="peer sr-only"
            />
            <span className="block cursor-pointer rounded-full px-3 py-2 text-center text-sm font-medium text-ink/60 peer-checked:bg-mauve peer-checked:text-sand">
              Studio Owner
            </span>
          </label>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-ink">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>
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
              minLength={6}
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
        >
          Create account
        </button>

        <p className="mt-4 text-center text-sm text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-mauve hover:text-rose">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
