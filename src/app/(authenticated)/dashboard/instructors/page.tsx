import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { startConversation } from "../messages/actions";

type Specialty = Database["public"]["Enums"]["specialty"];
const DISCIPLINES: { value: Specialty; label: string }[] = [
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
  { value: "sound_bath", label: "Sound Bath" },
  { value: "fitness", label: "Fitness" },
];

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function BrowseInstructorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    discipline?: string | string[];
    subs?: string;
    longTerm?: string;
  }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.user_metadata?.role !== "studio_owner") {
    redirect("/dashboard");
  }

  const city = (params.city ?? "").trim();
  const disciplines = toArray(params.discipline).filter((d): d is Specialty =>
    DISCIPLINES.some((opt) => opt.value === d),
  );
  const subsOnly = params.subs === "on";
  const longTermOnly = params.longTerm === "on";

  let query = supabase
    .from("instructors")
    .select("*, profiles!inner(full_name, avatar_url)")
    .order("created_at", { ascending: false });

  if (city) {
    query = query.ilike("city", `%${city}%`);
  }
  if (disciplines.length > 0) {
    query = query.overlaps("specialties", disciplines);
  }
  if (subsOnly) {
    query = query.eq("accepts_subs", true);
  }
  if (longTermOnly) {
    query = query.eq("accepts_long_term", true);
  }

  const { data: instructors, error } = await query;

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink">
        Browse instructors
      </h1>
      <p className="mt-2 text-sm font-light text-ink/60">
        Find instructors available for subs or long-term placements.
      </p>

      <form
        method="get"
        className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-ink">
            Location
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            defaultValue={city}
            className="mt-1 w-40 rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-ink">Discipline</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {DISCIPLINES.map((d) => (
              <label
                key={d.value}
                className="flex items-center gap-1.5 rounded-full border border-mauve/30 px-3 py-1.5 text-sm text-ink/70 has-checked:border-mauve has-checked:bg-mist has-checked:text-ink"
              >
                <input
                  type="checkbox"
                  name="discipline"
                  value={d.value}
                  defaultChecked={disciplines.includes(d.value)}
                  className="accent-mauve"
                />
                {d.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-ink">Availability</span>
          <div className="mt-1 flex flex-wrap gap-3">
            <label className="flex items-center gap-1.5 text-sm text-ink/70">
              <input
                type="checkbox"
                name="subs"
                defaultChecked={subsOnly}
                className="accent-mauve"
              />
              Last-minute subs
            </label>
            <label className="flex items-center gap-1.5 text-sm text-ink/70">
              <input
                type="checkbox"
                name="longTerm"
                defaultChecked={longTermOnly}
                className="accent-mauve"
              />
              Long-term
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-lg bg-rose/10 px-3 py-2 text-sm text-ink">
          {error.message}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {instructors?.map((instructor) => (
          <div
            key={instructor.profile_id}
            className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mist">
                {instructor.profiles?.avatar_url ? (
                  <Image
                    src={instructor.profiles.avatar_url}
                    alt={instructor.profiles.full_name}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="font-medium text-ink">
                  {instructor.profiles?.full_name}
                </p>
                <p className="text-xs text-ink/50">
                  {instructor.city || "Location not set"}
                </p>
              </div>
            </div>

            {instructor.bio && (
              <p className="mt-3 line-clamp-3 text-sm text-ink/70">
                {instructor.bio}
              </p>
            )}

            {instructor.specialties.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {instructor.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    {DISCIPLINES.find((d) => d.value === s)?.label ?? s}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-sm">
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

            <form action={startConversation} className="mt-4">
              <input
                type="hidden"
                name="instructorId"
                value={instructor.profile_id}
              />
              <button
                type="submit"
                className="w-full rounded-full border border-mauve px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
              >
                Message
              </button>
            </form>
          </div>
        ))}
      </div>

      {instructors && instructors.length === 0 && (
        <p className="mt-8 text-sm text-ink/60">
          No instructors match these filters yet.
        </p>
      )}
    </main>
  );
}
