// app/projects/ProjectList.tsx
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"AND" | "OR">("AND");

  const filteredProjects = selectedTags.length > 0
    ? projects.filter(p => 
        filterMode === "AND"
          ? selectedTags.every(tag => p.frontmatter.tags.includes(tag))
          : selectedTags.some(tag => p.frontmatter.tags.includes(tag))
      )
    : projects;

  function handleTagClick(tag: string) {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "48px" }}>
        
        {/* Tag Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", flex: "1 1 260px" }}>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`filter-tag ${selectedTags.includes(tag) ? "selected" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          flexShrink: 0,
          paddingTop: "2px",
          opacity: selectedTags.length > 0 ? 1 : 0.4,
          pointerEvents: selectedTags.length > 0 ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}>
          <div style={{ display: "flex", gap: "2px", backgroundColor: "#f0f0f0", padding: "3px", borderRadius: "6px" }}>
            <button
              onClick={() => setFilterMode("AND")}
              style={{
                padding: "4px 12px", borderRadius: "4px", border: "none", fontSize: "12px", cursor: "pointer", transition: "all 0.2s ease",
                backgroundColor: filterMode === "AND" ? "#ffffff" : "transparent",
                color: filterMode === "AND" ? "var(--ink-black)" : "#888",
                boxShadow: filterMode === "AND" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                fontWeight: filterMode === "AND" ? 500 : 400,
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode("OR")}
              style={{
                padding: "4px 12px", borderRadius: "4px", border: "none", fontSize: "12px", cursor: "pointer", transition: "all 0.2s ease",
                backgroundColor: filterMode === "OR" ? "#ffffff" : "transparent",
                color: filterMode === "OR" ? "var(--ink-black)" : "#888",
                boxShadow: filterMode === "OR" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                fontWeight: filterMode === "OR" ? 500 : 400,
              }}
            >
              Any
            </button>
          </div>

          <button
            onClick={() => { setSelectedTags([]); setFilterMode("AND"); }}
            className="filter-tag"
            style={{ backgroundColor: "#f0f0f0", color: "#666", fontWeight: 500 }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e4e4e4"; e.currentTarget.style.color = "var(--ink-black)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f0f0f0"; e.currentTarget.style.color = "#666"; }}
          >
            Clear
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {filteredProjects.map((project) => (
          <div key={project.slug} className="project-card">
            <div className="project-card-header">
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span className="project-date">{project.frontmatter.date}</span>
                <h2 className="project-title">{project.frontmatter.title}</h2>
              </div>
              <Link href={`/projects/${project.slug}`} className="read-more-link">
                Read more -&gt;
              </Link>
            </div>

            <p className="project-desc">{project.frontmatter.description}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`static-tag interactive ${selectedTags.includes(tag) ? "selected" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <p style={{ fontSize: "13px", color: "#aaa", padding: "40px 0" }}>
            No projects match your current filters.
          </p>
        )}
      </div>
    </>
  );
}