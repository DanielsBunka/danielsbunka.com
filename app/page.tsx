"use client";

import { useState } from "react";
import Link from "next/link";

const skills = [
  "Python", "Next.js", "React", "TypeScript",
  "Git", "REST APIs", "SQL", "Docker", "Linux",
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText("daniels.bunka8@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main style={{
      backgroundColor: "#020205",
      minHeight: "100vh",
      color: "#f0f0f0",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── HERO — centred ── */}
      <section style={{
        padding: "80px 60px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>

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
          fontSize: "clamp(40px, 6vw, 64px)",
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
          Building things with <span style={{ color: "#f80606" }}>Python, Next.js</span> & a homelab that never sleeps.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
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

          <button
            onClick={handleCopyEmail}
            style={{
              backgroundColor: "transparent",
              color: copied ? "#4caf50" : "#888",
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

      {/* Divider */}
      <div style={{ height: "1px", background: "#1a1a1f" }} />

      {/* ── SKILLS MARQUEE ──
          How it works:
          - The outer div clips anything outside its bounds (overflow: hidden)
          - The inner div contains the skills list TWICE side by side
          - A CSS animation slides the inner div left continuously
          - When it's scrolled exactly one full width, it loops seamlessly
            because the second copy looks identical to the first
          The animation is defined in globals.css as @keyframes marquee */}
      <section style={{ padding: "36px 0" }}>

        <p style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#444",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "16px",
          textAlign: "center",
        }}>
          // technologies
        </p>

        {/* Outer container — clips the overflow so you only see the visible strip */}
        <div style={{ overflow: "hidden", width: "100%" }}>

          {/* Inner strip — twice as wide, slides left via CSS animation */}
          <div className="marquee-track">

            {/* Render the skills list TWICE so the loop is seamless */}
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={index}
                style={{
                  fontFamily: "monospace",
                  fontSize: "12px",
                  padding: "6px 14px",
                  borderRadius: "4px",
                  border: "1px solid #222",
                  color: "#aaa",
                  backgroundColor: "#0d0d12",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
