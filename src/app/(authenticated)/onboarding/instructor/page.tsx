import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InstructorProfileForm } from "@/components/instructor-profile-form";

export default async function InstructorOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.user_metadata?.role !== "instructor") {
    redirect("/dashboard");
  }

  const [{ data: profile }, { data: instructor }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single(),
    supabase
      .from("instructors")
      .select("*")
      .eq("profile_id", user.id)
      .maybeSingle(),
  ]);

  return (
    <main className="flex flex-1 flex-col items-center bg-sand px-6 py-16">
      <div className="w-full max-w-xl">
        <h1 className="font-heading text-2xl font-extrabold text-ink">
          Set up your instructor profile
        </h1>
        <p className="mt-2 text-sm font-light text-ink/60">
          Studios will see this when they&apos;re looking for a sub.
        </p>

        {params.error && (
          <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-ink">
            {params.error}
          </p>
        )}
      </div>

      <InstructorProfileForm
        fullName={profile?.full_name ?? ""}
        avatarUrl={profile?.avatar_url ?? null}
        bio={instructor?.bio ?? ""}
        city={instructor?.city ?? ""}
        zip={instructor?.zip ?? ""}
        certifications={(instructor?.certifications ?? []).join(", ")}
        specialties={instructor?.specialties ?? []}
        acceptsSubs={instructor?.accepts_subs ?? true}
        acceptsLongTerm={instructor?.accepts_long_term ?? true}
        hourlyRateDollars={
          instructor?.hourly_rate_cents != null
            ? String(instructor.hourly_rate_cents / 100)
            : ""
        }
      />
    </main>
  );
}
