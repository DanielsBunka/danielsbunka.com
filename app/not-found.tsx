// app/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  alternates: { canonical: null },
  robots: { index: false, follow: false },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
    return (
        <main className="page-container">
            <h1 className="error-title">404</h1>
            <div className="terminal-badge badge-error error-badge-spacing">
                ERROR // ROUTE_NOT_RESOLVED
            </div>
            <p className="error-desc">
                The requested directory or container could not be located on this server. It may have been moved, spun down, or never existed.
            </p>
            <Link href="/" className="home-btn">
                Return to Home
            </Link>
        </main>
    );
}
