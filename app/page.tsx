// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const hats = [
  { name: "None",       src: null },
  { name: "lovecoding",    src: "/overlays/hats/lovecoding.png" },
  { name: "angry",    src: "/overlays/hats/angry.png" },
];

const moustaches = [
  { name: "None",      src: null },
  { name: "curly1", src: "/overlays/moustaches/curly1.png" },
  { name: "cat", src: "/overlays/moustaches/cat.png" },
];

function cycle(current: number, direction: 1 | -1, length: number) {
  return (current + direction + length) % length;
}

export default function Home() {
  const [hatIndex,       setHatIndex]       = useState(0);
  const [moustacheIndex, setMoustacheIndex] = useState(0);

  const currentHat       = hats[hatIndex];
  const currentMoustache = moustaches[moustacheIndex];

  return (
    <main style={{
      backgroundColor: "#f8f8f8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#111111",
      fontFamily: "sans-serif",
      gap: "40px",
      padding: "40px",
      paddingBottom: "15vh", /* Lifts the entire container up off the dead center */
      boxSizing: "border-box",
    }}>

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
                style={arrowStyle}
                title="Previous hat"
              >‹</button>
              <span style={arrowLabelStyle}></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setMoustacheIndex(i => cycle(i, -1, moustaches.length))}
                style={arrowStyle}
                title="Previous moustache"
              >‹</button>
              <span style={arrowLabelStyle}></span>
            </div>
          </div>

          {/* Center — photo */}
          <div style={{ position: "relative", width: "200px", height: "200px" }}>
            
            {/* 
              Base Image Container with overflow: hidden. 
              This clips the zoomed-in image so it stays a perfect circle, 
              but allows the hats to sit outside of it in the parent div.
            */}
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
                  objectPosition: "center 40%", /* Adjust this percentage to pan up/down */
                  transform: "scale(1.35)",     /* This is what zooms it in */
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
                style={arrowStyle}
                title="Next hat"
              >›</button>
              <span style={arrowLabelStyle}></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setMoustacheIndex(i => cycle(i, 1, moustaches.length))}
                style={arrowStyle}
                title="Next moustache"
              >›</button>
              <span style={arrowLabelStyle}></span>
            </div>
          </div>
        </div>

        {/* Name + title */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h1 style={{
            margin: "0 0 6px",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 600,
            color: "#111111",
            letterSpacing: "-0.5px",
          }}>
            Daniels Bunka
          </h1>
          <p style={{
            margin: 0,
            fontSize: "14px",
            color: "#999",
            fontFamily: "monospace",
          }}>
            CS Student · LJMU · Software Engineer
          </p>
        </div>
      </div>

      {/* ── BUTTONS ── */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/projects" style={ghostButtonStyle}>
          See Projects
        </Link>
        <Link href="/about" style={ghostButtonStyle}>
          About Me
        </Link>
        <Link href="/contact" style={ghostButtonStyle}>
          Contact Me
        </Link>
      </div>

    </main>
  );
}

const arrowStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "1px solid #e0e0e0",
  color: "#aaa",
  width: "36px",
  height: "36px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "border-color 0.2s, color 0.2s",
};

const arrowLabelStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "9px",
  color: "#ccc",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const ghostButtonStyle: React.CSSProperties = {
  backgroundColor: "#111111",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500,
};

