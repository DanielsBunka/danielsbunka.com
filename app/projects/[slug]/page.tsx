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
        <main style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>

            {/* ── MINIMAL TOP BAR ── */}
            <div style={{
                display: "flex",
                alignItems: "center",
                height: "80px",
                padding: "0 40px 0 0",
                borderBottom: "1px solid #d4d4d4",
                boxSizing: "content-box"
            }}>

                <Link href="/" className="home-badge">
                    DB
                </Link>

                {/* Breadcrumb Container */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginLeft: "24px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                    flex: 1
                }}>
                    <span style={{ color: "#aaaaaa" }}>/</span>

                    <Link href="/projects" className="breadcrumb-link">
                        Projects
                    </Link>

                    <span style={{ color: "#aaaaaa" }}>/</span>

                    <span style={{
                        color: "#111111",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>
                        {project.frontmatter.title}
                    </span>
                </div>
            </div>

            {/* ── ARTICLE CONTENT ── */}
            <article style={{
                maxWidth: "680px",
                margin: "0 auto",
                padding: "80px 24px",
            }}>

                {/* Article Header */}
                <header style={{
                    paddingBottom: "40px", /* Creates the breathing room ABOVE the line */
                    marginBottom: "48px",  /* Creates the breathing room BELOW the line */
                    borderBottom: "1px solid #e8e8e8" /* The razor-sharp structural divider */
                }}>

                    {/* Metadata Row (Date + Tech Spec Badges) */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                        marginBottom: "24px"
                    }}>
                        <span style={{
                            fontFamily: "var(--font-jetbrains), monospace",
                            fontSize: "12px",
                            color: "#999",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        }}>
                            {project.frontmatter.date}
                        </span>

                        {project.frontmatter.tags.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {project.frontmatter.tags.map(tag => (
                                    <span key={tag} style={{
                                        padding: "3px 8px",
                                        border: "1px solid #e5e5e5",
                                        backgroundColor: "#fafafa",
                                        color: "#666",
                                        fontSize: "10px",
                                        fontFamily: "var(--font-jetbrains), monospace",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em"
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#111111",
                        margin: "0 0 24px 0",
                        letterSpacing: "-0.5px"
                    }}>
                        {project.frontmatter.title}
                    </h1>

                    {/* Description */}
                    <p style={{
                        fontSize: "16px",
                        color: "#666",
                        lineHeight: 1.7,
                        margin: "0 0 32px 0"
                    }}>
                        {project.frontmatter.description}
                    </p>

                    {/* Standalone Action Row */}
                    {project.frontmatter.github && (
                        <div>
                            <a
                                href={project.frontmatter.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-button"
                                style={{ margin: 0 }}
                            >
                                GitHub Repo ↗
                            </a>
                        </div>
                    )}
                </header>

                {/* Clean, unbloated Markdown Body */}
                <div className="markdown-body">
                    <MDXRemote source={project.content} />
                </div>

            </article>
        </main>
    );
}