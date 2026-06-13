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
            {caption} <br/>
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

// --- THE EXPANDABLE TIMELINE NODE COMPONENT (CLEAN) ---
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
  return (
    <div className="timeline-node-wrapper">
      <div className={`timeline-marker ${isActive ? "active" : ""}`} />
      
      <div 
        onClick={onToggle}
        className={`timeline-btn ${isExpanded ? "expanded" : ""}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div>
          <div className={`timeline-date ${isActive ? "active" : ""}`}>
            [ {date} ]
          </div>
          <div className="timeline-title">
            {title}
          </div>
        </div>

        <div className="timeline-action">
          {isExpanded ? "[ - ] CLOSE" : "[ + ] EXPAND"}
        </div>
      </div>

      <div className={`timeline-content-wrapper ${isExpanded ? "expanded" : ""}`}>
        <div className="timeline-content">
          <p style={{ margin: "0" }}>{description}</p>
          
          {/* If the link exists, render the terminal button */}
          {link && (
            <Link 
              href={link} 
              style={{ 
                fontFamily: "var(--font-mono)", 
                fontSize: "11px", 
                fontWeight: 700, 
                color: "#ffffff",
                backgroundColor: "#111111",
                padding: "6px 12px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                border: "1px solid #111111",
                transition: "all 0.15s ease-in-out"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#111111";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#111111";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              [ RUN: VIEW_PROJECT ] ↗
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
              I am a Computer Science student at Liverpool John Moores University, based in Southport. I specialize in building practical, project-based software and managing self-hosted server infrastructure.
            </p>
            <p>
              When I am not writing React or Next.js, I spend my time configuring Docker containers and experimenting with ZimaOS on my personal Lenovo ThinkCentre homelab. I believe the best way to learn system architecture is to physically build and break it yourself. I prioritize efficient, frugal tech solutions—like refurbishing corporate hardware—over buying into unneeded commercial hype.
            </p>
            <p>
              Outside of the terminal, I grind competitive queues on Faceit for Counter-Strike 2, follow professional combat sports, and keep an active eye on long-term index fund investments.
            </p>
          </div>

          {/* RIGHT: Indexed Assets / Image Board */}
          <div className="about-col-hobbies">
            <h2 className="section-heading-terminal">
              Indexed Assets // Hobbies
            </h2>
            <div className="hobby-grid">
              <HobbyImage alt="Lenovo ThinkCentre Homelab" caption="IMG_01 // ZIMA_OS_THINKCENTRE" src="/images/hobbies/homelab.jpg"/>
              <HobbyImage alt="CS2 Gameplay" caption="IMG_02 // FACEIT_QUEUE" src="/images/hobbies/cs2.jpg"/>
              <HobbyImage alt="Boxing Match" caption="IMG_03 // SEC315_DUBOIS_WARDLEY" src="/images/hobbies/boxing.jpg"/>
              <HobbyImage alt="Public Lecture" caption="IMG_04 // TUNG_AUDITORIUM" src="/images/hobbies/lecture.jpg"/>
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
              System Log // Trajectory
            </h2>

            <div className="timeline-track">
              {SYSTEM_LOGS.map((log) => (
                <TimelineNode 
                  key={log.id}
                  date={log.date}
                  title={log.title}
                  description={log.description}
                  link={log.link}
                  isActive={log.id === "log_08"} 
                  isExpanded={openLogId === log.id}
                  onToggle={() => setOpenLogId(openLogId === log.id ? null : log.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Live Telemetry Dashboard */}
          <div className="about-col-telemetry">
            <h2 className="section-heading-terminal large">
              Live Telemetry // Status
            </h2>
            
            <div className="telemetry-dashboard">

                {/* ZONE 1: Core / Work */}
                <div className="telemetry-zone">
                  <span className="telemetry-zone-header">
                    // CORE_SPECS
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
                      // TECH_STACK
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