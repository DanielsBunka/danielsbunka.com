// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const hats = [
  { name: "None", src: null },
  { name: "tophatmaybe", src: "/overlays/hats/tophatmaybe.png" },
  { name: "wizard", src: "/overlays/hats/wizard.png" },
  { name: "angry", src: "/overlays/hats/angry.png" },
];

const moustaches = [
  { name: "None", src: null },
  { name: "curly", src: "/overlays/moustaches/curly.png" },
  { name: "cat", src: "/overlays/moustaches/cat.png" },
  { name: "long", src: "/overlays/moustaches/long.png" },
];

function cycle(current: number, direction: 1 | -1, length: number) {
  return (current + direction + length) % length;
}

export default function Home() {
  const [hatIndex, setHatIndex] = useState(0);
  const [moustacheIndex, setMoustacheIndex] = useState(0);

  const currentHat = hats[hatIndex];
  const currentMoustache = moustaches[moustacheIndex];

  return (
    <main className="home-layout">

      {/* ── HERO WRAPPER ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}>

        {/* Photo row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "60px auto 60px",
          alignItems: "center",
          gap: "20px",
        }}>

          {/* Left arrows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setHatIndex(i => cycle(i, -1, hats.length))}
                className="arrow-btn"
                title="Previous hat"
              >‹</button>
              <span className="arrow-label"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setMoustacheIndex(i => cycle(i, -1, moustaches.length))}
                className="arrow-btn"
                title="Previous moustache"
              >‹</button>
              <span className="arrow-label"></span>
            </div>
          </div>

          {/* Center — photo */}
          <div style={{ position: "relative", width: "200px", height: "200px" }}>
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.jpg"
                alt="Daniels Bunka"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  transform: "scale(1.35)",
                  display: "block",
                }}
              />
            </div>

            {currentHat.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentHat.src}
                alt={currentHat.name}
                style={{
                  position: "absolute",
                  top: "53%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(2)",
                  width: "400px",
                  height: "400px",
                  objectFit: "contain",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            )}

            {currentMoustache.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentMoustache.src}
                alt={currentMoustache.name}
                style={{
                  position: "absolute",
                  top: "52%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(2)",
                  width: "400px",
                  height: "400px",
                  objectFit: "contain",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* Right arrows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setHatIndex(i => cycle(i, 1, hats.length))}
                className="arrow-btn"
                title="Next hat"
              >›</button>
              <span className="arrow-label"></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setMoustacheIndex(i => cycle(i, 1, moustaches.length))}
                className="arrow-btn"
                title="Next moustache"
              >›</button>
              <span className="arrow-label"></span>
            </div>
          </div>
        </div>

        {/* Name + title */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h1 style={{
            margin: "0 0 16px",
            fontSize: "32px", /* Exactly matched to the Article Page H1 */
            fontWeight: 700,  /* Exactly matched to the Article Page H1 */
            color: "#111111",
            letterSpacing: "-0.5px", /* Exactly matched to the Article Page H1 */
            lineHeight: 1,
          }}>
            Daniels Bunka
          </h1>
          <p style={{
            margin: "0 auto",
            fontSize: "11px",
            fontFamily: "var(--font-jetbrains), monospace",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#666666",
            backgroundColor: "#fafafa",
            border: "1px solid #e5e5e5",
            padding: "4px 12px",
            borderRadius: "4px", /* Matched to the badge radius on article pages */
            display: "inline-block",
          }}>
            CS Student // LJMU // Software Engineer
          </p>
        </div>
      </div>

      {/* ── BUTTONS ── */}
      <div style={{
        display: "flex",
        gap: "24px",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "8px"
      }}>
        <Link href="/projects" className="home-btn">
          See Projects
        </Link>
        <Link href="/about" className="home-btn">
          About Me
        </Link>
        <Link href="/contact" className="home-btn">
          Contact Me
        </Link>
      </div>

    </main>
  );
}