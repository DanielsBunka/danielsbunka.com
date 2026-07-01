// lib/tags.ts
//
// Single source of truth for all available project tags.
// Add new tags here and they automatically appear on the projects page.
// Use these exact strings in your MDX frontmatter tags arrays.

export const TAGS = [
  "JavaScript",
  "Python",
  "HTML",
  "CSS",
  "SQLite",
  "Flask",
  "React",
  "Next.js",
  "Docker",
  "Networking",
  "AI",
  "REST APIs",
] as const;

// This creates a TypeScript type from the array above.
export type Tag = typeof TAGS[number];
