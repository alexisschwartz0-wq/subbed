import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="font-heading text-xl font-extrabold tracking-tight text-ink"
          >
            Subbed
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-ink/70">
            {role === "studio_owner" && (
              <Link
                href="/dashboard/instructors"
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-mist hover:text-ink"
              >
                Browse instructors
              </Link>
            )}
            {role === "instructor" && (
              <Link
                href="/dashboard/studios"
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-mist hover:text-ink"
              >
                Browse studios
              </Link>
            )}
            <Link
              href="/dashboard/messages"
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-mist hover:text-ink"
            >
              Messages
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-mauve px-4 py-1.5 text-sm font-medium text-mauve transition-colors hover:bg-mist"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
