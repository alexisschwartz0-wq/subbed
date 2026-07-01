import Link from "next/link";
import { Navbar } from "@/components/navbar";

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
    </div>
  );
}
