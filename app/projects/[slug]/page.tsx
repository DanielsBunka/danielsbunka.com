// app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProjectArticlePage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="article-main">

            {/* ── MINIMAL TOP BAR ── */}
            <div className="top-nav-bar">
                <Link href="/" className="home-badge">DB</Link>
                <div className="nav-breadcrumb breadcrumb-article">
                    <span className="nav-divider">/</span>
                    <Link href="/projects" className="breadcrumb-link">Projects</Link>
                    <span className="nav-divider">/</span>
                    <span className="nav-current text-truncate">
                        {project.frontmatter.title}
                    </span>
                </div>
            </div>

            {/* ── ARTICLE CONTENT ── */}
            <article className="article-container">
                <header className="article-header-clean">

                    {/* 1. TITLE & SHRUNK GITHUB BUTTON */}
                    <div className="article-title-row">
                        <h1 className="article-title inline">
                            {project.frontmatter.title}
                        </h1>

                        {project.frontmatter.github && (
                            <a href={project.frontmatter.github} target="_blank" rel="noopener noreferrer" className="terminal-link-btn compact">
                                [GitHub Repo]
                            </a>
                        )}
                    </div>

                    {/* 2. TEXT-BASED TAGS */}
                    {project.frontmatter.tags.length > 0 && (
                        <div className="article-tags-text">
                            {project.frontmatter.tags.join(" • ")}
                        </div>
                    )}

                    {/* 3. DESCRIPTION */}
                    <p className="article-desc compact">
                        {project.frontmatter.description}
                    </p>

                    {/* 4. BOUNDED DATES (Top and Bottom lines) */}
                    <div className="article-dates-bounded">
                        <span>Project Date: {project.frontmatter.projectDate}</span>
                        <span className="date-separator">•</span>
                        <span>Article Updated: {project.frontmatter.publishedAt}</span>
                    </div>

                </header>

                <div className="markdown-body">
                    <MDXRemote source={project.content} />
                </div>

            </article>
        </main>
    );
}