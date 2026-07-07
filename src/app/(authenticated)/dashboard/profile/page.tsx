import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Specialty = Database["public"]["Enums"]["specialty"];
const DISCIPLINE_LABELS: Record<Specialty, string> = {
  yoga: "Yoga",
  pilates: "Pilates",
  sound_bath: "Sound Bath",
  fitness: "Fitness",
};

export default async function MyProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = user.user_metadata?.role;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  if (role === "instructor") {
    const { data: instructor } = await supabase
      .from("instructors")
      .select("*")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (!instructor) {
      redirect("/onboarding/instructor");
    }

    return (
      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-extrabold text-ink">
              My Profile
            </h1>
            <Link
              href="/onboarding/instructor"
              className="rounded-full border border-mauve px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              Edit profile
            </Link>
          </div>
          <p className="mt-1 text-sm font-light text-ink/60">
            This is what studios see when they browse instructors.
          </p>

          <div className="mt-6 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist sm:h-20 sm:w-20">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name ?? "Profile photo"}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="font-heading text-lg font-extrabold break-words text-ink sm:text-xl">
                  {profile?.full_name}
                </p>
                <p className="text-sm text-ink/50">
                  {instructor.city || "Location not set"}
                </p>
              </div>
            </div>

            {instructor.bio && (
              <p className="mt-4 text-sm font-light leading-6 text-ink/70">
                {instructor.bio}
              </p>
            )}

            {instructor.specialties.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
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

            {instructor.certifications.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-ink/50 uppercase">
                  Certifications
                </p>
                <p className="mt-1 text-sm font-light text-ink/70">
                  {instructor.certifications.join(", ")}
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-mauve/10 pt-4 text-sm">
              <span className="text-ink/60">
                {instructor.accepts_subs && instructor.accepts_long_term
                  ? "Subs & long-term"
                  : instructor.accepts_subs
                    ? "Subs only"
                    : instructor.accepts_long_term
                      ? "Long-term only"
                      : "Not currently available"}
              </span>
              {instructor.hourly_rate_cents != null && (
                <span className="font-medium text-ink">
                  ${(instructor.hourly_rate_cents / 100).toFixed(0)}/hr
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (role === "studio_owner") {
    const { data: studio } = await supabase
      .from("studios")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (!studio) {
      redirect("/onboarding/studio");
    }

    return (
      <main className="flex flex-1 flex-col items-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-extrabold text-ink">
              My Profile
            </h1>
            <Link
              href="/onboarding/studio"
              className="rounded-full border border-mauve px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              Edit profile
            </Link>
          </div>
          <p className="mt-1 text-sm font-light text-ink/60">
            This is what instructors see when they browse studios.
          </p>

          <div className="mt-6 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist sm:h-20 sm:w-20">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={studio.name}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="font-heading text-lg font-extrabold break-words text-ink sm:text-xl">
                  {studio.name}
                </p>
                <p className="text-sm text-ink/50">
                  {[studio.city, studio.state].filter(Boolean).join(", ") ||
                    "Location not set"}
                </p>
              </div>
            </div>

            {studio.description && (
              <p className="mt-4 text-sm font-light leading-6 text-ink/70">
                {studio.description}
              </p>
            )}

            {(studio.address_line1 || studio.zip) && (
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-ink/50 uppercase">
                  Address
                </p>
                <p className="mt-1 text-sm font-light text-ink/70">
                  {[studio.address_line1, studio.address_line2]
                    .filter(Boolean)
                    .join(", ")}
                  {studio.zip ? ` ${studio.zip}` : ""}
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-mauve/10 pt-4 text-sm">
              {studio.phone && (
                <span className="text-ink/60">{studio.phone}</span>
              )}
              {studio.website_url && (
                <a
                  href={studio.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink hover:text-rose"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  redirect("/dashboard");
}
