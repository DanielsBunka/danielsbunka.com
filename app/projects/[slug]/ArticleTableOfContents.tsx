"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { ArticleHeading } from "@/lib/article-headings";

type Props = {
  headings: ArticleHeading[];
};

function clampPercentage(value: number) {
  return Math.round(Math.max(0, Math.min(100, value)));
}

export default function ArticleTableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (headings.length === 0) return;

    let animationFrame = 0;

    const updateNavigation = () => {
      animationFrame = 0;

      const article = document.querySelector<HTMLElement>(".article-container");
      const sectionMarker = 160;
      let currentId = headings[0].id;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (element && element.getBoundingClientRect().top <= sectionMarker) {
          currentId = heading.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);

      if (!article) return;

      const articleTop =
        window.scrollY + article.getBoundingClientRect().top;
      const scrollableDistance =
        article.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(100);
        return;
      }

      setProgress(
        clampPercentage(
          ((window.scrollY - articleTop) / scrollableDistance) * 100
        )
      );
    };

    const requestUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateNavigation);
      }
    };

    updateNavigation();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const closeMobileNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  const renderLinks = (closeOnNavigate = false) => (
    <ul className="article-toc-list">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={
            heading.level === 3 ? "article-toc-subsection" : undefined
          }
        >
          <a
            href={`#${heading.id}`}
            className={`article-toc-link${
              activeId === heading.id ? " active" : ""
            }`}
            aria-current={activeId === heading.id ? "location" : undefined}
            onClick={closeOnNavigate ? closeMobileNavigation : undefined}
          >
            {heading.text}
          </a>
        </li>
      ))}
      <li className="article-toc-back-item">
        <a
          href="#article-top"
          className="article-toc-back"
          onClick={closeOnNavigate ? closeMobileNavigation : undefined}
        >
          ↑ Back to top
        </a>
      </li>
    </ul>
  );

  const progressBar = (
    <div
      className="article-progress-track"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <span
        className="article-progress-value"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <>
      <aside
        className="article-toc-desktop"
        aria-label="Article navigation"
      >
        <div className="article-toc-heading">
          <span>On this page</span>
          <span>{progress}%</span>
        </div>
        {progressBar}
        {renderLinks()}
      </aside>

      <details className="article-toc-mobile">
        <summary>
          <span className="article-toc-mobile-copy">
            <span>Sections</span>
            <span className="article-toc-mobile-hint">
              Browse article
            </span>
          </span>
          <span className="article-toc-mobile-status">
            <span>{progress}%</span>
            <span className="article-toc-mobile-toggle" aria-hidden="true" />
          </span>
        </summary>
        {progressBar}
        {renderLinks(true)}
      </details>
    </>
  );
}
