import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-mauve px-6 py-10 text-center">
      <p className="font-heading text-lg font-extrabold">
        <span className="text-sand">Sub</span>
        <span className="text-sand/70">bed</span>
      </p>
      <nav className="mt-4 flex justify-center gap-4 text-xs font-medium text-sand/80">
        <Link href="/terms" className="hover:text-sand">
          Terms of Service
        </Link>
        <Link href="/privacy" className="hover:text-sand">
          Privacy Policy
        </Link>
      </nav>
      <p className="mt-3 text-xs font-light text-sand/70">
        © 2026 Subbed.
      </p>
    </footer>
  );
}
