// app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    isValidElement,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from "react";
import { getProjectBySlug } from "@/lib/mdx";
import {
    getArticleHeadings,
    slugifyHeading,
} from "@/lib/article-headings";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleTableOfContents from "./ArticleTableOfContents";
import ProjectShowcase from "./ProjectShowcase";

type Props = {
    params: Promise<{ slug: string }>;
};

type HeadingProps = ComponentPropsWithoutRef<"h2">;

function getNodeText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getNodeText).join("");
    }

    if (isValidElement<{ children?: ReactNode }>(node)) {
        return getNodeText(node.props.children);
    }

    return "";
}

function ArticleHeading({
    level,
    children,
    ...props
}: HeadingProps & { level: 2 | 3 | 4 }) {
    const id = slugifyHeading(getNodeText(children));

    if (level === 2) {
        return <h2 {...props} id={id}>{children}</h2>;
    }

    if (level === 3) {
        return <h3 {...props} id={id}>{children}</h3>;
    }

    return <h4 {...props} id={id}>{children}</h4>;
}

export default async function ProjectArticlePage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const headings = getArticleHeadings(project.content);
    const mdxComponents = {
        h2: (props: HeadingProps) => <ArticleHeading {...props} level={2} />,
        h3: (props: HeadingProps) => <ArticleHeading {...props} level={3} />,
        h4: (props: HeadingProps) => <ArticleHeading {...props} level={4} />,
        ProjectShowcase,
    };

    return (
        <main className="article-main" id="article-top">

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
            <div className="article-layout">
                <ArticleTableOfContents headings={headings} />

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
                    <MDXRemote
                        source={project.content}
                        components={mdxComponents}
                    />
                </div>

                </article>
            </div>
        </main>
    );
}
