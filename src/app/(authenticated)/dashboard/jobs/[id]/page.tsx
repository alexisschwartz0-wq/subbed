import Image from "next/image";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserEmail } from "@/lib/supabase/admin";
import { sendProfileViewedNotification } from "@/lib/email";

const DISCIPLINE_LABELS: Record<string, string> = {
  yoga: "Yoga",
  pilates: "Pilates",
  sound_bath: "Sound Bath",
  barre: "Barre",
  cycle: "Cycle",
  group_fitness: "Group Fitness",
  fitness: "Fitness",
};

export default async function JobApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.user_metadata?.role !== "studio_owner") redirect("/dashboard");

  const { data: studio } = await supabase
    .from("studios")
    .select("id, name")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!studio) redirect("/onboarding/studio");

  const { data: listing } = await supabase
    .from("job_listings")
    .select("*")
    .eq("id", id)
    .eq("studio_id", studio!.id)
    .maybeSingle();

  if (!listing) notFound();

  const { data: applications } = await supabase
    .from("job_applications")
    .select("*, profiles(full_name, avatar_url)")
    .eq("job_listing_id", id)
    .order("created_at", { ascending: false });

  // job_applications.instructor_id has no direct FK to instructors (it
  // goes through profiles), so PostgREST can't auto-embed it — fetch
  // separately and merge by profile_id.
  const instructorIds = (applications ?? []).map((a) => a.instructor_id);
  const { data: instructorRows } = instructorIds.length
    ? await supabase
        .from("instructors")
        .select(
          "profile_id, bio, specialties, city, hourly_rate_cents, accepts_subs, accepts_long_term",
        )
        .in("profile_id", instructorIds)
    : { data: [] };
  const instructorsByProfileId = new Map(
    (instructorRows ?? []).map((row) => [row.profile_id, row]),
  );

  // First-time view triggers a notification to the instructor.
  const unnotified = (applications ?? []).filter((a) => !a.viewed_at);
  for (const application of unnotified) {
    await supabase
      .from("job_applications")
      .update({ viewed_at: new Date().toISOString() })
      .eq("id", application.id);

    const instructorEmail = await getUserEmail(application.instructor_id);
    if (instructorEmail) {
      await sendProfileViewedNotification(
        instructorEmail,
        studio!.name,
        listing.title,
      );
    }
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <Link
        href="/dashboard/jobs"
        className="text-sm font-medium text-ink hover:text-rose"
      >
        ← My job listings
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink">
        {listing.title}
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        {DISCIPLINE_LABELS[listing.discipline]} ·{" "}
        {listing.location || "Location not set"}
      </p>

      <h2 className="mt-8 font-heading text-lg font-extrabold text-ink">
        Applicants
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications?.map((application) => {
          const instructor = instructorsByProfileId.get(application.instructor_id);

          return (
            <div
              key={application.id}
              className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mist">
                  {application.profiles?.avatar_url ? (
                    <Image
                      src={application.profiles.avatar_url}
                      alt={application.profiles.full_name}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="font-medium text-ink">
                    {application.profiles?.full_name}
                  </p>
                  <p className="text-xs text-ink/50">
                    {instructor?.city || "Location not set"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink/40">
                {application.kind === "application" ? "Applied" : "Inquired"}
              </p>

              {instructor?.bio && (
                <p className="mt-2 line-clamp-3 text-sm text-ink/70">
                  {instructor.bio}
                </p>
              )}

              {instructor && instructor.specialties.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {instructor.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {DISCIPLINE_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
              )}

              {instructor?.hourly_rate_cents != null && (
                <p className="mt-3 text-sm font-medium text-ink">
                  ${(instructor.hourly_rate_cents / 100).toFixed(0)}/hr
                </p>
              )}

              <Link
                href={`/dashboard/messages/${application.conversation_id}`}
                className="mt-4 block w-full rounded-full bg-mauve px-4 py-1.5 text-center text-sm font-medium text-white transition-colors hover:bg-rose"
              >
                Message
              </Link>
            </div>
          );
        })}
      </div>

      {applications && applications.length === 0 && (
        <p className="mt-4 text-sm text-ink/60">
          No one has applied yet.
        </p>
      )}
    </main>
  );
}
