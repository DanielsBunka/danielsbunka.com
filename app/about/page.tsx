// app/about/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// --- THE TIMELINE DATA ---
const SYSTEM_LOGS = [
  {
    id: "log_01",
    date: "2019",
    title: "Introduction to Coding: GCSE Computer Science",
    description: "Wrote my first lines of code. Formally introduced to core programming concepts, algorithm design, and control structures using Python."
  },
  {
    id: "log_02",
    date: "2022",
    title: "Further Education: Computer Science",
    description: "Deepened my theoretical understanding of computing systems during college and transitioned into object-oriented programming paradigms using Visual Basic."
  },
  {
    id: "log_03",
    date: "2025.09",
    title: "Enrollment: BSc Computer Science, LJMU",
    description: "Successfully enrolled and began my Computer Science degree, establishing a university-level foundation in data modeling, and full-stack web development."
  },
  {
    id: "log_04",
    date: "2025.11",
    title: "Deployment: SOP Arrival Automation (SMS)",
    description: "Engineered a Python/Flask utility utilizing the Realtime Trains API to automatically ping my father via SMS with accurate arrival times for my commute into Southport (SOP)."
  },
  {
    id: "log_05",
    date: "2026.02",
    title: "Shipping: Roast My Face Web App",
    description: "Developed and deployed a full-stack AI web application. Overcame specific CSS routing and API integration hurdles, pushing the final build to a public GitHub repository."
  },
  {
    id: "log_06",
    date: "2026.05",
    title: "Completion: First Year Foundation",
    description: "Concluded my first year of university, achieving a high First-Class average (~79%) across all technical modules."
  },
  {
    id: "log_07",
    date: "2026.05",
    title: "Competition: BCS Smart City Hackathon",
    description: "Participated in a grueling two-day collaborative coding sprint focused on Smart City Transportation, immediately after finishing my first-year exams."
  },
  {
    id: "log_08",
    date: "ACTIVE",
    title: "Placement Search: 2026/2027 Cycle",
    description: "Actively exploring and securing an industrial placement year. Targeting roles that offer hybrid or remote flexibility to contribute directly to production-level software engineering environments."
  }
];

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
  onToggle 
}: { 
  date: string, 
  title: string, 
  description: string, 
  isActive?: boolean, 
  isExpanded: boolean, 
  onToggle: () => void 
}) {
  return (
    <div className="timeline-node-wrapper">
      <div className={`timeline-marker ${isActive ? "active" : ""}`} />
      
      {/* Upgraded from <button> to a valid, clickable <div> to prevent strict HTML parsing errors */}
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
          {description}
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
                    <StatBlock label="Base_Loc" value="Southport, UK"/>
                    <StatBlock label="Education" value="LJMU [Comp Sci]"/>
                    <StatBlock label="Current_Avg" value="79% [First-Class]"/>
                    <StatBlock label="Status" value="Open to Placement"/>
                  </div>
                </div>

                {/* ZONE 2: Tech Stack (Languages & Infrastructure) */}
                <div className="telemetry-zone">
                  
                  {/* Inline Header & UPGRADED Legend using DIVs to prevent span hydration issues */}
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
                      <SkillMeter comfortable={true} skill="Python"/>
                      <SkillMeter comfortable={true} skill="HTML / CSS"/>                     
                      <SkillMeter comfortable={true} skill="JavaScript"/>
                      <SkillMeter comfortable={false} skill="Java"/>
                      <SkillMeter comfortable={false} skill="SQL"/>
                    </div>

                    {/* Sub-Group: Tools & Infra */}
                    <div className="telemetry-subgroup">
                      <span className="telemetry-subgroup-title">[ Infrastructure & Tools ]</span>
                      <SkillMeter comfortable={true} skill="RESTful APIs"/>                      
                      <SkillMeter comfortable={false} skill="Flask"/>
                      <SkillMeter comfortable={false} skill="React / Next.js"/>
                      <SkillMeter comfortable={false} skill="Docker"/>
                      <SkillMeter comfortable={false} skill="Linux"/>
                      <SkillMeter comfortable={false} skill="Networking / Selfhosting"/>
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