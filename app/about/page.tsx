// app/about/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// --- THE HOBBY IMAGE COMPONENT ---
function HobbyImage({ src, alt, caption }: { src: string, alt: string, caption: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          border: "1px solid #111111", 
          aspectRatio: "4/3", /* Changed from 16/9 to 4/3 to make the images taller and more imposing */
          backgroundColor: "#f0f0f0", 
          overflow: "hidden", 
          position: "relative"
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
            transition: "filter 0.3s ease",
            display: "block"
          }} 
        />
      </div>
      <div style={{
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "10px",
        color: "#444444",
        backgroundColor: "#fafafa",
        border: "1px solid #d4d4d4",
        padding: "4px 8px",
        borderRadius: "4px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        width: "fit-content"
      }}>
        {caption}
      </div>
    </div>
  );
}

// --- THE EXPANDABLE TIMELINE NODE COMPONENT ---
function TimelineNode({ date, title, description, isActive = false }: { date: string, title: string, description: string, isActive?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Node Marker on the vertical line */}
      <div style={{ 
        position: "absolute", 
        left: "-31px", 
        top: "16px", 
        width: "12px", 
        height: "12px", 
        backgroundColor: isActive ? "#ffffff" : "#111111",
        border: isActive ? "2px solid #111111" : "none"
      }} />
      
      {/* Clickable Header - Re-engineered for a Mechanical Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          textAlign: "left",
          background: isExpanded ? "#111111" : isHovered ? "#f5f5f5" : "transparent", /* Turns solid black when open */
          color: isExpanded ? "#ffffff" : "#111111", /* Inverts text when open */
          border: "none",
          padding: "12px",
          marginLeft: "-12px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.15s ease"
        }}
      >
        <div>
          <div style={{ 
            fontFamily: "var(--font-jetbrains), monospace", 
            fontSize: "11px", 
            color: isExpanded ? "#aaaaaa" : isActive ? "#111111" : "#666", 
            fontWeight: isActive ? 700 : 400,
            marginBottom: "4px"
          }}>
            [ {date} ]
          </div>
          <div style={{ fontWeight: 600, fontSize: "16px" }}>
            {title}
          </div>
        </div>

        {/* The Right-Aligned Mechanical Status Label instead of a spinning arrow */}
        <div style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: isExpanded ? "#ffffff" : isHovered ? "#111111" : "#cccccc",
          paddingLeft: "16px"
        }}>
          {isExpanded ? "[ - ] CLOSE" : "[ + ] EXPAND"}
        </div>
      </button>

      {/* Expandable Details Container */}
      <div style={{ 
        maxHeight: isExpanded ? "200px" : "0px", 
        overflow: "hidden", 
        transition: "max-height 0.3s ease-in-out",
        opacity: isExpanded ? 1 : 0
      }}>
        <div style={{ 
          marginTop: "4px",
          marginBottom: "12px",
          padding: "16px",
          backgroundColor: "#fafafa",
          borderLeft: "2px solid #111111",
          fontSize: "14px",
          color: "#444444",
          lineHeight: 1.6
        }}>
          {description}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE LAYOUT ---
export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      
      {/* MINIMAL TOP BAR */}
      <div style={{
        display: "flex",
        alignItems: "center",
        height: "80px",
        padding: "0 40px 0 0", 
        borderBottom: "1px solid #d4d4d4",
        boxSizing: "border-box"
      }}>
        <Link href="/" className="home-badge">DB</Link>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginLeft: "24px",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "13px",
        }}>
          <span style={{ color: "#aaaaaa" }}>/</span>
          <span style={{ color: "#111111", fontWeight: 600 }}>About Me</span>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        
        {/* TOP ROW: Split Layout */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "64px", 
          marginBottom: "80px" 
        }}>
          
          {/* LEFT: The Readme */}
          <div className="markdown-body" style={{ flex: "1 1 350px" }}>
            <h1 style={{ 
              fontSize: "clamp(36px, 6vw, 48px)", 
              fontWeight: 800, 
              letterSpacing: "-1.5px",
              marginTop: 0, /* Strictly forces the top to sit flush */
              marginBottom: "32px",
              lineHeight: 1 /* Prevents vertical bleeding from the font height */
            }}>
              About Me.
            </h1>
            
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

          {/* RIGHT: Indexed Assets / Image Board - Amplified Scale */}
          {/* Increased flex priority massively to force the grid to expand */}
          <div style={{ flex: "2.5 1 500px" }}>
            <h2 style={{ 
              fontFamily: "var(--font-jetbrains), monospace", 
              fontSize: "13px", 
              fontWeight: 700, 
              borderBottom: "2px solid #111111",
              paddingBottom: "12px",
              marginBottom: "24px",
              marginTop: 0, /* Strictly forces alignment with the H1 on the left */
              textTransform: "uppercase",
              lineHeight: 1
            }}>
              Indexed Assets // Hobbies
            </h2>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "24px",
              width: "100%"
            }}>
              <HobbyImage src="/images/hobbies/homelab.jpg" alt="Lenovo ThinkCentre Homelab" caption="IMG_01 // ZIMA_OS_THINKCENTRE" />
              <HobbyImage src="/images/hobbies/cs2.jpg" alt="CS2 Gameplay" caption="IMG_02 // FACEIT_QUEUE" />
              <HobbyImage src="/images/hobbies/boxing.jpg" alt="Boxing Match" caption="IMG_03 // SEC315_DUBOIS_WARDLEY" />
              <HobbyImage src="/images/hobbies/lecture.jpg" alt="Public Lecture" caption="IMG_04 // TUNG_AUDITORIUM" />
            </div>
          </div>
        </div>

        {/* STRUCTURAL DIVIDER */}
        <div style={{ borderBottom: "1px solid #e5e5e5", marginBottom: "80px" }}></div>

        {/* BOTTOM ROW: The Interactive Timeline */}
        <div style={{ maxWidth: "800px" }}>
          <h2 style={{ 
            fontFamily: "var(--font-jetbrains), monospace", 
            fontSize: "16px", 
            fontWeight: 700, 
            borderBottom: "2px solid #111111",
            paddingBottom: "12px",
            marginBottom: "40px",
            marginTop: 0
          }}>
            System Log // Trajectory
          </h2>

          <div style={{ 
            borderLeft: "2px solid #e8e8e8", 
            marginLeft: "6px", 
            paddingLeft: "24px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "24px" 
          }}>
            
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