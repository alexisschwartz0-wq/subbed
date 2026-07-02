import Link from "next/link";
import { Navbar } from "@/components/navbar";

const DISCIPLINES = ["Yoga", "Pilates", "Sound Baths", "Group Fitness", "Barre", "Cycle"];

const STATS = [
  {
    value: "40%",
    label: "of wellness studios scramble to fill classes every single week",
  },
  {
    value: "2 hrs",
    label: "average time lost finding a sub through texts and DMs",
  },
  {
    value: "500+",
    label: "yoga, Pilates, and fitness studios in Orange County alone",
  },
];

const STUDIO_BENEFITS = [
  "Find qualified subs instantly",
  "Browse profiles, certifications, and reviews",
  "Post permanent and part-time positions",
  "Build a reliable roster",
  "One platform for subs and full hires",
];

const INSTRUCTOR_BENEFITS = [
  "Get discovered by studios near you",
  "Showcase all your modalities",
  "Set availability, styles, and rates",
  "Pick up sub opportunities",
  "Land part-time or full-time roles",
];

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
    tagline: "Fill it today",
    description:
      "Class starts in an hour and your instructor's out sick? Message nearby instructors directly and fill the spot fast.",
    borderClass: "border-mauve",
  },
  {
    title: "Part-Time Role",
    tagline: "Build your roster",
    description:
      "Bring on a regular sub for recurring shifts without a long-term commitment.",
    borderClass: "border-rose",
  },
  {
    title: "Full-Time Hire",
    tagline: "Grow your team",
    description:
      "Ready to grow your team? Find instructors looking for a long-term home at your studio.",
    borderClass: "border-ink",
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
        <h1 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
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
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Every discipline, one platform.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-light text-ink/70">
            Whatever you teach, studios across Orange County are looking for
            someone just like you.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
            {DISCIPLINES.map((discipline) => (
              <div
                key={discipline}
                className="rounded-2xl border border-mauve/20 bg-white px-2 py-5 text-center shadow-sm sm:px-6 sm:py-8"
              >
                <p className="font-heading text-[10px] leading-tight font-extrabold whitespace-nowrap text-ink sm:text-lg sm:whitespace-normal">
                  {discipline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-2xl font-extrabold text-sand sm:text-3xl">
            Built for both sides of the studio
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
            <div className="rounded-2xl bg-mauve p-6 sm:p-8">
              <h3 className="font-heading text-lg font-extrabold text-sand sm:text-xl">
                Studio Owners
              </h3>
              <ul className="mt-4 space-y-2 text-sm font-light text-sand/90">
                {STUDIO_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sand/30 p-6 sm:p-8">
              <h3 className="font-heading text-lg font-extrabold text-sand sm:text-xl">
                Instructors
              </h3>
              <ul className="mt-4 space-y-2 text-sm font-light text-sand/90">
                {INSTRUCTOR_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mauve px-6 py-16 text-center text-sand">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-4xl font-extrabold sm:text-5xl">{stat.value}</p>
              <p className="mx-auto mt-3 max-w-[220px] text-sm font-light text-sand/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
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
        </div>
      </section>

      <section id="hiring-types" className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Hire the way that works for you
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-light text-ink/70">
            From a single-class emergency to building out your roster.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {HIRING_TYPES.map((type) => (
              <div
                key={type.title}
                className={`rounded-2xl border-l-4 bg-white p-8 shadow-sm ${type.borderClass}`}
              >
                <h3 className="font-heading text-lg font-extrabold text-ink sm:text-xl">
                  {type.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-mauve">
                  {type.tagline}
                </p>
                <p className="mt-3 text-sm font-light text-ink/70">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="messaging" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">
              Message directly, no middleman
            </h2>
            <p className="mt-3 font-light text-ink/70">
              Once you find the right fit, chat right in Subbed to nail down
              the details — no phone tag, no email chains, no third-party
              scheduling app.
            </p>
          </div>
          <div className="rounded-2xl border border-mauve/20 bg-mist p-6 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="max-w-[80%] self-start rounded-2xl bg-white px-4 py-2 text-left text-sm text-ink">
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

      <section className="bg-ink px-6 py-24 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-sand sm:text-5xl">
          Be first in OC.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-light text-sand/70">
          Join instructors and studio owners across Orange County using
          Subbed today.
        </p>
        <p className="mt-8 text-sm font-light text-sand/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-rose hover:text-sand">
            Sign in
          </Link>
        </p>
      </section>

      <footer className="border-t border-sand/10 bg-mauve px-6 py-10 text-center">
        <p className="font-heading text-lg font-extrabold">
          <span className="text-sand">Sub</span>
          <span className="text-sand/70">bed</span>
        </p>
        <p className="mt-2 text-xs font-light text-sand/70">
          © 2026 Subbed. Orange County, CA.
        </p>
      </footer>
    </div>
  );
}
