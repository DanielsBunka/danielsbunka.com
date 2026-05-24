// app/projects/[slug]/page.tsx

import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

// Pre-builds a page for every .mdx file in content/projects/ at build time
export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <main
      style={{
        backgroundColor: "#020205",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "sans-serif",
      }}
    >
      {/* ── ARTICLE HEADER ── */}
      <div style={{ padding: "64px 60px 48px", borderBottom: "1px solid #1a1a1f" }}>

        <Link
          href="/projects"
          style={{
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#444",
            textDecoration: "none",
            letterSpacing: "0.08em",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          ← Back to projects
        </Link>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #222",
                color: "#666",
                backgroundColor: "#0d0d12",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 600,
            margin: "0 0 16px",
            color: "#f8f8f8",
          }}
        >
          {frontmatter.title}
        </h1>

        <p style={{ fontSize: "18px", color: "#666", maxWidth: "600px", margin: "0 0 32px" }}>
          {frontmatter.description}
        </p>

        {frontmatter.github && (
          <a
            href={frontmatter.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#911111",
              textDecoration: "none",
            }}
          >
            → View on GitHub
          </a>
        )}
      </div>

      {/* ── ARTICLE BODY ──
          MDXRemote takes the raw MDX string and renders it as HTML.
          The 'components' prop lets you override how each HTML tag looks.
          e.g. every ## heading in your MDX will use our custom <h2> style. */}
      <div style={{ padding: "64px 60px", maxWidth: "760px" }}>
        <MDXRemote
          source={content}
          components={{
            h2: (props) => (
              <h2
                {...props}
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#f8f8f8",
                  margin: "48px 0 16px",
                  paddingTop: "48px",
                  borderTop: "1px solid #1a1a1f",
                }}
              />
            ),
            p: (props) => (
              <p
                {...props}
                style={{
                  fontSize: "16px",
                  color: "#888",
                  lineHeight: 1.8,
                  margin: "0 0 20px",
                }}
              />
            ),
            // Inline code — backtick words like `getUserMedia`
            code: (props) => (
              <code
                {...props}
                style={{
                  fontFamily: "monospace",
                  fontSize: "14px",
                  backgroundColor: "#0d0d12",
                  border: "1px solid #222",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  color: "#c44",
                }}
              />
            ),
            // Code blocks — fenced with ```
            pre: (props) => (
              <pre
                {...props}
                style={{
                  backgroundColor: "#0a0a0f",
                  border: "1px solid #1a1a1f",
                  borderRadius: "8px",
                  padding: "24px",
                  overflowX: "auto",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  color: "#aaa",
                  margin: "24px 0",
                }}
              />
            ),
            strong: (props) => (
              <strong {...props} style={{ color: "#c0c0c0", fontWeight: 600 }} />
            ),
            // Images — drop them in /public and reference in MDX as ![alt](path)
            img: (props) => (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img
                {...props}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #1a1a1f",
                  margin: "24px 0",
                }}
              />
            ),
          }}
        />
      </div>
    </main>
  );
}
