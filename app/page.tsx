// app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Daniels Bunka",
  alternateName: ["Daniels Bunka Portfolio", "danielsbunka.com"],
  url: "https://danielsbunka.com/",
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="hero-wrapper">
        <div className="hero-photo-grid">
          
          <div className="arrow-col">
            <button onClick={() => setHatIndex(i => cycle(i, -1, hats.length))} className="arrow-btn" title="Previous hat">‹</button>
            <button onClick={() => setMoustacheIndex(i => cycle(i, -1, moustaches.length))} className="arrow-btn" title="Previous moustache">‹</button>
          </div>

          <div className="hero-photo-container">
            <div className="profile-mask">
              <Image
                src="/images/profile.webp"
                alt="Daniels Bunka"
                fill
                unoptimized
                loading="eager"
                fetchPriority="high"
                className="profile-img"
              />
            </div>
            {currentHat.src && <img src={currentHat.src} alt={currentHat.name} className="overlay-img" />}
            {currentMoustache.src && <img src={currentMoustache.src} alt={currentMoustache.name} className="overlay-img" />}
          </div>

          <div className="arrow-col">
            <button onClick={() => setHatIndex(i => cycle(i, 1, hats.length))} className="arrow-btn" title="Next hat">›</button>
            <button onClick={() => setMoustacheIndex(i => cycle(i, 1, moustaches.length))} className="arrow-btn" title="Next moustache">›</button>
          </div>
        </div>

        <div className="hero-text">
          <h1 className="hero-title">Daniels Bunka</h1>
          <p className="terminal-badge badge-subtle">CS Student // LJMU // Software Engineer</p>
        </div>
      </div>

      <div className="home-btn-group">
        <Link href="/projects" className="home-btn">View Projects</Link>
        <Link href="/about" className="home-btn">About Me</Link>
        <Link href="/contact" className="home-btn">Contact Me</Link>
      </div>
    </main>
  );
}
