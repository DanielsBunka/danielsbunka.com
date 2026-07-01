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

  // 1. Filter by tags
  const baseFiltered = selectedTags.length > 0
    ? projects.filter(p =>
         filterMode === "AND"
          ? selectedTags.every(tag => p.frontmatter.tags.includes(tag))
          : selectedTags.some(tag => p.frontmatter.tags.includes(tag))
      )
    : [...projects];

  // 2. Sort featured to the top, respecting featured_order
  const filteredProjects = baseFiltered.sort((a, b) => {
    const aFeatured = a.frontmatter.featured || false;
    const bFeatured = b.frontmatter.featured || false;

    if (aFeatured && bFeatured) {
      return (a.frontmatter.featured_order || 99) - (b.frontmatter.featured_order || 99);
    }
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return 0; // If neither are featured, keep original date sorting
  });

  function handleTagClick(tag: string) {
    setSelectedTags(prev =>
       prev.includes(tag)
         ? prev.filter(t => t !== tag)
         : [...prev, tag]
    );
  }

  return (
    <>
      <div className="filter-header">
        <div className="filter-tag-group">
          {TAGS.map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`filter-tag ${selectedTags.includes(tag) ? "selected" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className={`filter-controls ${selectedTags.length === 0 ? "disabled" : ""}`}>
          <div className="filter-toggle-group">
            <button
              type="button"
              onClick={() => setFilterMode("AND")}
              className={`filter-toggle-btn ${filterMode === "AND" ? "active" : ""}`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("OR")}
              className={`filter-toggle-btn ${filterMode === "OR" ? "active" : ""}`}
            >
              Any
            </button>
          </div>
          <button
            type="button"
            onClick={() => { setSelectedTags([]); setFilterMode("AND"); }}
            className="filter-clear-btn"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="project-list-wrapper">
        {filteredProjects.map((project) => (
          <div key={project.slug} className="project-card">
            <div className="project-card-header">
              <div className="project-header-text">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <span className="project-date">{project.frontmatter.projectDate}</span>
                  {/* THE FEATURED BADGE */}
                  {project.frontmatter.featured && (
                    <span style={{ 
                      fontSize: "10px", 
                      fontFamily: "var(--font-mono)", 
                      color: "var(--ink-black)", 
                      fontWeight: 700, 
                      backgroundColor: "#f0f0f0", 
                      padding: "2px 6px", 
                      borderRadius: "4px",
                      letterSpacing: "0.05em"
                    }}>
                      ★ RECOMMENDED READ
                    </span>
                  )}
                </div>
                <h2 className="project-title">{project.frontmatter.title}</h2>
              </div>
              <Link href={`/projects/${project.slug}`} className="read-more-link">
                Read more -&gt;
              </Link>
            </div>
            <p className="project-desc">{project.frontmatter.description}</p>
            <div className="project-tag-group">
              {project.frontmatter.tags.map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`static-tag interactive ${selectedTags.includes(tag) ? "selected" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <p className="empty-state-msg">
            No projects match your current filters.
          </p>
        )}
      </div>
    </>
  );
}