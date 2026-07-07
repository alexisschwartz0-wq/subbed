import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";
import { Footer } from "@/components/footer";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = user.user_metadata?.role;

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-mauve/20 bg-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/dashboard"
            className="font-heading text-lg font-extrabold tracking-tight text-ink sm:text-xl"
          >
            Subbed
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-xs font-medium text-ink/70 sm:gap-6 sm:text-sm">
            <Link
              href="/dashboard/profile"
              className="rounded-full px-2 py-1 transition-colors hover:bg-mist hover:text-ink sm:px-3 sm:py-1.5"
            >
              My Profile
            </Link>
            <Link
              href="/about"
              className="rounded-full px-2 py-1 transition-colors hover:bg-mist hover:text-ink sm:px-3 sm:py-1.5"
            >
              About
            </Link>
            {role === "studio_owner" && (
              <Link
                href="/dashboard/jobs"
                className="rounded-full px-2 py-1 transition-colors hover:bg-mist hover:text-ink sm:px-3 sm:py-1.5"
              >
                My Job Listings
              </Link>
            )}
            {role === "instructor" && (
              <>
                <Link
                  href="/dashboard/browse-jobs"
                  className="rounded-full px-2 py-1 transition-colors hover:bg-mist hover:text-ink sm:px-3 sm:py-1.5"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/dashboard/studios"
                  className="rounded-full px-2 py-1 transition-colors hover:bg-mist hover:text-ink sm:px-3 sm:py-1.5"
                >
                  Browse studios
                </Link>
              </>
            )}
            <Link
              href="/dashboard/messages"
              className="rounded-full px-2 py-1 transition-colors hover:bg-mist hover:text-ink sm:px-3 sm:py-1.5"
            >
              Messages
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-mauve px-2 py-1 text-xs font-medium text-ink transition-colors hover:bg-mist sm:px-4 sm:py-1.5 sm:text-sm"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
}
