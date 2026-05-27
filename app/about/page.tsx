// app/about/page.tsx
"use client";

import { useState } from "react";

const timelineEvents = [
  {
    year: "2006",
    title: "Born in Kuldīga, Latvia",
    description: "Born on January 26th in Kuldīga, a small city in western Latvia.",
  },
  {
    year: "2009",
    title: "Moved to Southport, UK",
    description: "Moved to Southport, Merseyside at age 3.",
  },
  {
    year: "2017",
    title: "Started High School",
    description: "Started secondary school and chose Computer Science as a subject. Learned Python here — wrote my first lines of code and got hooked immediately.",
  },
  {
    year: "2022–2024",
    title: "KGV College, Southport",
    description: "Completed A-Levels at King George V College, Southport. Studied Visual Basic during this time.",
  },
  {
    year: "Sept 2025",
    title: "Started BSc Computer Science at LJMU",
    description: "Began my degree at Liverpool John Moores University. Currently learning Java as part of the course.",
  },
  {
    year: "Feb 2026",
    title: "Roast My Face & SMS Assistant",
    description: "Completed two personal GitHub projects during first year at LJMU — an AI webcam roasting app and a homelab-hosted SMS assistant with live train times and stock lookups.",
  },
  {
    year: "May 2026",
    title: "Merseyside Hackathon — 4th Place",
    description: "Competed in the BCS Merseyside Hackathon at LJMU. My team placed 4th, building an AI-powered feedback platform to encourage public transport usage.",
  },
  {
    year: "May 2026",
    title: "Completed First Year at LJMU",
    description: "Finished my first year of Computer Science.",
  },
];

function PhotoPlaceholder({ caption, style }: { caption: string; style: React.CSSProperties }) {
  return (
    <div style={{
      backgroundColor: "#0a0a0f",
      border: "1px dashed #2a2a2f",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      ...style,
    }}>
      <span style={{ fontSize: "24px", opacity: 0.3 }}>📷</span>
      <span style={{
        fontFamily: "monospace",
        fontSize: "11px",
        color: "#444",
        textAlign: "center",
        padding: "0 12px",
      }}>
        {caption}
      </span>
    </div>
  );
}

export default function AboutPage() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  function handleEventClick(index: number) {
    setActiveEvent(activeEvent === index ? null : index);
  }

  return (
    <main style={{
      backgroundColor: "#020205",
      minHeight: "100vh",
      color: "#f0f0f0",
      fontFamily: "sans-serif",
    }}>

      {/* ── BIO SECTION ── */}
      <section style={{ padding: "80px 60px 64px", borderBottom: "1px solid #1a1a1f" }}>
        <p style={{
          fontFamily: "monospace",
          fontSize: "13px",
          color: "#911111",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}>
          // about me
        </p>

        <h1 style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 600,
          margin: "0 0 32px",
          color: "#f8f8f8",
        }}>
          Daniels Bunka
        </h1>

        {/* Two column layout — bio left, photos right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "stretch",
          maxWidth: "1000px",
        }}>

          {/* Left — bio text */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "17px", color: "#888", lineHeight: 1.8, marginBottom: "20px" }}>
                I&apos;m a Computer Science student at LJMU, originally from Kuldīga, Latvia —
                moved to Southport when I was three and have been here since.
                I got into programming in high school, starting with Python, and haven&apos;t really stopped since.
              </p>

              <p style={{ fontSize: "17px", color: "#888", lineHeight: 1.8, marginBottom: "20px" }}>
                I&apos;m drawn to CS because of the logic and problem solving side of it — the same reason
                I&apos;m into debating and politics. I want to go into software engineering after graduating.
              </p>

              <p style={{ fontSize: "17px", color: "#888", lineHeight: 1.8 }}>
                Outside of code I follow Counter-Strike esports closely — I&apos;ve been to London twice
                to watch live tournaments. I&apos;m also into boxing; I watched Usyk vs Dubois and both
                Fabio Wardley fights live. I run a homelab at home that hosts my personal projects.
              </p>
            </div>
          </div>

          {/* Right — photo grid, stretches to match left column height */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "12px",
            minHeight: "320px",
          }}>
            {/* Portrait — spans both rows */}
            <PhotoPlaceholder
              caption="Photo of me"
              style={{
                gridColumn: "1",
                gridRow: "1 / 3",
                height: "100%",
              }}
            />

            {/* Top right */}
            <PhotoPlaceholder
              caption="CS tournament, London"
              style={{
                gridColumn: "2",
                gridRow: "1",
              }}
            />

            {/* Bottom right */}
            <PhotoPlaceholder
              caption="Merseyside Hackathon"
              style={{
                gridColumn: "2",
                gridRow: "2",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── TIMELINE SECTION ── */}
      <section style={{ padding: "64px 60px" }}>
        <p style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#444",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>
          // timeline
        </p>

        <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f8f8f8", margin: "0 0 8px" }}>
          How I got here
        </h2>

        <p style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#911111",
          marginBottom: "40px",
        }}>
          click any event to expand
        </p>

        <div style={{ position: "relative", maxWidth: "680px" }}>

          <div style={{
            position: "absolute",
            left: "72px",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#1a1a1f",
          }} />

          {timelineEvents.map((event, index) => {
            const isOpen = activeEvent === index;
            return (
              <div
                key={index}
                onClick={() => handleEventClick(index)}
                style={{
                  display: "flex",
                  gap: "32px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div style={{
                  width: "56px",
                  flexShrink: 0,
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: isOpen ? "#911111" : "#444",
                  paddingTop: "14px",
                  textAlign: "right",
                  transition: "color 0.2s",
                }}>
                  {event.year}
                </div>

                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isOpen ? "#911111" : "#333",
                  flexShrink: 0,
                  marginTop: "18px",
                  transition: "background-color 0.2s",
                  zIndex: 1,
                }} />

                <div style={{
                  flex: 1,
                  backgroundColor: isOpen ? "#0a0a0f" : "transparent",
                  border: `1px solid ${isOpen ? "#1a1a1f" : "transparent"}`,
                  borderRadius: "6px",
                  padding: isOpen ? "16px" : "12px 16px",
                  transition: "all 0.2s",
                  marginBottom: "4px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: 500,
                      color: isOpen ? "#f0f0f0" : "#888",
                      transition: "color 0.2s",
                    }}>
                      {event.title}
                    </p>

                    <span style={{
                      color: isOpen ? "#911111" : "#444",
                      fontSize: "14px",
                      transition: "transform 0.2s, color 0.2s",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      display: "inline-block",
                      marginLeft: "12px",
                      flexShrink: 0,
                    }}>
                      ›
                    </span>
                  </div>

                  {isOpen && (
                    <p style={{
                      margin: "8px 0 0",
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: 1.7,
                    }}>
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
