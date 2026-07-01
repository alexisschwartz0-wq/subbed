import Link from "next/link";
import { Navbar } from "@/components/navbar";

const DISCIPLINES = ["Yoga", "Pilates", "Sound Baths", "Group Fitness", "Barre", "Cycle"];

const STEPS = [
  {
    title: "Create your profile",
    description:
      "Instructors list their disciplines, certifications, and availability. Studios list their space and what they're looking for.",
  },
  {
    title: "Search & connect",
    description:
      "Browse instructor or studio listings by location, discipline, and availability — no cold outreach required.",
  },
  {
    title: "Message & book",
    description:
      "Chat directly in Subbed to lock in the sub, part-time, or full-time role. No phone tag, no email chains.",
  },
];

const HIRING_TYPES = [
  {
    title: "Last-Minute Sub",
    description:
      "Class starts in an hour and your instructor's out sick? Message nearby instructors directly and fill the spot fast.",
  },
  {
    title: "Part-Time",
    description:
      "Bring on a regular sub for recurring shifts without a long-term commitment.",
  },
  {
    title: "Full-Time",
    description:
      "Ready to grow your team? Find instructors looking for a long-term home at your studio.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 rounded-full bg-mist px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-rose">
          Orange County
        </p>
        <h1 className="max-w-2xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Find your sub. Fill your class.
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-7 text-ink/70">
          Subbed connects yoga, Pilates, sound bath, and fitness instructors
          with studio owners across Orange County — for last-minute subs and
          long-term hiring.
        </p>
        <div
          id="instructors"
          className="mt-10 flex flex-col gap-4 text-base font-medium sm:flex-row"
        >
          <Link
            href="/signup?role=instructor"
            className="rounded-full bg-mauve px-6 py-3 text-sand transition-colors hover:bg-rose"
          >
            I&apos;m an Instructor
          </Link>
          <Link
            id="studios"
            href="/signup?role=studio_owner"
            className="rounded-full border border-mauve px-6 py-3 text-ink transition-colors hover:bg-mist"
          >
            I&apos;m a Studio Owner
          </Link>
        </div>
      </main>

      <section id="disciplines" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-extrabold text-ink">
            Every discipline, one platform.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-light text-ink/70">
            Whatever you teach, studios across Orange County are looking for
            someone just like you.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {DISCIPLINES.map((discipline) => (
              <div
                key={discipline}
                className="rounded-2xl border border-mauve/20 bg-white px-6 py-8 text-center shadow-sm"
              >
                <p className="font-heading text-lg font-extrabold text-ink">
                  {discipline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-3xl font-extrabold text-ink">
            How Subbed works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-light text-ink/70">
            Three steps from empty slot to filled class.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title}>
                <span className="font-heading text-4xl font-extrabold text-mauve">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-heading text-lg font-extrabold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-light text-ink/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col justify-center gap-4 text-base font-medium sm:flex-row">
            <Link
              href="/signup?role=instructor"
              className="rounded-full bg-mauve px-6 py-3 text-sand transition-colors hover:bg-rose"
            >
              I&apos;m an Instructor
            </Link>
            <Link
              href="/signup?role=studio_owner"
              className="rounded-full border border-mauve px-6 py-3 text-ink transition-colors hover:bg-mist"
            >
              I&apos;m a Studio Owner
            </Link>
          </div>
        </div>
      </section>

      <section id="hiring-types" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-extrabold text-ink">
            Hire the way that works for you
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-light text-ink/70">
            From a single-class emergency to building out your roster.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {HIRING_TYPES.map((type) => (
              <div
                key={type.title}
                className="rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm"
              >
                <h3 className="font-heading text-xl font-extrabold text-ink">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm font-light text-ink/70">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="messaging" className="bg-mist px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-3xl font-extrabold text-ink">
              Message directly, no middleman
            </h2>
            <p className="mt-3 font-light text-ink/70">
              Once you find the right fit, chat right in Subbed to nail down
              the details — no phone tag, no email chains, no third-party
              scheduling app.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 text-base font-medium sm:flex-row sm:justify-start">
              <Link
                href="/signup?role=instructor"
                className="rounded-full bg-mauve px-6 py-3 text-sand transition-colors hover:bg-rose"
              >
                I&apos;m an Instructor
              </Link>
              <Link
                href="/signup?role=studio_owner"
                className="rounded-full border border-mauve px-6 py-3 text-ink transition-colors hover:bg-white"
              >
                I&apos;m a Studio Owner
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="max-w-[80%] self-start rounded-2xl bg-mist px-4 py-2 text-left text-sm text-ink">
                Hi! Do you have availability to sub Tuesday&apos;s 6am
                vinyasa?
              </div>
              <div className="max-w-[80%] self-end rounded-2xl bg-mauve px-4 py-2 text-left text-sm text-sand">
                Yes, I&apos;m free! I can be there.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-ink">
          Ready to fill your next class?
        </h2>
        <p className="mx-auto mt-3 max-w-xl font-light text-ink/70">
          Join instructors and studio owners across Orange County using
          Subbed today.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 text-base font-medium sm:flex-row">
          <Link
            href="/signup?role=instructor"
            className="rounded-full bg-mauve px-6 py-3 text-sand transition-colors hover:bg-rose"
          >
            I&apos;m an Instructor
          </Link>
          <Link
            href="/signup?role=studio_owner"
            className="rounded-full border border-mauve px-6 py-3 text-ink transition-colors hover:bg-mist"
          >
            I&apos;m a Studio Owner
          </Link>
        </div>
        <p className="mt-6 text-sm font-light text-ink/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-mauve hover:text-rose">
            Sign in
          </Link>
        </p>
      </section>
    </div>
  );
}
