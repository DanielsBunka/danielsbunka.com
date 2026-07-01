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
      <button
        type="button"
        className="hobby-card"
        onClick={() => setIsOpen(true)}
        title="Click to expand"
      >
        <div className="hobby-image-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
        <div className="hobby-caption">
          {caption}
        </div>
      </button>

      {isOpen && (
        <div className="lightbox-overlay" onClick={() => setIsOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="lightbox-image" />
          <div className="lightbox-caption">
            {caption} <br />
            <span>[ TAP ANYWHERE TO CLOSE ]</span>
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

// --- THE EXPANDABLE TIMELINE NODE COMPONENT ---
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

      <button
        type="button"
        onClick={handleToggle}
        className={`timeline-btn ${isExpanded ? "expanded" : ""}`}
      >
        <div className="timeline-btn-content">
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
      </button>

      <div className={`timeline-content-wrapper ${isExpanded ? "expanded" : ""}`}>
        <div className="timeline-content">
          <p>{description}</p>
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

      <div className="top-nav-bar">
        <Link className="home-badge" href="/">DB</Link>
        <div className="nav-breadcrumb">
          <span className="nav-divider">/</span>
          <span className="nav-current">About Me</span>
        </div>
      </div>

      <div className="about-container">

        <div className="about-split-row">
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

          <div className="about-col-hobbies">
            <h2 className="section-heading-terminal">About Me // Memories</h2>
            <div className="hobby-grid">
              <HobbyImage alt="Counter Strike Tournament Image" caption="IMG_01 // Counter Strike Tournament Image" src="/images/hobbies/BlastLondon.jpg" />
              <HobbyImage alt="Usyk Boxing at Wembley" caption="IMG_02 // Usyk Boxing Match at Wembley" src="/images/hobbies/UsykBoxing.jpg" />
              <HobbyImage alt="Sabaton Concert" caption="IMG_03 // Sabaton Concert (Metal)" src="/images/hobbies/concert.png" />
              <HobbyImage alt="Hackathon Group Photo" caption="IMG_04 // Hackathon" src="/images/hobbies/Hackathon.jpg" />
            </div>
          </div>
        </div>

        <div className="about-structural-divider"></div>

        <div className="about-split-row-bottom">
          <div className="about-col-timeline">
            <h2 className="section-heading-terminal large">About Me // Timeline</h2>
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

          <div className="about-col-telemetry">
            <h2 className="section-heading-terminal large">About Me // Info</h2>
            <div className="telemetry-dashboard">
              <div className="telemetry-zone">
                <span className="telemetry-zone-header">CORE_SPECS</span>
                <div className="telemetry-zone-content">
                  {CORE_SPECS.map((spec) => (
                    <StatBlock key={spec.label} label={spec.label} value={spec.value} />
                  ))}
                </div>
              </div>

              <div className="telemetry-zone">
                <div className="telemetry-inline-header">
                  <span className="telemetry-zone-header">TECH_STACK</span>
                  <div className="telemetry-legend">
                    <div className="telemetry-legend-item">
                      <span className="telemetry-legend-dot">●●</span>
                      <span className="telemetry-legend-text">COMFORTABLE</span>
                    </div>
                    <div className="telemetry-legend-item">
                      <span className="telemetry-legend-dot">●○</span>
                      <span className="telemetry-legend-text">FAMILIAR</span>
                    </div>
                  </div>
                </div>

                <div className="telemetry-subgroups">
                  <div className="telemetry-subgroup">
                    <span className="telemetry-subgroup-title">[ Languages ]</span>
                    {LANGUAGE_STACK.map((lang) => (
                      <SkillMeter key={lang.skill} skill={lang.skill} comfortable={lang.comfortable} />
                    ))}
                  </div>

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