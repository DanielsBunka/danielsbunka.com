import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import ProjectList from "./ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my software engineering projects covering Python, AI, web development, APIs, Docker, networking and self-hosted infrastructure.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="projects-main">
      <div className="top-nav-bar">
        <Link href="/" className="home-badge">DB</Link>
        <div className="nav-breadcrumb">
          <span className="nav-divider">/</span>
          <span className="nav-current">Projects</span>
        </div>
      </div>
      <div className="content-container">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Things I&apos;ve built.</p>
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
