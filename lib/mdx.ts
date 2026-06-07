// lib/mdx.ts
//
// This file handles reading MDX files from the content/projects/ folder.
// The [slug] page calls these functions to get the right article.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Absolute path to your content/projects folder
const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

// The shape of the frontmatter at the top of each MDX file
export type ProjectFrontmatter = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  date: string;
};

// Returns the raw MDX content + frontmatter for one project
// Called by the [slug] page to render a single article
export function getProjectBySlug(slug: string) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  // If the file doesn't exist, return null — the page will show a 404
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");

  // gray-matter splits the file into:
  //   data    = the frontmatter (title, tags, etc.)
  //   content = everything below the --- block
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ProjectFrontmatter,
    content, // raw MDX string — passed to next-mdx-remote to render
    slug,
  };
}

// Returns frontmatter for ALL projects — used by the /projects list page
// so it can show titles, descriptions, and tags without rendering full articles
export function getAllProjects() {
  const files = fs.readdirSync(PROJECTS_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fileContents = fs.readFileSync(
        path.join(PROJECTS_DIR, file),
        "utf8"
      );
      const { data } = matter(fileContents);

      return {
        slug,
        frontmatter: data as ProjectFrontmatter,
      };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
