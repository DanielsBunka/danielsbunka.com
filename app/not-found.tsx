// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <main style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh", /* Centers the block nicely in the viewport */
            textAlign: "center",
        }}>

            {/* Heavyweight Error Code */}
            <h1 style={{
                fontSize: "clamp(64px, 10vw, 96px)", /* Massive, imposing size */
                fontWeight: 800,
                color: "#111111",
                margin: "0 0 16px 0",
                letterSpacing: "-2px",
                lineHeight: 1,
                fontFamily: "var(--font-jetbrains), monospace"
            }}>
                404
            </h1>

            {/* Technical Spec Badge (Terminal Highlight) */}
            <div style={{
                margin: "0 auto 24px auto",
                fontSize: "11px",
                fontFamily: "var(--font-jetbrains), monospace",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#ffffff", /* Crisp white text */
                backgroundColor: "#111111", /* Solid black terminal fill */
                border: "1px solid #111111", /* Sharp boundary */
                fontWeight: 600, /* Added weight for pure readability */
                padding: "4px 12px",
                borderRadius: "4px",
                display: "inline-block",
            }}>
                ERROR // ROUTE_NOT_RESOLVED
            </div>

            {/* Terminal Output Description */}
            <p style={{
                fontSize: "14px",
                color: "#444444", /* Darkened from #666 to match the site's new charcoal baseline */
                margin: "0 auto 32px auto",
                maxWidth: "400px",
                lineHeight: 1.6,
                fontFamily: "var(--font-jetbrains), monospace"
            }}>
                The requested directory or container could not be located on this server. It may have been moved, spun down, or never existed.
            </p>

            {/* Rescue Button (Uses your exact Tag-Style CSS) */}
            <Link href="/" className="home-btn">
                Return to Home
            </Link>

        </main>
    );
}