// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

// ── HATS ──
// src: null = no overlay shown
// When you have real PNG files, add them to /public/overlays/hats/
// and update the src paths here
const hats = [
  { name: "None",       src: null },
  { name: "Top Hat",    src: "/overlays/hats/top-hat.png" },
  { name: "Cap",        src: "/overlays/hats/cap.png" },
  { name: "Cowboy Hat", src: "/overlays/hats/cowboy.png" },
  { name: "Santa Hat",  src: "/overlays/hats/santa.png" },
];

// ── MOUSTACHES ──
const moustaches = [
  { name: "None",       src: null },
  { name: "Handlebar",  src: "/overlays/moustaches/handlebar.png" },
  { name: "Pencil",     src: "/overlays/moustaches/pencil.png" },
  { name: "Walrus",     src: "/overlays/moustaches/walrus.png" },
  { name: "Curly",      src: "/overlays/moustaches/curly.png" },
];

// ── SKILLS ──
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
    category: "Frameworks",
    skills: [
      { name: "React",   comfortable: false },
      { name: "Next.js", comfortable: false },
      { name: "Flask",   comfortable: false },
    ],
  },
  {
    category: "Infrastructure",
    skills: [
      { name: "Git",        comfortable: true  },
      { name: "Docker",     comfortable: false },
      { name: "Linux",      comfortable: false },
      { name: "Homelab",    comfortable: false },
    ],
  },
];

function ProficiencyDots({ comfortable }: { comfortable: boolean }) {
  return (
    <span style={{ fontSize: "9px", letterSpacing: "2px", marginLeft: "6px" }}>
      <span style={{ color: "#911111" }}>●</span>
      <span style={{ color: comfortable ? "#911111" : "#2a2a2f" }}>●</span>
    </span>
  );
}

// Cycles an index forward or backward through an array, wrapping around
function cycle(current: number, direction: 1 | -1, length: number) {
  return (current + direction + length) % length;
}

export default function Home() {
  const [hatIndex,        setHatIndex]        = useState(0);
  const [moustacheIndex,  setMoustacheIndex]  = useState(0);

  const currentHat       = hats[hatIndex];
  const currentMoustache = moustaches[moustacheIndex];

  return (
    <main style={{
      backgroundColor: "#020205",
      minHeight: "100vh",
      color: "#f0f0f0",
      fontFamily: "sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      boxSizing: "border-box",
    }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "32px",
        width: "100%",
        maxWidth: "1100px",
        alignItems: "start",
      }}>

        {/* ── LEFT CARD ── */}
        <div style={{
          backgroundColor: "#0a0a0f",
          border: "1px solid #1a1a1f",
          borderRadius: "12px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}>

          {/* Photo + overlays */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

            {/* Circle photo container — overlays are positioned relative to this */}
            <div style={{
              position: "relative",
              width: "180px",
              height: "180px",
            }}>

              {/* Red glow behind the circle */}
              <div style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(145,17,17,0.4) 0%, transparent 70%)",
                zIndex: 0,
              }} />

              {/* Your photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.jpg"
                alt="Daniels Bunka"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  border: "2px solid #1a1a1f",
                  position: "relative",
                  zIndex: 1,
                  display: "block",
                }}
              />

              {/* Hat overlay — sits above the photo, anchored to top of circle
                  Adjust top/width values once you have real PNG files */}
              {currentHat.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentHat.src}
                  alt={currentHat.name}
                  style={{
                    position: "absolute",
                    top: "-55px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "160px",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Moustache overlay — sits over the mouth area
                  Adjust top value once you have real PNG files */}
              {currentMoustache.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentMoustache.src}
                  alt={currentMoustache.name}
                  style={{
                    position: "absolute",
                    top: "108px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100px",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>

            {/* Hat selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => setHatIndex(i => cycle(i, -1, hats.length))}
                style={arrowStyle}
              >‹</button>
              <span style={labelStyle}>🎩 {currentHat.name}</span>
              <button
                onClick={() => setHatIndex(i => cycle(i, 1, hats.length))}
                style={arrowStyle}
              >›</button>
            </div>

            {/* Moustache selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => setMoustacheIndex(i => cycle(i, -1, moustaches.length))}
                style={arrowStyle}
              >‹</button>
              <span style={labelStyle}>🥸 {currentMoustache.name}</span>
              <button
                onClick={() => setMoustacheIndex(i => cycle(i, 1, moustaches.length))}
                style={arrowStyle}
              >›</button>
            </div>

            {/* Name + title */}
            <div style={{ textAlign: "center" }}>
              <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 600, color: "#f8f8f8" }}>
                Daniels Bunka
              </h1>
              <p style={{ margin: 0, fontSize: "13px", color: "#555", fontFamily: "monospace" }}>
                Next.js & AI Developer
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#1a1a1f" }} />

          {/* Skills */}
          <div>
            <p style={{
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#911111",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              margin: "0 0 16px",
            }}>
              // skills
            </p>

            {/* Legend */}
            <div style={{
              display: "flex",
              gap: "16px",
              marginBottom: "16px",
              fontFamily: "monospace",
              fontSize: "10px",
              color: "#444",
            }}>
              <span><span style={{ color: "#911111" }}>●●</span> Comfortable</span>
              <span><span style={{ color: "#911111" }}>●</span><span style={{ color: "#2a2a2f" }}>●</span> Familiar</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <p style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: "#444",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: "0 0 10px",
                  }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          border: "1px solid #141418",
                          backgroundColor: "#0d0d12",
                        }}
                      >
                        <span style={{ fontSize: "12px", color: "#aaa" }}>{skill.name}</span>
                        <ProficiencyDots comfortable={skill.comfortable} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Chat placeholder */}
          <div className="speech-bubble" style={{
            backgroundColor: "#0a0a0f",
            border: "1px solid #1a1a1f",
            borderRadius: "12px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            <p style={{
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#911111",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}>
              // why employ me?
            </p>

            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#f8f8f8" }}>
              Ask the bot
            </h2>

            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              AI recruiter bot coming soon — ask it anything about my skills, projects, or experience.
            </p>

            {/* Placeholder chat input */}
            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "8px",
            }}>
              <input
                type="text"
                placeholder="Why should we hire Daniels?"
                disabled
                style={{
                  flex: 1,
                  backgroundColor: "#020205",
                  border: "1px solid #1a1a1f",
                  borderRadius: "6px",
                  padding: "10px 14px",
                  color: "#444",
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  cursor: "not-allowed",
                }}
              />
              <button
                disabled
                style={{
                  backgroundColor: "#1a0508",
                  border: "1px solid #3a0a0a",
                  color: "#911111",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "not-allowed",
                  fontSize: "14px",
                }}
              >
                Ask
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px" }}>
            <Link
              href="/projects"
              style={{
                flex: 1,
                backgroundColor: "#911111",
                color: "#fff",
                padding: "16px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "center",
                display: "block",
              }}
            >
              See Projects
            </Link>

            {/* CV download — swap href for your real CV path when ready */}
            <a
              href="/cv.pdf"
              download
              style={{
                flex: 1,
                backgroundColor: "transparent",
                color: "#888",
                border: "1px solid #333",
                padding: "16px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "center",
                display: "block",
              }}
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

// Shared styles pulled out to avoid repetition
const arrowStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "1px solid #1a1a1f",
  color: "#555",
  width: "28px",
  height: "28px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "12px",
  color: "#555",
  width: "110px",
  textAlign: "center",
};
