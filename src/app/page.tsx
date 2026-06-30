import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-rose">
          Orange County
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Find your sub. Fill your class.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-7 text-ink/70">
          Subbed connects yoga, Pilates, sound bath, and fitness instructors
          with studio owners across Orange County — for last-minute subs and
          long-term hiring.
        </p>
        <div
          id="instructors"
          className="mt-10 flex flex-col gap-4 text-base font-medium sm:flex-row"
        >
          <Link
            href="/signup"
            className="rounded-full bg-mauve px-6 py-3 text-sand transition-colors hover:bg-rose"
          >
            I&apos;m an Instructor
          </Link>
          <Link
            id="studios"
            href="/signup"
            className="rounded-full border border-mauve px-6 py-3 text-ink transition-colors hover:bg-mauve/10"
          >
            I&apos;m a Studio Owner
          </Link>
        </div>
      </main>
    </div>
  );
}
