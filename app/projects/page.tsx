// app/projects/page.tsx
// This is a SERVER component — no "use client", so it can use fs via mdx.ts.
// It fetches the project data and passes it down to the client component.

import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  // This runs on the server — fs works fine here
  const projects = getAllProjects();

  return (
    <main style={{
      backgroundColor: "#f8f8f8",
      minHeight: "100vh",
      color: "#111111",
    }}>

      {/* ── MINIMAL TOP BAR ── */}
      <div style={{ padding: "20px 40px", borderBottom: "1px solid #e8e8e8" }}>
        <Link href="/" style={{
          fontWeight: 700,
          fontSize: "16px",
          color: "#111111",
          textDecoration: "none",
          letterSpacing: "-0.5px",
        }}>
          DB.
        </Link>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div style={{ padding: "60px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 42px)",
          fontWeight: 600,
          margin: "0 0 8px",
          letterSpacing: "-0.5px",
        }}>
          Projects
        </h1>
        <p style={{
          fontSize: "15px",
          color: "#999",
          margin: "0 0 40px",
        }}>
          Things I&apos;ve built.
        </p>

        {/* Pass projects down to the client component as props */}
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
