// app/projects/page.tsx
//
// Now reads project metadata directly from the MDX frontmatter.
// No more separate data.ts file — the MDX files are the source of truth.

import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getAllProjects();

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.slug}
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
            <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#333" }}>
              {String(index + 1).padStart(2, "0")}
            </span>

            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: "#f0f0f0" }}>
              {project.frontmatter.title}
            </h2>

            <p style={{ margin: 0, fontSize: "14px", color: "#777", lineHeight: 1.7, flexGrow: 1 }}>
              {project.frontmatter.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.frontmatter.tags.map((tag) => (
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

            <Link
              href={`/projects/${project.slug}`}
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#911111",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              → Read more
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
