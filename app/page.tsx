"use client";

import { useState } from "react";
import Link from "next/link";

// ── SKILLS DATA ──
// Each category has a name and a list of skills.
// comfortable: true = ●●○, false = ●○○
const skillGroups = [
  {
    category: "Languages",
    skills: [
      { name: "Python",     comfortable: true  },
      { name: "Java",       comfortable: true  },
      { name: "JavaScript", comfortable: true  },
      { name: "HTML/CSS",   comfortable: true  },
      { name: "TypeScript", comfortable: false },
      { name: "SQL",        comfortable: false },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React",   comfortable: false },
      { name: "Next.js", comfortable: false },
      { name: "Flask",   comfortable: false },
    ],
  },
  {
    category: "Infrastructure & Tools",
    skills: [
      { name: "Git",        comfortable: true  },
      { name: "Docker",     comfortable: false },
      { name: "Linux",      comfortable: false },
      { name: "Twilio API", comfortable: false },
      { name: "Homelab",    comfortable: false },
    ],
  },
];

// Renders the dots — ●●○ for comfortable, ●○○ for familiar
function ProficiencyDots({ comfortable }: { comfortable: boolean }) {
  return (
    <span style={{ fontSize: "10px", letterSpacing: "2px", marginLeft: "8px" }}>
      <span style={{ color: "#911111" }}>●</span>
      <span style={{ color: comfortable ? "#911111" : "#333" }}>●</span>
    </span>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText("your.email@example.com");
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

      {/* ── HERO ── */}
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
      <div style={{ height: "1px", background: "#1a1a1f", margin: "0 60px" }} />

      {/* ── SKILLS ── */}
      <section style={{ padding: "56px 60px" }}>

        <p style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#444",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>
          // technologies
        </p>

        {/* Legend */}
        <div style={{
          display: "flex",
          gap: "20px",
          marginBottom: "36px",
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#555",
        }}>
          <span><span style={{ color: "#911111" }}>●●</span> Comfortable</span>
          <span><span style={{ color: "#911111" }}>●</span>○ Familiar</span>
        </div>

        {/* Three column grid — one column per category */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
        }}>
          {skillGroups.map((group) => (
            <div key={group.category}>

              {/* Category heading */}
              <p style={{
                fontFamily: "monospace",
                fontSize: "11px",
                color: "#911111",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
                margin: "0 0 16px",
              }}>
                {group.category}
              </p>

              {/* Skills list for this category */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      border: "1px solid #1a1a1f",
                      backgroundColor: "#0a0a0f",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#c0c0c0" }}>
                      {skill.name}
                    </span>
                    <ProficiencyDots comfortable={skill.comfortable} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
