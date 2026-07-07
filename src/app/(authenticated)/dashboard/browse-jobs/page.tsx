import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { applyToListing, sendJobInquiry } from "../jobs/actions";

type Discipline = Database["public"]["Enums"]["job_discipline"];
type ListingType = Database["public"]["Enums"]["job_listing_type"];

const DISCIPLINES: { value: Discipline; label: string }[] = [
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
  { value: "sound_bath", label: "Sound Bath" },
  { value: "barre", label: "Barre" },
  { value: "cycle", label: "Cycle" },
  { value: "group_fitness", label: "Group Fitness" },
];

const LISTING_TYPES: { value: ListingType; label: string }[] = [
  { value: "last_minute_sub", label: "Last-Minute Sub" },
  { value: "part_time", label: "Part-Time" },
  { value: "full_time", label: "Full-Time" },
];

const TYPE_LABELS: Record<string, string> = Object.fromEntries(
  LISTING_TYPES.map((t) => [t.value, t.label]),
);
const DISCIPLINE_LABELS: Record<string, string> = Object.fromEntries(
  DISCIPLINES.map((d) => [d.value, d.label]),
);

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    discipline?: string | string[];
    type?: string | string[];
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.user_metadata?.role !== "instructor") redirect("/dashboard");

  const { data: instructor } = await supabase
    .from("instructors")
    .select("profile_id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!instructor) redirect("/onboarding/instructor");

  const location = (params.location ?? "").trim();
  const disciplines = toArray(params.discipline).filter((d): d is Discipline =>
    DISCIPLINES.some((opt) => opt.value === d),
  );
  const types = toArray(params.type).filter((t): t is ListingType =>
    LISTING_TYPES.some((opt) => opt.value === t),
  );

  let query = supabase
    .from("job_listings")
    .select("*, studios(name, city, state)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (location) {
    query = query.ilike("location", `%${location}%`);
  }
  if (disciplines.length > 0) {
    query = query.in("discipline", disciplines);
  }
  if (types.length > 0) {
    query = query.in("listing_type", types);
  }

  const { data: listings, error } = await query;

  const { data: myApplications } = await supabase
    .from("job_applications")
    .select("job_listing_id")
    .eq("instructor_id", user.id);
  const appliedIds = new Set((myApplications ?? []).map((a) => a.job_listing_id));

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink">
        Browse jobs
      </h1>
      <p className="mt-2 text-sm font-light text-ink/60">
        Find subs, part-time, and full-time roles near you.
      </p>

      <form
        method="get"
        className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-ink">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="City"
            defaultValue={location}
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
          <span className="block text-sm font-medium text-ink">Type</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {LISTING_TYPES.map((t) => (
              <label
                key={t.value}
                className="flex items-center gap-1.5 rounded-full border border-mauve/30 px-3 py-1.5 text-sm text-ink/70 has-checked:border-mauve has-checked:bg-mist has-checked:text-ink"
              >
                <input
                  type="checkbox"
                  name="type"
                  value={t.value}
                  defaultChecked={types.includes(t.value)}
                  className="accent-mauve"
                />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
        >
          Search
        </button>
      </form>

      {(error || params.error) && (
        <p className="mt-6 rounded-lg bg-rose/10 px-3 py-2 text-sm text-ink">
          {error?.message ?? params.error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => {
          const alreadyApplied = appliedIds.has(listing.id);

          return (
            <div
              key={listing.id}
              className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-extrabold text-ink">
                {listing.title}
              </h3>
              <p className="mt-1 text-sm text-ink/60">
                {listing.studios?.name}
                {listing.location ? ` · ${listing.location}` : ""}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink">
                  {DISCIPLINE_LABELS[listing.discipline] ?? listing.discipline}
                </span>
                <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink">
                  {TYPE_LABELS[listing.listing_type] ?? listing.listing_type}
                </span>
              </div>

              {listing.description && (
                <p className="mt-3 line-clamp-3 text-sm text-ink/70">
                  {listing.description}
                </p>
              )}

              {listing.pay_rate_cents != null && (
                <p className="mt-3 text-sm font-medium text-ink">
                  ${(listing.pay_rate_cents / 100).toFixed(0)}/hr
                </p>
              )}

              {alreadyApplied ? (
                <p className="mt-4 rounded-full bg-mist px-4 py-1.5 text-center text-sm font-medium text-ink/60">
                  Applied
                </p>
              ) : (
                <div className="mt-4 space-y-2">
                  <form action={applyToListing}>
                    <input type="hidden" name="jobListingId" value={listing.id} />
                    <button
                      type="submit"
                      className="w-full rounded-full bg-mauve px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rose"
                    >
                      Apply
                    </button>
                  </form>

                  <details className="group">
                    <summary className="cursor-pointer list-none rounded-full border border-mauve px-4 py-1.5 text-center text-sm font-medium text-ink transition-colors hover:bg-mist">
                      Ask a question
                    </summary>
                    <form action={sendJobInquiry} className="mt-2 space-y-2">
                      <input type="hidden" name="jobListingId" value={listing.id} />
                      <textarea
                        name="message"
                        rows={2}
                        placeholder="Ask about the schedule, pay, or anything else."
                        className="w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-full border border-mauve px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
                      >
                        Send message
                      </button>
                    </form>
                  </details>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {listings && listings.length === 0 && (
        <p className="mt-8 text-sm text-ink/60">
          No open listings match these filters yet.
        </p>
      )}
    </main>
  );
}
