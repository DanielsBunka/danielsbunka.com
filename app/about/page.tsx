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
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      borderBottom: "1px dashed var(--border-medium)", 
      paddingBottom: "8px",
      alignItems: "flex-end",
      gap: "16px"
    }}>
      <span style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "11px", 
        color: "var(--ink-grey)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        flexShrink: 0
      }}>{label}</span>
      <span style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "13px", 
        color: "var(--ink-black)",
        fontWeight: 600,
        textAlign: "right"
      }}>{value}</span>
    </div>
  );
}

// --- TELEMETRY: REFINED CIRCULAR SYSTEM METERS ---
function SkillMeter({ skill, comfortable }: { skill: string, comfortable: boolean }) {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      marginBottom: "8px",
      gap: "16px"
    }}>
      <span style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "11px", 
        color: "var(--ink-charcoal)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        flexShrink: 0
      }}>{skill}</span>
      <span style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: "11px", 
        color: "var(--ink-black)",
        letterSpacing: "4px"
      }}>
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
      
      <button 
        onClick={onToggle}
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
  const [openLogId, setOpenLogId] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--bg-white)" }}>
      
      {/* MINIMAL TOP BAR */}
      <div className="top-nav-bar">
        <Link className="home-badge" href="/">DB</Link>
        <div className="nav-breadcrumb">
          <span style={{ color: "#aaaaaa" }}>/</span>
          <span style={{ color: "var(--ink-black)", fontWeight: 600 }}>About Me</span>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 160px 24px" }}>
        
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
              <HobbyImage alt="Lenovo ThinkCentre Homelab" caption="IMG_01 // ZIMA_OS_THINKCENTRE" src="/images/hobbies/homelab.jpg"/>
              <HobbyImage alt="CS2 Gameplay" caption="IMG_02 // FACEIT_QUEUE" src="/images/hobbies/cs2.jpg"/>
              <HobbyImage alt="Boxing Match" caption="IMG_03 // SEC315_DUBOIS_WARDLEY" src="/images/hobbies/boxing.jpg"/>
              <HobbyImage alt="Public Lecture" caption="IMG_04 // TUNG_AUDITORIUM" src="/images/hobbies/lecture.jpg"/>
            </div>
          </div>
        </div>

        {/* STRUCTURAL DIVIDER */}
        <div style={{ borderBottom: "1px solid var(--border-light)", marginBottom: "80px" }}></div>

        {/* BOTTOM ROW: Timeline & Telemetry */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "64px" }}>
          
          {/* LEFT: The Interactive Timeline */}
          <div style={{ flex: "1.5 1 500px" }}>
            <h2 className="section-heading-terminal" style={{ fontSize: "16px", marginBottom: "40px" }}>
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
          <div style={{ flex: "1 1 350px" }}>
            <h2 className="section-heading-terminal" style={{ fontSize: "16px", marginBottom: "40px" }}>
              Live Telemetry // Status
            </h2>
            
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "24px", /* Tightened gap between zones */
                backgroundColor: "var(--bg-offwhite)", 
                padding: "24px", /* Compressed outer padding */
                border: "1px solid var(--border-medium)", 
                borderRadius: "4px" 
              }}>

                {/* ZONE 1: Core / Work */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--ink-black)", letterSpacing: "0.05em", borderBottom: "1px solid var(--ink-black)", paddingBottom: "4px" }}>
                    // CORE_SPECS
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <StatBlock label="Base_Loc" value="Southport, UK"/>
                    <StatBlock label="Education" value="LJMU [Comp Sci]"/>
                    <StatBlock label="First_Year_Result" value="First Class"/>
                    <StatBlock label="Status" value="Open to Placement"/>
                  </div>
                </div>

                {/* ZONE 2: Tech Stack (Languages & Infrastructure) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  
                  {/* Inline Header & Legend (Saves vertical space and reads top-down) */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-end",
                    borderBottom: "1px solid var(--ink-black)", 
                    paddingBottom: "4px" 
                  }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--ink-black)", letterSpacing: "0.05em" }}>
                      // TECH_STACK
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-grey)", letterSpacing: "0.05em" }}>
                      ●● COMFORTABLE  |  ●○ FAMILIAR
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* Sub-Group: Languages */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-grey)", textTransform: "uppercase", marginBottom: "2px" }}>[ Languages ]</span>
                      <SkillMeter comfortable={true} skill="Python"/>
                      <SkillMeter comfortable={true} skill="Java"/>
                      <SkillMeter comfortable={true} skill="JavaScript"/>
                      <SkillMeter comfortable={true} skill="HTML / CSS"/>
                      <SkillMeter comfortable={false} skill="SQL"/>
                    </div>

                    {/* Sub-Group: Tools & Infra */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-grey)", textTransform: "uppercase", marginBottom: "2px" }}>[ Infrastructure & Tools ]</span>
                      <SkillMeter comfortable={true} skill="AI LLM APIs"/>
                      <SkillMeter comfortable={false} skill="Flask"/>
                      <SkillMeter comfortable={false} skill="React / Next.js"/>
                      <SkillMeter comfortable={false} skill="Docker"/>
                      <SkillMeter comfortable={false} skill="Linux"/>
                      <SkillMeter comfortable={false} skill="Cloudflare Tunnels"/>
                      <SkillMeter comfortable={false} skill="Twilio API"/>
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