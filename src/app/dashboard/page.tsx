import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.user_metadata?.role === "instructor") {
    const { data: instructor } = await supabase
      .from("instructors")
      .select("profile_id")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (!instructor) {
      redirect("/onboarding/instructor");
    }
  }

  if (user.user_metadata?.role === "studio_owner") {
    const { data: studio } = await supabase
      .from("studios")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (!studio) {
      redirect("/onboarding/studio");
    }
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-ink/60">Signed in as {user.email}</p>

      <div className="mt-6 flex w-fit gap-3">
        {user.user_metadata?.role === "studio_owner" && (
          <Link
            href="/dashboard/instructors"
            className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
          >
            Browse instructors
          </Link>
        )}

        {user.user_metadata?.role === "instructor" && (
          <Link
            href="/dashboard/studios"
            className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
          >
            Browse studios
          </Link>
        )}

        <Link
          href="/dashboard/messages"
          className="rounded-full border border-mauve px-6 py-2 text-sm font-medium text-mauve transition-colors hover:bg-mauve/10"
        >
          Messages
        </Link>
      </div>
    </main>
  );
}
