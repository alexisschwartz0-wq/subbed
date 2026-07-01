import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-mauve/20 bg-sand">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-heading text-xl font-extrabold tracking-tight text-ink"
        >
          Subbed
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-ink/70">
          <Link
            href="/#instructors"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-mist hover:text-ink"
          >
            For Instructors
          </Link>
          <Link
            href="/#studios"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-mist hover:text-ink"
          >
            For Studios
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-mauve px-4 py-2 text-sand transition-colors hover:bg-rose"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
