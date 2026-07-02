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
      <h1 className="font-heading text-2xl font-extrabold text-ink">
        Dashboard
      </h1>
      <p className="mt-2 text-sm font-light break-all text-ink/60">
        Signed in as {user.email}
      </p>

      <Link
        href="/dashboard/profile"
        className="mt-8 flex w-full max-w-sm items-center justify-between rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm transition-colors hover:bg-mist"
      >
        <div>
          <p className="font-heading text-lg font-extrabold text-ink">
            My Profile
          </p>
          <p className="mt-1 text-sm font-light text-ink/60">
            View and edit how others see you on Subbed.
          </p>
        </div>
        <span aria-hidden className="text-2xl text-mauve">
          →
        </span>
      </Link>
    </main>
  );
}
