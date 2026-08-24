import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/mdx";

const baseUrl = "https://danielsbunka.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/projects` },
  ];

  const projectPages: MetadataRoute.Sitemap = getAllProjects().map(({ slug }) => ({
    url: `${baseUrl}/projects/${slug}`,
  }));

  return [...staticPages, ...projectPages];
}
