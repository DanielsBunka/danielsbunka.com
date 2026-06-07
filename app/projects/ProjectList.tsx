// app/projects/ProjectList.tsx
// This is the CLIENT component - handles tag filtering interactivity.
// It receives projects and tags as props from the server component.
// "use client" is here, not in page.tsx, so fs never runs in the browser.

"use client";

import { useState } from "react";
import Link from "next/link";
import { TAGS } from "@/lib/tags";
import { ProjectFrontmatter } from "@/lib/mdx";

type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter(p => p.frontmatter.tags.includes(selectedTag))
    : projects;

  function handleTagClick(tag: string) {
    setSelectedTag(selectedTag === tag ? null : tag);
  }

  return (
    <>
      {/* --- TAG FILTERS --- */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "48px",
      }}>
        {TAGS.map(tag => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: `1px solid ${isSelected ? "#111111" : "#d4d4d4"}`,
                backgroundColor: isSelected ? "#111111" : "transparent",
                color: isSelected ? "#ffffff" : "#666666",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {tag}
            </button>
          );
        })}

        {selectedTag && (
          <button
            onClick={() => setSelectedTag(null)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #e0e0e0",
              backgroundColor: "transparent",
              color: "#aaa",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
              Clear
          </button>
        )}
      </div>

      {/* --- PROJECT CARDS --- */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.slug}
            style={{
              padding: "28px 0",
              borderTop: "1px solid #e8e8e8",
              borderBottom: index === filteredProjects.length - 1 ? "1px solid #e8e8e8" : "none",
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              marginBottom: "10px",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ 
                  fontFamily: "var(--font-jetbrains), monospace", 
                  fontSize: "11px", 
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}>
                  {project.frontmatter.date}
                </span>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#111111" }}>
                  {project.frontmatter.title}
                </h2>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                style={{
                  fontSize: "12px",
                  color: "#999",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  paddingTop: "2px",
                }}
              >
                Read more -&gt;
              </Link>
            </div>

            <p style={{
              margin: "0 0 14px",
              fontSize: "14px",
              color: "#666",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}>
              {project.frontmatter.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: selectedTag === tag ? "#111111" : "#f0f0f0",
                    color: selectedTag === tag ? "#ffffff" : "#888",
                    fontSize: "11px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <p style={{fontSize: "13px", color: "#aaa", padding: "40px 0" }}>
            No projects with that tag yet.
          </p>
        )}
      </div>
    </>
  );
}