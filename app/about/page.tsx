// app/about/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";

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

// ── LEAFLET MAP COMPONENT ──
// Leaflet needs the browser's window object to work.
// useEffect runs only in the browser (never on the server),
// so we import and initialise Leaflet inside it.
// useRef holds a reference to the div the map mounts into,
// and a flag to prevent the map being created twice.
function OriginMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialised = useRef(false);

  useEffect(() => {
    // If already initialised, don't do it again
    if (mapInitialised.current) return;
    mapInitialised.current = true;

    // Dynamically import Leaflet so it never runs on the server
    import("leaflet").then((L) => {
      // Leaflet's default icon images break in Next.js — this fixes that
      // by pointing to the hosted CDN versions instead
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!mapRef.current) return;

      // Centre the map roughly over Europe
      const map = L.map(mapRef.current, {
        center: [54, 10],
        zoom: 4,
        zoomControl: false,     // cleaner without zoom buttons
        scrollWheelZoom: false, // stops the map hijacking page scroll
        dragging: false,        // keeps it as a display, not interactive
        doubleClickZoom: false,
        attributionControl: false,
      });

      // Dark tile layer from CartoDB — matches your site's dark theme
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd" }
      ).addTo(map);

      // Kuldīga, Latvia
      const kuldiga: [number, number] = [56.9677, 21.9740];
      // Southport, England
      const southport: [number, number] = [53.6450, -3.0050];

      // Red circle markers — matches your site's accent colour
      const markerStyle = {
        radius: 7,
        fillColor: "#911111",
        color: "#c44",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      };

      L.circleMarker(kuldiga, markerStyle)
        .bindTooltip("Kuldīga, Latvia", { permanent: true, direction: "right", offset: [10, 0] })
        .addTo(map);

      L.circleMarker(southport, markerStyle)
        .bindTooltip("Southport, England", { permanent: true, direction: "right", offset: [10, 0] })
        .addTo(map);

      // Dashed line connecting the two points
      L.polyline([kuldiga, southport], {
        color: "#911111",
        weight: 1.5,
        dashArray: "6, 6",
        opacity: 0.7,
      }).addTo(map);
    });
  }, []);

  return (
    <>
      {/* Leaflet needs its own CSS to render correctly */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        style={{
          height: "280px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #1a1a1f",
          overflow: "hidden",
          marginTop: "32px",
        }}
      />
    </>
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

        {/* Two column layout — bio left, map right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
          maxWidth: "1000px",
        }}>
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

          <OriginMap />
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

        <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f8f8f8", margin: "0 0 48px" }}>
          How I got here
        </h2>

        <div style={{ position: "relative", maxWidth: "680px" }}>

          <div style={{
            position: "absolute",
            left: "72px",
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#1a1a1f",
          }} />

          {timelineEvents.map((event, index) => (
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
                color: activeEvent === index ? "#911111" : "#444",
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
                backgroundColor: activeEvent === index ? "#911111" : "#333",
                flexShrink: 0,
                marginTop: "18px",
                transition: "background-color 0.2s",
                zIndex: 1,
              }} />

              <div style={{
                flex: 1,
                backgroundColor: activeEvent === index ? "#0a0a0f" : "transparent",
                border: `1px solid ${activeEvent === index ? "#1a1a1f" : "transparent"}`,
                borderRadius: "6px",
                padding: activeEvent === index ? "16px" : "12px 16px",
                transition: "all 0.2s",
                marginBottom: "4px",
              }}>
                <p style={{
                  margin: 0,
                  fontSize: "15px",
                  fontWeight: 500,
                  color: activeEvent === index ? "#f0f0f0" : "#888",
                  transition: "color 0.2s",
                }}>
                  {event.title}
                </p>

                {activeEvent === index && (
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
          ))}
        </div>
      </section>
    </main>
  );
}
