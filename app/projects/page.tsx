// app/projects/page.tsx
import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="projects-main">

      {/* ── MINIMAL TOP BAR ── */}
      <div className="top-nav-bar">
        <Link href="/" className="home-badge">DB</Link>
        <div className="nav-breadcrumb">
          <span className="nav-divider">/</span>
          <span className="nav-current">Projects</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="content-container">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Things I&apos;ve built.</p>
        
        <ProjectList projects={projects} />
      </div>
      
    </main>
  );
}