import { createJobListing } from "../actions";

const DISCIPLINES: { value: string; label: string }[] = [
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
  { value: "sound_bath", label: "Sound Bath" },
  { value: "barre", label: "Barre" },
  { value: "cycle", label: "Cycle" },
  { value: "group_fitness", label: "Group Fitness" },
];

const LISTING_TYPES: { value: string; label: string }[] = [
  { value: "last_minute_sub", label: "Last-Minute Sub" },
  { value: "part_time", label: "Part-Time" },
  { value: "full_time", label: "Full-Time" },
];

export default async function NewJobListingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex flex-1 flex-col items-center bg-sand px-6 py-16">
      <div className="w-full max-w-xl">
        <h1 className="font-heading text-2xl font-extrabold text-ink">
          Post a job
        </h1>
        <p className="mt-2 text-sm font-light text-ink/60">
          Instructors will see this in their listings feed.
        </p>

        {params.error && (
          <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-ink">
            {params.error}
          </p>
        )}

        <form
          action={createJobListing}
          className="mt-6 space-y-6 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-ink">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Tuesday 6am Vinyasa sub"
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="discipline" className="block text-sm font-medium text-ink">
                Discipline
              </label>
              <select
                id="discipline"
                name="discipline"
                required
                className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
              >
                {DISCIPLINES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="listingType" className="block text-sm font-medium text-ink">
                Type
              </label>
              <select
                id="listingType"
                name="listingType"
                required
                className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
              >
                {LISTING_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="neededAt" className="block text-sm font-medium text-ink">
                Date/time needed
              </label>
              <input
                id="neededAt"
                name="neededAt"
                type="datetime-local"
                className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
              />
              <p className="mt-1 text-xs font-light text-ink/50">
                Optional — leave blank for ongoing roles.
              </p>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-ink">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Irvine, CA"
                className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="payRate" className="block text-sm font-medium text-ink">
              Pay rate ($/hr)
            </label>
            <input
              id="payRate"
              name="payRate"
              type="number"
              min={0}
              step={1}
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Tell instructors about the class, the space, and what you're looking for."
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-ink">
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows={3}
              placeholder="Certifications, experience level, anything else required."
              className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
          >
            Post listing
          </button>
        </form>
      </div>
    </main>
  );
}
