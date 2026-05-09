// app/projects/page.tsx

// No "use client" needed here — this page has no interactivity,
// so it can be a plain server component. Simpler = better.

// ─────────────────────────────────────────────
// YOUR PROJECTS DATA
// To add a new project: copy one object, paste it, fill it in.
// The page updates automatically — you never touch the JSX below.
// ─────────────────────────────────────────────
const projects = [
  {
    title: "Roast My Face",
    description:
      "Uses your webcam and an AI API to generate personalised insults, then reads them aloud using your browser's built-in text-to-speech. Cloudflare Worker acts as a secure proxy to keep the API key off the client.",
    tags: ["JavaScript", "Web Speech API", "Cloudflare Workers", "AI"],
    github: "https://github.com/DanielsBunka/roast-my-face",
    accent: "#911111",
  },
  {
    title: "SMS Assistant",
    description:
      "A personal assistant that runs 24/7 on my homelab. Text a number and get back live train times between Southport and Liverpool, stock prices, and more. Built with Python and Flask, deployed in Docker via Twilio webhooks.",
    tags: ["Python", "Flask", "Twilio", "Docker", "REST APIs"],
    github: "https://github.com/DanielsBunka/sms-assistant",
    accent: "#911111",
  },
  {
    title: "Homelab",
    description:
      "A self-hosted server running ZimaOS with Docker containers for personal projects and services. Currently hosts the SMS Assistant and various other self-hosted apps.",
    tags: ["Linux", "Docker", "Self-Hosted", "Networking"],
    github: null, // no repo for this one
    accent: "#911111",
  },
  {
    title: "University Study Planner",
    description:
      "A web app built for a university web development assignment. Includes an interactive calendar with task tracking, a weighted grade calculator with progress bar, and a Pomodoro concentration timer with audio.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: null,
    accent: "#911111",
  },
];

export default function ProjectsPage() {
  return (
    <main
      style={{
        backgroundColor: "#020205",
        minHeight: "100vh",
        color: "#f0f0f0",
        padding: "80px 60px",
        fontFamily: "sans-serif",
      }}
    >
      {/* ── PAGE HEADER ── */}
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "13px",
          color: "#911111",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        // things i&apos;ve built
      </p>

      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 600,
          margin: "0 0 12px",
          color: "#f8f8f8",
        }}
      >
        Projects
      </h1>

      <p style={{ color: "#666", fontSize: "16px", marginBottom: "56px", maxWidth: "480px" }}>
        A mix of practical tools, dumb ideas, and university work. All of it written by me.
      </p>

      {/* ── PROJECT CARDS ──
          .map() loops over the projects array above.
          For each project object, it returns a card.
          'key' is required — React uses it to track each card.
          'index' is the position in the array (0, 1, 2...) — used for the number. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            style={{
              backgroundColor: "#0a0a0f",
              border: "1px solid #1a1a1f",
              borderRadius: "8px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Project number */}
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#333",
              }}
            >
              {String(index + 1).padStart(2, "0")} {/* Turns 1 into "01", 2 into "02" etc */}
            </span>

            {/* Title */}
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 600,
                color: "#f0f0f0",
              }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#777",
                lineHeight: 1.7,
                flexGrow: 1, // pushes the tags + button to the bottom of the card
              }}
            >
              {project.description}
            </p>

            {/* Tech tags — another .map() inside the first one */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: "1px solid #222",
                    color: "#666",
                    backgroundColor: "#0d0d12",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* GitHub link — only shows if the project has one */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "4px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "#911111",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                → View on GitHub
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
