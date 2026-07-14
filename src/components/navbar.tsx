import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-mauve/20 bg-sand">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-heading text-lg font-extrabold tracking-tight text-ink sm:text-xl"
        >
          Subbed
        </Link>
        <nav className="flex items-center gap-1 text-xs font-medium text-ink/70 sm:gap-6 sm:text-sm">
          <Link
            href="/about"
            className="rounded-full px-2 py-1.5 transition-colors hover:bg-mist hover:text-ink sm:px-3"
          >
            About
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-mauve px-3 py-1.5 text-white transition-colors hover:bg-rose sm:px-4 sm:py-2"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
