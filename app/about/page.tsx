// app/about/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// --- THE HOBBY IMAGE COMPONENT ---
function HobbyImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  return (
    <div className="hobby-card">
      <div className="hobby-image-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
      <div className="hobby-caption">
        {caption}
      </div>
    </div>
  );
}

// --- THE EXPANDABLE TIMELINE NODE COMPONENT ---
function TimelineNode({ date, title, description, isActive = false }: { date: string, title: string, description: string, isActive?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="timeline-node-wrapper">
      <div className={`timeline-marker ${isActive ? "active" : ""}`} />
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`timeline-btn ${isExpanded ? "expanded" : ""}`}
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
      </button>

      <div 
        className="timeline-content-wrapper" 
        style={{ 
          maxHeight: isExpanded ? "200px" : "0px", 
          opacity: isExpanded ? 1 : 0 
        }}
      >
        <div className="timeline-content">
          {description}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE LAYOUT ---
export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--bg-white)" }}>
      
      {/* MINIMAL TOP BAR */}
      <div className="top-nav-bar">
        <Link href="/" className="home-badge">DB</Link>
        <div className="nav-breadcrumb">
          <span style={{ color: "#aaaaaa" }}>/</span>
          <span style={{ color: "var(--ink-black)", fontWeight: 600 }}>About Me</span>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        
        {/* TOP ROW: Split Layout */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "64px", marginBottom: "80px" }}>
          
          {/* LEFT: The Readme */}
          <div className="markdown-body" style={{ flex: "1 1 350px" }}>
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
          <div style={{ flex: "2.5 1 500px" }}>
            <h2 className="section-heading-terminal">
              Indexed Assets // Hobbies
            </h2>
            <div className="hobby-grid">
              <HobbyImage src="/images/hobbies/homelab.jpg" alt="Lenovo ThinkCentre Homelab" caption="IMG_01 // ZIMA_OS_THINKCENTRE" />
              <HobbyImage src="/images/hobbies/cs2.jpg" alt="CS2 Gameplay" caption="IMG_02 // FACEIT_QUEUE" />
              <HobbyImage src="/images/hobbies/boxing.jpg" alt="Boxing Match" caption="IMG_03 // SEC315_DUBOIS_WARDLEY" />
              <HobbyImage src="/images/hobbies/lecture.jpg" alt="Public Lecture" caption="IMG_04 // TUNG_AUDITORIUM" />
            </div>
          </div>
        </div>

        {/* STRUCTURAL DIVIDER */}
        <div style={{ borderBottom: "1px solid var(--border-light)", marginBottom: "80px" }}></div>

        {/* BOTTOM ROW: The Interactive Timeline */}
        <div style={{ maxWidth: "800px" }}>
          <h2 className="section-heading-terminal" style={{ fontSize: "16px", marginBottom: "40px" }}>
            System Log // Trajectory
          </h2>

          <div className="timeline-track">
            <TimelineNode 
              date="2025.09" 
              title="Enrollment: BSc Computer Science, LJMU" 
              description="Successfully enrolled and began the first year of my Computer Science degree, establishing a foundation in intro programming, data modeling, and web development."
            />
            <TimelineNode 
              date="2025.11" 
              title="Deployment: SOP Arrival Automation (SMS)" 
              description="Engineered a Python/Flask utility utilizing the Realtime Trains API to automatically ping my father via SMS with accurate arrival times for my commute into Southport (SOP)."
            />
            <TimelineNode   
              date="2026.02" 
              title="Shipping: Roast My Face Web App" 
              description="Developed and deployed a full-stack AI web application. Overcame specific CSS routing and API integration hurdles, pushing the final build to a public GitHub repository."
            />
            <TimelineNode 
              date="2026.05" 
              title="Competition: BCS Smart City Hackathon" 
              description="Participated in a grueling two-day collaborative coding sprint focused on Smart City Transportation, immediately after finishing my first year of university."
            />
            <TimelineNode 
              date="ACTIVE" 
              title="Placement Search: 2026/2027 Cycle" 
              description="Actively exploring and securing an industrial placement year. Targeting roles that offer hybrid or remote flexibility to contribute directly to production-level software engineering environments."
              isActive={true}
            />
          </div>
        </div>

      </div>
    </main>
  );
}