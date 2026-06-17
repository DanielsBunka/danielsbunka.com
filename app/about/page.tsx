// app/about/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { SYSTEM_LOGS, CORE_SPECS, LANGUAGE_STACK, INFRA_STACK } from "./data";

// --- THE HOBBY IMAGE COMPONENT (CLEAN LIGHTBOX) ---
function HobbyImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The base card */}
      <div
        className="hobby-card"
        onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer" }}
        title="Click to expand"
      >
        <div className="hobby-image-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{ filter: "none", WebkitFilter: "none" }}
          />
        </div>
        <div className="hobby-caption">
          {caption}
        </div>
      </div>

      {/* The full-screen overlay (Lightbox) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px",
            cursor: "zoom-out"
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              border: "1px solid #333",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              filter: "none",
              WebkitFilter: "none"
            }}
          />
          <div style={{
            color: "#ffffff",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            marginTop: "16px",
            textAlign: "center",
            lineHeight: "1.5"
          }}>
            {caption} <br />
            <span style={{ opacity: 0.5 }}>[ TAP ANYWHERE TO CLOSE ]</span>
          </div>
        </div>
      )}
    </>
  );
}

// --- TELEMETRY: BASIC STAT BLOCK ---
function StatBlock({ label, value }: { label: string, value: string }) {
  return (
    <div className="stat-block">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

// --- TELEMETRY: REFINED CIRCULAR SYSTEM METERS ---
function SkillMeter({ skill, comfortable }: { skill: string, comfortable: boolean }) {
  return (
    <div className="skill-meter">
      <span className="skill-label">{skill}</span>
      <span className="skill-value">
        {comfortable ? "● ●" : "● ○"}
      </span>
    </div>
  );
}

// --- THE EXPANDABLE TIMELINE NODE COMPONENT (MOBILE BUTTON OPTIMIZED) ---
function TimelineNode({
  date,
  title,
  description,
  isActive = false,
  isExpanded,
  onToggle,
  link
}: {
  date: string,
  title: string,
  description: string,
  isActive?: boolean,
  isExpanded: boolean,
  onToggle: () => void,
  link?: string
}) {

  const handleToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <div className="timeline-node-wrapper">
      <div className={`timeline-marker ${isActive ? "active" : ""}`} />

      <div
        onClick={handleToggle}
        onTouchEnd={handleToggle}
        className={`timeline-btn ${isExpanded ? "expanded" : ""}`}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer", position: "relative", zIndex: 10 }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          pointerEvents: "none",
          maxWidth: "75%"
        }}>
          <div className={`timeline-date ${isActive ? "active" : ""}`} style={{ marginBottom: "2px" }}>
            [ {date} ]
          </div>
          <div className="timeline-title" style={{ whiteSpace: "normal", lineHeight: "1.3" }}>
            {title}
          </div>
        </div>

        <div className="timeline-action" style={{ pointerEvents: "none", flexShrink: 0 }}>
          {isExpanded ? "[ - ] CLOSE" : "[ + ] EXPAND"}
        </div>
      </div>

      <div className={`timeline-content-wrapper ${isExpanded ? "expanded" : ""}`}>
        <div className="timeline-content">
          <p style={{ margin: "0" }}>{description}</p>

          {/* FIXED: Removed inline styles, pointing to responsive CSS class */}
          {link && (
            <Link href={link} className="terminal-link-btn">
              [View Project Article]
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE LAYOUT ---
export default function AboutPage() {
  const [openLogId, setOpenLogId] = useState<string | null>(null);

  return (
    <main className="about-main">

      {/* MINIMAL TOP BAR */}
      <div className="top-nav-bar">
        <Link className="home-badge" href="/">DB</Link>
        <div className="nav-breadcrumb">
          <span className="nav-divider">/</span>
          <span className="nav-current">About Me</span>
        </div>
      </div>

      <div className="about-container">

        {/* TOP ROW: Split Layout */}
        <div className="about-split-row">

          {/* LEFT: The Readme */}
          <div className="markdown-body about-col-readme">
            <h1>About Me.</h1>
            <p>
              I am a Computer Science student at Liverpool John Moores University looking for a 2027/2028 placement. I have built this website to showcase my skills via my portfolio and to act as a central place to record my journey. I’ve created and published various personal projects as a way to improve my skills and become a better software engineer.
            </p>
            <p>
              I’ve used my projects to explore various different fields. An example of this has been my light-hearted full-stack ‘Roast My Face’ web app that integrates AI APIs to process an image of the user’s face and come up with a humorous response. I’ve also gone down a rabbit hole with networking by setting up my own homelab by upcycling a cheap mini PC from Ebay which led to me experimenting with reverse proxies and deploying self-hosted services and applications.
            </p>
            <p>
              Outside of Computer Science, I’m really into Counter Strike and especially the esports side of it, and personally going to watch a tournament in person in London has been one of my favorite experiences. Another passion of mine is boxing, especially the heavyweight division and in particular I am a big fan of Usyk; seeing Usyk VS Dubois at Wembley Stadium was surreal.
            </p>
          </div>

          {/* RIGHT: Indexed Assets / Image Board */}
          <div className="about-col-hobbies">
            <h2 className="section-heading-terminal">
              About Me // Memories
            </h2>
            <div className="hobby-grid">
              <HobbyImage alt="Counter Strike Tournament Image" caption="IMG_01 // Counter Strike Tournament Image" src="/images/hobbies/BlastLondon.jpg" />
              <HobbyImage alt="Usyk Boxing at Wembley" caption="IMG_02 // Usyk Boxing Match at Wembley" src="/images/hobbies/UsykBoxing.jpg" />
              <HobbyImage alt="Concert" caption="IMG_03 // Concert" src="/images/hobbies/concert.png" />
              <HobbyImage alt="Hackathon Group Photo" caption="IMG_04 // Hackathon" src="/images/hobbies/Hackathon.jpg" />
            </div>
          </div>
        </div>

        {/* STRUCTURAL DIVIDER */}
        <div className="about-structural-divider"></div>

        {/* BOTTOM ROW: Timeline & Telemetry */}
        <div className="about-split-row-bottom">

          {/* LEFT: The Interactive Timeline */}
          <div className="about-col-timeline">
            <h2 className="section-heading-terminal large">
              About Me // Timeline
            </h2>

            <div className="timeline-track">
              {SYSTEM_LOGS.map((log) => (
                <TimelineNode
                  key={log.id}
                  date={log.date}
                  title={log.title}
                  description={log.description}
                  link={log.link}
                  isActive={log.id === "log_09"}
                  isExpanded={openLogId === log.id}
                  onToggle={() => setOpenLogId(openLogId === log.id ? null : log.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Live Telemetry Dashboard */}
          <div className="about-col-telemetry">
            <h2 className="section-heading-terminal large">
              About Me // Info
            </h2>

            <div className="telemetry-dashboard">

              {/* ZONE 1: Core / Work */}
              <div className="telemetry-zone">
                <span className="telemetry-zone-header">
                  CORE_SPECS
                </span>
                <div className="telemetry-zone-content">
                  {CORE_SPECS.map((spec) => (
                    <StatBlock key={spec.label} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </div>

              {/* ZONE 2: Tech Stack (Languages & Infrastructure) */}
              <div className="telemetry-zone">

                {/* Inline Header & Legend */}
                <div className="telemetry-inline-header">
                  <span className="telemetry-zone-header">
                    TECH_STACK
                  </span>
                  <div className="telemetry-legend">
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="telemetry-legend-dot">●●</span>
                      <span className="telemetry-legend-text">COMFORTABLE</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span className="telemetry-legend-dot">●○</span>
                      <span className="telemetry-legend-text">FAMILIAR</span>
                    </div>
                  </div>
                </div>

                <div className="telemetry-subgroups">
                  {/* Sub-Group: Languages */}
                  <div className="telemetry-subgroup">
                    <span className="telemetry-subgroup-title">[ Languages ]</span>
                    {LANGUAGE_STACK.map((lang) => (
                      <SkillMeter key={lang.skill} skill={lang.skill} comfortable={lang.comfortable} />
                    ))}
                  </div>

                  {/* Sub-Group: Tools & Infra */}
                  <div className="telemetry-subgroup">
                    <span className="telemetry-subgroup-title">[ Infrastructure & Tools ]</span>
                    {INFRA_STACK.map((infra) => (
                      <SkillMeter key={infra.skill} skill={infra.skill} comfortable={infra.comfortable} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}