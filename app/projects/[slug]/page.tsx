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
                <header className="article-header">

                    <div className="article-meta">
                        <span className="project-date">{project.frontmatter.date}</span>
                        {project.frontmatter.tags.length > 0 && (
                            <div className="project-tag-group">
                                {project.frontmatter.tags.map(tag => (
                                    <span key={tag} className="static-tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <h1 className="article-title">{project.frontmatter.title}</h1>
                    <p className="article-desc">{project.frontmatter.description}</p>

                    {project.frontmatter.github && (
                        <div className="article-actions">
                            <a href={project.frontmatter.github} target="_blank" rel="noopener noreferrer" className="terminal-link-btn no-margin">
                                [GitHub Repo]
                            </a>
                        </div>
                    )}
                </header>

                <div className="markdown-body">
                    <MDXRemote source={project.content} />
                </div>

            </article>
        </main>
    );
}