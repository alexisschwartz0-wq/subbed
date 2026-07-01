import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function BrowseStudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; name?: string }>;
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

  const city = (params.city ?? "").trim();
  const name = (params.name ?? "").trim();

  let query = supabase
    .from("studios")
    .select("*, profiles!inner(full_name, avatar_url)")
    .order("created_at", { ascending: false });

  if (city) {
    query = query.ilike("city", `%${city}%`);
  }
  if (name) {
    query = query.ilike("name", `%${name}%`);
  }

  const { data: studios, error } = await query;

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <h1 className="text-2xl font-semibold text-ink">Browse studios</h1>
      <p className="mt-2 text-sm text-ink/60">
        Find studios looking for instructors to sub or hire long-term.
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
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Studio name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Search by name"
            defaultValue={name}
            className="mt-1 w-48 rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="mt-6 rounded-lg bg-rose/10 px-3 py-2 text-sm text-rose">
          {error.message}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {studios?.map((studio) => (
          <div
            key={studio.id}
            className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-sand">
                {studio.profiles?.avatar_url ? (
                  <Image
                    src={studio.profiles.avatar_url}
                    alt={studio.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="font-medium text-ink">{studio.name}</p>
                <p className="text-xs text-ink/50">
                  {[studio.city, studio.state].filter(Boolean).join(", ") ||
                    "Location not set"}
                </p>
              </div>
            </div>

            {studio.description && (
              <p className="mt-3 line-clamp-3 text-sm text-ink/70">
                {studio.description}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between text-sm">
              {studio.phone && (
                <span className="text-ink/60">{studio.phone}</span>
              )}
              {studio.website_url && (
                <a
                  href={studio.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mauve hover:text-rose"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {studios && studios.length === 0 && (
        <p className="mt-8 text-sm text-ink/60">
          No studios match these filters yet.
        </p>
      )}
    </main>
  );
}
