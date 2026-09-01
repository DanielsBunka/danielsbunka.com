import type { MetadataRoute } from "next";

const baseUrl = "https://danielsbunka.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${baseUrl}/` }];
}
