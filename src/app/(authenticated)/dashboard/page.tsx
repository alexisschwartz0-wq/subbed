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
    </main>
  );
}
