import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateJobListingStatus } from "./actions";

const DISCIPLINE_LABELS: Record<string, string> = {
  yoga: "Yoga",
  pilates: "Pilates",
  sound_bath: "Sound Bath",
  barre: "Barre",
  cycle: "Cycle",
  group_fitness: "Group Fitness",
};

const TYPE_LABELS: Record<string, string> = {
  last_minute_sub: "Last-Minute Sub",
  part_time: "Part-Time",
  full_time: "Full-Time",
};

export default async function MyJobListingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.user_metadata?.role !== "studio_owner") redirect("/dashboard");

  const { data: studio } = await supabase
    .from("studios")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!studio) redirect("/onboarding/studio");

  const { data: listings } = await supabase
    .from("job_listings")
    .select("*, job_applications(id)")
    .eq("studio_id", studio!.id)
    .order("created_at", { ascending: false });

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-ink">
            My job listings
          </h1>
          <p className="mt-2 text-sm font-light text-ink/60">
            Post openings and see who&apos;s interested.
          </p>
        </div>
        <Link
          href="/dashboard/jobs/new"
          className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
        >
          Post a job
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => (
          <div
            key={listing.id}
            className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-lg font-extrabold text-ink">
                {listing.title}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  listing.status === "active"
                    ? "bg-mist text-ink"
                    : "bg-ink/10 text-ink/60"
                }`}
              >
                {listing.status === "active"
                  ? "Active"
                  : listing.status === "filled"
                    ? "Filled"
                    : "Closed"}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink/60">
              {DISCIPLINE_LABELS[listing.discipline]} ·{" "}
              {TYPE_LABELS[listing.listing_type]}
            </p>
            {listing.location && (
              <p className="mt-1 text-sm text-ink/60">{listing.location}</p>
            )}
            {listing.pay_rate_cents != null && (
              <p className="mt-1 text-sm font-medium text-ink">
                ${(listing.pay_rate_cents / 100).toFixed(0)}/hr
              </p>
            )}

            <Link
              href={`/dashboard/jobs/${listing.id}`}
              className="mt-4 block w-full rounded-full border border-mauve px-4 py-1.5 text-center text-sm font-medium text-ink transition-colors hover:bg-mist"
            >
              {listing.job_applications.length} applicant
              {listing.job_applications.length === 1 ? "" : "s"}
            </Link>

            {listing.status === "active" && (
              <div className="mt-3 flex gap-2">
                <form action={updateJobListingStatus} className="flex-1">
                  <input type="hidden" name="jobListingId" value={listing.id} />
                  <input type="hidden" name="status" value="filled" />
                  <button
                    type="submit"
                    className="w-full rounded-full px-3 py-1.5 text-xs font-medium text-ink/60 transition-colors hover:bg-mist"
                  >
                    Mark filled
                  </button>
                </form>
                <form action={updateJobListingStatus} className="flex-1">
                  <input type="hidden" name="jobListingId" value={listing.id} />
                  <input type="hidden" name="status" value="closed" />
                  <button
                    type="submit"
                    className="w-full rounded-full px-3 py-1.5 text-xs font-medium text-ink/60 transition-colors hover:bg-mist"
                  >
                    Close
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {listings && listings.length === 0 && (
        <p className="mt-8 text-sm text-ink/60">
          You haven&apos;t posted any listings yet.
        </p>
      )}
    </main>
  );
}
