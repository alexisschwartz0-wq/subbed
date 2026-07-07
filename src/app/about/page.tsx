import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const VALUES = [
  {
    title: "Real connection",
    description:
      "Studios and instructors in the same community, finally able to find each other with ease.",
  },
  {
    title: "Instant and easy",
    description:
      "Post a class, get matched, confirm — the whole process in minutes, not hours.",
  },
  {
    title: "Built with care",
    description:
      "Created by people who live and breathe this industry and genuinely want it to thrive.",
  },
];

const FOUNDERS = [
  {
    initials: "ES",
    name: "Erica Schwartz",
    title: "Co-Founder · Studio Owner & Fitness Instructor, 30+ years",
    bio: "Erica has spent over three decades in the fitness and wellness industry as both an instructor and studio owner in Orange County. She knows the rhythms, the relationships, and the heart of keeping a studio running beautifully. Subbed is built on everything she's learned — and every connection she's made along the way.",
  },
  {
    initials: "LS",
    name: "Lexi Schwartz",
    title: "Co-Founder · Studio Owner, HR & Tech Startup Background",
    bio: "Lexi brings a background in HR, recruiting, and tech startups to a problem she knows personally as a studio owner in OC. She's spent her career connecting the right people to the right opportunities — and Subbed is that same instinct applied to the world she grew up in. She built the product. Her mom made sure it was built right.",
  },
];

const STATS = [
  { value: "500+", label: "yoga, Pilates and fitness studios ready to connect" },
  { value: "30+", label: "years of combined industry experience behind Subbed" },
  { value: "1", label: "platform, starting here and built for everywhere" },
];

export default function About() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />

      <main className="flex flex-1 flex-col items-center px-6 py-24 text-center">
        <p className="mb-4 rounded-full bg-mist px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-rose">
          Our story
        </p>
        <h1 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          The right instructor. Right when you need them.
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light leading-7 text-ink/70">
          Subbed was built on a simple belief — that connecting studios with
          great instructors should be easy, immediate, and human. We built
          the platform we always wished existed.
        </p>
      </main>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Where it started
          </h2>
          <div className="mt-6 space-y-4 font-light leading-7 text-ink/70">
            <p>
              We&apos;ve spent decades in the Orange County wellness
              community — teaching classes, running studios, and building
              relationships with the incredible instructors who make this
              industry what it is. Over all those years, one thing was
              always harder than it needed to be: finding the right person
              to teach a class when life got in the way.
            </p>
            <p>
              Not because the right instructors weren&apos;t out there —
              they were. The problem was simply that there was no easy way
              to find them. Studios and instructors were living in
              different corners of the same community, with no simple
              bridge between them.
            </p>
            <p>
              Subbed is that bridge. A place where studios can find
              qualified, vetted instructors in minutes, and where
              instructors can be discovered by the studios that need them
              most.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            What we believe
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="font-heading text-lg font-extrabold text-ink sm:text-xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-6 text-ink/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-center">
        <p className="mx-auto max-w-2xl font-heading text-xl leading-snug font-extrabold text-sand italic sm:text-3xl">
          &ldquo;To make it effortless for wellness studios and instructors
          to find each other — for the class that starts in an hour, and
          the career that lasts a lifetime.&rdquo;
        </p>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Meet the founders
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist font-heading text-lg font-extrabold text-mauve">
                  {founder.initials}
                </div>
                <h3 className="mt-4 font-heading text-lg font-extrabold text-ink sm:text-xl">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-mauve">
                  {founder.title}
                </p>
                <p className="mt-3 text-sm font-light leading-6 text-ink/70">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Why Orange County first
          </h2>
          <div className="mt-6 space-y-4 font-light leading-7 text-ink/70">
            <p>
              We&apos;re starting in Orange County — deliberately. It&apos;s
              our home, our community, and our backyard. We know the
              studios, we know the instructors, and we know the culture.
              Starting here means we can do it right, with the care and
              attention every early member deserves.
            </p>
            <p>
              But this is just the beginning. Every city has studios and
              instructors who deserve a better way to find each other —
              Orange County is where Subbed starts, not where it stops.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mauve px-6 py-16 text-center text-sand">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-4xl font-extrabold sm:text-5xl">
                {stat.value}
              </p>
              <p className="mx-auto mt-3 max-w-[220px] text-sm font-light text-sand/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-sand sm:text-5xl">
          Ready to be part of it?
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-light text-sand/70">
          Whether you&apos;re a studio owner looking for great instructors
          or a teacher ready to be discovered — Subbed was built for you.
        </p>
        <div className="mt-8 flex justify-center text-base font-medium">
          <Link
            href="/signup"
            className="rounded-full bg-mauve px-6 py-3 text-sand transition-colors hover:bg-rose"
          >
            Join Subbed today →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
