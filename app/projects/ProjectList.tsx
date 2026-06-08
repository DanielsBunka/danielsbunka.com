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
      {/* --- TAG FILTERS & CONTROLS --- */}
      <div style={{
        display: "flex",
        flexWrap: "wrap", /* Allows the controls to drop to a new line on mobile */
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "20px",
        marginBottom: "48px",
      }}>
        
        {/* Left Side: Tag Buttons */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          flex: "1 1 260px", /* The magic fix: Forces a wrap if squeezed below 260px */
        }}>
          {TAGS.map(tag => {
            const isSelected = selectedTags.includes(tag);
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
        </div>

        {/* Right Side: Controls (Permanently in DOM to prevent layout shift) */}
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
          
          {/* Filter Mode Toggle */}
          <div style={{ 
            display: "flex", 
            gap: "2px", 
            backgroundColor: "#f0f0f0", 
            padding: "3px", 
            borderRadius: "6px" 
          }}>
            <button
              onClick={() => setFilterMode("AND")}
              style={{
                padding: "4px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: filterMode === "AND" ? "#ffffff" : "transparent",
                color: filterMode === "AND" ? "#111111" : "#888",
                boxShadow: filterMode === "AND" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                fontSize: "12px",
                fontWeight: filterMode === "AND" ? 500 : 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode("OR")}
              style={{
                padding: "4px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: filterMode === "OR" ? "#ffffff" : "transparent",
                color: filterMode === "OR" ? "#111111" : "#888",
                boxShadow: filterMode === "OR" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                fontSize: "12px",
                fontWeight: filterMode === "OR" ? 500 : 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Any
            </button>
          </div>

          {/* Clear Button */}
          <button
            onClick={() => {
              setSelectedTags([]);
              setFilterMode("AND"); 
            }}
            style={{
              padding: "7px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#f0f0f0",
              color: "#666666",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e4e4e4";
              e.currentTarget.style.color = "#111111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.color = "#666666";
            }}
          >
            Clear
          </button>
        </div>
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
              {project.frontmatter.tags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <span
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    style={{
                      padding: "3px 10px",
                      borderRadius: "4px",
                      border: "1px solid #e0e0e0",
                      backgroundColor: isSelected ? "#111111" : "#f0f0f0",
                      color: isSelected ? "#ffffff" : "#888",
                      fontSize: "11px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <p style={{fontSize: "13px", color: "#aaa", padding: "40px 0" }}>
            No projects match your current filters.
          </p>
        )}
      </div>
    </>
  );
}