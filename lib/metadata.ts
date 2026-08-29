import type { Metadata } from "next";

const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Daniels Bunka — Computer Science student and software engineer portfolio",
};

type SocialMetadata = {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
};

export function getSocialMetadata({ title, description, url, type = "website" }: SocialMetadata): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      locale: "en_GB",
      siteName: "Daniels Bunka",
      title,
      description,
      url,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
