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
                <header style={{ marginBottom: "48px" }}>
                    <div style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: "12px",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "16px"
                    }}>
                        {project.frontmatter.date}
                    </div>

                    <h1 style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        color: "#111111",
                        margin: "0 0 16px 0",
                        letterSpacing: "-0.5px"
                    }}>
                        {project.frontmatter.title}
                    </h1>

                    <p style={{
                        fontSize: "16px",
                        color: "#666",
                        lineHeight: 1.7,
                        margin: 0
                    }}>
                        {project.frontmatter.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" }}>
                        {project.frontmatter.tags.map(tag => (
                            <span key={tag} style={{
                                padding: "4px 12px",
                                borderRadius: "4px",
                                border: "1px solid #e0e0e0",
                                backgroundColor: "#f9f9f9",
                                color: "#666",
                                fontSize: "11px",
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Clean, unbloated Markdown Body */}
                <div className="markdown-body">
                    <MDXRemote source={project.content} />
                </div>

            </article>
        </main>
    );
}