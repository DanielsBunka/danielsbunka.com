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
      <div className="filter-header">
        
        {/* Tag Buttons */}
        <div className="filter-tag-group">
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
        <div className={`filter-controls ${selectedTags.length === 0 ? "disabled" : ""}`}>
          <div className="filter-toggle-group">
            <button
              onClick={() => setFilterMode("AND")}
              className={`filter-toggle-btn ${filterMode === "AND" ? "active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode("OR")}
              className={`filter-toggle-btn ${filterMode === "OR" ? "active" : ""}`}
            >
              Any
            </button>
          </div>

          <button
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
                <span className="project-date">{project.frontmatter.date}</span>
                <h2 className="project-title">{project.frontmatter.title}</h2>
              </div>
              <Link href={`/projects/${project.slug}`} className="read-more-link">
                Read more -&gt;
              </Link>
            </div>

            <p className="project-desc">{project.frontmatter.description}</p>

            <div className="project-tag-group">
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
          <p className="empty-state-msg">
            No projects match your current filters.
          </p>
        )}
      </div>
    </>
  );
}