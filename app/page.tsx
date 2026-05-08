"use client"; // Needed whenever you use useState or any browser interactivity

import { useState } from "react"; // useState is how React remembers things on screen
import Link from "next/link";

// ============================================================
// REACT CONCEPT 1: Arrays + .map()
// Instead of writing out each skill tag by hand, we store
// them in an array and let React render them automatically.
// If you add a new skill here, it appears on screen instantly.
// ============================================================
const skills = [
  { name: "Python",     featured: true  },
  { name: "Next.js",    featured: true  },
  { name: "React",      featured: false },
  { name: "TypeScript", featured: false },
  { name: "Linux",      featured: false },
  { name: "Git",        featured: false },
  { name: "Homelab",    featured: false },
  { name: "REST APIs",  featured: false },
  { name: "SQL",        featured: false },
];

export default function Home() {

  // ============================================================
  // REACT CONCEPT 2: useState
  // useState(false) creates a variable + a function to change it.
  // When 'copied' changes, React automatically re-renders the button.
  //   copied       = the current value (true or false)
  //   setCopied    = the function you call to change it
  // Rule: NEVER do `copied = true`. Always use setCopied(true).
  // ============================================================
  const [copied, setCopied] = useState(false);

  // This runs when the user clicks "Copy email"
  function handleCopyEmail() {
    navigator.clipboard.writeText("your.email@example.com"); // change this!
    setCopied(true); // React sees this, re-renders, button now says "Copied!"
    setTimeout(() => setCopied(false), 2000); // 2 seconds later, reset it
  }

  return (
    <main style={{
      backgroundColor: "#020205",
      minHeight: "100vh",
      color: "#f0f0f0",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section style={{ padding: "80px 60px 48px" }}>

        <p style={{
          fontFamily: "monospace",
          fontSize: "13px",
          color: "#911111",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          // cs student · ljmu
        </p>

        <h1 style={{
          fontSize: "clamp(40px, 6vw, 64px)", // responsive: shrinks on small screens
          fontWeight: 600,
          lineHeight: 1.1,
          margin: "0 0 16px",
          color: "#f8f8f8",
        }}>
          Daniels Bunka
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#888",
          maxWidth: "500px",
          marginBottom: "36px",
        }}>
          Building things with <span style={{ color: "#c0c0c0" }}>Python, Next.js</span> & a homelab that never sleeps.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/projects" style={{
            backgroundColor: "#911111",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 500,
          }}>
            See my projects
          </Link>

          {/* ============================================================
              REACT CONCEPT 3: onClick + conditional rendering
              onClick={handleCopyEmail} wires the function to the button.
              The ? : is a ternary — it's just an if/else inside JSX.
              When copied is true, show "Copied!". Otherwise show "Copy email".
              ============================================================ */}
          <button
            onClick={handleCopyEmail}
            style={{
              backgroundColor: "transparent",
              color: copied ? "#4caf50" : "#888", // green when copied
              border: `1px solid ${copied ? "#4caf50" : "#333"}`,
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {copied ? "✓ Copied!" : "Copy email"}
          </button>
        </div>
      </section>

      {/* Divider line */}
      <div style={{ height: "1px", background: "#1a1a1f", margin: "0 60px" }} />

      {/* ── SKILLS STRIP ─────────────────────────────────────── */}
      <section style={{ padding: "36px 60px" }}>

        <p style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#444",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          // technologies
        </p>

        {/* ============================================================
            REACT CONCEPT 4: .map() in JSX
            skills.map(...) loops over every item in the array and
            returns a piece of JSX for each one. React renders them all.
            The 'key' prop is required — it helps React track which item
            is which. Use something unique, like the name.
            ============================================================ */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {skills.map((skill) => (
            <span
              key={skill.name}
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                padding: "6px 14px",
                borderRadius: "4px",
                border: `1px solid ${skill.featured ? "#3a0a0a" : "#222"}`,
                color: skill.featured ? "#c44" : "#aaa",
                backgroundColor: skill.featured ? "#110508" : "#0d0d12",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

    </main>
  );
}
